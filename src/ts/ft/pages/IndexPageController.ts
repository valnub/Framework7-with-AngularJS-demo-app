/// <reference path="../../angular/angular.d.ts"/>
/// <reference path="PageController.ts"/>
/// <reference path="../model/movies/Movies.ts"/>

module ft.pages{

  import Movies = ft.model.movies;

  // Angular scope
  export interface IndexPageScope extends IScope{
    movies: Movies.Movie[];
    listtype: String;
    tab:Movies.MovieType;
  }
  
  // Movie cache so rotten api won't get flooded :-)
  interface MovieListCache {
    upcoming:Movies.Movie[];
    theaters:Movies.Movie[];
  }
  
  // Create an empty dummy movie to share with DetailsController
  export var selectedMovie:Movies.Movie = {
    id:"",
    synopsis:"",
    title:"",
    posters:{
      detailed:"",
      original:"",
      profile:"",
      thumbnail:""
    },
    ratings:{
      audience_score:0,
      critics_rating:"",
      critics_critics_score:0
    },
    release_dates:{
      theater:""
    },
    stars:"",
    date:""
  };
  
  // Controller for movie list page
  export class IndexPageController extends PageController{
    
    scope: IndexPageScope;
    private $http:ng.IHttpService;
    private API_URL_UPCOMINGLIST:string = 'ws/upcoming.json'; // Use mocked data
    private API_URL_THEATERSLIST:string = 'ws/theaters.json'; // Use mocked data
    private movies:Movies.Movie[] = [];
    private tabState:Movies.MovieType = {upcoming:{active:' active'}, theater:{active:''}};
    private cache:MovieListCache = {upcoming:[], theaters:[]}
    
    constructor($scope: IndexPageScope, $http: ng.IHttpService){
      super($scope);
      this.$http = $http;
      
      // Bind movie model to view via Angular data binding
      $scope.movies = this.movies;
      $scope.tab = this.tabState;
      
      // Show upcoming movies via default
      this.showList('upcoming');
    }
    
    // Renders the list of movies
    private showList(type:String):void{
      this.scope.listtype = type == 'upcoming' ? 'Upcoming movies' : 'In theaters now';
      this.movies.length = 0;
      var cacheList = type == 'upcoming' ? this.cache.upcoming : this.cache.theaters;
      
      // Only do ajax call if cache is empty
      if (cacheList.length == 0){
        var ajaxconfig:ng.IRequestConfig = {
          method: 'JSONP',
          url: (type == 'upcoming' ? this.API_URL_UPCOMINGLIST : this.API_URL_THEATERSLIST)
        };

        // Do ajax call to rotten api
        this.$http(ajaxconfig)
          .success((data: Movies.AjaxResultData, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig): void => {
            // Clean up the json data a bit
            this.formatModel(data);
            
            // Copy into cache
            angular.copy(data.movies, type == 'upcoming' ? this.cache.upcoming : this.cache.theaters);
            
            // Update angular model
            angular.copy(data.movies, this.movies);
          })
          .error((data: Movies.AjaxResultData, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig): void => {
            alert('Failed connecting to rotten tomatoes db. Status code ' + status);
          });
      }
      else{
        // Update angular model
        angular.copy(cacheList, this.movies);
      }
    }
    
    // Angular event listener. Gets called when user clicks on upcoming movies tab
    onUpcomingClicked():void{
      var ustate:String = this.tabState.upcoming.active;
      if (ustate != ' active'){
        this.tabState.upcoming.active = ' active';
        this.tabState.theater.active = '';
        this.showList('upcoming');
      }
    }
    
    // Angular event listener. Gets called when user clicks on "In theaters now" tab
    onTheatersClicked(){
      var tstate:String = this.tabState.theater.active;
      if (tstate != ' active'){
        this.tabState.upcoming.active = '';
        this.tabState.theater.active = ' active';
        this.showList('theaters');
      }
    }
    
    // Angular event listener. Gets called when user clicks on a movie from the list
    onListItemClicked(movie:Movies.Movie){
      angular.extend(selectedMovie, movie);
    }
    
    // Adds stars and better date formatting to model
    private formatModel(data:Movies.AjaxResultData):void{
      // Modify model data
      for (var key in data.movies){        
        // Add stars
        var movie:Movies.Movie = data.movies[key];
        var score:number = movie.ratings.audience_score;
        var scorePercent:number = 5*(score/100);
        var stars:number = Math.round(scorePercent);
        var starsString = '';
        for (var i:number=0; i<5; i++){
          if (i < stars) starsString += '★';
          else starsString += '☆';
        }
        movie.stars = starsString;

        // Add better date formatting
        var relDate:String = movie.release_dates.theater;
        var splittedDate:string[] = relDate.split('-');
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var year:number = parseInt(splittedDate[0]);
        var month:number = parseInt(splittedDate[1]);
        var day:number = parseInt(splittedDate[2]);
        var dayWithFix:string = day + '';
        if (day == 1) dayWithFix += 'st';
        else if (day == 2) dayWithFix += 'nd';
        else if (day == 3) dayWithFix += 'rd';
        else dayWithFix += 'th';
        var fullDateString:string = monthNames[month] + ' ' + dayWithFix + ', ' + year
        movie.date = fullDateString;
      }
    }
    
  }

}
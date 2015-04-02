/// <reference path="../../angular/angular.d.ts"/>
/// <reference path="PageController.ts"/>
/// <reference path="../model/movies/Movies.ts"/>
/// <reference path="IndexPageController.ts"/>

module ft.pages{

  import Movies = ft.model.movies;
  
  // Define angular scope
  export interface DetailsPageScope extends IScope{
    movie:Movies.Movie;
  }
  
  export class DetailsPageController extends PageController{
    scope: DetailsPageScope;
    
    constructor($scope: DetailsPageScope){
      super($scope);
      
      // Bind model via angular to view
      $scope.movie = selectedMovie;
    }
    
  }

}
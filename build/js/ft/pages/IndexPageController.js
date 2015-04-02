/// <reference path="../../angular/angular.d.ts"/>
/// <reference path="PageController.ts"/>
/// <reference path="../model/movies/Movies.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ft;
(function (ft) {
    var pages;
    (function (pages) {
        // Create an empty dummy movie to share with DetailsController
        pages.selectedMovie = {
            id: "",
            synopsis: "",
            title: "",
            posters: {
                detailed: "",
                original: "",
                profile: "",
                thumbnail: ""
            },
            ratings: {
                audience_score: 0,
                critics_rating: "",
                critics_critics_score: 0
            },
            release_dates: {
                theater: ""
            },
            stars: "",
            date: ""
        };
        // Controller for movie list page
        var IndexPageController = (function (_super) {
            __extends(IndexPageController, _super);
            function IndexPageController($scope, $http) {
                _super.call(this, $scope);
                this.API_URL_UPCOMINGLIST = 'ws/upcoming.json'; // Use mocked data
                this.API_URL_THEATERSLIST = 'ws/theaters.json'; // Use mocked data
                this.movies = [];
                this.tabState = { upcoming: { active: ' active' }, theater: { active: '' } };
                this.cache = { upcoming: [], theaters: [] };
                this.$http = $http;
                // Bind movie model to view via Angular data binding
                $scope.movies = this.movies;
                $scope.tab = this.tabState;
                // Show upcoming movies via default
                this.showList('upcoming');
            }
            // Renders the list of movies
            IndexPageController.prototype.showList = function (type) {
                var _this = this;
                this.scope.listtype = type == 'upcoming' ? 'Upcoming movies' : 'In theaters now';
                this.movies.length = 0;
                var cacheList = type == 'upcoming' ? this.cache.upcoming : this.cache.theaters;
                // Only do ajax call if cache is empty
                if (cacheList.length == 0) {
                    var ajaxconfig = {
                        method: 'JSONP',
                        url: (type == 'upcoming' ? this.API_URL_UPCOMINGLIST : this.API_URL_THEATERSLIST)
                    };
                    // Do ajax call to rotten api
                    this.$http(ajaxconfig).success(function (data, status, headers, config) {
                        // Clean up the json data a bit
                        _this.formatModel(data);
                        // Copy into cache
                        angular.copy(data.movies, type == 'upcoming' ? _this.cache.upcoming : _this.cache.theaters);
                        // Update angular model
                        angular.copy(data.movies, _this.movies);
                    }).error(function (data, status, headers, config) {
                        alert('Failed connecting to rotten tomatoes db. Status code ' + status);
                    });
                }
                else {
                    // Update angular model
                    angular.copy(cacheList, this.movies);
                }
            };
            // Angular event listener. Gets called when user clicks on upcoming movies tab
            IndexPageController.prototype.onUpcomingClicked = function () {
                var ustate = this.tabState.upcoming.active;
                if (ustate != ' active') {
                    this.tabState.upcoming.active = ' active';
                    this.tabState.theater.active = '';
                    this.showList('upcoming');
                }
            };
            // Angular event listener. Gets called when user clicks on "In theaters now" tab
            IndexPageController.prototype.onTheatersClicked = function () {
                var tstate = this.tabState.theater.active;
                if (tstate != ' active') {
                    this.tabState.upcoming.active = '';
                    this.tabState.theater.active = ' active';
                    this.showList('theaters');
                }
            };
            // Angular event listener. Gets called when user clicks on a movie from the list
            IndexPageController.prototype.onListItemClicked = function (movie) {
                angular.extend(pages.selectedMovie, movie);
            };
            // Adds stars and better date formatting to model
            IndexPageController.prototype.formatModel = function (data) {
                for (var key in data.movies) {
                    // Add stars
                    var movie = data.movies[key];
                    var score = movie.ratings.audience_score;
                    var scorePercent = 5 * (score / 100);
                    var stars = Math.round(scorePercent);
                    var starsString = '';
                    for (var i = 0; i < 5; i++) {
                        if (i < stars)
                            starsString += '★';
                        else
                            starsString += '☆';
                    }
                    movie.stars = starsString;
                    // Add better date formatting
                    var relDate = movie.release_dates.theater;
                    var splittedDate = relDate.split('-');
                    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    var year = parseInt(splittedDate[0]);
                    var month = parseInt(splittedDate[1]);
                    var day = parseInt(splittedDate[2]);
                    var dayWithFix = day + '';
                    if (day == 1)
                        dayWithFix += 'st';
                    else if (day == 2)
                        dayWithFix += 'nd';
                    else if (day == 3)
                        dayWithFix += 'rd';
                    else
                        dayWithFix += 'th';
                    var fullDateString = monthNames[month] + ' ' + dayWithFix + ', ' + year;
                    movie.date = fullDateString;
                }
            };
            return IndexPageController;
        })(pages.PageController);
        pages.IndexPageController = IndexPageController;
    })(pages = ft.pages || (ft.pages = {}));
})(ft || (ft = {}));

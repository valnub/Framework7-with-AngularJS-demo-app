/// <reference path="../../angular/angular.d.ts"/>
/// <reference path="PageController.ts"/>
/// <reference path="../model/movies/Movies.ts"/>
/// <reference path="IndexPageController.ts"/>
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
        var DetailsPageController = (function (_super) {
            __extends(DetailsPageController, _super);
            function DetailsPageController($scope) {
                _super.call(this, $scope);
                // Bind model via angular to view
                $scope.movie = pages.selectedMovie;
            }
            return DetailsPageController;
        })(pages.PageController);
        pages.DetailsPageController = DetailsPageController;
    })(pages = ft.pages || (ft.pages = {}));
})(ft || (ft = {}));

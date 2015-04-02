/// <reference path="../../angular/angular.d.ts"/>
var ft;
(function (ft) {
    var pages;
    (function (pages) {
        /**
         * Do not instantiate this. This is just an abstract class.
         * If you'd like to create a new PageController extend this class.
         *
         * @class
         * @abstract
         * @example IndexPageController
         */
        var PageController = (function () {
            function PageController($scope) {
                this.scope = $scope;
                this.scope.events = this;
            }
            return PageController;
        })();
        pages.PageController = PageController;
    })(pages = ft.pages || (ft.pages = {}));
})(ft || (ft = {}));

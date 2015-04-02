/// <reference path="../angular/angular.d.ts"/>
var ft;
(function (ft) {
    var AngularApp = (function () {
        function AngularApp(name, modules) {
            this.app = angular.module(name, modules);
        }
        AngularApp.prototype.addController = function (name, controller) {
            this.app.controller(name, controller);
        };
        return AngularApp;
    })();
    ft.AngularApp = AngularApp;
})(ft || (ft = {}));

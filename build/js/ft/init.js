/// <reference path="AngularApp.ts" />
/// <reference path="pages/IndexPageController.ts" />
/// <reference path="pages/DetailsPageController.ts" />
var ft;
(function (ft) {
    var Init = (function () {
        function Init() {
            this.configApp();
        }
        Init.prototype.configApp = function () {
            // Initialize app
            this.fw7App = new Framework7({
                animateNavBackIcon: true
            });
            this.fw7ViewOptions = {
                dynamicNavbar: true,
                domCache: true
            };
            // Add view
            this.mainView = this.fw7App.addView('.view-main', this.fw7ViewOptions);
            // Init Angular
            this.angularApp = new ft.AngularApp('ft', []);
            // Init controllers
            this.angularApp.addController('IndexPageController', ft.pages.IndexPageController);
            this.angularApp.addController('DetailsPageController', ft.pages.DetailsPageController);
        };
        return Init;
    })();
    ft.Init = Init;
    // Everything starts here
    new Init();
})(ft || (ft = {}));

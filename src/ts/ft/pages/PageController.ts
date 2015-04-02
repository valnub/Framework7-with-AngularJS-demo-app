/// <reference path="../../angular/angular.d.ts"/>

module ft.pages{
  
  export interface IScope extends ng.IScope{
    events: PageController;  
  }
 
  /**
   * Do not instantiate this. This is just an abstract class.
   * If you'd like to create a new PageController extend this class.
   *
   * @class
   * @abstract
   * @example IndexPageController
   */
  export class PageController{
    scope: IScope;
 
    constructor($scope: IScope){
      this.scope        = $scope;
      this.scope.events = this;
    }
  }
  
}
var EmpApp = angular.module('EmpApp', ['ngRoute', 'EmpControllers']);
EmpApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/list',
        {
            templateUrl: 'Employee/list.html',
            Controller: 'ListController'
        }).
        when('/create',
        {
            templateUrl: 'Employee/edit.html',
            Controller: 'EditController'
        }).
        when('/edit/:id',
        {
            templateUrl: 'Employee/edit.html',
            Controller: 'EditController'
        }).
        when('/delete/:id',
        {
            templateUrl: 'Employee/delete.html',
            Controller: 'DeleteController'
        }).
        otherwise(
        {
            //templateUrl: 'Employee/list.html',
            //Controller: 'ListController'
            redirectTo: '/list'
        });
}]);
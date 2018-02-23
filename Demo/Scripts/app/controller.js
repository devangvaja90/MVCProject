var EmpControllers = angular.module("EmpControllers", ["ui.grid.pagination", "ui.grid.edit"]);
EmpControllers.controller("ListController", function ($scope, $http,$location) {
    $scope.gridOptions = {
        paginationPageSizes: [5, 10, 20],
        paginationPageSize: 5,
        enableFiltering: true,
        columnDefs: [
        { field: 'ID' },
        { field: 'FIRTSNAME' },
        { field: 'LASTNAME' },
        { field: 'DOB' },
        { field: 'SALARY' },
        { field: 'LOCATION' },
        { field: 'DEPTNAME' },
         { name: 'actions', displayName: 'Actions', enableFiltering: false ,cellTemplate: '<button id="editBtn" type="button" class="btn btn-small btn-primary" ng-click="grid.appScope.edit(row.entity.ID)" >Edit</button><button id="deleteBtn" type="button" class="btn btn-small btn-danger" ng-click="grid.appScope.remove(row.entity.ID)" >Remove</button>' },
        ],
        onRegisterApi: function (gridApi) {
            $scope.grid1Api = gridApi;
        }
    };
    $scope.edit = function (entity) {
        $location.path('/edit/' + entity);
    }

    $scope.remove = function (entity) {
        $location.path('/delete/' + entity);
    }
    $http.get('/api/employee').then(function (response) {
        $scope.gridOptions.data = response.data;
    });
});

//EmpControllers.controller("ListController", ['$scope', '$http',
//    function ($scope, $http) {
//        $http.get('/api/employee').then(function (response) {
//            $scope.employees = response.data;
//        });
//    }
//]);

EmpControllers.controller("DeleteController", ['$scope', '$http', '$routeParams','$location',
    function ($scope, $http, $routeParams,$location) {
        $scope.Id = $routeParams.id;
        $http.get('/api/employee/' + $routeParams.id).then(function (response) {
            $scope.FirtsName = response.data[0].FIRTSNAME;
            $scope.LastName = response.data[0].LASTNAME;
            $scope.Salary = response.data[0].SALARY;
            $scope.DOB = response.data[0].DOB;
            $scope.Location = response.data[0].LOCATION;
            $scope.DeptName = response.data[0].DEPTNAME;
        });
        $scope.Delete = function () {
            $http.delete('/api/employee/' + $scope.Id).then(function (data) {
                $location.path('/list');
            }),function (data) {
                $scope.error = 'An error occured while deleting Employee!' + data;
            };
        };
    }]);
EmpControllers.controller("EditController", ['$scope', '$http', '$routeParams','$location',
function ($scope, $http, $routeParams,$location) {
    $http.get('/api/department').then(function (data) {
        $scope.Departments = data.data;
    });
    $scope.Id = 0;
    //$scope.getDepartment = function () {
    //    var Dept = $scope.Department;
    //    if (Dept) {
    //        $http.get('/api/department' + Dept).then(function (data) {
    //            $scope.Department = data.Department;
    //        });
    //    }
    //    else {
    //        $scope.Department = null;
    //    }
    //}
    $scope.save = function () {
        var obj = {
            ID: $scope.Id,
            FIRTSNAME: $scope.FirtsName,
            LASTNAME: $scope.LastName,
            DOB: $scope.DOB,
            SALARY: $scope.Salary,
            LOCATION: $scope.Location,
            DEPT: $scope.DeptId
        };
      //  $scope.returnUrl = $location.path('/#/list');
        if ($scope.Id == 0) {
            $http({
                url: '/api/employee/',
                dataType:JSON,
                method: "POST",
                data: obj,
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                // success
                alert('Data Saved Successfully');
               // $location.path('/list');
            },
    function (response) { // optional
        // failed
        $scope.error = 'An error occured while adding employee..!!!' + response.data;
    });
        }
        else {
            $http({
                url: '/api/employee/',
                dataType: JSON,
                method: "PUT",
                data: obj,
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                // success
                alert('Data Saved Successfully');
                 $location.path('/list');
            },
   function (response) { // optional
       // failed
       $scope.error = 'An error occured while adding employee..!!!' + response.data;
   });
        }
    }
    if ($routeParams.id) {
        $scope.Id = $routeParams.id;
        $scope.title = "Edit Employee";
        $http.get('/api/employee/' + $routeParams.id).then(function (response) {
            $scope.FirtsName = response.data[0].FIRTSNAME;
            $scope.LastName = response.data[0].LASTNAME;
            $scope.Salary = response.data[0].SALARY;
            $scope.DOB = response.data[0].DOB;
            $scope.Location = response.data[0].LOCATION;
            $scope.DeptId = response.data[0].DEPT;
        });
    }
    else {
        $scope.title = "Create New Employee";
    }
}]);
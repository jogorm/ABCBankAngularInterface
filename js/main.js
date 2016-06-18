var app = angular.module('myApp', []);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);


app.controller('MyController', function ($scope, $http) {
    $scope.person = {
        name: "Ari Lerner"
    };

    //$scope.loadedParams = [];
    //$scope.loadAccounts = function () {
    //    bankService.getAccounts().then(function (params) {
    //        params.forEach(function (value) {
    //            $scope.loadedParams.push(value);
    //        })
    //    })
    //}

    //$scope.loadAccounts();

    //    $http({
    //        method: 'GET',
    //        //url: ''
    //        url: 'http://www.w3schools.com/angular/customers.php'
    //    }).success(function (response, status) {
    //        $scope.accounts = response.data.records;
    //        console.log(response.records);
    //    }).error(function (data, status) {
    //        $scope.error = "Error status: " + status;
    //    });


    //});

    $http.get("http://abcmoneygroup.cloudapp.net/Service1.svc/getallAccounts").then(function (response) {
        $scope.accounts = response.data.GetAllAccountsResult;
    })
});


//app.service("bankService", function ($rootScope, $location, $http, $q) {

//    this.getAccounts = function () {
//        var deferred = $q.defer();
//        $http.get('http://abcmoneygroup.cloudapp.net/Service1.svc/getAllAccounts').success(function (res) {
//            deferred.resolve(res);
//        }, function (e) {
//            deferred.reject();
//        });
//        return deferred.promise;
//    }
//})
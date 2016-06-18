app.service("bankService", function ($rootScope, $location, $http, $q) {

    this.getAccounts = function () {
        var deferred = $q.defer();
        $http.get('http://abcmoneygroup.cloudapp.net/Service1.svc/getAllAccounts').success(function (res) {
            deferred.resolve(res);
        }, function (e) {
            deferred.reject();
        });
        return deferred.promise;
    }
})
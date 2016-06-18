var app = angular.module('myApp', ['ui.bootstrap']);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);


app.controller('MyController', function ($scope, $http, $modal) {
    $scope.person = {
        name: "Ari Lerner"
    };

    $scope.showUpdateForm = false;

    $scope.formFirstName = "";
    $scope.formLastName = "";
    $scope.formAddress = "";
    $scope.formPostCode = "";
    $scope.formTelephone ="";
    $scope.formPin = "";



    $http.get("http://abcmoneygroup.cloudapp.net/Service1.svc/getallAccounts").then(function (response) {
        $scope.accounts = response.data.GetAllAccountsResult;
    })


    $scope.removeAccount = function (account) {
        if (confirm("Are you sure you want to delete this account?")) {
            $http.get("http://abcmoneygroup.cloudapp.net/Service1.svc/deleteAccount/" + account).then(function (response) {
                $scope.deleteResult = response.data;
                
            })
        }
    }

    $scope.updateAccount = function (accountID, firstName, lastName, address, postCode, telephone, balance, pin, run) {      
        if ($scope.showUpdateForm != true) {
            console.log("show update = false");
            //console.log(accountID, firstName, lastName, address, postCode, telephone, balance)
            $scope.showUpdateForm = true;
            $scope.updateAccountID = accountID;
            $scope.updateFirstName = firstName.trim();
            $scope.updateLastName = lastName.trim();
            $scope.updateAddress = address.trim();
            $scope.updatePostCode = postCode.trim();
            $scope.updateTelephone = telephone.trim();
            $scope.updateBalance = balance;
            $scope.updatePin = pin;
            $scope.updateRunningTotals = run;

        }
        else {
            $scope.showUpdateForm = false;
        }
        
    };

    $scope.editAccount = function () {
        $scope.edit = {};
        $scope.edit.accountId = $scope.updateAccountID;
        $scope.edit.balance = $scope.updateBalance;
        $scope.edit.runningTotals = $scope.updateRunningTotals;
        $scope.edit.firstName = $scope.updateFirstName;
        $scope.edit.lastName = $scope.updateLastName;
        $scope.edit.address = $scope.updateAddress;
        $scope.edit.postcode = $scope.updatePostCode;
        $scope.edit.telephone = $scope.updateTelephone;
        $scope.edit.pin = $scope.updatePin;

        var editJSON = JSON.stringify($scope.edit);
        console.log(editJSON);

        return $http.post("http://abcmoneygroup.cloudapp.net/Service1.svc/updateAccount", editJSON);
    }

    $scope.showTransactions = function (accountId) {
        $http.get("http://abcmoneygroup.cloudapp.net/service1.svc/GetTransactionsForAccount/" + accountId).then(function (response) {
            
            $scope.transactions = response.data.GetTransactionsForAccountResult;

            $scope.dateTime = [];
            $scope.amount = [];
            response.data.GetTransactionsForAccountResult.forEach(function (value) {
                $scope.dateTime.push(value.dateTime);
                $scope.amount.push(value.amount);
            })
            
            $scope.dateTimeClean = [];
            $scope.dateTime.forEach(function (value) {
                $scope.dateTimeClean.push(value.substring(6, 19));
            })

        $scope.cleanTransactions = [];
        for (var i = 0; i < $scope.dateTime.length; i++) {
            //$scope.cleanTransactions.push([$scope.dateTimeClean[i], $scope.amount[i]]);
            $scope.cleanTransactions.push({ dateTime: $scope.dateTimeClean[i], amount: $scope.amount[i] });
        }
        console.log($scope.cleanTransactions);
        })
    }
   

    $scope.uploadAccount = function () {
        $scope.settings = {};
        $scope.settings.balance = 0;
        $scope.settings.runningTotals = 0;
        $scope.settings.firstName = $scope.formFirstName;
        $scope.settings.lastName = $scope.formLastName;
        $scope.settings.address = $scope.formAddress;
        $scope.settings.postcode = $scope.formPostCode;
        $scope.settings.telephone = $scope.formTelephone;
        $scope.settings.pin = $scope.formPin;

        
        var json = JSON.stringify($scope.settings);
        console.log(json);
        console.log("Clicked button");
        
        return $http.post("http://abcmoneygroup.cloudapp.net/Service1.svc/createAccount", json);
    }


    $scope.addModal = function () {
        console.log("addModal");

        ModalService.showModal({
            templateUrl: '/addAccount.html',
            controller: addController
        })
        //var modalInstance = $modal.open({
            
        //});

        //modalInstance.result.then(function () {
        //    console.log('modal dismissed');
        //})
    }
});


var addController = function ($scope, $modalInstance) {

    $scope.close = function () {
        $modalInstance.dismiss('close');
    }

    $scope.add = function () {
        $modalInstance.close();
    }
}

app.config(function ($httpProvider) {
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};

})


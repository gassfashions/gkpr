/*** App Module */
var gateKeeperApp = angular.module("gateKeeperApp", ['ngRoute', 'ngAnimate', 'ngTouch', 'ngCookies', 'lazy-scroll', 'ngMaterialDatePicker', 'ngMask']);


var serviceBase = 'http://api.gassgadget.com/public/';
var runningSiteURL = 'http://api.gassgadget.com/gkpr';
var mainSiteURL = 'http://api.gassgadget.com/gkpr';
var mainSiteImageURL = 'http://api.gassgadget.com/gkpr';
var mainSiteBannerURL = 'http://api.gassgadget.com/gkpr';

var defaultLocalPath = '#/';

/*** Configure the Routes */
gateKeeperApp.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
    .when('/', {
        templateUrl: 'templates/login.html',
        controller: 'loginPageCtrl'
    })
    .when('/dashboard.html', {
        templateUrl: 'templates/dashboard.html',
        controller: 'dashboardPageCtrl'
    })
    .when('/logout.html', {
        templateUrl: 'templates/logout.html',
        controller: 'logoutPageCtrl'
    })
    .otherwise("/", {
        templateUrl: "login.html",
        controller: "loginPageCtrl"
    });

    // configure html5 to get links working on jsfiddle
    //$locationProvider.html5Mode(true);

});


gateKeeperApp.run(function($rootScope, $window, $cookies, $anchorScroll) {
    
    $rootScope.checkConnection = function() {
        return true;
        //$rootScope.connectionFound = true;
        if(isIOS()) {
            $rootScope.connectionFound = true;
        } else {
            var networkState = navigator.connection.type;
            $rootScope.networkState = networkState;
            $rootScope.connectionFound = true;

            if (networkState == 'none') {
                //$rootScope.alert('No Internet Connection !', '', '');
                $('#alert_text_div').html('No Internet Connection !');
                $('#alert_main_div').removeClass('hide');
                $rootScope.connectionFound = false;
                return false;
            }
        }
        return true;

    };
    
    $rootScope.checkiOS = function() {
        if(isIOS()) {
            $rootScope.bodyClass = 'iosApp';
            $rootScope.deviceType = 'ios';
        } else {
            $rootScope.bodyClass = 'androidApp';
            $rootScope.deviceType = 'android';
        }

    };
    
    
    function isIOS() {

        var iDevices = [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ];

        //alert(navigator.platform);

        if (!!navigator.platform) {
            while (iDevices.length) {
                if (navigator.platform === iDevices.pop()){ return true; }
            }
        }

        return false;
    }
});


gateKeeperApp.filter('unsafe', function($sce) { return $sce.trustAsHtml; });


gateKeeperApp.controller('mainCtrl', function ($scope, $route, $routeParams, $location, $http, $cookies, $rootScope) {
    
    $scope.pageAnimation = 'pageAnimate';
    
    $rootScope.checkiOS();
    
    $('#loading_span_id').html('Loading');
    
    $scope.contentFound = 0; 
    $rootScope.cookie_user_id = $cookies.get('cookie_user_id');
    
    document.addEventListener("deviceready",onDeviceReady,false);

    // Cordova is ready to be used!
    //
    function onDeviceReady() {
        $rootScope.mobile_uuid     = $scope.mobile_uuid     = device.uuid;
        $rootScope.mobile_platform = $scope.mobile_platform = device.platform;
    }
    
    if($rootScope.cookie_user_id){
        $scope.name = $cookies.get('cookie_name');
        /*$scope.user_fullname = $cookies.get('user_fullname');
        $scope.user_email = $cookies.get('user_email');
        $scope.profile_image = $cookies.get('profile_image');
        $scope.flat_number = $cookies.get('flat_number');*/
        $scope.mainSiteImageURL = mainSiteImageURL;
        $scope.defaultLocalPath = defaultLocalPath;
        
        window.location.href = defaultLocalPath+'dashboard.html';
    }

    $scope.baseUrl = $location.host();
});


gateKeeperApp.controller('loginPageCtrl', function ($scope, $http, $cookies, $rootScope) {
 
    $scope.$parent.contentFound = 0;   
    $scope.contentFound = 0;

    $scope.mainSiteImageURL = mainSiteImageURL;
    $scope.defaultLocalPath = defaultLocalPath;
    

    $scope.checkLoginValidity = function(userObj) {
        
        if ($rootScope.checkConnection()) {
            if(userObj.user === undefined || userObj.user === ''){
                //$rootScope.alert("Please enter flat/unit number.", '', '');
                $('#alert_text_div').html('Please enter user.');
                $('#alert_main_div').removeClass('hide');
                //setTimeout(function(){$("#flat_number").focus()}, 0);
            }
            else if(userObj.user_password === undefined || userObj.user_password === '') { //if string is empty
                //$rootScope.alert("Please enter password.", '', '');
                $('#alert_text_div').html('Please enter password.');
                $('#alert_main_div').removeClass('hide');
                //setTimeout(function(){$("#user_password").focus()}, 0);
            } else {

                $('#loading_span_id').html('Validating');
                $scope.$parent.contentFound = 0;   
                $scope.contentFound = 0;

                $http.get(serviceBase + 'getValidateUser?user='+encodeURIComponent(userObj.user)+'&password='+encodeURIComponent(userObj.user_password)).then(function (data){
                    $scope.loginObj = data.data.data;
                    $scope.loginObjmsg = data.data.msg;
                    // Setting a cookie
                    if($scope.loginObjmsg=='success'){
                        $cookies.put('cookie_user_id', $scope.loginObj.user_id);  
                        $cookies.put('cookie_name', $scope.loginObj.name);  
                        /*$cookies.put('flat_number', $scope.loginObj.flat_number);  
                        $cookies.put('user_fullname', $scope.loginObj.user_fullname);  
                        $cookies.put('user_email', $scope.loginObj.user_email); 
                        $cookies.put('profile_image', $scope.loginObj.profile_image);*/ 

                        $rootScope.cookie_user_id = $cookies.get('cookie_user_id');
                        $rootScope.name = $cookies.get('name');
                        /*$rootScope.user_fullname = $cookies.get('user_fullname');
                        $rootScope.user_email = $cookies.get('user_email');
                        $rootScope.profile_image = $cookies.get('profile_image');
                        $rootScope.flat_number = $cookies.get('flat_number');*/
                        //$rootScope.goForward();
                        $('#loading_span_id').html('Loading');
                       
                       window.location.href = defaultLocalPath+'dashboard.html';
                    }
                    else{
                        $scope.$parent.contentFound = 1;   
                        $scope.contentFound = 1;
                        $('#loading_span_id').html('Loading');

                        $("#login_error").html("<div class='alert alert-danger text-center'>"+$scope.loginObjmsg+"</div>");
                        setTimeout(function(){$('#login_error').html('')}, 2500);
                    }
                });
            }
        }
    };

    $scope.$parent.contentFound = 1;   
    $scope.contentFound = 1;
});


gateKeeperApp.controller('logoutPageCtrl', function ($scope, $cookies, $rootScope) {

    $scope.$parent.contentFound = 0;   
    $scope.contentFound = 0;
    var cookies = $cookies.getAll();
    angular.forEach(cookies, function (v, k) {
        $cookies.remove(k);
    });

    $cookies.put('cookie_user_id', '');  
    $cookies.put('cookie_name', '');  
    /*$cookies.put('flat_number', '');  
    $cookies.put('user_fullname', '');  
    $cookies.put('user_email', '');  
    $cookies.put('profile_image', '');*/ 

    $cookies.remove('cookie_user_id');  
    $cookies.remove('cookie_name');  
    /*$cookies.remove('flat_number');  
    $cookies.remove('user_fullname');  
    $cookies.remove('user_email');  
    $cookies.remove('profile_image');*/ 
                    
    $rootScope.cookie_user_id = '';
    $rootScope.cookie_name = '';
    /*$rootScope.user_fullname = '';
    $rootScope.user_email = '';
    $rootScope.profile_image = '';
    $rootScope.flat_number = '';*/
    
    window.location.href = defaultLocalPath;

});


gateKeeperApp.controller('dashboardPageCtrl', function ($scope, $http, $rootScope, $cookies) {
    
    if(!$rootScope.cookie_user_id){
        location.href = defaultLocalPath;
    }
    $scope.mainSiteImageURL = mainSiteImageURL;
    $scope.defaultLocalPath = defaultLocalPath;
    
    //$scope.profile_image = $cookies.get('profile_image');

    $('#loading_span_id').html('Loading');
    $scope.$parent.contentFound = 0;   
    $scope.contentFound = 0;

    var dateObj = new Date();

    var months_array = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    $scope.currentDate = dateObj.getDate();
    $scope.currentDateSup = nth(dateObj.getDate());
    $scope.currentMonth = months_array[dateObj.getMonth()];
    $scope.currentYear = dateObj.getFullYear();
    $scope.user_fullname = $cookies.get('user_fullname');

    if ($rootScope.checkConnection()) {
        $http.get(serviceBase + 'getAllNotifications?show_count_only=1&user_id='+encodeURIComponent($rootScope.cookie_user_id)).then(function (data){
            $scope.notificationsCount = data.data.data;
        });
    }

    $scope.clsUserNav = '';

    $scope.toggleUserNav = function () {        
        if ($scope.clsUserNav === "")
            $scope.clsUserNav = "showUserNav";
        else
            $scope.clsUserNav = "";
    };

    $('*').on('click', function (e) {
        if (e.target.className === "sideNavContainer showUserNav") {
            $('.sideNavContainer').removeClass('showUserNav');
        }
    });
    
    

    function nth(d) {
        if(d>3 && d<21) return 'th'; // thanks kennebec
        switch (d % 10) {
            case 1:  return "st";
            case 2:  return "nd";
            case 3:  return "rd";
            default: return "th";
        }
    }

    
    $scope.$parent.contentFound = 1;   
    $scope.contentFound = 1;
    

});

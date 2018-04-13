/*** App Module */
var rwaApp = angular.module("rwaApp", ['ngRoute', 'ngAnimate', 'ngTouch', 'ngCookies', 'lazy-scroll', 'ngMaterialDatePicker', 'cp.ngConfirm', 'ngMask']);


var serviceBase = 'http://api.hhrwa.in/';
var runningSiteURL = 'http://app.hhrwa.in';
var mainSiteURL = 'http://app.hhrwa.in';
var mainSiteImageURL = 'http://www.hhrwa.in';
var mainSiteBannerURL = 'http://www.hhrwa.in';

var defaultLocalPath = '#/';

/*** Configure the Routes */
rwaApp.config(function ($routeProvider, $locationProvider) {
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
    .when('/my_profile.html', {
        templateUrl: 'templates/my-profile.html',
        controller: 'myProfilePageCtrl'
    })
    .when('/change_password.html', {
        templateUrl: 'templates/change-password.html',
        controller: 'changePasswordPageCtrl'
    })
    .when('/my_members.html', {
        templateUrl: 'templates/my-members.html',
        controller: 'myMembersPageCtrl'
    })
    .when('/notifications.html', {
        templateUrl: 'templates/notifications.html',
        controller: 'notificationsPageCtrl'
    })
    .when('/poll_details.html', {
        templateUrl: 'templates/poll_details.html',
        controller: 'pollDetailsPageCtrl'
    })
    .when('/members_list.html', {
        templateUrl: 'templates/members-list.html',
        controller: 'membersListPageCtrl'
    })
    .when('/member_detail.html/:user_id', {
        templateUrl: 'templates/member-detail.html',
        controller: 'memberDetailPageCtrl'
    })
    .when('/near_by_services.html', {
        templateUrl: 'templates/near-by-services.html',
        controller: 'nearByServicesPageCtrl'
    })
    .when('/vendor_services.html', {
        templateUrl: 'templates/vendor-services.html',
        controller: 'vendorServicesPageCtrl'
    })
    .when('/events.html', {
        templateUrl: 'templates/events.html',
        controller: 'eventsPageCtrl'
    })
    .when('/event_detail.html/:event_id', {
        templateUrl: 'templates/event-detail.html',
        controller: 'eventDetailPageCtrl'
    })
    .when('/my_events.html', {
        templateUrl: 'templates/my-events.html',
        controller: 'myEventsPageCtrl'
    })
    .when('/my_event_detail.html/:event_id', {
        templateUrl: 'templates/my-event-detail.html',
        controller: 'myEventDetailPageCtrl'
    })
    .when('/edit_event.html/:event_id', {
        templateUrl: 'templates/edit-event.html',
        controller: 'editEventPageCtrl'
    })
    .when('/edit_event_comment.html/:event_id', {
        templateUrl: 'templates/edit-event-comment.html',
        controller: 'editEventCommentPageCtrl'
    })
    .when('/add_event.html', {
        templateUrl: 'templates/add-event.html',
        controller: 'addNewEventPageCtrl'
    })
    .when('/complaints.html', {
        templateUrl: 'templates/complaints.html',
        controller: 'complaintsPageCtrl'
    })
    .when('/complaint_detail.html/:complaint_id', {
        templateUrl: 'templates/complaint-detail.html',
        controller: 'complaintDetailPageCtrl'
    })
    .when('/add_complaint.html', {
        templateUrl: 'templates/add-complaint.html',
        controller: 'addComplaintPageCtrl'
    })
    .when('/message_board.html', {
        templateUrl: 'templates/message-board.html',
        controller: 'msgBoardPageCtrl'
    })
    .when('/add_event.html', {
        templateUrl: 'templates/add-event.html',
        controller: 'addNewEventPageCtrl'
    })
    .when('/feedback.html', {
        templateUrl: 'templates/feedback.html',
        controller: 'feedbackPageCtrl'
    })
    .when('/payment_summary.html', {
        templateUrl: 'templates/payment-summary.html',
        controller: 'paymentSummaryPageCtrl'
    })
    .when('/logout.html', {
        templateUrl: 'templates/logout.html',
        controller: 'logoutPageCtrl'
    })
    .when('/test.html', {
        templateUrl: 'templates/test.html',
        controller: 'testPageCtrl'
    })
    .otherwise("/", {
        templateUrl: "login.html",
        controller: "loginPageCtrl"
    });

    // configure html5 to get links working on jsfiddle
    //$locationProvider.html5Mode(true);

});

rwaApp.run(function($rootScope, $window, $cookies, $anchorScroll) {
    
    $rootScope.gotoTopClick = function() {
        $('.gotoTop').removeClass('in');
        $anchorScroll('header_id');
    }
    
    $rootScope.goForward = function() {
        /*window.plugins.nativepagetransitions.slide(
            {
            "direction" : "left",
            "slowdownfactor" : 1
            }
        );*/
    }
        
    $rootScope.goBackward = function() {
        /*window.plugins.nativepagetransitions.slide(
            {
            "direction" : "right",
            "slowdownfactor" : 1
            }
        );*/
    }
    
    $rootScope.alertDismissed = function() {
        // do something
    }
    
    $rootScope.alert = function(message, title, buttonName) {
        //alert(message);
       
       //if (title == '') title = 'HHRWA Says';
       title = '';
       if (buttonName == '') buttonName = 'Ok';
       
       navigator.notification.alert(
            message,       
            $rootScope.alertDismissed(),         
            title,            
            buttonName               
        );
    }
    
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


rwaApp.filter('unsafe', function($sce) { return $sce.trustAsHtml; });


rwaApp.controller('mainCtrl', function ($scope, $route, $routeParams, $location, $http, $cookies, $rootScope) {
    
    $scope.pageAnimation = 'pageAnimate';
    
    $rootScope.checkiOS();
    
    $('#loading_span_id').html('Loading');
    
    $scope.contentFound = 0; 
    
    $rootScope.cookie_user_id = localStorage.getItem('cookie_user_id');
    
    document.addEventListener("deviceready",onDeviceReady,false);

    // Cordova is ready to be used!
    //
    function onDeviceReady() {
        $rootScope.mobile_uuid     = $scope.mobile_uuid     = device.uuid;
        $rootScope.mobile_platform = $scope.mobile_platform = device.platform;
        //pictureSource=navigator.camera.PictureSourceType;
        //destinationType=navigator.camera.DestinationType;
        
        /*alert('onDeviceReady');
        alert('cordova: '+device.cordova); //cordova6.0.0
        alert('uuid: '+device.uuid); //c8492764b329089b
        alert('version: '+device.version); //5.0.2
        alert('serial: '+device.serial); //4e15957f*/
        //pictureSource=navigator.camera.PictureSourceType;
        //destinationType=navigator.camera.DestinationType;
    }
    
    if($rootScope.cookie_user_id){

        $scope.user_fullname = localStorage.getItem('user_fullname');
        $scope.user_email = localStorage.getItem('user_email');
        $scope.profile_image = localStorage.getItem('profile_image');
        $scope.flat_number = localStorage.getItem('flat_number');
        $scope.is_event_organizer = localStorage.getItem('is_event_organizer');
        $scope.mainSiteImageURL = mainSiteImageURL;
        $scope.defaultLocalPath = defaultLocalPath;

        if ($scope.user_email == '') {
            window.location.href = defaultLocalPath+'my_profile.html';
        } else {
            window.location.href = defaultLocalPath+'dashboard.html';
        }
    }


    //$scope.contentFound = 1; 
    //$scope.ClsBody = "";
    $scope.baseUrl = $location.host();
});


rwaApp.controller('loginPageCtrl', function ($scope, $http, $cookies, $rootScope) {
 
    $scope.$parent.contentFound = 0;   
    $scope.contentFound = 0;

    $scope.mainSiteImageURL = mainSiteImageURL;
    $scope.defaultLocalPath = defaultLocalPath;

    $scope.checkLoginValidity = function(userObj) {
        
        if ($rootScope.checkConnection()) {
            if(userObj.flat_number === undefined || userObj.flat_number === ''){
                //$rootScope.alert("Please enter flat/unit number.", '', '');
                $('#alert_text_div').html('Please enter flat/unit number.');
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

                $http.get(serviceBase + 'getAuthorizeUser?flat_number='+encodeURIComponent(userObj.flat_number)+'&password='+encodeURIComponent(userObj.user_password)).then(function (data){
                    $scope.loginObj = data.data.data;
                    $scope.loginObjmsg = data.data.msg;
                    // Setting a cookie
                    if($scope.loginObjmsg=='success'){
                        localStorage.setItem('cookie_user_id', $scope.loginObj.user_id);  
                        localStorage.setItem('flat_number', $scope.loginObj.flat_number);  
                        localStorage.setItem('user_fullname', $scope.loginObj.user_fullname);  
                        localStorage.setItem('user_email', $scope.loginObj.user_email);  
                        localStorage.setItem('profile_image', $scope.loginObj.profile_image); 
                        localStorage.setItem('is_event_organizer', $scope.loginObj.is_event_organizer); 
                        localStorage.setItem('parent_user_id', $scope.loginObj.parent_user_id); 

                        $rootScope.cookie_user_id = localStorage.getItem('cookie_user_id');
                        $rootScope.user_fullname = localStorage.getItem('user_fullname');
                        $rootScope.user_email = localStorage.getItem('user_email');
                        $rootScope.profile_image = localStorage.getItem('profile_image');
                        $rootScope.flat_number = localStorage.getItem('flat_number');
                        $rootScope.is_event_organizer = localStorage.getItem('is_event_organizer');
                        $rootScope.parent_user_id = localStorage.getItem('parent_user_id');
                        $rootScope.goForward();
                        $('#loading_span_id').html('Loading');
                        if ($rootScope.user_email == '') {
                            window.location.href = defaultLocalPath+'my_profile.html';
                        } else {
                            window.location.href = defaultLocalPath+'dashboard.html';
                        }
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


    $scope.forgotPasswordClick = function(userObj) {
        if ($rootScope.checkConnection()) {
            if(userObj.flat_number === undefined || userObj.flat_number === ''){
                //$rootScope.alert("Please enter flat/unit number.", '', '');
                $('#alert_text_div').html('Please enter flat/unit number.');
                $('#alert_main_div').removeClass('hide');
            }
            else if(userObj.mobile_number === undefined || userObj.mobile_number === '') { //if string is empty
                //$rootScope.alert("Please enter mobile number.", '', '');
                $('#alert_text_div').html('Please enter mobile number.');
                $('#alert_main_div').removeClass('hide');
            } else {

                $('#loading_span_id').html('Checking');
                $scope.$parent.contentFound = 0;   
                $scope.contentFound = 0;

                $http.get(serviceBase + 'setUserPassword?flat_number='+encodeURIComponent(userObj.flat_number)+'&mobile_number='+encodeURIComponent(userObj.mobile_number)).then(function (data){
                    $scope.loginObjmsg = data.data.msg;
                    // Setting a cookie
                    if($scope.loginObjmsg=='success'){
                        $("#forgot_password_error").html("<div class='alert alert-success text-center'>New Password ("+data.data.data+") has been send to your registered Mobile number.</div>");
                        setTimeout(function(){$('#forgot_password_error').html('')}, 2500);
                    }
                    else {
                        $("#forgot_password_error").html("<div class='alert alert-danger text-center'>"+$scope.loginObjmsg+"</div>");
                        setTimeout(function(){$('#forgot_password_error').html('')}, 2500);
                    }
                    
                    $scope.$parent.contentFound = 1;   
                    $scope.contentFound = 1;
                    $('#loading_span_id').html('Loading');
                });
            }
        }
    };

    $scope.registerUserClick = function(userObj) {
        if ($rootScope.checkConnection()) {
            if(userObj.flat_number === undefined){
                //$rootScope.alert("Please enter flat/unit number.", '', '');
                $('#alert_text_div').html('Please enter flat/unit number.');
                $('#alert_main_div').removeClass('hide');
            }
            else if(userObj.mobile_number === undefined) { //if string is empty
                //$rootScope.alert("Please enter mobile number.", '', '');
                $('#alert_text_div').html('Please enter mobile number.');
                $('#alert_main_div').removeClass('hide');
            } else {

                $('#loading_span_id').html('Checking');
                $scope.$parent.contentFound = 0;   
                $scope.contentFound = 0;

                $http.get(serviceBase + 'setRegisterUser?flat_number='+encodeURIComponent(userObj.flat_number)+'&mobile_number='+encodeURIComponent(userObj.mobile_number)).then(function (data){
                    $scope.loginObjmsg = data.data.msg;
                    // Setting a cookie
                    if($scope.loginObjmsg=='success'){

                        userObj.user_id = data.data.data;
                        userObj.mobile_number_four_digit = userObj.mobile_number.substr(-4);

                        $('.logRegSteps [class*="logRegStep-"]').removeClass('active');
                        $('#confirmOtp').addClass('active');

                    }
                    else {
                        $("#register_error").html("<div class='alert alert-danger text-center'>"+$scope.loginObjmsg+"</div>");
                        setTimeout(function(){$('#register_error').html('')}, 2500);
                    }

                    $scope.$parent.contentFound = 1;   
                    $scope.contentFound = 1;
                    $('#loading_span_id').html('Loading');
                });
            }
        }
    };


    $scope.resendOtpClick = function(user_id) {

        if ($rootScope.checkConnection()) {
            $('#loading_span_id').html('Resending OTP');
            $scope.$parent.contentFound = 0;   
            $scope.contentFound = 0;

            $http.get(serviceBase + 'setResendOtpToUser?user_id='+user_id).then(function (data){
                $scope.loginObjmsg = data.data.msg;
                // Setting a cookie
                if($scope.loginObjmsg=='success'){
                    $("#register_otp_error").html("<div class='alert alert-success text-center'>OTP Sent to Registered Mobile Number.</div>");
                    setTimeout(function(){$('#register_otp_error').html('')}, 2500);
                }
                else {
                    $("#register_otp_error").html("<div class='alert alert-danger text-center'>"+$scope.loginObjmsg+"</div>");
                    setTimeout(function(){$('#register_otp_error').html('')}, 2500);
                }

                $scope.$parent.contentFound = 1;   
                $scope.contentFound = 1;
                $('#loading_span_id').html('Loading');
            });
        }

    };


    $scope.confirmOTPClick = function(userObj) {
        if ($rootScope.checkConnection()) {
            if(userObj.user_otp === undefined) { //if string is empty
                //$rootScope.alert("Please enter otp code.", '', '');
                $('#alert_text_div').html('Please enter otp code.');
                $('#alert_main_div').removeClass('hide');
            } else {
                $('#loading_span_id').html('Checking');
                $scope.$parent.contentFound = 0;   
                $scope.contentFound = 0;

                $http.get(serviceBase + 'getValidateUserOtp?user_id='+encodeURIComponent(userObj.user_id)+'&user_otp='+encodeURIComponent(userObj.user_otp)).then(function (data){
                    $scope.loginObjmsg = data.data.msg;
                    // Setting a cookie
                    if($scope.loginObjmsg=='success'){
                        userObj.user_id = data.data.data;

                        $('.logRegSteps [class*="logRegStep-"]').removeClass('active');
                        $('#setupProfile').addClass('active');

                        $("#setup_profile_error").html("<div class='alert alert-success text-center'>OTP Validate successfully. Please Setup the New Password.</div>");
                        setTimeout(function(){$('#setup_profile_error').html('')}, 3500);
                    }
                    else {
                        $("#register_otp_error").html("<div class='alert alert-danger text-center'>"+$scope.loginObjmsg+"</div>");
                        setTimeout(function(){$('#register_otp_error').html('')}, 3500);
                    }

                    $scope.$parent.contentFound = 1;   
                    $scope.contentFound = 1;
                    $('#loading_span_id').html('Loading');
                });
            }
        }
    };


    $scope.setUpUserPassword = function(userObj) {
        if ($rootScope.checkConnection()) {
            if(userObj.user_password === undefined) { //if string is empty
                //$rootScope.alert("Please enter new password.", '', '');
                $('#alert_text_div').html('Please enter new password.');
                $('#alert_main_div').removeClass('hide');
            } else if(userObj.conf_user_password === undefined) { //if string is empty
                //$rootScope.alert("Please re type password.", '', '');
                $('#alert_text_div').html('Please re type password.');
                $('#alert_main_div').removeClass('hide');
            } else if(userObj.user_password != userObj.conf_user_password) { //if string is empty
                //$rootScope.alert("Password and re type password must match.", '', '');
                $('#alert_text_div').html('Password and re type password must match.');
                $('#alert_main_div').removeClass('hide');
            } else {
                $('#loading_span_id').html('Updating Data');
                $scope.$parent.contentFound = 0;   
                $scope.contentFound = 0;

                $http.get(serviceBase + 'setUserProfilePassword?user_id='+encodeURIComponent(userObj.user_id)+'&user_password='+encodeURIComponent(userObj.user_password)+'&mobile_uuid='+encodeURIComponent($rootScope.mobile_uuid)+'&mobile_platform='+encodeURIComponent($rootScope.mobile_platform)).then(function (data){
                    $scope.loginObjmsg = data.data.msg;
                    // Setting a cookie
                    if($scope.loginObjmsg=='success'){

                        localStorage.setItem('flat_number', data.data.data);                      
                        localStorage.setItem('cookie_user_id', userObj.user_id);
                        localStorage.setItem('user_fullname', '');
                        localStorage.setItem('user_email', '');

                        $rootScope.cookie_user_id = localStorage.getItem('cookie_user_id');
                        $rootScope.flat_number = localStorage.getItem('flat_number');
                        $rootScope.user_fullname = localStorage.getItem('user_fullname');
                        $rootScope.user_email = localStorage.getItem('user_email');

                        window.location.href = defaultLocalPath+'my_profile.html';
                    }
                    else {
                        $("#setup_profile_error").html("<div class='alert alert-danger text-center'>"+$scope.loginObjmsg+"</div>");
                        setTimeout(function(){$('#setup_profile_error').html('')}, 3500);
                    }

                    $scope.$parent.contentFound = 1;   
                    $scope.contentFound = 1;
                    $('#loading_span_id').html('Loading');
                });
            }
        }

    };
    //$scope.pageAnimation = '';

    $scope.$parent.contentFound = 1;   
    $scope.contentFound = 1;
});


rwaApp.controller('logoutPageCtrl', function ($scope, $cookies, $rootScope) {

    $scope.$parent.contentFound = 0;   
    $scope.contentFound = 0;

    localStorage.setItem('cookie_user_id', '');
    localStorage.setItem('flat_number', '');
    localStorage.setItem('user_fullname', '');
    localStorage.setItem('user_email', '');
    localStorage.setItem('profile_image', '');
    localStorage.setItem('is_event_organizer', '');
    localStorage.setItem('parent_user_id', '');
    
    /*$cookies.put('cookie_user_id', '');  
    $cookies.put('flat_number', '');  
    $cookies.put('user_fullname', '');  
    $cookies.put('user_email', '');  
    $cookies.put('profile_image', ''); 
    $cookies.put('is_event_organizer', '');
    $cookies.put('parent_user_id', ''); 
    
    var cookies = localStorage.getItemAll();
    angular.forEach(cookies, function (v, k) {
        $cookies.remove(k);
    });
    
    $cookies.remove('cookie_user_id');  
    $cookies.remove('flat_number');  
    $cookies.remove('user_fullname');  
    $cookies.remove('user_email');  
    $cookies.remove('parent_user_id');  
    $cookies.remove('profile_image'); 
    $cookies.remove('is_event_organizer');*/ 
                    
    $rootScope.cookie_user_id = '';
    $rootScope.user_fullname = '';
    $rootScope.user_email = '';
    $rootScope.profile_image = '';
    $rootScope.flat_number = '';
    $rootScope.is_event_organizer = '';
    $rootScope.parent_user_id = '';
    
    window.location.href = defaultLocalPath;

    /*$("#login_error").html("<div class='alert alert-danger text-center'>You have Logged Out Successfully.</div>");
    setTimeout(function(){$('#login_error').html('')}, 2500);

    $scope.$parent.contentFound = 1;   
    $scope.contentFound = 1;*/

});


rwaApp.controller('myProfilePageCtrl', function ($scope, $http, $cookies, $rootScope, mdcDateTimeDialog) {
    if(!$rootScope.cookie_user_id){
        location.href = defaultLocalPath;
    }
    if ($rootScope.checkConnection()) {

        $scope.mainSiteImageURL = mainSiteImageURL;
        $scope.defaultLocalPath = defaultLocalPath;
        $('#loading_span_id').html('Fetching Pofile');
        $scope.$parent.contentFound = 0;   
        $scope.contentFound = 0;
        
       
        $scope.user_fullname = localStorage.getItem('user_fullname');
        $scope.cookie_user_id = localStorage.getItem('cookie_user_id');

        $http.get(serviceBase + 'getUserDataByID?user_id='+encodeURIComponent($scope.cookie_user_id)).then(function (data){
            $scope.userObj = data.data.data;
            
            $scope.$parent.contentFound = 1;   
            $scope.contentFound = 1;
            
            $('#loading_span_id').html('Loading');
        });


        $scope.updateUserProfileClick = function(userObj, goTo) {
            //var user_fullname = (userObj.user_fullname === undefined) ? '' : userObj.user_fullname; 
            if(userObj.user_fullname == '') { //if string is empty
                //$rootScope.alert("Please enter fullname.", '', '');
                //setTimeout(function(){$("#user_fullname").focus()}, 0);
                $('#alert_text_div').html('Please enter fullname.');
                $('#alert_main_div').removeClass('hide');
            } else if(!IsEmail(userObj.user_email)){
                //$rootScope.alert("Please enter valid e-mail ID.", '', '');
                //setTimeout(function(){$("#user_email").focus()}, 0);
                $('#alert_text_div').html('Please enter valid e-mail ID.');
                $('#alert_main_div').removeClass('hide');
            } else {
                $('#loading_span_id').html('Updating Profile');
                $scope.$parent.contentFound = 0;   
                $scope.contentFound = 0;

                var house_extension_number = (userObj.house_extension_number === undefined) ? '' : userObj.house_extension_number; 
                var emergency_mobile_number = (userObj.emergency_mobile_number === undefined) ? '' : userObj.emergency_mobile_number; 
                var date_of_birth = $('#date_of_birth').val(); 
                var blood_group = $('#blood_group').val(); 
                var total_members = $('#total_members').val(); 

                var parking_number = (userObj.parking_number === undefined) ? '' : userObj.parking_number; 
                var vehicle_number = (userObj.vehicle_number === undefined) ? '' : userObj.vehicle_number; 
                var vehicle_number_2 = (userObj.vehicle_number_2 === undefined) ? '' : userObj.vehicle_number_2; 

                $http.get(serviceBase + 'setUpdateUserProfile?user_id='+encodeURIComponent($scope.cookie_user_id)+'&user_fullname='+encodeURIComponent(userObj.user_fullname)+'&user_email='+encodeURIComponent(userObj.user_email)+'&house_extension_number='+encodeURIComponent(house_extension_number)+'&emergency_mobile_number='+encodeURIComponent(emergency_mobile_number)+'&date_of_birth='+encodeURIComponent(date_of_birth)+'&blood_group='+encodeURIComponent(blood_group)+'&total_members='+encodeURIComponent(total_members)+'&parking_number='+encodeURIComponent(parking_number)+'&vehicle_number='+encodeURIComponent(vehicle_number)+'&vehicle_number_2='+encodeURIComponent(vehicle_number_2)).then(function (data){


                    $scope.loginObjmsg = data.data.msg;
                    // Setting a cookie
                    
                    $('#loading_span_id').html('Loading');
                    if($scope.loginObjmsg=='success'){
                        localStorage.setItem('user_fullname', userObj.user_fullname);
                        localStorage.setItem('user_email', userObj.user_email);
                        localStorage.setItem('is_event_organizer', data.data.data.is_event_organizer); 
                        
                        $rootScope.user_fullname = localStorage.getItem('user_fullname');
                        $rootScope.user_email = localStorage.getItem('user_email');
                        $("#profile_page_error").html("<div class='alert alert-success text-center'>Profile Updated Successfully.</div>");
                        if (goTo != '-') {
                            setTimeout(function(){ window.location.href = defaultLocalPath+goTo }, 3500);
                        } else {
                            setTimeout(function(){$('#profile_page_error').html('')}, 3500);
                        }
                    }
                    else {
                        $("#profile_page_error").html("<div class='alert alert-danger text-center'>"+$scope.loginObjmsg+"</div>");
                        setTimeout(function(){$('#profile_page_error').html('')}, 3500);
                    }

                    $scope.$parent.contentFound = 1;   
                    $scope.contentFound = 1;
                });
            }

        };

        IsEmail = function(aStr){
            var reEmail=/^[0-9a-zA-Z_\.-]+\@[0-9a-zA-Z_\.-]+\.[0-9a-zA-Z_\.-]+$/;
            if(!reEmail.test(aStr)){
                return false;
            }
            return true;
        }
    }

});


rwaApp.controller('changePasswordPageCtrl', function ($scope, $http, $cookies, $rootScope) {
    if(!$rootScope.cookie_user_id){
        location.href = defaultLocalPath;
    }
    if ($rootScope.checkConnection()) {

        $scope.mainSiteImageURL = mainSiteImageURL;
        $scope.defaultLocalPath = defaultLocalPath;

        $scope.$parent.contentFound = 0;   
        $scope.contentFound = 0;
        
       
        $scope.user_fullname = localStorage.getItem('user_fullname');
        $scope.cookie_user_id = localStorage.getItem('cookie_user_id');

        $scope.$parent.contentFound = 1;   
        $scope.contentFound = 1;

        $scope.updateUserPasswordClick = function() {
            if($('#old_password').val() == '') { //if string is empty
                //$rootScope.alert("Please enter old password.", '', '');
                //setTimeout(function(){$("#old_password").focus()}, 0);
                $('#alert_text_div').html('Please enter old password.');
                $('#alert_main_div').removeClass('hide');
            } else if($('#new_password').val() == ''){
                //$rootScope.alert("Please enter new password.", '', '');
                //setTimeout(function(){$("#new_password").focus()}, 0);
                $('#alert_text_div').html('Please enter new password.');
                $('#alert_main_div').removeClass('hide');
            } else if($('#new_password').val() != $('#conf_new_password').val()){
                //$rootScope.alert("New password and confirm password must match.", '', '');
                //setTimeout(function(){$("#new_password").focus()}, 0);
                $('#alert_text_div').html('New password and confirm password must match.');
                $('#alert_main_div').removeClass('hide');
            } else if($('#old_password').val() == $('#new_password').val()){
                //$rootScope.alert("Old password and new password must not same.", '', '');
                //setTimeout(function(){$("#new_password").focus()}, 0);
                $('#alert_text_div').html('Old password and new password must not same.');
                $('#alert_main_div').removeClass('hide');
            } else {
                $('#loading_span_id').html('Updating Password');
                $scope.$parent.contentFound = 0;   
                $scope.contentFound = 0;

                $http.get(serviceBase + 'setUpdateUserPassword?user_id='+encodeURIComponent($scope.cookie_user_id)+'&old_password='+$('#old_password').val()+'&new_password='+$('#new_password').val()).then(function (data){

                    $scope.loginObjmsg = data.data.msg;
                    // Setting a cookie
                    if($scope.loginObjmsg=='success'){
                        $('#old_password').val('');
                        $('#new_password').val('');
                        $('#conf_new_password').val('');

                        $("#profile_password_page_error").html("<div class='alert alert-success text-center'>Password Changed Successfully.</div>");
                        
                        setTimeout(function(){$('#profile_password_page_error').html('')}, 3500);
                    }
                    else {
                        $("#profile_password_page_error").html("<div class='alert alert-danger text-center'>"+$scope.loginObjmsg+"</div>");
                        setTimeout(function(){$('#profile_password_page_error').html('')}, 3500);
                    }

                    $scope.$parent.contentFound = 1;   
                    $scope.contentFound = 1;
                    $('#loading_span_id').html('Loading');
                });
            }

        };

    }

});


rwaApp.controller('myMembersPageCtrl', function ($scope, $http, $cookies, $rootScope, $ngConfirm) {
    if(!$rootScope.cookie_user_id){
        location.href = defaultLocalPath;
    }
    if ($rootScope.checkConnection()) {
        $scope.mainSiteImageURL = mainSiteImageURL;
        $scope.defaultLocalPath = defaultLocalPath;

        $scope.flat_number = $rootScope.flat_number;

        $('#loading_span_id').html('Fetching Data');
        $scope.$parent.contentFound = 0;   
        $scope.contentFound = 0;

        $scope.cookie_user_id = localStorage.getItem('cookie_user_id');
        $scope.user_fullname = localStorage.getItem('user_fullname');
        $scope.flat_number = localStorage.getItem('flat_number');

        $http.get(serviceBase + 'getUserMembersList?user_id='+encodeURIComponent($scope.cookie_user_id)+'&limit=0').then(function (data){
            $scope.membersObj1 = data.data.data;
        });

        $http.get(serviceBase + 'getUserMembersList?user_id='+encodeURIComponent($scope.cookie_user_id)+'&limit=1').then(function (data){
            $scope.membersObj2 = data.data.data;
            
            $scope.$parent.contentFound = 1;   
            $scope.contentFound = 1;
            $('#loading_span_id').html('Loading');
        });
        
        $scope.deleteUserMembersClick = function(member_id) {
            $ngConfirm({                
                title: 'Confirmation',
                icon: 'fa fa-info-circle',
                theme: 'modern',
                type: 'blue',
                content: '<div class="text-center">Do you want to delete this member?' +
                '</div>',
                animation: 'scale',
                closeAnimation: 'scale',
                buttons: {
                    'confirm': {
                        text: 'Ok',
                        btnClass: 'btn-info',
                        action: function () {
                            
                            $('#loading_span_id').html('Deleting Members');
                            $scope.$parent.contentFound = 0;   
                            $scope.contentFound = 0;
                            
                           $http.get(serviceBase + 'setDeleteUserMember?user_id='+encodeURIComponent($scope.cookie_user_id)+'&member_id='+member_id).then(function (data){

                                $scope.loginObjmsg = data.data.msg;

                                $scope.membersObj1 = data.data.data_1;
                                $scope.membersObj2 = data.data.data_2;

                                $("#my_members_page_error").html("<div class='alert alert-success text-center'>Member Deleted Successfully.</div>");
                                //setTimeout(function(){ window.location.href = defaultLocalPath+'dashboard.html' }, 3500);
                                setTimeout(function(){$('#my_members_page_error').html('')}, 3500);

                                $scope.$parent.contentFound = 1;   
                                $scope.contentFound = 1;
                                $('#loading_span_id').html('Loading');
                            }); 
                        }
                    },
                    cancel: function () {
                        //Do Nothing
                    }
                }
            })
        }

        $scope.updateUserMembersClick = function(membersObj1, membersObj2) {
            if($('#user_fullname_1').val() == '') { //if string is empty
                //$rootScope.alert("Please enter member's 1 mobile number.", '', '');
                //setTimeout(function(){$("#primary_mobile_number_1").focus()}, 0);
                $('#alert_text_div').html("Please enter member's 1 full name.");
                $('#alert_main_div').removeClass('hide');
            } else if($('#primary_mobile_number_1').val() == '') { //if string is empty
                //$rootScope.alert("Please enter member's 1 mobile number.", '', '');
                //setTimeout(function(){$("#primary_mobile_number_1").focus()}, 0);
                $('#alert_text_div').html("Please enter member's 1 mobile number.");
                $('#alert_main_div').removeClass('hide');
            } else if($('#parent_relation_1').val() == '') { //if string is empty
                //$rootScope.alert("Please enter member's 1 mobile number.", '', '');
                //setTimeout(function(){$("#primary_mobile_number_1").focus()}, 0);
                $('#alert_text_div').html("Please choose member's 1 relation.");
                $('#alert_main_div').removeClass('hide');
            } /*else if($('#user_fullname_2').val() == '') { //if string is empty
                $//rootScope.alert("Please enter member's 2 mobile number.", '', '');
                //setTimeout(function(){$("#primary_mobile_number_2").focus()}, 0);
                $('#alert_text_div').html("Please enter member's 2 full name.");
                $('#alert_main_div').removeClass('hide');
            } else if($('#primary_mobile_number_2').val() == '') { //if string is empty
                $//rootScope.alert("Please enter member's 2 mobile number.", '', '');
                //setTimeout(function(){$("#primary_mobile_number_2").focus()}, 0);
                $('#alert_text_div').html("Please enter member's 2 mobile number.");
                $('#alert_main_div').removeClass('hide');
            } else if($('#parent_relation_2').val() == '') { //if string is empty
                //$rootScope.alert("Please enter member's 1 mobile number.", '', '');
                //setTimeout(function(){$("#primary_mobile_number_1").focus()}, 0);
                $('#alert_text_div').html("Please choose member's 2 relation.");
                $('#alert_main_div').removeClass('hide');
            }*/ else {
                $('#loading_span_id').html('Updating Members');
                $scope.$parent.contentFound = 0;   
                $scope.contentFound = 0;

                //$http.get(serviceBase + 'setUpdateUserMembers?user_id='+encodeURIComponent($scope.cookie_user_id)+'&=flat_number'+encodeURIComponent($scope.flat_number)+'&=user_fullname_1'+encodeURIComponent(membersObj1.user_fullname)+'&member_id_1='+membersObj1.user_id+'&member_1_primary_mobile_number='+encodeURIComponent(membersObj1.primary_mobile_number)+'&parent_relation_1='+encodeURIComponent(membersObj1.parent_relation)+'&=user_fullname_2'+encodeURIComponent(membersObj2.user_fullname)+'&member_id_2='+membersObj2.user_id+'&member_2_primary_mobile_number='+encodeURIComponent(membersObj2.primary_mobile_number)+'&parent_relation_2='+encodeURIComponent(membersObj2.parent_relation)).then(function (data){
                $http.get(serviceBase + 'setUpdateUserMembers?user_id='+encodeURIComponent($scope.cookie_user_id)+'&flat_number='+encodeURIComponent($scope.flat_number)+'&user_fullname_1='+encodeURIComponent($('#user_fullname_1').val())+'&member_id_1='+$('#user_id_1').val()+'&member_1_primary_mobile_number='+encodeURIComponent($('#primary_mobile_number_1').val())+'&parent_relation_1='+encodeURIComponent($('#parent_relation_1').val())+'&user_fullname_2='+encodeURIComponent($('#user_fullname_2').val())+'&member_id_2='+$('#user_id_2').val()+'&member_2_primary_mobile_number='+encodeURIComponent($('#primary_mobile_number_2').val())+'&parent_relation_2='+encodeURIComponent($('#parent_relation_2').val())).then(function (data){

                    $scope.loginObjmsg = data.data.msg;
                    // Setting a cookie
                    if($scope.loginObjmsg=='success'){
                        
                        $scope.membersObj1 = data.data.data_1;
                        $scope.membersObj2 = data.data.data_2;

                        $("#my_members_page_error").html("<div class='alert alert-success text-center'>Members Updated Successfully.</div>");
                        //setTimeout(function(){ window.location.href = defaultLocalPath+'dashboard.html' }, 3500);
                        setTimeout(function(){$('#my_members_page_error').html('')}, 3500);

                    }
                    else {
                        $("#my_members_page_error").html("<div class='alert alert-danger text-center'>"+$scope.loginObjmsg+"</div>");
                        setTimeout(function(){$('#my_members_page_error').html('')}, 3500);
                    }

                    $scope.$parent.contentFound = 1;   
                    $scope.contentFound = 1;
                    $('#loading_span_id').html('Loading');
                });
            }

        };

    }

});


rwaApp.controller('dashboardPageCtrl', function ($scope, $http, $rootScope, $cookies) {

    
    if(!$rootScope.cookie_user_id){
        location.href = defaultLocalPath;
    }
    if ($rootScope.user_email == '') {
        window.location.href = defaultLocalPath+'my_profile.html';
    }
    $scope.mainSiteImageURL = mainSiteImageURL;
    $scope.defaultLocalPath = defaultLocalPath;
    
    $scope.is_event_organizer = localStorage.getItem('is_event_organizer');
    $scope.profile_image = localStorage.getItem('profile_image');
    $scope.parent_user_id = localStorage.getItem('parent_user_id');

    $('#loading_span_id').html('Loading');
    $scope.$parent.contentFound = 0;   
    $scope.contentFound = 0;

    var dateObj = new Date();

    var months_array = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    $scope.currentDate = dateObj.getDate();
    $scope.currentDateSup = nth(dateObj.getDate());
    $scope.currentMonth = months_array[dateObj.getMonth()];
    $scope.currentYear = dateObj.getFullYear();
    $scope.user_fullname = localStorage.getItem('user_fullname');

    if ($rootScope.checkConnection()) {
        $http.get(serviceBase + 'getAllNotifications?show_count_only=1&user_id='+encodeURIComponent($rootScope.cookie_user_id)).then(function (data){
            $scope.notificationsCount = data.data.data;
        });

        $http.get(serviceBase + 'getAllUpcomingEvents?show_count_only=1').then(function (data){
            $scope.eventsCount = data.data.data;
        });

        $http.get(serviceBase + 'getAllComplaints?show_count_only=1&user_id='+encodeURIComponent($rootScope.cookie_user_id)).then(function (data){
            $scope.complaintsCount = data.data.data;
        });
        
        $http.get(serviceBase + 'getCurrentQuarterPayment?show_count_only=1&user_id='+encodeURIComponent($rootScope.cookie_user_id)+'&flat_number='+encodeURIComponent($rootScope.flat_number)).then(function (data){
            $scope.currentQuarterPaymenCount = data.data.data;
        });

        $http.get(serviceBase + 'getCurrentWeather').then(function (data){
            $scope.current_temperature = data.data.data;
            
            
            $("#curntTempDate").slick({
                dots: false,
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 3000,
                speed: 1500,
                fade: true,
                cssEase: 'linear',
                arrows: false,
            });
        });
        
         // Called when a photo is successfully retrieved
        function onPhotoDataSuccess(imageData) {
            
          $('#changeProfilePhoto').removeClass('active');
          // Uncomment to view the base64 encoded image data
          // console.log(imageData);
          // Get image handle
          var smallImage = document.getElementById('profileSmallImage');

          // Unhide image elements
          $('#imageLi').removeClass('hide');

          // Show the captured photo
          // The inline CSS rules are used to resize the image
          smallImage.src = "data:image/jpeg;base64," + imageData;
          $('#imageHiddenValue').val(imageData);
        }
        

        // Called when a photo is successfully retrieved
        /*function onPhotoURISuccess(imageURI) {
          // Uncomment to view the image file URI 
          // Get image handle
          var largeImage = document.getElementById('profileSmallImage');

          // Show the captured photo
          // The inline CSS rules are used to resize the image
          largeImage.src = imageURI;
        }*/

        // A button will call this function
        $scope.openCapturePhotoOption = function() {
            $('#changeProfilePhoto').addClass('active');
        }
           // A button will call this function
        $scope.closeCapturePhotoOption = function() {
            $('#changeProfilePhoto').removeClass('active');
        }
            
        $scope.capturePhoto = function() {
          // Take picture using device camera and retrieve image as base64-encoded string
          navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
            destinationType: navigator.camera.DestinationType.DATA_URL, allowEdit: true, correctOrientatin: true });
        }

        // A button will call this function
        $scope.capturePhotoGallery = function() {
          // Take picture using device camera and retrieve image as base64-encoded string
          navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
            destinationType: navigator.camera.DestinationType.DATA_URL, allowEdit: true, correctOrientatin: true, sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY });
        }
        
        $scope.cancelCapturePhoto = function() {
          $('#imageLi').addClass('hide');
          $('#imageHiddenValue').val('');
        }
        
        $scope.saveCapturePhoto = function() {
           
            $('#loading_span_id').html('Updating Image');
            $scope.$parent.contentFound = 0;   
            $scope.contentFound = 0;
            
            var fd = new FormData();
            fd.append("image_data", $('#imageHiddenValue').val())
            fd.append("user_id", $rootScope.cookie_user_id);
            
            $http.post(serviceBase + 'getUpdateUserImage', fd, {transformRequest: angular.identity, headers: {'Content-Type': undefined, 'Access-Control-Allow-Origin' : '*'}}).then(function (data){
                $rootScope.profile_image = data.data.data;
                
                localStorage.setItem('profile_image', $rootScope.profile_image); 
                
                var smallImage = document.getElementById('profileSmallImageShow');
                smallImage.src = "data:image/jpeg;base64," + $('#imageHiddenValue').val();
                
                $('#imageLi').hide('slow');
                $('#imageHiddenValue').val('');

                $scope.$parent.contentFound = 1;   
                $scope.contentFound = 1;
                $('#loading_span_id').html('Loading');
            });
        }

        // A button will call this function
        $scope.capturePhotoEdit = function() {
          // Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
          navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true, correctOrientatin: true,
            destinationType: navigator.camera.DestinationType.DATA_URL });
        }

        // A button will call this function
        function getPhoto(source) {
          // Retrieve image file location from specified source
          navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
            destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: source, allowEdit: true, correctOrientatin: true });
        }

        // Called if something bad happens.
        function onFail(message) {
        }
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


rwaApp.controller('notificationsPageCtrl', function ($scope, $http, $cookies, $rootScope, $location, $timeout, $document) {
    if(!$rootScope.cookie_user_id){
        location.href = defaultLocalPath;
    }
    if ($rootScope.checkConnection()) {
        $scope.$parent.contentFound = 1;   
        $scope.contentFound = 1;

        $scope.mainSiteImageURL = mainSiteImageURL;
        $scope.defaultLocalPath = defaultLocalPath;
        

        $scope.cookie_user_id = localStorage.getItem('cookie_user_id');
        $scope.user_fullname = localStorage.getItem('user_fullname');
        $scope.flat_number = localStorage.getItem('flat_number');

        $http.get(serviceBase + 'getAllNotifications?show_count_only=0&user_id='+encodeURIComponent($scope.cookie_user_id)).then(function (data){
            $scope.notificationsObjectCountToday = data.data.totalResultToday;
            $scope.notificationsObjectToday = data.data.data_today;
            //$scope.notificationsObjectCountOld = data.data.totalResultOld;
            //$scope.notificationsObjectOld = data.data.data_old;

        });

        $scope.changeNotificationStatusClick = function(notification_id, notification_status, notification_type) {

            if (notification_status == 'u') {
                $('#loading_span_id').html('Updating');
                $scope.$parent.contentFound = 0;   
                $scope.contentFound = 0;

                $http.get(serviceBase + 'setUserNotificationStatus?user_id='+encodeURIComponent($scope.cookie_user_id)+'&notification_id='+encodeURIComponent(notification_id)).then(function (data){
                    $('#'+notification_id).removeClass('infoUnread');

                    $scope.$parent.contentFound = 1;   
                    $scope.contentFound = 1;
                    $('#loading_span_id').html('Loading');
                });
            }
            
            if (notification_type == 'poll') {
                window.location.href = defaultLocalPath+'poll_details.html';
            }

        };

        var reachedLast = false;
        $scope.loadMoreNotification = true;
        $scope.showLoading = true;
        $scope.oldNotifications = [];

        NextpageNumber = 0;//next page is made it zeero on starting
        $scope.loadOldNotifications = function(do_it) {

            $scope.showLoading = true;

            if(reachedLast)
                return false;
                
            if (do_it == '-')
                $("#footer_id").html("<div class='text-center'><i class='fa fa-circle-o-notch fa-spin fa-2x fa-fw'></i></div>");
            else { 
                $('#loading_span_id').html('Fetching Notifications');
                $scope.$parent.contentFound = 0;   
                $scope.contentFound = 0;
            }

            $http.get(serviceBase + 'getMoreNotifications?user_id='+encodeURIComponent($scope.cookie_user_id)+'&after='+encodeURIComponent(NextpageNumber)).then(function (data){
                
                //$("html, body").animate({ scrollTop: ('0px') }, "slow");
             
                var currentpage = NextpageNumber;//taking current pagenumber
                NextpageNumber = data.data.nextpage;
                $scope.totalResult = 10; //data.data.totalResult;

                if((currentpage == NextpageNumber) ){
                    return false;
                }

                $scope.loadMoreNotification = true;
                $scope.oldNotifications = $scope.oldNotifications.concat(data.data.data);

                $scope.showLoading = false;
                
                if (do_it == '-')
                    $("#footer_id").html('');
                else { 
                    $('#loading_span_id').html('Loading');
                    $scope.$parent.contentFound = 1;   
                    $scope.contentFound = 1;
                }

            });

        };

        $scope.loadOldNotifications('');// loading initial content
        
        $scope.$on(
            "$destroy",
            function( event ) {
                angular.element($document).off('touchmove');
            }
        );
    }
});


rwaApp.controller('pollDetailsPageCtrl', function ($scope, $http, $cookies, $rootScope) {
    if(!$rootScope.cookie_user_id){
        location.href = defaultLocalPath;
    }
    
    if ($rootScope.checkConnection()) {
        
        $scope.mainSiteImageURL = mainSiteImageURL;
        $scope.defaultLocalPath = defaultLocalPath;

        $scope.cookie_user_id = localStorage.getItem('cookie_user_id');
        $scope.user_fullname = localStorage.getItem('user_fullname');
        $scope.flat_number = localStorage.getItem('flat_number');

         $http.get(serviceBase + 'getRunningPoll?user_id='+encodeURIComponent($scope.cookie_user_id)).then(function (data){
            $scope.pollCount = data.data.totalResult;
            $scope.pollObj = data.data.data;

            $scope.$parent.contentFound = 1;   
            $scope.contentFound = 1;
            $('#loading_span_id').html('Loading');
        });
        
    }
});


rwaApp.controller('membersListPageCtrl', function ($scope, $http, $cookies, $rootScope) {
    if(!$rootScope.cookie_user_id){
        location.href = defaultLocalPath;
    }
    
    if ($rootScope.checkConnection()) {
        $('#loading_span_id').html('Fetching Members');
        $scope.$parent.contentFound = 0;   
        $scope.contentFound = 0;

        $scope.mainSiteImageURL = mainSiteImageURL;
        $scope.defaultLocalPath = defaultLocalPath;
        
        $scope.cookie_user_id = localStorage.getItem('cookie_user_id');
        $scope.user_fullname = localStorage.getItem('user_fullname');
        $scope.flat_number = localStorage.getItem('flat_number');

        $http.get(serviceBase + 'getUsersList?notUserID='+encodeURIComponent($scope.cookie_user_id)).then(function (data){
            $scope.usersCount = data.data.totalResult;
            $scope.usersObj = data.data.data;

            $scope.$parent.contentFound = 1;   
            $scope.contentFound = 1;
            $('#loading_span_id').html('Loading');
        });
    }

});


rwaApp.controller('memberDetailPageCtrl', function ($scope, $http, $cookies, $rootScope, $routeParams) {
    if(!$rootScope.cookie_user_id){
        location.href = defaultLocalPath;
    }
    if ($rootScope.checkConnection()) {
        $('#loading_span_id').html('Fetching Member Detail');
        $scope.$parent.contentFound = 0;   
        $scope.contentFound = 0;

        $scope.mainSiteImageURL = mainSiteImageURL;
        $scope.defaultLocalPath = defaultLocalPath;
        

        $scope.cookie_user_id = localStorage.getItem('cookie_user_id');
        $scope.user_fullname = localStorage.getItem('user_fullname');
        $scope.flat_number = localStorage.getItem('flat_number');

        $http.get(serviceBase + 'getUserDataByID?user_id='+encodeURIComponent($routeParams.user_id)).then(function (data){
            $scope.usersDataObj = data.data.data;

            $scope.$parent.contentFound = 1;   
            $scope.contentFound = 1;
            $('#loading_span_id').html('Loading');
        });
    }
});


rwaApp.controller('nearByServicesPageCtrl', function ($scope, $rootScope, $http, $sce) {

    if(!$rootScope.cookie_user_id){
        location.href = defaultLocalPath;
    }
    if ($rootScope.checkConnection()) {
        $('#loading_span_id').html('Fetching Near By Services');
        $scope.$parent.contentFound = 0;   
        $scope.contentFound = 0;

        $scope.mainSiteImageURL = mainSiteImageURL;
        $scope.defaultLocalPath = defaultLocalPath;
        
        
        $scope.getNearByServicesByID = function (service_category_id, banner_image) {
            $('#near_by_services_div').html("");
            $('#loading_span_id').html('Fetching Near By Services');
            $scope.$parent.contentFound = 0;   
            $scope.contentFound = 0;
            $http.get(serviceBase + 'getAllNearByServices?service_category_id='+service_category_id).then(function (data){
                $scope.nearByServicesObj = data.data.data;
                $scope.nearByServicestotalResult = data.data.totalResult;
                var nearByServicesHtml = '';
                    
                    var mainClass = ' active';

                    nearByServicesHtml += '<div class="nearByResult '+mainClass+'" id="loc-1">';
                    if (banner_image != '') {
                        nearByServicesHtml += '<div class="locationAdds"><img src="'+mainSiteBannerURL+'/upload/service/'+banner_image+'" alt="" width="" height="100%" /></div>';
                    }
                    nearByServicesHtml += '<div class="recordsFound">'+$scope.nearByServicestotalResult+' Records Available</div>';

                    if ($scope.nearByServicestotalResult > 0) {

                        nearByServicesHtml += '<ul class="messageBoard"><li><ul class="messageList">';
                        for (x in $scope.nearByServicesObj) {
                            nearByServicesHtml += '<li><div class="messageBlock locationResult"><div class="msgContentBox"><div class="msgHeader"><span class="msgTitle">'+$scope.nearByServicesObj[x].title+'</span></div><ul class="actionBtnsList">';
                            
                            if ($scope.nearByServicesObj[x].contac_number != '') {
                                nearByServicesHtml += '<li><a href="tel:'+$scope.nearByServicesObj[x].contac_number+'" class="callMe btn btn-xs btn-block"><i class="fa fa-phone"></i></a></li>';
                            }
                            
                            if ($scope.nearByServicesObj[x].map_url != '') {
                                nearByServicesHtml += '<li><a data-toggle="modal" data-target="#nearLocationMap" href="javascript:;" onclick="openModalMap(\''+$scope.nearByServicesObj[x].map_url+'\')" class="showMap btn btn-xs btn-block"><i class="fa fa-map-marker"></i></a></li>';
                                //nearByServicesHtml += '<li><a target="_blank" href="'+$scope.nearByServicesObj[x].map_url+'" class="showMap btn btn-xs btn-block"><i class="fa fa-map-marker"></i></a></li>';
                            }
                            
                            nearByServicesHtml += '</ul><p><a href="javascript:;">'+$scope.nearByServicesObj[x].address+'<br>Ph: '+$scope.nearByServicesObj[x].contac_number+'<br>Opening Hours: '+$scope.nearByServicesObj[x].opening_hours+'</a></p></div></div></li>';

                        }   
                        nearByServicesHtml += '</ul></li></ul>';

                    } else {
                        nearByServicesHtml += '<div class="sadFace"><i class="fa fa-meh-o"></i></div>';
                    }

                    nearByServicesHtml += '</div>';
                $('#near_by_services_div').html(nearByServicesHtml);
                
                $scope.$parent.contentFound = 1;   
                $scope.contentFound = 1;
                $('#loading_span_id').html('Loading');
            });
        }
        
        $http.get(serviceBase + 'getServiceCategories').then(function (data){
            $scope.serviceCategoriesObj = data.data.data;

            var serviceCategoriesList = '';
            var first_id = '';
            var first_banner_image = '';
            for (x in $scope.serviceCategoriesObj) {

                if ($scope.serviceCategoriesObj[x].index_counter == '1') { 
                    var mainClass = ' active'; 
                    first_id = $scope.serviceCategoriesObj[x].service_category_id; 
                    first_banner_image = $scope.serviceCategoriesObj[x].banner_image;
                } else { var mainClass = '' };

                serviceCategoriesList += '<div class="catName '+mainClass+'"><a service_category_id="'+$scope.serviceCategoriesObj[x].service_category_id+'" banner_image="'+$scope.serviceCategoriesObj[x].banner_image+'" href="javascript:;" data-toggle="tab" data-target="#loc-1">';
                if ($scope.serviceCategoriesObj[x].icon_class != '') {
                    serviceCategoriesList += '<i ng-if="serviceCategoriesArr.icon_class" class="fa '+$scope.serviceCategoriesObj[x].icon_class+'"></i>';
                } else {
                    serviceCategoriesList += '<i ng-if="!serviceCategoriesArr.icon_class" class="fa fa-window-close"></i>';
                }

                serviceCategoriesList += '<span>'+$scope.serviceCategoriesObj[x].category_name+'</span></a></div>';
            }
            /*alert(first_id);
            console.log(first_id);*/

            //$scope.serviceCategoriesList = $sce.trustAsHtml(serviceCategoriesList);
            $('#service_categories_div').html(serviceCategoriesList);

            $(".locationCatList").slick({
                dots: false,
                infinite: false,
                slidesToShow: 4,
                slidesToScroll: 1
            });
            $(".locationCatList .catName a").on('click', function () {
     
                $scope.getNearByServicesByID($(this).attr('service_category_id'), $(this).attr('banner_image'));
                $(".locationCatList .catName").removeClass('active');
                $(this).parents('.catName').addClass('active');
            });

            $scope.getNearByServicesByID(first_id, first_banner_image);
            /*$http.get(serviceBase + 'getAllNearByServices').then(function (data){
                $scope.nearByServicesObj = data.data.data;
                $scope.nearByServicestotalResult = data.data.totalResult;
                var nearByServicesHtml = '';
                for (x in $scope.nearByServicesObj) {
                    
                    if ($scope.nearByServicesObj[x].index_counter == '1') var mainClass = ' active'; else var mainClass = '';

                    nearByServicesHtml += '<div class="nearByResult '+mainClass+'" id="loc-'+$scope.nearByServicesObj[x].service_category_id+'">';
                    if ($scope.nearByServicesObj[x].banner_image != '') {
                        nearByServicesHtml += '<div class="locationAdds"><img src="'+mainSiteBannerURL+'/upload/service/'+$scope.nearByServicesObj[x].banner_image+'" alt="" width="" height="100%" /></div>';
                    }
                    nearByServicesHtml += '<div class="recordsFound">'+$scope.nearByServicesObj[x].nearby_services_totalResult+' Records Available</div>';

                    if ($scope.nearByServicesObj[x].nearby_services_totalResult > 0) {

                        nearByServicesHtml += '<ul class="messageBoard"><li><ul class="messageList">';
                        for (y in $scope.nearByServicesObj[x].nearby_services) {

                            nearByServicesHtml += '<li><div class="messageBlock locationResult"><div class="msgContentBox"><div class="msgHeader"><span class="msgTitle">'+$scope.nearByServicesObj[x].nearby_services[y].title+'</span></div><p><a href="tel:'+$scope.nearByServicesObj[x].nearby_services[y].contac_number+'" class="callMe"><i class="fa fa-phone"></i></a><a href="javascript:;">'+$scope.nearByServicesObj[x].nearby_services[y].address+'<br>Ph: '+$scope.nearByServicesObj[x].nearby_services[y].contac_number+'<br>Opening Hours: '+$scope.nearByServicesObj[x].nearby_services[y].opening_hours+'</a></p></div></div></li>';

                        }
                        nearByServicesHtml += '</ul></li></ul>';
                    } else {
                        nearByServicesHtml += '<div class="sadFace"><i class="fa fa-meh-o"></i></div>';
                    }

                    nearByServicesHtml += '</div>';
                }

                $('#near_by_services_div').html(nearByServicesHtml);

            });*/

        });
        
    }
});


rwaApp.controller('vendorServicesPageCtrl', function ($scope, $http, $cookies, $rootScope) {
    if(!$rootScope.cookie_user_id){
        location.href = defaultLocalPath;
    }
    
    if ($rootScope.checkConnection()) {
        $('#loading_span_id').html('Fetching Vendors');
        $scope.$parent.contentFound = 0;   
        $scope.contentFound = 0;

        $scope.mainSiteImageURL = mainSiteImageURL;
        $scope.defaultLocalPath = defaultLocalPath;

        $scope.cookie_user_id = localStorage.getItem('cookie_user_id');
        $scope.user_fullname = localStorage.getItem('user_fullname');
        $scope.flat_number = localStorage.getItem('flat_number');

        $http.get(serviceBase + 'getAllVendors').then(function (data){
            $scope.vendorsCount = data.data.totalResult;
            $scope.vendorsObj = data.data.data;

            $scope.$parent.contentFound = 1;   
            $scope.contentFound = 1;
            $('#loading_span_id').html('Loading');
        });
    }

});


rwaApp.controller('eventsPageCtrl', function ($scope, $http, $cookies, $rootScope, $document) {
    if(!$rootScope.cookie_user_id){
        location.href = defaultLocalPath;
    }

    if ($rootScope.checkConnection()) {
        $('#loading_span_id').html('Fetching Events');
        $scope.$parent.contentFound = 0;   
        $scope.contentFound = 0;

        $scope.mainSiteImageURL = mainSiteImageURL;
        $scope.defaultLocalPath = defaultLocalPath;
        

        $scope.cookie_user_id = localStorage.getItem('cookie_user_id');
        $scope.user_fullname = localStorage.getItem('user_fullname');
        $scope.flat_number = localStorage.getItem('flat_number');
        $scope.is_event_organizer = localStorage.getItem('is_event_organizer');

        $http.get(serviceBase + 'getAllUpcomingEvents?show_count_only=0').then(function (data){
            $scope.upcomingEventsCount = data.data.totalResult;
            $scope.upcomingEventsObj = data.data.data;
        });

        $http.get(serviceBase + 'getAllRunningEvents').then(function (data){
            $scope.runningEventsCount = data.data.totalResult;
            $scope.runningEventsObj = data.data.data;

        });


        var reachedLast = false;
        $scope.showLoading = true;
        $scope.oldEvents = [];

        NextpageNumber = 0;//next page is made it zeero on starting
        $scope.loadOldEvents = function(scroll_down) {

            $scope.showLoading = true;

            if(reachedLast)
                return false;
            
            if (scroll_down == '-') {
                $("#footer_id").html("<div class='text-center'><i class='fa fa-circle-o-notch fa-spin fa-2x fa-fw'></i></div>");
            }

            $http.get(serviceBase + 'getMoreEvents?after='+encodeURIComponent(NextpageNumber)).then(function (data){
                
                //$("html, body").animate({ scrollTop: ('0px') }, "slow");
             
                var currentpage = NextpageNumber;//taking current pagenumber
                NextpageNumber = data.data.nextpage;
                $scope.totalResult = 10; //data.data.totalResult;


                if((currentpage == NextpageNumber) ){
                    return false;
                }

                $scope.oldEvents = $scope.oldEvents.concat(data.data.data);

                $scope.showLoading = false;
                $("#footer_id").html("");
                
                if (scroll_down == 'bottom') {
                    $scope.$parent.contentFound = 1;   
                    $scope.contentFound = 1;
                    $('#loading_span_id').html('Loading');
                }

            });

        };

        $scope.loadOldEvents('bottom');// loading initial content
        
        
        $scope.$on(
            "$destroy",
            function( event ) {
                angular.element($document).off('touchmove');
            }
        );
    }

});


rwaApp.controller('eventDetailPageCtrl', function ($scope, $http, $cookies, $rootScope, $routeParams, $sce) {
    if(!$rootScope.cookie_user_id){
        location.href = defaultLocalPath;
    }
    
    if ($rootScope.checkConnection()) {
        $('#loading_span_id').html('Fetching Event Detail');
        $scope.$parent.contentFound = 0;   
        $scope.contentFound = 0;

        $scope.mainSiteImageURL = mainSiteImageURL;
        $scope.defaultLocalPath = defaultLocalPath;
        

        $scope.cookie_user_id = localStorage.getItem('cookie_user_id');
        $scope.user_fullname = localStorage.getItem('user_fullname');
        $scope.flat_number = localStorage.getItem('flat_number');

        $http.get(serviceBase + 'getEventDetailByID?event_id='+encodeURIComponent($routeParams.event_id)+'&user_id='+encodeURIComponent($scope.cookie_user_id)).then(function (data){
            $scope.eventDataObj = data.data.data;
            
            $scope.comments = $sce.trustAsHtml($scope.eventDataObj.comments);
            $scope.event_description = $sce.trustAsHtml($scope.eventDataObj.event_description);

            $scope.$parent.contentFound = 1;   
            $scope.contentFound = 1;
            $('#loading_span_id').html('Loading');
        });
        
        $scope.updateAttendingEventClick = function(is_attending) {
            
            $('#loading_span_id').html('Updating');
            $scope.$parent.contentFound = 0;   
            $scope.contentFound = 0;

            $http.get(serviceBase + 'setUpdateEventAttendance?user_id='+encodeURIComponent($scope.cookie_user_id)+'&event_id='+encodeURIComponent($('#event_id').val())+'&family_members_count='+encodeURIComponent($('#family_members_count').val())+'&is_attending='+is_attending).then(function (data){
                
                $('#eventConfirmModalBox').modal('hide');
                if (is_attending == 'y') {
                    $("#event_detail_page_error").html("<div class='alert alert-success text-center'>You are now Interested in Attending this Event.</div>");
                } else {
                    $("#event_detail_page_error").html("<div class='alert alert-success text-center'>You are Not Interested in Attending this Event.</div>");
                }
                setTimeout(function(){$('#event_detail_page_error').html('')}, 3500);
                   
                $scope.$parent.contentFound = 1;   
                $scope.contentFound = 1;
                $('#loading_span_id').html('Loading');
            });

        };
    }

});


rwaApp.controller('myEventsPageCtrl', function ($scope, $http, $cookies, $rootScope, $document) {
    if(!$rootScope.cookie_user_id){
        location.href = defaultLocalPath;
    }
    
    if ($rootScope.checkConnection()) {
        $('#loading_span_id').html('Fetching Events');
        $scope.$parent.contentFound = 0;   
        $scope.contentFound = 0;

        $scope.mainSiteImageURL = mainSiteImageURL;
        $scope.defaultLocalPath = defaultLocalPath;
        
        $scope.cookie_user_id = localStorage.getItem('cookie_user_id');
        $scope.user_fullname = localStorage.getItem('user_fullname');
        $scope.flat_number = localStorage.getItem('flat_number');

        $http.get(serviceBase + 'getAllUpcomingEvents?show_count_only=0&user_id='+encodeURIComponent($scope.cookie_user_id)).then(function (data){
            $scope.upcomingEventsCount = data.data.totalResult;
            $scope.upcomingEventsObj = data.data.data;
        });

        $http.get(serviceBase + 'getAllRunningEvents?user_id='+encodeURIComponent($scope.cookie_user_id)).then(function (data){
            $scope.runningEventsCount = data.data.totalResult;
            $scope.runningEventsObj = data.data.data;
        });

        var reachedLast = false;
        $scope.showLoading = true;
        $scope.oldEvents = [];

        NextpageNumber = 0;//next page is made it zeero on starting
        $scope.loadOldEvents = function(scroll_down) {

            $scope.showLoading = true;

            if(reachedLast)
                return false;
            
            if (scroll_down == '-') {
                $("#footer_id").html("<div class='text-center'><i class='fa fa-circle-o-notch fa-spin fa-2x fa-fw'></i></div>");
            }

            $http.get(serviceBase + 'getMoreEvents?after='+encodeURIComponent(NextpageNumber)+'&user_id='+encodeURIComponent($scope.cookie_user_id)).then(function (data){
                
                //$("html, body").animate({ scrollTop: ('0px') }, "slow");
             
                var currentpage = NextpageNumber;//taking current pagenumber
                NextpageNumber = data.data.nextpage;
                $scope.totalResult = data.data.totalResult;


                if((currentpage == NextpageNumber) ){
                    return false;
                }

                $scope.oldEvents = $scope.oldEvents.concat(data.data.data);

                $scope.showLoading = false;
                $("#footer_id").html("");

                if (scroll_down == 'bottom') {
                    $scope.$parent.contentFound = 1;   
                    $scope.contentFound = 1;
                    $('#loading_span_id').html('Loading');
                }

            });

        };

        $scope.loadOldEvents('bottom');// loading initial content
        
        
        $scope.$on(
            "$destroy",
            function( event ) {
                angular.element($document).off('touchmove');
            }
        );
    }

});


rwaApp.controller('myEventDetailPageCtrl', function ($scope, $http, $cookies, $rootScope, $routeParams, $sce) {
    if(!$rootScope.cookie_user_id){
        location.href = defaultLocalPath;
    }
    
    if ($rootScope.checkConnection()) {
        $('#loading_span_id').html('Fetching Event Detail');
        $scope.$parent.contentFound = 0;   
        $scope.contentFound = 0;

        $scope.mainSiteImageURL = mainSiteImageURL;
        $scope.defaultLocalPath = defaultLocalPath;
        

        $scope.cookie_user_id = localStorage.getItem('cookie_user_id');
        $scope.user_fullname = localStorage.getItem('user_fullname');
        $scope.flat_number = localStorage.getItem('flat_number');

        $http.get(serviceBase + 'getEventDetailByID?event_id='+encodeURIComponent($routeParams.event_id)+'&user_id='+encodeURIComponent($scope.cookie_user_id)).then(function (data){
            $scope.eventDataObj = data.data.data;
            
            $scope.comments = $sce.trustAsHtml($scope.eventDataObj.comments);
            $scope.event_description = $sce.trustAsHtml($scope.eventDataObj.event_description);

            $scope.$parent.contentFound = 1;   
            $scope.contentFound = 1;
            $('#loading_span_id').html('Loading');
        });
        
        $scope.updateAttendingEventClick = function(is_attending) {
            
            $('#loading_span_id').html('Updating');
            $scope.$parent.contentFound = 0;   
            $scope.contentFound = 0;

            $http.get(serviceBase + 'setUpdateEventAttendance?user_id='+encodeURIComponent($scope.cookie_user_id)+'&event_id='+encodeURIComponent($('#event_id').val())+'&family_members_count='+encodeURIComponent($('#family_members_count').val())+'&is_attending='+is_attending).then(function (data){
                
                $('#eventConfirmModalBox').modal('hide');
                if (is_attending == 'y') {
                    $("#event_detail_page_error").html("<div class='alert alert-success text-center'>You are now Interested in Attending this Event.</div>");
                } else {
                    $("#event_detail_page_error").html("<div class='alert alert-success text-center'>You are Not Interested in Attending this Event.</div>");
                }
                setTimeout(function(){$('#event_detail_page_error').html('')}, 3500);
                   
                $scope.$parent.contentFound = 1;   
                $scope.contentFound = 1;
                $('#loading_span_id').html('Loading');
            });

        };
    }
});


rwaApp.controller('addNewEventPageCtrl', function ($scope, $http, $cookies, $rootScope, $routeParams, mdcDateTimeDialog) {
    if(!$rootScope.cookie_user_id){
        location.href = defaultLocalPath;
    }
    
    if ($rootScope.checkConnection()) {
        $('#loading_span_id').html('Loading');
        $scope.$parent.contentFound = 0;   
        $scope.contentFound = 0;

        $scope.mainSiteImageURL = mainSiteImageURL;
        $scope.defaultLocalPath = defaultLocalPath;
        
        /*$scope.date = new Date();
        $scope.time = new Date();
        $scope.dateTime = new Date();
        $scope.minDate = moment().subtract(1, 'month');
        $scope.maxDate = moment().add(1, 'month');
        $scope.dates = [new Date('2016-11-14T00:00:00'), new Date('2016-11-15T00:00:00'),
            new Date('2016-11-30T00:00:00'), new Date('2016-12-12T00:00:00'), new Date('2016-12-13T00:00:00'),
            new Date('2016-12-31T00:00:00')];

        $scope.displayDialog = function () {
            mdcDateTimeDialog.show({
                maxDate: $scope.maxDate,
                time: false
            })
                    .then(function (date) {
                        $scope.selectedDateTime = date;
                        console.log('New Date / Time selected:', date);
                    });
        };*/

        $scope.dateTimeMin = moment();
        $scope.cookie_user_id = localStorage.getItem('cookie_user_id');
        
        $http.get(serviceBase + 'getUsersList?notUserID='+encodeURIComponent($scope.cookie_user_id)).then(function (data){
            $scope.usersCount = data.data.totalResult;
            $scope.usersObj = data.data.data;

            $scope.$parent.contentFound = 1;   
            $scope.contentFound = 1;
        });
        
        
        $scope.addNewEventClick = function() {
            //console.log('Hi');
            //console.log($('#event_title').val());
            //var user_fullname = (userObj.user_fullname === undefined) ? '' : userObj.user_fullname; 
            if($('#event_title').val() == '') { //if string is empty
                //$rootScope.alert("Please enter Event Title.", '', '');
                //setTimeout(function(){$("#event_title").focus()}, 0);
                $('#alert_text_div').html("Please enter Event Title.");
                $('#alert_main_div').removeClass('hide');
            } else if($('#event_description').val() == ''){
                //$rootScope.alert("Please enter Event Description.", '', '');
                //setTimeout(function(){$("#event_description").focus()}, 0);
                $('#alert_text_div').html("Please enter Event Description.");
                $('#alert_main_div').removeClass('hide');
            } else if($('#event_start_date').val() == ''){
                //$rootScope.alert("Please enter Event Start Date/Time.", '', '');
                //setTimeout(function(){$("#event_start_date").focus()}, 0);
                $('#alert_text_div').html("Please enter Event Start Date/Time.");
                $('#alert_main_div').removeClass('hide');
            } else if($('#event_end_date').val() == ''){
                //$rootScope.alert("Please enter Event End Date/Time.", '', '');
                //setTimeout(function(){$("#event_end_date").focus()}, 0);
                $('#alert_text_div').html("Please enter Event End Date/Time.");
                $('#alert_main_div').removeClass('hide');
            } else if($('#event_type').val() == ''){
                //$rootScope.alert("Please select Event Type.", '', '');
                //setTimeout(function(){$("#event_type").focus()}, 0);
                $('#alert_text_div').html("Please select Event Type.");
                $('#alert_main_div').removeClass('hide');
            } else {
                $('#loading_span_id').html('Adding Event');
                $scope.$parent.contentFound = 0;   
                $scope.contentFound = 0;

                $http.get(serviceBase + 'setAddEvent?user_id='+encodeURIComponent($scope.cookie_user_id)+'&event_title='+encodeURIComponent($('#event_title').val())+'&event_description='+encodeURIComponent($('#event_description').val())+'&event_start_date='+encodeURIComponent($('#event_start_date').val())+'&event_end_date='+encodeURIComponent($('#event_end_date').val())+'&event_type='+encodeURIComponent($('#event_type').val())+'&co_organizer1_id='+encodeURIComponent($('#co_organizer1_id').val())+'&co_organizer2_id='+encodeURIComponent($('#co_organizer2_id').val())).then(function (data){
                    
                    $rootScope.user_fullname = localStorage.getItem('user_fullname');
                    $("#add_event_page_error").html("<div class='alert alert-success text-center'>New Event Added Successfully.</div>");

                    setTimeout(function(){ $rootScope.goBackward();  window.location.href = defaultLocalPath+'my_events.html' }, 3500);
                       
                    $scope.$parent.contentFound = 1;   
                    $scope.contentFound = 1;
                    $('#loading_span_id').html('Loading');
                });
            }

        };
    }

});


rwaApp.controller('editEventPageCtrl', function ($scope, $http, $cookies, $rootScope, $routeParams, mdcDateTimeDialog) {
    if(!$rootScope.cookie_user_id){
        location.href = defaultLocalPath;
    }
    
    if ($rootScope.checkConnection()) {
        $('#loading_span_id').html('Fetching Event Detail');
        $scope.$parent.contentFound = 0;   
        $scope.contentFound = 0;

        $scope.mainSiteImageURL = mainSiteImageURL;
        $scope.defaultLocalPath = defaultLocalPath;
        

        $scope.cookie_user_id = localStorage.getItem('cookie_user_id');
        
        //console.log(moment.utc().format());
        
        $http.get(serviceBase + 'getEventDetailByID?event_id='+encodeURIComponent($routeParams.event_id)+'&user_id='+encodeURIComponent($scope.cookie_user_id)).then(function (data){
            $scope.eventDataObj = data.data.data;
            
            $scope.dateTimeStart = $scope.eventDataObj.event_start_date_show;
            $scope.dateTimeEnd   = $scope.eventDataObj.event_end_date_show;

            $scope.$parent.contentFound = 1;   
            $scope.contentFound = 1;
            $('#loading_span_id').html('Loading');
        });
        
        $http.get(serviceBase + 'getUsersList?notUserID='+encodeURIComponent($scope.cookie_user_id)).then(function (data){
            $scope.usersObj = data.data.data;

            $scope.$parent.contentFound = 1;   
            $scope.contentFound = 1;
        });
        
        
        $scope.editEventClick = function(event_id) {
            if($('#event_title').val() == '') { //if string is empty
                //$rootScope.alert("Please enter Event Title.", '', '');
                //setTimeout(function(){$("#event_title").focus()}, 0);
                $('#alert_text_div').html("Please enter Event Title.");
                $('#alert_main_div').removeClass('hide');
            } else if($('#event_description').val() == ''){
                //$rootScope.alert("Please enter Event Description.", '', '');
                //setTimeout(function(){$("#event_description").focus()}, 0);
                $('#alert_text_div').html("Please enter Event Description.");
                $('#alert_main_div').removeClass('hide');
            } else if($('#event_type').val() == ''){
                //$rootScope.alert("Please select Event Type.", '', '');
                //setTimeout(function(){$("#event_type").focus()}, 0);
                $('#alert_text_div').html("Please select Event Type.");
                $('#alert_main_div').removeClass('hide');
            } else {
                $('#loading_span_id').html('Updating Event');
                $scope.$parent.contentFound = 0;   
                $scope.contentFound = 0;
                
                var event_start_date = $('#event_start_date').val();
                var event_end_date   = $('#event_end_date').val();
                
                if (event_start_date == '') {
                    event_start_date = $('#event_start_date_hidden').val();
                }
                if (event_end_date == '') {
                    event_end_date = $('#event_end_date_hidden').val();
                }

                $http.get(serviceBase + 'setUpdateEvent?user_id='+encodeURIComponent($scope.cookie_user_id)+'&event_id='+encodeURIComponent(event_id)+'&event_title='+encodeURIComponent($('#event_title').val())+'&event_description='+encodeURIComponent($('#event_description').val())+'&event_start_date='+encodeURIComponent(event_start_date)+'&event_end_date='+encodeURIComponent(event_end_date)+'&event_type='+encodeURIComponent($('#event_type').val())+'&co_organizer1_id='+encodeURIComponent($('#co_organizer1_id').val())+'&co_organizer2_id='+encodeURIComponent($('#co_organizer2_id').val())).then(function (data){
                    
                    $("#add_event_page_error").html("<div class='alert alert-success text-center'>Event Updated Successfully.</div>");

                    setTimeout(function(){ $rootScope.goBackward(); window.location.href = defaultLocalPath+'my_event_detail.html/'+event_id }, 3500);
                       
                    $scope.$parent.contentFound = 1;   
                    $scope.contentFound = 1;
                    $('#loading_span_id').html('Loading');
                });
            }

        };
    }

});


rwaApp.controller('editEventCommentPageCtrl', function ($scope, $http, $cookies, $rootScope, $routeParams, mdcDateTimeDialog) {
    if(!$rootScope.cookie_user_id){
        location.href = defaultLocalPath;
    }
    
    if ($rootScope.checkConnection()) {
        $('#loading_span_id').html('Fetching Event Comment');
        $scope.$parent.contentFound = 0;   
        $scope.contentFound = 0;

        $scope.mainSiteImageURL = mainSiteImageURL;
        $scope.defaultLocalPath = defaultLocalPath;

        $scope.cookie_user_id = localStorage.getItem('cookie_user_id');
        
        //console.log(moment.utc().format());
        
        $http.get(serviceBase + 'getEventDetailByID?event_id='+encodeURIComponent($routeParams.event_id)+'&user_id='+encodeURIComponent($scope.cookie_user_id)).then(function (data){
            $scope.eventDataObj = data.data.data;
            
            $scope.$parent.contentFound = 1;   
            $scope.contentFound = 1;
            $('#loading_span_id').html('Loading');
        });
        
        
        $scope.editEventCommentsClick = function(event_id) {
            if($('#comment_type').val() == '') { //if string is empty
                //$rootScope.alert("Please select Comment Type.", '', '');
                //setTimeout(function(){$("#comment_type").focus()}, 0);
                $('#alert_text_div').html("Please select Comment Type.");
                $('#alert_main_div').removeClass('hide');
            } else if($('#comments').val() == ''){
                //$rootScope.alert("Please enter Event Comments.", '', '');
                //setTimeout(function(){$("#comments").focus()}, 0);
                $('#alert_text_div').html("Please enter Event Comments.");
                $('#alert_main_div').removeClass('hide');
            } else {
                $('#loading_span_id').html('Updating Event Comment');
                $scope.$parent.contentFound = 0;   
                $scope.contentFound = 0;

                $http.get(serviceBase + 'setUpdateEventComments?user_id='+encodeURIComponent($scope.cookie_user_id)+'&event_id='+encodeURIComponent(event_id)+'&comment_type='+encodeURIComponent($('#comment_type').val())+'&comments='+encodeURIComponent($('#comments').val())).then(function (data){
                    
                    $("#add_event_page_error").html("<div class='alert alert-success text-center'>Event MoM/Remarks Updated Successfully.</div>");

                    setTimeout(function(){ $rootScope.goBackward(); window.location.href = defaultLocalPath+'my_event_detail.html/'+event_id }, 3500);
                       
                    $scope.$parent.contentFound = 1;   
                    $scope.contentFound = 1;
                    $('#loading_span_id').html('Loading');
                });
            }

        };
    }

});


rwaApp.controller('complaintsPageCtrl', function ($scope, $http, $cookies, $rootScope, $routeParams) {
    if(!$rootScope.cookie_user_id){
        location.href = defaultLocalPath;
    }
    
    if ($rootScope.checkConnection()) {
        $('#loading_span_id').html('Fetching Complaints');
        $scope.$parent.contentFound = 0;   
        $scope.contentFound = 0;

        $scope.mainSiteImageURL = mainSiteImageURL;
        $scope.defaultLocalPath = defaultLocalPath;
        
        
        $http.get(serviceBase + 'getAllComplaints?user_id='+encodeURIComponent($scope.cookie_user_id)).then(function (data){
            $scope.complaintsDataObj = data.data.data;
            $scope.openComplaintsDataObj = data.data.dataOpen;
            $scope.closedComplaintsDataObj = data.data.dataClosed;
            
            $scope.totalResult = data.data.totalResult;
            $scope.open_count = data.data.openCount;
            $scope.close_count = data.data.closeCount;
            
            $scope.$parent.contentFound = 1;   
            $scope.contentFound = 1;
            $('#loading_span_id').html('Loading');
        });
    }
    
});


rwaApp.controller('complaintDetailPageCtrl', function ($scope, $http, $cookies, $rootScope, $routeParams, $sce) {
    if(!$rootScope.cookie_user_id){
        location.href = defaultLocalPath;
    }
    
    if ($rootScope.checkConnection()) {
        $('#loading_span_id').html('Fetching Complaint Detail');
        $scope.$parent.contentFound = 0;   
        $scope.contentFound = 0;

        $scope.mainSiteImageURL = mainSiteImageURL;
        $scope.defaultLocalPath = defaultLocalPath;
        
        
        $scope.user_fullname = localStorage.getItem('user_fullname');
        $scope.profile_image = localStorage.getItem('profile_image');
        $scope.flat_number = localStorage.getItem('flat_number');

        $http.get(serviceBase + 'getComplaintDetailByID?complaint_id='+encodeURIComponent($routeParams.complaint_id)+'&user_id='+encodeURIComponent($scope.cookie_user_id)).then(function (data){
            $scope.complaintDataObj = data.data.data;
            
            $scope.complaint_message = $sce.trustAsHtml($scope.complaintDataObj.complaint_message);

            $scope.$parent.contentFound = 1;   
            $scope.contentFound = 1;
            $('#loading_span_id').html('Loading');
        });
        
        $scope.updateComplaintStatusClick = function(complaint_id) {
            
            $('#loading_span_id').html('Closing Complaint');
            $scope.$parent.contentFound = 0;   
            $scope.contentFound = 0;

            $http.get(serviceBase + 'setUpdateComplaintStatus?user_id='+encodeURIComponent($scope.cookie_user_id)+'&complaint_id='+complaint_id+'&complaint_status=c').then(function (data){
                $("#complaint_detail_page_error").html("<div class='alert alert-success text-center'>Complaint Closed Successfully.</div>");
               
                //setTimeout(function(){$('#complaint_detail_page_error').html('')}, 3500);
                setTimeout(function(){ $rootScope.goBackward(); location.href = defaultLocalPath+'complaints.html' }, 3500);
                   
                $scope.$parent.contentFound = 1;   
                $scope.contentFound = 1;
                $('#loading_span_id').html('Loading');
            });

        };
        
        $scope.addCommentToComplaint = function(complaint_id) {
            
            if($('#complaint_comment').val() == '') { //if string is empty
                //$rootScope.alert("Please Enter Your Comment.", '', '');
                $('#alert_text_div').html("Please enter Your Comment.");
                $('#alert_main_div').removeClass('hide');
            } else {
                $('#loading_span_id').html('Adding Comments');
                $scope.$parent.contentFound = 0;   
                $scope.contentFound = 0;

                $http.get(serviceBase + 'setAddComplaintComments?user_id='+encodeURIComponent($scope.cookie_user_id)+'&complaint_id='+complaint_id+'&complaint_comment='+encodeURIComponent($('#complaint_comment').val())).then(function (data){
                    
                    $scope.complaintDataObj.complaint_comments = data.data.data;
                    $('#complaint_comment').val('');
                    
                    $("#complaint_comment_error").html("<div class='alert alert-success text-center'>Comments Added Successfully.</div>");
                   
                    setTimeout(function(){$('#complaint_comment_error').html('')}, 2000);
                       
                    $scope.$parent.contentFound = 1;   
                    $scope.contentFound = 1;
                    $('#loading_span_id').html('Loading');
                });
            }
        };
    }
});


rwaApp.controller('addComplaintPageCtrl', function ($scope, $http, $cookies, $rootScope, $routeParams) {
    if(!$rootScope.cookie_user_id){
        location.href = defaultLocalPath;
    }
    
    if ($rootScope.checkConnection()) {

        $('#loading_span_id').html('Loading');
        $scope.$parent.contentFound = 0;   
        $scope.contentFound = 0;

        $scope.mainSiteImageURL = mainSiteImageURL;
        $scope.defaultLocalPath = defaultLocalPath;
        

        $scope.cookie_user_id = localStorage.getItem('cookie_user_id');
        
        $http.get(serviceBase + 'getComplaintCategory').then(function (data){
            $scope.categoryObj = data.data.data;

            $scope.$parent.contentFound = 1;   
            $scope.contentFound = 1;
        });
        
        
         // Called when a photo is successfully retrieved
        function onPhotoDataSuccessComplaints(imageData) {
            $('#changeProfilePhoto').removeClass('active');
          // Uncomment to view the base64 encoded image data
          // console.log(imageData);
          // Get image handle
          var smallImage = document.getElementById('profileSmallImageComplaint');

          // Unhide image elements
          $('#imagediv').removeClass('hide');

          // Show the captured photo
          // The inline CSS rules are used to resize the image
          smallImage.src = "data:image/jpeg;base64," + imageData;
          $('#imageHiddenValueComplaint').val(imageData);
        }
        
        
        // A button will call this function
        $scope.openCapturePhotoOption = function() {
            $('#changeProfilePhoto').addClass('active');
        }
           // A button will call this function
        $scope.closeCapturePhotoOption = function() {
            $('#changeProfilePhoto').removeClass('active');
        }
        

        // A button will call this function
        $scope.capturePhotoComplaint = function() {
          // Take picture using device camera and retrieve image as base64-encoded string
          navigator.camera.getPicture(onPhotoDataSuccessComplaints, onFailComplaints, { quality: 50,
            destinationType: navigator.camera.DestinationType.DATA_URL, allowEdit: true, correctOrientatin: true });
        }
           
        // A button will call this function
        $scope.capturePhotoComplaintGallery = function() {
          // Take picture using device camera and retrieve image as base64-encoded string
          navigator.camera.getPicture(onPhotoDataSuccessComplaints, onFailComplaints, { quality: 50,
            destinationType: navigator.camera.DestinationType.DATA_URL, allowEdit: true, correctOrientatin: true, sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY });
        }

        // Called if something bad happens.
        function onFailComplaints(message) {

        }
        
        
        $scope.addNewComplaintClick = function() {
            if($('#complaint_message').val() == '') { //if string is empty
                //$rootScope.alert("Please enter Complaint Details.", '', '');
                //setTimeout(function(){$("#complaint_message").focus()}, 0);
                $('#alert_text_div').html("Please enter Complaint Details.");
                $('#alert_main_div').removeClass('hide');
            } else if($('#complaint_category').val() == ''){
                //$rootScope.alert("Please select Complaint Category.", '', '');
                //setTimeout(function(){$("#complaint_category").focus()}, 0);
                $('#alert_text_div').html("Please select Complaint Category.");
                $('#alert_main_div').removeClass('hide');
            } else {
                $('#loading_span_id').html('Adding Complaint');
                $scope.$parent.contentFound = 0;   
                $scope.contentFound = 0;

                var fd = new FormData();
                fd.append("image_data", $('#imageHiddenValueComplaint').val())
                fd.append("user_id", $rootScope.cookie_user_id);
                fd.append("complaint_message", $('#complaint_message').val());
                fd.append("complaint_category", $('#complaint_category').val());
                
                $http.post(serviceBase + 'setAddComplaint', fd, {transformRequest: angular.identity, headers: {'Content-Type': undefined, 'Access-Control-Allow-Origin' : '*'}}).then(function (data){
                    
                    $('#complaint_message').val('');
                     var smallImage = document.getElementById('profileSmallImageComplaint');

                     smallImage.src = '';
                     $('#imageHiddenValueComplaint').val('');
                    
                    $("#complaint_detail_page_error").html("<div class='alert alert-success text-center'>New Complaint File Successfully.</div>");

                    setTimeout(function(){ $rootScope.goBackward(); window.location.href = defaultLocalPath+'complaints.html' }, 3500);
                       
                    $scope.$parent.contentFound = 1;   
                    $scope.contentFound = 1;
                    $('#loading_span_id').html('Loading');
                });
            }

        };
        
    }

});


rwaApp.controller('paymentSummaryPageCtrl', function ($scope, $http, $cookies, $rootScope, $document) {
    if(!$rootScope.cookie_user_id){
        location.href = defaultLocalPath;
    }
    
    if ($rootScope.checkConnection()) {
        $('#loading_span_id').html('Fetching Payment Information');
        $scope.$parent.contentFound = 0;   
        $scope.contentFound = 0;

        $scope.mainSiteImageURL = mainSiteImageURL;
        $scope.defaultLocalPath = defaultLocalPath;

        $scope.cookie_user_id = localStorage.getItem('cookie_user_id');
        $scope.user_fullname = localStorage.getItem('user_fullname');
        $scope.flat_number = localStorage.getItem('flat_number');

        $http.get(serviceBase + 'getCurrentQuarterPayment?show_count_only=0&user_id='+encodeURIComponent($scope.cookie_user_id)+'&flat_number='+encodeURIComponent($scope.flat_number)).then(function (data){
            $scope.currentQuarterPaymentObj = data.data.data;
        });

        var reachedLast = false;
        $scope.showLoading = true;
        $scope.oldPayments = [];

        NextpageNumber = 0;//next page is made it zero on starting
        $scope.loadOldPayments = function(scroll_down) {
            $scope.showLoading = true;

            if(reachedLast)
                return false;
            
            if (scroll_down == '-') {
                $("#footer_id").html("<div class='text-center'><i class='fa fa-circle-o-notch fa-spin fa-2x fa-fw'></i></div>");
            }

            $http.get(serviceBase + 'getMorePayments?after='+encodeURIComponent(NextpageNumber)+'&user_id='+encodeURIComponent($scope.cookie_user_id)+'&flat_number='+encodeURIComponent($scope.flat_number)).then(function (data){
                
                //$("html, body").animate({ scrollTop: ('0px') }, "slow");
             
                var currentpage = NextpageNumber;//taking current pagenumber
                NextpageNumber = data.data.nextpage;
                $scope.totalResult = data.data.totalResult;


                if((currentpage == NextpageNumber) ){
                    return false;
                }

                $scope.oldPayments = $scope.oldPayments.concat(data.data.data);

                $scope.showLoading = false;
                
                $("#footer_id").html("");

                if (scroll_down == 'bottom') {
                    $scope.$parent.contentFound = 1;   
                    $scope.contentFound = 1;
                    $('#loading_span_id').html('Loading');
                }
            });

        };

        $scope.loadOldPayments('bottom');// loading initial content
       
        $scope.$on(
            "$destroy",
            function( event ) {
                angular.element($document).off('touchmove');
            }
        );
    }

});


rwaApp.controller('feedbackPageCtrl', function ($scope, $http, $cookies, $rootScope, $routeParams) {
    if(!$rootScope.cookie_user_id){
        location.href = defaultLocalPath;
    }
    
    if ($rootScope.checkConnection()) {

        $('#loading_span_id').html('Loading');
        $scope.$parent.contentFound = 0;   
        $scope.contentFound = 0;

        $scope.mainSiteImageURL = mainSiteImageURL;
        $scope.defaultLocalPath = defaultLocalPath;
    
        $scope.cookie_user_id = localStorage.getItem('cookie_user_id');
        
        $scope.$parent.contentFound = 1;   
        $scope.contentFound = 1;
        
        $scope.addNewFeedbackClick = function() {
            if($('#feedback_subject').val() == '') { //if string is empty
                $('#alert_text_div').html("Please enter Subject.");
                $('#alert_main_div').removeClass('hide');
            } else if($('#feedback_message').val() == ''){
                $('#alert_text_div').html("Please enter Message.");
                $('#alert_main_div').removeClass('hide');
            } else {
                $('#loading_span_id').html('Submitting Message');
                $scope.$parent.contentFound = 0;   
                $scope.contentFound = 0;
                
                $http.get(serviceBase + 'setSendFeedback?user_id='+encodeURIComponent($scope.cookie_user_id)+'&feedback_subject='+encodeURIComponent($('#feedback_subject').val())+'&feedback_message='+encodeURIComponent($('#feedback_message').val())).then(function (data){
                    
                    $("#complaint_detail_page_error").html("<div class='alert alert-success text-center'>Your Message Sent Successfully.</div>");

                    setTimeout(function(){ $rootScope.goBackward(); window.location.href = defaultLocalPath+'dashboard.html' }, 3500);
                       
                    $scope.$parent.contentFound = 1;   
                    $scope.contentFound = 1;
                    $('#loading_span_id').html('Loading');
                });
            }

        };
        
    }

});


rwaApp.controller('msgBoardPageCtrl', function ($scope, $http, $cookies, $rootScope, $routeParams, $anchorScroll, $location, $timeout, $document) {
    if(!$rootScope.cookie_user_id){
        location.href = defaultLocalPath;
    }
    
    if ($rootScope.checkConnection()) {
        $('#loading_span_id').html('Fetching Messages');
        $scope.$parent.contentFound = 0;   
        $scope.contentFound = 0;

        $scope.mainSiteImageURL = mainSiteImageURL;
        $scope.defaultLocalPath = defaultLocalPath;
        $scope.cookie_user_id = localStorage.getItem('cookie_user_id');
        
        var reachedLast = false;
        $scope.startLoadMsg = false;
        $scope.loadMoreMessages = true;
        $scope.showLoading = true;
        $scope.oldMessages = [];

        $scope.NextpageNumber = 0;//next page is made it zeero on Messages
        $scope.loadOldMessages = function(scroll_down) {
            //$scope.$parent.contentFound = 0;   
            //$scope.contentFound = 0;

            $scope.showLoading = true;
            
            if (scroll_down == '-') {
                $("#header_id").html("<div class='text-center'><i class='fa fa-circle-o-notch fa-spin fa-2x fa-fw'></i></div>");
            }

            $http.get(serviceBase + 'getMoreMessages?user_id='+encodeURIComponent($scope.cookie_user_id)+'&after='+encodeURIComponent($scope.NextpageNumber)).then(function (data){
                
                //$("html, body").animate({ scrollTop: ('0px') }, "slow");
             
                var currentpage = $scope.NextpageNumber;//taking current pagenumber
                $scope.NextpageNumber = data.data.nextpage;
                $scope.totalResult = 10; //data.data.totalResult;

                if((currentpage == $scope.NextpageNumber) ){
                    return false;
                }

                $scope.loadMoreMessage = true;
                //$scope.oldMessages = $scope.oldMessages.concat(data.data.data);
                var newMsgs = data.data.data;
                $scope.oldMessages = $scope.oldMessages.concat(newMsgs);

                $scope.showLoading = false;

                $("#header_id").html('');
                
                if (scroll_down == 'bottom') {
                    setTimeout(function(){$anchorScroll('footer_id');}, 400);
                    setTimeout($scope.loadContent(), 800);
                } else if (scroll_down == 'top') {
                    setTimeout(function(){$anchorScroll('header_id'); }, 500);
                }

            });

        };
        
        $scope.loadContent = function() {
             $scope.$parent.contentFound = 1; 
             $scope.contentFound = 1;
             $('#loading_span_id').html('Loading');
        }

        $scope.loadOldMessages('bottom');// loading initial content
        
        /*$scope.recursiveRetrieveMsgs = function () {
            $scope.NextpageNumber = 0;
            $scope.oldMessages = [];
            
            $scope.loadOldMessages('bottom');
            
            $scope.timer = $timeout($scope.recursiveRetrieveMsgs, 5000);
        }
        
        $scope.timer = $timeout($scope.recursiveRetrieveMsgs, 5000);*/

        
        $scope.$on(
            "$destroy",
            function( event ) {
                angular.element($document).off('touchmove');
            }
        );
        
        $scope.addNewMessage = function() {
            
            if($('#description').val() == '') { //if string is empty
                //$rootScope.alert("Please Enter Your Message.", '', '');
                $('#alert_text_div').html("Please Enter Your Message.");
                $('#alert_main_div').removeClass('hide');
            } else {
                $('#loading_span_id').html('Sending Message');
                $scope.$parent.contentFound = 0;   
                $scope.contentFound = 0;

                $http.get(serviceBase + 'setAddMessages?user_id='+encodeURIComponent($scope.cookie_user_id)+'&description='+encodeURIComponent($('#description').val())).then(function (data){
                    
                    $('#description').attr("style", "");
                
                    $scope.oldMessages = $scope.oldMessages.concat(data.data.data);
                    $scope.totalResult = data.data.totalResult;
                    $('#description').val('');
                    setTimeout(function(){$anchorScroll('footer_id'); }, 500);
                    $scope.$parent.contentFound = 1; $scope.contentFound = 1; 
                    $('#loading_span_id').html('Loading');
                });
            }
        };
    }
});


//Directives for Date Time Picker Starts Here
rwaApp.directive('exSourceCode', function () {
    return {
        template: '<h4>{{title}}</h4><pre  hljs class="html"><code>{{sourceCode}}</code></pre>',
        scope: {},
        link: function (scope, element, attrs) {
            var tmp = angular.element((element.parent()[0]).querySelector(attrs.target || 'md-input-container'));
            if (tmp.length) {
                scope.title = attrs.title || "Source Code";
                var sourceCode = tmp[0].outerHTML
                        .replace('ng-model=', 'angularModel=')
                        .replace('ng-click=', 'angularClick=')
                        .replace(/ng-[a-z\-]+/g, '')
                        .replace(/ +/g, ' ')
                        .replace('angularModel=', 'ng-model=')
                        .replace('angularClick=', 'ng-click=')
                        ;

                scope.sourceCode = style_html(sourceCode, {
                    'indent_size': 2,
                    'indent_char': ' ',
                    'max_char': 78,
                    'brace_style': 'expand'
                });
            }
        }
    };
});

rwaApp.directive('hljs', function ($timeout) {
    return {
        link: function (scope, element) {
            $timeout(function () {
                hljs.highlightBlock(element[0].querySelector('code'));
            }, 100);
        }
    };
});
//Directives for Date Time Picker Ends Here

rwaApp.directive('scrollableContainer', function($window, $document, $rootScope, $timeout) {
    return {
        link: function(scope, element, attrs) {
            angular.element($document).on('touchmove', function() {
                var top = $('#header_id').offset().top;
                
                var differenceFooter = $('#footer_id').offset().top - $('#fixed_footer_id').offset().top;
              
                /*if(differenceFooter == 0 && scope.startLoadMsg == true) {
                    scope.timer = $timeout(scope.recursiveRetrieveMsgs, 5000);
                    scope.startLoadMsg = false;
                }*/
                
                var differenceHeader = $('#fixed_header_id').offset().top - $('#header_id').offset().top;
                //alert(differenceHeader);
                
                //if(top >= topPointer) {
                if(differenceHeader <= 0) {
                    $timeout.cancel( scope.timer );
                    scope.startLoadMsg = true;
                    if (scope.totalResult == 0) {
                        //$(".menListBox").removeAttr("id");
                        //Do Nothing.....
                         /*$("#header_id").html("<div class='text-center'><i class='fa fa-circle-o-notch fa-spin fa-2x fa-fw'></i></div>");
                         setTimeout(function(){$('#header_id').html('')}, 1500);*/
                    } else {
                        scope.loadOldMessages('-');
                    }
                }
            });
        }
    };
});

rwaApp.directive('scrollableContainerNotifications', function($window, $document) {
    return {
        link: function(scope, element, attrs) {
            angular.element($document).on('touchmove', function() {
               
                var differenceFooter = $('#footer_id').offset().top - $('#notification_footer').offset().top;
                
                //alert(differenceFooter);
                $('.gotoTop').addClass('in');
                
                if(differenceFooter <= 2) {
                    if (scope.totalResult == 0) {
                         /*$("#footer_id").html("<div class='text-center'><i class='fa fa-circle-o-notch fa-spin fa-2x fa-fw'></i></div>");
                         setTimeout(function(){$('#footer_id').html('')}, 1500);*/
                    } else {
                        scope.loadOldNotifications('-');
                    }
                }
            });
        }
    };
});

rwaApp.directive('scrollableContainerEvents', function($window, $document) {
    return {
        link: function(scope, element, attrs) {
            angular.element($document).on('touchmove', function() {
               
                var differenceFooter = $('#footer_id').offset().top - $('#event_footer').offset().top;
                
                $('.gotoTop').addClass('in');
                
                if(differenceFooter <= 2) {
                    if (scope.totalResult == 0) {
                         /*$("#footer_id").html("<div class='text-center'><i class='fa fa-circle-o-notch fa-spin fa-2x fa-fw'></i></div>");
                         setTimeout(function(){$('#footer_id').html('')}, 1500);*/
                    } else {
                        scope.loadOldEvents('-');
                    }
                }
            });
        }
    };
});

rwaApp.directive('scrollableContainerMyEvents', function($window, $document) {
    return {
        link: function(scope, element, attrs) {
            angular.element($document).on('touchmove', function() {
               
                var differenceFooter = $('#footer_id').offset().top - $('#event_footer').offset().top;
                
                $('.gotoTop').addClass('in');
                
                if(differenceFooter <= 2) {
                    if (scope.totalResult == 0) {
                         /*$("#footer_id").html("<div class='text-center'><i class='fa fa-circle-o-notch fa-spin fa-2x fa-fw'></i></div>");
                         setTimeout(function(){$('#footer_id').html('')}, 1500);*/
                    } else {
                        scope.loadOldEvents('-');
                    }
                }
            });
        }
    };
});

/*
rwaApp.directive('scrollableContainerPayments', function($window, $document) {
    return {
        link: function(scope, element, attrs) {
            angular.element($document).on('touchmove', function() {
               
                var differenceFooter = $('#footer_id').offset().top - $('#payment_footer').offset().top;
                
                $('.gotoTop').addClass('in');
                if(differenceFooter <= 2) {
                    if (scope.totalResult == 0) {
                    } else {
                        scope.loadOldPayments('-');
                    }
                }
            });
        }
    };
});
*/

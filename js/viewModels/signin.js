/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */

 // signin page viewModel
 // In a real app, replace it with your authentication and logic
'use strict';
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'mbe',
        'ojs/ojrouter',
        'ojs/ojknockout',
        'ojs/ojcheckboxset',
        'ojs/ojinputtext',
        'ojs/ojbutton',
        'ojs/ojanimation'], function(oj, ko, $, app, mbe) {
    
  function signinViewModel() {
      
    var self = this;
    self.app = app;

    self.handleTransitionCompleted = function(info) {
      // invoke fadeIn animation
      var animateOptions = { 'delay': 0, 'duration': '1s', 'timingFunction': 'ease-out' };
      oj.AnimationUtils['fadeIn']($('.demo-signin-bg')[0], animateOptions);
    }

    // Replace with state save logic for rememberUserName
//    self.userName = ko.observable('john.dunbar01');
    self.userName = ko.observable('john.dunbar01');
    self.passWord = ko.observable('Avitek1@');
    self.userType = ko.observable('customer');
    self.rememberUserName = ko.observable(['remember']);

    // Rlace with sign in authentication
    self.signIn = function() {
       self.skipMbeSignIn();
       //self.mbeSignIn();
    }
    
    self.skipMbeSignIn = function() {
       self.loginSuccess();
    }
    self.mbeSignIn = function() {
      //TODO: -- app.pushClient.registerForNotifications();

      var baseUrl = mbe.mcs_config.mobileBackends.RNDC.baseUrl;
      var userUrl = mbe.mcs_config.mobileBackends.RNDC.userUrl
      var mbeId = mbe.mcs_config.mobileBackends.RNDC.authorization.basicAuth.backendId;
      var reqUrl = baseUrl + userUrl;
      var accessToken = btoa(self.userName() + ":" + self.passWord());
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }

      $.ajaxSetup({
        headers: {
          'Authorization': "Basic " + accessToken
        }
      });

      $.getJSON(reqUrl, function (result) {
        //console.log(result);
        //alert("Login success.");
        self.loginSuccess();
      }).fail(function () {
        self.loginFailure();            
      })      
    };

    self.loginSuccess = function (response, data) {   
        //self.isLoggedIn(true);
        app.reset();
        app.setupUserInfo(self.userName());
        app.goToPage(app.userInfo().userRedirect);    
        registerDeviceForMCSPush();
    };

    self.loginFailure = function (statusCode) {
        //self.isLoggedIn(false);
        alert("Invalid username/password");
    };

    function registerDeviceForMCSPush(){
      var defer = $.Deferred();
          if (typeof PushNotification !== 'undefined') {
            console.log("Push Notification exists!!!");
            try {
                var senderID = "967750572684"//appConfig.get("androidProjectID")
                var push = PushNotification.init({
                    android: {                                
                        "senderID": senderID
                    },
                    ios: {
                        "alert": "true",
                        "badge": "true",
                        "sound": "true"
                    },
                    windows: {}
                });
                        
                push.on('registration', function (data) {                         
                    var os = (cordova.platformId === 'ios') ? 'IOS' : 'ANDROID';
                    var payload = JSON.stringify({
                        "notificationToken": data.registrationId,
                        "mobileClient": {
                            "id": "com.oraclecorp.rndcpush",
                            "version": "1.0.0",
                            "platform": os
                        }
                    });
                    console.log("Reg Device PL: "+payload);   
                    var baseUrl = mbe.mcs_config.mobileBackends.RNDC.baseUrl;                    
                    var mbeId = mbe.mcs_config.mobileBackends.RNDC.authorization.basicAuth.backendId;
                    var reqUrl = baseUrl + "/mobile/platform/devices/register";                                           
                    var jqxhr = $.post(reqUrl, payload, function( data, textStatus, resp) {        
                        console.log( data );                    
                        console.log("Registration success");
                        defer.resolve(data);
                    }, "json");

                    jqxhr.fail(function(resp) {
                      console.log("Error registering device with MCS for Push Notifications: "+resp);
                      defer.reject();
                    })                           
                });
                push.on('notification', function (data) {                      
                    if(data.message){
                        console.log("Push Notification from Oracle MCS: " + data.message);
                        //alert(data.message);
                        app.goToTrackPackage();
                    }          
                });  
                push.on('error', function (e) {  
                    alert("Push Notification Error=" + e.message);  
                });                
            }
            catch (ex) {
                console.log("Error registering device with MCS for Push Notifications: "+ex);
                defer.reject();
            }
        }
        else {
            console.log("PushNotification NOT Defined!");
            defer.reject();
        }      
    }


  }
  return signinViewModel;
});

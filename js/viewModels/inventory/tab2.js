/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 
        'ojs/ojselectcombobox',
        'ojs/ojinputtext'],
 function(oj, ko, $, app) {
  
    function Tab2ViewModel() {
        var self = this;
        self.app = app;
        
        self.parentModule = ko.dataFor(document.getElementById('inventory_content'));
        
        self.prod_Id = ko.observable();
        
        
        self.prod_Id1 = ko.observable();
        self.prod_Id2 = ko.observable();
        self.prod_Id3 = ko.observable();
        self.prod_Id4 = ko.observable();
        self.prod_Id5 = ko.observable();
        self.prod_Id6 = ko.observable();
        
        
        self.validate1 = function(newValue, data) {
            var inputVal = data.target.value;
            if (!($.isNumeric(inputVal))) {
                data.target.value = "";
                data.target.focus();
            } else {
                $('#mc2').focus();
            }
        }
        self.validate2 = function(newValue, data) {
            var inputVal = data.target.value;
            if (!($.isNumeric(inputVal))) {
                data.target.value = "";
                data.target.focus();
            } else {
                $('#mc3').focus();
            }
        }
        self.validate3 = function(newValue, data) {
            var inputVal = data.target.value;
            if (!($.isNumeric(inputVal))) {
                data.target.value = "";
                data.target.focus();
            } else {
                $('#mc4').focus();
            }
        }
        self.validate4 = function(newValue, data) {
            var inputVal = data.target.value;
            if (!($.isNumeric(inputVal))) {
                data.target.value = "";
                data.target.focus();
            } else {
                $('#mc5').focus();
            }
        }
        self.validate5 = function(newValue, data) {
            var inputVal = data.target.value;
            if (!($.isNumeric(inputVal))) {
                data.target.value = "";
                data.target.focus();
            } else {
                $('#mc6').focus();
            }
        }
        self.validate6 = function(newValue, data) {
            var inputVal = data.target.value;
            if (!($.isNumeric(inputVal))) {
                data.target.value = "";
                data.target.focus();
            } else {
               self.prod_Id6(inputVal);
               self.prod_Id(self.prod_Id1() + self.prod_Id2() + self.prod_Id3() + self.prod_Id4() + self.prod_Id5() + self.prod_Id6());
                self.parentModule.selected_prod_id(self.prod_Id());
               self.getItemForId();
            }
        }
        
        self.selectcontent = function(newValue, data) {
            console.log("SelectContent");
            console.log(newValue);
            console.log(data);
        }
        
        
        
      // Below are a subset of the ViewModel methods invoked by the ojModule binding
      // Please reference the ojModule jsDoc for additionaly available methods.
        self.testScanBarCode = function() {
            self.parentModule.goToPage('tab2Detail', 'navSiblingLater', {"identifier":'123450'});
        }
        
        self.getItemForId = function() {
            self.parentModule.selected_prod_id(self.prod_Id());
            self.parentModule.goToPage('tab2Detail', 'navSiblingLater', {"identifier": self.prod_Id()})
        }
        
        self.scanBarCode = function() {
            if (cordova) {
                console.log("Cordova is available");
                cordova.plugins.barcodeScanner.scan(
                  function (result) {
                      if (result.text) {
                          console.log("We got a barcode\n" +
                                "Result: " + result.text + "\n" +
                                "Format: " + result.format + "\n" +
                                "Cancelled: " + result.cancelled);
                          self.parentModule.goToPage('tab2Detail', 'navSiblingLater', {"identifier":result.text});
                          
                      }
                  }, 
                  function (error) {
                      alert("Scanning failed: " + error);
                  }
               );
            } else {
                console.log("Error scanning. Cordova not available");
            }
        }
        
            
            
        self.takePicture = function() {
            if (navigator.camera && typeof navigator.camera !== "undefined") {       
                        //sample camera options, using defaults here but for illustration....
                        //Note that the destinationType can be a DATA_URL but cordova plugin warns of memory usage on that.
                        var cameraOptions = {
                                quality: 50,
                                destinationType: Camera.DestinationType.FILE_URL,
                                sourceType: Camera.PictureSourceType.CAMERA,
                                allowEdit: false,
                                encodingType: Camera.EncodingType.JPEG,                            
                                saveToPhotoAlbum: false,
                                correctOrientation: true
                        };
                        //use camera pluging method to take a picture, use callbacks for handling result
                        navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);
                } else {
                        //running on web, the navigator.camera object will not be available
                        alert("The navigator.camera object is not available.");
                }
        }

        function cameraSuccess(imageData) {
            console.log("Camera Success");
            console.log(JSON.stringify(imageData));
        }

        function cameraError(error) {
                console.log(error);
        }
      /**   
       * Optional ViewModel method invoked when this ViewModel is about to be
       * used for the View transition.  The application can put data fetch logic
       * here that can return a Promise which will delay the handleAttached function
       * call below until the Promise is resolved.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
       * the promise is resolved
       */
      self.handleActivated = function(info) {
      };

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
       */
      self.handleAttached = function(info) {
        // Implement if needed
      };


      /**
       * Optional ViewModel method invoked after the bindings are applied on this View. 
       * If the current View is retrieved from cache, the bindings will not be re-applied
       * and this callback will not be invoked.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       */
      self.handleBindingsApplied = function(info) {
        // Implement if needed
      };

      /*
       * Optional ViewModel method invoked after the View is removed from the
       * document DOM.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
       */
      self.handleDetached = function(info) {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new Tab2ViewModel();
  }
);

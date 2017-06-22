/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
'use strict';
define(['ojs/ojcore', 'knockout', 'jquery', 'appController',
        'ojs/ojknockout',
        'ojs/ojoffcanvas',
        'ojs/ojlistview',
        'ojs/ojswipetoreveal',
        'ojs/ojjquery-hammer',
        'promise',
        'ojs/ojpulltorefresh',
        'ojs/ojmodel',
        'ojs/ojcheckboxset',
        'ojs/ojarraytabledatasource',
        'ojs/ojpopup',
        'ojs/ojanimation',
        'ojs/ojfilmstrip',
        'signature_pad'],
    function (oj, ko, $, app) {

        function InventoryViewModel() {
            var self = this;
            self.app = app;
            
            self.selected_prod_id = ko.observable();
            
            self.router = null;
            
            self.signaturePad = null;
            
            self.checkinId = null;
            self.checkoutId = null;
            self.checkInOutSuccessCallback = null;
            
            // Below are a subset of the ViewModel methods invoked by the ojModule binding
            // Please reference the ojModule jsDoc for additionaly available methods.
            
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
            self.handleActivated = function (params) {
                app.loadMBEInventoryData();
                //app.loadRecommendationsData();
                
                if (!self.router) {
                    // setup child router
                    var parentRouter = params.valueAccessor().params['ojRouter']['parentRouter'];

                    self.router = parentRouter.createChildRouter('inventoryTabs').configure({
                        'tab1': {
                            label: 'Inventory',
                            value: 'inventory/tab1',
                            isDefault: true
                        },
                        'tab1Detail': {
                            label: 'Item Details',
                            value: 'inventory/tab1Detail'
                        },
                        'tab2': {
                            label: 'Lookup',
                            value: 'inventory/tab2'
                        },
                        'tab2Detail': {
                            label: 'Lookup Details',
                            value: 'inventory/tab2Detail'
                        }
                    });
                }

                // setup animations between nav tabs
                self.pendingAnimationType = ko.observable(null);

                var switcherCallback = function (context) {
                    return self.pendingAnimationType();
                };

                self.moduleConfig = ko.computed(function () {
                    var animation;
                    if (self.pendingAnimationType() === 'navSiblingEarlier') {
                        animation = oj.ModuleAnimations.createAnimation({
                            'effect': 'slideOut',
                            'direction': 'end',
                            'persist': 'all'
                        }, {
                            'effect': 'slideIn',
                            'direction': 'end'
                        }, false)
                    } else if (self.pendingAnimationType() === 'navSiblingLater') {
                        animation = oj.ModuleAnimations.createAnimation({
                            'effect': 'slideOut',
                            'direction': 'start',
                            'persist': 'all'
                        }, {
                            'effect': 'slideIn',
                            'direction': 'start'
                        }, false)
                    } else {
                        animation = oj.ModuleAnimations.switcher(switcherCallback);
                    }

                    return $.extend(true, {}, self.router.moduleConfig, {
                        'animation': animation,
                        'cacheKey': self.router.currentValue()
                    })
                });

                return oj.Router.sync();
            };

            // update nav tabs animation based on selection change
            self.navBarChange = function (event, ui) {

                if (ui.option === 'currentItem') {

                    var previousValue = ui.previousValue || self.router.stateId();
                    
                    switch (previousValue) {
                        case 'tab1':
                            self.pendingAnimationType('navSiblingLater');
                            break;
                        case 'tab1Detail':
                            if (ui.value === 'tab1') {
                                self.pendingAnimationType('navSiblingEarlier');
                            } else {
                                self.pendingAnimationType('navSiblingLater');
                            }
                            break;
                        case 'tab2':
                            if (ui.value === 'tab1') {
                                self.pendingAnimationType('navSiblingEarlier');
                            } else {
                                self.pendingAnimationType('navSiblingLater');
                            }
                            break;
                        case 'tab3':
                            self.pendingAnimationType('navSiblingEarlier');
                    }
                }
            };
            self.getItemForId = function(params) {
                console.log("Going to tab2Detail");
                var itemId = $(params).find('#prod_id').val();
                self.goToPage('tab2Detail', 'navSiblingLater', {"identifier": itemId})
            }
            self.goToPage = function(pageId, pAnimationType, param) {
                self.selected_prod_id(param.identifier);
                if (pAnimationType)
                    self.pendingAnimationType(pAnimationType);
                self.router.go(pageId);
            };
        
            self.addToCart = function(params) {
                var prod_id = $(params).find('input').filter('[name=prod_id]')[0].value;
                var qty = $(params).find('#oj-combobox-input-qty_combobox')[0].value;
                
                app.addItemToCart(prod_id, qty);
            };
                    
            self.checkOutItem = function(successCallBack, params) {
                console.log("Inventory.checkOutItem. Callback");
                
                self.checkInOutSuccessCallback = successCallBack;
                console.log(successCallBack);
                console.log(self.checkInOutSuccessCallback);
                
                self.checkoutId = $(params).find('#prod_id').val();
                self.checkinId = null;
                self.openSignatureDialog();
            }
            self.checkInItem = function(successCallBack, params) {
                console.log("Inventory.checkInItem. Callback");
                
                self.checkInOutSuccessCallback = successCallBack;
                console.log(successCallBack);
                console.log(self.checkInOutSuccessCallback);
                
                self.checkinId = $(params).find('#prod_id').val();
                self.checkoutId = null;
                self.openSignatureDialog();
            }
            self.openSignatureDialog = function() {
                $( "#signaturepopup" ).ojPopup( "option", "position", {
                      "my": "center top",
                      "at": "center top+50",
                      "of": ".oj-applayout-content"
                    });

                    return $('#signaturepopup').ojPopup('open', '#checkoutBtn');
            }
            
            self.signaturePopupDone = function () {
                $('#signaturepopup').ojPopup('close', '#checkoutBtn');
                self.clearSignature();
                if (self.checkoutId) {
                    console.log("Checking out item with it: " + self.checkoutId);
                    console.log("Callback");
                    console.log(self.checkInOutSuccessCallback);
                    app.executeCheckout(self.checkoutId, self.checkInOutSuccessCallback);
                }
                else if (self.checkinId) {
                    console.log("Checking in item with it: " + self.checkinId);
                    console.log("Callback");
                    console.log(self.checkInOutSuccessCallback);
                    app.executeCheckIn(self.checkinId, self.checkInOutSuccessCallback);
                }
            }
            self.cancelSignaturePopup = function () {
                self.checkinId = null;
                self.checkoutId = null;
                return $('#signaturepopup').ojPopup('close', '#checkoutBtn');
            }

            self.initCanvas = function() {
                var canvas = $("#signature")[0];
                self.signaturePad = new SignaturePad(canvas,{
                    dotSize: 1,
                    penColor: "blue"
                });
            }
            self.clearSignature = function(data, event){
                self.signaturePad.clear();
            }
            self.exportSignature = function(data, event){
                var imageURI = self.signaturePad.toDataURL();    
                $("#preview").src = imageURI;
            }
            

            /**
             * Optional ViewModel method invoked after the View is inserted into the
             * document DOM.  The application can put logic that requires the DOM being
             * attached here.
             * @param {Object} info - An object with the following key-value pairs:
             * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
             * @param {Function} info.valueAccessor - The binding's value accessor.
             * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
             */
            self.handleAttached = function (info) {
                // Implement if needed
                self.initCanvas();
            };


            /**
             * Optional ViewModel method invoked after the bindings are applied on this View. 
             * If the current View is retrieved from cache, the bindings will not be re-applied
             * and this callback will not be invoked.
             * @param {Object} info - An object with the following key-value pairs:
             * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
             * @param {Function} info.valueAccessor - The binding's value accessor.
             */
            self.handleBindingsApplied = function (info) {
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
            self.handleDetached = function (info) {
                // Implement if needed
            };


            // settings for headers on incidents page
            self.headerSettings = {
                name: 'basicHeader',
                params: {
                    title: 'Inventory',
                    startBtn: {
                        id: 'navDrawerBtn',
                        click: app.toggleDrawer,
                        display: 'icons',
                        label: 'Navigation Drawer',
                        icons: {
                            start: 'oj-fwk-icon oj-fwk-icon-hamburger'
                        },
                        visible: true
                    }
                }
            };
        }



        /*
         * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
         * each time the view is displayed.  Return an instance of the ViewModel if
         * only one instance of the ViewModel is needed.
         */
        return new InventoryViewModel();
    }
);

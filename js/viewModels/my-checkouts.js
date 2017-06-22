/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'ojs/ojlistview', 'ojs/ojarraytabledatasource'],
    function (oj, ko, $, app) {

        function MyCheckoutsViewModel() {
            var self = this;
            self.app = app;
        
            self.my_checkouts_DS = new oj.ArrayTableDataSource(app.my_checkouts_data, {idAttribute: "id"});
            
            self.router = null;
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
                app.loadMyCheckoutsData();
                
                
                if (!self.router) {
                    // setup child router
                    var parentRouter = params.valueAccessor().params['ojRouter']['parentRouter'];

                    self.router = parentRouter.createChildRouter('my-checkouts').configure({
                        'list': {
                            label: 'My Checkouts List',
                            value: 'my-checkouts/list',
                            isDefault: true
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
                        case 'myCheckoutsList':
                            self.pendingAnimationType('navSiblingLater');
                            break;
                    }
                }
            };
            
            self.goToMyCheckoutsList = function () {
                self.pendingAnimationType('navSiblingEarlier');
                self.router.go('list');
            };

            self.addToCart = function (params) {
                console.log(params);
                var prod_id = $(params).find('input').filter('[name=prod_id]')[0].value;
                var qty = $(params).find('#oj-combobox-input-qty_combobox')[0].value;
                console.log(prod_id);
                console.log(qty);

                app.addItemToCart(prod_id, qty);
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
                    title: 'My Checkouts',
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
            }
        }



        /*
         * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
         * each time the view is displayed.  Return an instance of the ViewModel if
         * only one instance of the ViewModel is needed.
         */
        return new MyCheckoutsViewModel();
    }
);

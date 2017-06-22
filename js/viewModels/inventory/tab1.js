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
    function (oj, ko, $, app) {

        function Tab1ViewModel() {
            var self = this;
            self.app = app;

            self.parentModule = ko.dataFor(document.getElementById('inventory_content'));

            self.filteredInventory = ko.observableArray();
            self.nameSearch = ko.observable();
            self.isFilterMode = ko.observable(false);
            self.recomm_CurrentNavArrowPlacement = ko.observable("overlay");
            self.recomm_CurrentNavArrowVisibility = ko.observable("auto");

            // filter inventory
            self.inventoryDataSource = ko.computed(function () {

                if (self.nameSearch() && app.inventory_data().length > 0) {

                    var token = self.nameSearch().toLowerCase();

                    var searchedInventory = [];

                    self.filteredInventory().forEach(function (node) {
                        if (node.name.toLowerCase().indexOf(token) > -1 ||
                            node.short_desc.toLowerCase().indexOf(token) > -1 ||
                            node.description.toLowerCase().indexOf(token) > -1) {
                            searchedInventory.push(node);
                        }
                    });
                    return new oj.ArrayTableDataSource(searchedInventory, {
                        idAttribute: "name"
                    });

                } else {
                    if (!self.isFilterMode())
                        self.filteredInventory(app.inventory_data());
                    
                    return new oj.ArrayTableDataSource(self.filteredInventory(), {idAttribute: "name"});
                }

            });

            /************** CHECK IN-OUT *****************/
            self.checkInOutSuccess = function() {
                app.loadMBEInventoryData();
            };
            
            /************** S E A R C H *****************/
            self.isSearchMode = ko.observable(false);

            self.goToSearchMode = function () {
                self.isSearchMode(true);
                $("#inputSearch").focus();
            };

            self.exitSearchMode = function () {
                self.isSearchMode(false);
                self.clearSearch();
            };

            self.clearSearch = function () {
                self.nameSearch('');
            };

            /************** F I L T E R *****************/
            self.typeFilterArr = ko.observable(['wine', 'beer', 'distilled']);
            // update list when filter changes
            self.typeFilterArr.subscribe(function (newValue) {
                self.filterInventory();
            });

            self.priceFilterArr = ko.observable(['99-', '100-199', '200+']);

            self.closePopup = function () {
                return $('#filterpopup').ojPopup('close', '#filterIncident');
            }

            self.filterInventory = function () {
                var results = app.inventory_data().filter(function (product) {
                    return self.typeFilterArr().indexOf(product.type) > -1;
                });

                self.isFilterMode(true);
                self.filteredInventory(results);
            };

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
            self.handleActivated = function (info) {
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
        }

        /*
         * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
         * each time the view is displayed.  Return an instance of the ViewModel if
         * only one instance of the ViewModel is needed.
         */
        return new Tab1ViewModel();
    }
);

/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'mbe',
        'ojs/ojknockout',
        'ojs/ojarraytabledatasource',
        'ojs/ojoffcanvas',
        'ojs/ojnavigationlist',
        'ojs/ojoffcanvas',
        'ojs/ojmodule',
        'ojs/ojrouter',
        'ojs/ojmoduleanimations',
        'ojs/ojpopup'],
    function (oj, ko, $, mbe) {
    
        var anonymousToken = mbe.mcs_config.mobileBackends.RNDC.authorization.basicAuth.anonymousToken;
        var mbeId =  mbe.mcs_config.mobileBackends.RNDC.authorization.basicAuth.backendId;
        
        $.ajaxSetup({
            headers: {
            'Authorization': "Basic " + anonymousToken,              
            'oracle-mobile-backend-id': mbeId, 
            'Content-Type': "application/json; charset=utf-8"
            }
        });  

        oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();
        var router = oj.Router.rootInstance;

        // Root router configuration
        router.configure({
            'signin': {
                label: 'Sign In',
                isDefault: true
            },
            'inventory': {
                label: 'Inventory'
            },
            'my-checkouts': {
                label: 'My Checkouts'
            },          
            'chatbot': {
                label: 'Support'
            }
        });
    
        function ControllerViewModel() {
            var self = this;
            
            self.userInfo = ko.observable({
                userId: "john.dunbar01",
                userName: 'John Dunbar',
                userType: 'customer',
                userRedirect: 'inventory'
            });
            
            /** Mock data **/
            self.inventory_url = "./data/inventory.json";
            self.my_checkouts_url = "./data/my_checkouts.json";
            self.sales_dashboard_url = "./data/salesdashboardMock.json";
            
            /*** MBE Urls ***/
            self.baseUrl = mbe.mcs_config.mobileBackends.RNDC.baseUrl;
            
            /** Data arrays for Data Source **/
            self.inventory_data = ko.observableArray([]);
            self.product_detail_data = ko.observable();
            self.my_checkouts_data = ko.observableArray([]);


            /***************************************************************
                                Router setup
            ***************************************************************/
            self.router = router;
            self.navChangeHandler = function (event, data) {
                if (data.option === 'selection' && data.value !== self.router.stateId()) {
                    self.toggleDrawer();
                }
            }

            // Drawer setup
            self.drawerChange = function (event, data) {
                if (data.option === 'selection') {
                    self.closeDrawer();
                }
            };
            self.toggleDrawer = function () {
                return oj.OffcanvasUtils.toggle({
                    selector: '#navDrawer',
                    modality: 'modal',
                    content: '#pageContent'
                });
            };

            self.closeDrawer = function () {
                return oj.OffcanvasUtils.close({
                    selector: '#navDrawer',
                    modality: 'modal',
                    content: '#pageContent'
                });
            };

            // Method for adjusting the content area top/bottom paddings to avoid overlap with any fixed regions. 
            // This method should be called whenever your fixed region height may change.  The application
            // can also adjust content paddings with css classes if the fixed region height is not changing between 
            // views.
            self.adjustContentPadding = function () {
                var topElem = document.getElementsByClassName('oj-applayout-fixed-top')[0];
                var contentElem = document.getElementsByClassName('oj-applayout-content')[0];
                var bottomElem = document.getElementsByClassName('oj-applayout-fixed-bottom')[0];

                if (topElem) {
                    contentElem.style.paddingTop = topElem.offsetHeight + 'px';
                }
                if (bottomElem) {
                    contentElem.style.paddingBottom = bottomElem.clientHeight + 'px';
                }
                // Add oj-complete marker class to signal that the content area can be unhidden.
                // See the override.css file to see when the content area is hidden.
                contentElem.classList.add('oj-complete');
            }


            self.goToPage = function (id) {
                self.router.go(id);
            };
            self.goToInventory = function() {
                self.router.go('inventory');
            }


            /***************************************************************
                                drill in and out animation
            ***************************************************************/
            var platform = oj.ThemeUtils.getThemeTargetPlatform();

            self.pendingAnimationType = null;

            self.mergeConfig = function(original) {
                return $.extend(true, {}, original, {
                    'animation': oj.ModuleAnimations.switcher(switcherCallback),
                    'cacheKey': self.router.currentValue()
                });
            }

            function switcherCallback(context) {
                return self.pendingAnimationType;
            }

            function positionFixedTopElems(position) {
                var topElems = document.getElementsByClassName('oj-applayout-fixed-top');

                for (var i = 0; i < topElems.length; i++) {
                    // Toggle between absolute and fixed positioning so we can animate the header.
                    // We don't need to adjust for scrolled content here becaues the animation utility
                    // moves the contents to a transitional div losing the scroll position
                    topElems[i].style.position = position;
                }
            }
            
            self.preDrill = function () {
                positionFixedTopElems('absolute');
            };

            self.postDrill = function () {
                positionFixedTopElems('fixed');
                self.pendingAnimationType = null;
            };




            
            /**** CANDIDATES FOR UTIL ***/
            self.doXHR = function(url, callback) {
				$.getJSON(url, function(response){             
				  if(response){
                      callback(response);                             
				  }
				}).fail(function (jqXHR, textStatus, errorThrown) {
                    console.log("error " + textStatus);
                    console.log("incoming Text " + jqXHR.responseText);
                });
            };
            self.setupUserInfo = function(userId) {
                var userInfo = {
                    userId: userId,
                    userName: 'John Dunbar',
                    userType: 'customer',
                    userRedirect: 'inventory'
                }

                if (userId.indexOf('jones') > -1) {
                    userInfo.userName = 'Lisa Jones';
                    userInfo.userType = 'customer';
                    userInfo.userRedirect = 'inventory';
                }

               self.userInfo(userInfo);
            };
            self.getUserNameForUserId = function(userId) {
                console.log("Getting name for id: " + userId);
                if (userId === self.userInfo().userId)
                    return self.userInfo().userName;
                else {
                    if (userId === 'john.dunbar01')
                        return 'John Dunbar';
                    else if (userId === 'lisa.jones01')
                        return 'Lisa Jones';
                    else
                        return userId;
                }
            }
            self.reset = function () {
            };
            
            self.sortArrayByName = function (observableArr) {
                var formatted = observableArr();

                // sort by name
                formatted.sort(function (a, b) {
                    return (a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0;
                });

                observableArr(formatted);

            };
            
            self.getInvoiceById = function(inv_id) {
                var invoice_detail = null;
                $.each(self.customer_invoce_data(), function (index, invoice) {
                    if (invoice && (invoice.id == inv_id))
                        invoice_detail = invoice;
                });

                return invoice_detail;
            };
            
            self.getProductById = function (prodId) {
                var product = null;
                $.each(self.inventory_data(), function (index, prod) {
                    if (prod && (prod.identifier == prodId))
                        product = prod;
                });

                return product;
            };
            
            
            /**** CANDIDATES FOR RELOCATION ***/
            
            self.getFutureDeliveryDate = function(dayInTheFuture) {
                var date = new Date();
                date.setDate(date.getDate() + dayInTheFuture);
                return date.toLocaleString("en-us", { month: "short" }) + ' ' + date.getDate()+', ' +  date.getFullYear();
            };
            self.executeCheckout = function(id, successCallBack) {
                console.log("Checking out item with it: " + id);
                console.log("Success callback: ");
                console.log(successCallBack);
                
				var baseUrl = mbe.mcs_config.mobileBackends.RNDC.baseUrl;
				var customPath = "/mobile/custom/RDHInventoryManagement/";
				var reqUrl =  baseUrl + customPath + "/updateInventoryQtyStatus";
                self.showLoadingBtn(id, 'Checking out ...');
                var data = {
                    "identifier" : id,
                    "status": "checkedout",
                    "userid": self.userInfo().userId
                }
                $.ajax({
                  url: reqUrl,
                  type: 'GET',
                  data: data,
                  success: successCallBack
                });
            }
            self.executeCheckIn = function(id, successCallBack) {
                console.log("Checking in item with it: " + id);
				var baseUrl = mbe.mcs_config.mobileBackends.RNDC.baseUrl;
				var customPath = "/mobile/custom/RDHInventoryManagement/";
				var reqUrl =  baseUrl + customPath + "/updateInventoryQtyStatus";
                self.showLoadingBtn(id, 'Checking in ...');
                var data = {
                    "identifier" : id,
                    "status": "available",
                    "userid": ""
                }
                $.ajax({
                  url: reqUrl,
                  type: 'GET',
                  data: data,
                  success: successCallBack
                });
            }
            self.showLoadingBtn = function(id, btnMsg) {
                var checkOutBtn = $('#checkoutBtn'+id);
                var loader = $('#loader'+id);
                if (checkOutBtn) {
                    checkOutBtn.text(btnMsg);
                    checkOutBtn.toggleClass('loading');
                    if (loader) {
                        loader.toggleClass('hide');
                        loader.toggleClass('loader');
                    }
                }
            }
            self.doneLoadingBtn = function(id) {
                var checkOutBtn = $('#checkoutBtn'+id);
                var loader = $('#loader'+id);
                if (checkOutBtn) {
                    checkOutBtn.text("Check In");
                    checkOutBtn.toggleClass('loading');
                    if (loader) {
                        loader.toggleClass('hide');
                        loader.toggleClass('loader');
                    }
                }
            }
            self.loadMBEInventoryData = function() {
                console.log("loading inventory from mbe");
				var baseUrl = mbe.mcs_config.mobileBackends.RNDC.baseUrl;
				var customPath = "/mobile/custom/RDHInventoryManagement";
				var reqUrl =  baseUrl + customPath + "/fetchAllInventory";
                console.log("url: " + reqUrl);
//				$.getJSON(self.invoices_mock_url, function(response){ 
				$.getJSON(reqUrl, function(response){   
                    console.log("success");          
				  if(response){        
                      console.log(response.items);
                      self.inventory_data(response.items);
                      self.sortArrayByName(self.inventory_data);
                      console.log("Inventory data loaded");
                      console.log(self.inventory_data());
				  }
				}).fail(function (jqXHR, textStatus, errorThrown) {
                    console.log("error " + textStatus);
                    console.log("incoming Text " + jqXHR.responseText);
                    self.loadLocalInventoryData();
                });
            }
            self.loadLocalInventoryData = function() {
                console.log("loading inventory");
                if (self.inventory_data().length > 0) {
                    //data is already loaded
                    console.log("data is already loaded");
                    return;
                }
                self.doXHR(self.inventory_url, function(response){
                    self.inventory_data(response);
                    self.sortArrayByName(self.inventory_data);
                });
                console.log("Inventory data loaded");
            }
            self.loadProductForId = function(id) {
                console.log("loading inventory from mbe");
				var baseUrl = mbe.mcs_config.mobileBackends.RNDC.baseUrl;
				var customPath = "/mobile/custom/RDHInventoryManagement";
				var reqUrl =  baseUrl + customPath + "/fetchInventoryById";	
                console.log("url: " + reqUrl);
                var data = {
                    "identifier" : id
                }
				$.getJSON(reqUrl, data, function(response){   
                    console.log("success");  
				  if(response){        
                      console.log(response);
                      self.product_detail_data(response.items[0]);
				  }
				}).fail(function (jqXHR, textStatus, errorThrown) {
                    console.log("error " + textStatus);
                    console.log("incoming Text " + jqXHR.responseText);
                    self.getProductById(id);
                });
            }
            self.loadMyCheckoutsData = function() {
                console.log("loading my checkouts data");
                self.doXHR(self.my_checkouts_url, function(response){
                    self.my_checkouts_data(response);
                    console.log("Data for my checkouts loaded");
                });
            };
            
            self.getFutureDeliveryDate = function(dayInTheFuture) {
                var date = new Date();
                date.setDate(date.getDate() + dayInTheFuture);
                return date.toLocaleString("en-us", { month: "short" }) + ' ' + date.getDate()+', ' +  date.getFullYear();
            };
            self.getCheckedOutItemById = function(id) {
                console.log("Getting checked out item details for id: " + id);
                var item_detail = null;
                $.each(self.my_checkouts_data(), function (index, item) {
                    if (item && (item.id == id))
                        item_detail = item;
                });

                return item_detail;
            };
            
        }

        return new ControllerViewModel();
    });
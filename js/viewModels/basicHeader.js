/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */

// header module viewModel

'use strict';  
define(['ojs/ojcore', 'knockout', 'jquery', 'appController','ojs/ojbutton'],
    function (oj, ko, $, app) {
    
      function basicHeaderVM(params) {
        var self = this;
        self.app = app;
          
        self.title = params.title || '';
        self.startBtn = params.startBtn;

        self.goToShoppingCart = function() {
            app.goToShoppingCart();
        };
      }
      return basicHeaderVM;
});

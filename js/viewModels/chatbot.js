/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
'use strict';
define(['ojs/ojcore',
    'jquery',
    'knockout',
    'wsService',
    'appController',
    'settings',
    'ojs/ojknockout',
    'ojs/ojarraytabledatasource',
    'ojs/ojinputtext',
    'ojs/ojtoolbar',
    'ojs/ojlistview'], function (oj, $, ko, ws, app, settings) {
    function chatTabConversationModel() {
        var self = this;
        self.dataSource = ko.observableArray([]);
        self.scrollElem = document.body;
        self.textValue = ko.observable();
        self.imageSrc = ko.observable();    

        var channel; //curretn channelId

        function scrolltoBottom(){
            try{
                setTimeout(function(){
                    var chat_div = $('body, #activityListView');
                    var scrollHeight = chat_div.get(0).scrollHeight;
                    var vdocHeight = $(window).height();
                    if( (scrollHeight - 115) > vdocHeight){
                        chat_div.scrollTop(scrollHeight);
                    }                                       
                 }, 500);                
            }catch(e){
                if(e && e.message){
                    console.warn("Scroll to bottom exception: "+e.message);
                }else{
                    console.warn("Scroll to bottom exception");
                }                
            }            
        }

        self.handleActivated = function (params) {           
            channel = settings.botChannel;

            processMessageData([]);
            ws.connect();
            ws.subscribe(channel, self.onMessage.bind(self));

        };

        // adjust content padding top
        self.handleAttached = function (info) {
            //app.appUtilities.adjustContentPadding();
        };

        self.handleBindingsApplied = function (info) {
            if (app.pendingAnimationType === 'navParent' || app.pendingAnimationType === 'navChild') {
                app.preDrill();
            }
        };

        self.onMessage = function (message) {
            message.id = "21";
            self.dataSource.add(message);
            scrolltoBottom();            
        };

        self.handleTransitionCompleted = function (info) {
            if (app.pendingAnimationType === 'navParent' || app.pendingAnimationType === 'navChild') {
                app.postDrill();
            }
        };

        // trigger click when selection changes
        self.selectHandler = function (event, ui) {
            if (ui.option === 'selection') {
                event.preventDefault();
                self.postActivity(ui.items[0].innerText);
            }
        };

        function processMessageData(messages) {
            self.dataSource = new oj.ArrayTableDataSource(messages, {idAttribute: "id"});
        }

        self.onEnter = function(d,e){

            console.log("on something !");
            if (e.keyCode == 13) {
                console.log("Enter is here!");
            }
        }

        self.postActivity = function (text) {

            if(!text || text.length === 0) return;

            var message = {
                "to": {
                    "id": channel,
                    "type": "bot"
                },
                "text": text
            };

            ws.sendMessage(message);

            message.id = "21";

            message.from = {
                "type": "self"
            };

            self.dataSource.add(message);
            scrolltoBottom();

            //stupid way to clear this value
            setTimeout(function(){ self.textValue(null); }, 10);
        }

        // settings for headers on incidents page
        self.chatHeaderSettings = {
            name: 'basicHeader',
            params: {
                title: 'Support',
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

    return chatTabConversationModel;
});

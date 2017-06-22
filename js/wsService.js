/**
 * Created by PMOGILEV on 1/4/17.
 */

'use strict';
define(['settings'], function (settings) {

    var socket;
    var loadedFlag;
    var timeout = 10000;
    var clearTimer = -1;
    var data = {};
    var subscribers = {};


    function handleErrors(sError, sURL, iLine) {
        return true;
    }

    function getSocketState() {
        return (socket != null) ? socket.readyState : 0;
    }

    function onMessage(e) {
        data = JSON.parse(e.data);
        for (var key in subscribers) {
            // key === "0CCC611E-7EF0-489B-BB5D-A6EF72AC4695" 
            if (subscribers.hasOwnProperty(key)) {
                subscribers[key](data);
            }
        }
        return data;
    }

    function sendMessage(message) {
        if (getSocketState() == 1) {
            console.log(socket.send(JSON.stringify(message)));
        }

    }

    function onError() {
        clearInterval(clearTimer);
        socket.onclose = function () {
            loadedFlag = false;
        };
        clearTimer = setInterval(connectWebSocket, timeout);
    }

    function onClose() {
        loadedFlag = false;
        clearInterval(clearTimer);
        clearTimer = setInterval(connectWebSocket, timeout);
    }

    function onOpen() {
        //clearInterval(clearTimer);
        console.log("open" + getSocketState());
    }

    function subscribe(key, fn) {
        subscribers[key] = fn;
    }

    function unsubscribe() {
        delete subscribers[key];
    }

    function connectWebSocket() {

        if ("WebSocket" in window) {
            if (getSocketState() === 1) {
                socket.onopen = onOpen;
                clearInterval(clearTimer);
                console.log(getSocketState());
            }
            else {
                try {
                    socket = new WebSocket(settings.wsUrl);
                    socket.onopen = onOpen;
                    socket.onmessage = function (e) {
                        onMessage(e);
                    };
                    socket.onerror = onError;
                    socket.onclose = onClose;
                }
                catch (exeption) {
                    console.log(exeption);
                }
            }
        }

    }

    function updateSettings(settings) {
        options.server = settings.server;
    }

    return {
        connect: connectWebSocket,
        onError: handleErrors,
        onClose: onClose,
        onMessage: onMessage,
        getSocketState: getSocketState,
        subscribe: subscribe,
        unsubscribe: unsubscribe,
        sendMessage: sendMessage,
        updateSettings: updateSettings
    };
});
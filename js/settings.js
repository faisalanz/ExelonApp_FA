/**
 * Created by PMOGILEV on 1/23/17.
 */

'use strict';
define([], function () {

    var user = {};

    var options = {
        server: '8866d3c9.ngrok.io', //'localhost:3000', d157ad3d.ngrok.io, 5d88888f.ngrok.io, 8866d3c9.ngrok.io
        route: '/chat/ws?user=',
        channel: '74155750-83B7-440B-A91B-A9DD92AF1881'//'0CCC611E-7EF0-489B-BB5D-A6EF72AC4695'
    };

    function setBaseUrl(url) {
        options.server = url;
    }

    var wsUrl = "ws://" + options.server + options.route + "user1";//JSON.stringify(user);
    var serverUrl = 'http://' + options.server + '/chat';
    var botChannel = options.channel;

    return {
        user: user,
        wsUrl: wsUrl,
        baseUrl: setBaseUrl,
        serverUrl: serverUrl,
        botChannel: botChannel
    };
});
/**
 * Created by JOSEVALDERLEI on 25/06/2015.
 */
(function () {
    "use strict";
angular
    .module('app',['appLogin','authService','ui.router','ngMaterial','ngMdIcons','ngCookies','pascalprecht.translate'])
        .config(function($httpProvider) {
            $httpProvider.interceptors.push('AuthInterceptor');
        });
})();



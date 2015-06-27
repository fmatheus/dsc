/**
 * Created by JOSEVALDERLEI on 25/06/2015.
 */

(function(){

'use strict';

angular.module('app')
    .config(routes);

function routes($stateProvider, $urlRouterProvider) {

    $stateProvider.state('init', {
        url: '/',
        templateUrl: 'views/pages/initpage.html',
        controller: 'loginController as vm'
        })
        .state('init.login', {
            url: 'login',
            views: {
                'content-tab': {
                    templateUrl: 'views/pages/userlogin.html',
                    controller: 'loginController as vm'
                }
            }
        })
        .state('init.signup', {
            url: 'signup',
               views: {
                'content-tab': {
                    templateUrl: 'views/pages/signup.html',
                    controller: 'signupController as vm'
                }
            }
        })
        .state('init.rescuepassword', {
            url: 'rescuepassword',
            views: {
                'content-tab': {
                    templateUrl: 'views/pages/rescuepassword.html',
                    controller: 'loginController as vm'
                }
            }
        })
        .state('appdsc', {
        url: '/appdsc',
        templateUrl: 'views/pages/appdsc.html',
        controller: 'menuController as vm'
        }).state('appdsc.loadproblem', {
            url: '/problem',
            views: {
                'appdsc-problem': {
                    templateUrl: 'views/pages/problemdescription.html'
                }
            }
        });
    $urlRouterProvider.otherwise('/login');
}

})();
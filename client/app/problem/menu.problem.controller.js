(function() {
    "use strict";

    angular
        .module('app')
        .controller('menuProblemController', menuProblemaController);
    function menuProblemaController(Auth, $state){

        var self = this;
        //self.openChat = buildToggler('chat');
        self.formAddCollaborators = formAddCollaborators;
        self.editDescriptionProblem = editDescriptionProblem;
        self.doLogout = doLogout;
        self.systemReturn = systemReturn;

        function systemReturn(){
            $state.go('startproblem');
        }


        function formAddCollaborators(){
            $state.go('problem.collaborators');
        }

        function editDescriptionProblem() {
            $state.go('problem.description');
        }

        function doLogout() {
            Auth.logout();
            $state.go('init.login');
        }

    }
})();
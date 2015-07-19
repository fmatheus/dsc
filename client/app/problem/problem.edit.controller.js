(function(){

"use strict";

    angular.module('app')
    .controller('editProblemController',editProblemaController);
editProblemaController.$injectre = ['$scope','Socket'];

function editProblemaController($scope, Socket, $timeout,toastApp,$window,problemService) {
    var self = this;
    var updateTrue = true;
    self.problem = "";

    self.tabs = ['problem.stakeholders','problem.evaluationframework','problem.semioticframework','problem.carf'];



    self.getCurrentProblem = function(){
        self.idProblem = $window.localStorage.getItem('problemid');
        problemService.getproblem(self.idProblem)
            .success(function(data) {
                if(data.success) {
                    self.problem = data.problem;
                }else{
                    toastApp.errorMessage(data.message);
                }
            })
    };

    var setUpdate = function(){
        updateTrue = true;
    };

    Socket.on('onAtualizarProblema', function (retorno) {
        console.log("=========================================================================retorno...." + retorno);
        self.problem.description = retorno.description;
        self.problem.update = updateTrue;
    });

    $scope.problemUpdate = function (problem) {
        problem.update = updateTrue;

        Socket.emit('atualizarProblema', problem);
        if (updateTrue) {
            updateTrue = false;
            $timeout(setUpdate, 2000);
        }
    };

    $scope.saveDescription = function (problem) {
        console.log("=============================================================================");
        problem.update = updateTrue;
        Socket.emit('atualizarProblema', problem);
    };

}
})();
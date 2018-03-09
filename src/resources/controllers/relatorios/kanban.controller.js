app.controller('dashboardController', ['$rootScope', '$scope', '$state', '$stateParams',"$interval","kanbanFactory", "Notify",
    function($rootScope, $scope, $state,$stateParams, $interval, kanbanFactory, Notify){

        $scope.kanban = {
            Verde: {
                qtdPacientes: 0,
                pacientes: []
            },
            Vermelho: {
                qtdPacientes: 0,
                pacientes: []
            },
            Amarelo: {
                qtdPacientes: 0,
                pacientes: []
            }
        }

        $scope.canOpenModal = false

        const openModalPaciente = (pacientes) =>{
            $state.go('classificacaoPacientes', {pacientes: pacientes});
            //Notify.openModal("templates/relatorios/modal-kanban.html", {pacientes: pacientes}, "95%")
        }

        const atualizaRegistrosInternacao = () =>{
            debugger;
            return kanbanFactory.atualizaRegistrosInternacao()
            .then(()=>{
                return getAllInternacoes()
            }).catch((err)=>{
                console.log(err)
            })
        }
        
        const getAllInternacoes = ()=> {
            $scope.canOpenModal = false
            return getRegistrosPorClassificação("Vermelho")
            .then(()=>{
                return getRegistrosPorClassificação("Amarelo")
            }).then(()=>{
                return getRegistrosPorClassificação("Verde")
            }).then(()=>{
                $scope.canOpenModal = true
            }).catch((err)=>{
                console.log(err)
            })
        }
        
        const getRegistrosPorClassificação = (classificacao) => {
            return kanbanFactory.getRegistrosPorClassificação(classificacao)
            .then((res)=>{
                $scope.kanban[classificacao].qtdPacientes = res.data.length;
                $scope.kanban[classificacao].pacientes = res.data;
            }).catch((err)=>{
                console.log(err)
            })
        }

        const getLocalDate = (data) =>{
            const res = new Date(data).toLocaleDateString();
            return res;
        }

        const init = () => {
            getAllInternacoes().then(()=>{
                $scope.canOpenModal = true
            })
            
            /*$interval(()=>{
                return getAllInternacoes()
            },20000)*/
        }

        const setAllPendencies = (pendencia) =>{
            var res = "Nenhuma Pendencia"
            if(pendencia.length){
                res = ""
                for(var i = 0 ; i < pendencia.length; i++){
                    res += "<div style='width: 100px;'>" + pendencia[i] +" </div>"
                }
            }

            return res;
        }

        $scope.init= init
        $scope.setAllPendencies= setAllPendencies
        $scope.getLocalDate= getLocalDate
        $scope.getAllInternacoes = getAllInternacoes
        $scope.openModalPaciente = openModalPaciente    
    }
])
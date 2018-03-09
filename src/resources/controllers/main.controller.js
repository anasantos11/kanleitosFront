app.controller('MainController', ['$rootScope', '$scope', '$state', '$firebaseAuth', function ($rootScope, $scope, $state, $firebaseAuth) {
    $scope.auth = $firebaseAuth();
    $scope.auth.$onAuthStateChanged(function (user) {
        if (user != null) {
            $scope.nomeUsuario = user.displayName;
            $scope.emailUsuario = user.email;
            isLogado = true;
            $state.go('kanleitos');
        }
    });


    $scope.sairAplicacao = function () {
        firebase.auth().signOut()
            .then(function () {
                $('#sairAppModal').modal('toggle');
                isLogado = false;
                $state.go('login');
            }).catch(function (error) {
                swal(
                    "Algum erro ocorreu, tente novamente!",
                    "",
                    error
                )
            });

    };

    /**
     * Adiciona template aos tooltips da página conforme view modifica
     */

    $scope.$on('$viewContentLoaded', function () {
        $('.kan-group [data-toggle="tooltip"]').tooltip({
            template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner kan-tooltip"></div></div>'
        });
    });

    /**
     * Fecha e expande o menu lateral ao clicar no botão no nav
     */
    $("#sidenavToggler").click(function (e) {
        e.stopImmediatePropagation();
        $("body").toggleClass("sidenav-toggled");
        $("#navbarResponsive").addClass("collapsed");
        $("#sideNavResponsive .sidenav-second-level, #sideNavResponsive .sidenav-third-level").removeClass("show");
    });

    /**
     * Expande lista do menu lateral quando o clica em algum item do menu que estava fechado
     */
    $("#sideNavResponsive .nav-link-collapse").click(function (e) {
        e.preventDefault();
        $("body").removeClass("sidenav-toggled");
    });

}]);


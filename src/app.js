// Initialize Firebase
var config = {
	apiKey: "AIzaSyB5CnszQphntRXBUpc8Kisk1_WqOJesaKo",
	authDomain: "kanleitos.firebaseapp.com",
	databaseURL: "https://kanleitos.firebaseio.com",
	projectId: "kanleitos",
	storageBucket: "kanleitos.appspot.com",
	messagingSenderId: "573530601324"
};
firebase.initializeApp(config);

var isLogado = false;

var app = angular.module("kanleitos", [
	'firebase',
	'ui.router',
	'angular-loading-bar',
	'ngAnimate',
	"ngDialog",
	"720kb.tooltips",
	"angularMoment"]);


app.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
	cfpLoadingBarProvider.includeSpinner = false;
}])




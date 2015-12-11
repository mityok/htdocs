var helloApp = angular.module("myApp", []);
	helloApp.controller("HelloCtrl", function($scope,$http) {
		$scope.something  = "Calvin Hobbes";
		$scope.gal=[];
$http.get('php/read_file.php').then(function (e){
$scope.gal = e.data.galleries;
readGallery($scope.gal[0]);
}, function (e){
alert(e);
});

function readGallery(url){
$http.get('php/read_gallery_html.php?url='+url).then(function (e){
alert( e.data[0]);
}, function (e){
alert('err',e);
});
}
	});
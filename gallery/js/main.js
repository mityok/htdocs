"use strict";
var helloApp = angular.module("myApp", []);
helloApp.controller("HelloCtrl", function($scope, $http) {
	$scope.main = ['http://www.', '.com/', '-mainfull.html'];
	$scope.gal = [];
	$scope.selected = 1;
	$scope.persistence = null;
	var enc = 'U2FsdGVkX1+CeGJv74HbdbZqoGNLhf9OP2OFjEArVxQ=';
	$scope.$watch('pass', function(newValue) {
		if (newValue && newValue.length == 8) {
			generateGalleries(newValue);
		}
	});

	function generateGalleries(pass) {
		var decrypted = CryptoJS.AES.decrypt(enc, pass).toString(CryptoJS.enc.Utf8);
		if (decrypted && decrypted.length > 0) {
			var arr = decrypted.split('-');
			var extra = arr[0].charAt(0) + arr[1].charAt(0);
			['', '2', '3', '4'].forEach(function(element) {
				$scope.gal.push($scope.main[0] + decrypted + element + $scope.main[1] + extra + $scope.main[2]);
			});
			readGallery($scope.gal[$scope.selected]);
			loadPersitency(pass);
		}
	}

	function loadPersitency(pass) {
		$http.get('data/persistence.json?rnd=' + Math.random()).then(function(e) {
			try {
				$scope.persistence = JSON.parse(CryptoJS.AES.decrypt(e.data.data, pass).toString(CryptoJS.enc.Utf8));
				console.log($scope.persistence);
			} catch (e) {
				$scope.persistence = [{
					excluded: []
				}, {
					excluded: []
				}, {
					excluded: []
				}, {
					excluded: []
				}];
			}
		}, function(e) {
			alert(e);
		});
	}
	$scope.readGallery = function(index) {
		$scope.selected = index;
		readGallery($scope.gal[$scope.selected]);
	};
	$scope.removeGallery = function(img) {
		var name = img.split('/').pop().replace('1.jpg', '');

		if (typeof $scope.persistence[$scope.selected].excluded === 'undefined') {
			$scope.persistence[$scope.selected].excluded = [name];
		} else {
			var pos = $scope.persistence[$scope.selected].excluded.indexOf(name);
			if (pos >= 0) {
				return;
			} else {
				$scope.persistence[$scope.selected].excluded.push(name);
			}
		}

		$http.post('php/persistence.php', {
			data: CryptoJS.AES.encrypt(JSON.stringify($scope.persistence), $scope.pass).toString()
		}).then(function(e) {
			console.log(e);
		}, function(e) {
			alert('err', e);
		});
	};

	function readGallery(url) {
		$scope.gallery = [];
		$http.get('php/read_gallery_html.php?url=' + url).then(function(e) {
			if (e.data && e.data.length > 0) {
				e.data.forEach(function(element) {
					$scope.gallery.push(url.split('/').slice(0, -1).join('/') + '/' + element + '1.jpg');
				});
			}
		}, function(e) {
			alert('err', e);
		});
	}
});
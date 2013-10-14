define(['_'], function(_) {

	var init = function($scope, Faces) {
		Faces.getRandom().success(function(face) {
			$scope.faceUrl = 'images/faces/' + face.photo;
			$scope.face = face;
  		});		
	}

	var FaceController = function($scope, Faces) {

		init($scope, Faces);

  		$scope.checkName = function() {
			Faces.checkName($scope.face, $scope.guess).success(function(resp) {
				$scope.result = resp.result;
				$scope.message = resp.message;
	  		});
  		}

	};
	return FaceController;
});
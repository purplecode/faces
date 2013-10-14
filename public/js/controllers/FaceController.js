define(['_'], function(_) {

	var init = function($scope, Faces) {
		Faces.getRandom().success(function(face) {
			$scope.faceUrl = 'images/faces/' + face.photo;
			$scope.face = face;
  		});
  		$scope.buttonText = 'Check!';
	}

	var FaceController = function($scope, Faces) {

		init($scope, Faces);

  		$scope.submit = function() {
  			if($scope.buttonText === 'Next') {
  				init($scope, Faces);
  			} else {
				Faces.checkName($scope.face, $scope.guess).success(function(resp) {
					$scope.result = resp.result;
					$scope.message = resp.message;
					$scope.buttonText = 'Next';
		  		});
  			}
  		}

	};
	return FaceController;
});
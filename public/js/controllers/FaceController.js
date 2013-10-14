define(['_'], function(_) {

	var setModel = function(model, $scope) {
		_.each(model, function(value, key) {
			$scope[key] = value;
		})
	}

	var init = function($scope, Faces) {
		Faces.getRandom().success(function(face) {
			setModel({
				faceUrl: 'images/faces/' + face.photo,
				face: face,
				buttonText: 'Check!',
				result: 'next',
				message: 'Gues who?'
			}, $scope);
  		});
	}

	var FaceController = function($scope, Faces) {

		init($scope, Faces);

  		$scope.submit = function() {
  			if($scope.buttonText === 'Next') {
  				init($scope, Faces);
  			} else {
				Faces.checkName($scope.face, $scope.guess).success(function(resp) {
					setModel({
						buttonText: 'Next',
						result: resp.result,
						message: resp.message
					}, $scope);
		  		});
  			}
  		}

	};
	return FaceController;
});
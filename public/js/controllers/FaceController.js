define(['_'], function(_) {

	var setModel = function(model, $scope) {
		_.each(model, function(value, key) {
			$scope[key] = value;
		})
	}

	var init = function($scope, Faces) {
		Faces.getRandom().success(function(face) {
			setModel({
				faceImg: 'data:image/gif;base64,' + face.photo,
				face: face,
				buttonText: 'Check!',
				status: 'next',
				message: 'Gues who?',
				guess: ''
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
						status: resp.status,
						message: resp.message
					}, $scope);
		  		});
  			}
  		}

	};
	return FaceController;
});
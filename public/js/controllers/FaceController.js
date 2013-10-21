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
				guess: '',
				trial: 1,
				hint: ''
			}, $scope);
  		});
	}

	var processResponse = function($scope, resp) {
		if(resp.status === 'wrong' && $scope.trial < 3) {
			setModel({
				buttonText: 'Repeat',
				status: resp.status,
				message: resp.message,
				hint: resp.hint,
				trial: $scope.trial+1
			}, $scope);
		} else {
			setModel({
				buttonText: 'Next',
				status: resp.status,
				message: resp.message
			}, $scope);
		}
	}

	var FaceController = function($scope, Faces) {

		init($scope, Faces);

  		$scope.submit = function() {
  			if($scope.buttonText === 'Next') {
  				init($scope, Faces);
  			} else {
				Faces.checkName($scope.face, $scope.guess, $scope.trial).success(function(resp) {
					processResponse($scope, resp);
		  		});
  			}
  		}

	};
	return FaceController;
});
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
				face: face.face,
				initing: false,
				isFinished: false,
				status: 'next',
				guess: '',
				hint: '',
				trial: 1
			}, $scope);
  		});
	}

	var getFinalHint = function($scope, status) {
		if (status === 'partial') {
			return 'Almost correct. You wrote: ' + $scope.guess;
		} else if (status === 'wrong') {
			return 'Wrong. You wrote: ' + $scope.guess;
		}
		return '';
	};

	var FaceController = function($scope, $timeout, Faces) {
		$scope.guessMode = 'name';


		var nextTimeout = function(count) {
			if (!$scope.isFinished) {
				return;
			}
			$scope.nextTimeout = count;
			if (count === 0) {
				$scope.next();
			} else {
				$timeout(function(){
					nextTimeout(count - 1);
				}, 1200);
			}
		};


		var processResponse = function(resp) {
			if(resp.status === 'wrong' && $scope.trial < 3) {
				setModel({
					status: resp.status,
					hint: resp.hint,
					trial: $scope.trial+1
				}, $scope);
			} else {
				setModel({
					status: resp.status,
					message: '',
					hint: getFinalHint($scope, resp.status),
					face: resp.face,
					isFinished: true
				}, $scope);
				nextTimeout(5);
			}
		};

		$scope.keypress = function() {
			console.log(arguments);
		};

		$scope.next = function() {
			//don trigger that multiple times
			if ($scope.initing) {
				return;
			}
			$scope.initing = true;
			init($scope, Faces);
		};

		$scope.next();

		$scope.submit = function() {
			Faces.checkName($scope.face, $scope.guess, $scope.trial).success(function(resp) {
				processResponse(resp);
	  	});
		};
	};
	return FaceController;
});
define(['_'], function(_) {

	var setModel = function(model, $scope) {
		_.each(model, function(value, key) {
			$scope[key] = value;
		});
	};

	var init = function($scope, Faces, GuessModes) {
		Faces.getRandom().success(function(face) {
			setModel({
				faceImg: 'data:image/gif;base64,' + face.photo,
				face: face.face,
				initing: false,
				guessMode: face.mode,
				isFinished: false
			}, $scope);

			// Initialize guessmode
			guessMode = GuessModes.getMode(face.mode, $scope);
			guessMode.init(face.extras);
		});
	};

	var guessMode = null;

	var FaceController = function($scope, $timeout, Faces, GuessModes) {

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

		$scope.next = function() {
			//don trigger that multiple times
			if ($scope.initing) {
				return;
			}
			$scope.initing = true;
			init($scope, Faces, GuessModes);
		};

		$scope.next();

		$scope.submit = function(ev, data) {
			if (ev) {
				ev.preventDefault();
			}

			Faces.checkName($scope.face, guessMode.name, guessMode.getSubmitData(data)).success(function(resp) {
				setModel({
					status: resp.status
				}, $scope);

				if (guessMode.isFinished(resp)) {
					setModel({
						isFinished: true,
						face: resp.face
					}, $scope);
					nextTimeout(5);
				}
			});
			return false;
		};
	};
	return FaceController;
});
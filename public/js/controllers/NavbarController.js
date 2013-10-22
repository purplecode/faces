define(['_'], function(_) {

  var NavbarController = function($scope, Faces) {
    Faces.getPopular().then(function(popular){
      $scope.popularFaces = popular.data;
    });
  };
  return NavbarController;
});
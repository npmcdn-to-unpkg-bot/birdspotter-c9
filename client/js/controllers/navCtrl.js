/* global app*/
app.controller('navCtrl', function($scope, auth, store, $location, $state){
    $scope.auth = auth;
    $scope.authenticated = auth.isAuthenticated;
    
    $scope.isActive = function(destination){
        return destination === $location.path();
    }
    
    $scope.login = function doAuth() {
      auth.signin({
        authParams: {
          scope: 'openid offline_access',
          device: 'Mobile device'
        }
      }, function(profile, token, accessToken, state, refreshToken) {
        // Success callback


        //Store the status in the scope 
        $scope.isAuthenticated = auth.isAuthenticated
        store.set('profile', profile);
        store.set('token', token);
        store.set('refreshToken', refreshToken);
        $location.path('/');
      }, function(error) {
        console.log("There was an error logging in", error);
      });
    };
    
    $scope.logout = function() {
        auth.signout();
        $scope.isAuthenticated = false;
        store.remove('token');
        store.remove('profile');
        store.remove('refreshToken');
        auth.isAuthenticated = false;
        $location.path('/');
    };
});
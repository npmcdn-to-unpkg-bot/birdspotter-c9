/* global app */

app.factory('captureApi', ['$http', function($http){
    
    var urlBase = 'https://birdspotter-cedricbongaerts.c9users.io/api/captures';
    
    return {
        getAllCaptures : function () {
            return $http.get(urlBase);
        },
        
        insertCapture : function(data) {
            return $http.post(urlBase, data);
        },
        
        findCapture : function(id) {
            console.log(id);
            return $http.get(urlBase + '/' + id);
        }
    };
}]);
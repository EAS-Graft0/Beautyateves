angular.module('webApp').controller('ordersCtrl', ['$scope', '$http', function($scope, $http) {
    window.ordersCtrlScope = $scope
    $scope.activeView = 'pre';
    $scope.setActive = function(targ) {
        $scope.activeView = targ;
    };
    $scope.fromDate = new Date()
    $scope.toDate = new Date()
$scope.data = {}
    $scope.mealNames = {};
    $scope.today = new Date();

    $scope.filterDates = () => {
        $scope.getData($scope.fromDate, $scope.toDate);
    }

    
    
    $scope.getData = (fromDate, toDate) => {
        fromDate = fromDate.toISOString().substring(0, 10)
        toDate = toDate.toISOString().substring(0, 10)
        $http.get('/api/getDeliveryIngredients?fromDate=' + fromDate + '&toDate=' + toDate).then((res) => {
            $scope.data.orderData = res.data
            for(order in $scope.data.orderData.orders){
                if($scope.data.orderData.orders[order].delivery_address.indexOf('{') != -1){
                    $scope.data.orderData.orders[order].delivery_address = JSON.parse($scope.data.orderData.orders[order].delivery_address)
                }
            }
        })
    }

    $scope.getData(new Date(), new Date())




    // $scope.getMeals();

    // $scope.meals[$]

}])
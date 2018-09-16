angular.module('beautyatevesApp')
    .controller('BookingsCtrl', function($scope, $http) {
        $scope.getBookings = function(id) {
            $http.get("http://localhost:86/api/getBookings?staffID=" + id).then(function(response) {
                console.log($scope.bookings)
                response.data.push(response.data[0], response.data[0], response.data[0], response.data[0], response.data[0], response.data[0], response.data[0], response.data[0], response.data[0], response.data[0], response.data[0], response.data[0], response.data[0], response.data[0], response.data[0], response.data[0], response.data[0], response.data[0], response.data[0], response.data[0], response.data[0], response.data[0])
                $scope.bookings = response.data
                console.log($scope.bookings)
            })
        }
        $scope.week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        $scope.days = []

        // 
        // set day month and year as todays
        // 
        // 
        // 
        // 

        $scope.getDaysInMonth = (month, year) => {
            var date = new Date(year, month, 1);
            var days = [];
            while (date.getMonth() === month) {
                days.push(new Date(date));
                date.setDate(date.getDate() + 1);
            }
            $scope.days = days
            $scope.first = $scope.days[0].getDay()
            console.log(days)

        }

        $scope.getNumber = function(num) {
            return new Array(num);
        }
        $scope.selectYear = (year) => {
            console.log(year)
        }

        $scope.getDaysInMonth(5, 2018)

        // $scope.selectedYear = function(value) {
        //     $scope.selectedYearValue = value; // 2011
        //     console.log($scope.selectedYearValue)
        // }

        // //get days and date from  a month and year
        // $scope.getDaysArray = function(month) { // month count is 2   
        //     var days = getDaysInMonth(month, $scope.selectedYearValue)
        //     console.log('days')
        //     console.log(days)
        //     var names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        //     var date = new Date($scope.selectedYearValue, month - 1, 1);
        //     var result = []
        //     $scope.DayAndDate = [];
        //     while (date.getMonth() == month - 1) {
        //         result.push({
        //             "Date": date.getDate(),
        //             "Day": names[date.getDay()]
        //         });
        //         $scope.DayAndDate.setDate(date.getDate() + 1);
        //     }
        // }


    });
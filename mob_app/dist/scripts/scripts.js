angular.module('mobApp').controller('checkoutCtrl', ['$state', '$scope', '$stateParams', '$ionicPopup', '$ionicModal', '$ionicHistory', '$http', function($state, $scope, $stateParams, $ionicPopup, $ionicModal, $ionicHistory, $http) {
    window.checkoutCtrlScope = $scope;


    /*STRIPE*/
    $scope.data.multiplier = 1
        if ($scope.data.planLength == 'month_price') {
            $scope.data.multiplier = 4
        }
        // Create a Stripe client.
        if($scope.data.deliveryType != "collection"){
            $scope.data.totalPayment = ($scope.data.plans[$scope.data.mealPlan.planIndex][$scope.data.planLength] + ($scope.data.mealPlan.extraCost*$scope.data.multiplier) + (($scope.data.deliveryCharge*parseInt($scope.data.deliveries)) * $scope.data.multiplier ))
        }
        else{
            $scope.data.totalPayment = ($scope.data.plans[$scope.data.mealPlan.planIndex][$scope.data.planLength] + ($scope.data.mealPlan.extraCost*$scope.data.multiplier))
        }
    /* STRIPE TOKEN HANDLER */

    function stripeTokenHandler(token) {
        // Insert the token ID into the form so it gets submitted to the server
        var form = document.getElementById('payment-form');
        var hiddenInput = document.createElement('input');
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', 'stripeToken');
        hiddenInput.setAttribute('value', token.id);
        form.appendChild(hiddenInput);
        let data = {
            token: token.id,
            mealData: $scope.data
        }
        if (window.plansCtrlScope.data.mealPlan.days[0].length == 0) {
            data.mealData.mealPlanArray = [];
            for (let i in data.mealData.mealPlan.days) {
                data.mealData.mealPlanArray.push({
                    meals: data.mealData.mealPlan.days[i].meals
                })
            }
            data.mealData.mealPlan.days = data.mealData.mealPlanArray;
            delete data.mealData.mealPlanArray;
        }
        $http.post("/api/placeOrder", data).then((res) => {
            if (res.data == 'Order Complete') {
                $scope.showReceipt()
            } else {
                $scope.error = "Payment Failed"
            }
        });
        // Submit the form;
        // form.submit();
    }

    /* STRIPE TOKEN HANDLER */

    $scope.showReceipt = function() {
        $ionicModal.fromTemplateUrl('builder/receipt.html', {
            scope: $scope,
            animation: 'slide-in-left'
        }).then(function(modal) {
            $scope.modals.receiptModal = modal;
            $scope.modals.receiptModal.show();
        });
    }

    $scope.payWithVoucher = () => {
        let data = {
            mealData: $scope.data
        }
        if (window.plansCtrlScope.data.mealPlan.days[0].length == 0) {
            data.mealData.mealPlanArray = [];
            for (let i in data.mealData.mealPlan.days) {
                data.mealData.mealPlanArray.push({
                    meals: data.mealData.mealPlan.days[i].meals
                })
            }
            data.mealData.mealPlan.days = data.mealData.mealPlanArray;
            delete data.mealData.mealPlanArray;
        }
        $http.post('api/placeOrderVoucher', data).then((res) => {
            if (res.data == 'Order Complete') {
                $scope.showReceipt()
            } else {
                $scope.error = "Payment Failed"
            }
        })
    }


    /* PAYMENTS CODE */
    $scope.loadStripe = () => {

        /* CARD DETAILS FORM */
        
        var stripe = Stripe('pk_test_iiNVHDaO61Nw0Nenoe4XS3BH');

        // Create an instance of Elements.
        var elements = stripe.elements({
            locale: 'auto'
        });

        // Custom styling can be passed to options when creating an Element.
        // (Note that this demo uses a wider set of styles than the guide below.)
        var style = {
            base: {
                color: '#32325d',
                lineHeight: '18px',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#aab7c4'
                }
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a'
            }
        };

        // Create an instance of the card Element.
        var card = elements.create('card', {
            style: style
        });

        // Add an instance of the card Element into the `card-element` <div>.
        card.mount('#card-element');

        // Handle real-time validation errors from the card Element.
        card.addEventListener('change', function(event) {
            var displayError = document.getElementById('card-errors');
            if (event.error) {
                displayError.textContent = event.error.message;
            } else {
                displayError.textContent = '';
            }
        });



        // Handle form submission.
        var form = document.getElementById('payment-form');
        form.addEventListener('submit', function(event) {
            console.log('event')
            console.log(event)
            event.preventDefault();

            stripe.createToken(card).then(function(result) {
                console.log('result from create token')
                console.log(result)
                if (result.error) {
                    // Inform the user if there was an error.
                    var errorElement = document.getElementById('card-errors');
                    errorElement.textContent = result.error.message;
                } else {
                    // Send the token to your server.
                    $scope.cardInfo = result;
                    stripeTokenHandler(result.token);

                }
            });
        });

        /* CARD DETAILS FORM */


        /* APPLY PAY CODE */
        var paymentRequest = stripe.paymentRequest({
            country: 'GB',
            currency: 'gbp',
            total: {
                label: 'Plan Total',
                amount: ($scope.data.totalPayment*100),
            },
            requestPayerName: true,
            requestPayerEmail: true,
        });

        var elements = stripe.elements();
        var prButton = elements.create('paymentRequestButton', {
            paymentRequest: paymentRequest,
        });

        // Check the availability of the Payment Request API first.
        paymentRequest.canMakePayment().then(function(result) {
            console.log('result')
            console.log(result)
                // if (result) {
            prButton.mount('#payment-request-button');
            // } else {
            // document.getElementById('payment-request-button').style.display = 'none';
            // }
        });
        /* APPLY PAY CODE */

    }

    setTimeout(function() {
        $scope.loadStripe()
    }, 500)


    /* PAYMENTS CODE */

    /*STRIPE*/


}]);
angular.module('mobApp').controller('contactCtrl', ['$state', '$scope', '$stateParams', '$ionicPopup', '$ionicModal', '$ionicHistory', '$http', function($state, $scope, $stateParams, $ionicPopup, $ionicModal, $ionicHistory, $http) {
    // window.contact.CtrlScope = $scope;

    $scope.sendMessage = (name, email, message) => {
        if (validateEmail(email)) {
            $http.post('/api/sendMessage', {
                name: name,
                email: email,
                message: message
            }).then((res) => {
                $scope.messageResponse = res.data;
            })
        } else {
        	$scope.messageResponse = 'Invalid Email';
        }
    }

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

}])
angular.module("mobApp").config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('app.contact', {
        url: "/contact",
        views: {
            'menuContent': {
                templateUrl: "contact/contact.html",
                controller: 'contactCtrl'
            }
        }
    })
})
angular.module('mobApp').factory('CustomPlanSvc', ['$http', '$q', function($http, $q) {
    return {
        generatePlan: function generatePlan(bmr,goal,ingredients) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/generatePlan?bmr=' + bmr+'&goal='+goal+'&ingredients='+ingredients,
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            }).then(function(res) {
                deferred.resolve(res.data)
            }, function(res) {
                deferred.resolve(res.data)
            })
            return deferred.promise;
        }
    }
}])

angular.module('mobApp').factory('DataSvc', ['$http', '$q', function($http, $q) {
    return {
        getPlans: function getPlans() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/getPlans',
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            }).then(function(res) {
                deferred.resolve(res.data)
            }, function(res) {
                deferred.resolve(res.data)
            })
            return deferred.promise;
        },

        getMeals: function getMeals() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/getMeals',
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            }).then(function(res) {
                deferred.resolve(res.data)
            }, function(res) {
                deferred.resolve(res.data)
            })
            return deferred.promise;
        },

        getAllergies: function getAllergies() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/getAllergies',
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            }).then(function(res) {
                deferred.resolve(res.data)
            }, function(res) {
                deferred.resolve(res.data)
            })
            return deferred.promise;
        },

        getShakes: function getShakes() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/getShakes',
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            }).then(function(res) {
                deferred.resolve(res.data)
            }, function(res) {
                deferred.resolve(res.data)
            })
            return deferred.promise;
        },

        getSnacks: function getSnacks() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/getSnacks',
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            }).then(function(res) {
                deferred.resolve(res.data)
            }, function(res) {
                deferred.resolve(res.data)
            })
            return deferred.promise;
        },

        getIngredients: function getIngredients() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/getIngredients',
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            }).then(function(res) {
                deferred.resolve(res.data)
            }, function(res) {
                deferred.resolve(res.data)
            })
            return deferred.promise;
        },

        getMealIngredients: function getMealIngredients() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/getMealIngredients',
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            }).then(function(res) {
                deferred.resolve(res.data)
            }, function(res) {
                deferred.resolve(res.data)
            })
            return deferred.promise;
        },

        getAllergyIngredients: function getAllergyIngredients() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/getAllergyIngredients',
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            }).then(function(res) {
                deferred.resolve(res.data)
            }, function(res) {
                deferred.resolve(res.data)
            })
            return deferred.promise;
        },

        getMealNutrition: function getMealNutrition() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/getMealNutrition',
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            }).then(function(res) {
                deferred.resolve(res.data)
            }, function(res) {
                deferred.resolve(res.data)
            })
            return deferred.promise;
        },

        addProject: function addProject(body) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: '/api/addProject',
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                data: JSON.stringify(body)
            }).then(function(res) {
                deferred.resolve(res.data)
            }, function(res) {
                deferred.resolve(res.data)
            })
            return deferred.promise;
        }
    }
}])

angular.module('mobApp').controller('sidemenuCtrl',["$state", "$scope","$ionicModal","$ionicPopup", function ($state, $scope, $ionicModal, $ionicPopup) {

  $scope.modals = {};
  $scope.showPopup = function() {
    $scope.alertPopup = $ionicPopup.alert({
      title: 'Phone',
      template: '075 8741 2891',
      cssClass: 'contactPopup'
    })
  }

  $scope.showAbout = function () {
  $ionicModal.fromTemplateUrl('builder/about_modal.html', {
      scope: $scope
      ,animation: 'slide-in-left'
    }).then(function (modal) {
      $scope.modals.aboutModal = modal;
      $scope.modals.aboutModal.show();
    });
  }

  $scope.showTerms = function () {
  $ionicModal.fromTemplateUrl('builder/terms_modal.html', {
      scope: $scope
      , animation: 'slide-in-left'
    }).then(function (modal) {
      $scope.modals.termModal = modal;
      $scope.modals.termModal.show();
    });
  }

  $scope.showContact = function () {
  $ionicModal.fromTemplateUrl('builder/contact_modal.html', {
    scope: $scope
    , animation: 'slide-in-left'
  }).then(function (modal) {
    $scope.modals.contactModal = modal;
    $scope.modals.contactModal.show();
    });
  }

  $scope.showKitchen = function () {
  $ionicModal.fromTemplateUrl('builder/kitchen_modal.html', {
    scope: $scope
    , animation: 'slide-in-left'
  }).then(function (modal) {
    $scope.modals.kitchenModal = modal;
    $scope.modals.kitchenModal.show();
  });
  }
}])

angular.module('mobApp').controller('homeCtrl', ['$state', '$scope', '$stateParams', '$ionicPopup', '$ionicModal', '$ionicHistory', function ($state, $scope, $stateParams, $ionicPopup, $ionicModal, $ionicHistory) {
    window.homeCtrlScope = $scope;
}])
angular.module("mobApp").config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('app.home', {
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'home/home.html',
                controller: 'homeCtrl'
            }
        }
    })
})
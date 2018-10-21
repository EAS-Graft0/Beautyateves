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
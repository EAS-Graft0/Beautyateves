angular.module('webApp').controller('loginCtrl', ['$scope', '$http', 'SessionService', '$window', '$rootScope', function($scope, $http, SessionService, $window, $rootScope) {
    window.loginCtrlScope = $scope
    $scope.login = ($event, email, password) => {
        if ($event.keyCode == 13) {
            SessionService.login({
                "username": email,
                "password": password
            }).then((loginResult) => {
                if (!loginResult.error) {
                    window.sessionStorage.token = loginResult.token;
                    // deferred.resolve(loginResult);
                    // $rootScope.login = false;
                    $window.location.href = $rootScope.targetPage
                } else {
                    alert(loginResult.error)
                }
            })
        } else if ($event.type == 'click') {
            SessionService.login({
                "username": email,
                "password": password
            }).then((loginResult) => {
                // console.log(loginResult);
                if (!loginResult.error) {
                    window.sessionStorage.token = loginResult.token;
                    // deferred.resolve(loginResult);
                    // $rootScope.login = false;
                    $window.location.href = loginResult.location
                } else {
                    alert(loginResult.error)
                }
            })
        }
    }
}])
angular.module("webApp").config(["$routeProvider", function(routeProv) {
    routeProv.when("/login", {
        title: "login",
        templateUrl: "login/login.html",
        controller: "loginCtrl"
    })
}])
angular.module('webApp').controller('adminCtrl', ['$scope', '$http', 'DataSvc', 'SessionService', function($scope, $http, DataSvc, SessionService) {
    window.homeCtrlScope = $scope;
    //global vars
    $scope.activeView = 'ing';
    $scope.showAvailableIngredientsSelector = false;
    $scope.activeModal = {};
    $scope.meals = [];
    $scope.availableIngredients = [];

    $scope.loading = true;
    //end global vars
    DataSvc.deleteMeal(0).then(mealData => {




        // var selectedFile = document.getElementById('input').files[0];
        // console.log($scope.files)
        // var inputElement = document.getElementById("something");
        // console.log(inputElement)
        // inputElement.addEventListener("change", handleFiles, false);

        // function handleFiles() {
        //     var fileList = this.files; /* now you can work with the file list */
        //     console.log(fileList)
        // }

        $scope.uploadme;

        $scope.uploadImage = function() {
            var fd = new FormData();
            var imgBlob = dataURItoBlob($scope.uploadme);
            fd.append('file', imgBlob);
            $http.post(
                    'imageURL',
                    fd, {
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': undefined
                        }
                    }
                )
                .success(function(response) {
                    console.log('success', response);
                })
                .error(function(response) {
                    console.log('error', response);
                });
        }


        //you need this function to convert the dataURI
        function dataURItoBlob(dataURI) {
            console.log('dataURI')
            console.log(dataURI)
            console.log('dataURI')
            console.log('ATOB')
            console.log(atob(dataURI))
            console.log('ATOB')
            var binary = atob(dataURI.split(',')[1]);
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            var array = [];
            for (var i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            return new Blob([new Uint8Array(array)], {
                type: mimeString
            });
        }


        // $scope.previewFile = () => {
        //     var file = document.querySelector('input[type=file]').files[0];
        //     console.log(file)

        //     var formData = new FormData();
        //     var imgBlob = dataURItoBlob(file);
        //     formData.append("fileToUpload", imgBlob);

        //     $http.post('/api/uploadImage', file).then((res) => {
        //         console.log(res)
        //     })
        // }

        // $scope.previewFile()

        //fetch data
        DataSvc.getMeals().then(mealData => {
            $scope.meals = mealData;
            DataSvc.getShakes().then(shakeData => {
                $scope.shakes = shakeData;
                DataSvc.getSnacks().then(snackData => {
                    $scope.snacks = snackData;
                    DataSvc.getVouchers().then(voucherData => {
                        $scope.vouchers = voucherData;
                        DataSvc.getIngredients().then(ingData => {

                            for (ing in ingData) {
                                ingData[ing].allergens = JSON.parse(JSON.stringify(JSON.parse(ingData[ing].allergens)))
                                // console.log(typeof ingData[ing].allergens)

                                ingData[ing].amountGrams = ingData[ing].amount * ingData[ing].measurement
                            }
                            $scope.ingredients = ingData;
                            DataSvc.getAllergens().then(allergData => {
                                $scope.allergens = allergData;
                                DataSvc.getPlans().then(planData => {
                                    $scope.plans = planData;
                                    $scope.loading = false;
                                });
                            });
                        });
                    });
                });
            });
        });
        // end fetch data

        var isNew = function(targ) {
            if (targ.id) {
                return false;
            } else {
                return true;
            }
        }

        $scope.setActive = function(targ) {
            $scope.activeView = targ;
        };

        $scope.closeModal = function() {
            $scope.activeModal = {};
        }


        // SessionService.login({ username: "admin", password: "password" }).then(function(result) {
        //     console.log(result)         // })

        // meals
        $scope.editMeal = function(mealDa) {
            var meal = mealDa

            var total = {};
            total.k = 0;
            total.c = 0;
            total.p = 0;
            total.f = 0;
            total.s = 0;
            total.volume = 0;

            for (ingredient in meal.ingredients) {

                if (meal.ingredients[ingredient].amountGrams) {
                    meal.ingredients[ingredient].amount = (meal.ingredients[ingredient].amountGrams / meal.ingredients[ingredient].measurement)
                }

                meal.ingredients[ingredient].amountGrams = meal.ingredients[ingredient].amount * meal.ingredients[ingredient].measurement

                total.k += (meal.ingredients[ingredient].k * meal.ingredients[ingredient].amount)
                total.c += (meal.ingredients[ingredient].c * meal.ingredients[ingredient].amount)
                total.p += (meal.ingredients[ingredient].p * meal.ingredients[ingredient].amount)
                total.f += (meal.ingredients[ingredient].f * meal.ingredients[ingredient].amount)
                total.s += (meal.ingredients[ingredient].s * meal.ingredients[ingredient].amount)
                total.volume += (meal.ingredients[ingredient].volume * meal.ingredients[ingredient].amount)
            }

            total.k = total.k.toFixed(0);
            total.c = total.c.toFixed(0);
            total.p = total.p.toFixed(0);
            total.f = total.f.toFixed(0);
            total.s = total.s.toFixed(0);
            total.volume = total.volume.toFixed(0);
            meal.total = total;
            $scope.activeModal.type = 'edit_meal';
            $scope.activeModal.data = meal;
        };

        $scope.addMeal = function() {
            $scope.meals.push({
                "name": "Enter a Name",
                "img": "",
                "description": "Enter the description for the meal.",
                "premium_price": 0,
                "individual_price": 0,
                "ingredients": []
            })
            $scope.editMeal($scope.meals[$scope.meals.length - 1])
        }

        $scope.displayAvailableIngredients = function() {
            $scope.availableIngredients = $scope.ingredients;
            for (ingredient in $scope.availableIngredients) {
                if (!$scope.availableIngredients[ingredient].id) {
                    $scope.availableIngredients.splice(ingredient, 1)
                }
            }
            for (ingredient in $scope.activeModal.data.ingredients) {
                if ($scope.availableIngredients.find(vendor => vendor['name'] === $scope.activeModal.data.ingredients[ingredient].name)) {
                    $scope.availableIngredients.splice($scope.availableIngredients.find(vendor => vendor['name'] === $scope.activeModal.data.ingredients[ingredient].name), 1)
                    // console.log('here', )
                }
            }
            $scope.showAvailableIngredientsSelector = true;
        }

        $scope.addMealIngredient = function(ingredient) {
            ingredient.amount = 1;
            // ingredient.id = ingredient.ingredient_id;

            $scope.activeModal.data.ingredients.push(ingredient)
            $scope.editMeal($scope.activeModal.data)
            $scope.showAvailableIngredients
            $scope.showAvailableIngredientsSelector = false;

        }
        $scope.removeIngredient = function(ing) {
            $scope.activeModal.data.ingredients.splice($scope.activeModal.data.ingredients.indexOf(ing), 1)
        }

        $scope.saveMeal = function(meal) {
            $scope.loading = true;
            for (ingredient in meal.ingredients) {
                if (!meal.ingredients[ingredient].id) {
                    meal.ingredients[ingredient].id = meal.ingredients[ingredient].ingredient_id
                }

            }
            if (isNew(meal)) {
                // console.log('new')
                DataSvc.addMeal(meal).then(function(ress) {
                    $scope.meals = []
                    DataSvc.getMeals().then(mealData => {
                        $scope.meals = mealData;
                        $scope.closeModal()
                        $scope.loading = false;
                    });
                })
            } else {
                DataSvc.updateMeal(meal).then(function(ress) {
                    $scope.meals = []
                    DataSvc.getMeals().then(mealData => {
                        $scope.meals = mealData;
                        $scope.closeModal()
                        $scope.loading = false;
                    });
                })
            }
        }

        $scope.deleteMeal = function(meal) {
            $scope.loading = true;
            DataSvc.deleteMeal(meal.id).then(function() {
                $scope.meals = []
                DataSvc.getMeals().then(mealData => {
                    $scope.meals = mealData;
                    $scope.closeModal()
                    $scope.loading = false;
                });
            })
        }

        // end meals




        // shakes

        $scope.editShake = function(shakeDa) {
            var shake = shakeDa

            var total = {};
            total.k = 0;
            total.c = 0;
            total.p = 0;
            total.f = 0;
            total.s = 0;
            total.volume = 0;

            for (ingredient in shake.ingredients) {

                if (shake.ingredients[ingredient].amountGrams) {
                    shake.ingredients[ingredient].amount = (shake.ingredients[ingredient].amountGrams / shake.ingredients[ingredient].measurement)
                }

                shake.ingredients[ingredient].amountGrams = shake.ingredients[ingredient].amount * shake.ingredients[ingredient].measurement

                total.k += (shake.ingredients[ingredient].k * shake.ingredients[ingredient].amount)
                total.c += (shake.ingredients[ingredient].c * shake.ingredients[ingredient].amount)
                total.p += (shake.ingredients[ingredient].p * shake.ingredients[ingredient].amount)
                total.f += (shake.ingredients[ingredient].f * shake.ingredients[ingredient].amount)
                total.s += (shake.ingredients[ingredient].s * shake.ingredients[ingredient].amount)
                total.volume += (shake.ingredients[ingredient].volume * shake.ingredients[ingredient].amount)
            }

            total.k = total.k.toFixed(0);
            total.c = total.c.toFixed(0);
            total.p = total.p.toFixed(0);
            total.f = total.f.toFixed(0);
            total.s = total.s.toFixed(0);
            total.volume = total.volume.toFixed(0);
            shake.total = total;
            $scope.activeModal.type = 'edit_shake';
            $scope.activeModal.data = shake;
        };

        $scope.addShake = function() {
            $scope.shakes.push({
                "name": "Enter a Name",
                "img": "",
                "description": "Enter the description for the shake.",
                "ingredients": []
            })
            $scope.editShake($scope.shakes[$scope.shakes.length - 1])
        }

        $scope.addShakeIngredient = function(ingredient) {
            ingredient.amount = 1;
            // ingredient.id = ingredient.ingredient_id;

            $scope.activeModal.data.ingredients.push(ingredient)
            $scope.editShake($scope.activeModal.data)
            $scope.showAvailableIngredients
            $scope.showAvailableIngredientsSelector = false;

        }

        $scope.saveShake = function(shake) {
            $scope.loading = true;
            for (ingredient in shake.ingredients) {
                if (!shake.ingredients[ingredient].id) {
                    shake.ingredients[ingredient].id = shake.ingredients[ingredient].ingredient_id
                }

            }
            if (isNew(shake)) {
                // console.log('new')
                DataSvc.addShake(shake).then(function(ress) {
                    $scope.shakes = []
                    DataSvc.getShakes().then(shakeData => {
                        $scope.shakes = shakeData;
                        $scope.closeModal()
                        $scope.loading = false;
                    });
                })
            } else {
                DataSvc.updateShake(shake).then(function(ress) {
                    $scope.shakes = []
                    DataSvc.getShakes().then(shakeData => {
                        $scope.shakes = shakeData;
                        $scope.closeModal()
                        $scope.loading = false;
                    });
                })
            }
        }

        $scope.deleteShake = function(shake) {
            $scope.loading = true;
            DataSvc.deleteShake(shake.id).then(function() {
                $scope.shakes = []
                DataSvc.getShakes().then(shakeData => {
                    $scope.shakes = shakeData;
                    $scope.closeModal()
                    $scope.loading = false;
                });
            })
        }

        // end shakes



        // snacks

        $scope.editSnack = function(SnackDa) {
            var Snack = SnackDa

            var total = {};
            total.k = 0;
            total.c = 0;
            total.p = 0;
            total.f = 0;
            total.s = 0;
            total.volume = 0;

            for (ingredient in Snack.ingredients) {

                if (Snack.ingredients[ingredient].amountGrams) {
                    Snack.ingredients[ingredient].amount = (Snack.ingredients[ingredient].amountGrams / Snack.ingredients[ingredient].measurement)
                }

                Snack.ingredients[ingredient].amountGrams = Snack.ingredients[ingredient].amount * Snack.ingredients[ingredient].measurement

                total.k += (Snack.ingredients[ingredient].k * Snack.ingredients[ingredient].amount)
                total.c += (Snack.ingredients[ingredient].c * Snack.ingredients[ingredient].amount)
                total.p += (Snack.ingredients[ingredient].p * Snack.ingredients[ingredient].amount)
                total.f += (Snack.ingredients[ingredient].f * Snack.ingredients[ingredient].amount)
                total.s += (Snack.ingredients[ingredient].s * Snack.ingredients[ingredient].amount)
                total.volume += (Snack.ingredients[ingredient].volume * Snack.ingredients[ingredient].amount)
            }

            total.k = total.k.toFixed(0);
            total.c = total.c.toFixed(0);
            total.p = total.p.toFixed(0);
            total.f = total.f.toFixed(0);
            total.s = total.s.toFixed(0);
            total.volume = total.volume.toFixed(0);
            Snack.total = total;
            $scope.activeModal.type = 'edit_Snack';
            $scope.activeModal.data = Snack;
        };

        $scope.addSnack = function() {
            $scope.snacks.push({
                "name": "Enter a Name",
                "img": "",
                "description": "Enter the description for the Snack.",
                "ingredients": []
            })
            $scope.editSnack($scope.snacks[$scope.snacks.length - 1])
        }

        $scope.addSnackIngredient = function(ingredient) {
            ingredient.amount = 1;
            // ingredient.id = ingredient.ingredient_id;

            $scope.activeModal.data.ingredients.push(ingredient)
            $scope.editSnack($scope.activeModal.data)
            $scope.showAvailableIngredients
            $scope.showAvailableIngredientsSelector = false;

        }

        $scope.saveSnack = function(Snack) {
            $scope.loading = true;
            for (ingredient in Snack.ingredients) {
                if (!Snack.ingredients[ingredient].id) {
                    Snack.ingredients[ingredient].id = Snack.ingredients[ingredient].ingredient_id
                }

            }
            if (isNew(Snack)) {
                // console.log('new')
                DataSvc.addSnack(Snack).then(function(ress) {
                    $scope.snacks = []
                    DataSvc.getSnacks().then(SnackData => {
                        $scope.snacks = SnackData;
                        $scope.closeModal()
                        $scope.loading = false;
                    });
                })
            } else {
                DataSvc.updateSnack(Snack).then(function(ress) {
                    $scope.snacks = []
                    DataSvc.getSnacks().then(SnackData => {
                        $scope.snacks = SnackData;
                        $scope.closeModal()
                        $scope.loading = false;
                    });
                })
            }
        }

        $scope.deleteSnack = function(Snack) {
            $scope.loading = true;
            DataSvc.deleteSnack(Snack.id).then(function() {
                $scope.snacks = []
                DataSvc.getSnacks().then(SnackData => {
                    $scope.snacks = SnackData;
                    $scope.closeModal()
                    $scope.loading = false;
                });
            })
        }

        // end shakes


        // ingredients
        $scope.editIng = function(ingData) {
            var ing = ingData
            $scope.activeModal.type = 'edit_ing';
            $scope.activeModal.data = ing;
        };

        $scope.addIng = function() {
            $scope.ingredients.push({
                "name": "Ingredient Name",
                "k": 0,
                "c": 0,
                "p": 0,
                "f": 0,
                "s": 0,
                "cost": 0,
                "measurement": 0,
                "volume": 0,
                "img": "",
                "cooktime": 0,
                "preptime": 0,
                "level": "primary",
                "allergens": {
                    "1": false,
                    "2": false,
                    "3": false,
                    "4": false
                },
                "measurement_type": "Grams"
            })
            $scope.editIng($scope.ingredients[$scope.ingredients.length - 1])
        }

        $scope.saveIng = function(ingredient) {
            $scope.loading = true;
            ingredient.allergens = JSON.stringify(ingredient.allergens)
            delete ingredient.amountGrams;
            if (isNew(ingredient)) {
                DataSvc.addIngredient(ingredient).then(function(ress) {
                    $scope.ingredients = []
                    DataSvc.getIngredients().then(ingredientData => {
                        for (ing in ingredientData) {
                            ingredientData[ing].allergens = JSON.parse(JSON.stringify(JSON.parse(ingredientData[ing].allergens)))
                            ingredientData[ing].amountGrams = ingredientData[ing].amount * ingredientData[ing].measurement
                        }
                        $scope.ingredients = ingredientData;
                        $scope.closeModal()
                        $scope.loading = false;
                    });
                })
            } else {
                DataSvc.updateIngredient(ingredient).then(function(ress) {
                    $scope.ingredients = []
                    DataSvc.getIngredients().then(ingredientData => {
                        for (ing in ingredientData) {
                            ingredientData[ing].allergens = JSON.parse(JSON.stringify(JSON.parse(ingredientData[ing].allergens)))
                            ingredientData[ing].amountGrams = ingredientData[ing].amount * ingredientData[ing].measurement
                        }
                        $scope.ingredients = ingredientData;
                        $scope.closeModal()
                        $scope.loading = false;
                    });
                })
            }
        }

        $scope.deleteIngredient = function(ingredient) {
            $scope.loading = true;
            DataSvc.deleteIngredient(ingredient.id).then(function() {
                $scope.ingredients = []
                DataSvc.getIngredients().then(ingredientData => {
                    for (ing in ingredientData) {
                        ingredientData[ing].allergens = JSON.parse(JSON.stringify(JSON.parse(ingredientData[ing].allergens)))
                        ingredientData[ing].amountGrams = ingredientData[ing].amount * ingredientData[ing].measurement
                    }
                    $scope.ingredients = ingredientData;
                    $scope.closeModal()
                    $scope.loading = false;
                });
            })
        }
        // end ingredients



        // plans
        $scope.editPlan = function(planData) {
            var plan = planData
            $scope.activeModal.type = 'edit_plan';
            $scope.activeModal.data = plan;
        };

        $scope.addPlan = function() {
            $scope.plans.push({
                "name": "Plan Name",
                "month_price": 0,
                "meal_count": 0,
                "shake_count": 0,
                "snack_count": 0,
                "img": "",
                "description": "enter a plan description",
                "week_price": 0,
                "day_count": 0
            })
            $scope.editPlan($scope.plans[$scope.plans.length - 1])
        }


        $scope.savePlan = function(plan) {
            $scope.loading = true;
            delete plan.slots;
            if (isNew(plan)) {
                DataSvc.addPlan(plan).then(function(ress) {
                    $scope.plans = []
                    DataSvc.getPlans().then(planData => {

                        $scope.plans = planData;
                        $scope.closeModal()
                        $scope.loading = false;
                    });
                })
            } else {
                DataSvc.updatePlan(plan).then(function(ress) {
                    $scope.plans = []
                    DataSvc.getPlans().then(planData => {
                        $scope.plans = planData;
                        $scope.closeModal()
                        $scope.loading = false;
                    });
                })
            }
        }

        $scope.deletePlan = function(plan) {
            $scope.loading = true;
            DataSvc.deletePlan(plan.id).then(function() {
                $scope.plans = []
                DataSvc.getPlans().then(planData => {
                    $scope.plans = planData;
                    $scope.closeModal()
                    $scope.loading = false;
                });
            })
        }
        //{"id":1,"name":"Shred","month_price":65,"meal_count":3,"shake_count":0,"snack_count":0,"img":"/img/weight.png ","description":"3 Meals a day","week_price":420,"slots":3}
        // end plans



        // voucher
        $scope.editVoucher = function(VoucherData) {
            var Voucher = VoucherData
            $scope.activeModal.type = 'edit_Voucher';
            $scope.activeModal.data = Voucher;
        };

        $scope.addVoucher = function() {
            $scope.vouchers.push({
                "code": "Voucher Code",
                "value": 0,
                "valid": 1,
                "description": "a voucher code."
            })
            $scope.editVoucher($scope.vouchers[$scope.vouchers.length - 1])
        }


        $scope.saveVoucher = function(Voucher) {
            $scope.loading = true;
            delete Voucher.slots;
            if (isNew(Voucher)) {
                DataSvc.addVoucher(Voucher).then(function(ress) {
                    $scope.vouchers = []
                    DataSvc.getVouchers().then(VoucherData => {

                        $scope.vouchers = VoucherData;
                        $scope.closeModal()
                        $scope.loading = false;
                    });
                })
            } else {
                DataSvc.updateVoucher(Voucher).then(function(ress) {
                    $scope.vouchers = []
                    DataSvc.getVouchers().then(VoucherData => {
                        $scope.vouchers = VoucherData;
                        $scope.closeModal()
                        $scope.loading = false;
                    });
                })
            }
        }

        $scope.deleteVoucher = function(Voucher) {
            $scope.loading = true;
            DataSvc.deleteVoucher(Voucher.id).then(function() {
                $scope.vouchers = []
                DataSvc.getVouchers().then(VoucherData => {
                    $scope.vouchers = VoucherData;
                    $scope.closeModal()
                    $scope.loading = false;
                });
            })
        }

        // end vaoucher


        $scope.logout = function() {
            DataSvc.logout().then(function() {
                location.reload();
            })
        }
    });
}]).directive("fileread", [
    function() {
        return {
            scope: {
                fileread: "="
            },
            link: function(scope, element, attributes) {
                element.bind("change", function(changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function(loadEvent) {
                        scope.$apply(function() {
                            scope.fileread = loadEvent.target.result;
                        });
                    }
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    }
]).filter('reverse', function() {
    return function(items) {
        if (items) {
            return items.slice().reverse();
        } else {
            return;
        }
    };
});
angular.module("webApp").config(["$routeProvider", function(routeProv) {
    routeProv.when("/admin", {
        title: "Admin",
        templateUrl: "admin/admin.html",
        controller: "adminCtrl"
    })
}])
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
angular.module("webApp").config(["$routeProvider", function(routeProv) {
    routeProv.when("/orders", {
        title: "orders",
        templateUrl: "orders/orders.html",
        controller: "ordersCtrl"
    })
}])
angular.module('webApp').controller('voucherCtrl', ['$scope', '$http', function ($scope, $http) {
    window.voucherCtrlScope = $scope
}])
angular.module("webApp").config(["$routeProvider", function(routeProv) {
    routeProv.when("/voucher", {
        title: "voucher",
        templateUrl: "voucher/voucher.html",
        controller: "voucherCtrl"
    })
}])
angular.module("webApp").factory("DataSvc", [
    "$http",
    "$q",
    function($http, $q) {
        return {
            getSnacks: function getSnacks() {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: "/api/getSnacks",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            getShakes: function getShakes() {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: "/api/getShakes",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            getMeals: function getMeals() {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: "/api/getMeals",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            getIngredients: function getIngredients() {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: "/api/getIngredients",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            getAllergens: function getAllergens() {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: "/api/getAllergies",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            getPlans: function getPlans() {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: "/api/getPlans",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            getVouchers: function getVouchers() {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: "/api/getVouchers",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            addSnack: function addSnack(snack) {
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    url: "/api/addSnack",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    },
                    data: snack

                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            addVoucher: function addVoucher(voucher) {
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    url: "/api/addVoucher",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    },
                    data: voucher

                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            addShake: function addShake(shake) {
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    url: "/api/addShake",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    },
                    data: shake

                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            addMeal: function addMeal(meal) {
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    url: "/api/addMeal",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    },
                    data: meal

                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            updateMeal: function updateMeal(meal) {
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    url: "/api/updateMeal",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    },
                    data: meal

                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            updateShake: function updateShake(shake) {
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    url: "/api/updateShake",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    },
                    data: shake

                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            updateSnack: function updateSnack(snack) {
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    url: "/api/updateSnack",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    },
                    data: snack

                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            deleteShake: function deleteShake(id) {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: "/api/deleteShake?id=" + id,
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            deleteVoucher: function deleteVoucher(id) {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: "/api/deleteVoucher?id=" + id,
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            deleteSnack: function deleteSnack(id) {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: "/api/deleteSnack?id=" + id,
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            deleteMeal: function deleteMeal(id) {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: "/api/deleteShake?id=" + id,
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            addIngredient: function addIngredient(ingredient) {
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    url: "/api/addIngredient",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    },
                    data: ingredient

                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            updateIngredient: function updateIngredient(ingredient) {
                var id = ingredient.id;
                delete ingredient.id;
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    url: "/api/updateIngredient?id=" + id,
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    },
                    data: ingredient

                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            updateVoucher: function updateVoucher(voucher) {
                var id = voucher.id;
                delete voucher.id;
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    url: "/api/updateVoucher?id=" + id,
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    },
                    data: voucher

                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            deleteIngredient: function deleteIngredient(id) {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: "/api/deleteIngredient?id=" + id,
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            logout: function logout() {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: "/api/logout",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            addPlan: function addPlan(plan) {
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    url: "/api/addPlan",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    },
                    data: plan

                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            updatePlan: function updatePlan(plan) {
                var id = plan.id;
                delete plan.id;
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    url: "/api/updatePlan?id=" + id,
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    },
                    data: plan

                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            },
            deletePlan: function deletePlan(id) {
                var deferred = $q.defer();
                $http({
                    method: "GET",
                    url: "/api/deletePlan?id=" + id,
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                }).then(
                    function(res) {
                        deferred.resolve(res.data);
                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            }
        };
    }
]);
angular.module("webApp").factory("SessionService", [
    "$http",
    "$q",
    function($http, $q) {
        return {
            login: function login(user) {
                var deferred = $q.defer();
                $http({
                    method: "POST",
                    url: "/api/login",
                    dataType: "json",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    },
                    data: user

                }).then(
                    function(res) {

                        deferred.resolve(res.data);

                    },
                    function(res) {
                        deferred.resolve(res.data);
                    }
                );
                return deferred.promise;
            }
        };
    }
]);
angular.module('webApp').directive('login', ['SessionService', '$timeout', '$rootScope', function(SessionService, $timeout, $rootScope) {
    return {
        templateUrl: 'directives/login/login.html',
        scope: {},
        link: function(scope, element, attr) {
            scope.login = ($event, email, password) => {
                if ($event.keyCode == 13) {
                    SessionService.login({
                        "username": email,
                        "password": password
                    }).then((loginResult) => {
                        if (!loginResult.error) {
                            window.sessionStorage.token = loginResult.token;
                            // deferred.resolve(loginResult);
                            $rootScope.login = false;
                        } else {
                            alert(loginResult.error)
                        }
                    })
                } else if ($event.type == 'click') {
                    SessionService.login({
                        "username": email,
                        "password": password
                    }).then((loginResult) => {
                        console.log(loginResult);
                        if (!loginResult.error) {
                            window.sessionStorage.token = loginResult.token;
                            // deferred.resolve(loginResult);
                            $rootScope.login = false;
                        } else {
                            alert(loginResult.error)
                        }
                    })
                }
            }

        }
    };
}]);
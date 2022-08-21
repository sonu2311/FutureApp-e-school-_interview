
var app = angular.module('myApp', ["ngRoute"])

app.config(function($routeProvider) {
    $routeProvider
    .when("/login", {
      templateUrl : "includes/login.html"
    })
    .when("/", {
      templateUrl : "includes/dashboard.html",
      subPage: "includes/products_page.html"
    })
    .when("/products_page", {
      templateUrl : "includes/dashboard.html",
      subPage : "includes/products_page.html"
    })
    .when("/single_product_page", {
      templateUrl : "includes/dashboard.html",
      subPage : "includes/single_product_page.html"
    })
  ;
});

app.controller('products_ctrl', function($scope, $http) {
  $scope.products_list=[]
  $scope.inputs = {
    sort_by: "asc",
    limit: "20"}

  $scope.reload = function() {
    $http.get('https://fakestoreapi.com/products?sort='+$scope.inputs.sort_by+'&limit='+$scope.inputs.limit)
    .then(function(backend_output){
      $scope.products_list =backend_output.data
    })
  }  
  $scope.reload()
});

app.controller('single_product_ctrl', function($scope,  $http) {
  $scope.product_info={}

  var url_params = new URLSearchParams(window.location.href.split("?")[1])
  $scope.url_product_id = url_params.get("id")

  $http.get('https://fakestoreapi.com/products/'+ $scope.url_product_id)
    .then(function(backend_output){
      $scope.product_info =backend_output.data
    })
});

app.controller("main_ctrl", function ($scope, $timeout) {
  var cleanup=function() {
    var cleanup_list=[]
    for (i in $scope.messages){
      if ((new Date().getTime()) < $scope.messages[i]["deadline"]){
        cleanup_list.push($scope.messages[i])
      }
    }
    $scope.messages=cleanup_list
  }
  $scope.messages=[]
  $scope.my_alert = function(y, timeout) {
    timeout = timeout || 4000  // ms.
    $scope.messages.push({"message":y, "deadline": new Date().getTime() + timeout})
    $timeout(cleanup, timeout)
  }
})

app.controller('dashboard_ctrl', function($scope, $route) {
  if (localStorage.token == null) {
    window.location.href = "#!/login"
  }
  $scope.subPage = $route.current.$$route.subPage;
});


  


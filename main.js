
var app = angular.module('myApp', ["ngRoute"])

app.config(function($routeProvider) {
    $routeProvider
    .when("/login", {
        templateUrl : "includes/login.html"
    })
    .when("/", {
        templateUrl : "includes/dashboard.html",
        subPage: "includes/search_page.html"
    })
    .when("/dashboard", {
        templateUrl : "includes/dashboard.html",
        subPage: "includes/search_page.html"
    })
    .when("/property_page", {
        templateUrl : "includes/dashboard.html",
        subPage : "includes/property_page.html"
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

app.controller('products_ctrl', function($scope, $route, $http) {
  $scope.products_list=[]
  $http.get('https://fakestoreapi.com/products')
    .then(function(backend_output){
      console.log("backend_output==", backend_output)
      $scope.products_list =backend_output.data
    })
});

app.controller('single_product_ctrl', function($scope, $route, $http) {
  $scope.product_info={}

  var url_params = new URLSearchParams(window.location.href.split("?")[1])
  $scope.url_product_id = url_params.get("id")

  // $scope.dish_id = url_params.get("id")
  // api($http, '/dish_according_to_id',{ "dish_id": $scope.dish_id },function(backend_output){
  //   $scope.d=backend_output
  //   console.log($scope.d)
  // })

  $http.get('https://fakestoreapi.com/products/'+ $scope.url_product_id)
    .then(function(backend_output){
      console.log("backend_output_product_info==", backend_output)
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

app.controller('PropertyCtrl', function($scope,$http) {
   $scope.detail_show=false;
   console.log($scope.detail_show)
   $scope.show_hide_details=function(){
    $scope.detail_show=!$scope.detail_show
    console.log($scope.detail_show)
   }

   $scope.selected_tab='mortage'
   $scope.select_tab=function(x){
    $scope.selected_tab=x
   }

   $scope.realpha_dropdown='realpha_inputs'

   var url_params = new URLSearchParams(window.location.href.split("?")[1])
  $scope.url_property_id = url_params.get("id")
  console.log("$scope.url_property_id = " + $scope.url_property_id)

  $scope.favorite_icon= false

  if($scope.url_property_id !=null) {
    api($http, '/get_property_info', {"property_id":$scope.url_property_id}, function(backend_output){
      $scope.property_info = backend_output.info
      console.log($scope.property_info)
      $scope.favorite_icon= backend_output.favorite_icon_backend_output
      console.log($scope.favorite_icon)
      $scope.my_alert("loaded.")
    })
  }

  $scope.mark_favorite=function(){
    api($http, '/mark_favorite', {"property_id":$scope.url_property_id}, function(backend_output){
        $scope.favorite_icon= !$scope.favorite_icon
      })
  }

  $scope.image_list=["https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/TypesOfHomes/types-of-homes-hero.jpg",
  "https://cdn.vox-cdn.com/thumbor/frFQQhOsxl8DctGjkR8OLHpdKMs=/0x0:3686x2073/1200x800/filters:focal(1549x743:2137x1331)/cdn.vox-cdn.com/uploads/chorus_image/image/68976842/House_Tour_Liverman_3D6A3138_tour.0.jpg", 
  "https://i.pinimg.com/originals/4d/9d/d6/4d9dd658da8a62f5f9726c903af2be98.jpg", 
  "https://i.pinimg.com/originals/78/83/46/7883462c95aca4252546e9963187f4e6.jpg"
  ]
  $scope.change_image=0
  $scope.property_next_image=function(){
    $scope.change_image=($scope.change_image+1)% $scope.image_list.length
  }

  $scope.property_previous_image=function(){
    $scope.change_image=($scope.change_image - 1 + $scope.image_list.length) % $scope.image_list.length

  }  

})
  


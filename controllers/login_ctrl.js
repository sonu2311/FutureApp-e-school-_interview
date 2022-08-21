app.controller('login_ctrl', function($scope, $http) {
  $scope.username=""
  $scope.password=""
  $scope.is_sign_up_disabled=false
  $scope.show_password_icon = false

  $scope.password_hide_or_show=function(){
      $scope.show_password_icon = !$scope.show_password_icon
  }

  $scope.login=function(){ 
    if (!(/^[a-z0-9_.]+$/).test($scope.username)){
      $scope.my_alert("username is not correct.")
      return
    }
    $scope.is_login_disabled=true
    $http.post('https://fakestoreapi.com/auth/login', {
      username: $scope.username,
      password: $scope.password
    })
    .then(function(backend_output){
      $scope.is_login_disabled=false
      localStorage.token = backend_output.data.token
      window.location.href = "#!/products_page"
    })
    .catch(function(e){
      $scope.my_alert(e.data)
      $scope.is_login_disabled=false
    })
  }
});
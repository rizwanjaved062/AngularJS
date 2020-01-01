angular.module('App', []).controller('CrudCtrl',
        function($scope, $http) {

            $http.get("http://localhost:8000/api/students")
                    .then(function(response) { console.log(response.data);
                $scope.Profiles = response.data;
            });

            $scope.entity = {}

            $scope.edit = function(index) {
                $scope.entity = $scope.Profiles[index];
                $scope.entity.index = index;
                $scope.entity.editable = true; 
				$scope.recState = "editable";                				
            }

            //delete Student record by Id
            $scope.delete = function(index) {
                $scope.Profiles.splice(index, 1);
				$http({
                    url: 'http://localhost:8000/api/students/'+$scope.Profiles[index].id,
                    method: "DELETE",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
            }

            $scope.save = function(index) {
                $scope.Profiles[index].editable = false;
                var data = {
                    name: $scope.Profiles[index].name,
                    course: $scope.Profiles[index].course
                };
				
				if($scope.recState == 'new'){
					$url = 'http://localhost:8000/api/students/create';
					$method = "POST";
				}else{
                    $url = 'http://localhost:8000/api/students/'+$scope.Profiles[index].id;
					$method = "PUT";
                }				
				
                $http({
                    url: $url,
                    method: $method,
                    data: Object.toparams(data),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
            }

            $scope.add = function() {
                $scope.Profiles.push({
                    name: "",
                    country: "",
                    editable: true
                })
				$scope.recState = "new";
            }

            Object.toparams = function ObjecttoParams(obj) {
                var p = [];
                for (var key in obj) {
                    p.push(key + '=' + encodeURIComponent(obj[key]));
                }
                return p.join('&');
            };

        }



);
angular.module('App', []).controller('CrudCtrl',
        function($scope, $http) {

            $http.get("http://localhost:8000/api/students")
                    .then(function(response) {
                $scope.Profiles = response.data;
            });


            $scope.entity = {}

            $scope.edit = function(index) {
                $scope.entity = $scope.Profiles[index];
                $scope.entity.index = index;
                $scope.entity.editable = true;
            }

            $scope.delete = function(index) {
                $scope.Profiles.splice(index, 1);
            }

            $scope.save = function(index) {
                $scope.Profiles[index].editable = false;
                var data = {
                    name: $scope.Profiles[index].name,
                    course: $scope.Profiles[index].course
                };
                $http({
                    url: 'http://localhost:8000/api/students/create',
                    method: "POST",
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
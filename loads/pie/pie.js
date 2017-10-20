var app = angular.module("app.pie",["ngRoute"]);
app.config(function($routeProvider){
	$routeProvider.when("/pie",{
		templateUrl:"loads/pie/pie.html",
		controller:"pieController"
	});
});

app.controller("pieController",function($scope,modalService){
	var obj = {};
	$scope.$parent.stuData.students.forEach(function(item){
		if(obj.hasOwnProperty(item.age)){
			obj[item.age]++;
		}else{
			obj[item.age] = 1;
		}
	});
	var info = [];
	var length = $scope.$parent.stuData.students.length;
	// Object { 14=2,  15=2,  16=1}=>[[14,],[]]
	for(key in obj){
		var arr = [];
		arr.push(key+"元");
		arr.push((obj[key]/length)*100);
		info.push(arr);
	}
	angular.element(document.getElementById("container")).highcharts({
        chart: {
            type: 'pie',
            options3d: {
				enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: '产品各个价格统计'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            type: 'pie',
            name: '价格分布',
            data: info
        }]
    });

});

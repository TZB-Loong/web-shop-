var app = angular.module("app.cms",["ngRoute"]);
app.config(function($routeProvider){
	$routeProvider.when("/publisur",{
		templateUrl:"loads/cms/publisur.html",
		controller:"cmsController"
	});
	$routeProvider.when("/essay",{
		templateUrl:"loads/cms/essay.html",
		controller:"cmsController"
	});
});
app.controller("cmsController",function($scope,modalService){
	$scope.data={
		cms : $scope.$parent.cmsData.cms,
		newCms : null,
		addCms : function(){
			var cms = new Cms(
				this.newCms.title,	
				this.newCms.category,	
				this.newCms.content
			);
			this.cms.push(cms);
			//重置双向数据绑定
			this.newCms = null;
			alert("发布成功");
		},
	}
});

app.filter("idToName",function(){
	return function(id,arr){
		var category = arr.filter(function(item){
			return item.id == id;
		})[0];
		return category.name;
	}
});


var id = 1002;
function Cms(title,category,content){
	this.id = ++id;
	this.title = title;
	this.category = category;
	this.content = content;
	this.time = new Date().getTime();
	this.clickTimes = 0;
	this.author = "licy";
}
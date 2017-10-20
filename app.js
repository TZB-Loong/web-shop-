  var app = angular.module("app",[
	"ngRoute",
	"app.stuMan",
	"app.teaInfoMan",
	"app.category",
	"app.cms",
	"app.pie"
  ]);
  
 
  app.controller("mainController",function($scope,$http){
	//会员相关信息
	$scope.stuData = {};
    $scope.teaData = {};
	$scope.categorys = [];
	$scope.cmsData = {};
	$http.get("json/students.json").success(function(data){
		$scope.stuData.students = data;
	});
	$http.get("json/teachers.json").success(function(data){
		$scope.teaData.teachers = data;
	});
	$http.get("json/categorys.json").success(function(data){
		$scope.categorys = data;
	});
	$http.get("json/cms.json").success(function(data){
		$scope.cmsData.cms = data;
	});

	//ajax 获取服务器中配置信息
	$http.get("json/config.json").success(function(data){
		$scope.config = data;
		//临时处理刷新后选项卡丢失Bug
		$scope.data.tabs = [data[0]];
	});
	//初始化数据
	$scope.data = {};
	//选项卡数组
	$scope.data.tabs = [];
	//当前选项卡对象
	$scope.data.currentTab = null;

	//更改当前tabs 
	$scope.data.changeTabs = function(id){
		var sons = $scope.config.filter(function(item){
			return item.parent == id;
		});
		//当存在子功能的时候，将子功能数组赋给tabs
		if(sons.length>0){
			$scope.data.tabs = sons;
		}else{
		//当不存在子功能的时候，将自身赋给tabs
			$scope.data.tabs = $scope.config.filter(function(item){
				return item.cId == id;	
			});
		}
		//修改当前选项卡
		$scope.data.currentTab = $scope.data.tabs[0];
		//默认请求第一个选项卡中代表的路径
		window.open($scope.data.currentTab.url,"_self");
		
	}
	//更改当前tab
	$scope.data.changeCurrentTab = function(event){
		//1.点击谁激活谁
		angular.element(event.currentTarget)
			.addClass("active")
			.siblings()
			.removeClass("active");
	}
  });

  app.factory("modalService",function(){
	return {
		open:function(id){
		    angular.element(
				document.getElementById(id)
			).modal("show");
		},
		close:function(id){
			angular.element(
				document.getElementById(id)
			).modal("hide");
		}
	}
  });
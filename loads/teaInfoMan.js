var app = angular.module("app.teaInfoMan",["ngRoute"]);

app.config(function($routeProvider){
	$routeProvider.when("/teaInfoMan",{
		templateUrl:"loads/teaInfoMan.html",
		controller:"teaInfoManController"
	});
	$routeProvider.when("/teaSalaryMan",{
		templateUrl:"loads/teaSalaryMan.html",
		controller:"teaInfoManController"
	});
});

app.controller("teaInfoManController",function($scope,modalService){
	$scope.msg = "产品信息管理页面";
	$scope.data = {
		teachers : $scope.$parent.teaData.teachers,
		newTea:null,
		option:"",
		modalTitle:"",
		salary:null,
		showAddTea:function(){
			this.option = "add",
			this.modalTitle = "添加产品信息";
			this.newTea = null;
			modalService.open("teaModal");			
		},
		addTea : function(){
			var tea = new Teacher(
				this.newTea.name,
				this.newTea.gender,
				this.newTea.rank,
				this.newTea.email,
				this.newTea.record
			);
			this.teachers.push(tea);
			modalService.close("teaModal");
		},
		delTea:function(){
			var b1 = this.teachers.some(function(item){
				return item.checked == true;
			});
			if(b1){
				if(window.confirm("确认吗？")){
					var arr = this.teachers.filter(function(item){
						return item.checked !=true;
					});
					//1.通过本作用域中的指令（ng-repeat="teachers"）给页面更改
					this.teachers = arr;
					//2.彻底删除父作用域中的数据。
					$scope.$parent.teaData.teachers = arr;
				}
			}else{
				alert("请选中要删除的产品");			
			}
		},
		showUpdTea : function(){
			this.option="upd";
			var tea = this.teachers.filter(function(item){
				return item.checked == true;
			})[0];
			if(tea){
				this.newTea = tea;
				this.modalTitle = "修改"+tea.name+"信息";
				modalService.open("teaModal");
			}
		},
		updTea : function(){
			modalService.close("teaModal");
		},
		showChangeSalary:function(){
			var tea = this.teachers.filter(function(item){
				return item.checked == true;
			})[0];
			if(tea){
				console.log(tea);
				this.newTea = tea; //双向数据绑定
				this.modalTitle = "调整"+tea.name+"价格";
				//双向数据绑定工资更改数据
				this.salary = {
					upSalary:0,
					upDaySalary:0
				}
				modalService.open("salaryModal");
			}else{
				alert("请选中要修改的产品");	
			}
		},
		changeSalary : function(id){
			console.log(this);
			console.log(this.salary);
			var tea = this.teachers.filter(function(item){
				return item.id == id
			})[0];
			tea.salary += this.salary.upSalary;
			tea.daySalary += this.salary.upDaySalary;

			modalService.close("salaryModal");
		}
	}
});
var id = 1002;//从id为1002之后自增开始添加。即1003，1004，，，，
function Teacher(name,gender,rank,email,record){
	this.id = ++id;
	this.name = name;
	this.gender = gender;
	this.rank = rank;
	this.email = email;
	this.record = record;
	this.picture = "images/"+name+".gif";
	this.salary = 3000;
	this.daySalary = 30;
}
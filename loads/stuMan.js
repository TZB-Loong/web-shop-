var app = angular.module("app.stuMan",["ngRoute"]);

app.config(function($routeProvider){
	$routeProvider.when("/stuMan",{
		templateUrl:"loads/stuMan.html",
		controller:"stuManController"
	});
});

app.controller("stuManController",function($scope,$http,modalService){
	$scope.msg = "产品信息管理页面";
	//表单中双向绑定的对象
	$scope.newUser;

//-----------------产品相关功能对象----------------
	$scope.data = {
		students : $scope.$parent.stuData.students,//存储产品对象的数组
		modalTitle:"",
		option :"", //记录当前操作add upd
		search:{}, //用于接受用户的请求 {key:"name",val:"类别"}
		criteria:{},//模板对象 {name:"类别"}
		//显示添加产品信息的窗口 
		showAddModal : function(){
			this.option = "add";
			$scope.newUser = null;
			this.modalTitle = "添加产品信息";
			modalService.open("stuModal");
		},
		//添加产品信息
		addStu:function(){
			//1.将表单中的产品信息保存到students
			var stu = new Student(
				$scope.newUser.name,
				$scope.newUser.gender,
				$scope.newUser.age,
				$scope.newUser.telephone
			);
			$scope.data.students.push(stu);
			//清空输入框的内容
			$scope.newUser = null;
			//2.关闭模态框
			modalService.close("stuModal");
		},
		delStu: function(){
		    var b1 = this.students.some(function(item){
				return item.checked == true;
			});
			if(b1){
				if(window.confirm("确定删除吗？")){
					this.students = this.students.filter(function(item){
						return item.checked != true;
					});
				}	
			}else{
				alert("请选中您要删除的产品");
			}
		},
		//点击修改按钮激发，显示模态框
		showUpdModal:function(){
			this.option = "upd";
			var stu = this.students.filter(function(item){
				return item.checked == true;
			})[0];
			//判断是否选中了元素
			if(stu){
				$scope.newUser = stu; //双向数据绑定
				this.modalTitle = "修改"+stu.name+"信息";
				modalService.open("stuModal");
			}else{
				alert("请选中要修改的产品");
			}
		},
		updStu : function(){
			modalService.close("stuModal");
		},
		//搜索产品
		searchStu:function(){
			// 改变criteria的值
			//当key和val都有值的情况下再筛选
			this.criteria = {};
			if(this.search.key && this.search.val){
				this.criteria[this.search.key] 
				  = this.search.val;
			}else{
				this.criteria = {};
			}
		},
		becomeLeader:function(){
			this.students.forEach(function(item){
				if(item.checked){
					item.rank = "已加入"
				}
			});
		},
		//设置为产品
		becomeMember:function(id){
			if(window.confirm("确定移除购物车吗？")){
				this.students.forEach(function(item){
					if(item.id == id){
						item.rank = "产品"
					}
				});
			}
		}
	}
//------------end-----------


	var id = 1000;
	//构造器
	function Student(name,gender,age,telephone){
		this.id = ++id;
		this.name = name;
		this.gender = gender;
		this.age = age;
		this.telephone = telephone;
		this.rank = "产品";
	}
});

//服务的创建，工厂模式
app.factory("modalService",function(){
	var modal = document.getElementById("stuModal");
	modal = angular.element(modal);
	return {
		open:function(){
			modal.modal("show");
		},
		close:function(){
			modal.modal("hide");
		}
	}
});
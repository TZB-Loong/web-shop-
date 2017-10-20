var app = angular.module("app.category",["ngRoute"]);
app.config(function($routeProvider){
	$routeProvider.when("/category",{
		templateUrl:"loads/category/category.html",
		controller:"categoryController"
	});
});

app.controller("categoryController",function($scope,modalService){
	
	$scope.newUser;
	$scope.data={
		categorys : $scope.$parent.categorys,
	modalTitle:"",
		option :"", //记录当前操作add upd
		search:{}, //用于接受用户的请求 {key:"name",val:""}
		criteria:{},//模板对象 {name:"男"}
		//显示添加会员信息的窗口 
		showAddModal : function(){
			this.option = "add";
			$scope.newUser = null;
			this.modalTitle = "添加会员信息";
			modalService.open("categoryModal");
		},
		//添加会员信息
		addCat:function(){
			//1.将表单中的会员信息保存到categorys
			var category = new Catdent(
				$scope.newUser.name,
				$scope.newUser.cord
			);
			$scope.data.categorys.push(category);
			//清空输入框的内容
			$scope.newUser = null;
			//2.关闭模态框
			modalService.close("categoryModal");
		},
		delCat: function(){
		    var b1 = this.categorys.some(function(item){
				return item.checked == true;
			});
			if(b1){
				if(window.confirm("确定吗？")){
					this.categorys = this.categorys.filter(function(item){
						return item.checked != true;
					});
				}	
			}else{
				alert("请选中您要删除的会员");
			}
		},
		//点击修改按钮激发，显示模态框
		showUpdModal:function(){
			this.option = "upd";
			var category = this.categorys.filter(function(item){
				return item.checked == true;
			})[0];
			//判断是否选中了元素
			if(category){
				$scope.newUser = category; //双向数据绑定
				this.modalTitle = "修改"+category.name+"信息";
				modalService.open("categoryModal");
			}else{
				alert("请选中要修改的栏目");
			}
		},
		updCat : function(){
			modalService.close("categoryModal");
		},
		//搜索学生
		searchCat:function(){
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
			this.categorys.forEach(function(item){
				if(item.checked){
					item.rank = "会员管理员"
				}
			});
		},
		//设置为组员
		
	}
//------------end-----------
	var id = 1;
	//构造器
	function Catdent(name,cord){
		this.id = ++id;
		this.name = name;
		this.cord = cord;
	}
});

//服务的创建，工厂模式
app.factory("modalService",function(){
	var modal = document.getElementById("categoryModal");
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
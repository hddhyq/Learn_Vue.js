let app = new Vue({
	el: '#app',
	data: {
		productList: [],
		totalMoney: 0,
		checkAll: false,
		delFlag: false,
		curProduct: null
	},
	mounted: function() {
		this.$nextTick(function() {
			this.cartView();
		})
	},
	filters: {
		formatMoney: function(value) {
			return "￥" + value.toFixed(2);
		}
	},
	methods: {
		cartView: function() {
			this.$http.get("data/cart.json").then(data => {
				this.productList = data.body.result.productList;
				this.totalMoney = data.body.result.totalMoney;
			})
		},
		changeNum: function(e, type) {
			if(type > 0) {
				e.productQuentity++;
			} else if(e.productQuentity > 1) {
				e.productQuentity--;
			}
		},
		selectProduct: function(e) {
			if(typeof e.ischecked === 'undefined') {
				//				Vue.set(e,'ischecked',true);      全局
				this.$set(e, 'ischecked', true); //局部
			} else {
				e.ischecked = !e.ischecked;
			};
			let isAllChecked = this.productList.every((value, index) => {
				return value.ischecked === true
            });
			this.checkAll = isAllChecked ;
		},
		changeCheckAllState: function(type) {
			this.checkAll = type;
			/*ES5写法*/
			//			var _this = this;
			//			this.productList.forEach(function(e,index){
			//				if(typeof e.ischecked == 'undefined'){
			//				_this.$set(e,'ischecked',type);    //局部
			//			}else{
			//				e.ischecked = type
			//			}
			//			})
			/*ES6写法  箭头函数*/
			this.productList.forEach((e, index) => {
				if(typeof e.ischecked === 'undefined') {
					this.$set(e, 'ischecked', type); //局部
				} else {
					e.ischecked = type
				}
			})
		},
		delConfirm: function(e){
			this.delFlag = true;
			this.curProduct = e;
		},
		delProduct: function(){
			let index = this.productList.indexOf(this.curProduct);
			this.productList.splice(index,1);
			this.delFlag = false;
		}
	},
	computed: {
		totalprice: function() {
			let num = 0;
			this.productList.forEach((item,index)=>{
				if(item.ischecked){
					num += item.productPrice*item.productQuentity;
				}
			});
			return num;
		}
	}
})
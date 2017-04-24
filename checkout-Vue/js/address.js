let address = new Vue({
    el: "#address",
    data: {
        addressList: [],
        limitenum: 3,
        currentIndex: 0,
        shippingmethod: 1,
		showMsg: 'more'
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getAddressList();
        })
    },
    methods: {
        getAddressList: function () {
//			this.$http.get("data/address.json").then(function(data){
//				this.addressList = data.body.result;
//			})
            axios.get("data/address.json").then((data) => {
                this.addressList = data.data.result;
//				console.log(JSON.stringify(data.result));
            })
        },
        setDefault: function (addressId) {
            this.addressList.forEach((item, index) => {
                item.isDefault = item.addressId === addressId;
            })
        },
        delAddress: function (index) {
            this.addressList.splice(index, 1);
        },
        showDetail: function () {
        	if(this.showMsg === 'more') {
        		this.showMsg = 'less';
        		return this.limitenum = this.addressList.length
			} else {
        		this.showMsg = 'more';
        		return this.limitenum = 3
			}

        }
    },
    computed: {
        filterAddress: function () {
            return this.addressList.slice(0, this.limitenum);
        }
    }
});

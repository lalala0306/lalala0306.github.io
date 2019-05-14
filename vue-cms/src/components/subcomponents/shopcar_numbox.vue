<template>
	<!-- 使用watch属性监听，来监听父组件传递过来的max值不管watch会触发几次  但是最后一次肯定是合法的数值 -->
		<div class="mui-numbox" data-numbox-min='1'>
			<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
			<input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref="numbox" />
			<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
		</div>
</template>


<script>
	const mui = require('../../lib/mui/js/mui.min.js')
	export default {
		mounted(){
			mui(".mui-numbox").numbox()
		},
		methods:{
			countChanged(){
				//每当文本框的值被修改的时候，立即把最新的数据，通过事件调用传递给父组件
				// console.log(this.$refs.numbox.value)
				//每当数值改变，则把最新的数量同步到购物车的store中，覆盖之前的数量值
				this.$store.commit("updateGoodsInfo",{
					id:this.goodsid,
					count:this.$refs.numbox.value
				})
				
			}
		},
		props:["initcount","goodsid"]
	}

</script>

<style lang="scss" scoped>
	.mui-numbox{
		width: 85px;
		height: 23px;
		padding: 0 25px;
		.mui-input-numbox{
			font-size: 10px;
			color: #000;
		}
		.mui-btn-numbox-minus{
			border-right: 1px solid #ccc;
		}
		.mui-btn-numbox-plus{
			border-left: 1px solid #ccc;
		}
		.mui-btn{
			width: 27px;
			background-color: #fff;
		}
	}
</style>
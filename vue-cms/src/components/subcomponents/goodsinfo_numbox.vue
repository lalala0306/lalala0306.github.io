<template>
	<!-- 使用watch属性监听，来监听父组件传递过来的max值不管watch会触发几次  但是最后一次肯定是合法的数值 -->
		<div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
			<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
			<input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox" />
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
				this.$emit('getcount',parseInt(this.$refs.numbox.value))
			}
		},
		props:["max"],
		watch:{
			//属性监听
			max:function(newVal,oldVal){
				mui(".mui-numbox").numbox().setOption("max",newVal)
			}
		}
	}

</script>

<style lang="scss" scoped>
	
</style>
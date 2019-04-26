<template>
<div>
	<mt-swipe :auto="4000" class="clearfix">
		<mt-swipe-item v-for="item in lunbotuList" :key="item.id">
			<img :src="item.url"  :class="{'full':isfull}">
		</mt-swipe-item>
	</mt-swipe>
</div>

</template>


<script>
	export default {
		data(){
			return{

			}
		},
		props:["lunbotuList","isfull"]
	}

</script>


<style lang="scss" scoped>
	.mint-swipe{
		height: 200px;
		.mint-swipe-item{
			/*&:nth-child(1){
				background-color: pink;
			};
			&:nth-child(2){
				background-color: green;
			};
			&:nth-child(3){
				background-color: blue;
			};*/
			text-align: center;
			img {
				/*width: 100%;*/
				height: 100%;
				display: block;
				
			}
		}
	}
	.full{
		width: 100%;
	}
</style>
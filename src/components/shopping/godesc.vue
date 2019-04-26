<template>
<div class="godesc-container">
	<h3>{{desc.title}}</h3>
	<hr>
	<div class="godesc-content" v-html="desc.content"></div>
</div>

</template>


<script>
	import { Toast } from 'mint-ui'
	export default {
		data(){
			return{
				desc:[]
			}
		},
		methods:{
			getDesc(){
				this.$http.get("src/components/data/desc.json").then(result=>{
					if (result.body.err_code===0) {
						this.desc = result.body.message[0]
					}else{
						Toast("加载轮播图失败。。")
					}
				})
			}
		},
		created(){
			this.getDesc()
		}
	}

</script>


<style lang="scss">
	.godesc-container{
		text-align: center;
		h3{
			color: #26a2ff;
			font-size: 16px;
		}
		.godesc-content{
			padding: 0 15px;
			img{
				width: 100%;
			}
		}
	}

</style>
<template>
	<div>
		<div class="pi-container">
			<h3>{{photoinfo.title}}</h3>
			<p class="subtitle">
				<span>发表时间：{{photoinfo.add_time | dateFormat}}</span>
				<span>点击：{{photoinfo.click}}次</span>
			</p>
			<hr>
			<!-- 缩略图区域 -->
			
			<vue-preview :slides="list" class="thunbs"></vue-preview>
		

			<!-- 图片内容区域 -->


			<div id="content" v-html="photoinfo.content"></div>



		</div>
		<!-- 评论子组件区域 -->
		<cmt-box :id="id"></cmt-box>
	</div>
</template>


<script>
	//导入评论子组件
	import comment from '../subcomponents/comment.vue'
	export default {
		data(){
			return{
				id:this.$route.params.id,//获取地址栏中的id
				photoinfo:[],
				list:[]
			}
		},
		methods:{
			getPhotoInfo(){
				this.$http.get("src/components/data/PhotoInfo.json").then(result=>{
					if (result.body.err_code===0) {
						this.photoinfo = result.body.message[this.id-1]
					}
				})
			},
			getThunbs(){
				//获取缩略图
				this.$http.get("src/components/data/imgPre.json").then(result=>{
					if (result.body.err_code===0) {
						result.body.message.forEach(item=>{
							//循环每个图片数据，补全宽和高
							item.w = 600;
							item.h = 400;
						})
						// 把完整的数据保存到list中
						this.list = result.body.message
					}
				})
			}
		},
		created(){
			this.getPhotoInfo(),
			this.getThunbs()
		},
		components:{
			'cmt-box':comment
		}
	}

</script>



<style lang="scss">
	.pi-container{
		padding:5px;
		h3 {
			color: #26a2ff;
			font-size: 15px;
			text-align: center;
			margin: 15px 0;
		}
		#content {
			font-size: 13px;
			color: #000;
			line-height: 30px;
		}
		.subtitle{
			display: flex;
			justify-content: space-between;
			font-size: 13px;
		}
		.thunbs{
			margin: 10px 0;
			text-align: left;
			padding: 0 0 0 5px;
			figure{
				width: 33.33%;
				margin: 0;
				padding: 0;
				display: inline-block;
			}
			img{
				width: 96%;
			
			}
		}

	}


</style>
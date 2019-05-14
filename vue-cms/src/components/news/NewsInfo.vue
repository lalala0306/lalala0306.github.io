<template>
	<div class="newsinfo-container">
		<div class="container">
			<h3 class="title">{{newsInfo.title}}</h3>
			<p class="subtitle">
				<span>发表时间：{{newsInfo.add_time | dateFormat}}</span>
				<span>点击次数：{{newsInfo.click}}次</span>
			</p>
			<div class="division"></div>
			<div class="content" v-html="newsInfo.content"></div>
		</div>
		<!-- 评论子组件区域 -->
		<comment-box :id="this.id"></comment-box>
	</div>

</template>


<script>
	//导入评论子组件
	import comment from '../subcomponents/comment.vue'
	import {Toast} from 'mint-ui'
	export default {
		data(){
			return{
				id:this.$route.params.id,
				newsInfo:{
						id:1,
						title:'古诗',
						add_time:new Date(),
						content:'<h4>静夜思</h4><h5>李白</h5><p>窗前明月光,</p><p>疑是地上霜。</p><p>举头望明月,</p><p>低头思故乡。</p>',
						click:1,
				},
			}
		},
		created(){
			this.getNewsInfo()
		},
		methods:{
			getNewsInfo(){
				this.$http.get("src/components/data/NewsInfo.json").then(result=>{
					if (result.body.err_code==0) {
						this.newsInfo = result.body.message[this.id-1]
					}else{
						Toast({
							message: '数据加载失败',
							duration: 1300
						})
					}
				})
			}
		},
		components:{//用来注册子组件节点
			'comment-box':comment
		}
	}

</script>


<style lang="scss" scoped>
	.newsinfo-container{
		.container{
			padding:0 15px;
		}
		.division{
			width: 100%;
			height: 1px;
			background-color: #ccc;
		}
		.title{
			font-size: 16px;
			text-align: center;
			margin: 15px 0;
			color: #000;
		}
		.subtitle{
			font-size: 13px;
			color: #222aff;
			display: flex;
			justify-content: space-between;
		}
		.content{
			padding-top: 15px;
			text-align: center;
		}
		.my-action-back{
			position: absolute;
			top: 8px;
			color: #fff;
			z-index: 101;
		}
	}

</style>
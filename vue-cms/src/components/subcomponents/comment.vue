<template>
<div class="comment-container">
	<div class="container">
		<h4>发表评论</h4>
		<hr>
		<textarea placeholder="请输入要评论的内容，最多120字" maxlength="120" v-model="msg"></textarea>
		<mt-button type="primary" size="large" plain @click="postComment">发表评论</mt-button>
		<ul class="mui-table-view">
			<li class=" mui-media" v-for="item in comments" :key="item.id">
				<a href="javascript:;">
					<img class="mui-media-object mui-pull-left" src="../../images/shuijiao.jpg">
					<div class="mui-media-body">
						{{item.user_name}}
						<p>{{item.content}}</p>
					</div>
				</a>
			</li>
		</ul>
		<mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
	</div>
</div>

</template>


<script>
	import {Toast} from "mint-ui"
	export default {
		data(){
			return {
				pageIndex:1, //默认展示第一页数据
				comments:[],
				msg:""
			}
		},
		created(){
			this.getComments()
		},
		methods:{
			getMore(){
				if (this.pageIndex < 2) {
					this.pageIndex++
					this.getComments()
				}else{
					Toast({
						message: '木有更多评论了',
						duration: 1300,
					})
				}
			},
			getComments(){
				this.$http.get("src/components/data/comment.json").then(result=>{
					if (result.body.err_code==0) {
						var commentss = result.body.message.filter(e => e.pageIndex==this.pageIndex)
						// this.comments = commentss
						//每当获取新评论数据时，不要把老数组清空覆盖，而是在老数据上拼接新数据
						this.comments = this.comments.concat(commentss)
					}else{
						Toast({
							message: '获取评论失败',
							duration: 800,
							position:'bottom'
						})
					}
				})
			},
			postComment(){//发表评论
				//校验是否为空内容
				if (this.msg.trim().length ===0) {
					return Toast({
						message: '请输入评论内容',
						duration: 1300,
					})
				}
				var cmt = {
					user_name:"匿名用户",
					add_time:Date.now(),
					content:this.msg.trim()//去除空格
				}
				this.comments.unshift(cmt)
				this.msg = ""
				console.log(this.msg)
			}
		},
		props:['id']
	}

</script>


<style lang="scss" scoped>
.comment-container{
	background-color: #f2f2f2;
	.container{
		padding: 25px 15px 10px 15px;
		textarea{
			height: 80px;
		}
		.mui-table-view:before,
		.mui-table-view:after{
			height: 0;
		}
	}
	.mui-table-view{
		margin: 10px 0;
		background-color: #f2f2f2;

	}
}


</style>
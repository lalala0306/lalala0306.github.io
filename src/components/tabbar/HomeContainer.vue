<template>
	<div>
		<my-swipe :lunbotuList="lunbotuList" :isfull="true"></my-swipe>
		<ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/news">
		                    <img src="../../images/2.gif" alt="">
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
		                    <img src="../../images/3.gif" alt="">
		                    <div class="mui-media-body">图片分享</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
		                    <img src="../../images/1.gif" alt="">
		                    <div class="mui-media-body">商品购买</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/4.gif" alt="">
		                    <div class="mui-media-body">留言反馈</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/5.gif" alt="">
		                    <div class="mui-media-body">视频专区</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/6.gif" alt="">
		                    <div class="mui-media-body">联系我们</div></a></li>
		        </ul> 
	<!-- 	<h1>HomeContainer</h1> -->
	</div>

</template>


<script>
	import { Toast } from 'mint-ui'
	import swipe from '../subcomponents/swipe.vue'
	export default {
		data(){
			return {
				lunbotuList:[],//保存轮播图的数组
			}
		},
		created(){
			this.getLunbotu()
		},
		methods:{
			getLunbotu(){//获取轮播图数据的方法http://127.0.0.1:523/api/getimg
				this.$http.get("src/components/data/lunbotu.json").then(result=>{
					// console.log(result.body);
					if (result.body.err_code==0) {//成功了
						this.lunbotuList = result.body.message
					}else {//失败了
						Toast("加载轮播图失败。。")
					}
				});
				
			}
		},
		components:{
			'my-swipe':swipe
		}
	}

</script>


<style lang="scss" scoped>
	.mint-swipe{
		height: 200px;
		.mint-swipe-item{
			&:nth-child(1){
				background-color: pink;
			};
			&:nth-child(2){
				background-color: green;
			};
			&:nth-child(3){
				background-color: blue;
			};
			img {
				width: 100%;
				height: 100%;
				display: block;
				
			}
		}
	}
	.mui-grid-view.mui-grid-9 .mui-table-view-cell {
		width: 33.3%;
		float: left;
		border: none;
		img{
			width: 60%;
		}
		.mui-media-body{
			font-size: 13px;
		}
	}
	.mui-grid-view.mui-grid-9 {
		border: none;
		background-color: #fff;
	}
	.clearfix::before,
	.clearfix::after{
		content: "020"; 
		display: block; 
		height: 0; 
		clear: both; 
		visibility: hidden; 
	}

</style>
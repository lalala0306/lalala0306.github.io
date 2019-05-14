<template>
	<div>
		<div class="mui-content">
			<div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a :class="['mui-control-item' ,item.id==0?'mui-active':'']" v-for="item in cates" :key="item.id" @tap="getList(item.id)">
							{{item.title}}
						</a>
					</div>
				</div>

			</div>
		</div>
		<!-- 图片列表区域 -->
		<ul class="photo-list">
			<router-link v-for="item in list" :key="item.id" tag="li" :to="'/home/photolist/photoinfo/'+item.id">
				<img v-lazy="item.img_url">
				<div class="info">
					<h1 class="info-title">{{item.title}}</h1>
					<div class="info-body">{{item.zhaiyao}}</div>
				</div>
			</router-link>
		</ul>
	</div> 
</template>
<script>
	const mui = require('../../lib/mui/js/mui.min.js')
	import {Toast} from 'mint-ui'
	export default {
		data(){
			return{
				cates:[],//分类列表数据
				list:[],//图片列表数据
			}
		},
		methods:{
			getAllCategory(){
				this.$http.get("src/components/data/PhotoList.json").then(result=>{
					if (result.body.err_code===0) {
						//手动拼接一个完整的分类列表
						result.body.message.unshift({id:0,title:'全部'})
						this.cates = result.body.message
					}
				})
			},
			getList(cateId){
				this.$http.get("src/components/data/imgList.json").then(result=>{
					if (result.body.err_code===0) {
						if (cateId!==0) {
							this.list = result.body.message.filter(e => e.cateId == cateId)
							if(this.list.length===0){
								Toast({
									message: '暂无图片',
									duration: 1300,
								})
							}
						}else{
							this.list = result.body.message
						}
						
					}else{
						Toast({
							message: '获取图片失败',
							duration: 1300,
						})
					}
				})
			}
		},
		mounted(){
			mui('.mui-scroll-wrapper').scroll({
				deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			});
		},
		created(){
			this.getAllCategory()
			this.getList(0)
		}
	}

</script>


<style lang="scss" scoped>
	* { 
		touch-action: pan-y; 
	}
	.photo-list{
		margin: 0;
		padding: 10px;
		padding-bottom: 0;
		li{
			background-color: #f2f2f2;
			list-style: none;
			text-align: center;
			margin-bottom: 10px;
			box-shadow: 0 0 8px #999;
			position: relative;
			img {
				width: 100%;
				display: block;
			}
		}
		img[lazy=loading] {
			width: 40px;
			height: 300px;
			margin: auto;
		}
		.info{
			position: absolute;
			bottom: 0;
			background-color: rgba(0,0,0,.4);
			color: #fff;
			width: 100%;
			max-height: 62px;
			overflow: hidden;
			text-align: left;
			.info-title{
				font-size: 14px;
			}
			.info-body{
				font-size: 13px;
			}
		}
	}
	
</style>
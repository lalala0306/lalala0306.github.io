<template>
	<div>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
				<router-link :to="'/home/newsinfo/'+item.id">
					<img class="mui-media-object mui-pull-left" :src="item.img_url">
					<div class="mui-media-body">
						<h2>{{item.title}}</h2>
						<p class='mui-ellipsis'>
							<span>发表时间：{{item.add_time | dateFormat}}</span>
							<span>点击：{{item.click}}次</span>
						</p>
					</div>
				</router-link>
			</li>
		</ul>
	</div>

</template>


<script>
	import {Toast} from 'mint-ui'
	export default {
		data(){
			return {
				newsList:[
					
				]
			}
		},
		created(){
			this.getList()
		},
		methods:{
			getList(){//获取列表数据
				this.$http.get("src/components/data/NewsList.json").then(result=>{
					if (result.body.err_code==0) {
						this.newsList = result.body.message
					}else{
						Toast({
							message: '数据加载失败',
							duration: 1300
						})
					}
				})
			}
		}
	}

</script>


<style lang="scss" scoped>
.mui-table-view{
	li{
		h2{
			font-size: 14px;
		}
		.mui-ellipsis{
			font-size: 12px;
			color: #222aff;
			display: flex;
			justify-content: space-between;
		}
	}
}
.my-action-back{
	position: absolute;
	top: 8px;
	color: #fff;
	z-index: 101;
}

</style>
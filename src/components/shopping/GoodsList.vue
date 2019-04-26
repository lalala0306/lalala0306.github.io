<template>
	<div class="goods-list">
		<div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
			<img :src="item.img_url" alt="">
			<h1 class="title">{{item.title}}</h1>
			<div class="info">
				<p class="price">
					<span class="now">￥{{item.sell_price}}</span>
					<span class="old">￥{{item.market_price}}</span>
				</p>
				<p class="sell">
					<span>热卖中</span>
					<span>剩{{item.stock_quantity}}件</span>
				</p>
			</div>
		</div>
		<mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
	</div>
</template>


<script>
	import {Toast} from 'mint-ui'
	export default {
		data(){
			return{
				pageIndex:1,
				goodslist:[]
			}
		},
		methods:{
			getGoodsList(){
				this.$http.get("src/components/data/GoodsList.json").then(result=>{
					if (result.body.err_code===0) {
						// this.goodslist = result.body.message.filter(e=>e.pageIndex==this.pageIndex)
						this.goodslist = this.goodslist.concat(result.body.message.filter(e=>e.pageIndex==this.pageIndex))
					}else{
						Toast({
							message: '获取商品列表失败',
							duration: 1300,
						})
					}
				})
			},
			getMore(){
				if (this.pageIndex < 2) {
					this.pageIndex++
					this.getGoodsList()
				}else{
					Toast({
							message: '没有更多商品了',
							duration: 1300,
						})
				}
			},
			goDetail(id){
				//使用js的形式进行路由导航
				// this.$router.push("/home/goodsinfo/" + id)
				// this.$router.push({ path: "/home/goodsinfo/" + id })
				this.$router.push({ name: 'goodsinfo', params: { id } })

			}
		},
		created(){
			this.getGoodsList()
		}
	}

</script>


<style lang="scss" scoped>
	.goods-list{
		display: flex;
		flex-wrap: wrap;/*换行*/
		padding: 7px;
		justify-content: space-between;
		.goods-item{
			width: 49%;
			border: 1px solid #ccc;
			box-shadow: 0 0 8px #ccc;
			margin: 4px 0;
			padding: 2px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;/*这三行样式把 让内容 贴上下两边对齐  中间自适应*/
			min-height: 326px;
			img {
				width: 100%;
			}
			.title{
				font-size: 14px;
			}
			.info{
				background-color: #eee;

				p{
					margin: 0;
					padding: 5px;
				}
				.price{
					.now{
						color: red;
						font-weight: bold;
						font-size: 16px;
					}
					.old{
						text-decoration: line-through;
						font-size: 12px;
						margin-left: 10px;
					}
				}
			}
			.sell{
				display: flex;
				justify-content: space-between;
				font-size: 12px;
			}
		}
	}

</style>
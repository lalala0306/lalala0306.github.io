<template>
<div class="shopcar-container">
	<div class="goods-list">
		<div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<div class="card-header">
						<mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
						@change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
						<h1>{{item.title}}</h1>
						<a href="#" class="del" @click.prevent="remove(item.id , i)">删除</a>
					</div>
					<div class="info">
						<img src="src/images/tebuxie.jpg" alt="">
						<div class="info-title">
							<span class="title">{{item.zhaiyao}}</span>
							<p>
								<span class="price">￥{{item.sell_price}}</span>
								<!-- 问题:如何从购物车中获取商品的数量呢 -->
								<!-- 我们可以先创建一个空对象，然后循环购物车中所有商品的数据。，把当前循环这条商品的的id作为对象的属性名，count值作为对象的属性值，这样当把所有的商品循环一遍，就会得到一个新对象：{1:2,2:2,3:1} -->
								<numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>



	<div class="mui-card my-card">
		<div class="mui-card-content">
			<div class="mui-card-content-inner my-card-content">
				<p>合计:<span>￥{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
				<mt-button type="danger" size="small" class="my-button">结算({{$store.getters.getGoodsCountAndAmount.count}})</mt-button>
			</div>
		</div>
	</div>


</div>

</template>


<script>
	import {Toast} from 'mint-ui'
	import numbox from '../subcomponents/shopcar_numbox.vue'	
	export default {
		data(){
			return{
				goodslist:[]//购物车中所有商品的数据
			}
		},
		methods:{
			getGoodList(){
				var idArr = []
				this.$store.state.car.forEach(item=>idArr.push(item.id))
				//如果购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
				if (idArr.length<=0){
					Toast("购物车空空如也")
					return;
				}
				this.$http.get("src/components/data/shopcar.json").then(result=>{
					if (result.body.err_code===0) {
						idArr.forEach(item =>{
							this.goodslist = this.goodslist.concat(result.body.message.filter(e=>e.id==item))
						})
					}else{
						Toast({
							message: '获取商品列表失败',
							duration: 1300,
						})
					}
				})
			},
			remove(id,index){
				this.goodslist.splice(index,1)
				this.$store.commit('removeFormCar',id)
			},
			selectedChanged(id,val){
				// console.log({id,selected:val})
				this.$store.commit('upateGoodsSelected',{id,selected:val})
			}
		},
		created(){
			this.getGoodList()
		},
		components:{
			numbox
		}
	}

</script>


<style lang="scss" scoped>
	.shopcar-container{
		background-color: #f2f2f2;
		overflow-y: hidden;
		transform: none;
		margin-bottom: 38px;
		.goods-list{
			.mui-card{
				border-radius: 15px;
			}
			.mui-card-content-inner{
				.card-header{
					display: flex;
					align-items: center;
					margin-bottom: 20px;
					position: relative;
					h1{
						font-size: 13px;
						margin-left: 15px;
					}
					.del{
						position: absolute;
						right: 0;
					}
				}
				
			}
			img{
				height: 100px;
				margin-left: 67px;
			}
			.info{
				display: flex;
				justify-content: space-between;
				.info-title{
					width: 100%;
					position: relative;
					margin-left: 10px;
				}
				p{
					display: flex;
					justify-content: space-between;
					width: 100%;
					position: absolute;
					bottom: 0;
				}
				@media (max-width: 320px) {
					p{
						display: block;
					}
				}
				.price{
					color: red;
					font-weight: bold;
				}
				.title{
					font-size: 12px;
					text-overflow:ellipsis;
					overflow: hidden;
					height: 40px;
					display: block;
				}
			}
		}
		.my-card{
			position: fixed;
			width: 100%;
			bottom: 50px;
			left: 0;
			border-top: 1px solid #ccc;
			box-shadow: none;
			margin: 0;
			height: 40px;
			.my-card-content{
				display: flex;
				justify-content: flex-end;
				padding: 2px 10px;
				text-align: right;
				p{
					display: inline-block;
					margin: auto 8px;
					span {
						color: red;
					}
				}
				.my-button{
					margin: auto 0;
					background-color: orangered;
   					border-radius: 20px;
				}
			}
		}
	}

</style>
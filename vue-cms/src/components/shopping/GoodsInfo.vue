<template>
	<div class="goodsinfo-content">
		<transition
		@before-enter="beforeEnter"
		@enter="enter"
		@after-enter="afterEnter">
			<div class="ball" v-show="ballFlag" ref="ball"></div>
		</transition>
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner my-card-content">
					<my-swipe :lunbotuList="lunbotuList" :isfull="false"></my-swipe>
				</div>
			</div>
		</div>
		<div class="mui-card">
			<div class="mui-card-header">{{goodsinfo.title}}</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p class="price">
						市场价：<del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{goodsinfo.sell_price}}</span>
					</p>
					<p>购买数量：<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
					<p>
						<mt-button type="primary" size="small">立即购买</mt-button>
						<mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
					</p>
				</div>
			</div>
		</div>
		<div class="mui-card">
			<div class="mui-card-header">商品参数</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p>商品货号：{{goodsinfo.goods_no}}</p>
					<p>库存情况：{{goodsinfo.stock_quantity}}</p>
					<p>上架时间：{{goodsinfo.add_time}}</p>
				</div>
			</div>
			<div class="mui-card-footer">
				<mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
				<mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
			</div>
		</div>
	</div>

</template>


<script>
	import { Toast } from 'mint-ui'
	import swipe from '../subcomponents/swipe.vue'
	import numbox from '../subcomponents/goodsinfo_numbox.vue'
	export default {
		data(){
			return{
				lunbotuList:[],
				id:this.$route.params.id,
				goodsinfo:[] ,
				ballFlag:false,//控制小球隐藏和显示标识
				selectedCount:1,//保存用户选中的商品数量，默认认为用户买一个
			}
		},
		methods:{
			getLunbotu(){//获取轮播图数据的方法http://127.0.0.1:523/api/getimg
				this.$http.get("src/components/data/lunbotu.json").then(result=>{
					// console.log(result.body);
					if (result.body.err_code==0) {//成功了
						this.lunbotuList = result.body.message.filter(e=>e.class==this.id)
					}else {//失败了
						Toast("加载轮播图失败。。")
					}
				});
				
			},
			getGoodsInfo(){
				this.$http.get("src/components/data/GoodsInfo.json").then(result=>{
					if(result.body.err_code===0){
						this.goodsinfo = result.body.message[this.id-1]
					}else{
						Toast("数据获取失败。。")
					}
				})
			},
			goDesc(id){
				this.$router.push({name:'godesc',params:{id}})
			},
			goComment(id){
				this.$router.push({name:'gocomment',params:{id}})
			},
			addToShopCar(){
				//添加到购物车
				this.ballFlag = !this.ballFlag
				//{id:商品的id,count:要购买的数量,price:商品的单价,selected:false}
				//拼接出一个，要保存到store中car数组里的商品信息对象
				var goodsinfo = {
					id:this.id,
					count:this.selectedCount,
					peice:this.goodsinfo.sell_price,
					selected:true
				}
				//调用store中的mutations来将商品加入购物车
				this.$store.commit("addToCar",goodsinfo)
			},
			beforeEnter(el){
				el.style.transform = "translate(0,0)"
			},
			enter(el,done){
				el.offsetWidth
				//获取小球在页面中的位置
				const ballPosition = this.$refs.ball.getBoundingClientRect()
				// 获取徽标在页面中的位置
				const badgePosition = document.getElementById('badge').getBoundingClientRect()
				const xDist = badgePosition.left - ballPosition.left
				const yDist = badgePosition.top - ballPosition.top 
				el.style.transform = `translate(${xDist}px,${yDist}px)`
				el.style.transition = "all .7s cubic-bezier(.4,-0.3,1,.68)"
				done()
			},
			afterEnter(el){
				this.ballFlag = !this.ballFlag
			},
			getSelectedCount(count){
				//当子组件把选中的数量传递给父组件上的时候，把选中的值保存到data中
				this.selectedCount = count
				// console.log(this.selectedCount)
			}
		},
		components:{
			'my-swipe':swipe,
			numbox
		},
		created(){
			this.getLunbotu(),
			this.getGoodsInfo()
		}
		
	}

</script>


<style lang="scss" scoped>
	.goodsinfo-content{
		background-color: #f2f2f2;
		overflow: hidden;
		.now_price{
			color: red;
			font-size: 16px;
			font-weight: bold;
		}
		.mui-card-footer{
			display: block;
			button{
				margin: 15px 0;
			}
		}
		.my-card-content{
			padding: 0;
		}
		.ball{
			width: 15px;
			height: 15px;
			border-radius: 50%;
			background-color: red;
			position: absolute;
			z-index: 100;
			top: 361px;
			left: 146px;
		}
	}

</style>
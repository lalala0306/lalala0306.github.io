<template>
<div class="gocomment-coment">
	<div class="keep"></div>
	<cmt></cmt>
</div>

</template>


<script>
	import cmt from '../subcomponents/comment.vue'
	export default {
		components:{
			cmt
		}
	}

</script>


<style lang="scss" scoped>
.gocomment-coment{
	.keep{
		background-color: #f2f2f2;
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: -3;
	}
}
</style>
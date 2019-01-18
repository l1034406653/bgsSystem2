<template>
	<el-container>
		<el-header class='header-menu'>公告详情</el-header>
		<el-main class='table-main noticeDetial'>
			<div class="box">
				<div class="title">{{noticeData.title}}</div>
				<div class="content" v-html="noticeData.content"></div>
			</div>
			<div class="box">
				<div class="title">{{noticeData.title}}</div>
				<div class="content" v-html="noticeData.english_content"></div>
			</div>
		</el-main>
	</el-container>
</template>
<script>
	export default {
		data() {
			return {
				noticeData:{
					content:"",
					title:"",
					english_content:"",
					english_title:"",
				}
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			init(){
				this.$axios({
					method: 'post',
					url: '/notice/getDetails',
					params: {
						id: this.$route.params.idNum,
					},
				}).then(res => {
					console.log(res);
					if(res.data.code==0){
						this.noticeData=res.data.data;
					}
				}).catch(res => {
					console.log(res)
				});
			}
		},
		
	}
</script>

<style scoped="scoped">
	.noticeDetial .title{
		width: 100%;
		text-align: center;
		font-size: 20px;
		line-height: 40px;
		color: #666;
	}
	.noticeDetial .content{
		width: 100%;
		height: auto;
		padding-bottom: 20px;
		font-size: 16px;
		color: #666;
	}
</style>
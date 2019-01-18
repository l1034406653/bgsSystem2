<template>
	<el-container>
		<el-header class='header-menu'>用户反馈列表</el-header>
		<el-main class='table-main'>
			<template>
				<el-table :data="feedbackList" style="width: 100%" stripe>
					<el-table-column prop="time" label="时间">
					</el-table-column>
					<el-table-column prop="name" label="姓名">
					</el-table-column>
					<el-table-column prop="mobile" label="手机号">
					</el-table-column>
					<el-table-column prop="title" label="标题">

					</el-table-column>
					<el-table-column label="状态">
						<template slot-scope="scope">
							<span v-if='scope.row.state==1'>已处理</span>
							<span v-if='scope.row.state==0'>未处理</span>
						</template>
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini" type='success' @click="handleDeal(scope.row.id)" v-if='scope.row.state==0'>处理</el-button>
							<el-button size="mini" type='primary' @click="handleDetails(scope.row.id)">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
			<div class="pagination-box">
				<el-pagination @current-change="handleCurrentChange" :current-page.sync="pFeedbackListData.page" :page-size="pFeedbackListData.page_size" layout="prev, pager, next, jumper" :total="totalCount">
				</el-pagination>
			</div>
		</el-main>
	</el-container>
</template>
<script>
	export default {
		data() {
			return {
				pFeedbackListData: {
					page: 1,
					page_size: 10,
				},
				feedbackList: [],
				totalCount: 10,
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				this.$axios({
					method: 'post',
					url: '/feedback/getFeedbackList',
					params: this.pFeedbackListData,
				}).then(res => {
					console.log(res);
					if(res.data.code == 0) {
						this.feedbackList = res.data.data.list;
						this.totalCount = res.data.data.count;
					}
				}).catch(res => {
					console.log(res)
				});
			},
			handleCurrentChange(page) {
				this.pFeedbackListData.page = page;
				this.init();
			},
			handleDeal(idNum) {
				this.$confirm('确定改反馈的状态吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios({
						method: 'post',
						url: '/feedback/handleFeedback',
						params: {
							id: idNum
						},
					}).then(res => {
						if(res.data.code != 0)
							return this.$message(res.data.msg);
						this.$message('操作成功');
						this.init();
					}).catch(res => {
						console.log(res)
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消操作'
					});
				});
			},
			handleDetails(idNum) {
				this.$axios({
					method: 'post',
					url: '/feedback/getFeedbackDetails',
					params: {
						id: idNum
					},
				}).then(res => {
					if(res.data.code != 0)
						return this.$message(res.data.msg);
					this.$alert('<p>'+res.data.data.details+'</p>', res.data.data.title, {
						dangerouslyUseHTMLString: true
					}).then(res => {

					}).catch(res => {

					});
				}).catch(res => {
					console.log(res)
				});

			},

		},
	}
</script>

<style scoped="scoped">

</style>
<template>
	<el-container>
		<el-header class='header-menu'>公告列表</el-header>
		<el-main class='table-main'>
			<div class="search-box">
				<el-button @click="navNoticeAdd('new')">新增公告</el-button>
			</div>
			<template>
				<el-table :data="noticeList" style="width: 100%" stripe>
					<el-table-column prop="id" label="序号">
					</el-table-column>
					<el-table-column prop="time" label="发布时间">
					</el-table-column>
					<el-table-column prop="title" label="标题">
					</el-table-column>
					<el-table-column prop="state" label="状态">
					</el-table-column>
					<el-table-column label="操作" width='360'>
						<template slot-scope="scope">
							<el-button size="mini" type="primary" @click="handleDetail(scope.row.id)">查看</el-button>
							<el-button size="mini" type="success" @click="handleChangeState(scope.row.id,0)" v-if='scope.row.state!=0'>恢复</el-button>
							<el-button size="mini" type="warning" @click="handleChangeState(scope.row.id,1)" v-if='scope.row.state!=1'>隐藏</el-button>
							<el-button size="mini" type="info" @click="navNoticeAdd(scope.row.id)">修改</el-button>
							<el-button size="mini" type="danger" @click="handleChangeState(scope.row.id,2)" v-if='scope.row.state!=2'>删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
			<div class="pagination-box">
				<el-pagination @current-change="handleCurrentChange" :current-page.sync="pNoticeData.page" :page-size="pNoticeData.page_size" layout="prev, pager, next, jumper" :total="totalCount">
				</el-pagination>
			</div>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				pNoticeData: {
					page: 1,
					page_size: 10,
				},
				noticeList: [],
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
					url: '/notice/getNotice',
					params: this.pNoticeData,
				}).then(res => {
					if(res.data.code == 0) {
						this.noticeList = res.data.data.list;
						this.totalCount = res.data.data.count;
					}
				}).catch(res => {
					console.log(res)
				});
			},
			handleChangeState(idNum, stateNum) {
				let hintMessage = '';
				if(stateNum == 0) {
					hintMessage = "你确定要恢复该公告吗？"
				} else if(stateNum == 1) {
					hintMessage = "你确定要隐藏该公告吗？"
				} else if(stateNum == 2) {
					hintMessage = "你确定要删除该公告吗？"
				}
				this.$confirm(hintMessage, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios({
						method: 'post',
						url: '/notice/updateNotice',
						data: {
							id: idNum,
							state: stateNum,
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
			handleDetail(id) {
				console.log(id);
				this.$router.push({
					name: "NoticeDetail",
					params: {
						'idNum': id
					},
				})
			},
			navNoticeAdd(id) {
				this.$router.push({
					name: "NoticeAdd",
					params: {
						'idNum': id
					},
				})
			},
			handleCurrentChange(page) {
				this.pNoticeData.page = page;
				this.init();
			},
		},
		activated() {
			if(this.$route.params.changed) {
				this.init()
			}
		}
	}
</script>

<style scoped="scoped">
	.headPhoto {
		width: 60px;
		height: 60px;
		display: inline-block;
	}
	
	.realName-box {
		width: 800px;
		height: auto;
		position: fixed;
		top: 100px;
		left: 50%;
		margin-left: -400px;
		background: #fff;
		z-index: 10001;
		box-shadow: 0px 0px 10px #ddd;
		padding: 40px;
	}
	
	.realNameHide {
		position: absolute;
		right: 14px;
		top: 14px;
		width: 30px;
		height: 30px;
		color: #aaa;
		font-size: 26px;
		line-height: 30px;
		text-align: center;
		cursor: pointer;
	}
</style>
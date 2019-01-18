<template>
	<el-container>
		<el-header class='header-menu'>{{title}}</el-header>
		<el-main class="table-main">
			<div class="notileAddTitle">
				<p>中文标题</p>
				<input type="text" placeholder="请填写公告标题" v-model="pAddNoticeData.title" />
			</div>
			<div class="notileAddTitle">
				<p>中文内容</p>
				<quill-editor v-model="pAddNoticeData.content" ref="myQuillEditor" :options="editorOptionC">
				</quill-editor>
			</div>
			<div class="notileAddTitle">
				<p>英文标题</p>
				<input type="text" placeholder="请填写公告标题" v-model="pAddNoticeData.english_title" />
			</div>
			<div class="notileAddTitle">
				<p>英文内容</p>
				<quill-editor v-model="pAddNoticeData.english_content" ref="myQuillEditorE" :options="editorOptionE">
				</quill-editor>
			</div>
			<el-button @click="handleSubmit" class="submitBtn">提交</el-button>
		</el-main>
	</el-container>
</template>
<script>
	import { quillEditor } from 'vue-quill-editor'
	export default {
		data() {
			return {
				title: "新增公告",
				editorContentC: null,
				editorOptionC: {},
				editorContentE: null,
				editorOptionE: {
					modules: {
						toolbar: [
							['bold', 'italic', 'underline', 'strike'],
							['blockquote', 'code-block'],
							[{
								'header': 1
							}, {
								'header': 2
							}],
							[{
								'list': 'ordered'
							}, {
								'list': 'bullet'
							}],
							[{
								'script': 'sub'
							}, {
								'script': 'super'
							}],
							[{
								'indent': '-1'
							}, {
								'indent': '+1'
							}],
							[{
								'direction': 'rtl'
							}],
							[{
								'size': ['small', false, 'large', 'huge']
							}],
							[{
								'header': [1, 2, 3, 4, 5, 6, false]
							}],
							[{
								'font': []
							}],
							[{
								'color': []
							}, {
								'background': []
							}],
							[{
								'align': []
							}],
							['clean'],
							['link']
						],
					}
				},
				pAddNoticeData: {
					title: "",
					content: "",
					english_title: "",
					english_content: "",
				}
			}
		},
		mounted() {
			let idNum = this.$route.params.idNum;
			console.log(this.$route.params.idNum);
			if(idNum && idNum != 'new') {
				this.$axios({
					method: 'post',
					url: '/notice/getDetails',
					data: {
						id: idNum
					},
				}).then(res => {
					console.log(res);
					if(res.data.code == 0) {
						this.title = "修改公告";
						this.pAddNoticeData = res.data.data;
					}
				}).catch(res => {
					console.log(res)
				});
			} else {
				this.title = "新增公告";
				this.pAddNoticeData = {
					title: "",
					content: "",
					english_title: "",
					english_content: "",
				};
			}
		},
		methods: {
			handleSubmit() {
				if(!this.pAddNoticeData.title.length > 0)
					return this.$message('中文标题不能为空');
				if(!this.pAddNoticeData.content.length > 0)
					return this.$message('中文内容不能为空');
				if(!this.pAddNoticeData.english_title.length > 0)
					return this.$message('英文标题不能为空');
				if(!this.pAddNoticeData.english_content.length > 0)
					return this.$message('英文内容不能为空');
				if(this.pAddNoticeData.id) {
					console.log(this.pAddNoticeData);
					this.$axios({
						method: 'post',
						url: '/notice/updateNotice',
						params: this.pAddNoticeData,
					}).then(res => {
						if(res.data.code != 0)
							return this.$message(res.data.msg)
						this.$message(res.data.msg);
						this.$router.push({
							name: "NoticeList",
							params: {
								changed: true
							},
						})
					}).catch(res => {
						console.log(res)
					});
				} else {
					this.$axios({
						method: 'post',
						url: '/notice/addNotice',
						params: this.pAddNoticeData,
					}).then(res => {
						if(res.data.code != 0)
							return this.$message(res.data.msg)
						this.$message(res.data.msg);
						this.$router.push({
							name: "NoticeList",
							params: {
								changed: true
							},
						})
					}).catch(res => {
						console.log(res)
					});
				}
			},
			handleFileChange(event) {
				let that = this;
				let imgFile = event.currentTarget.files[0];
				if(/image\/\w+/.test(imgFile.type)) {
					let reader = new FileReader();
					reader.readAsDataURL(imgFile);
					reader.onload = function(e) {
						let base64 = this.result.split(';base64,')[1];
						that.$axios({
							method: 'post',
							url: '/api/test/upload',
							data: {
								pic: base64,
							},
						}).then(res => {
							console.log(res);
						}).catch(res => {
							console.log(res)
						});
						
					}
				}
			},
		},
		
	}
</script>
<style>
	.ql-container {
		min-height: 300px;
	}
	
	.notileAddTitle {
		width: 100%;
		height: auto;
		padding-bottom: 10px;
	}
	
	.notileAddTitle p {
		font-size: 16px;
		height: 40px;
		line-height: 40px;
	}
	
	.notileAddTitle input {
		width: 500px;
		height: 30px;
		border: 1px solid #ccc;
		text-indent: 20px;
	}
	
	.submitBtn {
		display: block;
		margin: 0 auto;
	}
</style>
<template>
	<el-container class="mainPage">
		<el-aside width="200px" class="mainPage-left">
			<el-menu :default-active="$route.path" class="el-menu-vertical-demo" :unique-opened="isunique" :router="isrouter" text-color="#808080" active-text-color="#409eff">
				<el-menu-item index="/home/noticeList">
					<template slot="title">
						<span>一、</span>
						<span slot="title">公告列表</span>
					</template>
				</el-menu-item>
				<el-menu-item index="/home/feedbackList">
					<template slot="title">
						<span>二、</span>
						<span slot="title">用户反馈</span>
					</template>
				</el-menu-item>
			</el-menu>
		</el-aside>
		<el-main>
			<keep-alive>
				
				<router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				'routerPath': '/home/noticeList',
				'isunique': true,
				'isrouter': true,
			}
		},
		mounted() {},
	}
</script>

<style>
	.el-submenu .el-menu-item {
		min-width: 0;
	}
	
	.el-submenu .el-menu {
		width: 100%;
		overflow: hidden;
		color: #fff;
	}
	
	.mainPage-left {
		padding: 20px 4px;
		box-sizing: border-box;
	}
	
	.el-menu {
		border-right: none;
		background: transparent;
	}
	
	.el-menu li {
		width: 100%;
		border-radius: 5px;
		margin: 1px 0;
	}
	
	.el-menu-item:focus,
	.el-menu-item:hover {
		background: transparent !important;
	}
	
	.el-submenu__title:hover {
		background: transparent !important;
	}
	
	.el-submenu__title {
		border-radius: 5px;
		box-sizing: border-box;
	}
	
	.el-submenu__title i {
		color: #808080;
	}
	
	.mainPage {
		position: absolute;
		top: 61px;
		left: 0;
		bottom: 0;
		right: 0;
	}
	
	.mainPage-left {
		box-shadow: 4px 4px 10px #ddd;
	}
</style>
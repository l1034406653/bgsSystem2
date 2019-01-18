import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Home from '@/components/home'
import NoticeList from '@/components/home/noticeList'
import NoticeAdd from '@/components/home/noticeAdd'
import NoticeDetail from '@/components/home/noticeDetail'
import FeedbackList from '@/components/home/feedbackList'


Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'Login',
			component: Login
		},
		{
			path: '/home',
			name: 'Home',
			component: Home,
			redirect: '/home/noticeList',
			children: [
				/*公告列表*/
				{
					path: '/home/noticeList',
					name: 'NoticeList',
					component: NoticeList,
					meta: {
						keepAlive: true
					}
				},
				/*新增公告*/
				{
					path: '/home/noticeAdd',
					name: 'NoticeAdd',
					component: NoticeAdd,
					meta: {
						keepAlive: false
					}
				},
				/*公告详情*/
				{
					path: '/home/noticeDetail',
					name: 'NoticeDetail',
					component: NoticeDetail,
					meta: {
						keepAlive: false
					}
				},
				/*用户反馈*/
				{
					path: '/home/feedbackList',
					name: 'FeedbackList',
					component: FeedbackList,
					meta: {
						keepAlive: false,
					}
				},
				
			]
		},
	]
})
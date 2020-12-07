import Vue from 'vue'
import Router from 'vue-router'
import ViewJobs from '@/components/ViewJobs'
import PostJob from '@/components/PostJob'
import AppliedJobs from '@/components/AppliedJobs'
Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'PostJob',
			component: PostJob
		},
		{
			path: '/PostJob',
			name: 'PostJob',
			component: PostJob
		},
		{
			path: '/ViewJobs',
			name: 'ViewJobs',
			component: ViewJobs
		},
		{
			path: '/AppliedJobs',
			name: 'AppliedJobs',
			component: AppliedJobs
		}
	]
})

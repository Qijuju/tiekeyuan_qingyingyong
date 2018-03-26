import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index/Index'   // 首页
import BusinessLine from '../components/BusinessLine/BusinessLine'   // 营业线
import NearBusinessLine from '../components/NearBusinessLine/NearBusinessLine'   // 邻近营业线
import NonBusinessLine from '../components/NonBusinessLine/NonBusinessLine'   // 非营业线
import Statistics from '../components/Statistics/Statistics'   // 统计
import BSearch from '../components/BusinessLine/Search'
import DayPlanDetail from '../components/BusinessLine/DayPlanDetail'
import BusinessDetail from '../components/BusinessLine/Detail'

// 已办流程
import DoWork from '../components/dowork/DoWork'
import DoWorkSearch from '../components/dowork/DoWorkSearch'
import DoWorkScreen from '../components/dowork/DoWorkScreen'
// 我发起的流程
import ICreate from '../components/icreate/ICreate'
import ICreateSearch from '../components/icreate/ICreateSearch'
import ICreateScreen from '../components/icreate/ICreateScreen'
//现场施工动态
import SiteDynamic from '../components/dynamic/SiteDynamic' //动态
import SignIn from '../components/dynamic/SignIn' //签到
import SiteStatistical from '../components/dynamic/SiteStatistical' //统计
import SiteDetails from '../components/dynamic/SiteDetails' //详情列表
import SiteDetail from '../components/dynamic/SiteDetail' //详情

Vue.use(VueRouter)
// 返回上一个页面

const router = new VueRouter({
	routes: [{
		path: '/SiteDynamic',
    name: 'SiteDynamic',
		component: SiteDynamic
	},{
		path: '/BusinessLine',
    name: 'BusinessLine',
		component: BusinessLine
	},{
    path: '/BusinessLine/DayPlanDetail', // 搜索详情页
    name: 'DayPlanDetail',
    component: DayPlanDetail
  },{
    path: '/BusinessLine/Search', // 营业线搜索页
    name: 'BSearch',
    component: BSearch
  },{
    path: '/BusinessLine/Detail', // 营业线详情页
    name: 'BusinessDetail',
    component: BusinessDetail
  },
  // 已办流程
  {
		path: '/DoWork',
    name: 'DoWork',
		component: DoWork
  },
  {
    path: '/DoWorkScreen',
    name: 'DoWorkScreen',
    component: DoWorkScreen
  },
  {
    path: '/DoWorkSearch',
    name: 'DoWorkSearch',
    component: DoWorkSearch
  },
  // 我发起的流程
  {
		path: '/ICreate',
    name: 'ICreate',
		component: ICreate
  },
  {
    path: '/ICreateScreen',
    name: 'ICreateScreen',
    component: ICreateScreen
  },
  {
    path: '/ICreateSearch',
    name: 'ICreateSearch',
    component: ICreateSearch
  },
  // // 现场施工动态-动态
  // {
	// 	path: '/SiteDynamic',
  //   name: 'SiteDynamic',
	// 	component: SiteDynamic
  // },
  // 现场施工动态-签到
  {
    path: '/SignIn',
    name: 'SignIn',
    component: SignIn
  },
  // 现场施工动态-统计
  {
    path: '/SiteStatistical',
    name: 'SiteStatistical',
    component: SiteStatistical
  },
// 现场施工动态-详情列表
{
  path: '/SiteDetails',
  name: 'SiteDetails',
  component: SiteDetails
},
  // 现场施工动态-详情
  {
    path: '/SiteDetail',
    name: 'SiteDetail',
    component: SiteDetail
  },
  {
    path: '/NearBusinessLine',
    name: 'NearBusinessLine',
    component: NearBusinessLine
  },{
    path: '/NonBusinessLine',
    name: 'NonBusinessLine',
    component: NonBusinessLine
  },{
    path: '/Statistics',
    name: 'Statistics',
    component: Statistics
  },{
		path: '*',
    redirect: '/SiteDynamic'
	}]
})

export default router

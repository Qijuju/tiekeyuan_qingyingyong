import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index/Index'   // 首页
import Detail from '../components/Index/Detail'   // 首页
import BasicInformationSearch from '../components/BasicInformation/BasicInformationSearch'
import BasicInformationIndex from '../components/BasicInformation/BasicInformationIndex'
import BasicInformationDetail from '../components/BasicInformation/BasicInformationDetail'
import OperationConditionList from '../components/OperationCondition/OperationConditionList'
import OperationConditionIndex from '../components/OperationCondition/OperationConditionIndex'
import OperationConditionSearch from '../components/OperationCondition/OperationConditionSearch'
import OperationConditionDetail from '../components/OperationCondition/OperationConditionDetail'
import OperationConditionSave from '../components/OperationCondition/OperationConditionSave'
import OperationConditionHistory from '../components/OperationCondition/OperationConditionHistory'
// 待办流程
import ToDoWork from '../components/todowork/ToDoWork'
import ToDoWorkSearch from '../components/todowork/ToDoWorkSearch'
import ToDoWorkScreen from '../components/todowork/ToDoWorkScreen'
// 已办流程
import DoWork from '../components/dowork/DoWork'
import DoWorkSearch from '../components/dowork/DoWorkSearch'
import DoWorkScreen from '../components/dowork/DoWorkScreen'
// 我发起的流程
import ICreate from '../components/icreate/ICreate'
import ICreateSearch from '../components/icreate/ICreateSearch'
import ICreateScreen from '../components/icreate/ICreateScreen'

Vue.use(VueRouter)

const router = new VueRouter({
	routes: [{
		path: '/Index',
    name: 'Index',
		component: Index
	},{
    path: '/BasicInformation/BasicInformationSearch', // 基础信息搜索
    name: 'BasicInformationSearch',
    component: BasicInformationSearch
  },{
    path: '/BasicInformation/BasicInformationIndex', // 基础信息首页
    name: 'BasicInformationIndex',
    component: BasicInformationIndex
  },{
    path: '/BasicInformation/BasicInformationDetail/:id', // 基础信息首页
    name: 'BasicInformationDetail',
    component: BasicInformationDetail
  },{
    path: '/OperationCondition/OperationConditionList', // 基础信息首页
    name: 'OperationConditionList',
    component: OperationConditionList
  },{
    path: '/OperationCondition/OperationConditionIndex', // 基础信息首页
    name: 'OperationConditionIndex',
    component: OperationConditionIndex
  },{
    path: '/OperationCondition/OperationConditionHistory', // 基础信息首页
    name: 'OperationConditionHistory',
    component: OperationConditionHistory
  },{
    path: '/OperationCondition/OperationConditionSearch', // 基础信息首页
    name: 'OperationConditionSearch',
    component: OperationConditionSearch
  },{
    path: '/OperationCondition/OperationConditionSave', // 运行情况录入
    name: 'OperationConditionSave',
    component: OperationConditionSave
  },{
    path: '/OperationCondition/OperationConditionDetail', // 基础信息首页
    name: 'OperationConditionDetail',
    component: OperationConditionDetail
  },{
    path: '/ToDoWork',
    name: 'ToDoWork',
    component: ToDoWork
  },
    {
      path: '/ToDoWorkScreen',
      name: 'ToDoWorkScreen',
      component: ToDoWorkScreen
    },
    {
      path: '/ToDoWorkSearch',
      name: 'ToDoWorkSearch',
      component: ToDoWorkSearch
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
    {
      path: '/Index/Detail',
      name: '/Index/Detail',
      component: Detail
    },{
      path: '*',
      redirect: '/Index'
    }]
})

export default router

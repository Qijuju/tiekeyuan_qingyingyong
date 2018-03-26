import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home/Index'
import HomeSearch from '../components/Home/Search'
import HomeFifter from '../components/Home/Filter'
import HomeDetail from '../components/Home/Detail'
import AuthFailed from '../components/Home/AuthFailed'
import BasicInformationIndex from '../components/BasicInformation/BasicInformationIndex'
import BasicInformationDetail from '../components/BasicInformation/BasicInformationDetail'



Vue.use(VueRouter);

const router = new VueRouter({
	routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Home/search',
      name: 'HomeSearch',
      component: HomeSearch
    },
    {
      path: '/Home/filter',
      name: 'HomeFifter',
      component: HomeFifter
    },
    {
      path: '/Home/detail',
      name: 'HomeDetail',
      component: HomeDetail
    },
    {
      name: 'BasicInformationIndex',
      path: '/BasicInformation/BasicInformationIndex', // 统计列表页
      component: BasicInformationIndex
  },
    /*{
      name: 'BasicInformationDetail',
      path: '/BasicInformation/BasicInformationDetail/:gjysid/:xmmc', // 列表详情页
      component: BasicInformationDetail
  },*/
    {
      name: 'BasicInformationDetail',
      path: '/BasicInformation/detail', // 列表详情页
      component: BasicInformationDetail
    },
    {
      path: '/AuthFailed',
      name: 'AuthFailed',
      component: AuthFailed
    },
    {
      path: '*',
      redirect: '/Home'
    }
    ]
});

router.beforeEach((to, from, next) => {
  //console.dir(this);
  var _config =  Vue.prototype._GLOBAL
  if ((_config.baseUserId == '' || _config.loginId == '') && to.name != 'AuthFailed') {
  if(authUser(to.query)){
    next()
  }else{
    next('AuthFailed')
  }
} else {
  if(authUser(to.query)){
    //TODO
  }else{
    //TODO
  }
  next()
}

function authUser(params){
  if (params != null && params.userid != null && params.sessionid != null) {
    //todo auth
    var userid = params.userid
    var sessionid = params.sessionid
    Vue.prototype._GLOBAL.baseUserId = userid
    Vue.prototype._GLOBAL.loginId = sessionid
    return true
  }
  return false
}
});
router.afterEach((to, from) => {
});

export default router

/**
 * Created by Administrator on 2016/11/5.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import config from '../config'

Vue.use(Vuex)


Vue.prototype._GLOBAL = config

const store = new Vuex.Store({
  state: {
    projectCount:0,
    year:0,
    month:0,
    day:0,
    isPlay: true,
    listInfo: {
      songList: [],
      songIndex: 0
    },
    test:'我是初始化数据',
    businessLineSearch: {
      xmmc: ''
    },
    daysObj:[]
  },
  getters: {
    isPlay: state => state.isPlay,
    listInfo: state => state.listInfo,
    businessLineSearch: state => state.businessLineSearch,
    projectCount:state => state.projectCount,
    year:state => state.year,
    month:state => state.month,
    day:state =>state.day,
    daysObj:state =>state.daysObj
  },
  mutations: {
    isPlay: (state, flag) => {
      state.isPlay = flag
    },
    setListInfo: (state, {list, index}) => {
      state.listInfo.songList = list
      state.listInfo.songIndex = index
    },
    setBusinessLineSearch: (state, { xmmc}) => {
      state.businessLineSearch.xmmc = xmmc
    },
    setProjectCount:(state,{count,year,month,day}) =>{
      console.log("store的值变化吗："+count+':'+year+':'+month+':'+day);
      // 根据父组件传过来的年、月、和当前月的天数，循环遍历转换成汉字格式追加到 days 对象中。
      var tempArr=[];
      for (var i=1;i<=count;i++){
        var obj={};
        var dt = new Date(year,month, i);
        var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        var monthDay = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
        obj.day = i;
        obj.weekDay =weekDay[dt.getDay()]
        obj.monthDay = monthDay[dt.getMonth()-1];
        obj.showBg = (i===new Date().getDate())?true:false; //判断是都是今天，是为showBg=true,反之，showBg=false。

        tempArr.push(obj);
      }

      console.log("store的refyre："+JSON.stringify(state.daysObj));
      state.projectCount = count,
      state.year = year,
      state.month = month,
      state.day = day,
      state.daysObj = tempArr


    }
  },
  actions: {
    getSong({commit, state}, hash){
      commit('toggleAudioLoadding', true)
      axios.get(`/bproxy/yy/index.php?r=play/getdata&hash=${hash}`).then(({data}) => {
        data = data.data
        const songUrl = data.play_url
        const imgUrl = data.img
        const title = data.audio_name
        const songLength = data.timelength / 1000
        const singer = data.author_name
        const currentLength = 0;
        const lrc = data.lyrics
        const	audio = {songUrl, imgUrl, title, singer, songLength, currentLength}
        commit('setAudio', audio)
        commit('setLrc', lrc)
        commit('toggleAudioLoadding', false)
      })
    },
    prev({dispatch, state}){
      var list = state.listInfo.songList
      if (state.listInfo.songIndex == 0) {
        state.listInfo.songIndex = list.length
      } else {
        state.listInfo.songIndex--
      }
      var hash = list[state.listInfo.songIndex].hash
      dispatch('getSong', hash)
      dispatch('getLrc', hash)
    },
    next({dispatch, state}){
      var list = state.listInfo.songList
      if (state.listInfo.songIndex == list.length - 1) {
        state.listInfo.songIndex = 0
      } else {
        ++state.listInfo.songIndex
      }
      var hash = list[state.listInfo.songIndex].hash
      dispatch('getSong', hash)
      dispatch('getLrc', hash)
    }
  }
})

export default store

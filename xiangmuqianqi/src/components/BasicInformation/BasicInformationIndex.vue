<template>
  <div class="basic-information-search">
    <div class="basic-information-search-header" >
      <van-nav-bar title="项目前期" right-text="关闭" @click-right="onClickRight">
      </van-nav-bar>
    </div>
    <div class="mainB">

      <div class="divscroll">
        <ul id="title">
          <li>项目管理机构</li>
          <li>项目名称</li>
          <li>项目建议书</li>

          <li class="kyjd">
              <div>可研阶段</div>
              <ul>
                <li>地灾评估</li>
                <li>压矿评估</li>
                <li>土地预审</li>
                <li>规划选址</li>
                <li>环评批复</li>
                <li>水保批复</li>
                <li>社会稳定风险评估</li>
                <li>可研批复</li>
              </ul>
          </li>
          <li class="kyjd csjd">
            <div>初设阶段</div>
            <ul>
              <li>地震评估</li>
              <li>通航论证</li>
              <li>防洪评估</li>
              <li>节能评估</li>
              <li>文物保护</li>
              <li>林地使用审核同意书</li>
              <li>立交协议</li>
              <li>投资分摊协议</li>
              <li>初设批复</li>
            </ul>
          </li>
          <li class="kyjd sgtjdx">
            <div>施工图阶段性</div>
            <ul>
              <li>施工图审核招标</li>
              <li>施工图设计</li>
              <li>消防审核</li>
              <li>施工图审核</li>
              <li>审核报告批复</li>
            </ul>
          </li>
          <li class="kyjd kgzbjd">
            <div>开工准备阶段</div>
            <ul>
              <li>建设用地规划许可证</li>
              <li>建设用地批复</li>
              <li>征地拆迁协议</li>
              <li>三电拆迁协议</li>
              <li>施工监理招标</li>
              <li>开工报告报批复</li>
            </ul>
          </li>

          <!--<li>地灾评估</li>-->
          <!--<li>压矿评估</li>-->
          <!--<li>土地预审</li>-->
          <!--<li>规划选址</li>-->
          <!--<li>环评批复</li>-->
          <!--<li>水保批复</li>-->
          <!--<li>社会稳定风险评估</li>-->
          <!--<li>可研批复</li>-->

          <!--<li>地震评估</li>-->
          <!--<li>通航论证</li>-->
          <!--<li>防洪评估</li>-->
          <!--<li>节能评估</li>-->
          <!--<li>文物保护</li>-->
          <!--<li>林地使用审核同意书</li>-->
          <!--<li>立交协议</li>-->
          <!--<li>投资分摊协议</li>-->
          <!--<li>初设批复</li>-->

          <!--<li>施工图审核招标</li>-->
          <!--<li>施工图设计</li>-->
          <!--<li>消防审核</li>-->
          <!--<li>施工图审核</li>-->
          <!--<li>审核报告批复</li>-->

          <!--<li>建设用地规划许可证</li>-->
          <!--<li>建设用地批复</li>-->
          <!--<li>征地拆迁协议</li>-->
          <!--<li>三电拆迁协议</li>-->
          <!--<li>施工监理招标</li>-->
          <!--<li>开工报告报批复</li>-->

        </ul>

        <ul id="content" v-bind:style="{width: setWidth + 'px' }">
        <li>
          <table v-bind:style="{width:settableWidth+'px'}">
          <tr>
            <td v-for="item in baseInfoList" v-html="item.xmgljgmc"></td>
          </tr>
        </table>
        </li>
        <li>
          <table v-bind:style="{width:settableWidth+'px'}">
            <tr>
              <td v-for="item in baseInfoList" @click="handleRowHandle(item.xmqqid,item.allxmmc)" :class="[ item.xmqqid ? 'iscolor':0]" v-html="item.xmmc"></td>
            </tr>
          </table>
        </li>
        <li class="judge">

          <div id="judge" v-for="(item,index) in baseInfoList">
            <p v-for="itemss in item.xmqqxq">
              <span v-show="itemss.wczt == 0 ">√</span>
              <span v-show="itemss.wczt == 1 ">×</span>
              <span v-show="itemss.wczt == 2 ">-</span>
              <!--<span v-show="itemss.wczt != 0 & itemss.wczt != 1 & itemss.wczt != 2">。</span>-->
            </p>
          </div>
        </li>
      </ul>
    </div>
    </div>
  </div>

</template>

<script>
    import { NavBar,Toast,Waterfall } from 'vant'
    import $ from 'jquery'
    import axios from 'axios';

    export default {
      name: "basic-information-index",
      components: {
      },
      directives: {
        WaterfallLower: Waterfall('lower'),
      },
      data() {
        return {
          //初始化参数
          xmgljgmc:'',
          xmmc:'',
          allxmmc:'',
          xmqqxq:[],
          baseInfoList: [],
          xmqqid:'',
          setWidth:document.body.clientWidth-150,
          settableWidth:'2000',
        }
      },
      methods: {
        isEmptyObject(e) {
          var t;
          for (t in e)
            return !1;
          return !0
        },
        // 表头关闭按钮事件
        onClickRight() {
          RPM.closeApplication()
        },
        loadMore(){
            var url = 'http://tljjgxt.r93535.com/XmqqListServlet?userid='+this._GLOBAL.baseUserId;
            // var url = 'http://tljjgxt.r93535.com/XmqqListServlet?userid=223906';
            axios.get(url)
              .then(response => {
                var obj= response.data;
                var num = obj.length;
                this.settableWidth = num * 200;
                obj.forEach(function (value,index,array) {
                  for(var i = 0;i<29;i++){
                    if(!value.xmqqxq[i]){
                      value.xmqqxq[i] = '2';
                    }
                  }
                  value.allxmmc = value.xmmc;
                  if(value.xmmc.length>8){
                    value.xmmc = value.xmmc.slice(0,8)+"..."
                  }
                });
                for(var i in obj) {
                  this.baseInfoList.push(obj[i])
                }
              }).catch(err => {
              console.error(err.message)
            })
        },
        handleRowHandle(xmqqid,xmmc) {
          let query ={
            xmqqid:xmqqid,
            xmmc:xmmc
          };
          if(xmqqid){
            this.$store.commit('setStaticsObj',{xmmc:xmmc,xmqqid:xmqqid});
            this.$router.push({path:'/BasicInformation/detail',query: query});
          }else {
            return;
          }
        }
      },
      created(){
        this.loadMore();
      }
    }
</script>

<style scoped>
  .van-nav-bar{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
  }
.mainB{
  margin-top:44px;
}
  .divscroll{
    position: relative;
  }
  ul{
    position: absolute;
    /*top:44px;*/
    float: left;
    /*border: 1px solid #ccc;*/
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
  ul> li{
    text-align: center;
  }
  ul#title{
    left: 0px;
    width:154px;
    overflow: scroll;
    color: #909399;
    margin-bottom: 55px;
  }
  ul#title>li{
    height:46px;
    text-align: center;
    line-height: 46px;
    font-weight: bold;
    border-top:1px solid #ccc;
  }
  ul#title>li.kyjd{
    height:368px;
    text-align: left;
  }
  ul#title>li.csjd{
    height:413px;
    margin-top: 1px;
  }
  ul#title>li.sgtjdx{
    height: 230px;
  }
  ul#title>li.kgzbjd{
    height: 275px;
  }
  ul#title>li.kyjd div{
     display: inline-block;
     height:368px;
     width: 38px;
     line-height: 30px;
     padding: 123px 5px 0 5px;
     text-align: center;
     border-right: 1px solid #ccc;
  }
  ul#title>li.csjd div{
    height:413px;
  }
  ul#title>li.sgtjdx div{
    height: 229px;
    padding: 26px 5px 0px 5px;
  }
  ul#title>li.kgzbjd div{
    height: 274px;
    padding: 50px 5px 0px 5px;
  }
  ul#title>li.kyjd ul{
    display: inline-block;
    height:367px;
    width: 114px;
    border: 0;
  }
  ul#title>li.sgtjdx ul{
    height:229px;
  }
  ul#title>li.kgzbjd ul{
    height:274px;
  }
  ul#title>li.kyjd ul li{
    border-bottom: 1px solid #ccc;
    line-height: 45px;
    font-size: 12px;
  }
  ul#title>li.kyjd ul li:first-child{
    margin-top: 1px;
  }
  ul#title>li.csjd ul li:first-child{
    margin-top: 0;
  }
  ul#title>li.kyjd ul li:last-child{
    border-bottom: 0;
  }
  ul#content{
    left: 155px;
    margin-bottom: 55px;
    margin-left: -2px;
    /*margin-top:-1px;*/
    overflow: scroll;
    color: #606266;
  }
  ul#content>li{
    margin-left:-1px;
  }
  table{
    /*width:2000px;*/
  }
  table tr{
   border-top:1px solid #ccc;
   margin-top: -1px;
   margin-left: -1px;
 }
  table tr>td{
    width: 150px !important;
    height:46px;
    text-align: center;
    line-height: 46px;
    border: 0;
    border-left: 1px solid #ccc;
    margin-left: -1px;
  }
  table tr>td:first-child{
    border-left:0;
  }
  /* 判断 */
  ul#content>li.judge{
    margin-left:0px;
    width:2000px;
    margin-top: -1px;
    border-top:1px solid #ccc;
  }
  #judge{
    width:200px;
    float: left;
    /*border-left: 1px solid #ccc;*/
  }
  #judge>p{
    width:100%;
    height: 46px;
    line-height: 46px;
    /*border: 1px solid #ccc;*/
    border-bottom:1px solid #ccc;
    border-right:1px solid #ccc;
  }
  /*#judge>p:first-child{*/
    /*margin-top: -1px;*/
  /*}*/
  #judge:last-child>p{
    border-right: 0;
  }
  /*可点击样式*/
  .iscolor{
    color: rgb(0, 135, 232);
  }
</style>

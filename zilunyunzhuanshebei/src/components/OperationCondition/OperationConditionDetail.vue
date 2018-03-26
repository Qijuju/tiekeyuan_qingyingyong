<template>
  <div class="listDetail">
    <!--title-->
    <van-nav-bar
      title="自轮运转设备运行情况详情"
      left-text="返回" right-text="关闭"  @click-right="onClickRight"  @click-left="$router.go(-1)"
    ></van-nav-bar>
    <!--内容-->
    <div class="content">
      <van-row>
        <van-col span="8">项目名称</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.xmmc)'>{{totalData.xmmc}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">设备名称</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.sbmc)'>{{totalData.sbmc}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">设备型号</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.sbxh)'>{{totalData.sbxh}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">合格证编号</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.hgzbh)'>{{totalData.hgzbh}}</span>
        </van-col>
      </van-row><van-row>
        <van-col span="8">当日运行计划（命令号）</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.dryxjhmlh)'>{{totalData.dryxjhmlh}}</span>
        </van-col>
      </van-row><van-row>
        <van-col span="8">日期</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.rq)'>{{totalData.rq}}</span>
        </van-col>
      </van-row><van-row>
        <van-col span="8">作业内容</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.zynr)'>{{totalData.zynr}}</span>
        </van-col>
      </van-row><van-row>
        <van-col span="8">车辆作业地点</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.clzydd)'>{{totalData.clzydd}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">车辆停放地点</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.cltfdd)'>{{totalData.cltfdd}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">司机</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.sj)'>{{totalData.sj}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">副司机</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.fsj)'>{{totalData.fsj}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">上道时间</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.sdsj)'>{{totalData.sdsj}}</span>
        </van-col>
      </van-row><van-row>
        <van-col span="8">作业完成时间</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.zywcsj)'>{{totalData.zywcsj}}</span>
        </van-col>
      </van-row><van-row>
        <van-col span="8">GYK数据</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.gyksj)'>{{totalData.gyksj}}</span>
        </van-col>
      </van-row><van-row>
        <van-col span="8">运行区段</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.yxqd)'>{{totalData.yxqd}}</span>
        </van-col>
      </van-row><van-row>
        <van-col span="8">施工单位管理人员</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.sgdwglry)'>{{totalData.sgdwglry}}</span>
        </van-col>
      </van-row><van-row>
        <van-col span="8">监理单位跟班人员</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.jldwgbry)'>{{totalData.jldwgbry}}</span>
        </van-col>
      </van-row><van-row>
        <van-col span="8">防溜设施的配置</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.flsspz)'>{{totalData.flsspz}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="24">上道前设备检查情况</van-col>
        <!--<van-col span="16">
          <span @click='popupClick(totalData.sdqsbjcqk)'>{{totalData.sdqsbjcqk}}</span>
        </van-col>-->
      </van-row>
      <div class="img">
        <div v-for="path in sdqsbjcqkImgArr" class="photoBox">
          <img class="photo" :src="path" alt="logo" v-on:click="showBigImage($event)"/>
        </div>
        <div class="addPhoto" @click='phoneOrPicture()'>+</div>
      </div>
      <van-row>
        <van-col span="24">四方人员跟班情况</van-col>
        <!--<van-col span="16">
          <span @click='popupClick(totalData.sfrygbqk)'>{{totalData.sfrygbqk}}</span>
        </van-col>-->
      </van-row>
      <div class="img">
        <div v-for="path in sfrygbqkImgArr" class="photoBox">
          <img class="photo" :src="path" alt="logo" v-on:click="showBigImage($event)"/>
        </div>
        <!--编辑权限问题 -->
        <!--<div class="addPhoto" @click='phoneOrPicture()' v-if="totalData.editStatus===1" >+</div>-->
        <!--测试用-->
        <div class="addPhoto" @click='takePicture(1)' >+</div>
      </div>
      <van-row>
        <van-col span="24">现场作业照片</van-col>
        <!--<van-col>
          <span @click='popupClick(totalData.xczyzp)'>{{totalData.xczyzp}}</span>
        </van-col>-->
      </van-row>
      <div class="img">
        <div v-for="path in xczyzpImgArr" class="photoBox">
          <img class="photo" :src="path" alt="logo" v-on:click="showBigImage($event)"/>
        </div>
        <div class="addPhoto" @click='phoneOrPicture()'>+</div>
      </div>
      <van-row>
        <van-col span="24">设备停放后防溜及看守情况</van-col>
        <!--<van-col span="16">
          <span @click='popupClick(totalData.zbtfhksqk)'>{{totalData.zbtfhksqk}}</span>
        </van-col>-->
      </van-row>
      <div class="img">
        <div v-for="path in zbtfhksqkImgArr" class="photoBox">
          <img class="photo" :src="path" alt="logo" v-on:click="showBigImage($event)"/>
        </div>
        <div class="addPhoto" @click='phoneOrPicture()'>+</div>
      </div>
      <div v-show="zhbstatus">
      <van-row>
        <van-col span="8">建设单位发现的问题</van-col>
        <van-col span="16">
          <van-field
            v-model="jsdwfxwt"
            type="textarea"
            rows="3"
            autosize/>
          <!--<span @click='popupClick(totalData.jsdwfxwt)'>{{totalData.jsdwfxwt}}</span>-->
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">建设单位处理意见</van-col>
        <van-col span="16">
          <van-field
            v-model="jsdwclyj"
            type="textarea"
            rows="3"
            autosize/>
          <!--<span @click='popupClick(totalData.jsdwclyj)'>{{totalData.jsdwclyj}}</span>-->
        </van-col>
      </van-row>
      </div>
      <div v-show="jgcstatus">
      <van-row>
        <van-col span="8">建设处发现的问题</van-col>
        <van-col span="16">
          <van-field
            v-model="jscfxwt"
            type="textarea"
            rows="3"
            autosize/>
          <!--<span @click='popupClick(totalData.jscfxwt)'>{{totalData.jscfxwt}}</span>-->
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">建设处处理意见</van-col>
        <van-col span="16">
          <van-field
            v-model="jscclyj"
            type="textarea"
            rows="3"
            autosize/>
          <!--<span @click='popupClick(totalData.jscclyj)'>{{totalData.jscclyj}}</span>-->
        </van-col>
      </van-row>
      </div>
      <div v-show="zhbstatus|jgcstatus">
        <van-button size="large" type="primary" style="z-index: 100000" @click="update()">保存</van-button>
      </div>
      <!--弹出层-->
      <mt-popup
        v-model="popupVisible"
        popup-transition="popup-fade">
        <p>{{popupTxt}}</p>
      </mt-popup>
      <!--相册、拍照选择-->
      <mt-actionsheet
        :actions="actions"
        v-model="sheetVisible"
      >
      </mt-actionsheet>
    </div>
  </div>
</template>
<script>
  // 引入组件
  import Header from '../Common/Header'
  import $ from 'jquery'
  import { Dialog,Button,Row, Col,Field,Toast  } from 'vant';
  import axios from 'axios';

    export default {
      name: "operation-condition-detail",
      components: {
        Header
      },
      data(){
        return{
          sdqsbjcqkImgArr:[],
          sfrygbqkImgArr:[],
          xczyzpImgArr:[],
          zbtfhksqkImgArr:[],
          zhbstatus:false,
          jgcstatus:false,
          jsdwclyj:'',
          jsdwfxwt:'',
          jscfxwt:'',
          jscclyj:'',
          checked: true,
          id:this.$route.query.id,// 获取通过路由传的值
          type:0,
          totalData:[],
          popupVisible:false,
          popupTxt:'',
          sheetVisible:false, // 隐藏拍照、相册选择框
          actions:[
            {
              name:'拍照',
              method :function () {
                console.log("拍照事件")
              }
            },
            {
              name:'从相册中选择',
              method :function () {
                console.log("从相册中选择事件")
              }
            }
          ]
        }
      },
      methods:{
        isEmptyObject(e) {
          var t;
          for (t in e)
            return !1;
          return !0
        },
        onClickRight(){
          RPM.closeApplication();
        },
        onClickLeft(){
          this.$router.push({path: '/OperationCondition/OperationConditionIndex'})
        },
        phoneOrPicture() { // 拍照或从相册中选择
          console.log("拍照或从相册中选择--点击事件进来了吗？");
          this.sheetVisible = true;
        },
        popupClick(txt) { // popup弹出层点击事件
          this.popupVisible = true;
          this.popupTxt = txt;
        },
        onInput(checked) {
          Dialog.confirm({
            title: '提醒',
            message: '是否切换开关？'
          }).then(() => {
            this.checked = checked;
          });
        },
        getData(id){

          this.id=id
          var url='http://tljjgxt.r93535.com/ZlyzsbyxqkServlet?baseuserid='+this._GLOBAL.baseUserId+'&id='+id
          //let url = 'http://tljjgxt.r93535.com/YYXDayPlanUniqueServlet?id='+id+'&baseuserId=236215';
          this.$http.get(url).then((response) => {
            console.log("详情页面的数据：" + JSON.stringify(response.data.data[0]));
            if(response.data.jgcstatus==='1'){
              this.jgcstatus=true
              this.type=2
            }
            if(response.data.zhbstatus==='1'){
              this.zhbstatus=true
              this.type=1
            }
            /*以下两行调试用*/
            this.jgcstatus=true
            this.type=1
            this.totalData = response.data.data[0];
            if(!this.isEmptyObject(this.totalData)){
              this.jsdwclyj=this.totalData.jsdwclyj
              this.jsdwfxwt=this.totalData.jsdwfxwt
              this.jscfxwt=this.totalData.jscfxwt
              this.jscclyj=this.totalData.jscclyj
            }
          }, (response) => {
            console.log('error');
          });
        },
        update(){
          var url='http://tljjgxt.r93535.com/ZlyzsbYxqkUpdateServlet?id='+this.id+'&type='+this.type+'&jsdwclyj='+this.jsdwclyj+'&jsdwfxwt='+this.jsdwfxwt+'&jscfxwt='+this.jscfxwt+'&jscclyj='+this.jscclyj
          /*var query={
            id:this.id,
            type:this.type,
            jsdwclyj:this.jsdwclyj,
            jsdwfxwt:this.jsdwclyj,
            jscfxwt:this.jsdwclyj,
            jscclyj:this.jsdwclyj,
          }*/
          axios.get(url).then(response => {
            var isTrue= response.data.msg
            if(isTrue===true){
              const toast = Toast.success({
                duration: 0,       // 持续展示 toast
                forbidClick: true, // 禁用背景点击
                message: '保存成功'
              });
              let second = 1;
              const timer = setInterval(() => {
                second--;
                if (second) {
                  /*toast.message = `倒计时 ${second} 秒`;*/
                } else {
                  clearInterval(timer);
                  Toast.clear();
                }
              }, 1000);
              this.$router.push({path: '/OperationCondition/OperationConditionIndex'})
            }else{
              const toast = Toast.fail({
                duration: 0,       // 持续展示 toast
                forbidClick: true, // 禁用背景点击
                message: '保存失败'
              });
              let second = 1;
              const timer = setInterval(() => {
                second--;
                if (second) {
                  /*toast.message = `倒计时 ${second} 秒`;*/
                } else {
                  clearInterval(timer);
                  Toast.clear();
                }
              }, 1000);
            }
          }).catch(err => {
            console.error(err.message)
            console.log("保存数据失败");
          })
        }
      },
      mounted:function () {
        this.getData(this.$route.query.id),
        $('.van-col.van-col-8').each(function (i) {
          var txtL=$($('.van-col.van-col-8')[i]).text().length;
          if(txtL>7){
            $($('.van-col.van-col-8')[i]).addClass('wordBreak')
          }else {
            $($('.van-col.van-col-8')[i]).removeClass('wordBreak')
          }
        })
      },
      watch: {
        $route: function (to, from) {

          if(to.path==="/OperationCondition/OperationConditionDetail"){
            if(!this.isEmptyObject(to.query)){
              this.id=to.query.id
              this.getData(to.query.id)
            }
          }
        },
      },
    }
</script>

<style scoped>
  /* popup */
  .mint-popup{
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    padding:5px;
  }
  /* 照片 */
  .img{
    width:100%;
    height:100px;
    background: #e6e6e6;
  }
  img.photo{
    width: 50px;
    height:50px;
    margin:5px;
  }
  .addPhoto{
    display: inline-block;
    width:50px;
    height:50px;
    text-align: center;
    line-height:50px;
    background: #ccc;
    color: #9c9c9c;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    font-size:30px;
    margin:5px;
    border:1px dashed #9c9c9c;
  }
  /*.content{
    margin-top:44px;
  }*/

  /* 修改栅格样式 */
  .van-row{
    border-top:1px solid #ccc;
    border-bottom:1px solid #ccc;
    margin-top:-1px;
  }
  .van-col{
    height:44px;
    padding:0;
    line-height:44px;
    /* 折行显示 */
    white-space: normal;
    -ms-word-wrap: break-word;
    word-wrap: break-word;
    -ms-word-break: break-all;
    word-break: break-all;
  }
  .van-col:nth-child(odd){
    background: #E5F2FA;
    border-right:1px solid #ccc;
    text-align: center;
  }
  .van-col:nth-child(even){
    border-right:1px solid #ccc;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  /* 折行显示 */
  .van-col.wordBreak{
    line-height:22px;
  }
 /* @media screen and (min-width: 375px) {
    .van-col.wordBreak{
      line-height:44px;
    }
  }
  @media screen and (max-width: 375px) {
    .van-col.wordBreak{
      line-height:22px;
    }
  }*/


</style>

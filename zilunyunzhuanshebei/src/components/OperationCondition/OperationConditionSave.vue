<template>
  <div class="listDetail" >
    <van-nav-bar
      title="自轮运转设备运行情况录入"
      left-text="返回" right-text="关闭"  @click-right="onClickRight"  @click-left="$router.go(-1)"
    ></van-nav-bar>
    <!--内容-->
    <div class="content" style="height: 500px">
      <div @click="isShowHGZBH()">
      <van-row>
        <van-col>
          <van-field
            v-model="hgzbh"
            label="合格证编号"
            disabled
          /></van-col>
      </van-row>
      </div>
      <div v-show="showHGZBH">
      <van-row>
        <van-col>
          <van-picker :columns="hgzbhs"
                      :visible-item-count='visibleItemCount' v-bind:hgzbh="hgzbh" show-toolbar @cancel="closeAll"
                      @confirm="onHGZBHConfirm"/>
        </van-col>
      </van-row>
      </div>
      <van-row>
        <van-col>
          <van-field
          v-model="xmmc"
          label="项目名称"
          placeholder="请输入项目名称" disabled /></van-col>
        <!--<van-col span="8">项目名称</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.xmmc)'>{{totalData.xmmc}}</span>
        </van-col>-->
      </van-row>
      <van-row>
        <van-col><van-field
          v-model="sbmc"
          label="设备名称"
          placeholder="请输入设备名称" disabled/></van-col>
        <!--<van-col span="8">设备名称</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.sbmc)'>{{totalData.sbmc}}</span>
        </van-col>-->
      </van-row>
      <van-row>
        <van-col><van-field
          v-model="sbxh"
          label="设备型号"
          placeholder="请输入设备型号" disabled /></van-col>
        <!--<van-col span="8">设备型号</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.sbxh)'>{{totalData.sbxh}}</span>
        </van-col>-->
      </van-row>
      <van-row>
      <van-col><van-field
        v-model="dryxjhmlh"
        label="当日运行计划（命令号)"
        placeholder="请输入当日运行计划（命令号)"
        type="textarea"
        autosize
      /></van-col>
        <!--<van-col span="8">当日运行计划（命令号）</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.dryxjhmlh)'>{{totalData.dryxjhmlh}}</span>
        </van-col>-->
      </van-row><van-row>
      <van-col><van-field
        v-model="rq"
        label="日期"
        type="date"
        placeholder="请输入日期"/></van-col>
        <!--<van-col span="8">日期</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.rq)'>{{totalData.rq}}</span>
        </van-col>-->
      </van-row><van-row>
      <van-col><van-field
        v-model="zynr"
        label="作业内容"
        placeholder="请输入作业内容"/></van-col>
        <!--<van-col span="8">作业内容</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.zynr)'>{{totalData.zynr}}</span>
        </van-col>-->
      </van-row><van-row>
      <van-col><van-field
        v-model="clzydd"
        label="车辆作业地点"
        placeholder="请输入车辆作业地点"/></van-col>
        <!--<van-col span="8">车辆作业地点</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.clzydd)'>{{totalData.clzydd}}</span>
        </van-col>-->
      </van-row>
      <van-row>
        <van-col><van-field
          v-model="cltfdd"
          label="车辆停放地点"
          placeholder="请输入车辆停放地点"/></van-col>
        <!--<van-col span="8">车辆停放地点</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.cltfdd)'>{{totalData.cltfdd}}</span>
        </van-col>-->
      </van-row>
      <van-row>
        <van-col><van-field
          v-model="sj"
          label="司机"
          placeholder="请输入司机"/></van-col>
        <!--<van-col span="8">司机</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.sj)'>{{totalData.sj}}</span>
        </van-col>-->
      </van-row>
      <van-row>
        <van-col><van-field
          v-model="fsj"
          label="副司机"
          placeholder="请输入副司机"/></van-col>
        <!--<van-col span="8">副司机</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.fsj)'>{{totalData.fsj}}</span>
        </van-col>-->
      </van-row>
      <div @click="isShowSDSJ()">
      <van-row>
        <van-col><van-field
          v-model="sdsj"
          type="datetime"
          label="上道时间"
          placeholder="请输入上道时间" disabled  /></van-col>
      </van-row></div>
      <div v-show="showSDSj">
        <van-row>
          <van-datetime-picker
            :visible-item-count='visibleItemCount' show-toolbar @cancel="closeAll"
            @confirm="onSDSJConfirm"
            v-model="sdsj"
            type="time"/>
        </van-row>
      </div>
      <div @click="isShowZYWCSJ()">
      <van-row >
      <van-col>
        <van-field
        v-model="zywcsj"
        type="datetime"
        label="作业完成时间"
        placeholder="请输入作业完成时间" disabled/></van-col>
      </van-row></div>
      <div v-show="showZYWCSJ">
        <van-row>
          <van-datetime-picker
            :visible-item-count='visibleItemCount' show-toolbar @cancel="closeAll"
            @confirm="onZYWCSJConfirm"
            v-model="zywcsj"
            type="time"/>
        </van-row>
      </div>
        <van-row>
          <van-col span="8">GYK数据</van-col>
          <van-col span="16"><van-switch v-model="gyksj" /></van-col>
      <!--<van-col><van-field
        v-model="gyksj"
        label="GYK数据"
        placeholder="请输入GYK数据"/></van-col>-->
      </van-row><van-row>
      <van-col><van-field
        v-model="yxqd"
        label="运行区段"
        placeholder="请输入运行区段"/></van-col>
        <!--<van-col span="8">运行区段</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.yxqd)'>{{totalData.yxqd}}</span>
        </van-col>-->
      </van-row><van-row>
      <van-col><van-field
        v-model="sgdwglry"
        label="施工单位管理人员"
        placeholder="请输入施工单位管理人员"
        type="textarea"
        autosize/></van-col>
        <!--<van-col span="8">施工单位管理人员</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.sgdwglry)'>{{totalData.sgdwglry}}</span>
        </van-col>-->
      </van-row><van-row>
      <van-col><van-field
        v-model="jldwgbry"
        label="监理单位跟班人员"
        placeholder="请输入监理单位跟班人员" type="textarea"
        autosize/></van-col>
        <!--<van-col span="8">监理单位跟班人员</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.jldwgbry)'>{{totalData.jldwgbry}}</span>
        </van-col>-->
      </van-row>
      <van-row>
        <van-col>
          <van-col span="8">防溜设施的配置</van-col>
          <van-col span="16"><van-switch v-model="flsspz" /></van-col>
          <!--<van-field
          v-model="flsspz"
          label="防溜设施的配置"
          placeholder="请输入防溜设施的配置情况"
          type="textarea"
          autosize></van-field>-->
        </van-col>
      </van-row>
      <van-row>
        <van-col span="24">自轮运转设备上道前设备检查情况</van-col>
        <!--<van-col><van-field
          v-model="sdqsbjcqk"
          label="自轮运转设备上道前设备检查情况"
          placeholder="请输入自轮运转设备上道前设备检查情况"
          type="textarea"
          rows="3"
          autosize/></van-col>-->
        <!--<van-col span="8">自轮运转设备上道前设备检查情况</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.sdqsbjcqk)'>{{totalData.sdqsbjcqk}}</span>
        </van-col>-->
      </van-row>
      <div class="img">
          <div v-for="(path,index) in sdqsbjcqkImgArr" class="photoBox">
            <img class="photo" :src="path" alt="logo" v-on:click="showBigImage($event)"/>
          </div>
        <div class="addPhoto" @click='phoneOrPicture()'>+</div>
      </div>
      <van-row>
        <van-col><van-field
          v-model="sfrygbqk"
          label="四方人员跟班情况"
          placeholder="请输入四方人员跟班情况"
          type="textarea"
          autosize/></van-col>
        <!--<van-col span="8">四方人员跟班情况</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.sfrygbqk)'>{{totalData.sfrygbqk}}</span>
        </van-col>-->
      </van-row>
      <div class="img">
        <div class="addPhoto" @click='phoneOrPicture()'>+</div>
      </div>
      <van-row>
        <van-col span="24">现场作业照片</van-col>
        <!--<van-col><van-field
          v-model="xczyzp"
          label="现场作业照片"
          placeholder="请输入现场作业照片"/></van-col>-->
        <!--<van-col span="8">现场作业照片</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.xczyzp)'>{{totalData.xczyzp}}</span>
        </van-col>-->
      </van-row>
      <div class="img">
        <div class="addPhoto" @click='phoneOrPicture()'>+</div>
      </div>
      <van-row>
        <van-col span="24">设备停放后防溜及看守情况</van-col>
        <!--<van-col><van-field
          v-model="zbtfhksqk"
          label="设备停放后防溜及看守情况"
          placeholder="请输入设备停放后防溜及看守情况"
          type="textarea"
          rows="3"
          autosize/></van-col>-->
        <!--<van-col span="8">设备停放后防溜及看守情况</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.zbtfhksqk)'>{{totalData.zbtfhksqk}}</span>
        </van-col>-->
      </van-row>
      <div class="img">
        <div class="addPhoto" @click='phoneOrPicture()'>+</div>
      </div>
      <van-row>
        <van-col><van-field
          v-model="xcczwt"
          label="现场存在问题"
          placeholder="请输入现场存在问题"
          type="textarea"
          autosize/></van-col>
        <!--<van-col span="8">设备停放后防溜及看守情况</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.zbtfhksqk)'>{{totalData.zbtfhksqk}}</span>
        </van-col>-->
      </van-row>
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
      <van-button size="large" type="primary" style="z-index: 100000" @click="save()">保存</van-button>
    </div>
  </div>
</template>
<script>
  // 引入组件
  import Header from '../Common/Header'
  import $ from 'jquery'
  import { Dialog,Button,Row, Col,Field,Toast,Picker  } from 'vant';
  import Axios from 'axios';
  import { Base64 } from '../../assets/js/Base64.js'

    export default {
      name: "operation-condition-detail",
      components: {
        Header
      },
      data(){
        return{
          visibleItemCount:3,
          showSDSj:false,
          showHGZBH:false,
          showZYWCSJ:false,
          ZlyzsbHgzbhzdServlet:[],
          hgzbhs:[],
          xmmc:'',
          sbmc:'',
          sbxh:'',
          hgzbh:'',
          dryxjhmlh:'',
          rq:'',
          zynr:'',
          clzydd:'',
          cltfdd:'',
          sj:'',
          fsj:'',
          sdsj:'',
          zywcsj:'',
          gyksj:false,
          yxqd:'',
          sgdwglry:'',
          jldwgbry:'',
          flsspz:false,
          sdqsbjcqk:'',
          sfrygbqk:'',
          xczyzp:'',
          zbtfhksqk:'',
          xcczwt:'',
          xmid:'',
          hgzbh_id:'',

          isTrue:'',
          baseuserid:this._GLOBAL.baseUserId,
          checked: true,
          id:this.$route.params.id,// 获取通过路由传的值
          totalData:[],
          popupVisible:false,
          popupTxt:'',
          sheetVisible:false, // 隐藏拍照、相册选择框
          actions:[
            {
              name:'拍照',
              method :function () {
                console.log("拍照事件")
                RPM.takePicture(2,index);
              }
            },
            {
              name:'从相册中选择',
              method :function () {
                console.log("从相册中选择事件")
                RPM.selectPhotos(9,index);
              }
            }
          ]
        }
      },
      /*mounted:function () {
        this.getZlyzsbHgzbhzdServlet()
      },*/
      methods:{
        Base64:function () {
          Base64();
        },
        onClickRight(){
          RPM.closeApplication();
        },
        // 获取位置信息的回调函数（ios、android和js交互）
        RPMPositionCallBack:function (params) {
          this.totalData.qddd=params;
        },
        onSDSJConfirm(value, index) {
          this.sdsj = value
          this.closeAll()
        },
        onZYWCSJConfirm(value, index) {
          this.zywcsj = value
          this.closeAll()
        },
        closeAll(){
          this.showHGZBH=false
          this.showSDSj=false
          this.showZYWCSJ=false
        },

        // 拍照的原始图片的回调函数，
        RPMImageCallBack:function (params,imageType,index) { // 参数一：base64;参数二：图片类型；参数三：标识位

          let s="data:image/"+imageType+";base64,"+params;

          switch (index){
            case '1':
              this.jhpfqkImgArr.push(s);
              break;
            case '2':
              this.ryqdqkImgArr.push(s);
              break;
            case '3':
              this.picturesArr.push(s);
              break;
            default:
              break;
          }

          // 将这张图片追加到数组中便于保存所有图片
          var obj={};
          obj.imgType = imageType; // 图片类型
          obj.base64 =  params; // 图片的base64
          this.xczp.push(obj);

          this.callBackParams = imageType;

        },
        // 从相册中选择照片的回调函数
        RPMSelectPhotosCallBack:function (params,index) {
          var a = params.split(',');
          for (var i=0;i<a.length;i++){
            var obj={};
            obj.imgType = a[i].split('|')[0]; // 图片类型
            obj.base64 =  a[i].split('|')[1]; // 图片的base64
            var imgUrl ="data:image/"+obj.imgType+";base64,"+obj.base64;
            switch (index){
              case '1':
                this.jhpfqkImgArr.push(imgUrl);
                break;
              case '2':
                this.ryqdqkImgArr.push(imgUrl);
                break;
              case '3':
                this.picturesArr.push(imgUrl);
                break;
              default:
                break;
            }
            this.xczp.push(obj);
          }
          this.paramsCount =a.length;
        },
        onHGZBHConfirm(value, index){
          this.hgzbh=value
          for (var i=0;i<this.ZlyzsbHgzbhzdServlet.length;i++){
            // debugger
            if(this.ZlyzsbHgzbhzdServlet[i].hgzbh===this.hgzbh){
              this.xmmc=this.ZlyzsbHgzbhzdServlet[i].xmmc
              this.xmid=this.ZlyzsbHgzbhzdServlet[i].xmid
              this.sbmc=this.ZlyzsbHgzbhzdServlet[i].sbmc
              this.sbxh=this.ZlyzsbHgzbhzdServlet[i].sbxh
              this.hgzbh_id=this.ZlyzsbHgzbhzdServlet[i].id
            }
          }
          this.showHGZBH=false
        },
        isShowSDSJ(){
          this.showSDSj=!this.showSDSj
        },
        isShowZYWCSJ(){
          this.showZYWCSJ=!this.showZYWCSJ
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
        isShowHGZBH(){
          this.showHGZBH=!this.showHGZBH
        },
        getZlyzsbHgzbhzdServlet(){
          var url='http://tljjgxt.r93535.com/ZlyzsbHgzbhzdServlet?&type=0&baseuserid='+this._GLOBAL.baseUserId
          this.$http.get(url).then((response) => {
            this.ZlyzsbHgzbhzdServlet=response.data
            for (var i=0;i<this.ZlyzsbHgzbhzdServlet.length;i++){
              if(i===0){
                this.hgzbh=this.ZlyzsbHgzbhzdServlet[i].hgzbh
                this.xmmc=this.ZlyzsbHgzbhzdServlet[i].xmmc
                this.sbmc=this.ZlyzsbHgzbhzdServlet[i].sbmc
                this.sbxh=this.ZlyzsbHgzbhzdServlet[i].sbxh
                this.xmid=this.ZlyzsbHgzbhzdServlet[i].xmid
                this.hgzbh_id=this.ZlyzsbHgzbhzdServlet[i].id
              }
              this.hgzbhs.push(this.ZlyzsbHgzbhzdServlet[i].hgzbh)
            }
            console.log(this.hgzbhs)
          }, (response) => {
            console.log('error');
          });
        },
        getData(){
          let vm = this;
          let url='http://tljjgxt.r93535.com/ZlyzsbyxqkServlet?baseuserid='+this._GLOBAL.baseUserId+'&id='+vm.id
          //let url = 'http://tljjgxt.r93535.com/YYXDayPlanUniqueServlet?id='+id+'&baseuserId=236215';
          vm.$http.get(url).then((response) => {
            console.log("详情页面的数据：" + JSON.stringify(response.data.data[0]));
            vm.totalData = response.data.data[0];
          }, (response) => {
            console.log('error');
          });
        },
        save(){
          var url='http://tljjgxt.r93535.com/ZlyzsbYxqkMobileSaveServlet'
          var params = new URLSearchParams();
          params.append('baseuserid',this.baseuserid)
          params.append('xmmc',this.xmid)
          params.append('sbmc',this.sbmc)
          params.append('sbxh',this.sbxh)
          params.append('hgzbh',this.hgzbh)
          params.append('hgzbh_new',this.hgzbh_id)
          params.append('dryxjhmlh',this.dryxjhmlh)
          params.append('rq',this.rq)
          params.append('zynr',this.zynr)
          params.append('clzydd',this.clzydd)
          params.append('cltfdd',this.cltfdd)
          params.append('sj',this.sj)
          params.append('fsj',this.fsj)
          params.append('sdsj',this.sdsj)
          params.append('zywcsj',this.zywcsj)
          params.append('gyksj',this.gyksj===true?0:1)
          params.append('yxqd',this.yxqd)
          params.append('sgdwglry',this.sgdwglry)
          params.append('jldwgbry',this.jldwgbry)
          params.append('flsspz',this.flsspz===true?0:1)
          params.append('sdqsbjcqk',this.sdqsbjcqk)
          params.append('sfrygbqk',this.sfrygbqk)
          params.append('xczyzp',this.xczyzp)
          params.append('zbtfhksqk',this.zbtfhksqk)
          params.append('xcczwt',this.xcczwt)
          Axios.post(url, params, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(response => {
            var isTrue= response.data
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
        // 绑定获取位置信息的回调函数
        window.RPMPositionCallBack = this.RPMPositionCallBack;

        // 绑定拍照的回调函数
        window.RPMImageCallBack = this.RPMImageCallBack;

        // 绑定选择照片的回调函数
        window.RPMSelectPhotosCallBack = this.RPMSelectPhotosCallBack;
        this.getZlyzsbHgzbhzdServlet()
        /*this.getData();*/

        $('.van-col.van-col-8').each(function (i) {
          var txtL=$($('.van-col.van-col-8')[i]).text().length;
          if(txtL>7){
            $($('.van-col.van-col-8')[i]).addClass('wordBreak')
          }else {
            $($('.van-col.van-col-8')[i]).removeClass('wordBreak')
          }
        })
      }
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
    text-align: left;
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

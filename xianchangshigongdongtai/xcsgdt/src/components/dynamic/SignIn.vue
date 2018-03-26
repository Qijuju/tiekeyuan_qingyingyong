<script src="../../../node_modules/vant/lib/datetime-picker/index.js"></script>
<template>
  <div class="1">
    <!-- 现场施工动态-表头-开始 -->
      <div class="search">
        <van-nav-bar
          fixed
          title="现场签到"
          left-text="返回"
          right-text="发布"
          @click-left="onClickLeft"
          @click-right="onClickRight">
        </van-nav-bar>
      </div>
    <!-- 现场施工动态-表头-结束 -->

    <!-- 现场施工动态-现场签到内容-开始 -->

      <div @click="isShowXMMC()">
        <van-row >
          <van-col span="6">项目名称</van-col>
          <van-col span="17">
            <van-field
              v-bind:value="xmmc"
              placeholder="项目名称"
              disabled
            />
          </van-col>
        </van-row>
      </div>

      <van-row >
        <van-col span="6">检查部位</van-col>
        <van-col span="17" style="text-align: left">
          <div id="inspaction" v-html="inspaction" contenteditable="true" v-on:focus="bwfocus()" v-on:blur="bwblur()"></div>
        </van-col>
      </van-row>

      <van-row>
        <van-col span="6">工作内容</van-col>
        <div id="workContent" v-html="workContent" contenteditable="true" v-on:focus="gznrfocus()" v-on:blur="gznrblur()"></div>
      </van-row>

      <van-row >
        <van-col span="6">现场照片</van-col>
      </van-row>
      <div class="imgBox">
        <!--绑定动态图片资源-->
        <div class="imgnow" v-for="(item ,index) in ryqdqkImgArr" >
            <img v-bind:src="item.s" :alt="index" v-on:click="showBigImage($event)">
            <van-icon name="checked"  v-show="item.isShow==true" />
            <van-icon name="clear"  v-show="item.isShow==false"/>
            <van-icon name="delete" @click="onDelete(1,index)" />
        </div>
        <!--<img src="../../assets/images/sgrjhImages/homeg.png"  v-on:click="showBigImage($event)">-->
        <div class="addPhoto" @click='takePictureE(1,true,"http://rails.r93535.com/tljggxt/base/attachment!plupload4.action")'>+</div>
      </div>

      <van-row>
        <van-col span="5">发布人</van-col>
        <van-col span="1"></van-col>
        <van-col span="17" v-html="publishPeopleName" style="text-align: left"></van-col>
      </van-row>

      <van-row>
        <van-col span="6">签到时间</van-col>
        <van-col span="12" v-html="startDay" style="text-align: left">
           <span v-html="startDay"></span>
        </van-col>
        <van-button size="small" @click="getCurrentTimeAndPositionInfo()" style="height: 30px;line-height: 30px;float: left;margin-top: 9px">签到</van-button>
      </van-row>
    
      <van-row style="margin-bottom: 55px">
        <van-col span="6">签到地点</van-col>
        <van-col span="17" v-html="qddd" style="text-align: left">
        </van-col>
      </van-row>


    <van-row v-show="showxmmc" class="checkrow">
      <van-col>
        <van-picker :columns="xmcolumns"
                    v-bind:visible-item-count='visibleItemCount'
                    v-bind:xmmc="xmmc"
                    show-toolbar
                    @cancel="closeAll"
                    @confirm="onXMConfirm"
        />
      </van-col>
    </van-row>


    <!--预览图片的盒子-->
    <div id="showBigImage" v-if="showBigImage" @click="showBigImageBox($event)" v-bind:style="{height:setHeight+'px'}">
      <!--<img  src="../../assets/images/sgrjhImages/search.png" alt="">-->
      <!--<img  v-bind:src="previewPicSrc" alt=""  :style="{width:previewPicWidth+'px',height:previewPicHeight+'px'}">-->
      <img  v-bind:src="previewPicSrc" alt="" style="width:100%;"/>
    </div>

    <!--<van-row v-show="showStartPicker" class="checkrow">
      <van-col>
        <van-datetime-picker
          v-model="startDate"
          type="date"
          visible-item-count=3
          @confirm="startConfirm"
          @cancel="closeAll"
        />
      </van-col>
    </van-row>-->
    <!-- <van-cell-group>
       &lt;!&ndash;选择项目名称&ndash;&gt;
       <van-field v-model="username" label="项目名称" icon="clear" placeholder="请输入项目名称" required @click-icon="username = ''"/>

         <select v-model="xiangmu" >
           <option v-for="option in options" v-bind:value="option.value">
             {{option.text}}
           </option>
         </select>
         <span style="display: none">Selected：{{ xiangmu | json }}</span>

       <van-field v-model="message" label="工作内容" type="textarea" placeholder="请输入工作内容" rows="1" autosize/>
       <van-uploader :after-read="onRead" accept="image/gif, image/jpeg" multiple>
        <van-icon name="photograph" />
       </van-uploader>
       <van-field label="现场图片" value="" disabled/>
       <van-field label="发布人" value="自动获取" disabled/>
       <van-field label="发布时间" value="自动获取" disabled/>
       <van-field label="发布地点" value="自动获取" disabled/>


     </van-cell-group>-->
    <!-- 现场施工动态-现场签到内容-结束 -->

    <!--<table class="tablelist" style="position:fixed;bottom:50px;" @click="toSave">
         <tr>
             <td style="width:100%;font-size:18px;text-align:center;">保存</td>
         </tr>
     </table>-->

    <!--相册、拍照选择-->
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible"
    >
    </mt-actionsheet>
  </div>
</template>

<script>
  import $ from "jquery";
  import { Toast } from 'vant';
  import { Field } from 'vant';
  import Vue from 'vue';
  import axios from 'axios';
  import bus from '../bus';
  import { Uploader } from 'vant';
  import { Icon } from 'vant';
  import { Dialog } from 'vant';
  import Scroll from '../Common/PullRefresh';  //引入上拉加载，下拉刷新的插件
  import MobileSelect from 'mobile-select';
  // 引入第三方,将字符串转换成base64
  import { Base64 } from '../../assets/js/Base64.js'

  Vue.use(Field);
  Vue.use(Uploader);

  export default {
    name: "SignIn",
    components: {
      'v-scroll': Scroll
    },
    data() {
      return {
        visibleItemCount:3,
        setHeight:window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,/// 设置预览图片的盒子的高度=屏幕可视区域的高度
        counter : 1, //默认已经显示出15条数据 count等于一是让从16条开始加
        xmmc:'',
        inspaction:'检查部位',   //检查部位
        xmmc_id:'',
        showxmmc:false,
        xiangmuServlet:[],
        xmcolumns:['全部'],
        //开始日期
        showStartPicker:false,
        startDate:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        startDay:'',     //获取当前时间
        qddd:'',         //位置信息
        longitude:'',    //经度
        latitude:'',     //纬度
        previewPicSrc:'',
        previewPicWidth:'',
        previewPicHeight:'',
        sitePicture:'',
        baseuserId:this._GLOBAL.baseUserId,
        // baseuserId:this._GLOBAL.baseUserId,
        orgid:'',
        workContent:'工作内容',
        publishPeopleName:'',     //发布人
        publishPeople:'',         //发布人id
        createDate:'',
        publishLocation:'',
        constructiondeptid:265,    //单位id
        imei:'123',
        longitude:'ssss',

        saveSignInStatus:'',

        // totalData:[],
        imageStr:'',
        xczp:[],// 现场照片：拍照和相册中选择的照片存放的数组
        picturesStr:[],
        disabled: false,
        sheetVisible:false, // 隐藏拍照、相册选择框
        actions:[],
        picturesArr:[], // 现场照片
        previewPicSrc:'', // 预览图片的src
        popupVisible:false,
        popupTxt:'',
        ryqdqkImgArr:[],    // 图片数组
        zczpArr:[],         // 现场照片

        ryqdbIdArr:[], //人员签到表 桥梁作用
        xczpIdArr:[], //现场照片 桥梁作用

        ryqdbId:'', //人员签到表 保存字段
        xczpId:'', //现场照片 保存字段

        attachids:'',  //上传的图片名称
        uploadername:[],  //上传的json格式图片


      };
    },
    //打开页面是调用此方法，获取代办流程列表数据
    mounted: function() {
      // 绑定获取位置信息的回调函数
      window.RPMPositionCallBack = this.RPMPositionCallBack;

      // 绑定拍照的回调函数
      window.RPMImageCallBack = this.RPMImageCallBack;

      // 绑定选择照片的回调函数
      window.RPMSelectPhotosCallBack = this.RPMSelectPhotosCallBack;

      // 绑定选择照片的回调函数
      window.RPMImageIdCallBack = this.RPMImageIdCallBack;

      this.userId = this.getQueryVariable('userid');
      this.getpeopleId();       //发布人员信息
      this.getcompanyId();      //单位信息
      //this.getXiangmuServlet();
      this.createDate = this.getDay(0);
      this.getXiangmuServlet();
      this.getCurrentTimeAndPositionInfo();
    },
    created(){

    },
    methods: {
      // 引入base64
      Base64:function () {
        Base64();
      },

      // 预览图片
      showBigImageBox(event){
        var el = event.currentTarget;
        $(el).hide();
      },
      showBigImage(event){
        var el = event.currentTarget;   //获取点击对象
        this.previewPicSrc =$(el).attr("src");  // 当前点击图片的src

        this.previewPicWidth = $(el).width();// 当前点击图片的宽
        this.previewPicHeight = $(el).height();// 当前点击图片的高
        $('#showBigImage').show(); // 显示box
      },
      //请求中获取sessionid和usrid
      getQueryVariable(variable){
        // debugger
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
          var pair = vars[i].split("=");
          if(pair[0] == variable){return pair[1];}
        }
        return('');
      },
      // 图片删除函数
      onDelete(num,index){
        Dialog.confirm({
          title: '删除',
          message: '确定删除此图片吗？'
        }).then(() => {
          // 删除图片的方法
          if (num==1){
            this.ryqdqkImgArr.splice(index,1);
            this.ryqdbIdArr.splice(index,1);
          }
          if (num==2){
            this.zczpArr.splice(index,1);
          }

        }).catch(() => {
          console.log("点击取消按钮")
        });
      },
      // 拍照的原始图片的回调函数，
      RPMImageCallBack:function (params,imageType,x,y) { // 参数一：base64;参数二：图片类型；参数三：标识位

        let s="data:image/"+imageType+";base64,"+params;

        let imgObj={};
        imgObj.s = s;
        imgObj.x=x;
        imgObj.y=y;
        imgObj.isShow=false;

        switch (x){
          case '1':
            this.ryqdqkImgArr.push(imgObj);
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
      RPMSelectPhotosCallBack:function (params,x,y) {

        var a = params.split(',');
        var idArr = y.split(',');

        for (var i=0;i<a.length;i++){
          var obj={};
          obj.imgType = a[i].split('|')[0]; // 图片类型
          obj.base64 =  a[i].split('|')[1]; // 图片的base64

          var imgUrl ="data:image/"+obj.imgType+";base64,"+obj.base64;

          let imgObj={};
          imgObj.s=imgUrl;
          imgObj.x=x;
          imgObj.y=idArr[i];
          imgObj.isShow=false;

          switch (x){
            case '1':
              this.ryqdqkImgArr.push(imgObj);
              break;
            default:
              break;
          }

          this.xczp.push(obj);
        }

        this.paramsCount =a.length;
      },

      // JSAPI 函数调用  获取位置信息
      getCurrentTimeAndPositionInfo(){

        console.log("获取当前时间和地点的函数被调用");

        // 获取当前时间
        // let currentTime=new Date().getFullYear()+(new Date().getMonth()>=9?"-":"-0")+(new Date().getMonth()+1)+(new Date().getDate()>=9?"-":"-0")+new Date().getDate()+(new Date().getHours()>=9?" ":" 0")+new Date().getHours()+(new Date().getMinutes()>=9?":":":0")+new Date().getMinutes()+':'+new Date().getSeconds();
        let currentTime=new Date().getFullYear()+(new Date().getMonth()>=9?"-":"-0")+(new Date().getMonth()+1)+(new Date().getDate()>=9?"-":"-0")+new Date().getDate()+(new Date().getHours()>=9?" ":" 0")+new Date().getHours()+(new Date().getMinutes()>=9?":":":0")+new Date().getMinutes();

        this.startDay=currentTime;
        // debugger
        // 调取获取地理位置信息的JSAPI
        RPM.getCurrentPositionInfo();
      },

      // JSAPI 函数调用 拍照或拍照或从相册中
      takePictureE(index,bo,url) {

        let  arrL;
        if(index==1){
          arrL = this.ryqdqkImgArr.length;
        }

        if (index==2){
          arrL = this.zczpArr.length;
        }

        this.sheetVisible = true; // 拍照或从相册中选择项目显示
        this.actions = [
          {
            name:'拍照',
            method :function () {

              // 调取JSAPI拍照事件,参数：1 表示原始照片；2 带水印照片
              RPM.takePicture(2,index,bo,url,arrL); // 参数一：表示获取原始图片JSAPI约定；参数二：点击的方法的标识位
            }
          },
          {
            name:'从相册中选择',
            method :function () {
              RPM.selectPhotos(9,index,bo,url,arrL);
            }
          }
        ];
      },

      // 表头返回按钮事件
      onClickLeft() {
        // this.$router.push({path: '/SiteDynamic'});
        Dialog.confirm({
          message: '确认退出此次编辑？'
        }).then(() => {
          this.xmmc = '';
          this.xmmc_id = '';
          this.inspaction = '检查部位';
          this.workContent = '工作内容';
          this.sitePicture = '';
          this.startDay = '';
          this.qddd = '';
          this.ryqdqkImgArr = [];    //照片清空
          this.ryqdbIdArr = [];      //照片id清空
          this.uploader_count = '';  //图片数量
          this.attachids = '';       //点击上传服务器返回的服务器文件名（字符串逗号隔开）
          this.uploadername = [];    //json格式
          $("#inspaction").css("color","rgb(204,204,204)");
          $("#workContent").css("color","rgb(204,204,204)");
          this.$router.push({path: '/SiteDynamic'});
        }).catch((error) => {
          console.log(error);
        });
      },

      // 获取位置信息的回调函数（ios、android和js交互）
      RPMPositionCallBack:function (params) { // '位置,经度,纬度'
        var arr =params.split(',');
        // this.totalData.qddd=arr[0]; //当前位置
        this.qddd=arr[0]; //当前位置
      },

      // android回传图片id的回调函数
      RPMImageIdCallBack(dataId,x,y){

        console.log("ndroid回传图片id，接收到的参数为：" + dataId+":"+x+':'+y);
        // 首先判断id是否为空。 为空时，显示叉号，非空时，显示对号。
        if (dataId !==''){ // 非空
          switch (x){
            case '1':
              // 将对应的图片的标识修改为true,图片的右上角显示对号
              this.ryqdqkImgArr[y-1].isShow = true;

              // 将图片id追加到数组中，只存储有id返回的图片的id
              this.ryqdbIdArr.push(dataId);
              break;
            default:
              break;
          }

        }else {

          switch (x){
            case '1':
              // 将对应的图片的标识修改为true,图片的右上角显示对号
              this.ryqdqkImgArr[y-1].isShow = false;
              break;
            default:
              break;
          }
        }
      },

      // 表头关闭按钮事件
      onClickRight() {
        this.toSaveSignIn();
        //this.$router.push({path: '/SiteDynamic'});
      },
      toSave() {
        this.$router.push({path: '/SiteDynamic'});
      },
      closeAll(){
        this.showxmmc=false
        this.showStartPicker=false
      },
      closeOthers(value){
        if(value!='xmmc'){
          this.showxmmc=false
        }
        if(value!='startDay'){
          this.showStartPicker=false
        }
      },

      //获取项目名称和id
      getXiangmuServlet(){
        this.orgid = 265;
        // this.baseuserId = 102300;
       // let url='http://tljjgxt.r93535.com/XiangmuServlet?orgid='+this.orgid+'&baseuserid='+this._GLOBAL.baseUserId;
       //  let url = 'http://tljjgxt.r93535.com/XiangmuServlet?orgid=265&baseuserid=102300';
        let url = 'http://rails.r93535.com/tljggxt/base/interface/userinfo!getproject.action?userId='+this._GLOBAL.baseUserId;
        console.log('项目名称；'+url);
        axios.get(url)
          .then(response => {
          this.xiangmuServlet = response.data;
          console.log('项目名称2：'+JSON.stringify(this.xiangmuServlet));

        var data = this.xiangmuServlet
        for(var i in data) {
          console.log(data[i].id)
          // console.log(data[i].xmmc)
          // console.log(data[i].name)
          data[i].xmmc = data[i].name;
          // this.xmcolumns.push(data[i].xmmc)
          this.xmcolumns.push(data[i].xmmc)
        }
        console.log(response.data)
        console.log(this.xiangmuServlet)
        console.log(this.xmcolumns)
      }).catch(err => {
          console.error(err.message)
      })
      },

      //点击选择项目名称
      isShowXMMC(){
        this.closeOthers('xmmc');
        this.showxmmc=!this.showxmmc
      },

      //选择项目点击确定赋值项目名称和项目id的
      onXMConfirm(value, index) {

        console.log("选中项目的明明和id:"+ value+":"+index);
        // debugger
        var data = this.xiangmuServlet;
        if (data.length ===0 ){
          this.xmmc_id=''
          this.xmmc='全部'
        }else {
          for(var i=0;i<data.length;i++) {
            console.log("选333:"+i);
            if(index!=0){
              console.log("if");
              if(data[i].xmmc==value){
                this.xmmc=data[i].xmmc;
                this.xmmc_id=data[i].id
              }
            }else{
              console.log("else");
              this.xmmc_id='';
              this.xmmc='全部'
            }
          }
        }


        console.log("项目名称：",this.xmmc);
        console.log("项目名称id：",this.xmmc_id);

        this.closeAll()
        // Toast(`当前值：${value}, 当前索引：${index}`);
      },
      startPicker(){
        this.closeOthers('startDay')
        this.showStartPicker = !this.showStartPicker
      },
      startConfirm(){
        //Toast(`当前值：`+this.startDate);
        this.startDay = this.startDate.getFullYear()+(this.startDate.getMonth()>=9?"-":"-0")+(this.startDate.getMonth()+1)+(this.startDate.getDate()>9?"-":"-0")+this.startDate.getDate(),
          this.closeAll()
      },
      //点击签到保存输入信息
      toSaveSignIn(){
        //var url = http://10.60.1.18:8182/ljmh/siteconstruction/mobile/site!save.action?projectName=武汉至十堰铁路&projectId=735&workContent=wode&publishPeople=102298&createdate=2018-02-23&publishLocation=sss&constructiondeptid=265
        // var url = 'http://192.168.1.106:8090/ljmh/siteconstruction/mobile/site!save.action?projectName='+this.projectName+'&projectId='+this.projectId+'&workContent='+this.workContent+'&publicPeople='+this.publicPeople+'&createdate='+this.createdate+'&publishLocation='+this.publishLocation+'&constructiondeptid'+this.constructiondeptid;
        var url = 'http://rails.r93535.com/tljggxt/siteconstruction/mobile/site!save.action?projectName='+this.projectName+'&projectId='+this.projectId+'&workContent='+this.workContent+'&publicPeople='+this.publicPeople+'&createdate='+this.createdate+'&publishLocation='+this.publishLocation+'&constructiondeptid'+this.constructiondeptid;
        //var url = 'http://www.r93535.com/tljggxt/siteconstruction/mobile/site!save.action?projectName='+this.projectName+'&projectId='+this.projectId+'&workContent='+this.workContent+'&publicPeople='+this.publicPeople+'&createdate='+this.createdate+'&publishLocation='+this.publishLocation+'&constructiondeptid'+this.constructiondeptid;
        //var url = 'http://139.129.218.16:9910/extapi/tljggxt/siteconstruction/mobile/site!save.action?projectName='+this.projectName+'&projectId='+this.projectId+'&workContent='+this.workContent+'&publicPeople='+this.publicPeople+'&createdate='+this.createdate+'&publishLocation='+this.publishLocation+'&constructiondeptid'+this.constructiondeptid;
        //var url = 'http://192.168.1.105:8090/ljmh/siteconstruction/mobile/site!save.action?projectName='+this.projectName+'&projectId='+this.projectId+'&workContent='+this.workContent+'&publicPeople='+this.publicPeople+'&createdate='+this.createdate+'&publishLocation='+this.publishLocation+'&constructiondeptid'+this.constructiondeptid;
        // var url = 'http://192.168.1.105:8090/ljmh/siteconstruction/mobile/site!save.action?projectName=武汉至十堰铁路&projectId=735&workContent=wode&publishPeople=102298&createdate=2018-02-23&publishLocation=sss&constructiondeptid=265';
        // var url = 'http://192.168.1.106:8090/ljmh/siteconstruction/mobile/site!save.action';
        this.imageStr = '';
        // 将这张图片追加到数组中便于保存所有图片
        var imgObj={};
        imgObj.imgType = 'png'; // 图片类型
        imgObj.base64 =  this.imageStr; // 图片的base64
        window.atob(this.imageStr); //base64转换成图片形式
        this.xczp.push(imgObj);

        // // 地点转换成base64
        // var base = new Base64();
        // var qdddTemp = base.encode(this.qddd);  // 签到地点

        console.log("清楚空元素之前的数据：" +JSON.stringify(this.ryqdbIdArr));
        for(var i = 0; i < this.ryqdbIdArr.length; i++) {
          if(this.ryqdbIdArr[i] == null|| this.ryqdbIdArr[i]=='' ||this.ryqdbIdArr[i]==undefined) {
            this.ryqdbIdArr.splice(i,1);
            i = i - 1; // i - 1 ,因为空元素在数组下标 2 位置，删除空之后，后面的元素要向前补位，
                       // 这样才能真正去掉空元素,觉得这句可以删掉的连续为空试试，然后思考其中逻辑
          }
        }
        console.log("清楚空元素之后：" +JSON.stringify(this.ryqdbIdArr));

        // 将图片id数组转换成字符串
        var ryqdbId = this.ryqdbIdArr.join(',');

        if($("#inspaction").text().replace(/\s/g, "") == '检查部位'){
           this.inspaction = ''
        }else {
          this.inspaction = $("#inspaction").text();
        }
        if($("#workContent").text().replace(/\s/g, "") == '工作内容'){
          this.workContent = ''
        }else {
          this.workContent = $("#workContent").text();
        }
        // 图片id
        console.log("图片id",this.ryqdbIdArr);
        if(this.ryqdbIdArr){
          for(var i=0;i<this.ryqdbIdArr.length;i++){
            var index=i;
            // this.attachids += this.ryqdbIdArr[i];
            var that = this;
            var keyS = 'uploader_'+ index +'_name';
            var obj = {
              // keyS: that.ryqdbIdArr[i]
            };
            obj['uploader_'+ index +'_name'] = that.ryqdbIdArr[i];
            this.uploadername.push(obj);
          }
        }

        var obj={
          projectName:this.xmmc,                     //项目名称
          projectId:this.xmmc_id,                    //项目id
          inspaction:this.inspaction,
          workContent:this.workContent,
          // inspaction:$("#inspaction").text(),        //检查部位
          // workContent:$("#workContent").text(),      //工作内容
          publishPeople:this._GLOBAL.baseUserId,       //发布人id
          createdate:this.createDate,                  //签到时间
          publishLocation:this.qddd,                   //签到地点
          constructiondeptid: this.constructiondeptid, //路局id(265)
          imei:this.imei,
          longitude:this.longitude,
          uploader_count:this.ryqdbIdArr.length,        //图片数量
          attachids: ryqdbId,                    //点击上传服务器返回的服务器文件名（字符串逗号隔开）
          uploadername:this.uploadername,               //json格式
          imageJson:''
        }
        console.log("提交的对象：",obj);
        console.log("提交的对象inspaction：",$("#inspaction").text());
        console.log("提交的对象workContent：",$("#workContent").text());
        var _this = this;
       axios.post(url,  obj)
          .then(function (response) {
            console.log("projectId:",obj.projectId);
            console.log("post请求成功"+JSON.stringify(response));
            // alert("projectId",_this.xmmc_id+'0');
            _this.xmmc = '';
            _this.xmmc_id = '';
            _this.inspaction = '检查部位';
            _this.workContent = '工作内容';
            _this.sitePicture = '';
            _this.ryqdqkImgArr = [];    //照片清空
            _this.ryqdbIdArr = [];      //照片id清空
            _this.startDay = '';        //时间清空
            _this.qddd = '';            //地点清空
            _this.uploader_count = '';  //图片数量
            _this.attachids = '';       //点击上传服务器返回的服务器文件名（字符串逗号隔开）
            _this.uploadername = [];    //json格式
            $("#inspaction").css("color","rgb(204,204,204)");
            $("#workContent").css("color","rgb(204,204,204)");
            _this.$router.push({path: '/SiteDynamic'});
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      getDay(){
        //debugger
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        //alert(year+'年'+month+'月'+day+'日 '+hour':'+minute+':'+second)
        if(month.toString().length == 1){
          month ='0'+month;
        }
        if(day.toString().length == 1){
          day ='0'+day;
        }
        if(hour.toString().length == 1){
          hour ='0'+hour;
        }
        if(minute.toString().length == 1){
          minute ='0'+minute;
        }
        return year+"-"+month+"-"+day+" "+hour+":"+minute;
      },
      doHandleMonth(month){
        // debugger
        var m = month;
        if(month.toString().length == 1){
          m = "0" + month;
        }
        return m;
      },

      //检查部位获取焦点事件
      bwfocus(){
        if(this.inspaction.replace(/\s/g, "") == "检查部位"){
          this.inspaction = '';
        }
        $("#inspaction").css("color","rgb(0,0,0)");
        $("#inspaction").addClass("bor");
      },
      //检查部位失去焦点事件
      bwblur(){
        if($("#inspaction").text().replace(/\s/g, "") == ""){
          this.inspaction = '检查部位';
          $("#inspaction").css("color","rgb(204,204,204)");
        }
        $("#inspaction").removeClass("bor");
      },
      //工作内容获取焦点事件
      gznrfocus(){
        if(this.workContent.replace(/\s/g, "") == "工作内容"){
          this.workContent = '';
        }
        $("#workContent").css("color","rgb(0,0,0)");
      },
      //工作内容失去焦点事件
      gznrblur(){
        if($("#workContent").text().replace(/\s/g, "") == ""){
          this.workContent = '工作内容';
          $("#workContent").css("color","rgb(204,204,204)");
        }

      },

      //根据人员ID返回人员信息
      getpeopleId(){
        let url='http://rails.r93535.com/tljggxt/base/interface/userinfo!getuser.action?userId='+this._GLOBAL.baseUserId;
        // let url='http://rails.r93535.com/tljggxt/base/interface/userinfo!getuser.action?userId=102300';
        console.log('获取的可选项目列表数据url；'+url);
        axios.get(url)
          .then(response => {
            this.publishPeopleName = response.data.name;
            // this.publishPeople = response.data.id;
            console.log('根据人员ID返回人员信息：'+JSON.stringify(response.data));

          }).catch(err => {
          console.error(err.message)
        })
      },

      //根据人员ID返回单位信息
      getcompanyId(){
        let url='http://rails.r93535.com/tljggxt/base/interface/userinfo!getuserdep.action?userId='+this._GLOBAL.baseUserId;
        // let url='http://rails.r93535.com/tljggxt/base/interface/userinfo!getuserdep.action?userId=102300  ';
        console.log('获取的可选项目列表数据url；'+url);
        axios.get(url)
          .then(response => {
            this.constructiondeptid = response.data.id;    //路局id ,单位id
            console.log('根据人员ID返回单位信息：'+JSON.stringify(response.data));

          }).catch(err => {
          console.error(err.message)
        })
      },




    }
  };
</script>

<style scoped>
  /* 规定头部，包括：标题、搜索、时间栏 */
  .search{
    left:0px;
    width:100%;
    z-index:3;
    background: #E5F2FA;
    margin-bottom: 44px;
  }

  /* 禁用按钮button*/
  /* 照片的样式 */
  .photoBox{
    width:18%;
    margin-left:1%;
    height:70px;
    margin-top:10px;
    float: left;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }
  .photoBox >img.photo{
    width:100%;
    height:100%;
    /*height:50px;*/
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }

  /* 照片 */
  .img{
    width:100%;
    height: 100%;
  }
  img.photo{
    width: 50px;
    height:50px;
    margin:5px;
  }
  .addPhoto{
    display: inline-block;
    width:18%;
    margin-left:10px;
    margin-top:10px;
    height:70px;
    text-align: center;
    line-height:70px;
    /*background: #ccc;*/
    color: #333;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    font-size:30px;

    border:1px dashed #9c9c9c;
  }
  .content{
    margin-top:44px;
    margin-bottom:91px;
  }


  /* 表头取消，签到的按钮*/
  .van-button--small{

  }
  .van-col{
    height:46px;
    text-align: center;
    line-height: 44px;
  }
  .van-picker{
    position: fixed;
    width: 100%;
  }
  .van-picker-column {
    font-size: 14px;
    text-align: left;
  }

  /*修改的样式*/
  .titlecolor{
    background: #2196F3;
    color: #fff;
  }
  .checkrow{
    background-color: #fff;
  }
  .van-picker{
    bottom: 50px;
  }
  .van-nav-bar{
    background: #2196F3;
    color: #fff;
    z-index: 3!important;
  }
  .van-nav-bar .van-icon{
    color: #fff;
  }

  /*添加按钮样式*/
  .imgBox{
    padding: 0 4%;
  }
  .imgnow{
    /*width: 32%;*/
    /*border:1px solid #f30;*/
    display: inline-block;
    position: relative;
    margin-right: 2px;
    margin-bottom: 4px;
  }
  .imgnow img{
    width: 100px;
    height: 100px;
  }
  .imgnow .van-icon-checked,
  .imgnow .van-icon-clear{
    position: absolute;
    top: 5px;
    right: 6px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    /*background-color: #fff;*/
    color: rgb(51, 163, 60);
    text-align: center;
    line-height: 19px;
    font-size: 18px;
  }
  .imgnow .van-icon-clear{
    color: red;
  }
  .imgnow .van-icon-delete{
    position: absolute;
    right: 6px;
    bottom: 5px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    color: #fff;
    text-align: center;
    line-height: 19px;
    font-size: 18px;
  }
  /*添加工作内容*/
  .workcontent{
    padding: 10px 15px;
  }

  .addPhoto{
    display: inline-block;
    width:18%;
    margin-left:10px;
    margin-top:10px;
    height:70px;
    text-align: center;
    line-height:70px;
    /*background: #ccc;*/
    color: #333;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    font-size:30px;
    border:1px dashed #9c9c9c;
  }
  /*解决div变为可输入框后有outline的问题*/
  #inspaction,#workContent{
    -webkit-tap-highlight-color:rgba(0,0,0,0);
    -webkit-user-modify:read-write-plaintext-only;
    outline:0;
  }
  #inspaction{
    margin: 9px 30px 6px 14px;
    line-height: 24px;
    height: 26px;
    color: rgb(204, 204, 204);
    display: inline-block;
    width:91%;
    overflow: scroll;
  }
  #workContent{
    display: block;
    border: 1px solid #ccc;
    margin-left: 6%;
    width: 88%;
    border-radius: 5px;
    height: 125px;
    overflow: scroll;
    color: rgb(204, 204, 204);
  }
  .bor{
    border: 1px solid #ccc;
    border-radius: 5px;
  }

</style>

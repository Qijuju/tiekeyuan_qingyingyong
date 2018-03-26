<template>
  <div class="listDetail">
    <!--title-->
    <van-nav-bar
      title="自轮运转设备基础信息详情"
      left-text="返回" right-text="关闭"  @click-right="onClickRight"  @click-left="$router.go(-1)"
    >
      <van-icon name="arrow-left" slot="left" />
      <van-icon name="arrow" slot="right" />
    </van-nav-bar>
    <!--内容-->
    <div class="content">
      <van-row>
        <van-col span="8">项目管理机构</van-col>
        <van-col span="16" >
          <span @click='popupClick(totalData.xmgljg)'>{{totalData.xmgljg}}</span>
        </van-col>
      </van-row>
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
        <van-col span="8">安全协议</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.aqxy)'>{{totalData.aqxy}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">GYK数据</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.gyksj)'>{{totalData.gyksj}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">合格证编号</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.hgzbh)'>{{totalData.hgzbh}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">合格证日期</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.hgzrq)'>{{totalData.hgzrq}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">合格证</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.hgz)'>{{totalData.hgz}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">检验证</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.jyz)'>{{totalData.jyz}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">防溜措施落实情况</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.flcslsqk)'>{{totalData.flcslsqk}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">防溜措施落实情况备注</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.flcslsqkbz)'>{{totalData.flcslsqkbz}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">起复设备等备品</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.qfsb)'>{{totalData.qfsb}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8" class="wordBreak">起复设备等备品备注</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.qfsbbz)'>{{totalData.qfsbbz}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">防护备品</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.fhbp)'>{{totalData.fhbp}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">防护备品备注</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.fhbpbz)'>{{totalData.fhbpbz}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">驾驶员及其驾驶证</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.jsz)'>{{totalData.jsz}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">上道日期</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.jcsj)'>{{totalData.jcsj}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">离场日期</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.lcsj)'>{{totalData.lcsj}}</span>
        </van-col>
      </van-row>
      <!--<van-row>
        <van-col span="8">施工单位及负责人</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.sgdwfzr)'>{{totalData.sgdwfzr}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">配合单位</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.hpdw)'>{{totalData.hpdw}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">外局代码</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.wjdm)'>{{totalData.wjdm}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">备注</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.bz)'>{{totalData.bz}}</span>
        </van-col>
      </van-row>
      <br>
      <van-row>
        <van-col span="8">计划批复情况</van-col>
        <van-col span="16">
          <span @click='popupClick(totalData.jhpfqk)'>{{totalData.jhpfqk}}</span>
        </van-col>
      </van-row>
      <div class="img">
        <img class="photo" src="../../assets/images/icon/date.png" alt="">
        <img class="photo" src="../../assets/images/icon/date.png" alt="">
        <img class="photo" src="../../assets/images/icon/date.png" alt="">
        <img class="photo" src="../../assets/images/icon/date.png" alt="">
        <div class="addPhoto" @click='phoneOrPicture()'>+</div>
      </div>
      <van-row>
        <van-col span="8">计划批复情况描述</van-col>
        <van-col span="16">span: 16</van-col>
      </van-row>
      <br>
      <van-row>
        <van-col span="8">人员签到情况</van-col>
        <van-col span="16">span: 16</van-col>
      </van-row>
      <div class="img">
        <img class="photo" src="../../assets/images/icon/date.png" alt="">
        <img class="photo" src="../../assets/images/icon/date.png" alt="">
        <img class="photo" src="../../assets/images/icon/date.png" alt="">
        <div class="addPhoto" @click='phoneOrPicture()'>+</div>
      </div>
      <van-row>
        <van-col span="8">人员签到情况描述</van-col>
        <van-col span="16">span: 16</van-col>
      </van-row>
      <van-row>
        <van-col span="8">计划兑现情况</van-col>
        <van-col span="16">
          <van-switch :value="checked" @input="onInput" />
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">现场照片</van-col>
        <van-col span="16">span: 16</van-col>
      </van-row>
      <div class="img">
        <img class="photo" src="../../assets/images/icon/date.png" alt="">
        <img class="photo" src="../../assets/images/icon/date.png" alt="">
        <img class="photo" src="../../assets/images/icon/date.png" alt="">
        <img class="photo" src="../../assets/images/icon/date.png" alt="">
        <div class="addPhoto" @click='phoneOrPicture()'>+</div>
      </div>
      <van-row>
        <van-col span="8">签到时间</van-col>
        <van-col span="16">span: 16</van-col>
      </van-row>
      <van-row>
        <van-col span="8">签到地点</van-col>
        <van-col span="16">span: 16
          <button>获取</button>
          <button>刷新</button>
        </van-col>
      </van-row>-->
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
  import { Dialog } from 'vant';
//  import axios from 'axios';

    export default {
      name: "listDetail",
      components: {
        Header
      },
      data(){
        return{
          checked: true,
          id:this.$route.query.id,// 获取通过路由传的值
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
        phoneOrPicture() { // 拍照或从相册中选择
          console.log("拍照或从相册中选择--点击事件进来了吗？");
          this.sheetVisible = true;
        },
        onClickRight(){
          RPM.closeApplication();
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
        getData(){
          let vm = this;
          let url='http://tljjgxt.r93535.com/ZlyzsbBaseInfoServlet?id='+vm.id
          //let url = 'http://tljjgxt.r93535.com/YYXDayPlanUniqueServlet?id='+id+'&baseuserId=236215';
          vm.$http.get(url).then((response) => {
            console.log("详情页面的数据：" + JSON.stringify(response.data));
            vm.totalData = response.data[0];
          }, (response) => {
            console.log('error');
          });

        }
      },
      mounted:function () {
        this.getData(),
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
    background: #a3f8ff;
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
  .content{
    margin-top:44px;
  }

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

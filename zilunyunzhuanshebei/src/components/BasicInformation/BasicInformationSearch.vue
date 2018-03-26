<template>
  <div class="basic-information-search">
    <van-nav-bar
      title="自轮运转设备基础信息搜索"
      left-text="取消"
      right-text="搜索"
      @click-left="$router.go(-1)"
      @click-right="onClickRight"
    >
    </van-nav-bar>
    <div @click="isShowXMGLJG()">
      <van-row >
        <van-field
          v-bind:value="xmgljg"
          label="项目管理机构"
          placeholder="全部"
          disabled
        />
      </van-row>
    </div>
    <div @click="isShowXMMC()">
      <van-row >
        <van-field
          v-bind:value="xmmc"
          label="项目名称"
          placeholder="全部"
          disabled
        />
      </van-row>
    </div>
    <div >
      <van-row >
        <van-field
          v-model="sbxh"
          label="设备型号"
          placeholder="请输入设备型号"
        />
      </van-row>
    </div>
    <div >
      <van-row >
        <van-field
          v-model="sbmc"
          label="设备名称"
          placeholder="请输入设备名称"
        />
      </van-row>
    </div>
    <div >
      <van-row >
        <van-field
          v-model="hgzbh"
          label="合格证编号"
          placeholder="请输入合格证编号"
        />
      </van-row>
    </div>
    <div @click="startPicker">
      <van-row >
        <van-field
          v-bind:value="startDay"
          label="开始日期"
          disabled
        />
      </van-row>
    </div>
    <div @click="endPicker">
      <van-row >
        <van-field
          v-bind:value="endDay"
          label="结束日期"
          disabled
        />
      </van-row>
    </div>
    <van-row v-show="showxmgljg">
      <van-col>
        <van-picker :columns="xmgljgcolumns"
                    visible-item-count=3 v-bind:xmgljg="xmgljg" show-toolbar @cancel="closeAll"
                    @confirm="onXMGLJGConfirm"
        />
      </van-col>
    </van-row>
    <van-row v-show="showxmmc">
      <van-col>
        <van-picker :columns="xmcolumns"
                    visible-item-count=3 v-bind:xmmc="xmmc" show-toolbar @cancel="closeAll"
                    @confirm="onXMConfirm"
        />
      </van-col>
    </van-row>
    <van-row v-show="showStartPicker">
      <van-col>
        <van-datetime-picker
          v-model="startDate"
          type="date"
          visible-item-count=3
          @confirm="startConfirm"
          @cancel="closeAll"
        />
      </van-col>
    </van-row>
    <van-row v-show="showEndPicker">
      <van-col>
        <van-datetime-picker
          v-model="endDate"
          type="date"
          visible-item-count=3
          @confirm="endConfirm"
          @cancel="closeAll"
        />
      </van-col>
    </van-row>
  </div>

</template>

<script>
    import Header from '../Common/Header'
    import { NavBar,Field,Picker,Radio,Toast,DatetimePicker  } from 'vant';
    import Vue from 'vue';
    import axios from 'axios';
    export default {
      name: "basic-information-search",
      components: {
        Header,NavBar,Field,Picker,Radio,Toast,DatetimePicker
      },
      data() {
        return {
          //项目名称相关
          xmmc:'',
          xmmc_id:'',
          /*xmmc:this.$route.query.slectProjectName===undefined?'':this.$route.query.slectProjectName,
          xmmc_id:this.$route.query.slectProjectId===undefined?'':this.$route.query.slectProjectId,*/
          showxmmc:false,
          xiangmuServlet:[],
          xmcolumns:['全部'],
          //项目管理机构
          xmgljg:'',
          xmgljg_id:'',
          showxmgljg:false,
          xmgljgServlet:[],
          xmgljgcolumns:['全部'],
          //设备型号
          sbxh:'',
          //设备名称
          sbmc:'',
          //合格证编号
          hgzbh:'',
          //开始日期
          showStartPicker:false,
          startDate:new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          //startDate:new Date(this.$route.query.date),
          startDay: new Date().getFullYear()+(new Date().getMonth()>=9?"-":"-0")+(new Date().getMonth()+1)+"-01",
          //startDay: this.$route.query.date,
          //结束日期相关
          showEndPicker:false,
          endDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
          //endDate: new Date(this.$route.query.date),
          endDay: new Date().getFullYear()+(new Date().getMonth()>=9?"-":"-0")+(new Date().getMonth()+1)+(new Date().getDate()>9?"-":"-0")+new Date().getDate(),
          //endDay: this.$route.query.date,
        };
      },
      mounted: function() {
        this.getXiangmuServlet();
        this.getXmgljgServlet();
      },
      methods: {
        closeAll(){
          this.showxmmc=false
          this.showxmgljg=false
          this.showStartPicker=false
          this.showEndPicker=false
        },
        closeOthers(value){
          if(value!='xmmc'){
            this.showxmmc=false
          }
          if(value!='xmgljg'){
            this.showxmgljg=false
          }
          if(value!='ksrq'){
            this.showStartPicker=false
          }
          if(value!='jsrq'){
            this.showEndPicker=false
          }
        },
        getXiangmuServlet(){
          axios.get('http://tljjgxt.r93535.com/XiangmuServlet?orgid=265&baseuserid='+this._GLOBAL.baseUserId)
            .then(response => {
              this.xiangmuServlet = response.data
              var data = this.xiangmuServlet
              for(var i in data) {
                console.log(data[i].id)
                console.log(data[i].xmmc)
                this.xmcolumns.push(data[i].xmmc)
              }
              console.log(response.data)
              console.log(this.xiangmuServlet)
              console.log(this.xmcolumns)
            }).catch(err => {
            console.error(err.message)
          })
        },
        getXmgljgServlet(){
          axios.get('http://tljjgxt.r93535.com/XmgljgServlet?baseuserid='+this._GLOBAL.baseUserId)
            .then(response => {
              this.xmgljgServlet = response.data
              var data = this.xmgljgServlet
              for(var i in data) {
                console.log(data[i].id)
                console.log(data[i].subcompanyname)
                this.xmgljgcolumns.push(data[i].subcompanyname)
              }
              console.log(response.data)
              console.log(this.xmgljgServlet)
              console.log(this.xmgljgcolumns)
            }).catch(err => {
            console.error(err.message)
          })
        },
        isShowXMMC(){
          this.closeOthers('xmmc')
          this.showxmmc=!this.showxmmc
        },
        onXMConfirm(value, index) {
          var data = this.xiangmuServlet
          for(var i in data) {
            if(index!=0){
              if(data[i].xmmc==value){
                this.xmmc=data[i].xmmc
                this.xmmc_id=data[i].id
              }
            }else{
              this.xmmc_id=''
              this.xmmc='全部'
            }
          }
          this.closeAll()
        },
        isShowXMGLJG(){
          this.closeOthers('xmgljg')
          this.showxmgljg=!this.showxmgljg
        },
        onXMGLJGConfirm(value, index) {
          var data = this.xmgljgServlet
          for(var i in data) {
            if(index!=0){
              if(data[i].subcompanyname==value){
                this.xmgljg=data[i].subcompanyname
                this.xmgljg_id=data[i].id
              }
            }else{
              this.xmgljg_id=''
              this.xmgljg='全部'
            }
          }
          this.closeAll()
          // Toast(`当前值：${value}, 当前索引：${index}`);
        },
        startPicker(){
          this.closeOthers('sgksrq')
          this.showStartPicker = !this.showStartPicker
        },
        startConfirm(){
          //Toast(`当前值：`+this.startDate);
          this.startDay = this.startDate.getFullYear()+(this.startDate.getMonth()>=9?"-":"-0")+(this.startDate.getMonth()+1)+(this.startDate.getDate()>9?"-":"-0")+this.startDate.getDate(),
            this.closeAll()
        },
        endPicker(){
          this.closeOthers('jsrq')
          this.showEndPicker = !this.showEndPicker
        },
        endConfirm(){
          //Toast(`当前值：`+this.startDate);
          this.endDay = this.endDate.getFullYear()+(this.endDate.getMonth()>=9?"-":"-0")+(this.endDate.getMonth()+1)+(this.endDate.getDate()>9?"-":"-0")+this.endDate.getDate(),
            this.closeAll()
        },
        onClickLeft() {
          this.$router.push({path: '/BasicInformation/BasicInformationIndex'});
          Toast('返回');
        },
        onClickRight() {
          var query={
            xmgljg:this.xmgljg_id,
            xmmc:this.xmmc_id,
            sbxh:this.sbxh,
            sbmc:this.sbmc,
            hgzbh:this.hgzbh,
            ksrq:this.startDay,
            jsrq:this.endDay,
          }
          this.$router.push({path: '/BasicInformation/BasicInformationIndex',query:query});
          /*this.$router.push({path: '/BusinessLine/'});*/
        }
      }
    }


</script>

<style scoped>
  .van-col{
    height:44px;
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
  .van-picker{
    bottom: 55px;
  }
</style>

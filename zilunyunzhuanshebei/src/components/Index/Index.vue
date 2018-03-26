<template>
  <div class="nonBusinessLine">
    <!--<van-nav-bar title="自轮运转设备" fixed right-text=">" left-text="<"-->
                 <!--@click-left="onClickLeft"-->
                 <!--@click-right="onClickRight"></van-nav-bar>-->
    <van-nav-bar title="自轮运转设备" fixed ></van-nav-bar>
    <div class="content">
      <van-row>
        <van-col span="8">
          <div class="imgB imgB1" @click="todowork()">
            {{ToDoWorkflowCount}}
          </div>
          <p @click="todowork()">待我审批</p>
        </van-col>
        <van-col span="8">
          <div class="imgB imgB2" @click="dowork()">
          </div>
          <p @click="dowork()">我已审批</p>
        </van-col>
        <van-col span="8">
          <div class="imgB imgB3" @click="icrate()">
          </div>
          <p @click="icrate()">我发起的</p>
        </van-col>
      </van-row>
    </div>
    <div class="charts">
      <el-table
        :data="tableData6"
        :max-height="myheight"
        :row-class-name="tableRowClassName"
        :span-method="objectSpanMethod"
        cell-style="text-align:center"
        header-cell-style="text-align:center;background: #E5F2FA"
        align="center"
        show-summary
        :summary-method="getSummaries"
        border
        style="width: 100%; margin-top: 20px;text-align: center">
        <el-table-column
          prop="xmmc"
          fixed
          label="项目名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="count"
          label="合计(个)">
        </el-table-column>
        <el-table-column
          prop="sbmc"
          width="250"
          label="设备名称">
        </el-table-column>
        <el-table-column
          prop="hgzbh"
          label="合格证编号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="sdcs"
          label="上道次数（个）"
          width="120">
        </el-table-column>
        <el-table-column
          prop="hgzrq"
          label="合格证到期时间"
          width="120">
        </el-table-column>
      </el-table>
    </div>
    <iframe  style="margin-top:93px;width:100%;height:1000px;display:none" src="sessionUrl"></iframe>
  </div>
</template>

<script>
  import axios from 'axios';
  import Header from '../Common/Header'
  import {Row, Col} from 'vant';
  import {mapGetters,mapActions} from 'vuex'

  export default {
    name: 'index',// 和组件名称保持一致，只不过是小写的
    data() {
      return {
        myheight:window.innerHeight-200,
        baseuserid:this._GLOBAL.baseUserId,
        tableData6: [],
        spans:[],
        ToDoWorkflowCount: '',//存放获取待办流程条数
        workflowTypeId:this._GLOBAL.workflowTypeId,
        charts: '',
        mywidth: window.innerWidth + 'px',
        month: '2018-02',
        type: 2,
        month_details: [],
        month_statistics: [],
        sessionId:'',
        sessionUrl:'',
        sum_sdcs:0
      }
    },
    components: {
      Header
    },
    mounted: function () {
      if(window.location.search!=''){
        var sessionid = this.getQueryVariable('sessionid')
        if(!this._GLOBAL.isEmptyObject(sessionid)){
          this._GLOBAL.setSessionId(sessionid)
          this._GLOBAL.setSessionUrl('http://tljjgxt.r93535.com:89/verifyLogin.do?loginid='+sessionid)
        }
        var userid=this.getQueryVariable('userid')
        if(!this._GLOBAL.isEmptyObject(userid)){
          this._GLOBAL.setBaseUserId(userid)
          this.GetToDoWorkflowCount(userid)
          this.getdata(userid);
        }
      }
    },
    methods: {
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          if(index === 1){
            sums[index] = this.tableData6.length;
            return;
          }
          if(index === 4){
            sums[index] = this.sum_sdcs
            return;
          }
        })
        return sums;
      },
      getQueryVariable(variable){
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
          var pair = vars[i].split("=");
          if(pair[0] == variable){return pair[1];}
        }
        return('');
      },
      getdata(baseuserid){
        var url='http://tljjgxt.r93535.com/ZlyzsbProjectsdcsMobileServlet?baseuserid='+baseuserid
        console.log(url)
        axios.get(url).then(response => {
          this.tableData6= response.data
          this.getSpan(this.tableData6)
          console.log(this.tableData6)
        }).catch(err => {
          console.error(err.message)
        })
      },
      tableRowClassName({row, rowIndex}) {
        /*debugger*/
        /*if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }*/
        if(row.day<=0){
          return 'prompt-row';
        }else if(row.day<30){
          return 'warning-row';
        }else{
          return 'success-row';
        }
        return '';
      },
      getSpan(data){
        var t=0
        for(var i = 0;i < data.length; i++){
          if(i===t){
            this.spans.push(data[i].count)
            t=t+data[i].count
          }else{
            this.spans.push(0)
          }
          this.sum_sdcs=data[i].sdcs
        }
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0|columnIndex === 1) {
          var data=this.spans
          if(data[rowIndex]===0){
            return {
              rowspan: 0,
              colspan: 0
            }
          }else{
            return {
              rowspan: data[rowIndex],
              colspan: 1
            }
          }
        }
      },
      todowork() {
        //跳转到待我审批页面展示
        this.$router.push({path: '/ToDoWork'});
      },
      dowork() {
        //跳转到我已审批页面展示
        this.$router.push({path: '/DoWork'});
      },
      icrate() {
        //跳转到我已审批页面展示
        this.$router.push({path: '/ICreate'});
      },
      //获取待我审批列表中的总条数
      GetToDoWorkflowCount(baseuserId) {
        var url = 'http://tljjgxt.r93535.com/GetToDoWorkflowCount?baseuserId='+baseuserId+'&workflowTypeId='+this.workflowTypeId
        axios.get(url)
          .then(response => {
            this.ToDoWorkflowCount = response.data;
          }).catch(err => {
          console.error(err.message)
        })
      },
      onClickLeft() {
        this.$router.push({path: '/OperationCondition/OperationConditionIndex'});
      },
      onClickRight() {
        this.$router.push({path: '/BasicInformation/BasicInformationIndex'});
        /*Toast('运行情况');*/
      },
    }
  }
</script>

<style scoped>
  .content{
    padding-top:10px;
    margin-top: 44px;
  }
  /* 设置头部 style start */
  .van-nav-bar{
    background: #2196F3;
    color: #fff;
  }
  .van-nav-bar .van-icon{
    color: #fff;
  }
  img{
    width:50px;
    height:50px;
  }
  .van-col.van-col-8{
    position: relative;
    height:90px;
  }
  .imgB{
    position: absolute;
    left:50%;
    margin-left:-20%;
    width:40%;
    height:50px;
    text-align: center;
    line-height:50px;
    color: #fff;
  }

  .imgB1{
    background: url("../../assets/images/sgrjhImages/dsp.png") no-repeat center;
    -webkit-background-size: contain;
    background-size: contain;
  }
  .imgB2{
    background: url("../../assets/images/sgrjhImages/ysp.png") no-repeat center;
    -webkit-background-size: contain;
    background-size: contain;
  }
  .imgB3{
    background: url("../../assets/images/sgrjhImages/fqd.png") no-repeat center;
    -webkit-background-size: contain;
    background-size: contain;
  }
  p{
    position: absolute;
    top:50px;
    left:0%;

    width:100%;
    height:48px;

    text-align: center;
    line-height:48px;
  }
  .charts{
    margin-bottom: 55px;
  }
  .chartsSize{
    font-size: 14px;
  }
  /*.charts .van-col{*/
  /*border: 1px solid #ccc;*/

  /*}*/
  .charts .van-row{
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    margin-top:-1px;

  }
  .charts .van-row:last-child{
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
  }
  .charts .van-col{
    border-right:1px solid #ccc;
  }
  .charts .van-col:last-child{
    border-right:0;
  }
  .el-table_1_column_4 .is-leaf:last-child{
    display:none;
  }

  /*修改样式*/
.el-table__fixed{
  height: 100%;
}
  .el-table .cell{
    font-weight:700;
    color: #909399;
  }
</style>

<template>
  <div  :style="{height:myHeight}">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom"  ref="loadmore" :autoFill="autoFill">
      <div>
      <div>
        <van-nav-bar
      title="自轮运转设备运行情况记录"
      left-text="返回"
      right-text="关闭"
      @click-right="onClickRight"
      @click-left="$router.go(-1)"
      :height="myHeight"
      fixed
    ></van-nav-bar>
      </div>
    <div class="content">
      <van-row>
        <van-col span="8">项目名称</van-col>
        <van-col span="16">
          <span>{{xmmc}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">合格证编号</van-col>
        <van-col span="16">
          <span>{{hgzbh}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">设备型号</van-col>
        <van-col span="16">
          <span>{{sbxh}}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8">设备名称</van-col>
        <van-col span="16">
          <span>{{sbmc}}</span>
        </van-col>
      </van-row>
    </div>
      <div>
    <el-table
      :data="yxqkList"
      :height="myHeight-280"
      @row-click="handleRowHandle"
    >
      <el-table-column
        fixed
        prop="sdsj"
        label="上道日期"
        :width="0.3*myWidth"
      >
      </el-table-column>
      <el-table-column
        prop="yxsc"
        label="运行时长"
        :width="0.3*myWidth"
      >
      </el-table-column>
      <el-table-column
        prop="clzydd"
        label="车辆作业地点"
        :width="0.4*myWidth">
      </el-table-column>
    </el-table>
      </div>
      </div>
    </mt-loadmore>
  </div>
</template>


<script>
  import { Dialog,Button,Row, Col,Field,Toast  } from 'vant';
  import axios from 'axios';
  import { Loadmore } from 'mint-ui'
  export default {
    name: "operation-condition-list",
    data() {
      return {
        autoFill:false,
        myHeight:window.innerHeight+'px',
        myWidth:window.innerWidth,
        rst:false,
        noData:'',
        totalPages:0,
        xmmc:this.$route.query.xmmc,
        hgzbh_id:this.$route.query.id,
        hgzbh:this.$route.query.hgzbh,
        sbxh:this.$route.query.sbxh,
        sbmc:this.$route.query.sbmc,
        count:0,
        yxqkList:[],
        page:1
      }
    },
    mounted:function () {
      // debugger
      this.getData(1,this.$route.query.id,0)
    },
    watch: {
      $route: function (to, from) {
        // debugger
        if(to.path==="/OperationCondition/OperationConditionHistory"){
          if(!this.isEmptyObject(to.query)){
            this.id=to.query.id
            this.xmmc=to.query.xmmc,
              this.hgzbh_id=to.query.id,
              this.hgzbh=to.query.hgzbh,
              this.sbxh=to.query.sbxh,
              this.sbmc=to.query.sbmc,
            this.getData(1,to.query.id,0)
          }
        }
      },
    },
    methods: {
      isEmptyObject(e) {
        var t;
        for (t in e)
          return !1;
        return !0
      },
      handleRowHandle(row) {
        var id=row.id
        var query={
          id:id
        }
        this.$router.push({path: '/OperationCondition/OperationConditionDetail',query});
      },
      onClickRight(){
        RPM.closeApplication();
      },
      loadTop(){
        if(this.page<this.totalPages){
          this.getData(this.page,this.$route.query.id,1)
        }else{
          Toast.fail('没有更多数据了')
        }
        this.$refs.loadmore.onTopLoaded();
      },
      loadBottom(){
        if(this.page>1){
          this.getData(this.page,this.$route.query.id,-1)
        }else{
          Toast.fail('已经是第一页了')
        }
        this.allLoaded = true;// 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded();
      },
      onClickLeft() {
        this.$router.push({path: '/OperationCondition/OperationConditionIndex'})
      },
      getData(page,hgzbh,offset){
        page=page+offset
        this.page=page
        this.rst=false
        var url='http://tljjgxt.r93535.com/ZlyzsbYxqkListServlet?page='+page+'&hgzbh='+hgzbh
        axios.get(url)
          .then(response => {
            var data= response.data.data
            this.count=response.data.count
            this.totalPages = Math.ceil(this.count / 10);
            this.yxqkList=[]
            for(var i in data) {
              this.yxqkList.push(data[i])
            }
            this.rst=true
            Toast.success('加载成功')
          }).catch(err => {
          console.error(err.message)
          this.rst=false
          Toast.fail('加载失败')
        })
      }
    }
  }
</script>
<style>

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
</style>

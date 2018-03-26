<template>
  <el-collapse accordion v-model="activeNames" @change="handleChange">
    <el-collapse-item>
      <template slot="title">
        <el-row>
          <el-col :span="6"><div class="grid-content bg-purple">aaaa</div></el-col>
          <el-col :span="5"><div class="grid-content bg-purple-light">bbbb</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">cccc</div></el-col>
          <el-col :span="3"><div class="grid-content bg-purple-light">dddd</div></el-col>
        </el-row>
      </template>
      <div><el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          >
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table></div>
    </el-collapse-item>
    <el-collapse-item title="反馈 Feedback">
      <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
      <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
    </el-collapse-item>
    <el-collapse-item title="效率 Efficiency">
      <div>简化流程：设计简洁直观的操作流程；</div>
      <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
      <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
    </el-collapse-item>
    <el-collapse-item title="可控 Controllability">
      <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
      <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
    </el-collapse-item>
  </el-collapse>
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
  export default {
    name: "operation-condition-list",
    data() {
      return {
        activeNames: ['1'],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      handleChange(val) {
        console.log(val);
      }
    }
  }
</script>

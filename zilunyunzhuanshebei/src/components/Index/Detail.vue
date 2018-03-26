<template>
  <div>
    <!--<van-nav-bar title="详情" left-text="返回" right-text="关闭"  @click-right="onClickRight"  @click-left="$router.go(-1)" ></van-nav-bar>-->
    <van-nav-bar title="详情" left-text="返回" right-text="关闭"  @click-right="onClickRight"  @click-left="onClickLeft" ></van-nav-bar>
    <iframe  style="margin-top:2px;width:100%;height:1000px;" :src="url"></iframe>
  </div>
</template>

<script>
    export default {
        name: "HomeDetail",
      data() {
        return {
          url:''
        }
      },
      activated: function() {
        $($('.van-tabbar--fixed')[0]).css({
          'bottom':'-50px'
        })
      },
      mounted: function() {
        var data = this.$route.query
        this.url=data.url
        console.log(this.url)
      },
      watch: {
        $route: function (to, from) {
          console.log("watch函数............")
          if(to.path==='/Index/Detail'){
            var data = to.query;
            this.url=data.url
            console.log(this.url)
          }
        }
      },
      methods: {
        // 表头返回按钮事件
        getUrl() {
          // Toast('返回');
          this.$router.push({path: '/Index'});
        },
        onClickRight(){
          RPM.closeApplication();
        },
        onClickLeft() {
          // 返回上一页
          this.$router.go(-1)
          // 修改tabbar的定位
          $($('.van-tabbar--fixed')[0]).css({
            'bottom':'0px'
          })
        }
      }
    }
</script>

<style scoped>

</style>

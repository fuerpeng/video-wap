<template>
  <div class="footer">
    <router-link to="/index">
      <div class="fonter-item">
          <div><i class="iconfont">&#xe620;</i></div>
          <span>首页</span>
      </div>
    </router-link>
    <router-link to="/hotVideo">
      <div class="fonter-item">
        <div><i class="iconfont">&#xe61f;</i></div>
        <span>热门视频</span>
      </div>
    </router-link>
    <router-link to="/favorite">
      <div class="fonter-item">
        <div><i class="iconfont">&#xe687;</i></div>
        <span>收藏</span>
      </div>
    </router-link>
    <!--<div class="fonter-item">-->
      <!--<div><i class="iconfont">&#xe602;</i></div>-->
      <!--<span>登录</span>-->
    <!--</div>-->
  </div>
</template>

<script>
  export default {}
</script>

<style lang="less" scoped>
.footer{
  position: fixed;
  bottom: 0;
  left:0;
  right: 0;
  height: 50px;
  overflow: hidden;
  border-top: 2px solid #dedede;
  .fonter-item{
    float: left;
    width: 33.333333%;
    color: #c0c0c0;
    text-align: center;
    i{
      font-size: 25px;
    }
    span{
      font-size: 14px;
      position: relative;
      top: -4px;
    }
    >div{
     height: 30px;
      line-height: 30px;
    }
  }
  .router-link-active{
      color: #ff6faf !important;
    .fonter-item{
      color: #ff6faf !important;
    }
  }
}
</style>

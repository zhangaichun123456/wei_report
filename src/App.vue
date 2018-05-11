<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
/*图片弹框设置*/
.dayreport fieldset, img{
	max-width: 100%;
	max-height: 100%;
	margin:0 auto!important;
}
.dayreport .btn-block{
  width: 95%;
  height: .8rem;
  text-align: center;
  margin: .3rem auto;
}
.m-input input{
  padding-left: .6rem;
}
.m-checkbox>.checkbox-icon{
  vertical-align: middle!important;
  border-radius: 50%!important;
}
.readlog .sendmelist .btn{
  height:.4rem;
}
.readlog .tab-nav{
  position: fixed;
  /*top: .8rem;*/
  top:0;
  width: 100%;
  z-index: 10;
}
.readlog .tab-panel{
  position: absolute;
  top: 1.1rem;
  width: 100%;
}
.readlog .tab-panel{
  background: #f5f5f5;
}
.readday .cell-item{
  padding-left: 0；
}
.readday .m-input input,.readmouth .m-input input,.readvisit .m-input input,.readweek .m-input input{
  padding-left: 0;
}
.weui-cells,.weui-textarea{
  font-size: 14px!important;
}
.weui-cells{
  margin-top:0!important;
}
.weui-cells:before{
  border-top:none!important;
}
.weui-cells:after{
  border-bottom:none!important;
}
.cell-title{
  padding: .1rem .24rem;
}
</style>

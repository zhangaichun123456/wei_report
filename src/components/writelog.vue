<template>
  <div class="writelog">
     <!-- <yd-navbar slot="navbar" title="写日志">
        <router-link to="#" slot="left">
            <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
    </yd-navbar> -->
    <ul>      
      <li @click="godayreport"><yd-icon name="feedback" size=".4rem"></yd-icon><span>工作日报</span></li>
      <li @click="weekreport"><yd-icon name="feedback" size=".4rem"></yd-icon><span>工作周报</span></li>
      <li @click="mouthreport"><yd-icon name="feedback" size=".4rem"></yd-icon><span>工作月报</span></li>
      <li @click="visitreport"><yd-icon name="feedback" size=".4rem"></yd-icon><span>拜访记录</span></li>
    </ul>
    <div class="foot">
      <yd-tabbar slot="tabbar">
          <yd-tabbar-item title="写日志" link="#" active>
              <yd-icon name="compose" slot="icon" size="0.54rem"></yd-icon>
          </yd-tabbar-item>
          <yd-tabbar-item title="看日志" link="readlog">
              <yd-icon name="search" slot="icon" size="0.54rem"></yd-icon>
              <yd-badge slot="badge" type="danger">{{unread.length}}</yd-badge>
          </yd-tabbar-item>
      </yd-tabbar>
    </div>
  </div>
</template>

<script>
import qs from 'qs';
import {mapState, mapMutations} from 'vuex'
export default {
  data () {
    return {
      unread:[],
    }
  },
  mounted:function(){
      this.$nextTick(function(){
        this.getpramas();
        this.getUnreadnum();
      })
  },
  computed:{
      ...mapState([
            'entId',
            'token'
      ]),
    },
  methods:{
    ...mapMutations([
          'record_token',
          'record_entId',
      ]),
    getpramas (){
      this.record_token(this.$route.query.token);
      this.record_entId(this.$route.query.entId);
    },
    // 从我收到的获取未读数
    getUnreadnum (){
        let datas={
              entId:this.entId,
              begtime:'',
              endtime:'',
              state:'',
              type:'',
              userIdlist:[],
             };
        let datastr=JSON.stringify(datas);
        let params={
           token:this.token,
           data:datastr
        }
        this.$ajax.post(this.baseurl+'report/sendme',qs.stringify(params)).then((res)=>{
          var res=res.data;
          if(res.code==0){
            var sendlist=res.data;
            for(let i=0;i<sendlist.length;i++){
              if(sendlist[i].status==0){
                this.unread.push(sendlist[i]);
              }
            }
          }
        }).catch((res)=>{
          this.$dialog.toast({
              mes: '请求数据失败',
              timeout: 1500,
            });
        })
    },
    godayreport (){
      this.$router.push('/dayreport');
    },
    weekreport (){
      this.$router.push('/weekreport');
    },
    mouthreport (){
      this.$router.push('/mouthreport');
    },
    visitreport (){
      this.$router.push('/visitreport');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul{
  background: #fff;
}
ul li{
  height: 1rem;
  line-height: 1rem;
  text-align: left;
  font-size: 16px;
  padding-left: .3rem;
  border-bottom: 1px solid #ccc;
}
ul li span{
  margin-left: .5rem;
}
.foot{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>

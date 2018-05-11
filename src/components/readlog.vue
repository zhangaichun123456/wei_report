<template>
  <div class="readlog">
   <!--  <div class="head">
      <yd-navbar slot="navbar" title="看日志">
          <router-link to="#" slot="left">
              <span @click="goup"><yd-navbar-back-icon></yd-navbar-back-icon></span>
          </router-link>
      </yd-navbar>
    </div> -->
    <div class="content">
      <yd-tab>
          <yd-tab-panel :label='sendmenumtip'>
            <yd-cell-group>
                <yd-cell-item arrow type="label">
                    <span slot="left">日志状态：</span>
                    <select slot="right" v-model="state" @change="changevalue">
                        <option value="">全部</option>
                        <option value="0">未读</option>
                        <option value="1">已读</option>
                    </select>
                </yd-cell-item>
                <yd-cell-item arrow type="label">
                    <span slot="left">日志类型：</span>
                    <select slot="right" v-model="type" @change="changevalue">
                        <option value="">全部</option>
                        <option value="0">日报</option>
                        <option value="1">周报</option>
                        <option value="2">月报</option>
                        <option value="3">拜访记录</option>
                    </select>
                </yd-cell-item>
                <div @click="seniorchoose">
                  <yd-cell-item arrow>
                      <span slot="left">高级筛选</span>
                  </yd-cell-item>
                </div>
            </yd-cell-group>
           <div class="wrapper">
              <ul class="sendmelist" v-show="showgjchoose==false">
                <p class="norizhi" v-show="sendmelist.length==0">暂无日志</p>
                <li v-for="(item,index) in sendmelist" @click="reportdetailclick(item,index)">
                  <div class="left">
                    <img :src="item.avatarUrl" alt="" class="touxiang">
                    <div class="info">
                      <p>{{item.empName}}</p>
                      <p>{{item.createTime}}</p>
                    </div>
                  </div>
                  <div class="right">
                    <p class="rightbtn"><yd-button type="hollow">{{item.reportType1}}</yd-button></p>
                    <p><yd-button type="hollow">{{item.status1}}</yd-button></p>
                  </div>
                </li>
              </ul>
              <div v-show="showgjchoose==true">
                <div class="sendto">
                  <p class="headtip">选择发送人</p>
                  <ul class="sendperpson">
                      <li v-for="(peo,index) in gjchoose">
                        <img :src="peo.avatarUrl" alt="" @click="delchoosepeo(index)">
                        <p>{{peo.name}}</p>
                      </li>
                    <li @click="addpeo"><img :src="addicon" alt=""><p>添加人员</p></li>
                  </ul>                  
                </div>
                <div class="time">
                  <yd-cell-item arrow>
                    <span slot="left">开始时间：</span>
                    <yd-datetime v-model="starttime" type="datetime" slot="right"></yd-datetime>
                  </yd-cell-item>
                  <yd-cell-item arrow>
                    <span slot="left">结束时间：</span>
                    <yd-datetime v-model="endtime" type="datetime" slot="right"></yd-datetime>
                  </yd-cell-item>
                </div>
                <div class="cleardata">
                  <span @click="resettj"><yd-button type="hollow">重置条件</yd-button></span>
                  <span @click='showgjchoose=false'><yd-button type="hollow">关闭高级筛选</yd-button></span>
                </div>
                <div class="cleardata">
                  <span @click="sureshaixuan"><yd-button type="primary">确定筛选</yd-button></span>
                </div>
              </div>
           </div>
          </yd-tab-panel>
          <yd-tab-panel :label='mesendnumtip'>
            <ul class="sendmelist">
                <p class="norizhi" v-show="mesendlist.length==0">暂无日志</p>
                <li v-for="item in mesendlist" @click="reportdetailclick2(item)">
                  <div class="left">
                    <img :src="item.avatarUrl" alt="" class="touxiang">
                    <div class="info">
                      <p>{{item.empName}}</p>
                      <p>{{item.createTime}}</p>
                    </div>
                  </div>
                  <div class="right">
                    <p class="rightbtn"><yd-button type="hollow">{{item.reportType1}}</yd-button></p>
                  </div>
                </li>
              </ul>
          </yd-tab-panel>
      </yd-tab>
    </div>
    <div class="foot" v-show="showgjchoose==false">
      <yd-tabbar slot="tabbar">
          <yd-tabbar-item title="写日志" link="writelog">
              <yd-icon name="compose" slot="icon" size="0.54rem"></yd-icon>
          </yd-tabbar-item>
          <yd-tabbar-item title="看日志" link="#" active>
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
import downarrow from './../image/down.png'
import addicon from './../image/add.png'
export default {
  data () {
    return {
      downarrow:downarrow,
      unread:[],
      sendmelist:[],
      mesendlist:[],
      sendmenumtip:'',
      mesendnumtip:'',
      touxiang:downarrow,
      showgjchoose:false,
      addicon:addicon,
      starttime:'2017-01-01 00:00',
      endtime:'2027-01-01 00:00',
      state:'',
      type:'',
    }
  },
  mounted:function(){
      this.$nextTick(function(){
        this.getsendme();
        this.getmysend();
      })
  },
  computed:{
      ...mapState([
            'gjchoose',
            'gjempid',
            'entId',
            'token',
            'reportdetail',
      ]),
    },
  methods:{
    ...mapMutations([
          'record_gjchoose',
          'record_gjempid',
          'recourd_detail',
      ]),
    // goup (){
    //   this.$router.go(-1);
    // },
    // 我收到的
    getsendme (){
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
          if(res.code ==0){
            this.sendmelist=res.data;
            this.sendmenumtip='我收到的('+this.sendmelist.length+')'
            for(let i=0;i<this.sendmelist.length;i++){
              if(this.sendmelist[i].status==0){
                this.unread.push(this.sendmelist[i]);
                this.$set(this.sendmelist[i],'status1','未读')
              }
              if(this.sendmelist[i].status==1){
                this.$set(this.sendmelist[i],'status1','已读')
              }
              if(this.sendmelist[i].status==2){
                this.$set(this.sendmelist[i],'status1','已评')
              }
              if(this.sendmelist[i].reportType==0){
                this.$set(this.sendmelist[i],'reportType1','日报')
              }
              if(this.sendmelist[i].reportType==1){
                this.$set(this.sendmelist[i],'reportType1','周报')
              }
              if(this.sendmelist[i].reportType==2){
                this.$set(this.sendmelist[i],'reportType1','月报')
              }
              if(this.sendmelist[i].reportType==3){
                this.$set(this.sendmelist[i],'reportType1','拜访记录')
              }
            }
          }else{
            this.$dialog.toast({
                  mes: res.msg,
                  timeout: 1500,
              });
          }
        }).catch((res)=>{
            this.$dialog.toast({
                  mes: "获取数据失败",
                  timeout: 1500,
              });
        })
    },
    //我发出的
    getmysend (){
        let datas={
              entId:this.entId,
             };
        let datastr=JSON.stringify(datas);
        let params={
           token:this.token,
           data:datastr
        }
        this.$ajax.post(this.baseurl+'report/mysend',qs.stringify(params)).then((res)=>{
          var res=res.data;
          if(res.code==0){
            this.mesendlist=res.data;
            this.mesendnumtip='我发出的('+this.mesendlist.length+')';
            for(let i=0;i<this.mesendlist.length;i++){
              if(this.mesendlist[i].reportType==0){
                this.$set(this.mesendlist[i],'reportType1','日报')
              }
              if(this.mesendlist[i].reportType==1){
                this.$set(this.mesendlist[i],'reportType1','周报')
              }
              if(this.mesendlist[i].reportType==2){
                this.$set(this.mesendlist[i],'reportType1','月报')
              }
              if(this.mesendlist[i].reportType==3){
                this.$set(this.mesendlist[i],'reportType1','拜访记录')
              }
            }
          }else{
            this.$dialog.toast({
                  mes: res.msg,
                  timeout: 1500,
              });
          }
        }).catch((res)=>{
            this.$dialog.toast({
                  mes: "获取数据失败",
                  timeout: 1500,
              });
        })
    },
    //高级筛选
    seniorchoose (){
      this.showgjchoose=true;
    },
    //点击头像删除该成员
    delchoosepeo (index){
        this.gjchoose.splice(index,1);
        this.gjempid.splice(index,1)
    },
    addpeo (){
        this.$router.push('/gjchoose');
    },
    //切换筛选条件时
    changevalue (){
        let datas={
              entId:this.entId,
              begtime:this.starttime,
              endtime:this.endtime,
              state:this.state,
              type:this.type,
              userIdlist:this.gjempid,
             };
        let datastr=JSON.stringify(datas);
        let params={
           token:this.token,
           data:datastr
        }
       this.$ajax.post(this.baseurl+'report/sendme',qs.stringify(params)).then((res)=>{
         var res=res.data;
         if(res.code==0){
           this.sendmelist=res.data;
           for(let i=0;i<this.sendmelist.length;i++){
              if(this.sendmelist[i].status==0){
                this.$set(this.sendmelist[i],'status1','未读')
              }
              if(this.sendmelist[i].status==1){
                this.$set(this.sendmelist[i],'status1','已读')
              }
              if(this.sendmelist[i].status==2){
                this.$set(this.sendmelist[i],'status1','已评')
              }
              if(this.sendmelist[i].reportType==0){
                this.$set(this.sendmelist[i],'reportType1','日报')
              }
              if(this.sendmelist[i].reportType==1){
                this.$set(this.sendmelist[i],'reportType1','周报')
              }
              if(this.sendmelist[i].reportType==2){
                this.$set(this.sendmelist[i],'reportType1','月报')
              }
              if(this.sendmelist[i].reportType==3){
                this.$set(this.sendmelist[i],'reportType1','拜访记录')
              }
            }
            if(this.sendmelist.length==0){
              this.$dialog.toast({
                  mes: '暂无数据',
                  timeout: 1500,
              });
            }
         }else{
            this.$dialog.toast({
                mes: res.msg,
                timeout: 1500,
            });
         }
       })
    },
    //重置条件
    resettj (){
      this.record_gjchoose([]);
      this.record_gjempid([]);
      this.starttime='2017-01-01 00:00';
      this.endtime='2027-01-01 00:00';
    },
    // 确定筛选
    sureshaixuan (){
       this.showgjchoose=false;
       this.changevalue();
       // this.resettj();
    },
    //查看日志详情,我收到的
    reportdetailclick (item,index){
      let datas={
            entId:this.entId,
            reportId:item.reportId,
            reportType:item.reportType,
            sendtype:0,
           };
      let datastr=JSON.stringify(datas);
      let params={
         token:this.token,
         data:datastr
      }
      this.$ajax.post(this.baseurl+'report/getmyinfo',qs.stringify(params)).then((res)=>{
        var res=res.data;
        if(res.code==0){
          // 更新日志列表状态
          if(this.sendmelist[index].status1=='未读'){
            this.sendmelist[index].status1="已读";
            this.unread.splice()
          }
          //更新底部看日志的未读数
          for(var i=0;i<this.unread.length;i++){
            if(item.reportId==this.unread[i].reportId){
              this.unread.splice(i,1);
            }
          }
          //保存详情
          this.recourd_detail(res.data);
          //根据日志类型跳转对应页面s
          if(item.reportType==0){
            this.$router.push({ path: 'readday', query:{ type: this.reportdetail.sendtype,reportId:item.reportId,reportType:item.reportType,entid:this.entId,token:this.token }})
          }else if(item.reportType==1){
            this.$router.push({ path: 'readweek', query:{ type: this.reportdetail.sendtype,reportId:item.reportId,reportType:item.reportType,entid:this.entId,token:this.token }})
          }else if(item.reportType==2){
             this.$router.push({ path: 'readmouth', query:{ type: this.reportdetail.sendtype,reportId:item.reportId,reportType:item.reportType,entid:this.entId,token:this.token }})
          }else if(item.reportType==3){
            this.$router.push({ path: 'readvisit', query:{ type: this.reportdetail.sendtype,reportId:item.reportId,reportType:item.reportType,entid:this.entId,token:this.token }})
          }
        }else{
           this.$dialog.toast({
                mes: res.msg,
                timeout: 1500,
            });
        }
      })
    },
    //查看日志详情，我发出的
    reportdetailclick2 (item){
      let datas={
            entId:this.entId,
            reportId:item.reportId,
            reportType:item.reportType,
            sendtype:1,
           };
      let datastr=JSON.stringify(datas);
      let params={
         token:this.token,
         data:datastr
      }
      this.$ajax.post(this.baseurl+'report/getmyinfo',qs.stringify(params)).then((res)=>{
        var res=res.data;
        this.recourd_detail(res.data);
        if(res.code==0){
          if(item.reportType==0){
             this.$router.push({ path: 'readday', query:{ type: this.reportdetail.sendtype,reportId:item.reportId,reportType:item.reportType,entid:this.entId,token:this.token }})
          }else if(item.reportType==1){
            this.$router.push({ path: 'readweek', query:{ type: this.reportdetail.sendtype,reportId:item.reportId,reportType:item.reportType,entid:this.entId,token:this.token }})
          }else if(item.reportType==2){
            this.$router.push({ path: 'readmouth', query:{ type: this.reportdetail.sendtype,reportId:item.reportId,reportType:item.reportType,entid:this.entId,token:this.token }})
          }else if(item.reportType==3){
            this.$router.push({ path: 'readvisit', query:{ type: this.reportdetail.sendtype,reportId:item.reportId,reportType:item.reportType,entid:this.entId,token:this.token }})
          }
        }else{
           this.$dialog.toast({
                mes: res.msg,
                timeout: 1500,
            });
        }
      })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.readlog{
  position: relative;
}
/*.head{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}*/
.content{
  position: absolute;
  /*top: .8rem;*/
  top: 0;
  bottom: 1rem;
  width: 100%;
}
.downarrow{
  color: #eee;
  width: .3rem;
  height: .3rem;
}
.foot{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
.touxiang{
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
}
.sendmelist li{
  width: 95%;
  height: 1.5rem;
  background: #fff;
  margin: 0 auto .3rem;
  padding: .25rem;
}
.sendmelist .left,.sendmelist .right{
  display: inline-block;
  vertical-align:top;
}
.sendmelist .right{
  float: right;
}
.right p{
  text-align: right;
}
.touxiang,.info{
  display: inline-block;
  vertical-align: top;
}
.info{
  padding-left: .1rem;
  line-height: .5rem;
}
.rightbtn{
  margin-bottom: .2rem;
}
.sendto{
  background: #fff;
  margin-top: .3rem;
  padding: 0.1rem 0.2rem;
}
.sendto .headtip{
  text-align: left;
  padding: 0.1rem 0 .3rem 0.2rem;
  font-size: .3rem;
}
.sendto ul{
  text-align: left;
  padding: .2rem 0;
}
.sendto li{
  display: inline-block;
}
.sendto ul li{
  min-width: 1.5rem;
  text-align: center;
  margin-bottom: .4rem;
}
.sendto ul li p{
  padding-top: .2rem;
}
.sendto img{
  width: .6rem;
  height: .6rem;
  border-radius: 50%;
}
.time{
  background: #fff;
  margin-top: .2rem;
}
.cleardata{
  text-align: center;
  margin-top:.3rem;
}
.sendmelist{
  margin-bottom: 1.5rem;
}
.norizhi {
  font-size: 14px;
  text-align: center;
}
.wrapper{
  margin-bottom: 1rem;
}
</style>

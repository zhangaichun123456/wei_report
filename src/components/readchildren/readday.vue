<template>
	<div class="readday">
	   <div class="wrapper">
	       <div class="peoinfo">
		       	<div class="info">
		       		<img :src="reportdetail.imgUrl" alt="">
		       		<div class="infodetail">
		       			<p>{{reportdetail.name}}</p>
		       			<p>{{reportdetail.createTime}}</p>
		       		</div>
		       	</div>
		       	<div v-show="showping==true" class="right">
		       		<span>{{pingtxt}}</span>
		       	</div>
		       	<div class="xiugai" v-show="showping==false">
		            <!-- <span>修改</span> -->
		            <span @click="xiugai"><yd-button type="primary">修改</yd-button></span>
		        </div>
	       </div>
		   <div class="formcontent">
		        <div class="workcontent">
			      <div class="texttip">今日完成工作</div>
				  <div class="content">{{reportdetail.doneWork}}</div>
			    </div>
			    <div class="workcontent">
			      <div class="texttip">未完成工作</div>
			      <div class="content">{{reportdetail.undoneWork}}</div>
			    </div>
			    <div class="workcontent">
			      <div class="texttip">工作总结</div>
			      <div class="content">{{reportdetail.summary}}</div>
			    </div>
			    <div class="workcontent">
			      <div class="texttip">自我评价</div>
			      <div class="content">{{reportdetail.evaluation}}</div>
			    </div>  
			    <div class="workcontent">
			      <div class="texttip">明天工作计划</div>
			      <div class="content">{{reportdetail.plan}}</div>
			    </div>
			    <div class="workcontent">
			      <div class="texttip">备注</div>
			      <div class="content">{{reportdetail.remark}}</div>
			    </div>
		   </div>
		   <div class="images">
			   <p><span class="rowname">图片</span></p>
			   <div class="pic_wrapper" ref="picWrapper" v-show="reportdetail.reportImgList.length>0">
				   	<ul id="wrapper" class="imagelist" ref="picList">
				   	    <li v-for="(item,index) in reportdetail.reportImgList">
					   		<span></span><img :src="baseurl+item.path" alt="" @click="showlargeimg(index)">
				   		</li>
				   	</ul>
			   </div>
		   </div>
		   <div class="Enclosure">
		   	   <p>
				   <span class="rowname">附件</span>
			   </p>
			   <ul v-show="reportdetail.reportFileList.length>0">
				   <li v-for="(item,index) in reportdetail.reportFileList"> 
				        <span class="itemname">
						   	<p>{{item.name}}</p>
						   	<p class="fjsize">{{item.size}}KB</p>
					   	</span>
					   	<span class="delfj" @click="downfile(item)">
					   		<yd-button type="primary">下载</yd-button>
					   	</span>
				   </li>
			   </ul>
		   </div>
		   <div class="Position" id="allmap" v-show="reportdetail.position!=''">
			   <p> 
			       <span class="p_text">
					   <span><yd-icon name="location"></yd-icon></span>
					   <span>{{reportdetail.position}}</span>
					</span>
			   </p>
		   </div>
		   <div class="yidunum">
			    <p><span>已读</span><span>{{reportdetail.receivers.length}}人</span></p>
			    <ul class="yidulist">
			   	    <li v-for="(peo,index) in reportdetail.receivers">
			   	    	<img :src="baseurl+peo.avatarUrl">
			   	    	<p>{{peo.nickname}}</p>
			   	    </li>
			   	</ul>
		   </div>
		   <div class="newslist">
			   <p>共有{{reportdetail.reportComments.length}}条回复</p>
			   <ul class="newsul">
			   	    <li class="info" v-for="(item,index) in reportdetail.reportComments">
			   	        <div class="pingttouxiang">
				   	        <img :src="baseurl+item.avatarUrl">
			   	        </div>
			   	        <div class="infodetail">
				   	    	<div>
				       			<p>{{item.nickname}}</p>
				       			<p>{{item.createTime}}</p>
				       		</div>
				       		<div>{{item.content}}</div>
			       		</div>
			   	    </li>
			   	</ul>

		   </div>
		   <footer>
		   	<yd-flexbox>
	            <yd-flexbox-item>
		            <yd-cell-item>
			            <yd-input slot="right" v-model="sendcont" placeholder="请输入评论内容"></yd-input>
			        </yd-cell-item>
	            </yd-flexbox-item>
	            <div @click="sendbtn"><yd-button type="primary">发送</yd-button></div>
	        </yd-flexbox>
		   </footer>	  
	   </div>
	   <yd-popup v-model="largeimg" position="center" width="90%">
            <div><img :src="curlargeimg" alt=""></div>
        </yd-popup>
	</div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import BScroll from 'better-scroll'
import qs from 'qs';
export default{
	data() {
		return {
			largeimg:false,
			curlargeimg:null,
			images:[],
			files:[],
			showping:false,
			pingtxt:'',
			sendcont:'',
		}
	},
	mounted:function(){
        this.$nextTick(function(){
        	this.dandudata();
        })
	},
	computed:{
        ...mapState([
        	    'reportdetail',
                'entId',
                'token',
        ]),
    },
	methods:{
		...mapMutations([
			'recourd_detail',
            ]),
		goup (){
			this.$router.go(-1);
			this.sendcont='';
		},
		dandudata (){
			let datas={
	            entId:this.$route.query.entid,
	            reportId:this.$route.query.reportId,
	            reportType:this.$route.query.reportType,
	            sendtype:this.$route.query.type,
	           };
	        let datastr=JSON.stringify(datas);
	        let params={
	           token:this.$route.query.token,
	           data:datastr
	        }
	        this.$ajax.post(this.baseurl+'report/getmyinfo',qs.stringify(params)).then((res)=>{
	        	var res=res.data;
	        	if(res.code==0){
	        		this.recourd_detail(res.data);
	        		let typenum=this.$route.query.type;
					// 是否显示已读已评
					if(typenum==0){
						this.showping=true;
						if(this.reportdetail.status==1){
							this.pingtxt="已读";
						}else if(this.reportdetail.status==2){
		                    this.pingtxt="已评";
						}
					}else if(typenum==1){
					    this.showping=false;
					}
	        	}else{
	        		this.$dialog.toast({
		                mes: res.msg,
		                timeout: 1500,
		            });
	        	}
	        })
		},
		initdetail (){
			let typenum=this.$route.query.type;
			// 是否显示已读已评
			if(typenum==0){
				this.showping=true;
				if(this.reportdetail.status==1){
					this.pingtxt="已读";
				}else if(this.reportdetail.status==2){
                    this.pingtxt="已评";
				}
			}else if(typenum==1){
			    this.showping=false;
			}
			// 图片滚动
            if(this.reportdetail.reportImgList.length>0){
              let picWidth = 90;
			  let margin = 10;
			  let Width = (picWidth + margin) * this.reportdetail.reportImgList.length-margin;
			  this.$refs['picList'].style.width = Width + 'px';
			  if (!this.picScroll) {
					this.picScroll = new BScroll(this.$refs['picWrapper'], {
						scrollX: true,
						eventPassthrough: 'vertical'
					});
				} else {
					this.picScroll.refresh();
				}
			}
		},
		//点击放大图片
		showlargeimg (index){
			this.largeimg = true;
			this.curlargeimg=this.baseurl+this.reportdetail.reportImgList[index].path;
		},
		//发送评论
		sendbtn (){
           let datas={
	            entId:this.$route.query.entid,
	            reportId:this.$route.query.reportId,
	            reportType:this.$route.query.reportType,
	            content:this.sendcont,
	           };
	      let datastr=JSON.stringify(datas);
	      let params={
	         token:this.$route.query.token,
	         data:datastr
	      }
	      if(this.sendcont!=''){
	      	this.$ajax.post(this.baseurl+'report/comment',qs.stringify(params)).then((res)=>{
		      	var res=res.data;
		      	if(res.code==0){
		      		this.initdetails();
		      		this.sendcont='';
		      		this.pingtxt="已评";
		      		this.$dialog.toast({
		                mes: '发送成功',
		                timeout: 1500,
	                });
		      	}else{
		           this.$dialog.toast({
		                mes: res.msg,
		                timeout: 1500,
		            });
		        }
	        })
	      }else{
              this.$dialog.toast({
	                mes: '请输入评论内容',
	                timeout: 1500,
	            });
	      }
	      
		},
		//评论发送成功后立刻更新
		initdetails (){
			let datas={
	            entId:this.$route.query.entid,
	            reportId:this.$route.query.reportId,
	            reportType:this.$route.query.reportType,
	            sendtype:this.$route.query.type,
	           };
	      let datastr=JSON.stringify(datas);
	      let params={
	         token:this.$route.query.token,
	         data:datastr
	      }
	      this.$ajax.post(this.baseurl+'report/getmyinfo',qs.stringify(params)).then((res)=>{
	        var res=res.data;
	        if(res.code==0){
	          this.recourd_detail(res.data);
	        }else{
	           this.$dialog.toast({
	                mes: res.msg,
	                timeout: 1500,
	            });
	        }
	      })
		},
		//下载文件
		downfile (item){
	         window.location.href=this.baseurl+'report/download?fileId='+item.id;
		},
		// dowmLoad(id){
		//     console.log(id)
		//     try {
		//       window.ActivityFunc.down(id);//ActivityFunc app的接口类  down app接口类下面的方法名
		//       alert("调用app下载成功！")
		//     } catch (e) {
		//       console.warn('调用app下载插件失败！');
		//       alert("调用app下载插件失败！" + e)
		//     }
		//   },

		//修改日志
		xiugai (){
		   var reportType=this.$route.query.reportType;
			//根据日志类型跳转对应页面
          if(reportType==0){
          	this.$router.push({ path: '/dayreport', query:{ filltype:'modify'}})
          }
		}
	},
	//实时获取当前路由参数
	watch:{
		'$route' (to,from){
			this.initdetail();
		}
	}
}	
</script>

<style scoped>
header{
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 10;
}
/*.wrapper{
	margin-top: .8rem;
}*/
.peoinfo{
    height: 1.5rem;
    background: #fff;
    margin: 0 auto .3rem;
    padding: .25rem;
}
.peoinfo .info{
	display: inline-block;
    vertical-align: top;
}
.peoinfo .right{
	float: right;
}
.peoinfo .right span{
	display: block;
	border: 2px solid red;
	border-radius: 50%;
	width: .9rem;
	height: .9rem;
	line-height: .9rem;
	text-align: center;
	color: red;
	font-size: 16px;
	margin-top: .15rem;
}
.peoinfo img{
	 width: 1rem;
	 height: 1rem;
	 border-radius: 50%;
}
.peoinfo img,.peoinfo .infodetail{
	display: inline-block;
    vertical-align: top;
}
.peoinfo .infodetail{
	padding-left: .1rem;
    line-height: .5rem;
}
.dayreport{
	font-size: 14px;
}
.formcontent{
	background: #fff;
}
.workcontent{
  width: 100%;
  font-size: 0;
  padding: .2rem;
}
.workcontent div{
  display: inline-block;
  vertical-align: top;
  font-size: 14px;
  text-align: left;
}
.texttip{
  width: 30%;
}
.content{
  width: 70%; 
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
}
.images .rowname,.Enclosure .rowname{
	line-height: .6rem;
}
.images,.Enclosure{
	text-align: left;
	padding: .1rem .2rem;
	background: #fff;
	margin-top: .3rem;
	font-size: 14px;
}
.icon{
	position: relative;
	right: -.6rem;
}
.Enclosure ul{
	margin-top: .3rem;
}
.Enclosure ul li{
	border-bottom: 1px solid #eee;
	padding: .2rem 0;
}
.fjsize{
	color: #9a9999;
}
.Enclosure ul li span{
	display: inline-block;
	vertical-align: middle;
}
.Enclosure ul li .itemname{
	max-width: 80%;
}
.Enclosure .delfj{
	float: right;
}
.imagelist{
	font-size: 0;
	margin-top: .5rem;
}
.pic_wrapper{
	overflow: hidden;
	white-space: nowrap;
}
.imagelist li{
	display: inline-block;
	vertical-align: middle;
	width: 1.8rem;
	height: 1.8rem;
	margin-left: .2rem;
	border:1px solid #ccc;
	text-align: center;
	position: relative;
}
.imagelist li span,.imagelist li img{
	display: inline-block;
	vertical-align: middle;
}
.imagelist li span{
	display: inline-block;
	height: 100%;
}
.imagelist li img{
	vertical-align: middle;
	max-width: 80%;
	max-height: 90%;
	margin:0 auto;
}
.Position{
	background: #fff;
	margin-top: .3rem;
	padding: 0.1rem 0.2rem;
}
.Position p{
	text-align: left;
}
.Position .p_text span{
	display: inline-block;
	vertical-align: middle;
}
.deladress{
	color: red;
	float: right;
	position: relative;
	top: .15rem;
}
.yidunum,.newslist{
	background: #fff;
	margin: .2rem 0;
	line-height: .8rem;
	font-size: 14px;
	padding: 0 .2rem;
}
.newslist{
	margin-bottom: 1.5rem;
}
.yidunum span:last-child{
	float: right;
} 
.yidulist{
	text-align: left;
	padding: .2rem 0;
}
.yidulist li{
	display: inline-block;
	min-width: 1.5rem;
	text-align: center;
	margin-bottom: .2rem;
}
.yidulist li p{
	padding-top: .1rem;
}
.yidulist img{
	width: 1rem;
	height: 1rem;
	border-radius: 50%;
}
footer{
	position: fixed;
	bottom: 0;
	width:100%;
	background: #fff;
	padding: 0 .2rem;
}
.newsul{
    background: #fff;
    margin: 0 auto .3rem;
    padding: .25rem;
}
.newsul div{
	display: inline-block;
    vertical-align: top;
}
.newsul li{
	margin-bottom: .5rem;
}
.newslist .infodetail{
	width: calc(100% - 1.2rem);
}
.newslist .infodetail div:first-child{
	width: 100%;
	margin-bottom: .2rem;
}
.newslist .infodetail p{
	display: inline-block;
}
.newslist .infodetail p:last-child{
	float: right;
}

.newsul img{
	 width: 1rem;
	 height: 1rem;
	 border-radius: 50%;
}
.xiugai{
	position: absolute;
	top: .45rem;
	right: .3rem;
	z-index: 20;
	font-size: 15px;
}
</style>
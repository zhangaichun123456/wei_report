<template>
	<div class="dayreport">
	   <!--  <header>
			<yd-navbar title="工作日报">
		        <router-link to="#" slot="left">
		            <span @click="goup"><yd-navbar-back-icon></yd-navbar-back-icon></span>
		        </router-link>
		        <router-link to="#" slot="right">
		            <span @click="moretip">更多</span>
		        </router-link>
		    </yd-navbar>
	    </header> -->
	   <div class="wrapper">
		   <form>
			   <div class="formcontent">
				    <group label-width="6.5em" label-margin-right="2em" label-align="justify">
				        <x-textarea title="今日完成工作" v-model="text1" placeholder='请填写文字(必填)' autosize :rows='1'></x-textarea>
				        <x-textarea title="未完成工作" v-model="text2" placeholder='请填写文字' autosize :rows='1'></x-textarea>
				        <x-textarea title="工作总结" v-model="text3" placeholder='请填写文字(必填)' autosize :rows='1'></x-textarea>
				        <selector title="自我评价" placeholder="请填写文字(必选)" v-model="zipj" :options="list"></selector>
				        <x-textarea title="明天工作计划" v-model="text4" placeholder='请填写文字' autosize :rows='1'></x-textarea>
				        <x-textarea title="备注" v-model="text5" placeholder='请填写文字' autosize :rows='1'></x-textarea>
				    </group>
			   </div>
			   <div class="images">
				   <p>
					   	<span class="rowname">图片</span>
					   	<span class="chooseimg">
						   	<span class="icon"><img :src="addicon" alt=""></span>
						   	<input id="files" type="file" class="chooseinput" multiple="multiple" @change="chooseimg($event)" name="img">
					   	</span>
				   </p>
				   <div class="pic_wrapper" ref="picWrapper" v-show="imgurl.length>0||oldimages.length>0">
					   	<ul id="wrapper" class="imagelist" ref="picList">
					   	    <li v-for="(item,index) in oldimages">
						   		<span></span><img :src="baseurl+item.path" alt="" @click="showlargeimg(index)">
						   		<a class="delimg" @click="deloldimg(index)"><yd-icon name="error" size=".4rem"></yd-icon></a>
					   		</li>
					   	    <li v-for="(item,index) in imgurl">
						   		<span></span><img :src="item" alt="" @click="showlargeimg(index)">
						   		<a class="delimg" @click="delimg(index)"><yd-icon name="error" size=".4rem"></yd-icon></a>
					   		</li>
					   	</ul>
				   </div>
			   </div>
			   <div class="Enclosure">
			   	   <p>
					   	<span class="rowname">附件</span>
					   	<span class="choosefj">
						   	<span class="icon"><img :src="addicon" alt=""></yd-icon></span>
						   	<input id="fjfiles" type="file" class="chooseinput" multiple="multiple" @change="choosefj($event)" name="file">
					   	</span>
				   </p>
				   <ul v-show="fjurl.length>0||oldfiles.length>0">
				        <li v-for="(item,index) in oldfiles"> 
					        <span class="itemname">
							   	<p>{{item.name}}</p>
							   	<p class="fjsize">{{item.size}}KB</p>
						   	</span>
						   	<span class="delfj" @click="deloldfj(index)">
						   		<yd-icon name="error" size=".4rem"></yd-icon>
						   	</span>
					   </li>
					   <li v-for="(item,index) in fjurl"> 
					        <span class="itemname">
							   	<p>{{item.name}}</p>
							   	<p class="fjsize">{{item.size}}KB</p>
						   	</span>
						   	<span class="delfj" @click="delfj(index)">
						   		<yd-icon name="error" size=".4rem"></yd-icon>
						   	</span>
					   </li>
				   </ul>
			   </div>
			   <div class="Position" id="allmap">
				   <p> 
				       <span class="p_text" @click="getPosition">
						   <span><yd-icon name="location"></yd-icon></span>
						   <span>{{Positiontext}}</span>
						</span>
					   <span v-if="hasposition==true" class="deladress" @click="deladress"><yd-icon name="error" size=".4rem"></yd-icon></span>
				   </p>
			   </div>
			   <div class="sendto">
				   	<p class="head">发给谁(点击头像删除)</p>
				   	<ul class="sendperpson">
				   	    <li v-for="(peo,index) in choosepeo">
				   	    	<img :src="peo.avatarUrl" alt="" @click="delchoosepeo(index)">
				   	    	<p>{{peo.name}}</p>
				   	    </li>
				   		<li @click="addpeo"><img :src="addicon" alt=""><p>添加人员</p></li>
				   	</ul>
				   	<ul class="sendgroup">
				   	    <li v-for="(group,index) in choosegroup">
				   	    	<img :src="group.logoUrl" alt="" @click="delchoosegroup(index)">
				   	    	<p>{{group.name}}</p>
				   	    </li>
				   		<li @click="addgroup"><img :src="addicon" alt=""><p>选择群</p></li>
				   	</ul>
			   </div>		  
		   </form>
		   <yd-button size="large" bgcolor="#38d6e6" color="#FFF" @click.native="submitdaily">提交</yd-button>
	   </div>
	   <yd-popup v-model="largeimg" position="center" width="90%">
            <div><img :src="curlargeimg" alt=""></div>
        </yd-popup>
	</div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import BScroll from 'better-scroll'
import addicon from './../../image/add.png'
import qs from 'qs';
import {  XTextarea, Group,Selector } from 'vux'
export default{
	data() {
		return {
			zipj:'',
			text1:'',
			text2:'',
			text3:'',
			text4:'',
			text5:'',
			list: [{key: '满意', value: '满意'}, {key: '不满意', value: '不满意'}],
			imgurl:[],
			fjurl:[],
			Positiontext:'获取所在位置',
			longitude:null,
			latitude:null,
			hasposition:false,
			largeimg:false,
			curlargeimg:null,
			addicon:addicon,
			images:[],
			files:[],
			oldimages:[],
			oldfiles:[],
		}
	},
	// mounted:function(){
 //        this.$nextTick(function(){
        	
 //        })
	// },
	computed:{
        ...mapState([
                'choosepeo',
                'choosegroup',
                'empid',
                'groupid',
                'entId',
                'token',
                'reportdetail',
        ]),
    },
	components:{
		XTextarea,
        Group,
        Selector,
	},
	methods:{
		...mapMutations([
                'record_choosepeo',
                'record_empid',
                'record_choosegroup',
                'record_groupid',
            ]),
		// 判断写日志还是修改日志,有filltype字段则为修改日志
		judgetype (){
		  let filltype=this.$route.query.filltype;
		  if(filltype=='modify'){
			  	this.text1=this.reportdetail.doneWork;
			  	this.text2=this.reportdetail.undoneWork;
			  	this.text3=this.reportdetail.summary;
			  	this.text4=this.reportdetail.plan;
			  	this.text5=this.reportdetail.remark;
			  	this.zipj=this.reportdetail.evaluation;
			  	this.oldimages=this.reportdetail.reportImgList;
			  	this.oldfiles=this.reportdetail.reportFileList;
			  	if(this.reportdetail.position!=''){
	               this.Positiontext=this.reportdetail.position;
			  	}else{
			  	   this.Positiontext='获取所在位置';
			  	}
			  	
			    // 判断图片是否要左右移动
			    // 当图片超过宽度时，可以横向滑动
				if(this.oldimages.length>0){
	              let picWidth = 90;
				  let margin = 10;
				  let Width = (picWidth + margin) * this.oldimages.length-margin;
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
		  }else{
		  	   this.text1='';
	           this.text2='';
	           this.text3='';
	           this.text4='';
	           this.text5='';
	           this.zipj='';
	           this.Positiontext='Positiontext';
	           this.latitude='';
	           this.longitude='';
	           this.oldimages=[];
	           this.oldfiles=[];
	           this.images=[];
	           this.files=[];
	           this.record_choosepeo([]);
	           this.record_choosegroup([]);
	           this.record_empid([]);
	           this.record_groupid([]);
		  }
		},
		// 选择图片
		chooseimg (e){
			for(var k=0;k<e.target.files.length;k++){
				this.images.push(e.target.files[k]);
			}
			var $_file = document.getElementById("files");
			var file = $_file.files;
			var windowURL = window.URL || window.webkitURL;
			for(let i=0;i<file.length;i++){
				this.imgurl.push(windowURL.createObjectURL(file[i]))
			}
			// 当图片超过宽度时，可以横向滑动
			if(this.imgurl.length>0||this.oldimages.length>0){
              let picWidth = 90;
			  let margin = 10;
			  let Width = (picWidth + margin) * this.imgurl.length*this.oldimages.length-margin;
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
			this.curlargeimg=this.imgurl[index]||this.baseurl+this.oldimages[index].path;
		},
		// 删除图片
		delimg (index){
		  this.images.splice(index,1);
		  this.imgurl.splice(index,1);
		},
		// 删除旧图片
		deloldimg (index){
		  this.oldimages.splice(index,1);
		},
		// 选择附件
		choosefj (e){
			for(var k=0;k<e.target.files.length;k++){
				this.files.push(e.target.files[k]);
			}
            var $_file = document.getElementById("fjfiles");
			var file = $_file.files;
			for(let i=0;i<file.length;i++){
				this.fjurl.push(file[i]);
			}
		},
		// 删除附件
		delfj (index){
		  this.files.splice(index,1);
		  this.fjurl.splice(index,1);
		},
		// 删除旧附件
		deloldfj (index){
		  this.oldfiles.splice(index,1);
		},
		// 获取当前位置
		getPosition (){
			var _this=this;
			if (!navigator.geolocation){
			    this.Positiontext = "您的浏览器不支持地理位置";
			    return;
			  }
			 function success(position) {
			    _this.latitude  = position.coords.latitude;
			    _this.longitude = position.coords.longitude;

			  };

			  function error() {
			    _this.Positiontext = "无法获取您的位置";
			  };

			  navigator.geolocation.getCurrentPosition(success, error);
			  // 把经纬度用百度地图api转换成地址
			  map_click(this.longitude,this.latitude);
			  function map_click(lng,lat){
			  	var point = new BMap.Point(lng,lat);
			  	var geoc = new BMap.Geocoder();
			  	if(lng!=null&&lat!=null){
			  		_this.hasposition=true;
			  		geoc.getLocation(point, function(rs){
						var addComp = rs.addressComponents;
						_this.Positiontext = addComp.province + " " + addComp.city + " " + addComp.district + " " + addComp.street + " " + addComp.streetNumber;
					});
			  	}
			  	
			  }

		},
		// 删除当前位置
		deladress (){
           this.hasposition=false;
           this.Positiontext = "获取所在位置";
		},
		// 添加人员
		addpeo (){
			this.$router.push('/choosepeo');
		},
		//点击头像删除该成员
		delchoosepeo (index){
            this.choosepeo.splice(index,1);
             this.empid.splice(index,1);
		},
		//添加发送的群
		addgroup (){
			this.$router.push('/choosegroup');
		},
		//点击头像删除该群组
		delchoosegroup (index){
            this.choosegroup.splice(index,1);
            this.groupid.splice(index,1);
		},
		//提交日报或修改日报
		submitdaily (){
			var url='';
			var id='';
			let filltype=this.$route.query.filltype;
            if(filltype=='modify'){
            	url='report/editDay';
            	id=this.reportdetail.id;
            }else{
            	url='report/addDay';
            	id='';
            }
            var imgidList=[];
            var fileidList=[];
            for (var i=0;i<this.oldimages.length;i++){
            	imgidList.push(this.oldimages[i].id);
            }
            for (var i=0;i<this.oldfiles.length;i++){
            	fileidList.push(this.oldfiles[i].id);
            }
			var formData = new FormData();
			formData.append('token', this.token);
			formData.append('id', id);
			formData.append('entId', this.entId);
            formData.append('doneWork', this.text1);
            formData.append('undoneWork', this.text2);
            formData.append('summary', this.text3);
            formData.append('evaluation', this.zipj);
            formData.append('plan', this.text4);
            formData.append('remark', this.text5);
            formData.append('position', this.Positiontext);
            formData.append('lat', this.latitude);
            formData.append('lng', this.longitude);
            formData.append('userIdList', this.empid);
            formData.append('cginfoIdList', this.groupid);
            formData.append('imgidList', imgidList);
            formData.append('fileidList', fileidList);
            var config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
            for(var i=0;i<this.images.length;i++){
            	formData.append('img',this.images[i]);
            }
            for(var i=0;i<this.files.length;i++){
            	formData.append('file',this.files[i]);
            }
			this.$ajax.post(this.baseurl+url,formData, config).then((res)=>{
				var res=res.data;
				if(res.code==0){
					this.$dialog.toast({
	                    mes: '提交成功',
	                    timeout: 1500,
	                });
	               this.text1='';
                   this.text2='';
                   this.text3='';
                   this.text4='';
                   this.text5='';
                   this.zipj='';
                   this.Positiontext='Positiontext';
                   this.latitude='';
                   this.longitude='';
                   this.oldimages=[];
                   this.oldfiles=[];
                   this.images=[];
                   this.files=[];
                   this.record_choosepeo([]);
		           this.record_choosegroup([]);
		           this.record_empid([]);
		           this.record_groupid([]);
				   this.$router.push('/writelog');
				}else{
					this.$dialog.toast({
	                    mes: res.msg,
	                    timeout: 1500,
	                });
				}
			}) 
		},

	},
	//实时获取当前路由参数
	watch:{
		'$route' (to,from){
			if(from.name=='readday'){
		        this.judgetype();
		      } 
		}
	},
}	
</script>

<style scoped>
.dayreport{
	font-size: 14px;
}
header{
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
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
.textarea{
  width: 70%; 
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
}
.images .rowname,.Enclosure .rowname{
	line-height: .6rem;
}
.chooseimg .icon,.chooseimg input{
	display: inline-block;
	vertical-align: middle;
}
.chooseimg .icon img,.choosefj .icon img{
	width: .5rem;
}
.choosefj .icon,.choosefj input{
	display: inline-block;
	vertical-align: middle;
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
.chooseimg,.choosefj{
	float: right;
}
.chooseimg input,.choosefj input{
	width: .5rem;
    height: .5rem;
    overflow: hidden;
}
.chooseimg input,.choosefj input{
	position: relative;
	opacity: 0;
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
	color: red;
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
.delimg{
   position: absolute;
   top: -.2rem;
   right: -.2rem;
   color: red;
   font-size: 10px;
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
.sendto{
	background: #fff;
	margin-top: .3rem;
	padding: 0.1rem 0.2rem;
}
.sendto .head{
	text-align: left;
	padding: 0.1rem 0 .3rem 0;
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
.sendperpson{
	border-bottom: 1px solid #eee;
}
/*.wrapper{
	margin-top: .8rem;
}*/
</style>
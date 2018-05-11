<template>
	<div class="visitreport">
	   <div class="wrapper">
		    <form>
			   <div class="formcontent">
			        <yd-cell-item>
			            <span slot="left">拜访对象：</span>
			            <input slot="right" type="text" v-model="visitobj" placeholder="请输入对象名称（必填）">
			        </yd-cell-item>
			        <yd-cell-item arrow type="label">
			            <span slot="left">拜访方式：</span>
			            <select slot="right" v-model="visitmethod">
			                <option value="">请选择（必填）</option>
			                <option value="0">当面拜访</option>
			                <option value="1">电话拜访</option>
			                <option value="2">聊天软件拜访</option>
			                <option value="3">其他</option>
			            </select>
			        </yd-cell-item>
			        <yd-cell-item arrow type="label">
			            <span slot="left">商务阶段：</span>
			            <select slot="right" v-model="visitstep">
			                <option value="">请选择（必填）</option>
			                <option value="0">初步洽谈无意向</option>
			                <option value="1">意向洽谈明确意向</option>
			                <option value="2">合作洽谈具体细节</option>
			                <option value="3">合同洽谈合同签署</option>
			                <option value="4">客户维护</option>
			                <option value="5">公共关系维护</option>
			                <option value="6">其他</option>
			            </select>
			        </yd-cell-item>	
			        <yd-cell-group title="拜访目的：">
				        <yd-cell-item>>
				            <yd-textarea slot="right" placeholder="请填写文字（必填）" v-model="purpose"></yd-textarea>
				        </yd-cell-item>
				    </yd-cell-group>
				    <yd-cell-group title="拜访过程摘要：">
				        <yd-cell-item>>
				            <yd-textarea slot="right" placeholder="请填写文字（必填）" v-model="Process"></yd-textarea>
				        </yd-cell-item>
				    </yd-cell-group> 
				    <yd-cell-group title="洽谈成果总结：">
				        <yd-cell-item>>
				            <yd-textarea slot="right" placeholder="请填写文字（必填）" v-model="summary"></yd-textarea>
				        </yd-cell-item>
				    </yd-cell-group>     
				    <yd-cell-item arrow type="label">
			            <span slot="left">成果判断：</span>
			            <select slot="right" v-model="resultjudge">
			                <option value="">请选择（必填）</option>
			                <option value="0">达到预期</option>
			                <option value="1">未达到预期</option>
			                <option value="2">终止合作洽谈</option>
			            </select>
			        </yd-cell-item>
			        <yd-cell-item>
			            <span slot="left">陪同成员：</span>
			            <input slot="right" type="text" v-model="togetherpeo" placeholder="请输入成员名称">
			        </yd-cell-item>
			        <yd-cell-item arrow>
			            <span slot="left">预计下次拜访时间：</span>
			            <yd-datetime type="date" v-model="nextvisittime" slot="right"></yd-datetime>
			        </yd-cell-item>
				     <yd-cell-item>
			            <span slot="left">下次拜访目的：</span>
			            <input slot="right" type="text" v-model="nextVisitPurpose" placeholder="请填写文字">
			        </yd-cell-item>
				     <yd-cell-group title="备注：">
				        <yd-cell-item>>
				            <yd-textarea slot="right" v-model="remark"></yd-textarea>
				        </yd-cell-item>
				    </yd-cell-group>
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
				   	    <li v-for="(peo,index) in choosepeo4">
				   	    	<img :src="peo.avatarUrl" alt="" @click="delchoosepeo(index)">
				   	    	<p>{{peo.name}}</p>
				   	    </li>
				   		<li @click="addpeo"><img :src="addicon" alt=""><p>添加人员</p></li>
				   	</ul>
				   	<ul class="sendgroup">
				   	    <li v-for="(group,index) in choosegroup4">
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
export default{
	data() {
		return {
			visitobj:'',
			visitmethod:'',
			visitstep:'',
			purpose:'',
			Process:'',
			summary:'',
			resultjudge:'',
			togetherpeo:'',
			nextVisitPurpose:'',
			nextvisittime:'2020-07-07',
			remark:'',
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
 //        	this.judgetype();
 //        })
	// },
	computed:{
        ...mapState([
                'choosepeo4',
                'choosegroup4',
                'empid4',
                'groupid4',
                'entId',
                'token',
                'reportdetail',
        ]),
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
		        this.visitobj=this.reportdetail.object;
		        this.visitmethod=this.reportdetail.type;
		        this.visitstep=this.reportdetail.stage;
		        this.purpose=this.reportdetail.purpose;
		        this.Process=this.reportdetail.process;
		        this.summary=this.reportdetail.summary;
		        this.resultjudge=this.reportdetail.result;
		        this.togetherpeo=this.reportdetail.member;
		        this.nextVisitPurpose=this.reportdetail.nextVisitPurpose;
		        this.nextvisittime=this.reportdetail.nextVisitTime;
		        if(this.nextvisittime==""){
		        	this.nextvisittime='2020-07-07';
		        }
		        this.remark=this.reportdetail.remark;
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
	      	   this.visitobj='';
	           this.visitmethod='';
	           this.visitstep='';
	           this.purpose='';
	           this.Process='';
	           this.summary='';
	           this.resultjudge='';
	           this.togetherpeo='';
	           this.nextvisittime='';
	           this.nextVisitPurpose='';
	           this.remark='';
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
		// 删除旧附件
	    deloldfj (index){
	      this.oldfiles.splice(index,1);
	    },
		// 添加人员
		addpeo (){
			this.$router.push('/choosepeo4');
		},
		//点击头像删除该成员
		delchoosepeo (index){
            this.choosepeo4.splice(index,1);
             this.empid4.splice(index,1);
		},
		//添加发送的群
		addgroup (){
			this.$router.push('/choosegroup4');
		},
		//点击头像删除该群组
		delchoosegroup (index){
            this.choosegroup4.splice(index,1);
             this.groupid4.splice(index,1);
		},
		//提交日报
		submitdaily (){
			var url='';
	        var id='';
	        let filltype=this.$route.query.filltype;
	        if(filltype=='modify'){
	          url='report/editVisit';
	          id=this.reportdetail.id;
	        }else{
	          url='report/addVisit';
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
			formData.append('entId', this.entId);
			formData.append('id', id);
            formData.append('object', this.visitobj);
            formData.append('type', this.visitmethod);
            formData.append('stage', this.visitstep);
            formData.append('purpose', this.purpose);
            formData.append('process', this.Process);
            formData.append('summary', this.summary);
            formData.append('result', this.resultjudge);
            formData.append('member', this.togetherpeo);
            formData.append('nextVisitTimes', this.nextvisittime);
            formData.append('nextVisitPurpose', this.nextVisitPurpose);
            formData.append('remark', this.remark);
            formData.append('position', this.Positiontext);
            formData.append('lat', this.latitude);
            formData.append('lng', this.longitude);
            formData.append('userIdList', this.empid4);
            formData.append('cginfoIdList', this.groupid4);
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
	               this.visitobj='';
                   this.visitmethod='';
                   this.visitstep='';
                   this.purpose='';
                   this.Process='';
                   this.summary='';
                   this.resultjudge='';
                   this.togetherpeo='';
                   this.nextvisittime='';
                   this.nextVisitPurpose='';
                   this.remark='';
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
	      if(from.name=='readvisit'){
	        this.judgetype();
	      } 
	    }
	  }
}	
</script>

<style scoped>
header{
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
}
.visitreport{
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
	padding: .3rem .2rem;
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
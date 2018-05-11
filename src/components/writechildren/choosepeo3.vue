<template>
	<div class="choosepeo3">
		<!-- <yd-navbar title="选择人员">
	        <router-link to="#" slot="left">
	            <span @click="goup"><yd-navbar-back-icon></yd-navbar-back-icon></span>
	        </router-link>
	    </yd-navbar> -->
	    <div class="wrapper" id="wrapper">
		    <div class="search">
			    <yd-cell-group>
				    <yd-cell-item>
			            <yd-input slot="right" v-model="searchcon" placeholder="请输入要查找的人员姓名" @input="getsearchlist"></yd-input>
			        </yd-cell-item>
			        <span class="searchicon"><yd-icon name="search" size=".5rem"></yd-icon></span>
		        </yd-cell-group>
	        </div>
	        <div class="choosedtp" v-show="searchcon==''">
	        	<ul class="teamname">
		        	<li v-for="item in breadlist" @click="clickdpt(item)">{{item.name}}</li>
	        	</ul>
	        	<ul class="dtplist" v-show="dptlist.length>0">
	        		<li v-for="item in dptlist" @click="clickdpt(item)">
		        		<span>{{item.name}}</span>
		        		<span class="peocount">
			        		<span>{{item.empTotal}}人</span>
			        		<img :src="nexticon" alt="">
		        		</span>
	        		</li>
	        	</ul>
	        	<div class="emplist" v-show="emplist.length>0">
		        	<p class="head">部门成员</p>
		        	<ul>
		        		<li v-for="peo in emplist">
			        		<yd-checkbox-group v-model="choosepeo">
						        <yd-checkbox :val="peo.empId">
							        <img :src="peo.avatarUrl" alt="" class="avata">
							        <span class="peoinfo"><a>{{peo.name}}</a><a>{{peo.jobPosition}}</a></span>
						        </yd-checkbox>
						    </yd-checkbox-group>
		        		</li>
		        	</ul>
	        	</div>	
	        </div>
	        <div class="choosedtp" v-show="searchcon!=''">
	        	<div class="emplist">
	        	    <p class="head" v-show='filteremplist.length==0'>暂无匹配人员</p>
		        	<ul v-show='filteremplist.length>0'>
		        		<li v-for="peo in filteremplist">
			        		<yd-checkbox-group v-model="choosepeo">
						        <yd-checkbox :val="peo.empId">
							        <img :src="peo.avatarUrl" alt="" class="avata">
							        <span class="peoinfo"><a>{{peo.name}}</a><a>{{peo.jobPosition}}</a></span>
						        </yd-checkbox>
						    </yd-checkbox-group>
		        		</li>
		        	</ul>
	        	</div>	
	        </div>
        </div>
        <div class="foot">
	      <span>已勾选：{{choosepeo.length}}人</span><span class="suretext" @click="sureevent">确认</span>
	    </div>
	</div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import BScroll from 'better-scroll'
    import qs from 'qs';
    import nexticon from './../../image/next.png'
	export default{
		data (){
			return {
               searchcon:'',
               nexticon:nexticon,
               dptlist:[],
               emplist:[],
               breadlist:[],
               choosepeo:[],
               searchemplist:[],
			}
		},
		mounted:function(){
            this.$nextTick(function(){
            	this.getdptlist();
            })
		},
		computed:{
			...mapState([
		            'entId',
		            'token'
		      ]),
			//搜索过滤的人员渲染数据
		    filteremplist:function(){
		    	var searchcon=this.searchcon;
		    	if(searchcon){
		    		return this.searchemplist.filter(function(item){
		    			return Object.keys(item).some(function(key){
		    				return String(item[key]).toLowerCase().indexOf(searchcon)>-1
		    			})
		    		})
		    	}
		    	return this.searchemplist;
		    }
		},
		methods:{
			 ...mapMutations([
                'record_choosepeo3',
                'record_empid3',
            ]),
			// goup (){
			// 	this.$router.go(-1);
			// },
			//获取部门列表
			getdptlist (){
				let datas={
                     	'entId':this.entId,
                     	'deptId':0
                     };
                let datastr=JSON.stringify(datas);
				let params={
                     token:this.token,
                     data:datastr
				}
				console.log(params);
				this.$ajax.post(this.baseurl+'report/getMemberList',qs.stringify(params)).then((res)=>{					
					var res=res.data;
					console.log(res);
					if(res.code==0){
						this.dptlist=res.data.deptList;
						this.emplist=res.data.empList;
						this.breadlist=res.data.parentDept;
					}else{
						this.$dialog.toast({
		                    mes: res.msg,
		                    timeout: 1500,
		                });
					}
				})    
			},
			//点击部门获取部门人员和下级部门
			clickdpt (item){
               let datas={
                     	'entId':this.entId,
                     	'deptId':item.deptId,
                     };
                let datastr=JSON.stringify(datas);
				let params={
                     token:this.token,
                     data:datastr
				}
				console.log(params);
				this.$ajax.post(this.baseurl+'report/getMemberList',qs.stringify(params)).then((res)=>{
					var res=res.data;
					if(res.code==0){
					   console.log(res);
					   this.dptlist=res.data.deptList;
					   this.emplist=res.data.empList;
					   this.breadlist=res.data.parentDept;
					}else{
						this.$dialog.toast({
		                    mes: res.msg,
		                    timeout: 1500,
		                });
					}
				})  
			},
			// 点击确定选择人员
			sureevent (){
				var choosepeo=[];
				for(var i=0;i<this.emplist.length;i++){
					if(this.choosepeo.indexOf(this.emplist[i].empId)>-1){
						choosepeo.push(this.emplist[i]);
					}
				}
				this.record_choosepeo3(choosepeo);
				this.record_empid3(this.choosepeo);
				// this.goup();
				this.$router.go(-1);
			},
			// 搜索框输入内容时，则筛选列表
			getsearchlist (){
				if(this.searchcon!=''){
					let datas={
                     	'entId':this.entId,
                     };
                    let datastr=JSON.stringify(datas);
					let params={
	                     token:this.token,
	                     data:datastr,
					}
					this.$ajax.post(this.baseurl+'report/getempList',qs.stringify(params)).then((res)=>{
						var res=res.data;
						if(res.code==0){
						   this.searchemplist=res.data;
						}else{
							this.$dialog.toast({
			                    mes: res.msg,
			                    timeout: 1500,
			                });
						}
					})  

				}
			},
		},
		// keep-alive激活时重新渲染列表
		activated (){
			this.getdptlist();
		}
	}
</script>

<style scoped>
.search{
	margin: .3rem auto;
	width: 95%;
}
.searchicon{
	position: absolute;
	top: .2rem;
	left: .2rem;
}
.emplist .head{
     text-align: left;
     font-size: 14px;
	 padding: 0 .3rem;
	 line-height: .8rem;
}
.teamname,.dtplist,.emplist ul{
	text-align: left;
	background: #fff;
	line-height: .8rem;
	font-size: 14px;
	padding: 0 .3rem;
}
.teamname li{
	display: inline-block;
	padding-right: .2rem;
	margin-right: .2rem;
	border-right: 1px solid #eee;
	height: .6rem;
	line-height: .6rem;
}
.teamname li:last-child{
	border-right: none;
	color: blue;
}
.dtplist{
	margin-top: .3rem;
}
.peocount{
	float: right;
}
.peocount img,.peocount span{
	display: inline-block;
}
.peocount img{
	width: .25rem;
	height: .25rem;
}
.foot{
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: left;
  height: 1rem;
  line-height: 1rem;
  padding: 0 .3rem;
  font-size: 14px;
}
.suretext{
	float: right;
	color: rgba(0,204,255,1);
}
.emplist ul{
	padding-top: .5rem;
}
.emplist li{
	padding-bottom: .5rem;
	border-bottom: 1px solid #eee;
}

.emplist img{
	width: .8rem;
	height: .8rem;
	border-radius: 50%;
	margin: 0 .2rem;
}
.peoinfo,.avata{
	display: inline-block;
	vertical-align: middle;
}
.peoinfo a{
	display: block;
	line-height: .5rem;
}
.wrapper{
	position: absolute;
	/*top: .8rem;*/
	top: 0;
	bottom: 1rem;
	width: 100%;
	overflow:auto;
}
</style>
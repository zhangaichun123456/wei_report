<template>
	<div class="choosegroup2">
		<!-- <yd-navbar title="选择群组">
	        <router-link to="#" slot="left">
	            <span @click="goup"><yd-navbar-back-icon></yd-navbar-back-icon></span>
	        </router-link>
	    </yd-navbar> -->
	    <div class="wrapper">
		    <div class="choosegroup">
		    <div class="grouplist" v-show="grouplist.length>0">
	        	<ul>
	        		<li v-for="group in grouplist">
		        		<yd-checkbox-group v-model="choosegroup">
					        <yd-checkbox :val="group.cgId">
					            <img v-show="group.logoUrl!=''" :src="group.logoUrl" alt="" class="logoUrl">
						        <img v-show="group.logoUrl==''" :src="ceshiimg" alt="" class="logoUrl">
						        <span class="groupinfo">{{group.name}}</span>
					        </yd-checkbox>
					    </yd-checkbox-group>
	        		</li>
	        	</ul>
        	</div>	
		    </div>
	    </div>
	    <div class="foot">
	      <span>已勾选：{{choosegroup.length}}</span><span class="suretext" @click="sureevent">确认</span>
	    </div>
	</div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import qs from 'qs';
    import ceshiimg from './../../image/add.png'
	export default{
		data (){
			return{
				grouplist:[],
				choosegroup:[],
				ceshiimg:ceshiimg,
				logoUrl:null,
               
			}
		},
		mounted:function(){
            this.$nextTick(function(){
            	this.getgrouplist();
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
                'record_choosegroup2',
                'record_groupid2',
            ]),
			getgrouplist (){
				let datas={
                     	'entId':this.entId,
                     };
                let datastr=JSON.stringify(datas);
				let params={
                     token:this.token,
                     data:datastr
				}
				this.$ajax.post(this.baseurl+'report/getcginfoList',qs.stringify(params)).then((res)=>{
					var res=res.data;
					if(res.code==0){
						this.grouplist=res.data;
					}else{
						this.$dialog.toast({
		                    mes: res.msg,
		                    timeout: 1500,
		                });
					}
				})  
			},
			// goup (){
			// 	this.$router.go(-1);
			// },
			// 点击确定群组
			sureevent (){
				var choosegroup=[];
				for(var i=0;i<this.grouplist.length;i++){
					if(this.choosegroup.indexOf(this.grouplist[i].cgId)>-1){
						choosegroup.push(this.grouplist[i]);
					}
				}
				this.record_choosegroup2(choosegroup);
				this.record_groupid2(this.choosegroup);
				// this.goup();
				this.$router.go(-1);
			}
		}
	}
</script>

<style scoped>
.wrapper{
	text-align: left;	
	position: absolute;
	/*top: .8rem;*/
	top: 0;
	bottom: 1rem;
	width: 100%;
	overflow:auto;
}
.grouplist {
	padding:.3rem .2rem;
	border-bottom: 1px solid #eee;
	background: #fff;
}
.grouplist img{
	margin: 0 .3rem;
}
.grouplist img,.grouplist span{
	display: inline-block;
	vertical-align: middle;
}
.grouplist img{
   width: 1rem;
   height: 1rem;
   border-radius: 50%;
}
.grouplist li{
	margin-bottom: .3rem;
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
</style>
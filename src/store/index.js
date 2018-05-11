import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'

Vue.use(Vuex)

const state = {
    token:15759213273,
    entId:1,
    choosepeo:[],
    choosegroup:[],
    empid:[],
    groupid:[],
    choosepeo2:[],
    choosegroup2:[],
    empid2:[],
    groupid2:[],
    choosepeo3:[],
    choosegroup3:[],
    empid3:[],
    groupid3:[],
    choosepeo4:[],
    choosegroup4:[],
    empid4:[],
    groupid4:[],
    gjchoose:[],
    gjempid:[],
    reportdetail:null,
}

export default new Vuex.Store({
	state,
	mutations,
})

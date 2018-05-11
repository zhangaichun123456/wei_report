import {
	record_choosepeo,
	record_choosegroup,
	record_empid,
	record_groupid,
	record_choosepeo2,
	record_choosegroup2,
	record_empid2,
	record_groupid2,
	record_choosepeo3,
	record_choosegroup3,
	record_empid3,
	record_groupid3,
	record_choosepeo4,
	record_choosegroup4,
	record_empid4,
	record_groupid4,
	record_gjchoose,
	record_gjempid,
	recourd_detail,
	record_token,
	record_entId
}from './mutation-types.js'

export default{
	[record_token](state, info) {
		state.token = info;
	},
	[record_entId](state, info) {
		state.entId = info;
	},
	// 保存日志里面的选择发送人员
	[record_choosepeo](state, info) {
		state.choosepeo = info;
	},
	// 保存日志里面的选择发送群组
	[record_choosegroup](state, info) {
		state.choosegroup = info;
	},
	// 保存选择发送员工的id数组
	[record_empid](state, info) {
		state.empid = info;
	},
	// 保存选择发送群组的id数组
	[record_groupid](state, info) {
		state.groupid = info;
	},
	// 保存日志里面的选择发送人员
	[record_choosepeo2](state, info) {
		state.choosepeo2 = info;
	},
	// 保存日志里面的选择发送群组
	[record_choosegroup2](state, info) {
		state.choosegroup2 = info;
	},
	// 保存选择发送员工的id数组
	[record_empid2](state, info) {
		state.empid2 = info;
	},
	// 保存选择发送群组的id数组
	[record_groupid2](state, info) {
		state.groupid2 = info;
	},
	// 保存日志里面的选择发送人员
	[record_choosepeo3](state, info) {
		state.choosepeo3 = info;
	},
	// 保存日志里面的选择发送群组
	[record_choosegroup3](state, info) {
		state.choosegroup3 = info;
	},
	// 保存选择发送员工的id数组
	[record_empid3](state, info) {
		state.empid3 = info;
	},
	// 保存选择发送群组的id数组
	[record_groupid3](state, info) {
		state.groupid3 = info;
	},
	// 保存日志里面的选择发送人员
	[record_choosepeo4](state, info) {
		state.choosepeo4 = info;
	},
	// 保存日志里面的选择发送群组
	[record_choosegroup4](state, info) {
		state.choosegroup4 = info;
	},
	// 保存选择发送员工的id数组
	[record_empid4](state, info) {
		state.empid4 = info;
	},
	// 保存选择发送群组的id数组
	[record_groupid4](state, info) {
		state.groupid4 = info;
	},
	// 保存看日志高级筛选的选择发送人员
	[record_gjchoose](state, info) {
		state.gjchoose = info;
	},
	// 保存看日志高级筛选选择发送员工的id数组
	[record_gjempid](state, info) {
		state.gjempid = info;
	},
	// 保存点击的日志详情
	[recourd_detail](state, info) {
		state.reportdetail = info;
	},
}
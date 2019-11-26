const logger = require('../../logger');
const ServerController = require('../../controller/server/ServerController');
const NotifyService = require('../../service/notify/NotifyService');
const AuthService = require('../../service/auth/AuthService');

const NotifyController = {};
const util = require('../../tools/util');

const serverNotifyStruct = {
	notifytime: { formatter: util.formatTimeStamp },
	server_id: '',
	thread_id: '',
	command: '',
	result: ''
};

NotifyController.getServerNotifyList = async (ctx) => {
	let treeNodeId = ctx.paramsObj.tree_node_id;
	let curPage = parseInt(ctx.paramsObj.curr_page) || 0;
	let pageSize = parseInt(ctx.paramsObj.page_size) || 0;
	try {
		let params = ServerController.formatTreeNodeId(treeNodeId);
		if (!await AuthService.hasDevAuth(params.application, params.serverName, ctx.uid)) {
			ctx.makeNotAuthResObj();
		} else {
			let rst = await NotifyService.getServerNotifyList(params, curPage, pageSize);
			ctx.makeResObj(200, '', { count: rst.count, rows: util.viewFilter(rst.rows, serverNotifyStruct) });
		}

	} catch (e) {
		logger.error('[getServerNotifyList]', e, ctx);
		ctx.makeErrResObj();
	}
};

/**获取最近20个问题
 */
NotifyController.getNewProblems = async (ctx) => {
	const _limit = ctx.paramsObj.limit;
	try {
		let rst = await NotifyService.getNewProblems(_limit);
		ctx.makeResObj(200, '', rst);
	} catch (e) {
		logger.error('[getNewProblems]', e, ctx);
		ctx.makeResObj(500, e && e.message || e);
	}
}

module.exports = NotifyController;
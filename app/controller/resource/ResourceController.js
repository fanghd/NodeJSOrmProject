const logger = require('../../logger');
const ResourceService = require('../../service/resource/ResourceService');
const _ = require('lodash');
const util = require('../../tools/util');
const send = require('koa-send');


const ResourceController = {};

ResourceController.installTodoNode = async (ctx) => {
	try {
		let ips = ctx.paramsObj.ips;
		ips = _.trim(ips, /;|,/).split(';');
		let rst = await ResourceService.installTodoNodes(ips);
		ctx.makeResObj(200, '', rst);
	} catch (e) {
		logger.error('[installTodoNode]', e, ctx);
		ctx.makeErrResObj();
	}
};

ResourceController.uninstallTodoNode = async (ctx) => {
	try {
		let ips = ctx.paramsObj.ips;
		ips = _.trim(ips, /;|,/).split(';');
		let rst = await ResourceService.uninstallTodoNode(ips);
		ctx.makeResObj(200, '', rst);
	} catch (e) {
		logger.error('[installTodoNode]', e, ctx);
		ctx.makeErrResObj();
	}
};

module.exports = ResourceController;
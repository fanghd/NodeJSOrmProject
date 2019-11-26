const logger = require('../../logger');
const AdapterService = require('../../service/adapter/AdapterService');
const AuthService = require('../../service/auth/AuthService');
const _ = require('lodash');
const util = require('../../tools/util');

const adapterConfStruct = {
	id: '',
	application: '',
	server_name: '',
	node_name: '',
	adapter_name: '',
	thread_num: '',
	endpoint: '',
	max_connections: '',
	allow_ip: '',
	servant: '',
	queuecap: '',
	queuetimeout: '',
	posttime: {formatter: util.formatTimeStamp},
	protocol: '',
	handlegroup: ''
};

const AdapterController = {};

AdapterController.getAdapterConfById = async (ctx) => {
	let id = ctx.paramsObj.id;
	try {
		var rst = await AdapterService.getAdapterConfById(id);
		if (!_.isEmpty(rst)) {
			if (!await AuthService.hasDevAuth(rst.application, rst.server_name, ctx.uid)) {
				ctx.makeNotAuthResObj();
			} else {
				ctx.makeResObj(200, '', util.viewFilter(rst, adapterConfStruct));
			}
		} else {
			logger.error('[getAdapterConfById]', '未查询到id=' + id + '相应的Adapter', ctx);
			ctx.makeErrResObj();
		}
	} catch (e) {
		logger.error('[getAdapterConfById]', e, ctx);
		ctx.makeErrResObj();
	}
};

AdapterController.getAdapterConfListByServerConfId = async (ctx) => {
	let id = ctx.paramsObj.id;
	try {
		let rst = await AdapterService.getAdapterConfList(id);
		if (!_.isEmpty(rst)) {
			let adapter = rst[0];
			if (!await AuthService.hasDevAuth(adapter.application, adapter.server_name, ctx.uid)) {
				ctx.makeNotAuthResObj();
				return;
			}
		}
		ctx.makeResObj(200, '', util.viewFilter(rst, adapterConfStruct));
	} catch (e) {
		logger.error('[getAdapterConfListByServerConfId]', e, ctx);
		ctx.makeErrResObj();
	}
};

AdapterController.getAllAdapterConfList = async (ctx) => {
	let {application, server_name} = ctx.paramsObj;
	try {
		if (!await AuthService.hasDevAuth(application, server_name, ctx.uid)) {
			ctx.makeNotAuthResObj();
		} else {
			let rst = await AdapterService.getAllAdapterConfList(application, server_name);
			ctx.makeResObj(200, '', rst);
		}
	} catch (e) {
		logger.error('[getAllAdapterConfList]', e, ctx);
		ctx.makeErrResObj();
	}
};

AdapterController.addAdapterConf = async (ctx) => {
	let addAdapter = ctx.paramsObj;
	try {
		if (!await AuthService.hasDevAuth(addAdapter.application, addAdapter.server_name, ctx.uid)) {
			ctx.makeNotAuthResObj();
		} else {
			addAdapter.adapter_name = addAdapter.servant + 'Adapter';
			addAdapter.posttime = new Date();
			let rst = await AdapterService.addAdapterConf(addAdapter);
			ctx.makeResObj(200, '', util.viewFilter(rst, adapterConfStruct));
		}
	} catch (e) {
		logger.error('[addAdapterConf]', e, ctx);
		ctx.makeErrResObj();
	}
};

AdapterController.deleteAdapterConf = async (ctx) => {
	let id = ctx.paramsObj.id;
	try {
		var adapterParams = await AdapterService.getAdapterConfById(id);
		if (!await AuthService.hasDevAuth(adapterParams.application, adapterParams.server_name, ctx.uid)) {
			ctx.makeNotAuthResObj();
		} else {
			await AdapterService.deleteAdapterConf(id);
			ctx.makeResObj(200, '', [id]);
		}
	} catch (e) {
		logger.error('[addAdapterConf]', e, ctx);
		ctx.makeErrResObj();
	}
};


AdapterController.updateAdapterConf = async (ctx) => {
	let updateAdapter = ctx.paramsObj;
	try {
		var adapterParams = await AdapterService.getAdapterConfById(updateAdapter.id);
		if (!await AuthService.hasDevAuth(adapterParams.application, adapterParams.server_name, ctx.uid)) {
			ctx.makeNotAuthResObj();
		} else {
			updateAdapter.adapter_name = updateAdapter.servant + 'Adapter';
			updateAdapter.posttime = new Date();
			await AdapterService.updateAdapterConf(updateAdapter);
			let rst = await AdapterService.getAdapterConfById(updateAdapter.id);
			if (!_.isEmpty(rst)) {
				ctx.makeResObj(200, '', util.viewFilter(rst, adapterConfStruct));
			} else {
				logger.error('[getAdapterConfById]', '未查询到id=' + updateAdapter.id + '相应的Adapter', ctx);
				ctx.makeErrResObj();
			}
		}
	} catch (e) {
		logger.error('[updateAdapterConf]', e, ctx);
		ctx.makeErrResObj();
	}
};

AdapterController.getAvaliablePort = async (ctx) => {
	try {
		let nodeNames = ctx.paramsObj.node_name;
		nodeNames = nodeNames ? nodeNames.split(/;|,/) : [];
		let rst = await AdapterService.getAvaliablePort(nodeNames);
		ctx.makeResObj(200, '', rst);
	} catch (e) {
		logger.error('[updateAdapterConf]', e, ctx);
		ctx.makeErrResObj();
	}
};

module.exports = AdapterController;
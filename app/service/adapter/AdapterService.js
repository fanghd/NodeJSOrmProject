const AdapterDao = require('../../dao/AdapterDao');
const logger = require('../../logger');
const _ = require('lodash');
const ServerDao = require('../../dao/ServerDao');


const AdapterService = {};

AdapterService.adpaterConfFields = () => {
	return {
		application: '',
		server_name: '',
		node_name: '',
		adapter_name: '',
		thread_num: 1,
		endpoint: '',
		max_connections: 1000,
		allow_ip: '',
		servant: '',
		queuecap: '',
		queuetimeout: '',
		posttime: "0000:00:00 00:00:00",
		lastuser: '',
		protocol: "todo",
		handlegroup: ''
	};
};

//通过ID获取adapter信息
AdapterService.getAdapterConfById = async (id) => {
	return await AdapterDao.getAdapterConfById(id);
};

//通过服务ID获取adapter信息
AdapterService.getAdapterConfList = async (serverConfId) => {
	let serverConf = await ServerDao.getServerConfById(serverConfId);
	if (serverConf) {
		serverConf = serverConf.dataValues;
		return await AdapterDao.getAdapterConf(serverConf.application, serverConf.server_name, serverConf.node_name);
	} else {
		return [];
	}
};

//通过服务ID获取服务下的所有adapter信息
AdapterService.getAllAdapterConfList = async (application, server_name) => {
	return await AdapterDao.getServantByServerName(application, server_name);
};

// 新增adapter
AdapterService.addAdapterConf = async (params) => {
	return await AdapterDao.insertAdapterConf(params);
};

//删除adapter
AdapterService.deleteAdapterConf = async (id) => {
	return await AdapterDao.deleteAdapterConf(id);
};

// 更新adapter
AdapterService.updateAdapterConf = async (params) => {
	return await AdapterDao.updateAdapterConf(params);
};

AdapterService.getAvaliablePort = async (nodeNames) => {
	if (_.isEmpty(nodeNames)) {
		return [];
	}
	let adapters = await AdapterDao.getAdapterConfByNodeName(nodeNames);
	let portMap = {};
	nodeNames.forEach((nodeName) => {
		if (!nodeName)return;
		if (!portMap[nodeName]) {
			portMap[nodeName] = [];
		}
	});
	adapters.forEach((adapter) => {
		adapter = adapter.dataValues;
		let port = adapter.endpoint.match(/-p *(\d+)( |$)/)[1] || null;
		if (port) {
			portMap[adapter.node_name] && portMap[adapter.node_name].push(parseInt(port));
		}
	});
	let portRst = [];
	nodeNames.forEach(function (nodeName) {
		if (!nodeName) {
			portRst.push({node_name: '', port: 10000});
			return;
		}
		let portList = portMap[nodeName];
		//默认port从10000开始分配
		let port = 10000;
		while (port <= 65536) {
			if (_.indexOf(portList, port) > -1) {
				port++;
			} else {
				portList.push(port);
				portRst.push({node_name: nodeName, port: port});
				break;
			}
		}
		if (port > 65536) {
			portRst.push({node_name: nodeName, port: ''});
		}
	});
	return portRst;
};


module.exports = AdapterService;
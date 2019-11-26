const {tAdapterConf, sequelize} = require('./db').db_todo;

const AdapterDao = {};

AdapterDao.getAdapterConfById = async (id) => {
	return await tAdapterConf.findOne({
		where: {
			id: id
		}
	});
};

AdapterDao.getAdapterConf = async (application, serverName, nodeName) => {
	let whereObj = {
		application: application,
		server_name: serverName
	};
	if (nodeName) {
		Object.assign(whereObj, {node_name: nodeName});
	}
	return await tAdapterConf.findAll({
		raw: true,
		where: whereObj
	});
};

AdapterDao.getServantByServerName = async (application, serverName) => {
	let whereObj = {
		application: application,
		server_name: serverName
	};
	return await tAdapterConf.findAll({
		attributes: ['servant'],
		group: 'servant',
		raw: true,
		where: whereObj
	});
}


AdapterDao.getAdapterConfByObj = async (params) => {
	return await tAdapterConf.findOne({
		where: {
			application: params.application,
			server_name: params.serverName,
			node_name: params.nodeName,
			adapter_name: params.application + '.' + params.serverName + '.' + params.objName + 'Adapter'
		}
	});
};

AdapterDao.getAdapterConfByNodeName = async (nodeNames) => {
	return await tAdapterConf.findAll({
		where: {
			node_name: nodeNames
		}
	});
};

AdapterDao.insertAdapterConf = async (params, transaction) => {
	if (transaction) {
		return await tAdapterConf.create(params, {transaction: transaction});
	} else {
		return await tAdapterConf.create(params);
	}
};

AdapterDao.deleteAdapterConf = async (id) => {
	return await tAdapterConf.destroy({
		where: {id: id}
	});
};

AdapterDao.updateAdapterConf = async (params) => {
	return await tAdapterConf.update(params, {where: {id: params.id}});
};

module.exports = AdapterDao;
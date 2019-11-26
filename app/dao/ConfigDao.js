const {tConfigFiles, tConfigHistoryFiles, tConfigReferences} = require('./db').db_todo;

let ConfigDao = {};

ConfigDao.getUnusedApplicationConfigFile = async (application, configId) => {
	let referenceIds = await tConfigReferences.findAll({
		raw: true,
		attributes: ['reference_id'],
		where: {config_id: configId}
	});
	let arr = [];
	referenceIds.forEach(function (ref) {
		arr.push(ref.reference_id);
	});
	return await tConfigFiles.findAll({
		raw: true,
		where: {
			level: 1,
			server_name: application,
			set_name: '',
			set_area: '',
			set_group: '',
			id: {
				'$notIn': arr
			}
		}
	});
};

ConfigDao.getApplicationConfigFile = async (application) => {
	return await tConfigFiles.findAll({
		where: {
			level: 1,
			server_name: application,
			set_name: '',
			set_area: '',
			set_group: '',
		}
	});
};

ConfigDao.getSetConfigFile = async (params) => {
	let whereObj = Object.assign({level: 1}, filterParams(params));

	return await tConfigFiles.findAll({
		where: whereObj
	});
};

ConfigDao.getServerConfigFile = async (params) => {
	let whereObj = Object.assign({level: 2}, filterParams(params));
	return await tConfigFiles.findAll({
		where: whereObj
	});
};

ConfigDao.insertConfigFile = async (params, transaction) => {
	if (transaction) {
		return await tConfigFiles.create(params, {transaction: transaction});
	} else {
		return await tConfigFiles.create(params);
	}
};

ConfigDao.insertConfigFileHistory = async (params) => {
	return await tConfigHistoryFiles.create(params);
};

ConfigDao.getConfigFile = async (id) => {
	return await tConfigFiles.findOne({
		raw: true,
		where: {id: id}
	});
};

ConfigDao.getConfigFileByRefTableId = async (id) => {
	tConfigFiles.belongsTo(tConfigReferences, {foreignKey: 'id', targetKey: 'config_id'});
	return await tConfigFiles.findOne({
		raw: true,
		include: [{
			model: tConfigReferences,
			where: {id: id}
		}]
	});
};


ConfigDao.getConfigFileList = async (ids) => {
	return await tConfigFiles.findAll({
		where: {
			id: {
				'$in': ids
			}
		}
	});
};

ConfigDao.getNodeConfigFile = async (params) => {
	let whereObj = Object.assign({}, {level: 3}, filterParams(params));
	return await tConfigFiles.findAll({
		order: [
			['id', 'desc']
		],
		where: whereObj
	});
};

ConfigDao.deleteConfigFile = async (id, transaction) => {
	if (transaction) {
		return await tConfigFiles.destroy({where: {id: id}}, {transaction: transaction});
	} else {
		return await tConfigFiles.destroy({where: {id: id}});
	}

};

ConfigDao.getConfigRefList = async (id) => {
	return await tConfigReferences.findAll({where: {reference_id: id}});
};

ConfigDao.updateConfigFile = async (params) => {
	return await tConfigFiles.update(
		params,
		{where: {id: params.id}}
	);
};

ConfigDao.getConfigFileHistory = async (id) => {
	return await tConfigHistoryFiles.findOne({
		raw: true,
		where: {
			id: id
		}
	});
};

ConfigDao.getConfigFileHistoryList = async (id, curPage, pageSize) => {
	var opts = {
		order: [
			['id', 'desc']
		],
		where: {
			configId: id
		}
	};
	if (curPage && pageSize) {
		Object.assign(opts, {
			limit: pageSize,
			offset: pageSize * (curPage - 1)
		})
	}
	return await tConfigHistoryFiles.findAndCountAll(opts);
};

ConfigDao.insertConfigRef = async (configId, refId) => {
	return await tConfigReferences.create({
		config_id: configId,
		reference_id: refId
	});
};

ConfigDao.getConfigRef = async (refId) => {
	return await tConfigReferences.findOne({
		raw: true,
		where: {id: refId}
	});
};

ConfigDao.deleteConfigRef = async (id) => {
	return await tConfigReferences.destroy({
		where: {id: id}
	});
};

ConfigDao.getConfigRefByConfigId = async (configId) => {
	tConfigReferences.belongsTo(tConfigFiles, {foreignKey: 'reference_id'});
	return await tConfigReferences.findAll({
		order: [
			['id', 'desc']
		],
		where: {
			config_id: configId
		},
		include: {
			model: tConfigFiles
		},
	});
};


function filterParams(obj) {
	for (var item in obj) {
		if (!obj[item] && obj[item] !== '') {
			delete obj[item];
		}
	}
	return obj;
}

module.exports = ConfigDao;
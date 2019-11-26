const {tServerConf, sequelize, querySql} = require('./db').db_todo;
const Sequelize = require('sequelize');

const ServerDao = {};

const selectSql = `SELECT DISTINCT(t1.servant), t2.force_downgrade, t2.stat_period, t2.ping_interval, t2.max_disable_ratio, t2.downgrade_desc from t_adapter_conf t1 left JOIN t_servant_downgrade_conf t2 on t1.servant = t2.servant_name`

ServerDao.sequelize = sequelize;

ServerDao.getServerConfById = async (id) => {
	return await tServerConf.findOne({
		where: {
			id
		}
	});
};

ServerDao.getServerConfByName = async (application, serverName, nodeName) => {
	return await tServerConf.findOne({
		where: {
			application: application,
			server_name: serverName,
			node_name: nodeName
		}
	});
};

ServerDao.getServerConfByNodeName = async (nodeName) => {
	return await tServerConf.findAll({
		where: {
			node_name: nodeName
		}
	});
};

ServerDao.getServerConf = async (params) => {
	let where = {};
	params.application != undefined && (where.application = params.application);
	params.serverName != undefined && (where.server_name = params.serverName);
	params.nodeName != undefined && (where.node_name = params.nodeName);
	if (params.enableSet) {
		if (params.enableSet == 'Y') {
			params.setName && (where.set_name = params.setName);
			params.setArea && (where.set_area = params.setArea);
			params.setGroup && (where.set_group = params.setGroup);
		} else {
			where.enable_set = 'N'
		}
	}
	let options = {
		where: where,
		order: [['application'], ['server_name']]
	};
	if (params.curPage && params.pageSize) {
		options.limit = params.pageSize;
		options.offset = params.pageSize * (params.curPage - 1);
	}
	return await tServerConf.findAll(options);
};

ServerDao.getDowngradeConf = async (_where) => {
    let _result = await querySql(selectSql + ` WHERE application = '${_where.application}' AND server_name = '${_where.server_name}'`)
    return _result;
};

ServerDao.getServerConfByTemplate = async (templateName) => {
	return await tServerConf.findAll({
		where: {
			template_name: templateName
		}
	})
};

ServerDao.getServerConf4Tree = async (applicationList, serverNameList, allAttr) => {
	let where = { $or: [] };
	if (!!applicationList) {
		where.$or.push({ application: applicationList });
	}
	if (!!serverNameList) {
		where.$or.push(Sequelize.where(Sequelize.fn('concat', Sequelize.col('application'), '.', Sequelize.col('server_name')), { in: serverNameList }));
	}
	if (!applicationList && !serverNameList) {
		where = {};
	}


	let option = {};

	option.where = where;

	if (allAttr) {
	} else {
		option.attributes = [[Sequelize.literal('distinct `application`'), 'application'],
			'server_name', 'enable_set', 'set_name', 'set_area', 'set_group'
		]
	}

	return await tServerConf.findAll(option);
};


ServerDao.getInactiveServerConfList = async (application, serverName, nodeName, curPage, pageSize) => {
	let where = {};
	application && (where.application = application);
	serverName && (where.server_name = serverName);
	nodeName && (where.node_name = nodeName);
	where.setting_state = 'inactive';
	let options = {
		where: where,
		order: [['application'], ['server_name']]
	};
	if (curPage && pageSize) {
		options.limit = pageSize;
		options.offset = pageSize * (curPage - 1);
	}
	return await tServerConf.findAll(options);
};

ServerDao.updateServerConf = async (params) => {
	let updateOptions = {
		bak_flag: params.bak_flag,
		template_name: params.template_name,
		server_type: params.server_type,
		enable_set: params.enable_set,
		set_name: params.set_name,
		set_area: params.set_area,
		set_group: params.set_group,
		async_thread_num: params.async_thread_num,
		base_path: params.base_path,
		exe_path: params.exe_path,
		start_script_path: params.start_script_path,
		stop_script_path: params.stop_script_path,
		monitor_script_path: params.monitor_script_path,
		profile: params.profile,
		posttime: params.posttime
	};
	return await tServerConf.update(updateOptions, { where: { id: params.id } });
};

ServerDao.insertServerConf = async (params, transaction) => {
	if (transaction) {
		return await tServerConf.create(params, { transaction: transaction });
	} else {
		return await tServerConf.create(params);
	}
};

ServerDao.getApplication = async () => {
	return await tServerConf.findAll({
		attributes: [[Sequelize.literal('distinct `application`'), 'application']]
	});
};

ServerDao.getServerName = async (application) => {
	return await tServerConf.findAll({
		attributes: [[Sequelize.literal('distinct `server_name`'), 'server_name']],
		where: {
			application: application
		}
	});
};

ServerDao.getSet = async (application, serverName) => {
	let rst = await tServerConf.sequelize.query('select distinct if(enable_set = \'Y\', CONCAT(set_name, \'.\', set_area, \'.\', set_group), \'\') as \'set\' from db_todo.t_server_conf where application = \'' + application + '\' and server_name = \'' + serverName + '\'');
	return rst[0] || '';
};

ServerDao.getNodeName = async (params) => {
	let where = {
		application: params.application,
		server_name: params.serverName,
	}
	if (params.enableSet) {
		where = Object.assign(where, {
			enable_set: 'Y',
			set_name: params.setName,
			set_area: params.setArea,
			set_group: params.setGroup
		});
	} else {
		where.enable_set = 'N'
	}
	return await tServerConf.findAll({
		attributes: [[Sequelize.literal('distinct `node_name`'), 'node_name']],
		where: where
	})
}

ServerDao.getNodeNameList = async (params) => {
	let where = {
		application: params.application,
		server_name: params.server_name,
	}
	return await tServerConf.findAll({
		attributes: [[Sequelize.literal('distinct `node_name`'), 'node_name']],
		where: where,
		raw: true
	})
};

ServerDao.destroy = async (where = {}) => {
	return tServerConf.destroy({ where })
};

/**��ѯ���з����ʲ� */
ServerDao.getServiceCount = async () =>{
    const sql = `select  * from 
    (SELECT count(t.application) as count_app from (SELECT application from t_adapter_conf GROUP BY application) as t) as t1,
    (SELECT count(t.server_name) as count_server from (SELECT server_name from t_adapter_conf GROUP BY server_name) as t) as t2,
    (SELECT count(t.node_name) as count_node from (SELECT node_name from t_adapter_conf GROUP BY node_name) as t) as t3,
    (SELECT count(count) as count_func from(SELECT count(*) as count from t_interface_conf t2 LEFT JOIN t_adapter_conf t on t2.adapter_id = t.id GROUP BY t.servant,t2.interface_name) as t) t4   
    `;
    return await querySql(sql);
}

module.exports = ServerDao;
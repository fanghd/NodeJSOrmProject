const {tNodeInfo} = require('./db').db_todo;

const NodeInfoDao = {};

NodeInfoDao.getNodeInfo = async (endpointIps) => {
	return await tNodeInfo.findAll({
		where: {
			endpoint_ip: endpointIps
		}
	})
};

NodeInfoDao.deleteNodeInfo = async (nodeName) => {
	return await tNodeInfo.destroy({
		where: {node_name: nodeName}
	});
};

module.exports = NodeInfoDao;
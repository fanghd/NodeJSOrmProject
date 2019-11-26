const {tNodeInfo} = require('./db').db_todo;

const ResourceDao = {};

ResourceDao.getNodeInfo = async (endpointIps) => {
	return await tNodeInfo.findAll({
		where: {
			endpoint_ip: endpointIps
		}
	})
};

module.exports = ResourceDao;
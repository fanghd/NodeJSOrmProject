const DowngradeDao = require('../../dao/DowngradeDao');

const DowngradeService = {};

//通过服务ID获取服务下的所有adapter信息
DowngradeService.getDowngradeConfList = async (servant_name) => {
	return await DowngradeDao.getDowngradeByServantName(servant_name);
};


module.exports = DowngradeService;
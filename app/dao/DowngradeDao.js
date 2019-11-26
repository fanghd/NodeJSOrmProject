const {tInterfaceDowngradeConf, sequelize} = require('./db').db_todo;

const DowngradeDao = {};

DowngradeDao.getDowngradeByServantName = async (servant_name) => {
	return await tInterfaceDowngradeConf.findAll({
		raw: true,
		where: {
			servant_name: servant_name
		}
	});
};

module.exports = DowngradeDao;
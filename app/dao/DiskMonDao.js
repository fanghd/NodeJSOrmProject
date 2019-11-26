const { tDiskMonitor } = require('./db').db_todo;

const DiskMonDao = {};


DiskMonDao.getServerDiskMonList = async (curPage, pageSize) => {
	let options = {
		raw: true,
		order: [['createtime', 'DESC']]
	};
	if (curPage && pageSize) {
		options.limit = pageSize;
		options.offset = pageSize * (curPage - 1);
	}
	return await tDiskMonitor.findAndCountAll(options);
};


module.exports = DiskMonDao;
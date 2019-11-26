const DiskMonDao = require('../../dao/DiskMonDao');

const DiskMonService = {}

DiskMonService.getServerDiskMonList = async (curPage, pageSize) => {
	return await DiskMonDao.getServerDiskMonList(curPage, pageSize);
}

module.exports = DiskMonService;
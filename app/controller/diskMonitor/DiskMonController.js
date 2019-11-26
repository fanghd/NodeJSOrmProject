const logger = require('../../logger');
const DiskMonService = require('../../service/diskMonitor/DiskMonService');

const DiskMonController = {};
const util = require('../../tools/util');

const serverDiskStruct = {
	createtime: { formatter: util.formatTimeStamp },
	id: '',
	ip: '',
	cpu_num: '',
	load_5: '',
	load_10: '',
	load_15: '',
	mem_total: '',
	mem_used: '',
	handle_used: '',
	root_total: '',
	root_used: '',
	mnt_total: '',
	mnt_used: '',
	description: ''
};

DiskMonController.getServerDiskMonList = async (ctx) => {
	let curPage = parseInt(ctx.paramsObj.curr_page) || 0;
	let pageSize = parseInt(ctx.paramsObj.page_size) || 0;
	try {
		let rst = await DiskMonService.getServerDiskMonList(curPage, pageSize);
		ctx.makeResObj(200, '', { count: rst.count, rows: util.viewFilter(rst.rows, serverDiskStruct) });
	} catch (e) {
		logger.error('[getServerDiskMonList]', e, ctx);
		ctx.makeErrResObj();
	}
};

module.exports = DiskMonController;
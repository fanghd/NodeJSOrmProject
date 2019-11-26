const logger = require('../../logger');
const DowngradeService = require('../../service/server/DowngradeService');
const util = require('../../tools/util');

const downgradeConfStruct = {
	id: '',
	servant_name: '',
	interface_name: '',
	max_failed_num: '',
	max_failed_ratio: '',
	max_request_num: '',
	downgrade_desc: '',
	posttime: '',
	lastuser: '',
};

const DowngradeController = {};

DowngradeController.getObjList = async (ctx) => {
	let servant_name = ctx.paramsObj.servant_name;
	try {
		let rst = await DowngradeService.getDowngradeConfList(servant_name);
		ctx.makeResObj(200, '', util.viewFilter(rst, downgradeConfStruct));
	} catch (e) {
		logger.error('[getObjList]', e, ctx);
		ctx.makeErrResObj();
	}
};

module.exports = DowngradeController;
const logger = require('../../logger');
const util = require('../../tools/util');
const MonitorStatService = require('../../service/monitor/MonitorStatService');
const MonitorServerService = require('../../service/monitor/MonitorServerService')

const MonitorController = {};

MonitorController.todostat = async (ctx) => {
	let { thedate, predate, startshowtime, endshowtime, master_name, slave_name, interface_name, master_ip, slave_ip, group_by } = ctx.paramsObj;
	try {
		let list = await MonitorStatService.getZENStatMonitorData({
			thedate,
			predate,
			startshowtime,
			endshowtime,
			master_name,
			slave_name,
			interface_name,
			master_ip,
			slave_ip,
			group_by
		});
		// ctx.makeResObj(200, '', util.viewFilter(list, {
		// 	show_date: '',
		// 	show_time: '',
		// 	master_name: '',
		// 	slave_name: '',
		// 	interface_name: '',
		// 	master_ip: '',
		// 	slave_ip: '',
		// 	the_total_count: '',
		// 	pre_total_count: '',
		// 	total_count_wave: '',
		// 	the_avg_time: '',
		// 	pre_avg_time: '',
		// 	the_fail_rate: '',
		// 	pre_fail_rate: '',
		// 	the_timeout_rate: '',
		// 	pre_timeout_rate: '',
		// }));
		ctx.makeResObj(200, '', list);
	} catch (e) {
		logger.error(e, ctx);
		ctx.makeResObj(500, e && e.message || e);
	}
};

/**
 * 服务监控
 */
MonitorController.serverstat = async (ctx) => {
	let { start_date, end_date } = ctx.paramsObj;
	try {
		let list = await MonitorServerService.getMonitorServerData({
			start_date,
			end_date
		});
		ctx.makeResObj(200, '', list);
	} catch (e) {
		logger.error(e, ctx);
		ctx.makeResObj(500, e && e.message || e);
	}
}

/**获取Top指标 */
MonitorController.servertop = async (ctx) => {
	let { start_date, end_date, orderBy, order } = ctx.paramsObj;
	try {
		if (typeof orderBy == "string") {
			let list = await MonitorServerService.getMonitorTopData({
				start_date,
				end_date,
				order,
				orderBy
			});
			ctx.makeResObj(200, '', list);
		} else {
			let resData = {};
			for (let item of orderBy) {
				resData[item] = await MonitorServerService.getMonitorTopData({
					start_date,
					end_date,
					order,
					orderBy: item
				});
			}
			ctx.makeResObj(200, '', resData);
		}
	} catch (e) {
		logger.error(e, ctx);
		ctx.makeResObj(500, e && e.message || e);
	}
}

/**当天指定范围监控数据 */
MonitorController.todostatlist = async (ctx) => {
	let { start_date, end_date } = ctx.paramsObj;
	try {
		let list = await MonitorServerService.getMonitorServerData({
			start_date,
			end_date
		});
		ctx.makeResObj(200, '', list);
	} catch (e) {
		logger.error(e, ctx);
		ctx.makeResObj(500, e && e.message || e);
	}
}

/**获取最新监控数据 */
MonitorController.latesttodostat = async (ctx) => {
	try {
		let list = await MonitorServerService.getLatestMonitorData();
		ctx.makeResObj(200, '', list);
	} catch (e) {
		logger.error(e, ctx);
		ctx.makeResObj(500, e && e.message || e);
	}
}

MonitorController.todostathealth = async (ctx) => {
	try {
		let rsp = await MonitorServerService.getTodoStatHealth();
		ctx.makeResObj(200, '', rsp);
	} catch (e) {
		logger.error(e, ctx);
		ctx.makeResObj(500, e && e.message || e);
	}
}

module.exports = MonitorController;

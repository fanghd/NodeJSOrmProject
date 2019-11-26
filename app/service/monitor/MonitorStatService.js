const logger = require('../../logger');
const TCPClient = require('./TCPClient');
const Mysql = require('mysql');
const _http = require('../http-request');

const MonitorStatService = {};

MonitorStatService.getZENStatMonitorData = async (params) => {
	let theData = await call(params, true),//显示日期
		preData = await call(params, false);//对比日期
	return merge(params, theData, preData);
	/**使用现有服务获取诗句 */
	const postData = {
		show_date: params.thedate,
		comp_date: params.predate,
		interface_name: params.interface_name || "%",
		master_ip: params.master_ip || "%",
		master_name: params.master_name || "%",
		slave_ip: params.slave_ip || "%",
		slave_name: params.slave_name,
		start_time: params.startshowtime,
		stop_time: params.endshowtime
	};
	let res = await _http.getServerMonitorData(postData);
	return res.data;
};


/**
 * 处理显示日期和对比日期查询条件
 * @param params
 * @param the 是否当前日期
 */
async function call(params, the) {
	let date = the ? params.thedate : params.predate,
		conditions = [],
		startshowtime = params.startshowtime || '0000',
		endshowtime = params.endshowtime || '2360';
	conditions.push(`f_date=${Mysql.escape(date)}`);
	conditions.push(`f_tflag>=${Mysql.escape(startshowtime)}`);
	conditions.push(`f_tflag<=${Mysql.escape(endshowtime)}`);
	if (params.master_name) {
		conditions.push(`master_name like ${Mysql.escape(params.master_name)}`);
	}
	if (params.slave_name) {
		conditions.push(`slave_name like ${Mysql.escape(params.slave_name)}`);
	}
	if (params.interface_name) {
		conditions.push(`interface_name like ${Mysql.escape(params.interface_name)}`);
	}
	if (params.master_ip) {
		conditions.push(`master_ip like ${Mysql.escape(params.master_ip)}`);
	}
	if (params.slave_ip) {
		conditions.push(`slave_ip like ${Mysql.escape(params.slave_ip)}`);
	}
	let requestObj = {
		groupby: params.group_by ? ['f_date', params.group_by] : ['f_tflag'],
		method: 'query',
		dataid: 'todo_stat',
		filter: conditions,
		indexs: [
			'succ_count',
			'timeout_count',
			'exce_count',
			'total_time',
			'maxrsp_time',
			'minrsp_time',
			// 'master_name',
			// 'master_ip',
			// 'slave_name',
			// 'slave_ip',
			// 'interface_name'
		]
	};
	let addrs = await AdminService.getEndpoints("todo.todoquerystat.NoTodoObj").catch(err => {
		logger.error('[AdminService.getEndpoints]:', err.toString());
		console.error(err);
	});
	if (!addrs || !addrs.length) {
		logger.error('[AdminService.getEndpoints]:', 'todo.todoquerystat.NoTodoObj not found');
		return;
	}
	let addr0 = addrs[0];
	logger.info(`todo.todoquerystat.NoTodoObj, use ${addr0.host}:${addr0.port}`);
	let tcpRes = await TCPClient(addr0.host, addr0.port, requestObj)
	console.log(tcpRes)
	return tcpRes;
}

function merge(params, theData, preData) {
	let result = [];
	let set = mergeKey(params, theData, preData);
	for (let item of set) {
		let thevalue = translate(theData.get(item)),
			prevalue = translate(preData.get(item)),
			thevalueOutput = formatValue(thevalue),
			prevalueOutput = formatValue(prevalue),
			totalCountWave = '';
		if (thevalue[0] < 0 || prevalue[0] < 0) {
			totalCountWave = '--';
		} else {
			if (prevalue[0] == 0) {
				if (thevalue[0] == 0) {
					totalCountWave = '0%';
				} else {
					totalCountWave = '+∞%';
				}
			} else {
				let wave = (thevalue[0] - prevalue[0]) / prevalue[0];
				totalCountWave = (wave * 100).toFixed(2) + '%';
			}
		}
		let tmpObj = {
			interface_name: params.interface_name || '%',
			master_ip: params.master_ip || '%',
			master_name: params.master_name || '%',
			slave_name: params.slave_name || '%',
			slave_ip: params.slave_ip || '%',

			the_total_count: thevalueOutput[0],
			the_avg_time: thevalueOutput[1],
			the_fail_rate: thevalueOutput[2],
			the_timeout_rate: thevalueOutput[3],
			the_maxrsp_time: thevalueOutput[4],
			the_minrsp_time: thevalueOutput[5],
			the_fail_time: thevalueOutput[6],
			the_timeout_time: thevalueOutput[7],

			pre_total_count: prevalueOutput[0],
			pre_avg_time: prevalueOutput[1],
			pre_fail_rate: prevalueOutput[2],
			pre_timeout_rate: prevalueOutput[3],
			pre_maxrsp_time: prevalueOutput[4],
			pre_minrsp_time: prevalueOutput[5],
			pre_fail_time: prevalueOutput[6],
			pre_timeout_time: prevalueOutput[7],

			total_count_wave: totalCountWave
		};

		let groupby = params.group_by ? ['f_date', params.group_by] : ['f_tflag'];
		for (let i = 0; i < groupby.length; i++) {
			let callGroup = groupby[i],
				key = item.split(','),
				callGroupValue = key[i];

			switch (callGroup) {
				case 'f_date':
					tmpObj.show_date = callGroupValue;
					break;
				case 'f_tflag':
					tmpObj.show_time = callGroupValue;
					break;
				case 'master_name':
					// tmpObj.master_name = callGroupValue;
					break;
				case 'slave_name':
					// tmpObj.slave_name = callGroupValue;
					break;
				case 'interface_name':
					// tmpObj.interface_name = callGroupValue;
					break;
				case 'master_ip':
					// tmpObj.master_ip = callGroupValue;
					break;
				case 'slave_ip':
					// tmpObj.slave_ip = callGroupValue;
					break;
			}
		}

		result.push(tmpObj);
	}
	return result;
}

function mergeKey(params, theData, preData) {
	let set = new Set();
	for (let key of theData.keys()) {
		set.add(key);
	}
	for (let key of preData.keys()) {
		key = key.split(',');
		if (key.length > 1) {
			key[0] = params.thedate;
		}
		set.add(key.join(','));
	}
	return set;
}

function translate(data) {
	if (!data) {
		return [-1, -1, -1, -1];
	}
	let ret = [];
	let total = parseInt(data[0]) + parseInt(data[1]) + parseInt(data[2]);
	ret[0] = total;
	ret[1] = total == 0 ? -1 : data[3] / ret[0];
	ret[2] = total == 0 ? -1 : data[2] / ret[0];
	ret[3] = total == 0 ? -1 : data[1] / ret[0];
	ret[4] = data[4] || '--';
	ret[5] = data[5] || '--';
	ret[6] = data[2] || '--';
	ret[7] = data[3] || '--';
	ret[8] = data[6] || '%';
	ret[9] = data[7] || '%';
	ret[10] = data[8] || '%';
	ret[11] = data[9] || '%';
	ret[12] = data[10] || '%';
	return ret;
}

function formatValue(data) {
	let ret = [];
	ret[0] = data[0] < 0 ? '--' : data[0].toFixed(0);
	ret[1] = data[1] < 0 ? '--' : data[1].toFixed(2);
	ret[2] = data[2] < 0 ? '--' : (data[2] * 100).toFixed(2) + '%';
	ret[3] = data[3] < 0 ? '--' : (data[3] * 100).toFixed(2) + '%';
	ret[4] = data[4] || '--';
	ret[5] = data[5] || '--';
	ret[6] = data[2] < 0 ? '--' : data[2];
	ret[7] = data[3] < 0 ? '--' : data[2];
	ret[8] = data[6] || '%';
	ret[9] = data[7] || '%';
	ret[10] = data[8] || '%';
	ret[11] = data[9] || '%';
	ret[12] = data[10] || '%';
	return ret;
}


module.exports = MonitorStatService;
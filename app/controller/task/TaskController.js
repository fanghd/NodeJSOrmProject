const logger = require('../../logger');
const TaskService = require('../../service/task/TaskService');
const util = require('../../tools/util');
const kafkaConf = require('../../../config/webConf').kafkaConf;
const AuthService = require('../../service/auth/AuthService');

const TaskController = {};

let kafkaProducer;
let kafkaConsumer;

if (kafkaConf.enable) {
	const kafka = require('kafka-node');
	kafkaProducer = require('../../service/task/KafkaProducer');
	kafkaConsumer = require('../../service/task/KafkaConsumer');

	kafkaConsumer.consume();
}


TaskController.getTasks = async (ctx) => {
	try {
		let {application, server_name, command, from, to, curr_page = 0, page_size = 0} = ctx.paramsObj;
		if (!await AuthService.hasDevAuth(application, server_name, ctx.uid)) {
			ctx.makeNotAuthResObj();
		} else {
			let ret = [];
			let tasks = await TaskService.getTasks({
				application,
				server_name,
				command,
				from,
				to,
				curr_page,
				page_size
			}).catch(function (e) {
				logger.error('[getTasks]:', e);
				return e;
			});
			for (let i = 0, len = tasks.rows.length; i < len; i++) {
				let task = tasks.rows[i];

				try {
					ret.push(await TaskService.getTaskRsp(task.task_no));
				} catch (e) {
					ret.push({
						task_no: task.task_no,
						serial: !!task.serial,
						status: -1,
						items: [{}]
					});
				}
			}
			ctx.makeResObj(200, '', {count: tasks.count, rows: ret});
		}
	} catch (e) {
		logger.error('[TaskController.getTasks]:', e, ctx);
		ctx.makeErrResObj(500, e.toString());
	}
};

TaskController.getTask = async (ctx) => {
	try {
		let ret;
		if (kafkaConf.enable) {
			let task = await TaskService.getTaskStatus(ctx.paramsObj.task_no);
			logger.info(task);
			if (task.status == 'waiting') {
				ret = {status: 0};
			} else {
				ret = await TaskService.getTaskRsp(ctx.paramsObj.task_no);
			}
		} else {
			ret = await TaskService.getTaskRsp(ctx.paramsObj.task_no);
		}
		ctx.makeResObj(200, '', ret);
	} catch (e) {
		logger.error('[TaskController.getTask]:', e, ctx);
		ctx.makeErrResObj(500, e.toString());
	}
};

TaskController.addTask = async (ctx) => {
	let {serial, items} = ctx.paramsObj;
	if (!items.length) {
		return ctx.makeResObj(500, '#task.params#');
	}
	try {
		let task_no = util.getUUID().toString();

		if (kafkaConf.enable) {
			await kafkaProducer.produce(JSON.stringify({serial, items, task_no}), () => {
				logger.info('task produce success!');
			});
		} else {
			await TaskService.addTask({serial, items, task_no});
		}
		ctx.makeResObj(200, '', task_no);
	} catch (e) {
		logger.error('[TaskController.addTask]:', e, ctx);
		ctx.makeErrResObj(500, e.toString());
	}
};

module.exports = TaskController;
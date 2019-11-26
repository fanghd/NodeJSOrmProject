const logger = require('../../logger');
const ServerService = require('../../service/server/ServerService');
const util = require('../../tools/util');
const TaskDao = require('../../dao/TaskDao');
const KafkaDao = require('../../dao/KafkaDao');
const AuthService = require('../../service/auth/AuthService');
const _http = require('../http-request');

const TaskService = {};



TaskService.getTasks = async (params) => {
	return await TaskDao.getTask(params);
};

TaskService.getTaskStatus = async (taskNo) => {
	return await KafkaDao.getTaskByTaskNo(taskNo);
};


TaskService.autoDeletePermission = function (application, server_name, taskNo) {
	let t = null,
		timeout = 60 * 1000,   // 60S 超时
		start = new Date().getTime();
	let f = function () {
		if (new Date().getTime() - start >= timeout) {
			clearTimeout(t);
			t = null;
			logger.error('unDeployPermission err: timeout');
			return;
		}
		TaskService.getTaskRsp(taskNo).then(function (data) {
			if (data.status == 2) {
				AuthService.deleteAuth(application, server_name);
				clearTimeout(t);
				t = null;
				return;
			}
			t = setTimeout(f, 3000);
		}).catch(function (err) {
			t = setTimeout(f, 3000);
		});
	};
	f();
};

module.exports = TaskService;
const {tKafkaQueue} = require('./db').db_todo_web;

module.exports = {
	getTaskByTaskNo: async (taskNo) => {
		return await tKafkaQueue.findOne({
			where: {task_no: taskNo},
			raw: true
		});
	},

	updateTask: async (params, taskNo) => {
		return await tKafkaQueue.update(params, {
			where: {
				task_no: taskNo
			}
		});
	},

	addTask: async (params) => {
		return await tKafkaQueue.create(params)
	}
};

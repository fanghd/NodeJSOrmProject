const {tTask, tTaskItem} = require('./db').db_todo;
tTask.belongsTo(tTaskItem, {foreignKey: 'task_no', as: 'taskItem', targetKey: 'task_no'});

module.exports = {
	getTask: async (params) => {
		let whereObj = {};
		params.application && Object.assign(whereObj, {'$taskItem.application$': params.application});
		params.server_name && Object.assign(whereObj, {'$taskItem.server_name$': params.server_name});
		params.command && Object.assign(whereObj, {'$taskItem.command$': params.command});
		if (params.from) {
			whereObj.create_time['$gte'] = params.from
		}
		if (params.to) {
			whereObj.create_time['$lte'] = params.to
		}
		let opts = {
			attribute: ['task_no', 'serial', 'create_time'],
			order: [['create_time', 'desc']],
			where: whereObj,
			include: {
				model: tTaskItem,
				as: 'taskItem'
			},
		}
		if (params.curr_page && params.page_size) {
			Object.assign(opts, {
				limit: parseInt(params.page_size),
				offset: parseInt(params.page_size) * (parseInt(params.curr_page) - 1)
			})
		}

		return tTask.findAndCountAll(opts);
	}
};

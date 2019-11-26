const {tTodoFiles} = require('./db').db_todo_web;

module.exports = {
	addTodoFile: async (params) => {
		return tTodoFiles.upsert(params, {
			fields: ['server_name', 'file_name', 'posttime', 'context']
		})
	},

	getTodoFile: async (params, fields) => {
		let opt = {
			raw: true,
			where: params
		};
		if (fields) {
			Object.assign(opt, {attributes: fields});
		}
		return tTodoFiles.findAll(opt);
	},

	getContext: async (id) => {
		return tTodoFiles.findOne({
			raw: true,
			where: {
				f_id: id
			},
			attributes: ['context']
		})
	},

	deleteTodoFile: async (id) => {
		return tTodoFiles.destroy({
			where: {
				f_id: id
			}
		});
	}
};

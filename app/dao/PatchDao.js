const {tServerPatchs} = require('./db').db_todo;
const {tCodeInterfaceConf, tPatchTask} = require('./db').db_todo_web;

module.exports = {
	find: async ({where}) => {
		return tServerPatchs.find({
			where
		})
	},
	insertServerPatch: async (params) => {
		return await tServerPatchs.create(params);
	},

	insertPatchTask: async (params) => {
		return await tPatchTask.create(params);
	},

	getServerPatch: async (server, curPage, pageSize, package_type) => {
		var opts = {
			order: [
				['id', 'desc']
			],
			where: {
				server: server
			}
		};
		if (package_type !== undefined) opts.where.package_type = package_type;
		if (curPage && pageSize) {
			Object.assign(opts, {
				limit: pageSize,
				offset: pageSize * (curPage - 1)
			})
		}
		return await tServerPatchs.findAndCountAll(opts);
	},

	destroyServePatch: async ({where}) => {
		return await tServerPatchs.destroy({where})
	},

	setPatchPackageDefault: async ({id, application, module_name, package_type}) => {
		await tServerPatchs.update({
			default_version: 0
		}, {
			where: {
				server: application + '.' + module_name,
				default_version: 1,
				package_type
			}
		});
		return await tServerPatchs.update({
			default_version: 1
		}, {
			where: {id}
		});
	},

	getServerPatchByPkgName: async (name) => {
		return await tServerPatchs.findOne({
			where: {
				tgz: name
			},
			raw: true
		});
	},

	getPackageByTaskId: async (taskId) => {
		return await tPatchTask.findOne({
			where: {
				task_id: taskId
			},
			raw: true
		});
	},

	getCodeInfConf: async (app, module_name) => {
		return await tCodeInterfaceConf.findOne({
			where: {
				server: `${app}.${module_name}`
			},
			raw: true
		});
	},

	setCodeInfConf: async (params) => {
		return await tCodeInterfaceConf.upsert({
			server: `${params.application}.${params.module_name}`,
			path: params.path
		}, {
			server: `${params.application}.${params.module_name}`
		});
	}
};

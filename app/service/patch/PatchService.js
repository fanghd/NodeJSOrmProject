const PatchDao = require('../../dao/PatchDao');

const PatchService = {};

PatchService.addServerPatch = async (params) => {
	return await PatchDao.insertServerPatch(params);
};

PatchService.getServerPatch = async (application, server_name, curPage, pageSize, package_type) => {
	return await PatchDao.getServerPatch(`${application}.${server_name}`, curPage, pageSize, package_type);
};

PatchService.deleteServerPatchById = async (id) => {
	return await PatchDao.destroyServePatch({
		where: {id}
	})
};

PatchService.setPatchPackageDefault = async ({id, application, module_name, package_type}) => {
	return await PatchDao.setPatchPackageDefault({id, application, module_name, package_type})
};

PatchService.find = async ({where}) => {
	return await PatchDao.find({where})
};

PatchService.hasDcahcePatchPackage = async () => {
	let has = true;
	let proxyDefaultPackage = await PatchDao.find({
		where: {
			server: 'DCache.RouterServer',
			default_version: 1,
			package_type: 0
		}
	});
	let routerDefaultPackage = await PatchDao.find({
		where: {
			server: 'DCache.RouterServer',
			default_version: 1,
			package_type: 0
		}
	})
	let cacheDefaultPackage = await PatchDao.find({
		where: {
			server: 'DCache.DCacheServerGroup',
			default_version: 1,
			package_type: 1
		}
	})
	let McacheDefaultPackage = await PatchDao.find({
		where: {
			server: 'DCache.DCacheServerGroup',
			default_version: 1,
			package_type: 2
		}
	})

	return !!proxyDefaultPackage && !!routerDefaultPackage && !!cacheDefaultPackage && !!McacheDefaultPackage


};

module.exports = PatchService;
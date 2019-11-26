const PatchDao = require('../../dao/PatchDao');
const request = require('request-promise-any');
const compileConf = require('../../../config/compileConf');
const logger = require('../../logger');
const CompileService = {};

CompileService.addPatchTask = async (params) => {
	return await PatchDao.insertPatchTask(params);
};

CompileService.getServerPatchByTaskId = async (taskId) => {
	let ret = await PatchDao.getPackageByTaskId(taskId);
	if (ret) {
		let tgz = ret.tgz;
		return await PatchDao.getServerPatchByPkgName(tgz);
	} else {
		return {};
	}
};

CompileService.getTagList = async (application, server_name) => {
	let ret = await request({
		uri: compileConf.getVersionList,
		qs: {
			application,
			server_name,
		},
		headers: {
			'User-Agent': 'Request-Promise'
		},
		json: true
	});
	if (Object.prototype.toString.call(ret) === 'Array') {
		return ret;
	} else {
		return ret.data;    // 假设编译系统返回的是 {data:[],ret_code:200,err_msg:''}的结构
	}
};

CompileService.getCompilerConf = () => {
	return compileConf;
};

CompileService.getCodeInfConf = async (application, server_name) => {
	return await PatchDao.getCodeInfConf(application, server_name);
};

CompileService.setCodeInfConf = async (params) => {
	return await PatchDao.setCodeInfConf(params);
};

CompileService.doCompile = async (params) => {
	return await request({
		method: 'POST',
		uri: compileConf.compileUrl,
		body: params,
		json: true
	});
};

CompileService.compilerTask = async (taskNo) => {
	return await request({
		method: 'GET',
		uri: compileConf.compileTaskUrl,
		qs: {taskNo},
		json: true
	});
};

module.exports = CompileService;
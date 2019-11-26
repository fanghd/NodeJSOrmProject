
/**
 * 权限配置
 */
module.exports = {

	/**
	 * 是否启用自定义权限模块
	 */
	enableAuth: false,

	/**
	 * addAuthUrl             新增权限url
	 * ZEN平台会提供的参数
	 * @param   {Array}    auth         权限对象列表，格式如 {"flag": "app-server", "role": "operator", "uid": "username"}
	 */
	/**
	 * 接口需要返回的参数
	 * @param   {Number}    ret_code            返回码，200表示成功
	 * @param   {String}    err_msg             错误信息
	 */
	addAuthUrl: 'http://localhost:3001/api/auth/addAuth',

	/**
	 * deleteAuthUrl             删除权限url，用于服务下线时候删除权限
	 * ZEN平台会提供的参数
	 * @param   {String}    flag                权限单位，在todo中为“应用-服务”
	 */
	/**
	 * 接口需要返回的参数
	 * @param   {Number}    ret_code            返回码，200表示成功
	 * @param   {String}    err_msg             错误信息
	 */
	deleteAuthUrl: 'http://localhost:3001/api/auth/deleteAuth',

	/**
	 * updateAuthUrl             更新权限url
	 * ZEN平台会提供的参数
	 * @param   {String}    flag                权限单位，在todo中为“应用-服务”
	 * @param   {String}    role                角色，在todo中为operator或developer
	 * @param   {String}    uid                 用户名
	 */
	/**
	 * 接口需要返回的参数
	 * @param   {Number}    ret_code            返回码，200表示成功
	 * @param   {String}    err_msg             错误信息
	 */
	updateAuthUrl: 'http://localhost:3001/api/auth/updateAuth',

	/**
	 * getAuthListByUidUrl             通过用户名获取权限列表url
	 * ZEN平台会提供的参数
	 * @param   {String}    uid                 用户名
	 */
	/**
	 * 接口需要返回的参数
	 * @param   {Array}     data                服务列表，内容如下
	 *        @param   {String}    flag                权限单位，在todo中为“应用-服务”
	 *        @param   {String}    role                角色，在todo中为operator或developer
	 *        @param   {String}    uid                 用户名
	 * @param   {Number}    ret_code            返回码，200表示成功
	 * @param   {String}    err_msg             错误信息
	 */
	getAuthListByUidUrl: 'http://localhost:3001/api/auth/getAuthListByUid',

	/**
	 * getAuthListByFlagUrl             通过应用名+服务名获取用户列表url
	 * ZEN平台会提供的参数
	 * @param   {String}    flag                 应用+服务名
	 */
	/**
	 * 接口需要返回的参数
	 * @param   {Array}     data                服务列表，内容如下
	 *        @param   {String}    flag                权限单位，在todo中为“应用-服务”
	 *        @param   {String}    role                角色，在todo中为operator或developer
	 *        @param   {String}    uid                 用户名
	 * @param   {Number}    ret_code            返回码，200表示成功
	 * @param   {String}    err_msg             错误信息
	 */
	getAuthListByFlagUrl: 'http://localhost:3001/api/auth/getAuthListByFlag',

	/**
	 * getAuthUrl             判断用户是否有相应角色的操作权限
	 * ZEN平台会提供的参数
	 * @param   {String}    flag                权限单位，在todo中为“应用-服务”
	 * @param   {String}    role                角色，在todo中为operator或developer
	 * @param   {String}    uid                 用户名
	 */
	/**
	 * 接口需要返回的参数
	 * @param   {Object}     data                服务列表，内容如下
	 *        @param   {Boolean}    result              是否有操作权限
	 * @param   {Number}    ret_code            返回码，200表示成功
	 * @param   {String}    err_msg             错误信息
	 */
	getAuthUrl: 'http://localhost:3001/api/auth/getAuth'
};
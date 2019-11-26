/**
 * 资源文件配置
 */
module.exports = {

	/**
	 * 是否允许管理平台在服务上线和服务扩容时自动到机器上安装Todo node
	 */
	enableAutoInstall: false,

	/**
	 * getMachineConf               获取机器配置，管理平台优先从此接口获取，若未配置此接口，则从sshConf.json中获取。
	 * ZEN平台会提供的参数
	 * @param   {String}    ip                 ip
	 */
	/**
	 * 接口需要返回的参数
	 * @param   {Object}     data                机器配置信息，对象内容如下
	 *        @param   {String}    ip                机器ip
	 *        @param   {String}    port              ssh端口
	 *        @param   {String}    username          用户名
	 *        @param   {String}    password          机器密码
	 * @param   {Number}    ret_code            返回码，200表示成功
	 * @param   {String}    err_msg             错误信息
	 */
	getMachineConf: ''
};
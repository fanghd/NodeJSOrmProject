const { tServerNotifys } = require('./db').db_todo;
const Operators = require('./db/Operators');

const NotifyDao = {};


NotifyDao.getServerNotifyList = async (serverIds, curPage, pageSize) => {
	let where = {};
	where.server_id = serverIds || [];
	let options = {
		raw: true,
		where: where,
		order: [['notifytime', 'DESC']]
	};
	if (curPage && pageSize) {
		options.limit = pageSize;
		options.offset = pageSize * (curPage - 1);
	}
	return await tServerNotifys.findAndCountAll(options);
};

NotifyDao.getNewProblems = async (limit) => {
	limit = limit || 20;
	let options = {
		raw: true,
		where: {
			result: {
				[Operators.regexp]: 'ERROR|fail|alarm'
			}
		},
		limit: limit,
		order: [['notifytime', 'DESC']]
	};
	return await tServerNotifys.findAll(options);
}


module.exports = NotifyDao;
const { querySql } = require('./db').todo_stat;
const { todoStatCount } = require('./db').todo_stat;
const moment = require('moment');
const Sequelize = require('sequelize');

let MonitDao = {};

const FORMAT = {
    DAY: 'YYYYMMDD',
    DAYHOUR: 'YYYYMMDDHH'
}

const selectSql = `select 
convert(stattime using utf8) as stattime,
f_date,f_tflag,source_id,master_name,
slave_name,interface_name,todo_version,master_ip,
slave_ip,slave_port,return_value,succ_count,
timeout_count,exce_count,interv_count,total_time,
ave_time,maxrsp_time,minrsp_time,(timeout_count+exce_count) as error_count,(timeout_count+exce_count+succ_count) as total_count
from todo_stat_`

/**
 * 获取当日当前时间监控数据
 */
MonitDao.getMonitorNowData = async (_where) => {
    const _time = moment().format(FORMAT.DAYHOUR);
    let w_str;
    if (_where) {
        w_str = ' where';
        for (let key in _where) {
            w_str += ` ${key}${_where[key]['action']}'${_where[key]['value']}' and`;
        }
        w_str = w_str.slice(0, -3);
    }
    let _result = await querySql(selectSql + _time + (w_str || ''))
    return _result;
}

/**获取任意时间监控表数据 */
MonitDao.getAnyMonitorData = async (_time) => {
    return await querySql(selectSql + _time)
}


/**查询最新的监控数据 */
MonitDao.getLatestMonitorData = async (_time) => {
    return await querySql(`select * from todo_stat_${_time} WHERE f_tflag = (SELECT f_tflag from todo_stat_${_time} ORDER BY stattime desc LIMIT 1)`)
}

/**通过日期获取统计数据 */
MonitDao.getCountBydate = async (date) => {
    const options = {
        raw: true,
        where: {
            f_date: moment(date).format('YYYY-MM-DD')
        }
    }
    return await todoStatCount.findAll(options)
}

/**写入最新统计数据 */
MonitDao.createCountData = async (data) => {
    return await todoStatCount.create(data);
}

/**更新统计数据 */
MonitDao.updateCountData = async (id, data) => {
    let option = {
        where: {
            id: id
        }
    }
    return await todoStatCount.update(data, option)
}

/**初始化当天统计数据 */
MonitDao.initTheDayCountData = async (data) => {
    let options = {
        where: {
            f_date: moment().format('YYYY-MM-DD')
        }
    }
    return await todoStatCount.update(data, options)
}
/**初始化所有统计数据 */
MonitDao.initCountData = async (data) => {
    let options = {
        raw: true,
        where: {}
    }
    return await todoStatCount.update(data, options)
}

/**获取健康度 */
MonitDao.getTodoStatHealth = async (date) => {
    let options = {
        raw: true,
        where: {
            f_date: date
        },
        group: "slave_name",
        attributes: [
            [Sequelize.fn('sum', Sequelize.col('succ_count')), 'succ_count'],
            [Sequelize.fn('sum', Sequelize.col('timeout_count')), 'timeout_count'],
            [Sequelize.fn('sum', Sequelize.col('exce_count')), 'exce_count'],
        ]
    }
    return await todoStatCount.findAll(options);
}


// /**获取每天日期监控总表数据 */
// MonitDao.getPreDateMonitorDataInTotal = async (date) => {
//     return await querySql(`select * from todo_stat_${date}`)
// }

module.exports = MonitDao;
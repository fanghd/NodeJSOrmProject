const logger = require('../../logger');
const MonitDao = require('../../dao/MonitDao');
const Buffer = require('buffer').Buffer;
const Rd = require('../../redis');
const moment = require('moment');

class MonitorServerService {
    constructor() {
        this.queryTime = 10;
        this._cache = {};
        this.dayHours = [
            '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
            '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21',
            '22', '23'
        ]
        this.initTheDayData();
        this.initLatestData();
    }

    async initTheDayData() {
        this._cache = {};
        const theDay = this.getDate()
        await this.getTheDayMonitorData(theDay)
    }

    async initLatestData() {
        let res = await this.queryTheNewMonitorData();
        this.writeCache('latestData', res)
        setInterval(async () => {
            res = await this.queryTheNewMonitorData();
            this.writeCache('latestData', res)
        }, 1000 * this.queryTime);
    }

    /**获取健康度统计 */
    async getTodoStatHealth() {
        const theDay = moment().format('YYYY-MM-DD');
        let data = await MonitDao.getTodoStatHealth(theDay);
        let len = data.length;
        let res = {};
        res.total = len;
        res.normal = len;
        res.warning = 0;
        res.error = 0;
        for (let item of data) {
            let total = item.timeout_count + item.succ_count + item.exce_count;
            let timeout = item.timeout_count / total;
            let exce = item.exce_count || 0;
            if (exce > 0 || timeout > 0.1) {
                res.error++;
                continue;
            }
            if (timeout > 0 && timeout <= 0.1) {
                res.warning++;
            }
        }
        res.normal = res.total - res.warning - res.error;
        res.health = parseInt((1 - (res.warning * 5 + res.error * 15) / res.total).toFixed(0));
        return res
    }

    /**查询最新的*/
    async queryTheNewMonitorData() {
        const hour = this.getHour();
        const day = this.getDate();
        let newData = await MonitDao.getLatestMonitorData(day + hour);
        return newData;
    }

    /**获取最新监控数据 */
    async getLatestMonitorData() {
        let latestData = await this.readCache('latestData');
        if (latestData) {
            return latestData;
        }
        const hour = this.getHour();
        const day = this.getDate();
        latestData = await MonitDao.getLatestMonitorData(day + hour);
        return latestData;
    }

    /**监控Top统计数据
     * @param {*} param 
     */
    async getMonitorTopData(param) {
        let { start_date, end_date, order, orderBy } = param;
        start_date = this.getDate(start_date);
        end_date = this.getDate(end_date);
        const _now = this.getDate();
        if (start_date == end_date && start_date == _now) {
            //只获取当天数据
            let theDayData = await this.getTheDayMonitorData(_now) || [];
            theDayData = this.mergeInterface(theDayData);
            // theDayData._order(order, orderBy)
            this.orderByData(theDayData, order, orderBy)
            return theDayData;
        } else {
            //获取一定时间范围数据
            let start_day_data = await this.getPreDayMonitorData(start_date) || [];
            let end_day_data = await this.getPreDayMonitorData(end_date) || [];
            let totalData = [...start_day_data, ...end_day_data];
            totalData = this.mergeInterface(totalData);
            this.orderByData(totalData, order, orderBy)
            return totalData;
        }
    }

    async getMonitorServerData(param) {
        let { start_date, end_date } = param;
        start_date = this.getDate(start_date);
        end_date = this.getDate(end_date);
        const _now = this.getDate();
        if (start_date == end_date && start_date == _now) {
            //只获取当天数据
            let theDayData = await this.getTheDayMonitorData(_now) || [];
            theDayData = this.mergeTimes(theDayData);
            return theDayData;
        } else {
            //获取一定时间范围数据
            let start_day_data = await this.getPreDayMonitorData(start_date) || [];
            let end_day_data = await this.getPreDayMonitorData(end_date) || [];
            let totalData = [...start_day_data, ...end_day_data];
            totalData = this.mergeTimes(totalData);
            return totalData;
        }
    }

    /**获取当天监控数据 */
    async getTheDayMonitorData(theday, isHole) {
        const daysData = [];
        let _hoursData = await MonitDao.getMonitorNowData();
        const nowHour = this.getHour();
        this.writeCache(theday + nowHour, _hoursData);
        console.log(`nowHour is ${nowHour}`)
        logger.info(`nowHour is ${nowHour}`)
        /**获取当天每小时的数据 */
        for (let _h of this.dayHours) {
            if (parseInt(_h) < parseInt(nowHour)) {
                let _key = theday + _h;
                let cacheData = await this.readCache(_key);
                if (cacheData) {
                    // console.log(`read data in cache`)
                    daysData.push(...cacheData)
                } else {
                    // console.log(`query data in mysql`)
                    console.log(_key)
                    let sqlData = await MonitDao.getAnyMonitorData(_key);
                    this.writeCache(_key, sqlData);
                    daysData.push(...sqlData)
                }
            }
        }
        daysData.push(..._hoursData);
        return daysData;
    }
    /**
     * 获取之前任意一天数据
     * @param {*} _day 
     */
    async getPreDayMonitorData(_day) {
        const daysData = [];
        for (let _h of this.dayHours) {
            let _key = _day + _h;
            let cacheData = await this.readCache(_key);
            if (cacheData) {
                // console.log(`read data in cache`)
                daysData.push(...cacheData)
            } else {
                // console.log(`query data in mysql`)
                // console.log(_key)
                let sqlData = await MonitDao.getAnyMonitorData(_key).catch(e => { return [] });
                this.writeCache(_key, sqlData);
                daysData.push(...sqlData)
            }
        }
        return daysData;
    }

    /**按时间合并数据 */
    mergeTimes(arr) {
        let _map = new Map();
        for (let item of arr) {
            let _key = moment(item.stattime).format('YYYY-MM-DD HH:mm:ss');
            if (_map.has(_key)) {
                let _one = _map.get(_key);
                _one['succ_count'] = _one['succ_count'] + item['succ_count'];
                _one['error_count'] = _one['error_count'] + item['error_count'];
                _one['total_time'] = _one['total_time'] + item['total_time'];
                _one['total_count'] = _one['total_count'] + item['total_count'];
                _one['exce_count'] = _one['exce_count'] + item['exce_count'];
                _one['timeout_count'] = _one['timeout_count'] + item['timeout_count']
                _one['avg_time'] = Math.ceil(_one['total_time'] / _one['succ_count'])
                _map.set(_key, _one);
            } else {
                _map.set(_key, {
                    succ_count: item.succ_count,
                    error_count: item.error_count,
                    total_count: item.total_count,
                    total_time: item.total_time,
                    exce_count: item.exce_count,
                    timeout_count: item.timeout_count,
                    avg_time: Math.ceil(item['total_time'] / item['succ_count'])
                })
            }
        }
        // console.log(_map)
        let res = [], map_keys;
        _map.forEach((value, key) => {
            res.push({
                stattime: key,
                succ_count: value['succ_count'] || 0,
                error_count: value['error_count'] || 0,
                exce_count: value['exce_count'] || 0,
                total_count: value['total_count'] || 0,
                total_time: value['total_time'] || 0,
                timeout_count: value['timeout_count'] || 0,
                avg_time: value['avg_time'] || 0
            })
        })
        // console.log(res)
        return res;
    }

    /**
     * 合并当日Top数据
     * @param {*} arr 
     */
    mergeInterface(arr) {
        let _map = new Map();
        for (let item of arr) {
            let _key = `${item.slave_name}&&${item.interface_name}`;
            if (_map.has(_key)) {
                let _one = _map.get(_key);
                _one['succ_count'] = _one['succ_count'] + item['succ_count'];
                _one['error_count'] = _one['error_count'] + item['error_count'];
                _one['total_time'] = _one['total_time'] + item['total_time'];
                _one['total_count'] = _one['total_count'] + item['total_count'];
                _one['exce_count'] = _one['exce_count'] + item['exce_count'];
                _one['timeout_count'] = _one['timeout_count'] + item['timeout_count']
                _one['avg_time'] = Math.ceil(_one['total_time'] / _one['succ_count'])
                _map.set(_key, _one);
            } else {
                _map.set(_key, {
                    succ_count: item.succ_count,
                    error_count: item.error_count,
                    total_count: item.total_count,
                    total_time: item.total_time,
                    exce_count: item.exce_count,
                    timeout_count: item.timeout_count,
                    avg_time: Math.ceil(item['total_time'] / item['succ_count'])
                })
            }
        }
        // console.log(_map)
        let res = [], map_keys;
        _map.forEach((value, key) => {
            map_keys = key.split('&&');
            res.push({
                slave_name: map_keys[0],
                interface_name: map_keys[1],
                succ_count: value['succ_count'] || 0,
                error_count: value['error_count'] || 0,
                exce_count: value['exce_count'] || 0,
                total_count: value['total_count'] || 0,
                total_time: value['total_time'] || 0,
                timeout_count: value['timeout_count'] || 0,
                avg_time: value['avg_time'] || 0
            })
        })
        // console.log(res)
        return res;
    }

    orderByData(arr, order, orderBy) {
        return order == "asc" ? arr.sort(function (a, b) {
            return a[orderBy] - b[orderBy]
        }) : arr.sort(function (a, b) {
            return b[orderBy] - a[orderBy]
        })
    }


    /**数据存入内存*/
    async writeCache(key, data) {
        if (!data || data.length == 0) {
            return;
        }
        // this._cache[key] = data;
        // let len = data.length;
        // let redisKey = await Rd._keys(key);
        // if (redisKey) {
        //     await Rd._del(redisKey).catch(e=>{})
        // }
        // for (let i = len - 1; i >= 0; i--) {
        //     if (typeof data[i] == "string") {
        //         await Rd._zadd(key, i, data[i])
        //     }
        //     if (typeof data[i] == "object") {
        //         let obj = {}
        //         for (let key in data[i]) {
        //             obj[key] = data[i][key]
        //         }
        //         await Rd._zadd(key, i, JSON.stringify(obj))
        //     }
        // }
        let str = JSON.stringify(data)
        // let buffer = Buffer.from(str, 'utf-8');
        // var base64Str = buffer.toString('base64')
        await Rd.client.set("todo_stat:" + key, str)
        // console.log(await Rd._zrangebyscore(key))
    }

    /**从内存中读取数据 */
    async readCache(key) {
        // return this._cache[key] || null;
        // let data = await Rd._zrangebyscore(key);
        // let arr=[]
        // for(let item of data){
        //     arr.push(JSON.parse(item))
        // }
        let str = await Rd._getString("todo_stat:" + key).catch(e => { return null });
        // let data = Buffer.from(str, 'base64').toString('utf-8')
        if (!str) {
            return null
        }
        return JSON.parse(str);
    }


    getDate(date) {
        return moment(date).format('YYYYMMDD')
    }

    getHour() {
        return moment().format('HH')
    }
}

module.exports = new MonitorServerService();
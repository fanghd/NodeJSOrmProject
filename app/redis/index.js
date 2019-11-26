const redis = require('redis');
const { redisConf } = require('../../config/webConf');

let Rd = {}
let myRedis = redis.createClient({
    host: redisConf.host,
    port: redisConf.port,
    password: redisConf.password
});

Rd.client = myRedis;

Rd._setString = (key, str) => {
    return new Promise((resolve, reject) => {
        myRedis.set(key, str, (err, result) => {
            return err ? reject(err) : resolve(result);
        })
    })
}

Rd._getString = (key) => {
    return new Promise((resolve, reject) => {
        myRedis.get(key, (err, result) => {
            return err ? reject(err) : resolve(result);
        })
    })
}

Rd._hmset = (key, data) => {
    return new Promise((resolve, reject) => {
        if (data) {
            for (let key in data) {
                data[key] = data[key] || ""
            }
            myRedis.hmset(key, data, (err, result) => {
                return err ? reject(err) : resolve(result);
            })
        } else {
            reject(`data is null`)
        }
    })
}

/**有序集合加入字段 */
Rd._zadd = (key, index, data) => {
    return new Promise((resolve, reject) => {
        if (data) {
            myRedis.zadd(key, index, data, (err, result) => {
                return err ? reject(err) : resolve(result);
            })
        } else {
            reject(`data is null`)
        }
    })
}

/**通过score获取成员 */
Rd._zrangebyscore = (key) => {
    return new Promise((resolve, reject) => {
        myRedis.zrangebyscore(key, 0, 99999, (err, result) => {
            return err ? reject(err) : resolve(result);
        })
    })
}

/**
 * redis数组类型数据存储
 */
Rd._lset = (key, index, data) => {
    return new Promise((resolve, reject) => {
        if (data) {
            myRedis.lset(key, index, data, (err, result) => {
                return err ? reject(err) : resolve(result);
            })
        } else {
            reject(`data is null`)
        }
    })
}

/**redis数组最前列push */
Rd._lpush = (key, data) => {
    return new Promise((resolve, reject) => {
        myRedis.lpush(key, data, (err, res) => {
            return err ? reject(err) : resolve(res)
        })
    })
}

Rd._keys = (key) => {
    return new Promise((resolve, reject) => {
        myRedis.keys(key, (err, result) => {
            return err ? reject(err) : resolve(result);
        })
    })
}

Rd._hmget = (key) => {
    return new Promise((resolve, reject) => {
        myRedis.hmget(key, (err, result) => {
            return err ? reject(err) : resolve(result);
        })
    })
}

Rd._del = (key) => {
    return new Promise((resolve, reject) => {
        myRedis.del(key, (err, result) => {
            return err ? reject(err) : resolve(result);
        })
    })
}

myRedis.select(0);
module.exports = Rd;





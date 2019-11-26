var path = require('path');

module.exports = {
    dbConf: {
        host: '127.0.0.1',       // 数据库地址
        port: '3306',            // 数据库端口
        user: 'root',            // 用户名
        dbname: 'fang',
        password: 'fang',       // 密码
        charset: 'utf8_bin',     // 数据库编码
        pool: {
            max: 10,             // 连接池中最大连接数量
            min: 0,              // 连接池中最小连接数量
            idle: 10000          // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
        }
    },
    redisConf: {
        host: '127.0.0.1',
        port: 6379
    },
    componentConf: {
        protocol: "http",
        host: "127.0.0.1",
        port: "3001"
    },
    webConf: {
        port: 3000,              //服务启动端口
        loggerPath: path.join(__dirname, '../log'),    //本地日志的目录
        logFileKeepDays: '1',         //日志保留时间
        defaultLanguage: 'cn',    //cn 或 en ，用户默认的语言环境
    },
    kafkaConf: {
        enable: false,
        kafkaHost: 'localhost:9092',
        zkHost: 'localhost:2181',
        topic: 'todoTask',
        maxCount: 100              // 后台并行处理的最大任务数
    },
    pkgUploadPath: {
        path: '/usr/local/app/patchs/todo.upload'
    },
    //防洪水攻击配置
    limitConf: {
        enableLimit: true,            //是否启用此配置
        limit: 5000,                  //限制访问的次数
        interval: 1000 * 60 * 10,     //限制的时间间隔，单位为ms，如：1小时内限制访问5000次
        whilteList: [],               //白名单IP
        blackList: []                 //黑名单IP
    }
};

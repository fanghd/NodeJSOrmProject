const axios = require('axios').default;
const { componentConf } = require('../../config/webConf')
class HttpRequest {
    static of() {
        return new HttpRequest()
    }
    constructor() {
        this.baseUrl = `${componentConf.protocol}://${componentConf.host}:${componentConf.port}`;
    }

    getReqUrl(url) {
        return this.baseUrl + url;
    }

    get(url) {
        let _url = this.getReqUrl(url);
        return axios.get(_url)
    }

    post(url, data, head, options) {
        let _url = this.getReqUrl(url);
        let _headers = {
            // Authorization: token
            'Content-Type': "application/json"
        },
            opt = {};
        _headers = Object.assign(_headers, head);
        opt = { headers: _headers };
        options && (opt = Object.assign(opt, options));
        return axios.post(_url, data, opt)
    }

    /**
     * 重启、停止服务http接口
     * @param {TaskItemReq} taskItemReq 
     */
    async addTaskReq(taskReq) {
        const _url = `/ctrl?action=addTaskReq`;
        console.log(`request args is `,taskReq)
        if (!taskReq) {
            return `params is null`
        }
        let res = await this.post(_url, taskReq);
        return res;
    }
    /**
     * 获取任务响应
     * @param {String} taskNo 
     */
    async getTaskRsp(taskNo) {
        const _url = `/ctrl?action=getTaskRsp&taskNo=${taskNo}`;
        let res = await this.get(_url);
        return res;
    }

    /**
     * 获取服务监控数据
     * @param {*} id 
     */
    async getServerMonitorData(id) {
        const _url = `/ctrl?action=findObjectById4All&id=${id}`;
        let res = await this.get(_url);
        return res;
    }

    /**
     * push配置文件http接口
     * @param {TaskItemReq} taskItemReq 
     */
    async notifyServer(args) {
        const _url = `/ctrl?action=notify`;
        if (!args) {
            return `params is null`
        }
        let res = await this.post(_url, args);
        // console.log('notifyServer res:', res)
        return res;
    }
}

const _http = HttpRequest.of();
module.exports = _http;
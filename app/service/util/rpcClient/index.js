const client  = require("../../../../todolib/rpc/protal.js").client;
const AdminRegProxy = require("./rpcProxy/AdminRegProxy");
const ConfigFProxy = require("./rpcProxy/ConfigFProxy");
const DCacheOptProxy = require("./rpcProxy/DCacheOptProxy");
const path = require('path');
const logger = require('./../../../logger');
client.initialize(path.join(__dirname, '../../../../config/todo.conf'));
const RPCClientPrx = (proxy, moduleName, interfaceName, servantName, setInfo) => {
    var module = proxy[moduleName];
    var rpcClient = client.stringToProxy(module[interfaceName+'Proxy'], servantName, setInfo);
    for(let p in rpcClient){
        if(!rpcClient.hasOwnProperty(p) && p!='getTimeout' && p!='setTimeout'){
            ((p, fun) => {
                rpcClient[p] = (function(p) {
                    let fnName = p;
                    return async function(...args){
                        try{
                            var _args = args;
                            var rst = await (async ()=>{
                                var result = await fun.apply(rpcClient, _args);
                                logger.info( 'method: ',fnName, ' request: ', _args, ' response: ', JSON.stringify(result.response));
                                var args = result.response.arguments;
                                var rst = {__return: result.response.return};
                                for(var p in args){
                                    if(typeof args[p] == 'object'){
                                        rst[p] = args[p].toObject();
                                    }else{
                                        rst[p] = args[p];
                                    }
                                }
                                return rst;
                            })();
                            return rst;
                        }catch(e){
                            console.error(e);
                            if(e.response){
                                throw new Error(e.response && e.response.error && e.response.error.message);
                            }else{
                                throw(e);
                            }
                        }
                    };
                })(p);
            })(p, rpcClient[p]);

        }
    }
    return rpcClient;
};

//生成rpc结构体
const RPCStruct = function(proxy, moduleName){
    var module = proxy[moduleName];
    var rpcStruct = {};
    for(var p in module){
        if(module.hasOwnProperty(p)){
            if(typeof module[p] == 'function'){
                if(new module[p]()._classname){
                    rpcStruct[p] = module[p];
                }
            }else{
                rpcStruct[p] = module[p];
            }
        }
    }
    return rpcStruct;
};


//输出ZEN RPC代理和组件
module.exports = {

    adminRegPrx : RPCClientPrx(AdminRegProxy, 'todo', 'AdminReg', 'todo.todoAdminRegistry.AdminRegObj'),
    adminRegStruct : RPCStruct(AdminRegProxy, 'todo'),

    configFPrx : RPCClientPrx(ConfigFProxy, 'todo', 'Config', 'todo.todoconfig.ConfigObj'),
    configFStruct : RPCStruct(ConfigFProxy, 'todo'),

    DCacheOptPrx: RPCClientPrx(DCacheOptProxy, 'DCache', 'DCacheOpt', 'DCache.DCacheOptServer.DCacheOptObj'),
    DCacheOptStruct: RPCStruct(DCacheOptProxy, 'DCache'),

    client: client
};

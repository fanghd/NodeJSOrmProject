"use strict";

var assert = require("assert");
var TodoStream = require("../../../../../todolib/stream/todo");
var TodoError = require("../../../../../todolib/rpc/protal").error;

var todo = todo || {};
module.exports.todo = todo;

todo.ConfigProxy = function () {
    this._name = undefined;
    this._worker = undefined;
};

todo.ConfigProxy.prototype.setTimeout = function (iTimeout) {
    this._worker.timeout = iTimeout;
};

todo.ConfigProxy.prototype.getTimeout = function () {
    return this._worker.timeout;
};


todo.ConfigInfo = function () {
    this.appname = "";
    this.servername = "";
    this.filename = "";
    this.bAppOnly = false;
    this.host = "";
    this.setdivision = "";
    this._classname = "todo.ConfigInfo";
};
todo.ConfigInfo._classname = "todo.ConfigInfo";
todo.ConfigInfo._write = function (os, tag, value) { os.writeStruct(tag, value); };
todo.ConfigInfo._read = function (is, tag, def) { return is.readStruct(tag, true, def); };
todo.ConfigInfo._readFrom = function (is) {
    var tmp = new todo.ConfigInfo();
    tmp.appname = is.readString(0, true, "");
    tmp.servername = is.readString(1, true, "");
    tmp.filename = is.readString(2, true, "");
    tmp.bAppOnly = is.readBoolean(3, true, false);
    tmp.host = is.readString(4, false, "");
    tmp.setdivision = is.readString(5, false, "");
    return tmp;
};
todo.ConfigInfo.prototype._writeTo = function (os) {
    os.writeString(0, this.appname);
    os.writeString(1, this.servername);
    os.writeString(2, this.filename);
    os.writeBoolean(3, this.bAppOnly);
    os.writeString(4, this.host);
    os.writeString(5, this.setdivision);
};
todo.ConfigInfo.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
todo.ConfigInfo.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
todo.ConfigInfo.prototype.toObject = function () {
    return {
        "appname": this.appname,
        "servername": this.servername,
        "filename": this.filename,
        "bAppOnly": this.bAppOnly,
        "host": this.host,
        "setdivision": this.setdivision
    };
};
todo.ConfigInfo.prototype.readFromObject = function (json) {
    json.hasOwnProperty("appname") && (this.appname = json.appname);
    json.hasOwnProperty("servername") && (this.servername = json.servername);
    json.hasOwnProperty("filename") && (this.filename = json.filename);
    json.hasOwnProperty("bAppOnly") && (this.bAppOnly = json.bAppOnly);
    json.hasOwnProperty("host") && (this.host = json.host);
    json.hasOwnProperty("setdivision") && (this.setdivision = json.setdivision);
};
todo.ConfigInfo.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
todo.ConfigInfo.new = function () {
    return new todo.ConfigInfo();
};
todo.ConfigInfo.create = function (is) {
    return todo.ConfigInfo._readFrom(is);
};

todo.GetConfigListInfo = function () {
    this.appname = "";
    this.servername = "";
    this.bAppOnly = false;
    this.host = "";
    this.setdivision = "";
    this.containername = "";
    this._classname = "todo.GetConfigListInfo";
};
todo.GetConfigListInfo._classname = "todo.GetConfigListInfo";
todo.GetConfigListInfo._write = function (os, tag, value) { os.writeStruct(tag, value); };
todo.GetConfigListInfo._read = function (is, tag, def) { return is.readStruct(tag, true, def); };
todo.GetConfigListInfo._readFrom = function (is) {
    var tmp = new todo.GetConfigListInfo();
    tmp.appname = is.readString(0, true, "");
    tmp.servername = is.readString(1, false, "");
    tmp.bAppOnly = is.readBoolean(2, false, false);
    tmp.host = is.readString(3, false, "");
    tmp.setdivision = is.readString(4, false, "");
    tmp.containername = is.readString(5, false, "");
    return tmp;
};
todo.GetConfigListInfo.prototype._writeTo = function (os) {
    os.writeString(0, this.appname);
    os.writeString(1, this.servername);
    os.writeBoolean(2, this.bAppOnly);
    os.writeString(3, this.host);
    os.writeString(4, this.setdivision);
    os.writeString(5, this.containername);
};
todo.GetConfigListInfo.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
todo.GetConfigListInfo.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
todo.GetConfigListInfo.prototype.toObject = function () {
    return {
        "appname": this.appname,
        "servername": this.servername,
        "bAppOnly": this.bAppOnly,
        "host": this.host,
        "setdivision": this.setdivision,
        "containername": this.containername
    };
};
todo.GetConfigListInfo.prototype.readFromObject = function (json) {
    json.hasOwnProperty("appname") && (this.appname = json.appname);
    json.hasOwnProperty("servername") && (this.servername = json.servername);
    json.hasOwnProperty("bAppOnly") && (this.bAppOnly = json.bAppOnly);
    json.hasOwnProperty("host") && (this.host = json.host);
    json.hasOwnProperty("setdivision") && (this.setdivision = json.setdivision);
    json.hasOwnProperty("containername") && (this.containername = json.containername);
};
todo.GetConfigListInfo.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
todo.GetConfigListInfo.new = function () {
    return new todo.GetConfigListInfo();
};
todo.GetConfigListInfo.create = function (is) {
    return todo.GetConfigListInfo._readFrom(is);
};


var __todo_Config$ListConfig$EN = function (app, server) {
    var os = new TodoStream.TodoOutputStream();
    os.writeString(1, app);
    os.writeString(2, server);
    return os.getBinBuffer();
};

var __todo_Config$ListConfig$DE = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request": data.request,
            "response": {
                "costtime": data.request.costtime,
                "return": is.readInt32(0, true, 0),
                "arguments": {
                    "vf": is.readList(3, true, TodoStream.List(TodoStream.String))
                }
            }
        };
    } catch (e) {
        throw {
            "request": data.request,
            "response": {
                "costtime": data.request.costtime,
                "error": {
                    "code": TodoError.CLIENT.DECODE_ERROR,
                    "message": e.message
                }
            }
        };
    }
};

var __todo_Config$ListConfig$ER = function (data) {
    throw {
        "request": data.request,
        "response": {
            "costtime": data.request.costtime,
            "error": data.error
        }
    }
};

todo.ConfigProxy.prototype.ListConfig = function (app, server) {
    return this._worker.todo_invoke("ListConfig", __todo_Config$ListConfig$EN(app, server), arguments[arguments.length - 1]).then(__todo_Config$ListConfig$DE, __todo_Config$ListConfig$ER);
};

var __todo_Config$ListConfigByInfo$EN = function (configInfo) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, configInfo);
    return os.getBinBuffer();
};

var __todo_Config$ListConfigByInfo$DE = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request": data.request,
            "response": {
                "costtime": data.request.costtime,
                "return": is.readInt32(0, true, 0),
                "arguments": {
                    "vf": is.readList(2, true, TodoStream.List(TodoStream.String))
                }
            }
        };
    } catch (e) {
        throw {
            "request": data.request,
            "response": {
                "costtime": data.request.costtime,
                "error": {
                    "code": TodoError.CLIENT.DECODE_ERROR,
                    "message": e.message
                }
            }
        };
    }
};

var __todo_Config$ListConfigByInfo$ER = function (data) {
    throw {
        "request": data.request,
        "response": {
            "costtime": data.request.costtime,
            "error": data.error
        }
    }
};

todo.ConfigProxy.prototype.ListConfigByInfo = function (configInfo) {
    return this._worker.todo_invoke("ListConfigByInfo", __todo_Config$ListConfigByInfo$EN(configInfo), arguments[arguments.length - 1]).then(__todo_Config$ListConfigByInfo$DE, __todo_Config$ListConfigByInfo$ER);
};

var __todo_Config$checkConfig$EN = function (appServerName, filename, host) {
    var os = new TodoStream.TodoOutputStream();
    os.writeString(1, appServerName);
    os.writeString(2, filename);
    os.writeString(3, host);
    return os.getBinBuffer();
};

var __todo_Config$checkConfig$DE = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request": data.request,
            "response": {
                "costtime": data.request.costtime,
                "return": is.readInt32(0, true, 0),
                "arguments": {
                    "result": is.readString(4, true, "")
                }
            }
        };
    } catch (e) {
        throw {
            "request": data.request,
            "response": {
                "costtime": data.request.costtime,
                "error": {
                    "code": TodoError.CLIENT.DECODE_ERROR,
                    "message": e.message
                }
            }
        };
    }
};

var __todo_Config$checkConfig$ER = function (data) {
    throw {
        "request": data.request,
        "response": {
            "costtime": data.request.costtime,
            "error": data.error
        }
    }
};

todo.ConfigProxy.prototype.checkConfig = function (appServerName, filename, host) {
    return this._worker.todo_invoke("checkConfig", __todo_Config$checkConfig$EN(appServerName, filename, host), arguments[arguments.length - 1]).then(__todo_Config$checkConfig$DE, __todo_Config$checkConfig$ER);
};

var __todo_Config$checkConfigByInfo$EN = function (configInfo) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, configInfo);
    return os.getBinBuffer();
};

var __todo_Config$checkConfigByInfo$DE = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request": data.request,
            "response": {
                "costtime": data.request.costtime,
                "return": is.readInt32(0, true, 0),
                "arguments": {
                    "result": is.readString(2, true, "")
                }
            }
        };
    } catch (e) {
        throw {
            "request": data.request,
            "response": {
                "costtime": data.request.costtime,
                "error": {
                    "code": TodoError.CLIENT.DECODE_ERROR,
                    "message": e.message
                }
            }
        };
    }
};

var __todo_Config$checkConfigByInfo$ER = function (data) {
    throw {
        "request": data.request,
        "response": {
            "costtime": data.request.costtime,
            "error": data.error
        }
    }
};

todo.ConfigProxy.prototype.checkConfigByInfo = function (configInfo) {
    return this._worker.todo_invoke("checkConfigByInfo", __todo_Config$checkConfigByInfo$EN(configInfo), arguments[arguments.length - 1]).then(__todo_Config$checkConfigByInfo$DE, __todo_Config$checkConfigByInfo$ER);
};

var __todo_Config$loadConfig$EN = function (app, server, filename) {
    var os = new TodoStream.TodoOutputStream();
    os.writeString(1, app);
    os.writeString(2, server);
    os.writeString(3, filename);
    return os.getBinBuffer();
};

var __todo_Config$loadConfig$DE = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request": data.request,
            "response": {
                "costtime": data.request.costtime,
                "return": is.readInt32(0, true, 0),
                "arguments": {
                    "config": is.readString(4, true, "")
                }
            }
        };
    } catch (e) {
        throw {
            "request": data.request,
            "response": {
                "costtime": data.request.costtime,
                "error": {
                    "code": TodoError.CLIENT.DECODE_ERROR,
                    "message": e.message
                }
            }
        };
    }
};

var __todo_Config$loadConfig$ER = function (data) {
    throw {
        "request": data.request,
        "response": {
            "costtime": data.request.costtime,
            "error": data.error
        }
    }
};

todo.ConfigProxy.prototype.loadConfig = function (app, server, filename) {
    return this._worker.todo_invoke("loadConfig", __todo_Config$loadConfig$EN(app, server, filename), arguments[arguments.length - 1]).then(__todo_Config$loadConfig$DE, __todo_Config$loadConfig$ER);
};

var __todo_Config$loadConfigByHost$EN = function (appServerName, filename, host) {
    var os = new TodoStream.TodoOutputStream();
    os.writeString(1, appServerName);
    os.writeString(2, filename);
    os.writeString(3, host);
    return os.getBinBuffer();
};

var __todo_Config$loadConfigByHost$DE = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request": data.request,
            "response": {
                "costtime": data.request.costtime,
                "return": is.readInt32(0, true, 0),
                "arguments": {
                    "config": is.readString(4, true, "")
                }
            }
        };
    } catch (e) {
        throw {
            "request": data.request,
            "response": {
                "costtime": data.request.costtime,
                "error": {
                    "code": TodoError.CLIENT.DECODE_ERROR,
                    "message": e.message
                }
            }
        };
    }
};

var __todo_Config$loadConfigByHost$ER = function (data) {
    throw {
        "request": data.request,
        "response": {
            "costtime": data.request.costtime,
            "error": data.error
        }
    }
};

todo.ConfigProxy.prototype.loadConfigByHost = function (appServerName, filename, host) {
    return this._worker.todo_invoke("loadConfigByHost", __todo_Config$loadConfigByHost$EN(appServerName, filename, host), arguments[arguments.length - 1]).then(__todo_Config$loadConfigByHost$DE, __todo_Config$loadConfigByHost$ER);
};

var __todo_Config$loadConfigByInfo$EN = function (configInfo) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, configInfo);
    return os.getBinBuffer();
};

var __todo_Config$loadConfigByInfo$DE = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request": data.request,
            "response": {
                "costtime": data.request.costtime,
                "return": is.readInt32(0, true, 0),
                "arguments": {
                    "config": is.readString(2, true, "")
                }
            }
        };
    } catch (e) {
        throw {
            "request": data.request,
            "response": {
                "costtime": data.request.costtime,
                "error": {
                    "code": TodoError.CLIENT.DECODE_ERROR,
                    "message": e.message
                }
            }
        };
    }
};

var __todo_Config$loadConfigByInfo$ER = function (data) {
    throw {
        "request": data.request,
        "response": {
            "costtime": data.request.costtime,
            "error": data.error
        }
    }
};

todo.ConfigProxy.prototype.loadConfigByInfo = function (configInfo) {
    return this._worker.todo_invoke("loadConfigByInfo", __todo_Config$loadConfigByInfo$EN(configInfo), arguments[arguments.length - 1]).then(__todo_Config$loadConfigByInfo$DE, __todo_Config$loadConfigByInfo$ER);
};




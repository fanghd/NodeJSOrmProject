"use strict";

var assert = require("assert");
var TodoStream = require("../../../../../todolib/stream/todo");
var TodoError = require("../../../../../todolib/rpc/protal").error;
var _ZEN_MODULE_A_ = require("./NodeDescriptorTodo.js");

var todo = todo || {};
module.exports.todo = todo;

todo.AdminRegProxy = function () {
    this._name = undefined;
    this._worker = undefined;
};

todo.AdminRegProxy.prototype.setTimeout = function (iTimeout) {
    this._worker.timeout = iTimeout;
};

todo.AdminRegProxy.prototype.getTimeout = function () {
    return this._worker.timeout;
};


todo.todoErrCode = {
    "EM_ZEN_NODE_NOT_REGISTRY_ERR": 1001,
    "EM_ZEN_CALL_NODE_TIMEOUT_ERR": 1002,
    "EM_ZEN_LOAD_SERVICE_DESC_ERR": 1003,
    "EM_ZEN_SERVICE_STATE_ERR": 1004,
    "EM_ZEN_REQ_ALREADY_ERR": 1005,
    "EM_ZEN_INVALID_IP_ERR": 1006,
    "EM_ZEN_PARAMETER_ERR": 1007,
    "EM_ZEN_OTHER_ERR": 1008,
    "EM_ZEN_GET_PATCH_FILE_ERR": 1009,
    "EM_ZEN_PREPARE_ERR": 1010,
    "EM_ZEN_UNKNOWN_ERR": -1,
    "EM_ZEN_SUCCESS": 0,
    "_classname": "todo.todoErrCode"
};
todo.todoErrCode._write = function (os, tag, val) { return os.writeInt32(tag, val); };
todo.todoErrCode._read = function (is, tag, def) { return is.readInt32(tag, true, def); };
todo.EMTaskCommand = {
    "EM_CMD_START": 0,
    "EM_CMD_STOP": 1,
    "EM_CMD_PATCH": 2,
    "EM_CMD_UNINSTALL": 3,
    "_classname": "todo.EMTaskCommand"
};
todo.EMTaskCommand._write = function (os, tag, val) { return os.writeInt32(tag, val); };
todo.EMTaskCommand._read = function (is, tag, def) { return is.readInt32(tag, true, def); };
todo.EMTaskStatus = {
    "EM_T_NOT_START": 0,
    "EM_T_RUNNING": 1,
    "EM_T_SUCCESS": 2,
    "EM_T_FAILED": 3,
    "EM_T_CANCEL": 4,
    "EM_T_PARIAL": 5,
    "_classname": "todo.EMTaskStatus"
};
todo.EMTaskStatus._write = function (os, tag, val) { return os.writeInt32(tag, val); };
todo.EMTaskStatus._read = function (is, tag, def) { return is.readInt32(tag, true, def); };
todo.EMTaskItemStatus = {
    "EM_I_NOT_START": 0,
    "EM_I_RUNNING": 1,
    "EM_I_SUCCESS": 2,
    "EM_I_FAILED": 3,
    "EM_I_CANCEL": 4,
    "_classname": "todo.EMTaskItemStatus"
};
todo.EMTaskItemStatus._write = function (os, tag, val) { return os.writeInt32(tag, val); };
todo.EMTaskItemStatus._read = function (is, tag, def) { return is.readInt32(tag, true, def); };

todo.ServerStateDesc = function () {
    this.settingStateInReg = "";
    this.presentStateInReg = "";
    this.presentStateInNode = "";
    this.processId = 0;
    this.patchVersion = "";
    this.patchTime = "";
    this.patchUser = "";
    this._classname = "todo.ServerStateDesc";
};
todo.ServerStateDesc._classname = "todo.ServerStateDesc";
todo.ServerStateDesc._write = function (os, tag, value) { os.writeStruct(tag, value); };
todo.ServerStateDesc._read = function (is, tag, def) { return is.readStruct(tag, true, def); };
todo.ServerStateDesc._readFrom = function (is) {
    var tmp = new todo.ServerStateDesc();
    tmp.settingStateInReg = is.readString(0, true, "");
    tmp.presentStateInReg = is.readString(1, true, "");
    tmp.presentStateInNode = is.readString(2, true, "");
    tmp.processId = is.readInt32(3, true, 0);
    tmp.patchVersion = is.readString(4, true, "");
    tmp.patchTime = is.readString(5, true, "");
    tmp.patchUser = is.readString(6, true, "");
    return tmp;
};
todo.ServerStateDesc.prototype._writeTo = function (os) {
    os.writeString(0, this.settingStateInReg);
    os.writeString(1, this.presentStateInReg);
    os.writeString(2, this.presentStateInNode);
    os.writeInt32(3, this.processId);
    os.writeString(4, this.patchVersion);
    os.writeString(5, this.patchTime);
    os.writeString(6, this.patchUser);
};
todo.ServerStateDesc.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
todo.ServerStateDesc.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
todo.ServerStateDesc.prototype.toObject = function () {
    return {
        "settingStateInReg": this.settingStateInReg,
        "presentStateInReg": this.presentStateInReg,
        "presentStateInNode": this.presentStateInNode,
        "processId": this.processId,
        "patchVersion": this.patchVersion,
        "patchTime": this.patchTime,
        "patchUser": this.patchUser
    };
};
todo.ServerStateDesc.prototype.readFromObject = function (json) {
    json.hasOwnProperty("settingStateInReg") && (this.settingStateInReg = json.settingStateInReg);
    json.hasOwnProperty("presentStateInReg") && (this.presentStateInReg = json.presentStateInReg);
    json.hasOwnProperty("presentStateInNode") && (this.presentStateInNode = json.presentStateInNode);
    json.hasOwnProperty("processId") && (this.processId = json.processId);
    json.hasOwnProperty("patchVersion") && (this.patchVersion = json.patchVersion);
    json.hasOwnProperty("patchTime") && (this.patchTime = json.patchTime);
    json.hasOwnProperty("patchUser") && (this.patchUser = json.patchUser);
};
todo.ServerStateDesc.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
todo.ServerStateDesc.new = function () {
    return new todo.ServerStateDesc();
};
todo.ServerStateDesc.create = function (is) {
    return todo.ServerStateDesc._readFrom(is);
};

todo.TaskItemReq = function () {
    this.taskNo = "";
    this.itemNo = "";
    this.application = "";
    this.serverName = "";
    this.nodeName = "";
    this.setName = "";
    this.command = "";
    this.userName = "";
    this.parameters = new TodoStream.Map(TodoStream.String, TodoStream.String);
    this._classname = "todo.TaskItemReq";
};
todo.TaskItemReq._classname = "todo.TaskItemReq";
todo.TaskItemReq._write = function (os, tag, value) { os.writeStruct(tag, value); };
todo.TaskItemReq._read = function (is, tag, def) { return is.readStruct(tag, true, def); };
todo.TaskItemReq._readFrom = function (is) {
    var tmp = new todo.TaskItemReq();
    tmp.taskNo = is.readString(0, false, "");
    tmp.itemNo = is.readString(1, false, "");
    tmp.application = is.readString(2, false, "");
    tmp.serverName = is.readString(3, false, "");
    tmp.nodeName = is.readString(4, false, "");
    tmp.setName = is.readString(5, false, "");
    tmp.command = is.readString(6, false, "");
    tmp.userName = is.readString(7, false, "");
    tmp.parameters = is.readMap(8, false, TodoStream.Map(TodoStream.String, TodoStream.String));
    return tmp;
};
todo.TaskItemReq.prototype._writeTo = function (os) {
    os.writeString(0, this.taskNo);
    os.writeString(1, this.itemNo);
    os.writeString(2, this.application);
    os.writeString(3, this.serverName);
    os.writeString(4, this.nodeName);
    os.writeString(5, this.setName);
    os.writeString(6, this.command);
    os.writeString(7, this.userName);
    os.writeMap(8, this.parameters);
};
todo.TaskItemReq.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
todo.TaskItemReq.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
todo.TaskItemReq.prototype.toObject = function () {
    return {
        "taskNo": this.taskNo,
        "itemNo": this.itemNo,
        "application": this.application,
        "serverName": this.serverName,
        "nodeName": this.nodeName,
        "setName": this.setName,
        "command": this.command,
        "userName": this.userName,
        "parameters": this.parameters.toObject()
    };
};
todo.TaskItemReq.prototype.readFromObject = function (json) {
    json.hasOwnProperty("taskNo") && (this.taskNo = json.taskNo);
    json.hasOwnProperty("itemNo") && (this.itemNo = json.itemNo);
    json.hasOwnProperty("application") && (this.application = json.application);
    json.hasOwnProperty("serverName") && (this.serverName = json.serverName);
    json.hasOwnProperty("nodeName") && (this.nodeName = json.nodeName);
    json.hasOwnProperty("setName") && (this.setName = json.setName);
    json.hasOwnProperty("command") && (this.command = json.command);
    json.hasOwnProperty("userName") && (this.userName = json.userName);
    json.hasOwnProperty("parameters") && (this.parameters.readFromObject(json.parameters));
};
todo.TaskItemReq.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
todo.TaskItemReq.new = function () {
    return new todo.TaskItemReq();
};
todo.TaskItemReq.create = function (is) {
    return todo.TaskItemReq._readFrom(is);
};

todo.TaskItemRsp = function () {
    this.req = new todo.TaskItemReq;
    this.startTime = "";
    this.endTime = "";
    this.status = todo.EMTaskItemStatus.EM_I_NOT_START;
    this.statusInfo = "";
    this.executeLog = "";
    this._classname = "todo.TaskItemRsp";
};
todo.TaskItemRsp._classname = "todo.TaskItemRsp";
todo.TaskItemRsp._write = function (os, tag, value) { os.writeStruct(tag, value); };
todo.TaskItemRsp._read = function (is, tag, def) { return is.readStruct(tag, true, def); };
todo.TaskItemRsp._readFrom = function (is) {
    var tmp = new todo.TaskItemRsp();
    tmp.req = is.readStruct(0, false, todo.TaskItemReq);
    tmp.startTime = is.readString(1, false, "");
    tmp.endTime = is.readString(2, false, "");
    tmp.status = is.readInt32(3, false, todo.EMTaskItemStatus.EM_I_NOT_START);
    tmp.statusInfo = is.readString(4, false, "");
    tmp.executeLog = is.readString(5, false, "");
    return tmp;
};
todo.TaskItemRsp.prototype._writeTo = function (os) {
    os.writeStruct(0, this.req);
    os.writeString(1, this.startTime);
    os.writeString(2, this.endTime);
    os.writeInt32(3, this.status);
    os.writeString(4, this.statusInfo);
    os.writeString(5, this.executeLog);
};
todo.TaskItemRsp.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
todo.TaskItemRsp.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
todo.TaskItemRsp.prototype.toObject = function () {
    return {
        "req": this.req.toObject(),
        "startTime": this.startTime,
        "endTime": this.endTime,
        "status": this.status,
        "statusInfo": this.statusInfo,
        "executeLog": this.executeLog
    };
};
todo.TaskItemRsp.prototype.readFromObject = function (json) {
    json.hasOwnProperty("req") && (this.req.readFromObject(json.req));
    json.hasOwnProperty("startTime") && (this.startTime = json.startTime);
    json.hasOwnProperty("endTime") && (this.endTime = json.endTime);
    json.hasOwnProperty("status") && (this.status = json.status);
    json.hasOwnProperty("statusInfo") && (this.statusInfo = json.statusInfo);
    json.hasOwnProperty("executeLog") && (this.executeLog = json.executeLog);
};
todo.TaskItemRsp.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
todo.TaskItemRsp.new = function () {
    return new todo.TaskItemRsp();
};
todo.TaskItemRsp.create = function (is) {
    return todo.TaskItemRsp._readFrom(is);
};

todo.TaskReq = function () {
    this.taskItemReq = new TodoStream.List(todo.TaskItemReq);
    this.taskNo = "";
    this.serial = true;
    this.userName = "";
    this._classname = "todo.TaskReq";
};
todo.TaskReq._classname = "todo.TaskReq";
todo.TaskReq._write = function (os, tag, value) { os.writeStruct(tag, value); };
todo.TaskReq._read = function (is, tag, def) { return is.readStruct(tag, true, def); };
todo.TaskReq._readFrom = function (is) {
    var tmp = new todo.TaskReq();
    tmp.taskItemReq = is.readList(0, false, TodoStream.List(todo.TaskItemReq));
    tmp.taskNo = is.readString(1, false, "");
    tmp.serial = is.readBoolean(2, false, true);
    tmp.userName = is.readString(3, false, "");
    return tmp;
};
todo.TaskReq.prototype._writeTo = function (os) {
    os.writeList(0, this.taskItemReq);
    os.writeString(1, this.taskNo);
    os.writeBoolean(2, this.serial);
    os.writeString(3, this.userName);
};
todo.TaskReq.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
todo.TaskReq.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
todo.TaskReq.prototype.toObject = function () {
    return {
        "taskItemReq": this.taskItemReq.toObject(),
        "taskNo": this.taskNo,
        "serial": this.serial,
        "userName": this.userName
    };
};
todo.TaskReq.prototype.readFromObject = function (json) {
    json.hasOwnProperty("taskItemReq") && (this.taskItemReq.readFromObject(json.taskItemReq));
    json.hasOwnProperty("taskNo") && (this.taskNo = json.taskNo);
    json.hasOwnProperty("serial") && (this.serial = json.serial);
    json.hasOwnProperty("userName") && (this.userName = json.userName);
};
todo.TaskReq.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
todo.TaskReq.new = function () {
    return new todo.TaskReq();
};
todo.TaskReq.create = function (is) {
    return todo.TaskReq._readFrom(is);
};

todo.TaskRsp = function () {
    this.taskItemRsp = new TodoStream.List(todo.TaskItemRsp);
    this.taskNo = "";
    this.serial = true;
    this.userName = "";
    this.status = todo.EMTaskStatus.EM_T_NOT_START;
    this._classname = "todo.TaskRsp";
};
todo.TaskRsp._classname = "todo.TaskRsp";
todo.TaskRsp._write = function (os, tag, value) { os.writeStruct(tag, value); };
todo.TaskRsp._read = function (is, tag, def) { return is.readStruct(tag, true, def); };
todo.TaskRsp._readFrom = function (is) {
    var tmp = new todo.TaskRsp();
    tmp.taskItemRsp = is.readList(0, false, TodoStream.List(todo.TaskItemRsp));
    tmp.taskNo = is.readString(1, false, "");
    tmp.serial = is.readBoolean(2, false, true);
    tmp.userName = is.readString(3, false, "");
    tmp.status = is.readInt32(4, false, todo.EMTaskStatus.EM_T_NOT_START);
    return tmp;
};
todo.TaskRsp.prototype._writeTo = function (os) {
    os.writeList(0, this.taskItemRsp);
    os.writeString(1, this.taskNo);
    os.writeBoolean(2, this.serial);
    os.writeString(3, this.userName);
    os.writeInt32(4, this.status);
};
todo.TaskRsp.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
todo.TaskRsp.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
todo.TaskRsp.prototype.toObject = function () {
    return {
        "taskItemRsp": this.taskItemRsp.toObject(),
        "taskNo": this.taskNo,
        "serial": this.serial,
        "userName": this.userName,
        "status": this.status
    };
};
todo.TaskRsp.prototype.readFromObject = function (json) {
    json.hasOwnProperty("taskItemRsp") && (this.taskItemRsp.readFromObject(json.taskItemRsp));
    json.hasOwnProperty("taskNo") && (this.taskNo = json.taskNo);
    json.hasOwnProperty("serial") && (this.serial = json.serial);
    json.hasOwnProperty("userName") && (this.userName = json.userName);
    json.hasOwnProperty("status") && (this.status = json.status);
};
todo.TaskRsp.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
todo.TaskRsp.new = function () {
    return new todo.TaskRsp();
};
todo.TaskRsp.create = function (is) {
    return todo.TaskRsp._readFrom(is);
};


var __todo_AdminReg$addTaskReq$EN = function (taskReq) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, taskReq);
    // os.writeUInt16(1, taskReq);
    return os.getBinBuffer();
};

var __todo_AdminReg$addTaskReq$DE = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request": data.request,
            "response": {
                "costtime": data.request.costtime,
                "return": is.readInt32(0, true, 0)
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

var __todo_AdminReg$addTaskReq$ER = function (data) {
    throw {
        "request": data.request,
        "response": {
            "costtime": data.request.costtime,
            "error": data.error
        }
    }
};

todo.AdminRegProxy.prototype.addTaskReq = function (taskReq) {
    return this._worker.todo_invoke("addTaskReq", __todo_AdminReg$addTaskReq$EN(taskReq), arguments[arguments.length - 1])
    .then(__todo_AdminReg$addTaskReq$DE, __todo_AdminReg$addTaskReq$ER);
};

var __todo_AdminReg$batchPatch$EN = function (req) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, req);
    return os.getBinBuffer();
};

var __todo_AdminReg$batchPatch$DE = function (data) {
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

var __todo_AdminReg$batchPatch$ER = function (data) {
    throw {
        "request": data.request,
        "response": {
            "costtime": data.request.costtime,
            "error": data.error
        }
    }
};

todo.AdminRegProxy.prototype.batchPatch = function (req) {
    return this._worker.todo_invoke("batchPatch", __todo_AdminReg$batchPatch$EN(req), arguments[arguments.length - 1]).then(__todo_AdminReg$batchPatch$DE, __todo_AdminReg$batchPatch$ER);
};

var __todo_AdminReg$getAllApplicationNames$EN = function () {
    var os = new TodoStream.TodoOutputStream();
    return os.getBinBuffer();
};

var __todo_AdminReg$getAllApplicationNames$DE = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request": data.request,
            "response": {
                "costtime": data.request.costtime,
                "return": is.readList(0, true, TodoStream.List(TodoStream.String)),
                "arguments": {
                    "result": is.readString(1, true, "")
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

var __todo_AdminReg$getAllApplicationNames$ER = function (data) {
    throw {
        "request": data.request,
        "response": {
            "costtime": data.request.costtime,
            "error": data.error
        }
    }
};

todo.AdminRegProxy.prototype.getAllApplicationNames = function () {
    return this._worker.todo_invoke("getAllApplicationNames", __todo_AdminReg$getAllApplicationNames$EN(), arguments[arguments.length - 1]).then(__todo_AdminReg$getAllApplicationNames$DE, __todo_AdminReg$getAllApplicationNames$ER);
};

var __todo_AdminReg$getAllNodeNames$EN = function () {
    var os = new TodoStream.TodoOutputStream();
    return os.getBinBuffer();
};

var __todo_AdminReg$getAllNodeNames$DE = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request": data.request,
            "response": {
                "costtime": data.request.costtime,
                "return": is.readList(0, true, TodoStream.List(TodoStream.String)),
                "arguments": {
                    "result": is.readString(1, true, "")
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

var __todo_AdminReg$getAllNodeNames$ER = function (data) {
    throw {
        "request": data.request,
        "response": {
            "costtime": data.request.costtime,
            "error": data.error
        }
    }
};

todo.AdminRegProxy.prototype.getAllNodeNames = function () {
    return this._worker.todo_invoke("getAllNodeNames", __todo_AdminReg$getAllNodeNames$EN(), arguments[arguments.length - 1]).then(__todo_AdminReg$getAllNodeNames$DE, __todo_AdminReg$getAllNodeNames$ER);
};

var __todo_AdminReg$getAllServerIds$EN = function () {
    var os = new TodoStream.TodoOutputStream();
    return os.getBinBuffer();
};

var __todo_AdminReg$getAllServerIds$DE = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request": data.request,
            "response": {
                "costtime": data.request.costtime,
                "return": is.readList(0, true, TodoStream.List(TodoStream.List(TodoStream.String))),
                "arguments": {
                    "result": is.readString(1, true, "")
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

var __todo_AdminReg$getAllServerIds$ER = function (data) {
    throw {
        "request": data.request,
        "response": {
            "costtime": data.request.costtime,
            "error": data.error
        }
    }
};

todo.AdminRegProxy.prototype.getAllServerIds = function () {
    return this._worker.todo_invoke("getAllServerIds", __todo_AdminReg$getAllServerIds$EN(), arguments[arguments.length - 1]).then(__todo_AdminReg$getAllServerIds$DE, __todo_AdminReg$getAllServerIds$ER);
};

var __todo_AdminReg$getClientIp$EN = function () {
    var os = new TodoStream.TodoOutputStream();
    return os.getBinBuffer();
};

var __todo_AdminReg$getClientIp$DE = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request": data.request,
            "response": {
                "costtime": data.request.costtime,
                "return": is.readInt32(0, true, 0),
                "arguments": {
                    "sClientIp": is.readString(1, true, "")
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

var __todo_AdminReg$getClientIp$ER = function (data) {
    throw {
        "request": data.request,
        "response": {
            "costtime": data.request.costtime,
            "error": data.error
        }
    }
};

todo.AdminRegProxy.prototype.getClientIp = function () {
    return this._worker.todo_invoke("getClientIp", __todo_AdminReg$getClientIp$EN(), arguments[arguments.length - 1]).then(__todo_AdminReg$getClientIp$DE, __todo_AdminReg$getClientIp$ER);
};

var __todo_AdminReg$getGroupId$EN = function (ip) {
    var os = new TodoStream.TodoOutputStream();
    os.writeString(1, ip);
    return os.getBinBuffer();
};

var __todo_AdminReg$getGroupId$DE = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request": data.request,
            "response": {
                "costtime": data.request.costtime,
                "return": is.readInt32(0, true, 0),
                "arguments": {
                    "groupId": is.readInt32(2, true, 0),
                    "result": is.readString(3, true, "")
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

var __todo_AdminReg$getGroupId$ER = function (data) {
    throw {
        "request": data.request,
        "response": {
            "costtime": data.request.costtime,
            "error": data.error
        }
    }
};

todo.AdminRegProxy.prototype.getGroupId = function (ip) {
    return this._worker.todo_invoke("getGroupId", __todo_AdminReg$getGroupId$EN(ip), arguments[arguments.length - 1]).then(__todo_AdminReg$getGroupId$DE, __todo_AdminReg$getGroupId$ER);
};

var __todo_AdminReg$getNodeVesion$EN = function (name) {
    var os = new TodoStream.TodoOutputStream();
    os.writeString(1, name);
    return os.getBinBuffer();
};

var __todo_AdminReg$getNodeVesion$DE = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request": data.request,
            "response": {
                "costtime": data.request.costtime,
                "return": is.readInt32(0, true, 0),
                "arguments": {
                    "version": is.readString(2, true, ""),
                    "result": is.readString(3, true, "")
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

var __todo_AdminReg$getNodeVesion$ER = function (data) {
    throw {
        "request": data.request,
        "response": {
            "costtime": data.request.costtime,
            "error": data.error
        }
    }
};

todo.AdminRegProxy.prototype.getNodeVesion = function (name) {
    return this._worker.todo_invoke("getNodeVesion", __todo_AdminReg$getNodeVesion$EN(name), arguments[arguments.length - 1]).then(__todo_AdminReg$getNodeVesion$DE, __todo_AdminReg$getNodeVesion$ER);
};

var __todo_AdminReg$getPatchPercent$EN = function (application, serverName, nodeName) {
    var os = new TodoStream.TodoOutputStream();
    os.writeString(1, application);
    os.writeString(2, serverName);
    os.writeString(3, nodeName);
    return os.getBinBuffer();
};

var __todo_AdminReg$getPatchPercent$DE = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request": data.request,
            "response": {
                "costtime": data.request.costtime,
                "return": is.readInt32(0, true, 0),
                "arguments": {
                    "tPatchInfo": is.readStruct(4, true, _ZEN_MODULE_A_.todo.PatchInfo)
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

var __todo_AdminReg$getPatchPercent$ER = function (data) {
    throw {
        "request": data.request,
        "response": {
            "costtime": data.request.costtime,
            "error": data.error
        }
    }
};

todo.AdminRegProxy.prototype.getPatchPercent = function (application, serverName, nodeName) {
    return this._worker.todo_invoke("getPatchPercent", __todo_AdminReg$getPatchPercent$EN(application, serverName, nodeName), arguments[arguments.length - 1]).then(__todo_AdminReg$getPatchPercent$DE, __todo_AdminReg$getPatchPercent$ER);
};

var __todo_AdminReg$getProfileTemplate$EN = function (profileName) {
    var os = new TodoStream.TodoOutputStream();
    os.writeString(1, profileName);
    return os.getBinBuffer();
};

var __todo_AdminReg$getProfileTemplate$DE = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request": data.request,
            "response": {
                "costtime": data.request.costtime,
                "return": is.readInt32(0, true, 0),
                "arguments": {
                    "profileTemplate": is.readString(2, true, ""),
                    "resultDesc": is.readString(3, true, "")
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

var __todo_AdminReg$getProfileTemplate$ER = function (data) {
    throw {
        "request": data.request,
        "response": {
            "costtime": data.request.costtime,
            "error": data.error
        }
    }
};

todo.AdminRegProxy.prototype.getProfileTemplate = function (profileName) {
    return this._worker.todo_invoke("getProfileTemplate", __todo_AdminReg$getProfileTemplate$EN(profileName), arguments[arguments.length - 1]).then(__todo_AdminReg$getProfileTemplate$DE, __todo_AdminReg$getProfileTemplate$ER);
};

var __todo_AdminReg$getServerProfileTemplate$EN = function (application, serverName, nodeName) {
    var os = new TodoStream.TodoOutputStream();
    os.writeString(1, application);
    os.writeString(2, serverName);
    os.writeString(3, nodeName);
    return os.getBinBuffer();
};

var __todo_AdminReg$getServerProfileTemplate$DE = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request": data.request,
            "response": {
                "costtime": data.request.costtime,
                "return": is.readInt32(0, true, 0),
                "arguments": {
                    "profileTemplate": is.readString(4, true, ""),
                    "resultDesc": is.readString(5, true, "")
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

var __todo_AdminReg$getServerProfileTemplate$ER = function (data) {
    throw {
        "request": data.request,
        "response": {
            "costtime": data.request.costtime,
            "error": data.error
        }
    }
};

todo.AdminRegProxy.prototype.getServerProfileTemplate = function (application, serverName, nodeName) {
    return this._worker.todo_invoke("getServerProfileTemplate", __todo_AdminReg$getServerProfileTemplate$EN(application, serverName, nodeName), arguments[arguments.length - 1]).then(__todo_AdminReg$getServerProfileTemplate$DE, __todo_AdminReg$getServerProfileTemplate$ER);
};

var __todo_AdminReg$getServerState$EN = function (application, serverName, nodeName) {
    var os = new TodoStream.TodoOutputStream();
    os.writeString(1, application);
    os.writeString(2, serverName);
    os.writeString(3, nodeName);
    return os.getBinBuffer();
};

var __todo_AdminReg$getServerState$DE = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request": data.request,
            "response": {
                "costtime": data.request.costtime,
                "return": is.readInt32(0, true, 0),
                "arguments": {
                    "state": is.readStruct(4, true, todo.ServerStateDesc),
                    "result": is.readString(5, true, "")
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

var __todo_AdminReg$getServerState$ER = function (data) {
    throw {
        "request": data.request,
        "response": {
            "costtime": data.request.costtime,
            "error": data.error
        }
    }
};

todo.AdminRegProxy.prototype.getServerState = function (application, serverName, nodeName) {
    return this._worker.todo_invoke("getServerState", __todo_AdminReg$getServerState$EN(application, serverName, nodeName), arguments[arguments.length - 1]).then(__todo_AdminReg$getServerState$DE, __todo_AdminReg$getServerState$ER);
};

var __todo_AdminReg$getTaskHistory$EN = function (application, serverName, command) {
    var os = new TodoStream.TodoOutputStream();
    os.writeString(1, application);
    os.writeString(2, serverName);
    os.writeString(3, command);
    return os.getBinBuffer();
};

var __todo_AdminReg$getTaskHistory$DE = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request": data.request,
            "response": {
                "costtime": data.request.costtime,
                "return": is.readInt32(0, true, 0),
                "arguments": {
                    "taskRsps": is.readList(4, true, TodoStream.List(todo.TaskRsp))
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

var __todo_AdminReg$getTaskHistory$ER = function (data) {
    throw {
        "request": data.request,
        "response": {
            "costtime": data.request.costtime,
            "error": data.error
        }
    }
};

todo.AdminRegProxy.prototype.getTaskHistory = function (application, serverName, command) {
    return this._worker.todo_invoke("getTaskHistory", __todo_AdminReg$getTaskHistory$EN(application, serverName, command), arguments[arguments.length - 1]).then(__todo_AdminReg$getTaskHistory$DE, __todo_AdminReg$getTaskHistory$ER);
};

var __todo_AdminReg$getTaskRsp$EN = function (taskNo) {
    var os = new TodoStream.TodoOutputStream();
    os.writeString(1, taskNo);
    return os.getBinBuffer();
};

var __todo_AdminReg$getTaskRsp$DE = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request": data.request,
            "response": {
                "costtime": data.request.costtime,
                "return": is.readInt32(0, true, 0),
                "arguments": {
                    "taskRsp": is.readStruct(2, true, todo.TaskRsp)
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

var __todo_AdminReg$getTaskRsp$ER = function (data) {
    throw {
        "request": data.request,
        "response": {
            "costtime": data.request.costtime,
            "error": data.error
        }
    }
};

todo.AdminRegProxy.prototype.getTaskRsp = function (taskNo) {
    return this._worker.todo_invoke("getTaskRsp", __todo_AdminReg$getTaskRsp$EN(taskNo), arguments[arguments.length - 1]).then(__todo_AdminReg$getTaskRsp$DE, __todo_AdminReg$getTaskRsp$ER);
};

var __todo_AdminReg$loadServer$EN = function (application, serverName, nodeName) {
    var os = new TodoStream.TodoOutputStream();
    os.writeString(1, application);
    os.writeString(2, serverName);
    os.writeString(3, nodeName);
    return os.getBinBuffer();
};

var __todo_AdminReg$loadServer$DE = function (data) {
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

var __todo_AdminReg$loadServer$ER = function (data) {
    throw {
        "request": data.request,
        "response": {
            "costtime": data.request.costtime,
            "error": data.error
        }
    }
};

todo.AdminRegProxy.prototype.loadServer = function (application, serverName, nodeName) {
    return this._worker.todo_invoke("loadServer", __todo_AdminReg$loadServer$EN(application, serverName, nodeName), arguments[arguments.length - 1]).then(__todo_AdminReg$loadServer$DE, __todo_AdminReg$loadServer$ER);
};

var __todo_AdminReg$notifyServer$EN = function (application, serverName, nodeName, command) {
    var os = new TodoStream.TodoOutputStream();
    os.writeString(1, application);
    os.writeString(2, serverName);
    os.writeString(3, nodeName);
    os.writeString(4, command);
    return os.getBinBuffer();
};

var __todo_AdminReg$notifyServer$DE = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request": data.request,
            "response": {
                "costtime": data.request.costtime,
                "return": is.readInt32(0, true, 0),
                "arguments": {
                    "result": is.readString(5, true, "")
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

var __todo_AdminReg$notifyServer$ER = function (data) {
    throw {
        "request": data.request,
        "response": {
            "costtime": data.request.costtime,
            "error": data.error
        }
    }
};

todo.AdminRegProxy.prototype.notifyServer = function (application, serverName, nodeName, command) {
    return this._worker.todo_invoke("notifyServer", __todo_AdminReg$notifyServer$EN(application, serverName, nodeName, command), arguments[arguments.length - 1]).then(__todo_AdminReg$notifyServer$DE, __todo_AdminReg$notifyServer$ER);
};

var __todo_AdminReg$pingNode$EN = function (name) {
    var os = new TodoStream.TodoOutputStream();
    os.writeString(1, name);
    return os.getBinBuffer();
};

var __todo_AdminReg$pingNode$DE = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request": data.request,
            "response": {
                "costtime": data.request.costtime,
                "return": is.readBoolean(0, true, true),
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

var __todo_AdminReg$pingNode$ER = function (data) {
    throw {
        "request": data.request,
        "response": {
            "costtime": data.request.costtime,
            "error": data.error
        }
    }
};

todo.AdminRegProxy.prototype.pingNode = function (name) {
    return this._worker.todo_invoke("pingNode", __todo_AdminReg$pingNode$EN(name), arguments[arguments.length - 1]).then(__todo_AdminReg$pingNode$DE, __todo_AdminReg$pingNode$ER);
};

var __todo_AdminReg$restartServer$EN = function (application, serverName, nodeName) {
    var os = new TodoStream.TodoOutputStream();
    os.writeString(1, application);
    os.writeString(2, serverName);
    os.writeString(3, nodeName);
    return os.getBinBuffer();
};

var __todo_AdminReg$restartServer$DE = function (data) {
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

var __todo_AdminReg$restartServer$ER = function (data) {
    throw {
        "request": data.request,
        "response": {
            "costtime": data.request.costtime,
            "error": data.error
        }
    }
};

todo.AdminRegProxy.prototype.restartServer = function (application, serverName, nodeName) {
    return this._worker.todo_invoke("restartServer", __todo_AdminReg$restartServer$EN(application, serverName, nodeName), arguments[arguments.length - 1]).then(__todo_AdminReg$restartServer$DE, __todo_AdminReg$restartServer$ER);
};

var __todo_AdminReg$setTaskItemInfo$EN = function (itemNo, info) {
    var os = new TodoStream.TodoOutputStream();
    os.writeString(1, itemNo);
    os.writeMap(2, info);
    return os.getBinBuffer();
};

var __todo_AdminReg$setTaskItemInfo$DE = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request": data.request,
            "response": {
                "costtime": data.request.costtime,
                "return": is.readInt32(0, true, 0)
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

var __todo_AdminReg$setTaskItemInfo$ER = function (data) {
    throw {
        "request": data.request,
        "response": {
            "costtime": data.request.costtime,
            "error": data.error
        }
    }
};

todo.AdminRegProxy.prototype.setTaskItemInfo = function (itemNo, info) {
    return this._worker.todo_invoke("setTaskItemInfo", __todo_AdminReg$setTaskItemInfo$EN(itemNo, info), arguments[arguments.length - 1]).then(__todo_AdminReg$setTaskItemInfo$DE, __todo_AdminReg$setTaskItemInfo$ER);
};

var __todo_AdminReg$shutdownNode$EN = function (name) {
    var os = new TodoStream.TodoOutputStream();
    os.writeString(1, name);
    return os.getBinBuffer();
};

var __todo_AdminReg$shutdownNode$DE = function (data) {
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

var __todo_AdminReg$shutdownNode$ER = function (data) {
    throw {
        "request": data.request,
        "response": {
            "costtime": data.request.costtime,
            "error": data.error
        }
    }
};

todo.AdminRegProxy.prototype.shutdownNode = function (name) {
    return this._worker.todo_invoke("shutdownNode", __todo_AdminReg$shutdownNode$EN(name), arguments[arguments.length - 1]).then(__todo_AdminReg$shutdownNode$DE, __todo_AdminReg$shutdownNode$ER);
};

var __todo_AdminReg$startServer$EN = function (application, serverName, nodeName) {
    var os = new TodoStream.TodoOutputStream();
    os.writeString(1, application);
    os.writeString(2, serverName);
    os.writeString(3, nodeName);
    return os.getBinBuffer();
};

var __todo_AdminReg$startServer$DE = function (data) {
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

var __todo_AdminReg$startServer$ER = function (data) {
    throw {
        "request": data.request,
        "response": {
            "costtime": data.request.costtime,
            "error": data.error
        }
    }
};

todo.AdminRegProxy.prototype.startServer = function (application, serverName, nodeName) {
    return this._worker.todo_invoke("startServer", __todo_AdminReg$startServer$EN(application, serverName, nodeName), arguments[arguments.length - 1]).then(__todo_AdminReg$startServer$DE, __todo_AdminReg$startServer$ER);
};

var __todo_AdminReg$stopServer$EN = function (application, serverName, nodeName) {
    var os = new TodoStream.TodoOutputStream();
    os.writeString(1, application);
    os.writeString(2, serverName);
    os.writeString(3, nodeName);
    return os.getBinBuffer();
};

var __todo_AdminReg$stopServer$DE = function (data) {
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

var __todo_AdminReg$stopServer$ER = function (data) {
    throw {
        "request": data.request,
        "response": {
            "costtime": data.request.costtime,
            "error": data.error
        }
    }
};

todo.AdminRegProxy.prototype.stopServer = function (application, serverName, nodeName) {
    return this._worker.todo_invoke("stopServer", __todo_AdminReg$stopServer$EN(application, serverName, nodeName), arguments[arguments.length - 1]).then(__todo_AdminReg$stopServer$DE, __todo_AdminReg$stopServer$ER);
};

var __todo_AdminReg$undeploy$EN = function (application, serverName, nodeName, user) {
    var os = new TodoStream.TodoOutputStream();
    os.writeString(1, application);
    os.writeString(2, serverName);
    os.writeString(3, nodeName);
    os.writeString(4, user);
    return os.getBinBuffer();
};

var __todo_AdminReg$undeploy$DE = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request": data.request,
            "response": {
                "costtime": data.request.costtime,
                "return": is.readInt32(0, true, 0),
                "arguments": {
                    "log": is.readString(5, true, "")
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

var __todo_AdminReg$undeploy$ER = function (data) {
    throw {
        "request": data.request,
        "response": {
            "costtime": data.request.costtime,
            "error": data.error
        }
    }
};

todo.AdminRegProxy.prototype.undeploy = function (application, serverName, nodeName, user) {
    return this._worker.todo_invoke("undeploy", __todo_AdminReg$undeploy$EN(application, serverName, nodeName, user), arguments[arguments.length - 1]).then(__todo_AdminReg$undeploy$DE, __todo_AdminReg$undeploy$ER);
};

var __todo_AdminReg$updatePatchLog$EN = function (application, serverName, nodeName, patchId, user, patchType, succ) {
    var os = new TodoStream.TodoOutputStream();
    os.writeString(1, application);
    os.writeString(2, serverName);
    os.writeString(3, nodeName);
    os.writeString(4, patchId);
    os.writeString(5, user);
    os.writeString(6, patchType);
    os.writeBoolean(7, succ);
    return os.getBinBuffer();
};

var __todo_AdminReg$updatePatchLog$DE = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request": data.request,
            "response": {
                "costtime": data.request.costtime,
                "return": is.readInt32(0, true, 0)
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

var __todo_AdminReg$updatePatchLog$ER = function (data) {
    throw {
        "request": data.request,
        "response": {
            "costtime": data.request.costtime,
            "error": data.error
        }
    }
};

todo.AdminRegProxy.prototype.updatePatchLog = function (application, serverName, nodeName, patchId, user, patchType, succ) {
    return this._worker.todo_invoke("updatePatchLog", __todo_AdminReg$updatePatchLog$EN(application, serverName, nodeName, patchId, user, patchType, succ), arguments[arguments.length - 1]).then(__todo_AdminReg$updatePatchLog$DE, __todo_AdminReg$updatePatchLog$ER);
};




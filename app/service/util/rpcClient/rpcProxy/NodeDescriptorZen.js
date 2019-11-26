"use strict";

var assert    = require("assert");
var TodoStream = require("../../../../../todolib/stream/todo");

var todo = todo || {};
module.exports.todo = todo;

todo.ServerState = {
    "Inactive" : 0,
    "Activating" : 1,
    "Active" : 2,
    "Deactivating" : 3,
    "Destroying" : 4,
    "Destroyed" : 5,
    "_classname" : "todo.ServerState"
};
todo.ServerState._write = function(os, tag, val) { return os.writeInt32(tag, val); };
todo.ServerState._read  = function(is, tag, def) { return is.readInt32(tag, true, def); };

todo.LoadInfo = function() {
    this.avg1 = 0;
    this.avg5 = 0;
    this.avg15 = 0;
    this.avgCpu = 0;
    this._classname = "todo.LoadInfo";
};
todo.LoadInfo._classname = "todo.LoadInfo";
todo.LoadInfo._write = function (os, tag, value) { os.writeStruct(tag, value); };
todo.LoadInfo._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
todo.LoadInfo._readFrom = function (is) {
    var tmp = new todo.LoadInfo();
    tmp.avg1 = is.readFloat(0, true, 0);
    tmp.avg5 = is.readFloat(1, true, 0);
    tmp.avg15 = is.readFloat(2, true, 0);
    tmp.avgCpu = is.readInt32(3, false, 0);
    return tmp;
};
todo.LoadInfo.prototype._writeTo = function (os) {
    os.writeFloat(0, this.avg1);
    os.writeFloat(1, this.avg5);
    os.writeFloat(2, this.avg15);
    os.writeInt32(3, this.avgCpu);
};
todo.LoadInfo.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
todo.LoadInfo.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
todo.LoadInfo.prototype.toObject = function() { 
    return {
        "avg1" : this.avg1,
        "avg5" : this.avg5,
        "avg15" : this.avg15,
        "avgCpu" : this.avgCpu
    };
};
todo.LoadInfo.prototype.readFromObject = function(json) { 
    json.hasOwnProperty("avg1") && (this.avg1 = json.avg1);
    json.hasOwnProperty("avg5") && (this.avg5 = json.avg5);
    json.hasOwnProperty("avg15") && (this.avg15 = json.avg15);
    json.hasOwnProperty("avgCpu") && (this.avgCpu = json.avgCpu);
};
todo.LoadInfo.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
todo.LoadInfo.new = function () {
    return new todo.LoadInfo();
};
todo.LoadInfo.create = function (is) {
    return todo.LoadInfo._readFrom(is);
};

todo.PatchInfo = function() {
    this.bPatching = false;
    this.iPercent = 0;
    this.iModifyTime = 0;
    this.sVersion = "";
    this.sResult = "";
    this.bSucc = false;
    this._classname = "todo.PatchInfo";
};
todo.PatchInfo._classname = "todo.PatchInfo";
todo.PatchInfo._write = function (os, tag, value) { os.writeStruct(tag, value); };
todo.PatchInfo._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
todo.PatchInfo._readFrom = function (is) {
    var tmp = new todo.PatchInfo();
    tmp.bPatching = is.readBoolean(0, true, false);
    tmp.iPercent = is.readInt32(1, true, 0);
    tmp.iModifyTime = is.readInt32(2, true, 0);
    tmp.sVersion = is.readString(3, true, "");
    tmp.sResult = is.readString(4, true, "");
    tmp.bSucc = is.readBoolean(5, false, false);
    return tmp;
};
todo.PatchInfo.prototype._writeTo = function (os) {
    os.writeBoolean(0, this.bPatching);
    os.writeInt32(1, this.iPercent);
    os.writeInt32(2, this.iModifyTime);
    os.writeString(3, this.sVersion);
    os.writeString(4, this.sResult);
    os.writeBoolean(5, this.bSucc);
};
todo.PatchInfo.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
todo.PatchInfo.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
todo.PatchInfo.prototype.toObject = function() { 
    return {
        "bPatching" : this.bPatching,
        "iPercent" : this.iPercent,
        "iModifyTime" : this.iModifyTime,
        "sVersion" : this.sVersion,
        "sResult" : this.sResult,
        "bSucc" : this.bSucc
    };
};
todo.PatchInfo.prototype.readFromObject = function(json) { 
    json.hasOwnProperty("bPatching") && (this.bPatching = json.bPatching);
    json.hasOwnProperty("iPercent") && (this.iPercent = json.iPercent);
    json.hasOwnProperty("iModifyTime") && (this.iModifyTime = json.iModifyTime);
    json.hasOwnProperty("sVersion") && (this.sVersion = json.sVersion);
    json.hasOwnProperty("sResult") && (this.sResult = json.sResult);
    json.hasOwnProperty("bSucc") && (this.bSucc = json.bSucc);
};
todo.PatchInfo.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
todo.PatchInfo.new = function () {
    return new todo.PatchInfo();
};
todo.PatchInfo.create = function (is) {
    return todo.PatchInfo._readFrom(is);
};

todo.PreparePatchInfo = function() {
    this.bPreparePatching = false;
    this.iPercent = 0;
    this.iModifyTime = 0;
    this.sVersion = "";
    this.sResult = "";
    this.ret = 0;
    this._classname = "todo.PreparePatchInfo";
};
todo.PreparePatchInfo._classname = "todo.PreparePatchInfo";
todo.PreparePatchInfo._write = function (os, tag, value) { os.writeStruct(tag, value); };
todo.PreparePatchInfo._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
todo.PreparePatchInfo._readFrom = function (is) {
    var tmp = new todo.PreparePatchInfo();
    tmp.bPreparePatching = is.readBoolean(0, true, false);
    tmp.iPercent = is.readInt32(1, true, 0);
    tmp.iModifyTime = is.readInt32(2, true, 0);
    tmp.sVersion = is.readString(3, true, "");
    tmp.sResult = is.readString(4, true, "");
    tmp.ret = is.readInt32(5, false, 0);
    return tmp;
};
todo.PreparePatchInfo.prototype._writeTo = function (os) {
    os.writeBoolean(0, this.bPreparePatching);
    os.writeInt32(1, this.iPercent);
    os.writeInt32(2, this.iModifyTime);
    os.writeString(3, this.sVersion);
    os.writeString(4, this.sResult);
    os.writeInt32(5, this.ret);
};
todo.PreparePatchInfo.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
todo.PreparePatchInfo.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
todo.PreparePatchInfo.prototype.toObject = function() { 
    return {
        "bPreparePatching" : this.bPreparePatching,
        "iPercent" : this.iPercent,
        "iModifyTime" : this.iModifyTime,
        "sVersion" : this.sVersion,
        "sResult" : this.sResult,
        "ret" : this.ret
    };
};
todo.PreparePatchInfo.prototype.readFromObject = function(json) { 
    json.hasOwnProperty("bPreparePatching") && (this.bPreparePatching = json.bPreparePatching);
    json.hasOwnProperty("iPercent") && (this.iPercent = json.iPercent);
    json.hasOwnProperty("iModifyTime") && (this.iModifyTime = json.iModifyTime);
    json.hasOwnProperty("sVersion") && (this.sVersion = json.sVersion);
    json.hasOwnProperty("sResult") && (this.sResult = json.sResult);
    json.hasOwnProperty("ret") && (this.ret = json.ret);
};
todo.PreparePatchInfo.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
todo.PreparePatchInfo.new = function () {
    return new todo.PreparePatchInfo();
};
todo.PreparePatchInfo.create = function (is) {
    return todo.PreparePatchInfo._readFrom(is);
};

todo.NodeInfo = function() {
    this.nodeName = "";
    this.nodeObj = "";
    this.endpointIp = "";
    this.endpointPort = 0;
    this.timeOut = 0;
    this.dataDir = "";
    this.version = "";
    this.coreFileSize = "";
    this.openFiles = 0;
    this._classname = "todo.NodeInfo";
};
todo.NodeInfo._classname = "todo.NodeInfo";
todo.NodeInfo._write = function (os, tag, value) { os.writeStruct(tag, value); };
todo.NodeInfo._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
todo.NodeInfo._readFrom = function (is) {
    var tmp = new todo.NodeInfo();
    tmp.nodeName = is.readString(0, true, "");
    tmp.nodeObj = is.readString(1, true, "");
    tmp.endpointIp = is.readString(2, true, "");
    tmp.endpointPort = is.readInt32(3, true, 0);
    tmp.timeOut = is.readInt16(4, true, 0);
    tmp.dataDir = is.readString(5, true, "");
    tmp.version = is.readString(6, false, "");
    tmp.coreFileSize = is.readString(7, false, "");
    tmp.openFiles = is.readInt32(8, false, 0);
    return tmp;
};
todo.NodeInfo.prototype._writeTo = function (os) {
    os.writeString(0, this.nodeName);
    os.writeString(1, this.nodeObj);
    os.writeString(2, this.endpointIp);
    os.writeInt32(3, this.endpointPort);
    os.writeInt16(4, this.timeOut);
    os.writeString(5, this.dataDir);
    os.writeString(6, this.version);
    os.writeString(7, this.coreFileSize);
    os.writeInt32(8, this.openFiles);
};
todo.NodeInfo.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
todo.NodeInfo.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
todo.NodeInfo.prototype.toObject = function() { 
    return {
        "nodeName" : this.nodeName,
        "nodeObj" : this.nodeObj,
        "endpointIp" : this.endpointIp,
        "endpointPort" : this.endpointPort,
        "timeOut" : this.timeOut,
        "dataDir" : this.dataDir,
        "version" : this.version,
        "coreFileSize" : this.coreFileSize,
        "openFiles" : this.openFiles
    };
};
todo.NodeInfo.prototype.readFromObject = function(json) { 
    json.hasOwnProperty("nodeName") && (this.nodeName = json.nodeName);
    json.hasOwnProperty("nodeObj") && (this.nodeObj = json.nodeObj);
    json.hasOwnProperty("endpointIp") && (this.endpointIp = json.endpointIp);
    json.hasOwnProperty("endpointPort") && (this.endpointPort = json.endpointPort);
    json.hasOwnProperty("timeOut") && (this.timeOut = json.timeOut);
    json.hasOwnProperty("dataDir") && (this.dataDir = json.dataDir);
    json.hasOwnProperty("version") && (this.version = json.version);
    json.hasOwnProperty("coreFileSize") && (this.coreFileSize = json.coreFileSize);
    json.hasOwnProperty("openFiles") && (this.openFiles = json.openFiles);
};
todo.NodeInfo.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
todo.NodeInfo.new = function () {
    return new todo.NodeInfo();
};
todo.NodeInfo.create = function (is) {
    return todo.NodeInfo._readFrom(is);
};

todo.ServerStateInfo = function() {
    this.serverState = todo.ServerState.Inactive;
    this.processId = 0;
    this.nodeName = "";
    this.application = "";
    this.serverName = "";
    this.settingState = todo.ServerState.Inactive;
    this._classname = "todo.ServerStateInfo";
};
todo.ServerStateInfo._classname = "todo.ServerStateInfo";
todo.ServerStateInfo._write = function (os, tag, value) { os.writeStruct(tag, value); };
todo.ServerStateInfo._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
todo.ServerStateInfo._readFrom = function (is) {
    var tmp = new todo.ServerStateInfo();
    tmp.serverState = is.readInt32(0, true, todo.ServerState.Inactive);
    tmp.processId = is.readInt32(1, true, 0);
    tmp.nodeName = is.readString(2, false, "");
    tmp.application = is.readString(3, false, "");
    tmp.serverName = is.readString(4, false, "");
    tmp.settingState = is.readInt32(5, false, todo.ServerState.Inactive);
    return tmp;
};
todo.ServerStateInfo.prototype._writeTo = function (os) {
    os.writeInt32(0, this.serverState);
    os.writeInt32(1, this.processId);
    os.writeString(2, this.nodeName);
    os.writeString(3, this.application);
    os.writeString(4, this.serverName);
    os.writeInt32(5, this.settingState);
};
todo.ServerStateInfo.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
todo.ServerStateInfo.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
todo.ServerStateInfo.prototype.toObject = function() { 
    return {
        "serverState" : this.serverState,
        "processId" : this.processId,
        "nodeName" : this.nodeName,
        "application" : this.application,
        "serverName" : this.serverName,
        "settingState" : this.settingState
    };
};
todo.ServerStateInfo.prototype.readFromObject = function(json) { 
    json.hasOwnProperty("serverState") && (this.serverState = json.serverState);
    json.hasOwnProperty("processId") && (this.processId = json.processId);
    json.hasOwnProperty("nodeName") && (this.nodeName = json.nodeName);
    json.hasOwnProperty("application") && (this.application = json.application);
    json.hasOwnProperty("serverName") && (this.serverName = json.serverName);
    json.hasOwnProperty("settingState") && (this.settingState = json.settingState);
};
todo.ServerStateInfo.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
todo.ServerStateInfo.new = function () {
    return new todo.ServerStateInfo();
};
todo.ServerStateInfo.create = function (is) {
    return todo.ServerStateInfo._readFrom(is);
};

todo.PatchRequest = function() {
    this.appname = "";
    this.servername = "";
    this.nodename = "";
    this.groupname = "";
    this.binname = "";
    this.version = "";
    this.user = "";
    this.servertype = "";
    this.patchobj = "";
    this.md5 = "";
    this.ostype = "";
    this.filepath = "";
    this._classname = "todo.PatchRequest";
};
todo.PatchRequest._classname = "todo.PatchRequest";
todo.PatchRequest._write = function (os, tag, value) { os.writeStruct(tag, value); };
todo.PatchRequest._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
todo.PatchRequest._readFrom = function (is) {
    var tmp = new todo.PatchRequest();
    tmp.appname = is.readString(0, true, "");
    tmp.servername = is.readString(1, true, "");
    tmp.nodename = is.readString(2, true, "");
    tmp.groupname = is.readString(3, true, "");
    tmp.binname = is.readString(4, true, "");
    tmp.version = is.readString(5, true, "");
    tmp.user = is.readString(6, true, "");
    tmp.servertype = is.readString(7, true, "");
    tmp.patchobj = is.readString(8, true, "");
    tmp.md5 = is.readString(9, true, "");
    tmp.ostype = is.readString(10, false, "");
    tmp.filepath = is.readString(11, false, "");
    return tmp;
};
todo.PatchRequest.prototype._writeTo = function (os) {
    os.writeString(0, this.appname);
    os.writeString(1, this.servername);
    os.writeString(2, this.nodename);
    os.writeString(3, this.groupname);
    os.writeString(4, this.binname);
    os.writeString(5, this.version);
    os.writeString(6, this.user);
    os.writeString(7, this.servertype);
    os.writeString(8, this.patchobj);
    os.writeString(9, this.md5);
    os.writeString(10, this.ostype);
    os.writeString(11, this.filepath);
};
todo.PatchRequest.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
todo.PatchRequest.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
todo.PatchRequest.prototype.toObject = function() { 
    return {
        "appname" : this.appname,
        "servername" : this.servername,
        "nodename" : this.nodename,
        "groupname" : this.groupname,
        "binname" : this.binname,
        "version" : this.version,
        "user" : this.user,
        "servertype" : this.servertype,
        "patchobj" : this.patchobj,
        "md5" : this.md5,
        "ostype" : this.ostype,
        "filepath" : this.filepath
    };
};
todo.PatchRequest.prototype.readFromObject = function(json) { 
    json.hasOwnProperty("appname") && (this.appname = json.appname);
    json.hasOwnProperty("servername") && (this.servername = json.servername);
    json.hasOwnProperty("nodename") && (this.nodename = json.nodename);
    json.hasOwnProperty("groupname") && (this.groupname = json.groupname);
    json.hasOwnProperty("binname") && (this.binname = json.binname);
    json.hasOwnProperty("version") && (this.version = json.version);
    json.hasOwnProperty("user") && (this.user = json.user);
    json.hasOwnProperty("servertype") && (this.servertype = json.servertype);
    json.hasOwnProperty("patchobj") && (this.patchobj = json.patchobj);
    json.hasOwnProperty("md5") && (this.md5 = json.md5);
    json.hasOwnProperty("ostype") && (this.ostype = json.ostype);
    json.hasOwnProperty("filepath") && (this.filepath = json.filepath);
};
todo.PatchRequest.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
todo.PatchRequest.new = function () {
    return new todo.PatchRequest();
};
todo.PatchRequest.create = function (is) {
    return todo.PatchRequest._readFrom(is);
};

todo.PreparePatchRequest = function() {
    this.appname = "";
    this.servername = "";
    this.groupname = "";
    this.version = "";
    this.user = "";
    this.servertype = "";
    this.patchobj = "";
    this.md5 = "";
    this.ostype = "";
    this.specialNodeList = new TodoStream.List(TodoStream.String);
    this.filepath = "";
    this._classname = "todo.PreparePatchRequest";
};
todo.PreparePatchRequest._classname = "todo.PreparePatchRequest";
todo.PreparePatchRequest._write = function (os, tag, value) { os.writeStruct(tag, value); };
todo.PreparePatchRequest._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
todo.PreparePatchRequest._readFrom = function (is) {
    var tmp = new todo.PreparePatchRequest();
    tmp.appname = is.readString(0, true, "");
    tmp.servername = is.readString(1, true, "");
    tmp.groupname = is.readString(2, true, "");
    tmp.version = is.readString(3, true, "");
    tmp.user = is.readString(4, true, "");
    tmp.servertype = is.readString(5, true, "");
    tmp.patchobj = is.readString(6, true, "");
    tmp.md5 = is.readString(7, true, "");
    tmp.ostype = is.readString(8, true, "");
    tmp.specialNodeList = is.readList(9, true, TodoStream.List(TodoStream.String));
    tmp.filepath = is.readString(10, false, "");
    return tmp;
};
todo.PreparePatchRequest.prototype._writeTo = function (os) {
    os.writeString(0, this.appname);
    os.writeString(1, this.servername);
    os.writeString(2, this.groupname);
    os.writeString(3, this.version);
    os.writeString(4, this.user);
    os.writeString(5, this.servertype);
    os.writeString(6, this.patchobj);
    os.writeString(7, this.md5);
    os.writeString(8, this.ostype);
    os.writeList(9, this.specialNodeList);
    os.writeString(10, this.filepath);
};
todo.PreparePatchRequest.prototype._equal = function (anItem) {
    return this.appname === anItem.appname && 
        this.servername === anItem.servername && 
        this.version === anItem.version;
};
todo.PreparePatchRequest.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
todo.PreparePatchRequest.prototype.toObject = function() { 
    return {
        "appname" : this.appname,
        "servername" : this.servername,
        "groupname" : this.groupname,
        "version" : this.version,
        "user" : this.user,
        "servertype" : this.servertype,
        "patchobj" : this.patchobj,
        "md5" : this.md5,
        "ostype" : this.ostype,
        "specialNodeList" : this.specialNodeList.toObject(),
        "filepath" : this.filepath
    };
};
todo.PreparePatchRequest.prototype.readFromObject = function(json) { 
    json.hasOwnProperty("appname") && (this.appname = json.appname);
    json.hasOwnProperty("servername") && (this.servername = json.servername);
    json.hasOwnProperty("groupname") && (this.groupname = json.groupname);
    json.hasOwnProperty("version") && (this.version = json.version);
    json.hasOwnProperty("user") && (this.user = json.user);
    json.hasOwnProperty("servertype") && (this.servertype = json.servertype);
    json.hasOwnProperty("patchobj") && (this.patchobj = json.patchobj);
    json.hasOwnProperty("md5") && (this.md5 = json.md5);
    json.hasOwnProperty("ostype") && (this.ostype = json.ostype);
    json.hasOwnProperty("specialNodeList") && (this.specialNodeList.readFromObject(json.specialNodeList));
    json.hasOwnProperty("filepath") && (this.filepath = json.filepath);
};
todo.PreparePatchRequest.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
todo.PreparePatchRequest.new = function () {
    return new todo.PreparePatchRequest();
};
todo.PreparePatchRequest.create = function (is) {
    return todo.PreparePatchRequest._readFrom(is);
};




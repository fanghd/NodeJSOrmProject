"use strict";

var assert    = require("assert");
var TodoStream = require("../../../../../todolib/stream/todo");
var TodoError  = require("../../../../../todolib/rpc/protal").error;

var _hasOwnProperty = Object.prototype.hasOwnProperty;
var _makeError = function (data, message, type) {
    var error = new Error(message || "");
    error.request = data.request;
    error.response = {
        "costtime" : data.request.costtime
    };
    if (type === TodoError.CLIENT.DECODE_ERROR) {
        error.name = "DECODE_ERROR";
        error.response.error = {
            "code" : type,
            "message" : message
        };
    } else {
        error.name = "RPC_ERROR";
        error.response.error = data.error;
    }
    return error;
};

var DCache = DCache || {};
module.exports.DCache = DCache;

DCache.DCacheOptProxy = function () {
    this._name    = undefined;
    this._worker  = undefined;
};

DCache.DCacheOptProxy.prototype.setTimeout = function (iTimeout) {
    this._worker.timeout = iTimeout;
};

DCache.DCacheOptProxy.prototype.getTimeout = function () {
    return this._worker.timeout;
};

DCache.DCacheOptProxy.prototype.setVersion = function (iVersion) {
    this._worker.version = iVersion;
};

DCache.DCacheOptProxy.prototype.getVersion = function () {
    return this._worker.version;
};

DCache.DCacheType = {
    "KVCACHE" : 1,
    "MKVCACHE" : 2
};
DCache.DCacheType._classname = "DCache.DCacheType";
DCache.DCacheType._write = function(os, tag, val) { return os.writeInt32(tag, val); };
DCache.DCacheType._read  = function(is, tag, def) { return is.readInt32(tag, true, def); };

DCache.TransferType = {
    "UNSPECIFIED_TYPE" : -1,
    "TRANSFER_TYPE" : 0,
    "EXPAND_TYPE" : 1,
    "REDUCE_TYPE" : 2,
    "DEFRAG_TYPE" : 3
};
DCache.TransferType._classname = "DCache.TransferType";
DCache.TransferType._write = function(os, tag, val) { return os.writeInt32(tag, val); };
DCache.TransferType._read  = function(is, tag, def) { return is.readInt32(tag, true, def); };

DCache.TransferStatus = {
    "NEW_TASK" : 0,
    "CONFIG_SERVER" : 1,
    "RELEASE_SERVER" : 2,
    "TRANSFERRING" : 3,
    "TRANSFER_FINISH" : 4,
    "TRANSFER_STOP" : 5
};
DCache.TransferStatus._classname = "DCache.TransferStatus";
DCache.TransferStatus._write = function(os, tag, val) { return os.writeInt32(tag, val); };
DCache.TransferStatus._read  = function(is, tag, def) { return is.readInt32(tag, true, def); };

DCache.UninstallType = {
    "SERVER" : 0,
    "GROUP" : 1,
    "MODULE" : 2,
    "QUOTA_SERVER" : 3
};
DCache.UninstallType._classname = "DCache.UninstallType";
DCache.UninstallType._write = function(os, tag, val) { return os.writeInt32(tag, val); };
DCache.UninstallType._read  = function(is, tag, def) { return is.readInt32(tag, true, def); };

DCache.DBInfo = function() {
    this.ip = "";
    this.user = "";
    this.pwd = "";
    this.port = "";
    this.charset = "";
    this.dbName = "";
    this._classname = "DCache.DBInfo";
};
DCache.DBInfo._classname = "DCache.DBInfo";
DCache.DBInfo._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.DBInfo._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.DBInfo._readFrom = function (is) {
    var tmp = new DCache.DBInfo;
    tmp.ip = is.readString(0, true, "");
    tmp.user = is.readString(1, true, "");
    tmp.pwd = is.readString(2, true, "");
    tmp.port = is.readString(3, true, "");
    tmp.charset = is.readString(4, true, "");
    tmp.dbName = is.readString(5, true, "");
    return tmp;
};
DCache.DBInfo.prototype._writeTo = function (os) {
    os.writeString(0, this.ip);
    os.writeString(1, this.user);
    os.writeString(2, this.pwd);
    os.writeString(3, this.port);
    os.writeString(4, this.charset);
    os.writeString(5, this.dbName);
};
DCache.DBInfo.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.DBInfo.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.DBInfo.prototype.toObject = function() { 
    return {
        "ip" : this.ip,
        "user" : this.user,
        "pwd" : this.pwd,
        "port" : this.port,
        "charset" : this.charset,
        "dbName" : this.dbName
    };
};
DCache.DBInfo.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "ip") && (this.ip = json.ip);
    _hasOwnProperty.call(json, "user") && (this.user = json.user);
    _hasOwnProperty.call(json, "pwd") && (this.pwd = json.pwd);
    _hasOwnProperty.call(json, "port") && (this.port = json.port);
    _hasOwnProperty.call(json, "charset") && (this.charset = json.charset);
    _hasOwnProperty.call(json, "dbName") && (this.dbName = json.dbName);
    return this;
};
DCache.DBInfo.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.DBInfo.new = function () {
    return new DCache.DBInfo();
};
DCache.DBInfo.create = function (is) {
    return DCache.DBInfo._readFrom(is);
};

DCache.RouterParam = function() {
    this.installRouter = true;
    this.serverName = "";
    this.appName = "";
    this.serverIp = new TodoStream.List(TodoStream.String);
    this.templateFile = "";
    this.dbName = "";
    this.dbIp = "";
    this.dbPort = "";
    this.dbUser = "";
    this.dbPwd = "";
    this.remark = "";
    this._classname = "DCache.RouterParam";
};
DCache.RouterParam._classname = "DCache.RouterParam";
DCache.RouterParam._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.RouterParam._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.RouterParam._readFrom = function (is) {
    var tmp = new DCache.RouterParam;
    tmp.installRouter = is.readBoolean(0, true, true);
    tmp.serverName = is.readString(1, true, "");
    tmp.appName = is.readString(2, true, "");
    tmp.serverIp = is.readList(3, true, TodoStream.List(TodoStream.String));
    tmp.templateFile = is.readString(4, true, "");
    tmp.dbName = is.readString(5, true, "");
    tmp.dbIp = is.readString(6, true, "");
    tmp.dbPort = is.readString(7, true, "");
    tmp.dbUser = is.readString(8, true, "");
    tmp.dbPwd = is.readString(9, true, "");
    tmp.remark = is.readString(10, true, "");
    return tmp;
};
DCache.RouterParam.prototype._writeTo = function (os) {
    os.writeBoolean(0, this.installRouter);
    os.writeString(1, this.serverName);
    os.writeString(2, this.appName);
    os.writeList(3, this.serverIp);
    os.writeString(4, this.templateFile);
    os.writeString(5, this.dbName);
    os.writeString(6, this.dbIp);
    os.writeString(7, this.dbPort);
    os.writeString(8, this.dbUser);
    os.writeString(9, this.dbPwd);
    os.writeString(10, this.remark);
};
DCache.RouterParam.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.RouterParam.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.RouterParam.prototype.toObject = function() { 
    return {
        "installRouter" : this.installRouter,
        "serverName" : this.serverName,
        "appName" : this.appName,
        "serverIp" : this.serverIp.toObject(),
        "templateFile" : this.templateFile,
        "dbName" : this.dbName,
        "dbIp" : this.dbIp,
        "dbPort" : this.dbPort,
        "dbUser" : this.dbUser,
        "dbPwd" : this.dbPwd,
        "remark" : this.remark
    };
};
DCache.RouterParam.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "installRouter") && (this.installRouter = json.installRouter);
    _hasOwnProperty.call(json, "serverName") && (this.serverName = json.serverName);
    _hasOwnProperty.call(json, "appName") && (this.appName = json.appName);
    _hasOwnProperty.call(json, "serverIp") && (this.serverIp.readFromObject(json.serverIp));
    _hasOwnProperty.call(json, "templateFile") && (this.templateFile = json.templateFile);
    _hasOwnProperty.call(json, "dbName") && (this.dbName = json.dbName);
    _hasOwnProperty.call(json, "dbIp") && (this.dbIp = json.dbIp);
    _hasOwnProperty.call(json, "dbPort") && (this.dbPort = json.dbPort);
    _hasOwnProperty.call(json, "dbUser") && (this.dbUser = json.dbUser);
    _hasOwnProperty.call(json, "dbPwd") && (this.dbPwd = json.dbPwd);
    _hasOwnProperty.call(json, "remark") && (this.remark = json.remark);
    return this;
};
DCache.RouterParam.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.RouterParam.new = function () {
    return new DCache.RouterParam();
};
DCache.RouterParam.create = function (is) {
    return DCache.RouterParam._readFrom(is);
};

DCache.ProxyAddr = function() {
    this.ip = "";
    this.idcArea = "";
    this._classname = "DCache.ProxyAddr";
};
DCache.ProxyAddr._classname = "DCache.ProxyAddr";
DCache.ProxyAddr._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.ProxyAddr._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.ProxyAddr._readFrom = function (is) {
    var tmp = new DCache.ProxyAddr;
    tmp.ip = is.readString(0, true, "");
    tmp.idcArea = is.readString(1, true, "");
    return tmp;
};
DCache.ProxyAddr.prototype._writeTo = function (os) {
    os.writeString(0, this.ip);
    os.writeString(1, this.idcArea);
};
DCache.ProxyAddr.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.ProxyAddr.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.ProxyAddr.prototype.toObject = function() { 
    return {
        "ip" : this.ip,
        "idcArea" : this.idcArea
    };
};
DCache.ProxyAddr.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "ip") && (this.ip = json.ip);
    _hasOwnProperty.call(json, "idcArea") && (this.idcArea = json.idcArea);
    return this;
};
DCache.ProxyAddr.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.ProxyAddr.new = function () {
    return new DCache.ProxyAddr();
};
DCache.ProxyAddr.create = function (is) {
    return DCache.ProxyAddr._readFrom(is);
};

DCache.ProxyParam = function() {
    this.installProxy = true;
    this.serverName = "";
    this.appName = "";
    this.serverIp = new TodoStream.List(DCache.ProxyAddr);
    this.templateFile = "";
    this._classname = "DCache.ProxyParam";
};
DCache.ProxyParam._classname = "DCache.ProxyParam";
DCache.ProxyParam._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.ProxyParam._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.ProxyParam._readFrom = function (is) {
    var tmp = new DCache.ProxyParam;
    tmp.installProxy = is.readBoolean(0, true, true);
    tmp.serverName = is.readString(1, true, "");
    tmp.appName = is.readString(2, true, "");
    tmp.serverIp = is.readList(3, true, TodoStream.List(DCache.ProxyAddr));
    tmp.templateFile = is.readString(4, true, "");
    return tmp;
};
DCache.ProxyParam.prototype._writeTo = function (os) {
    os.writeBoolean(0, this.installProxy);
    os.writeString(1, this.serverName);
    os.writeString(2, this.appName);
    os.writeList(3, this.serverIp);
    os.writeString(4, this.templateFile);
};
DCache.ProxyParam.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.ProxyParam.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.ProxyParam.prototype.toObject = function() { 
    return {
        "installProxy" : this.installProxy,
        "serverName" : this.serverName,
        "appName" : this.appName,
        "serverIp" : this.serverIp.toObject(),
        "templateFile" : this.templateFile
    };
};
DCache.ProxyParam.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "installProxy") && (this.installProxy = json.installProxy);
    _hasOwnProperty.call(json, "serverName") && (this.serverName = json.serverName);
    _hasOwnProperty.call(json, "appName") && (this.appName = json.appName);
    _hasOwnProperty.call(json, "serverIp") && (this.serverIp.readFromObject(json.serverIp));
    _hasOwnProperty.call(json, "templateFile") && (this.templateFile = json.templateFile);
    return this;
};
DCache.ProxyParam.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.ProxyParam.new = function () {
    return new DCache.ProxyParam();
};
DCache.ProxyParam.create = function (is) {
    return DCache.ProxyParam._readFrom(is);
};

DCache.CacheHostParam = function() {
    this.serverName = "";
    this.serverIp = "";
    this.templateFile = "";
    this.type = "";
    this.bakSrcServerName = "";
    this.idc = "";
    this.priority = "";
    this.groupName = "";
    this.shmSize = "";
    this.shmKey = "";
    this.isContainer = "";
    this.binlogPort = "";
    this.cachePort = "";
    this.wcachePort = "";
    this.backupPort = "";
    this.routerPort = "";
    this.controlackPort = "";
    this._classname = "DCache.CacheHostParam";
};
DCache.CacheHostParam._classname = "DCache.CacheHostParam";
DCache.CacheHostParam._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.CacheHostParam._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.CacheHostParam._readFrom = function (is) {
    var tmp = new DCache.CacheHostParam;
    tmp.serverName = is.readString(0, true, "");
    tmp.serverIp = is.readString(1, true, "");
    tmp.templateFile = is.readString(2, true, "");
    tmp.type = is.readString(3, true, "");
    tmp.bakSrcServerName = is.readString(4, true, "");
    tmp.idc = is.readString(5, true, "");
    tmp.priority = is.readString(6, true, "");
    tmp.groupName = is.readString(7, true, "");
    tmp.shmSize = is.readString(8, true, "");
    tmp.shmKey = is.readString(9, true, "");
    tmp.isContainer = is.readString(10, true, "");
    tmp.binlogPort = is.readString(11, false, "");
    tmp.cachePort = is.readString(12, false, "");
    tmp.wcachePort = is.readString(13, false, "");
    tmp.backupPort = is.readString(14, false, "");
    tmp.routerPort = is.readString(15, false, "");
    tmp.controlackPort = is.readString(16, false, "");
    return tmp;
};
DCache.CacheHostParam.prototype._writeTo = function (os) {
    os.writeString(0, this.serverName);
    os.writeString(1, this.serverIp);
    os.writeString(2, this.templateFile);
    os.writeString(3, this.type);
    os.writeString(4, this.bakSrcServerName);
    os.writeString(5, this.idc);
    os.writeString(6, this.priority);
    os.writeString(7, this.groupName);
    os.writeString(8, this.shmSize);
    os.writeString(9, this.shmKey);
    os.writeString(10, this.isContainer);
    os.writeString(11, this.binlogPort);
    os.writeString(12, this.cachePort);
    os.writeString(13, this.wcachePort);
    os.writeString(14, this.backupPort);
    os.writeString(15, this.routerPort);
    os.writeString(16, this.controlackPort);
};
DCache.CacheHostParam.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.CacheHostParam.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.CacheHostParam.prototype.toObject = function() { 
    return {
        "serverName" : this.serverName,
        "serverIp" : this.serverIp,
        "templateFile" : this.templateFile,
        "type" : this.type,
        "bakSrcServerName" : this.bakSrcServerName,
        "idc" : this.idc,
        "priority" : this.priority,
        "groupName" : this.groupName,
        "shmSize" : this.shmSize,
        "shmKey" : this.shmKey,
        "isContainer" : this.isContainer,
        "binlogPort" : this.binlogPort,
        "cachePort" : this.cachePort,
        "wcachePort" : this.wcachePort,
        "backupPort" : this.backupPort,
        "routerPort" : this.routerPort,
        "controlackPort" : this.controlackPort
    };
};
DCache.CacheHostParam.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "serverName") && (this.serverName = json.serverName);
    _hasOwnProperty.call(json, "serverIp") && (this.serverIp = json.serverIp);
    _hasOwnProperty.call(json, "templateFile") && (this.templateFile = json.templateFile);
    _hasOwnProperty.call(json, "type") && (this.type = json.type);
    _hasOwnProperty.call(json, "bakSrcServerName") && (this.bakSrcServerName = json.bakSrcServerName);
    _hasOwnProperty.call(json, "idc") && (this.idc = json.idc);
    _hasOwnProperty.call(json, "priority") && (this.priority = json.priority);
    _hasOwnProperty.call(json, "groupName") && (this.groupName = json.groupName);
    _hasOwnProperty.call(json, "shmSize") && (this.shmSize = json.shmSize);
    _hasOwnProperty.call(json, "shmKey") && (this.shmKey = json.shmKey);
    _hasOwnProperty.call(json, "isContainer") && (this.isContainer = json.isContainer);
    _hasOwnProperty.call(json, "binlogPort") && (this.binlogPort = json.binlogPort);
    _hasOwnProperty.call(json, "cachePort") && (this.cachePort = json.cachePort);
    _hasOwnProperty.call(json, "wcachePort") && (this.wcachePort = json.wcachePort);
    _hasOwnProperty.call(json, "backupPort") && (this.backupPort = json.backupPort);
    _hasOwnProperty.call(json, "routerPort") && (this.routerPort = json.routerPort);
    _hasOwnProperty.call(json, "controlackPort") && (this.controlackPort = json.controlackPort);
    return this;
};
DCache.CacheHostParam.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.CacheHostParam.new = function () {
    return new DCache.CacheHostParam();
};
DCache.CacheHostParam.create = function (is) {
    return DCache.CacheHostParam._readFrom(is);
};

DCache.SingleKeyConfParam = function() {
    this.avgDataSize = "";
    this.readDbFlag = "";
    this.enableErase = "";
    this.eraseRadio = "";
    this.saveOnlyKey = "";
    this.dbFlag = "";
    this.dbAccessServant = "";
    this.startExpireThread = "";
    this.expireDb = "";
    this.hotBackupDays = "";
    this.coldBackupDays = "";
    this._classname = "DCache.SingleKeyConfParam";
};
DCache.SingleKeyConfParam._classname = "DCache.SingleKeyConfParam";
DCache.SingleKeyConfParam._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.SingleKeyConfParam._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.SingleKeyConfParam._readFrom = function (is) {
    var tmp = new DCache.SingleKeyConfParam;
    tmp.avgDataSize = is.readString(0, true, "");
    tmp.readDbFlag = is.readString(1, true, "");
    tmp.enableErase = is.readString(2, true, "");
    tmp.eraseRadio = is.readString(3, true, "");
    tmp.saveOnlyKey = is.readString(4, true, "");
    tmp.dbFlag = is.readString(5, true, "");
    tmp.dbAccessServant = is.readString(6, true, "");
    tmp.startExpireThread = is.readString(7, true, "");
    tmp.expireDb = is.readString(8, true, "");
    tmp.hotBackupDays = is.readString(9, false, "");
    tmp.coldBackupDays = is.readString(10, false, "");
    return tmp;
};
DCache.SingleKeyConfParam.prototype._writeTo = function (os) {
    os.writeString(0, this.avgDataSize);
    os.writeString(1, this.readDbFlag);
    os.writeString(2, this.enableErase);
    os.writeString(3, this.eraseRadio);
    os.writeString(4, this.saveOnlyKey);
    os.writeString(5, this.dbFlag);
    os.writeString(6, this.dbAccessServant);
    os.writeString(7, this.startExpireThread);
    os.writeString(8, this.expireDb);
    os.writeString(9, this.hotBackupDays);
    os.writeString(10, this.coldBackupDays);
};
DCache.SingleKeyConfParam.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.SingleKeyConfParam.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.SingleKeyConfParam.prototype.toObject = function() { 
    return {
        "avgDataSize" : this.avgDataSize,
        "readDbFlag" : this.readDbFlag,
        "enableErase" : this.enableErase,
        "eraseRadio" : this.eraseRadio,
        "saveOnlyKey" : this.saveOnlyKey,
        "dbFlag" : this.dbFlag,
        "dbAccessServant" : this.dbAccessServant,
        "startExpireThread" : this.startExpireThread,
        "expireDb" : this.expireDb,
        "hotBackupDays" : this.hotBackupDays,
        "coldBackupDays" : this.coldBackupDays
    };
};
DCache.SingleKeyConfParam.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "avgDataSize") && (this.avgDataSize = json.avgDataSize);
    _hasOwnProperty.call(json, "readDbFlag") && (this.readDbFlag = json.readDbFlag);
    _hasOwnProperty.call(json, "enableErase") && (this.enableErase = json.enableErase);
    _hasOwnProperty.call(json, "eraseRadio") && (this.eraseRadio = json.eraseRadio);
    _hasOwnProperty.call(json, "saveOnlyKey") && (this.saveOnlyKey = json.saveOnlyKey);
    _hasOwnProperty.call(json, "dbFlag") && (this.dbFlag = json.dbFlag);
    _hasOwnProperty.call(json, "dbAccessServant") && (this.dbAccessServant = json.dbAccessServant);
    _hasOwnProperty.call(json, "startExpireThread") && (this.startExpireThread = json.startExpireThread);
    _hasOwnProperty.call(json, "expireDb") && (this.expireDb = json.expireDb);
    _hasOwnProperty.call(json, "hotBackupDays") && (this.hotBackupDays = json.hotBackupDays);
    _hasOwnProperty.call(json, "coldBackupDays") && (this.coldBackupDays = json.coldBackupDays);
    return this;
};
DCache.SingleKeyConfParam.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.SingleKeyConfParam.new = function () {
    return new DCache.SingleKeyConfParam();
};
DCache.SingleKeyConfParam.create = function (is) {
    return DCache.SingleKeyConfParam._readFrom(is);
};

DCache.MultiKeyConfParam = function() {
    this.avgDataSize = "";
    this.readDbFlag = "";
    this.enableErase = "";
    this.eraseRadio = "";
    this.saveOnlyKey = "";
    this.dbFlag = "";
    this.dbAccessServant = "";
    this.startExpireThread = "";
    this.expireDb = "";
    this.cacheType = "";
    this.hotBackupDays = "";
    this.coldBackupDays = "";
    this._classname = "DCache.MultiKeyConfParam";
};
DCache.MultiKeyConfParam._classname = "DCache.MultiKeyConfParam";
DCache.MultiKeyConfParam._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.MultiKeyConfParam._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.MultiKeyConfParam._readFrom = function (is) {
    var tmp = new DCache.MultiKeyConfParam;
    tmp.avgDataSize = is.readString(0, true, "");
    tmp.readDbFlag = is.readString(1, true, "");
    tmp.enableErase = is.readString(2, true, "");
    tmp.eraseRadio = is.readString(3, true, "");
    tmp.saveOnlyKey = is.readString(4, true, "");
    tmp.dbFlag = is.readString(5, true, "");
    tmp.dbAccessServant = is.readString(6, true, "");
    tmp.startExpireThread = is.readString(7, true, "");
    tmp.expireDb = is.readString(8, true, "");
    tmp.cacheType = is.readString(9, true, "");
    tmp.hotBackupDays = is.readString(10, false, "");
    tmp.coldBackupDays = is.readString(11, false, "");
    return tmp;
};
DCache.MultiKeyConfParam.prototype._writeTo = function (os) {
    os.writeString(0, this.avgDataSize);
    os.writeString(1, this.readDbFlag);
    os.writeString(2, this.enableErase);
    os.writeString(3, this.eraseRadio);
    os.writeString(4, this.saveOnlyKey);
    os.writeString(5, this.dbFlag);
    os.writeString(6, this.dbAccessServant);
    os.writeString(7, this.startExpireThread);
    os.writeString(8, this.expireDb);
    os.writeString(9, this.cacheType);
    os.writeString(10, this.hotBackupDays);
    os.writeString(11, this.coldBackupDays);
};
DCache.MultiKeyConfParam.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.MultiKeyConfParam.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.MultiKeyConfParam.prototype.toObject = function() { 
    return {
        "avgDataSize" : this.avgDataSize,
        "readDbFlag" : this.readDbFlag,
        "enableErase" : this.enableErase,
        "eraseRadio" : this.eraseRadio,
        "saveOnlyKey" : this.saveOnlyKey,
        "dbFlag" : this.dbFlag,
        "dbAccessServant" : this.dbAccessServant,
        "startExpireThread" : this.startExpireThread,
        "expireDb" : this.expireDb,
        "cacheType" : this.cacheType,
        "hotBackupDays" : this.hotBackupDays,
        "coldBackupDays" : this.coldBackupDays
    };
};
DCache.MultiKeyConfParam.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "avgDataSize") && (this.avgDataSize = json.avgDataSize);
    _hasOwnProperty.call(json, "readDbFlag") && (this.readDbFlag = json.readDbFlag);
    _hasOwnProperty.call(json, "enableErase") && (this.enableErase = json.enableErase);
    _hasOwnProperty.call(json, "eraseRadio") && (this.eraseRadio = json.eraseRadio);
    _hasOwnProperty.call(json, "saveOnlyKey") && (this.saveOnlyKey = json.saveOnlyKey);
    _hasOwnProperty.call(json, "dbFlag") && (this.dbFlag = json.dbFlag);
    _hasOwnProperty.call(json, "dbAccessServant") && (this.dbAccessServant = json.dbAccessServant);
    _hasOwnProperty.call(json, "startExpireThread") && (this.startExpireThread = json.startExpireThread);
    _hasOwnProperty.call(json, "expireDb") && (this.expireDb = json.expireDb);
    _hasOwnProperty.call(json, "cacheType") && (this.cacheType = json.cacheType);
    _hasOwnProperty.call(json, "hotBackupDays") && (this.hotBackupDays = json.hotBackupDays);
    _hasOwnProperty.call(json, "coldBackupDays") && (this.coldBackupDays = json.coldBackupDays);
    return this;
};
DCache.MultiKeyConfParam.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.MultiKeyConfParam.new = function () {
    return new DCache.MultiKeyConfParam();
};
DCache.MultiKeyConfParam.create = function (is) {
    return DCache.MultiKeyConfParam._readFrom(is);
};

DCache.RecordParam = function() {
    this.fieldName = "";
    this.keyType = "";
    this.dataType = "";
    this.property = "";
    this.defaultValue = "";
    this.maxLen = 0;
    this._classname = "DCache.RecordParam";
};
DCache.RecordParam._classname = "DCache.RecordParam";
DCache.RecordParam._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.RecordParam._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.RecordParam._readFrom = function (is) {
    var tmp = new DCache.RecordParam;
    tmp.fieldName = is.readString(0, true, "");
    tmp.keyType = is.readString(1, true, "");
    tmp.dataType = is.readString(2, true, "");
    tmp.property = is.readString(3, true, "");
    tmp.defaultValue = is.readString(4, true, "");
    tmp.maxLen = is.readInt32(5, true, 0);
    return tmp;
};
DCache.RecordParam.prototype._writeTo = function (os) {
    os.writeString(0, this.fieldName);
    os.writeString(1, this.keyType);
    os.writeString(2, this.dataType);
    os.writeString(3, this.property);
    os.writeString(4, this.defaultValue);
    os.writeInt32(5, this.maxLen);
};
DCache.RecordParam.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.RecordParam.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.RecordParam.prototype.toObject = function() { 
    return {
        "fieldName" : this.fieldName,
        "keyType" : this.keyType,
        "dataType" : this.dataType,
        "property" : this.property,
        "defaultValue" : this.defaultValue,
        "maxLen" : this.maxLen
    };
};
DCache.RecordParam.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "fieldName") && (this.fieldName = json.fieldName);
    _hasOwnProperty.call(json, "keyType") && (this.keyType = json.keyType);
    _hasOwnProperty.call(json, "dataType") && (this.dataType = json.dataType);
    _hasOwnProperty.call(json, "property") && (this.property = json.property);
    _hasOwnProperty.call(json, "defaultValue") && (this.defaultValue = json.defaultValue);
    _hasOwnProperty.call(json, "maxLen") && (this.maxLen = json.maxLen);
    return this;
};
DCache.RecordParam.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.RecordParam.new = function () {
    return new DCache.RecordParam();
};
DCache.RecordParam.create = function (is) {
    return DCache.RecordParam._readFrom(is);
};

DCache.RouterConsistRes = function() {
    this.iFlag = 0;
    this.sInfo = "";
    this._classname = "DCache.RouterConsistRes";
};
DCache.RouterConsistRes._classname = "DCache.RouterConsistRes";
DCache.RouterConsistRes._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.RouterConsistRes._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.RouterConsistRes._readFrom = function (is) {
    var tmp = new DCache.RouterConsistRes;
    tmp.iFlag = is.readInt32(0, true, 0);
    tmp.sInfo = is.readString(1, true, "");
    return tmp;
};
DCache.RouterConsistRes.prototype._writeTo = function (os) {
    os.writeInt32(0, this.iFlag);
    os.writeString(1, this.sInfo);
};
DCache.RouterConsistRes.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.RouterConsistRes.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.RouterConsistRes.prototype.toObject = function() { 
    return {
        "iFlag" : this.iFlag,
        "sInfo" : this.sInfo
    };
};
DCache.RouterConsistRes.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "iFlag") && (this.iFlag = json.iFlag);
    _hasOwnProperty.call(json, "sInfo") && (this.sInfo = json.sInfo);
    return this;
};
DCache.RouterConsistRes.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.RouterConsistRes.new = function () {
    return new DCache.RouterConsistRes();
};
DCache.RouterConsistRes.create = function (is) {
    return DCache.RouterConsistRes._readFrom(is);
};

DCache.ModuleServer = function() {
    this.serverName = "";
    this.idc = "";
    this.type = "";
    this._classname = "DCache.ModuleServer";
};
DCache.ModuleServer._classname = "DCache.ModuleServer";
DCache.ModuleServer._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.ModuleServer._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.ModuleServer._readFrom = function (is) {
    var tmp = new DCache.ModuleServer;
    tmp.serverName = is.readString(0, true, "");
    tmp.idc = is.readString(1, true, "");
    tmp.type = is.readString(2, true, "");
    return tmp;
};
DCache.ModuleServer.prototype._writeTo = function (os) {
    os.writeString(0, this.serverName);
    os.writeString(1, this.idc);
    os.writeString(2, this.type);
};
DCache.ModuleServer.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.ModuleServer.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.ModuleServer.prototype.toObject = function() { 
    return {
        "serverName" : this.serverName,
        "idc" : this.idc,
        "type" : this.type
    };
};
DCache.ModuleServer.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "serverName") && (this.serverName = json.serverName);
    _hasOwnProperty.call(json, "idc") && (this.idc = json.idc);
    _hasOwnProperty.call(json, "type") && (this.type = json.type);
    return this;
};
DCache.ModuleServer.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.ModuleServer.new = function () {
    return new DCache.ModuleServer();
};
DCache.ModuleServer.create = function (is) {
    return DCache.ModuleServer._readFrom(is);
};

DCache.TransferRecord = function() {
    this.appName = "";
    this.moduleName = "";
    this.srcGroupName = "";
    this.dstGroupName = "";
    this.status = DCache.TransferStatus.NEW_TASK;
    this.progress = 0;
    this.type = DCache.TransferType.UNSPECIFIED_TYPE;
    this.beginTime = "";
    this.endTime = "";
    this._classname = "DCache.TransferRecord";
};
DCache.TransferRecord._classname = "DCache.TransferRecord";
DCache.TransferRecord._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.TransferRecord._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.TransferRecord._readFrom = function (is) {
    var tmp = new DCache.TransferRecord;
    tmp.appName = is.readString(0, true, "");
    tmp.moduleName = is.readString(1, true, "");
    tmp.srcGroupName = is.readString(2, true, "");
    tmp.dstGroupName = is.readString(3, true, "");
    tmp.status = is.readInt32(4, true, DCache.TransferStatus.NEW_TASK);
    tmp.progress = is.readInt32(5, true, 0);
    tmp.type = is.readInt32(6, true, DCache.TransferType.UNSPECIFIED_TYPE);
    tmp.beginTime = is.readString(7, true, "");
    tmp.endTime = is.readString(8, false, "");
    return tmp;
};
DCache.TransferRecord.prototype._writeTo = function (os) {
    os.writeString(0, this.appName);
    os.writeString(1, this.moduleName);
    os.writeString(2, this.srcGroupName);
    os.writeString(3, this.dstGroupName);
    os.writeInt32(4, this.status);
    os.writeInt32(5, this.progress);
    os.writeInt32(6, this.type);
    os.writeString(7, this.beginTime);
    os.writeString(8, this.endTime);
};
DCache.TransferRecord.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.TransferRecord.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.TransferRecord.prototype.toObject = function() { 
    return {
        "appName" : this.appName,
        "moduleName" : this.moduleName,
        "srcGroupName" : this.srcGroupName,
        "dstGroupName" : this.dstGroupName,
        "status" : this.status,
        "progress" : this.progress,
        "type" : this.type,
        "beginTime" : this.beginTime,
        "endTime" : this.endTime
    };
};
DCache.TransferRecord.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "appName") && (this.appName = json.appName);
    _hasOwnProperty.call(json, "moduleName") && (this.moduleName = json.moduleName);
    _hasOwnProperty.call(json, "srcGroupName") && (this.srcGroupName = json.srcGroupName);
    _hasOwnProperty.call(json, "dstGroupName") && (this.dstGroupName = json.dstGroupName);
    _hasOwnProperty.call(json, "status") && (this.status = json.status);
    _hasOwnProperty.call(json, "progress") && (this.progress = json.progress);
    _hasOwnProperty.call(json, "type") && (this.type = json.type);
    _hasOwnProperty.call(json, "beginTime") && (this.beginTime = json.beginTime);
    _hasOwnProperty.call(json, "endTime") && (this.endTime = json.endTime);
    return this;
};
DCache.TransferRecord.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.TransferRecord.new = function () {
    return new DCache.TransferRecord();
};
DCache.TransferRecord.create = function (is) {
    return DCache.TransferRecord._readFrom(is);
};

DCache.SwitchRecord = function() {
    this.appName = "";
    this.moduleName = "";
    this.groupName = "";
    this.masterServer = "";
    this.slaveServer = "";
    this.mirrorIdc = "";
    this.masterMirror = "";
    this.slaveMirror = "";
    this.switchTime = "";
    this.modifyTime = "";
    this.comment = "";
    this.dbFlag = "";
    this.enableErase = "";
    this.switchType = 0;
    this.switchResult = 0;
    this.groupStatus = 0;
    this.memSize = "";
    this.switchProperty = "";
    this._classname = "DCache.SwitchRecord";
};
DCache.SwitchRecord._classname = "DCache.SwitchRecord";
DCache.SwitchRecord._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.SwitchRecord._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.SwitchRecord._readFrom = function (is) {
    var tmp = new DCache.SwitchRecord;
    tmp.appName = is.readString(0, true, "");
    tmp.moduleName = is.readString(1, true, "");
    tmp.groupName = is.readString(2, true, "");
    tmp.masterServer = is.readString(3, true, "");
    tmp.slaveServer = is.readString(4, true, "");
    tmp.mirrorIdc = is.readString(5, true, "");
    tmp.masterMirror = is.readString(6, true, "");
    tmp.slaveMirror = is.readString(7, true, "");
    tmp.switchTime = is.readString(8, true, "");
    tmp.modifyTime = is.readString(9, true, "");
    tmp.comment = is.readString(10, true, "");
    tmp.dbFlag = is.readString(11, true, "");
    tmp.enableErase = is.readString(12, true, "");
    tmp.switchType = is.readInt32(13, true, 0);
    tmp.switchResult = is.readInt32(14, true, 0);
    tmp.groupStatus = is.readInt32(15, true, 0);
    tmp.memSize = is.readString(16, true, "");
    tmp.switchProperty = is.readString(17, false, "");
    return tmp;
};
DCache.SwitchRecord.prototype._writeTo = function (os) {
    os.writeString(0, this.appName);
    os.writeString(1, this.moduleName);
    os.writeString(2, this.groupName);
    os.writeString(3, this.masterServer);
    os.writeString(4, this.slaveServer);
    os.writeString(5, this.mirrorIdc);
    os.writeString(6, this.masterMirror);
    os.writeString(7, this.slaveMirror);
    os.writeString(8, this.switchTime);
    os.writeString(9, this.modifyTime);
    os.writeString(10, this.comment);
    os.writeString(11, this.dbFlag);
    os.writeString(12, this.enableErase);
    os.writeInt32(13, this.switchType);
    os.writeInt32(14, this.switchResult);
    os.writeInt32(15, this.groupStatus);
    os.writeString(16, this.memSize);
    os.writeString(17, this.switchProperty);
};
DCache.SwitchRecord.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.SwitchRecord.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.SwitchRecord.prototype.toObject = function() { 
    return {
        "appName" : this.appName,
        "moduleName" : this.moduleName,
        "groupName" : this.groupName,
        "masterServer" : this.masterServer,
        "slaveServer" : this.slaveServer,
        "mirrorIdc" : this.mirrorIdc,
        "masterMirror" : this.masterMirror,
        "slaveMirror" : this.slaveMirror,
        "switchTime" : this.switchTime,
        "modifyTime" : this.modifyTime,
        "comment" : this.comment,
        "dbFlag" : this.dbFlag,
        "enableErase" : this.enableErase,
        "switchType" : this.switchType,
        "switchResult" : this.switchResult,
        "groupStatus" : this.groupStatus,
        "memSize" : this.memSize,
        "switchProperty" : this.switchProperty
    };
};
DCache.SwitchRecord.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "appName") && (this.appName = json.appName);
    _hasOwnProperty.call(json, "moduleName") && (this.moduleName = json.moduleName);
    _hasOwnProperty.call(json, "groupName") && (this.groupName = json.groupName);
    _hasOwnProperty.call(json, "masterServer") && (this.masterServer = json.masterServer);
    _hasOwnProperty.call(json, "slaveServer") && (this.slaveServer = json.slaveServer);
    _hasOwnProperty.call(json, "mirrorIdc") && (this.mirrorIdc = json.mirrorIdc);
    _hasOwnProperty.call(json, "masterMirror") && (this.masterMirror = json.masterMirror);
    _hasOwnProperty.call(json, "slaveMirror") && (this.slaveMirror = json.slaveMirror);
    _hasOwnProperty.call(json, "switchTime") && (this.switchTime = json.switchTime);
    _hasOwnProperty.call(json, "modifyTime") && (this.modifyTime = json.modifyTime);
    _hasOwnProperty.call(json, "comment") && (this.comment = json.comment);
    _hasOwnProperty.call(json, "dbFlag") && (this.dbFlag = json.dbFlag);
    _hasOwnProperty.call(json, "enableErase") && (this.enableErase = json.enableErase);
    _hasOwnProperty.call(json, "switchType") && (this.switchType = json.switchType);
    _hasOwnProperty.call(json, "switchResult") && (this.switchResult = json.switchResult);
    _hasOwnProperty.call(json, "groupStatus") && (this.groupStatus = json.groupStatus);
    _hasOwnProperty.call(json, "memSize") && (this.memSize = json.memSize);
    _hasOwnProperty.call(json, "switchProperty") && (this.switchProperty = json.switchProperty);
    return this;
};
DCache.SwitchRecord.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.SwitchRecord.new = function () {
    return new DCache.SwitchRecord();
};
DCache.SwitchRecord.create = function (is) {
    return DCache.SwitchRecord._readFrom(is);
};

DCache.ReleaseInfo = function() {
    this.appName = "";
    this.serverName = "";
    this.nodeName = "";
    this.groupName = "";
    this.version = "";
    this.user = "";
    this.md5 = "";
    this.status = 0;
    this.errmsg = "";
    this.ostype = "";
    this._classname = "DCache.ReleaseInfo";
};
DCache.ReleaseInfo._classname = "DCache.ReleaseInfo";
DCache.ReleaseInfo._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.ReleaseInfo._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.ReleaseInfo._readFrom = function (is) {
    var tmp = new DCache.ReleaseInfo;
    tmp.appName = is.readString(0, true, "");
    tmp.serverName = is.readString(1, true, "");
    tmp.nodeName = is.readString(2, true, "");
    tmp.groupName = is.readString(3, true, "");
    tmp.version = is.readString(4, true, "");
    tmp.user = is.readString(5, true, "");
    tmp.md5 = is.readString(6, true, "");
    tmp.status = is.readInt32(7, true, 0);
    tmp.errmsg = is.readString(8, false, "");
    tmp.ostype = is.readString(9, false, "");
    return tmp;
};
DCache.ReleaseInfo.prototype._writeTo = function (os) {
    os.writeString(0, this.appName);
    os.writeString(1, this.serverName);
    os.writeString(2, this.nodeName);
    os.writeString(3, this.groupName);
    os.writeString(4, this.version);
    os.writeString(5, this.user);
    os.writeString(6, this.md5);
    os.writeInt32(7, this.status);
    os.writeString(8, this.errmsg);
    os.writeString(9, this.ostype);
};
DCache.ReleaseInfo.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.ReleaseInfo.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.ReleaseInfo.prototype.toObject = function() { 
    return {
        "appName" : this.appName,
        "serverName" : this.serverName,
        "nodeName" : this.nodeName,
        "groupName" : this.groupName,
        "version" : this.version,
        "user" : this.user,
        "md5" : this.md5,
        "status" : this.status,
        "errmsg" : this.errmsg,
        "ostype" : this.ostype
    };
};
DCache.ReleaseInfo.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "appName") && (this.appName = json.appName);
    _hasOwnProperty.call(json, "serverName") && (this.serverName = json.serverName);
    _hasOwnProperty.call(json, "nodeName") && (this.nodeName = json.nodeName);
    _hasOwnProperty.call(json, "groupName") && (this.groupName = json.groupName);
    _hasOwnProperty.call(json, "version") && (this.version = json.version);
    _hasOwnProperty.call(json, "user") && (this.user = json.user);
    _hasOwnProperty.call(json, "md5") && (this.md5 = json.md5);
    _hasOwnProperty.call(json, "status") && (this.status = json.status);
    _hasOwnProperty.call(json, "errmsg") && (this.errmsg = json.errmsg);
    _hasOwnProperty.call(json, "ostype") && (this.ostype = json.ostype);
    return this;
};
DCache.ReleaseInfo.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.ReleaseInfo.new = function () {
    return new DCache.ReleaseInfo();
};
DCache.ReleaseInfo.create = function (is) {
    return DCache.ReleaseInfo._readFrom(is);
};

DCache.CacheServerInfo = function() {
    this.serverName = "";
    this.serverIp = "";
    this.serverType = "";
    this.groupName = "";
    this.idcArea = "";
    this.memSize = "";
    this.routerPageNo = 0;
    this._classname = "DCache.CacheServerInfo";
};
DCache.CacheServerInfo._classname = "DCache.CacheServerInfo";
DCache.CacheServerInfo._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.CacheServerInfo._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.CacheServerInfo._readFrom = function (is) {
    var tmp = new DCache.CacheServerInfo;
    tmp.serverName = is.readString(0, true, "");
    tmp.serverIp = is.readString(1, true, "");
    tmp.serverType = is.readString(2, true, "");
    tmp.groupName = is.readString(3, true, "");
    tmp.idcArea = is.readString(4, true, "");
    tmp.memSize = is.readString(5, true, "");
    tmp.routerPageNo = is.readInt64(6, true, 0);
    return tmp;
};
DCache.CacheServerInfo.prototype._writeTo = function (os) {
    os.writeString(0, this.serverName);
    os.writeString(1, this.serverIp);
    os.writeString(2, this.serverType);
    os.writeString(3, this.groupName);
    os.writeString(4, this.idcArea);
    os.writeString(5, this.memSize);
    os.writeInt64(6, this.routerPageNo);
};
DCache.CacheServerInfo.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.CacheServerInfo.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.CacheServerInfo.prototype.toObject = function() { 
    return {
        "serverName" : this.serverName,
        "serverIp" : this.serverIp,
        "serverType" : this.serverType,
        "groupName" : this.groupName,
        "idcArea" : this.idcArea,
        "memSize" : this.memSize,
        "routerPageNo" : this.routerPageNo
    };
};
DCache.CacheServerInfo.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "serverName") && (this.serverName = json.serverName);
    _hasOwnProperty.call(json, "serverIp") && (this.serverIp = json.serverIp);
    _hasOwnProperty.call(json, "serverType") && (this.serverType = json.serverType);
    _hasOwnProperty.call(json, "groupName") && (this.groupName = json.groupName);
    _hasOwnProperty.call(json, "idcArea") && (this.idcArea = json.idcArea);
    _hasOwnProperty.call(json, "memSize") && (this.memSize = json.memSize);
    _hasOwnProperty.call(json, "routerPageNo") && (this.routerPageNo = json.routerPageNo);
    return this;
};
DCache.CacheServerInfo.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.CacheServerInfo.new = function () {
    return new DCache.CacheServerInfo();
};
DCache.CacheServerInfo.create = function (is) {
    return DCache.CacheServerInfo._readFrom(is);
};

DCache.InstallAppReq = function() {
    this.appName = "";
    this.routerParam = new DCache.RouterParam;
    this.proxyParam = new DCache.ProxyParam;
    this.version = "";
    this.replace = false;
    this._classname = "DCache.InstallAppReq";
};
DCache.InstallAppReq._classname = "DCache.InstallAppReq";
DCache.InstallAppReq._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.InstallAppReq._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.InstallAppReq._readFrom = function (is) {
    var tmp = new DCache.InstallAppReq;
    tmp.appName = is.readString(0, true, "");
    tmp.routerParam = is.readStruct(1, true, DCache.RouterParam);
    tmp.proxyParam = is.readStruct(2, true, DCache.ProxyParam);
    tmp.version = is.readString(3, true, "");
    tmp.replace = is.readBoolean(4, true, false);
    return tmp;
};
DCache.InstallAppReq.prototype._writeTo = function (os) {
    os.writeString(0, this.appName);
    os.writeStruct(1, this.routerParam);
    os.writeStruct(2, this.proxyParam);
    os.writeString(3, this.version);
    os.writeBoolean(4, this.replace);
};
DCache.InstallAppReq.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.InstallAppReq.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.InstallAppReq.prototype.toObject = function() { 
    return {
        "appName" : this.appName,
        "routerParam" : this.routerParam.toObject(),
        "proxyParam" : this.proxyParam.toObject(),
        "version" : this.version,
        "replace" : this.replace
    };
};
DCache.InstallAppReq.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "appName") && (this.appName = json.appName);
    _hasOwnProperty.call(json, "routerParam") && (this.routerParam.readFromObject(json.routerParam));
    _hasOwnProperty.call(json, "proxyParam") && (this.proxyParam.readFromObject(json.proxyParam));
    _hasOwnProperty.call(json, "version") && (this.version = json.version);
    _hasOwnProperty.call(json, "replace") && (this.replace = json.replace);
    return this;
};
DCache.InstallAppReq.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.InstallAppReq.new = function () {
    return new DCache.InstallAppReq();
};
DCache.InstallAppReq.create = function (is) {
    return DCache.InstallAppReq._readFrom(is);
};

DCache.InstallAppRsp = function() {
    this.errMsg = "";
    this._classname = "DCache.InstallAppRsp";
};
DCache.InstallAppRsp._classname = "DCache.InstallAppRsp";
DCache.InstallAppRsp._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.InstallAppRsp._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.InstallAppRsp._readFrom = function (is) {
    var tmp = new DCache.InstallAppRsp;
    tmp.errMsg = is.readString(0, true, "");
    return tmp;
};
DCache.InstallAppRsp.prototype._writeTo = function (os) {
    os.writeString(0, this.errMsg);
};
DCache.InstallAppRsp.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.InstallAppRsp.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.InstallAppRsp.prototype.toObject = function() { 
    return {
        "errMsg" : this.errMsg
    };
};
DCache.InstallAppRsp.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "errMsg") && (this.errMsg = json.errMsg);
    return this;
};
DCache.InstallAppRsp.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.InstallAppRsp.new = function () {
    return new DCache.InstallAppRsp();
};
DCache.InstallAppRsp.create = function (is) {
    return DCache.InstallAppRsp._readFrom(is);
};

DCache.InstallKVCacheReq = function() {
    this.appName = "";
    this.moduleName = "";
    this.kvCacheHost = new TodoStream.List(DCache.CacheHostParam);
    this.kvCacheConf = new DCache.SingleKeyConfParam;
    this.version = "";
    this.replace = false;
    this._classname = "DCache.InstallKVCacheReq";
};
DCache.InstallKVCacheReq._classname = "DCache.InstallKVCacheReq";
DCache.InstallKVCacheReq._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.InstallKVCacheReq._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.InstallKVCacheReq._readFrom = function (is) {
    var tmp = new DCache.InstallKVCacheReq;
    tmp.appName = is.readString(0, true, "");
    tmp.moduleName = is.readString(1, true, "");
    tmp.kvCacheHost = is.readList(2, true, TodoStream.List(DCache.CacheHostParam));
    tmp.kvCacheConf = is.readStruct(3, true, DCache.SingleKeyConfParam);
    tmp.version = is.readString(4, true, "");
    tmp.replace = is.readBoolean(5, true, false);
    return tmp;
};
DCache.InstallKVCacheReq.prototype._writeTo = function (os) {
    os.writeString(0, this.appName);
    os.writeString(1, this.moduleName);
    os.writeList(2, this.kvCacheHost);
    os.writeStruct(3, this.kvCacheConf);
    os.writeString(4, this.version);
    os.writeBoolean(5, this.replace);
};
DCache.InstallKVCacheReq.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.InstallKVCacheReq.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.InstallKVCacheReq.prototype.toObject = function() { 
    return {
        "appName" : this.appName,
        "moduleName" : this.moduleName,
        "kvCacheHost" : this.kvCacheHost.toObject(),
        "kvCacheConf" : this.kvCacheConf.toObject(),
        "version" : this.version,
        "replace" : this.replace
    };
};
DCache.InstallKVCacheReq.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "appName") && (this.appName = json.appName);
    _hasOwnProperty.call(json, "moduleName") && (this.moduleName = json.moduleName);
    _hasOwnProperty.call(json, "kvCacheHost") && (this.kvCacheHost.readFromObject(json.kvCacheHost));
    _hasOwnProperty.call(json, "kvCacheConf") && (this.kvCacheConf.readFromObject(json.kvCacheConf));
    _hasOwnProperty.call(json, "version") && (this.version = json.version);
    _hasOwnProperty.call(json, "replace") && (this.replace = json.replace);
    return this;
};
DCache.InstallKVCacheReq.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.InstallKVCacheReq.new = function () {
    return new DCache.InstallKVCacheReq();
};
DCache.InstallKVCacheReq.create = function (is) {
    return DCache.InstallKVCacheReq._readFrom(is);
};

DCache.InstallKVCacheRsp = function() {
    this.rcRes = new DCache.RouterConsistRes;
    this.errMsg = "";
    this._classname = "DCache.InstallKVCacheRsp";
};
DCache.InstallKVCacheRsp._classname = "DCache.InstallKVCacheRsp";
DCache.InstallKVCacheRsp._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.InstallKVCacheRsp._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.InstallKVCacheRsp._readFrom = function (is) {
    var tmp = new DCache.InstallKVCacheRsp;
    tmp.rcRes = is.readStruct(0, true, DCache.RouterConsistRes);
    tmp.errMsg = is.readString(1, true, "");
    return tmp;
};
DCache.InstallKVCacheRsp.prototype._writeTo = function (os) {
    os.writeStruct(0, this.rcRes);
    os.writeString(1, this.errMsg);
};
DCache.InstallKVCacheRsp.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.InstallKVCacheRsp.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.InstallKVCacheRsp.prototype.toObject = function() { 
    return {
        "rcRes" : this.rcRes.toObject(),
        "errMsg" : this.errMsg
    };
};
DCache.InstallKVCacheRsp.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "rcRes") && (this.rcRes.readFromObject(json.rcRes));
    _hasOwnProperty.call(json, "errMsg") && (this.errMsg = json.errMsg);
    return this;
};
DCache.InstallKVCacheRsp.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.InstallKVCacheRsp.new = function () {
    return new DCache.InstallKVCacheRsp();
};
DCache.InstallKVCacheRsp.create = function (is) {
    return DCache.InstallKVCacheRsp._readFrom(is);
};

DCache.InstallMKVCacheReq = function() {
    this.appName = "";
    this.moduleName = "";
    this.mkvCacheHost = new TodoStream.List(DCache.CacheHostParam);
    this.mkvCacheConf = new DCache.MultiKeyConfParam;
    this.fieldParam = new TodoStream.List(DCache.RecordParam);
    this.version = "";
    this.replace = false;
    this._classname = "DCache.InstallMKVCacheReq";
};
DCache.InstallMKVCacheReq._classname = "DCache.InstallMKVCacheReq";
DCache.InstallMKVCacheReq._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.InstallMKVCacheReq._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.InstallMKVCacheReq._readFrom = function (is) {
    var tmp = new DCache.InstallMKVCacheReq;
    tmp.appName = is.readString(0, true, "");
    tmp.moduleName = is.readString(1, true, "");
    tmp.mkvCacheHost = is.readList(2, true, TodoStream.List(DCache.CacheHostParam));
    tmp.mkvCacheConf = is.readStruct(3, true, DCache.MultiKeyConfParam);
    tmp.fieldParam = is.readList(4, true, TodoStream.List(DCache.RecordParam));
    tmp.version = is.readString(5, true, "");
    tmp.replace = is.readBoolean(6, true, false);
    return tmp;
};
DCache.InstallMKVCacheReq.prototype._writeTo = function (os) {
    os.writeString(0, this.appName);
    os.writeString(1, this.moduleName);
    os.writeList(2, this.mkvCacheHost);
    os.writeStruct(3, this.mkvCacheConf);
    os.writeList(4, this.fieldParam);
    os.writeString(5, this.version);
    os.writeBoolean(6, this.replace);
};
DCache.InstallMKVCacheReq.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.InstallMKVCacheReq.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.InstallMKVCacheReq.prototype.toObject = function() { 
    return {
        "appName" : this.appName,
        "moduleName" : this.moduleName,
        "mkvCacheHost" : this.mkvCacheHost.toObject(),
        "mkvCacheConf" : this.mkvCacheConf.toObject(),
        "fieldParam" : this.fieldParam.toObject(),
        "version" : this.version,
        "replace" : this.replace
    };
};
DCache.InstallMKVCacheReq.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "appName") && (this.appName = json.appName);
    _hasOwnProperty.call(json, "moduleName") && (this.moduleName = json.moduleName);
    _hasOwnProperty.call(json, "mkvCacheHost") && (this.mkvCacheHost.readFromObject(json.mkvCacheHost));
    _hasOwnProperty.call(json, "mkvCacheConf") && (this.mkvCacheConf.readFromObject(json.mkvCacheConf));
    _hasOwnProperty.call(json, "fieldParam") && (this.fieldParam.readFromObject(json.fieldParam));
    _hasOwnProperty.call(json, "version") && (this.version = json.version);
    _hasOwnProperty.call(json, "replace") && (this.replace = json.replace);
    return this;
};
DCache.InstallMKVCacheReq.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.InstallMKVCacheReq.new = function () {
    return new DCache.InstallMKVCacheReq();
};
DCache.InstallMKVCacheReq.create = function (is) {
    return DCache.InstallMKVCacheReq._readFrom(is);
};

DCache.InstallMKVCacheRsp = function() {
    this.rcRes = new DCache.RouterConsistRes;
    this.errMsg = "";
    this._classname = "DCache.InstallMKVCacheRsp";
};
DCache.InstallMKVCacheRsp._classname = "DCache.InstallMKVCacheRsp";
DCache.InstallMKVCacheRsp._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.InstallMKVCacheRsp._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.InstallMKVCacheRsp._readFrom = function (is) {
    var tmp = new DCache.InstallMKVCacheRsp;
    tmp.rcRes = is.readStruct(0, true, DCache.RouterConsistRes);
    tmp.errMsg = is.readString(1, true, "");
    return tmp;
};
DCache.InstallMKVCacheRsp.prototype._writeTo = function (os) {
    os.writeStruct(0, this.rcRes);
    os.writeString(1, this.errMsg);
};
DCache.InstallMKVCacheRsp.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.InstallMKVCacheRsp.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.InstallMKVCacheRsp.prototype.toObject = function() { 
    return {
        "rcRes" : this.rcRes.toObject(),
        "errMsg" : this.errMsg
    };
};
DCache.InstallMKVCacheRsp.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "rcRes") && (this.rcRes.readFromObject(json.rcRes));
    _hasOwnProperty.call(json, "errMsg") && (this.errMsg = json.errMsg);
    return this;
};
DCache.InstallMKVCacheRsp.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.InstallMKVCacheRsp.new = function () {
    return new DCache.InstallMKVCacheRsp();
};
DCache.InstallMKVCacheRsp.create = function (is) {
    return DCache.InstallMKVCacheRsp._readFrom(is);
};

DCache.UninstallReq = function() {
    this.unType = DCache.UninstallType.SERVER;
    this.appName = "";
    this.moduleName = "";
    this.serverName = "";
    this.groupName = "";
    this._classname = "DCache.UninstallReq";
};
DCache.UninstallReq._classname = "DCache.UninstallReq";
DCache.UninstallReq._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.UninstallReq._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.UninstallReq._readFrom = function (is) {
    var tmp = new DCache.UninstallReq;
    tmp.unType = is.readInt32(0, true, DCache.UninstallType.SERVER);
    tmp.appName = is.readString(1, true, "");
    tmp.moduleName = is.readString(2, true, "");
    tmp.serverName = is.readString(3, false, "");
    tmp.groupName = is.readString(4, false, "");
    return tmp;
};
DCache.UninstallReq.prototype._writeTo = function (os) {
    os.writeInt32(0, this.unType);
    os.writeString(1, this.appName);
    os.writeString(2, this.moduleName);
    os.writeString(3, this.serverName);
    os.writeString(4, this.groupName);
};
DCache.UninstallReq.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.UninstallReq.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.UninstallReq.prototype.toObject = function() { 
    return {
        "unType" : this.unType,
        "appName" : this.appName,
        "moduleName" : this.moduleName,
        "serverName" : this.serverName,
        "groupName" : this.groupName
    };
};
DCache.UninstallReq.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "unType") && (this.unType = json.unType);
    _hasOwnProperty.call(json, "appName") && (this.appName = json.appName);
    _hasOwnProperty.call(json, "moduleName") && (this.moduleName = json.moduleName);
    _hasOwnProperty.call(json, "serverName") && (this.serverName = json.serverName);
    _hasOwnProperty.call(json, "groupName") && (this.groupName = json.groupName);
    return this;
};
DCache.UninstallReq.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.UninstallReq.new = function () {
    return new DCache.UninstallReq();
};
DCache.UninstallReq.create = function (is) {
    return DCache.UninstallReq._readFrom(is);
};

DCache.UninstallRsp = function() {
    this.errMsg = "";
    this._classname = "DCache.UninstallRsp";
};
DCache.UninstallRsp._classname = "DCache.UninstallRsp";
DCache.UninstallRsp._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.UninstallRsp._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.UninstallRsp._readFrom = function (is) {
    var tmp = new DCache.UninstallRsp;
    tmp.errMsg = is.readString(0, true, "");
    return tmp;
};
DCache.UninstallRsp.prototype._writeTo = function (os) {
    os.writeString(0, this.errMsg);
};
DCache.UninstallRsp.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.UninstallRsp.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.UninstallRsp.prototype.toObject = function() { 
    return {
        "errMsg" : this.errMsg
    };
};
DCache.UninstallRsp.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "errMsg") && (this.errMsg = json.errMsg);
    return this;
};
DCache.UninstallRsp.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.UninstallRsp.new = function () {
    return new DCache.UninstallRsp();
};
DCache.UninstallRsp.create = function (is) {
    return DCache.UninstallRsp._readFrom(is);
};

DCache.UninstallProgressRsp = function() {
    this.percent = 0;
    this.errMsg = "";
    this._classname = "DCache.UninstallProgressRsp";
};
DCache.UninstallProgressRsp._classname = "DCache.UninstallProgressRsp";
DCache.UninstallProgressRsp._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.UninstallProgressRsp._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.UninstallProgressRsp._readFrom = function (is) {
    var tmp = new DCache.UninstallProgressRsp;
    tmp.percent = is.readInt32(0, true, 0);
    tmp.errMsg = is.readString(1, true, "");
    return tmp;
};
DCache.UninstallProgressRsp.prototype._writeTo = function (os) {
    os.writeInt32(0, this.percent);
    os.writeString(1, this.errMsg);
};
DCache.UninstallProgressRsp.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.UninstallProgressRsp.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.UninstallProgressRsp.prototype.toObject = function() { 
    return {
        "percent" : this.percent,
        "errMsg" : this.errMsg
    };
};
DCache.UninstallProgressRsp.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "percent") && (this.percent = json.percent);
    _hasOwnProperty.call(json, "errMsg") && (this.errMsg = json.errMsg);
    return this;
};
DCache.UninstallProgressRsp.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.UninstallProgressRsp.new = function () {
    return new DCache.UninstallProgressRsp();
};
DCache.UninstallProgressRsp.create = function (is) {
    return DCache.UninstallProgressRsp._readFrom(is);
};

DCache.ReleaseReq = function() {
    this.releaseInfo = new TodoStream.List(DCache.ReleaseInfo);
    this._classname = "DCache.ReleaseReq";
};
DCache.ReleaseReq._classname = "DCache.ReleaseReq";
DCache.ReleaseReq._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.ReleaseReq._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.ReleaseReq._readFrom = function (is) {
    var tmp = new DCache.ReleaseReq;
    tmp.releaseInfo = is.readList(0, true, TodoStream.List(DCache.ReleaseInfo));
    return tmp;
};
DCache.ReleaseReq.prototype._writeTo = function (os) {
    os.writeList(0, this.releaseInfo);
};
DCache.ReleaseReq.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.ReleaseReq.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.ReleaseReq.prototype.toObject = function() { 
    return {
        "releaseInfo" : this.releaseInfo.toObject()
    };
};
DCache.ReleaseReq.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "releaseInfo") && (this.releaseInfo.readFromObject(json.releaseInfo));
    return this;
};
DCache.ReleaseReq.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.ReleaseReq.new = function () {
    return new DCache.ReleaseReq();
};
DCache.ReleaseReq.create = function (is) {
    return DCache.ReleaseReq._readFrom(is);
};

DCache.ReleaseRsp = function() {
    this.releaseId = 0;
    this.errMsg = "";
    this._classname = "DCache.ReleaseRsp";
};
DCache.ReleaseRsp._classname = "DCache.ReleaseRsp";
DCache.ReleaseRsp._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.ReleaseRsp._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.ReleaseRsp._readFrom = function (is) {
    var tmp = new DCache.ReleaseRsp;
    tmp.releaseId = is.readInt32(0, true, 0);
    tmp.errMsg = is.readString(1, true, "");
    return tmp;
};
DCache.ReleaseRsp.prototype._writeTo = function (os) {
    os.writeInt32(0, this.releaseId);
    os.writeString(1, this.errMsg);
};
DCache.ReleaseRsp.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.ReleaseRsp.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.ReleaseRsp.prototype.toObject = function() { 
    return {
        "releaseId" : this.releaseId,
        "errMsg" : this.errMsg
    };
};
DCache.ReleaseRsp.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "releaseId") && (this.releaseId = json.releaseId);
    _hasOwnProperty.call(json, "errMsg") && (this.errMsg = json.errMsg);
    return this;
};
DCache.ReleaseRsp.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.ReleaseRsp.new = function () {
    return new DCache.ReleaseRsp();
};
DCache.ReleaseRsp.create = function (is) {
    return DCache.ReleaseRsp._readFrom(is);
};

DCache.ReleaseProgressReq = function() {
    this.releaseId = 0;
    this._classname = "DCache.ReleaseProgressReq";
};
DCache.ReleaseProgressReq._classname = "DCache.ReleaseProgressReq";
DCache.ReleaseProgressReq._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.ReleaseProgressReq._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.ReleaseProgressReq._readFrom = function (is) {
    var tmp = new DCache.ReleaseProgressReq;
    tmp.releaseId = is.readInt32(0, true, 0);
    return tmp;
};
DCache.ReleaseProgressReq.prototype._writeTo = function (os) {
    os.writeInt32(0, this.releaseId);
};
DCache.ReleaseProgressReq.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.ReleaseProgressReq.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.ReleaseProgressReq.prototype.toObject = function() { 
    return {
        "releaseId" : this.releaseId
    };
};
DCache.ReleaseProgressReq.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "releaseId") && (this.releaseId = json.releaseId);
    return this;
};
DCache.ReleaseProgressReq.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.ReleaseProgressReq.new = function () {
    return new DCache.ReleaseProgressReq();
};
DCache.ReleaseProgressReq.create = function (is) {
    return DCache.ReleaseProgressReq._readFrom(is);
};

DCache.ReleaseProgressRsp = function() {
    this.releaseId = 0;
    this.percent = 0;
    this.releaseInfo = new TodoStream.List(DCache.ReleaseInfo);
    this.errMsg = "";
    this._classname = "DCache.ReleaseProgressRsp";
};
DCache.ReleaseProgressRsp._classname = "DCache.ReleaseProgressRsp";
DCache.ReleaseProgressRsp._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.ReleaseProgressRsp._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.ReleaseProgressRsp._readFrom = function (is) {
    var tmp = new DCache.ReleaseProgressRsp;
    tmp.releaseId = is.readInt32(0, true, 0);
    tmp.percent = is.readInt32(1, true, 0);
    tmp.releaseInfo = is.readList(2, true, TodoStream.List(DCache.ReleaseInfo));
    tmp.errMsg = is.readString(3, true, "");
    return tmp;
};
DCache.ReleaseProgressRsp.prototype._writeTo = function (os) {
    os.writeInt32(0, this.releaseId);
    os.writeInt32(1, this.percent);
    os.writeList(2, this.releaseInfo);
    os.writeString(3, this.errMsg);
};
DCache.ReleaseProgressRsp.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.ReleaseProgressRsp.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.ReleaseProgressRsp.prototype.toObject = function() { 
    return {
        "releaseId" : this.releaseId,
        "percent" : this.percent,
        "releaseInfo" : this.releaseInfo.toObject(),
        "errMsg" : this.errMsg
    };
};
DCache.ReleaseProgressRsp.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "releaseId") && (this.releaseId = json.releaseId);
    _hasOwnProperty.call(json, "percent") && (this.percent = json.percent);
    _hasOwnProperty.call(json, "releaseInfo") && (this.releaseInfo.readFromObject(json.releaseInfo));
    _hasOwnProperty.call(json, "errMsg") && (this.errMsg = json.errMsg);
    return this;
};
DCache.ReleaseProgressRsp.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.ReleaseProgressRsp.new = function () {
    return new DCache.ReleaseProgressRsp();
};
DCache.ReleaseProgressRsp.create = function (is) {
    return DCache.ReleaseProgressRsp._readFrom(is);
};

DCache.TransferReq = function() {
    this.appName = "";
    this.moduleName = "";
    this.srcGroupName = "";
    this.cacheHost = new TodoStream.List(DCache.CacheHostParam);
    this.cacheType = DCache.DCacheType.KVCACHE;
    this.version = "";
    this._classname = "DCache.TransferReq";
};
DCache.TransferReq._classname = "DCache.TransferReq";
DCache.TransferReq._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.TransferReq._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.TransferReq._readFrom = function (is) {
    var tmp = new DCache.TransferReq;
    tmp.appName = is.readString(0, true, "");
    tmp.moduleName = is.readString(1, true, "");
    tmp.srcGroupName = is.readString(2, true, "");
    tmp.cacheHost = is.readList(3, true, TodoStream.List(DCache.CacheHostParam));
    tmp.cacheType = is.readInt32(4, true, DCache.DCacheType.KVCACHE);
    tmp.version = is.readString(5, true, "");
    return tmp;
};
DCache.TransferReq.prototype._writeTo = function (os) {
    os.writeString(0, this.appName);
    os.writeString(1, this.moduleName);
    os.writeString(2, this.srcGroupName);
    os.writeList(3, this.cacheHost);
    os.writeInt32(4, this.cacheType);
    os.writeString(5, this.version);
};
DCache.TransferReq.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.TransferReq.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.TransferReq.prototype.toObject = function() { 
    return {
        "appName" : this.appName,
        "moduleName" : this.moduleName,
        "srcGroupName" : this.srcGroupName,
        "cacheHost" : this.cacheHost.toObject(),
        "cacheType" : this.cacheType,
        "version" : this.version
    };
};
DCache.TransferReq.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "appName") && (this.appName = json.appName);
    _hasOwnProperty.call(json, "moduleName") && (this.moduleName = json.moduleName);
    _hasOwnProperty.call(json, "srcGroupName") && (this.srcGroupName = json.srcGroupName);
    _hasOwnProperty.call(json, "cacheHost") && (this.cacheHost.readFromObject(json.cacheHost));
    _hasOwnProperty.call(json, "cacheType") && (this.cacheType = json.cacheType);
    _hasOwnProperty.call(json, "version") && (this.version = json.version);
    return this;
};
DCache.TransferReq.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.TransferReq.new = function () {
    return new DCache.TransferReq();
};
DCache.TransferReq.create = function (is) {
    return DCache.TransferReq._readFrom(is);
};

DCache.TransferRsp = function() {
    this.errMsg = "";
    this._classname = "DCache.TransferRsp";
};
DCache.TransferRsp._classname = "DCache.TransferRsp";
DCache.TransferRsp._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.TransferRsp._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.TransferRsp._readFrom = function (is) {
    var tmp = new DCache.TransferRsp;
    tmp.errMsg = is.readString(0, true, "");
    return tmp;
};
DCache.TransferRsp.prototype._writeTo = function (os) {
    os.writeString(0, this.errMsg);
};
DCache.TransferRsp.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.TransferRsp.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.TransferRsp.prototype.toObject = function() { 
    return {
        "errMsg" : this.errMsg
    };
};
DCache.TransferRsp.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "errMsg") && (this.errMsg = json.errMsg);
    return this;
};
DCache.TransferRsp.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.TransferRsp.new = function () {
    return new DCache.TransferRsp();
};
DCache.TransferRsp.create = function (is) {
    return DCache.TransferRsp._readFrom(is);
};

DCache.ExpandReq = function() {
    this.appName = "";
    this.moduleName = "";
    this.cacheHost = new TodoStream.List(DCache.CacheHostParam);
    this.cacheType = DCache.DCacheType.KVCACHE;
    this.version = "";
    this.replace = false;
    this._classname = "DCache.ExpandReq";
};
DCache.ExpandReq._classname = "DCache.ExpandReq";
DCache.ExpandReq._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.ExpandReq._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.ExpandReq._readFrom = function (is) {
    var tmp = new DCache.ExpandReq;
    tmp.appName = is.readString(0, true, "");
    tmp.moduleName = is.readString(1, true, "");
    tmp.cacheHost = is.readList(2, true, TodoStream.List(DCache.CacheHostParam));
    tmp.cacheType = is.readInt32(3, true, DCache.DCacheType.KVCACHE);
    tmp.version = is.readString(4, true, "");
    tmp.replace = is.readBoolean(5, true, false);
    return tmp;
};
DCache.ExpandReq.prototype._writeTo = function (os) {
    os.writeString(0, this.appName);
    os.writeString(1, this.moduleName);
    os.writeList(2, this.cacheHost);
    os.writeInt32(3, this.cacheType);
    os.writeString(4, this.version);
    os.writeBoolean(5, this.replace);
};
DCache.ExpandReq.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.ExpandReq.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.ExpandReq.prototype.toObject = function() { 
    return {
        "appName" : this.appName,
        "moduleName" : this.moduleName,
        "cacheHost" : this.cacheHost.toObject(),
        "cacheType" : this.cacheType,
        "version" : this.version,
        "replace" : this.replace
    };
};
DCache.ExpandReq.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "appName") && (this.appName = json.appName);
    _hasOwnProperty.call(json, "moduleName") && (this.moduleName = json.moduleName);
    _hasOwnProperty.call(json, "cacheHost") && (this.cacheHost.readFromObject(json.cacheHost));
    _hasOwnProperty.call(json, "cacheType") && (this.cacheType = json.cacheType);
    _hasOwnProperty.call(json, "version") && (this.version = json.version);
    _hasOwnProperty.call(json, "replace") && (this.replace = json.replace);
    return this;
};
DCache.ExpandReq.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.ExpandReq.new = function () {
    return new DCache.ExpandReq();
};
DCache.ExpandReq.create = function (is) {
    return DCache.ExpandReq._readFrom(is);
};

DCache.ExpandRsp = function() {
    this.errMsg = "";
    this._classname = "DCache.ExpandRsp";
};
DCache.ExpandRsp._classname = "DCache.ExpandRsp";
DCache.ExpandRsp._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.ExpandRsp._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.ExpandRsp._readFrom = function (is) {
    var tmp = new DCache.ExpandRsp;
    tmp.errMsg = is.readString(0, true, "");
    return tmp;
};
DCache.ExpandRsp.prototype._writeTo = function (os) {
    os.writeString(0, this.errMsg);
};
DCache.ExpandRsp.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.ExpandRsp.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.ExpandRsp.prototype.toObject = function() { 
    return {
        "errMsg" : this.errMsg
    };
};
DCache.ExpandRsp.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "errMsg") && (this.errMsg = json.errMsg);
    return this;
};
DCache.ExpandRsp.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.ExpandRsp.new = function () {
    return new DCache.ExpandRsp();
};
DCache.ExpandRsp.create = function (is) {
    return DCache.ExpandRsp._readFrom(is);
};

DCache.ReduceReq = function() {
    this.appName = "";
    this.moduleName = "";
    this.srcGroupName = new TodoStream.List(TodoStream.String);
    this._classname = "DCache.ReduceReq";
};
DCache.ReduceReq._classname = "DCache.ReduceReq";
DCache.ReduceReq._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.ReduceReq._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.ReduceReq._readFrom = function (is) {
    var tmp = new DCache.ReduceReq;
    tmp.appName = is.readString(0, true, "");
    tmp.moduleName = is.readString(1, true, "");
    tmp.srcGroupName = is.readList(2, true, TodoStream.List(TodoStream.String));
    return tmp;
};
DCache.ReduceReq.prototype._writeTo = function (os) {
    os.writeString(0, this.appName);
    os.writeString(1, this.moduleName);
    os.writeList(2, this.srcGroupName);
};
DCache.ReduceReq.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.ReduceReq.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.ReduceReq.prototype.toObject = function() { 
    return {
        "appName" : this.appName,
        "moduleName" : this.moduleName,
        "srcGroupName" : this.srcGroupName.toObject()
    };
};
DCache.ReduceReq.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "appName") && (this.appName = json.appName);
    _hasOwnProperty.call(json, "moduleName") && (this.moduleName = json.moduleName);
    _hasOwnProperty.call(json, "srcGroupName") && (this.srcGroupName.readFromObject(json.srcGroupName));
    return this;
};
DCache.ReduceReq.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.ReduceReq.new = function () {
    return new DCache.ReduceReq();
};
DCache.ReduceReq.create = function (is) {
    return DCache.ReduceReq._readFrom(is);
};

DCache.ReduceRsp = function() {
    this.errMsg = "";
    this._classname = "DCache.ReduceRsp";
};
DCache.ReduceRsp._classname = "DCache.ReduceRsp";
DCache.ReduceRsp._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.ReduceRsp._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.ReduceRsp._readFrom = function (is) {
    var tmp = new DCache.ReduceRsp;
    tmp.errMsg = is.readString(0, true, "");
    return tmp;
};
DCache.ReduceRsp.prototype._writeTo = function (os) {
    os.writeString(0, this.errMsg);
};
DCache.ReduceRsp.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.ReduceRsp.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.ReduceRsp.prototype.toObject = function() { 
    return {
        "errMsg" : this.errMsg
    };
};
DCache.ReduceRsp.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "errMsg") && (this.errMsg = json.errMsg);
    return this;
};
DCache.ReduceRsp.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.ReduceRsp.new = function () {
    return new DCache.ReduceRsp();
};
DCache.ReduceRsp.create = function (is) {
    return DCache.ReduceRsp._readFrom(is);
};

DCache.ConfigTransferReq = function() {
    this.appName = "";
    this.moduleName = "";
    this.type = DCache.TransferType.UNSPECIFIED_TYPE;
    this.srcGroupName = new TodoStream.List(TodoStream.String);
    this.dstGroupName = new TodoStream.List(TodoStream.String);
    this.transferData = true;
    this._classname = "DCache.ConfigTransferReq";
};
DCache.ConfigTransferReq._classname = "DCache.ConfigTransferReq";
DCache.ConfigTransferReq._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.ConfigTransferReq._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.ConfigTransferReq._readFrom = function (is) {
    var tmp = new DCache.ConfigTransferReq;
    tmp.appName = is.readString(0, true, "");
    tmp.moduleName = is.readString(1, true, "");
    tmp.type = is.readInt32(2, true, DCache.TransferType.UNSPECIFIED_TYPE);
    tmp.srcGroupName = is.readList(3, false, TodoStream.List(TodoStream.String));
    tmp.dstGroupName = is.readList(4, false, TodoStream.List(TodoStream.String));
    tmp.transferData = is.readBoolean(5, false, true);
    return tmp;
};
DCache.ConfigTransferReq.prototype._writeTo = function (os) {
    os.writeString(0, this.appName);
    os.writeString(1, this.moduleName);
    os.writeInt32(2, this.type);
    os.writeList(3, this.srcGroupName);
    os.writeList(4, this.dstGroupName);
    os.writeBoolean(5, this.transferData);
};
DCache.ConfigTransferReq.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.ConfigTransferReq.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.ConfigTransferReq.prototype.toObject = function() { 
    return {
        "appName" : this.appName,
        "moduleName" : this.moduleName,
        "type" : this.type,
        "srcGroupName" : this.srcGroupName.toObject(),
        "dstGroupName" : this.dstGroupName.toObject(),
        "transferData" : this.transferData
    };
};
DCache.ConfigTransferReq.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "appName") && (this.appName = json.appName);
    _hasOwnProperty.call(json, "moduleName") && (this.moduleName = json.moduleName);
    _hasOwnProperty.call(json, "type") && (this.type = json.type);
    _hasOwnProperty.call(json, "srcGroupName") && (this.srcGroupName.readFromObject(json.srcGroupName));
    _hasOwnProperty.call(json, "dstGroupName") && (this.dstGroupName.readFromObject(json.dstGroupName));
    _hasOwnProperty.call(json, "transferData") && (this.transferData = json.transferData);
    return this;
};
DCache.ConfigTransferReq.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.ConfigTransferReq.new = function () {
    return new DCache.ConfigTransferReq();
};
DCache.ConfigTransferReq.create = function (is) {
    return DCache.ConfigTransferReq._readFrom(is);
};

DCache.ConfigTransferRsp = function() {
    this.errMsg = "";
    this._classname = "DCache.ConfigTransferRsp";
};
DCache.ConfigTransferRsp._classname = "DCache.ConfigTransferRsp";
DCache.ConfigTransferRsp._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.ConfigTransferRsp._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.ConfigTransferRsp._readFrom = function (is) {
    var tmp = new DCache.ConfigTransferRsp;
    tmp.errMsg = is.readString(0, true, "");
    return tmp;
};
DCache.ConfigTransferRsp.prototype._writeTo = function (os) {
    os.writeString(0, this.errMsg);
};
DCache.ConfigTransferRsp.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.ConfigTransferRsp.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.ConfigTransferRsp.prototype.toObject = function() { 
    return {
        "errMsg" : this.errMsg
    };
};
DCache.ConfigTransferRsp.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "errMsg") && (this.errMsg = json.errMsg);
    return this;
};
DCache.ConfigTransferRsp.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.ConfigTransferRsp.new = function () {
    return new DCache.ConfigTransferRsp();
};
DCache.ConfigTransferRsp.create = function (is) {
    return DCache.ConfigTransferRsp._readFrom(is);
};

DCache.ModuleStructReq = function() {
    this.appName = "";
    this.moduleName = "";
    this._classname = "DCache.ModuleStructReq";
};
DCache.ModuleStructReq._classname = "DCache.ModuleStructReq";
DCache.ModuleStructReq._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.ModuleStructReq._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.ModuleStructReq._readFrom = function (is) {
    var tmp = new DCache.ModuleStructReq;
    tmp.appName = is.readString(0, true, "");
    tmp.moduleName = is.readString(1, true, "");
    return tmp;
};
DCache.ModuleStructReq.prototype._writeTo = function (os) {
    os.writeString(0, this.appName);
    os.writeString(1, this.moduleName);
};
DCache.ModuleStructReq.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.ModuleStructReq.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.ModuleStructReq.prototype.toObject = function() { 
    return {
        "appName" : this.appName,
        "moduleName" : this.moduleName
    };
};
DCache.ModuleStructReq.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "appName") && (this.appName = json.appName);
    _hasOwnProperty.call(json, "moduleName") && (this.moduleName = json.moduleName);
    return this;
};
DCache.ModuleStructReq.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.ModuleStructReq.new = function () {
    return new DCache.ModuleStructReq();
};
DCache.ModuleStructReq.create = function (is) {
    return DCache.ModuleStructReq._readFrom(is);
};

DCache.ModuleStructRsp = function() {
    this.errMsg = "";
    this.serverInfo = new TodoStream.List(DCache.ModuleServer);
    this.cacheType = DCache.DCacheType.KVCACHE;
    this.idc = "";
    this.nodeNum = 0;
    this.totalMemSize = "";
    this.avgMemSize = "";
    this._classname = "DCache.ModuleStructRsp";
};
DCache.ModuleStructRsp._classname = "DCache.ModuleStructRsp";
DCache.ModuleStructRsp._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.ModuleStructRsp._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.ModuleStructRsp._readFrom = function (is) {
    var tmp = new DCache.ModuleStructRsp;
    tmp.errMsg = is.readString(0, true, "");
    tmp.serverInfo = is.readList(1, true, TodoStream.List(DCache.ModuleServer));
    tmp.cacheType = is.readInt32(2, true, DCache.DCacheType.KVCACHE);
    tmp.idc = is.readString(3, true, "");
    tmp.nodeNum = is.readInt32(4, false, 0);
    tmp.totalMemSize = is.readString(5, false, "");
    tmp.avgMemSize = is.readString(6, false, "");
    return tmp;
};
DCache.ModuleStructRsp.prototype._writeTo = function (os) {
    os.writeString(0, this.errMsg);
    os.writeList(1, this.serverInfo);
    os.writeInt32(2, this.cacheType);
    os.writeString(3, this.idc);
    os.writeInt32(4, this.nodeNum);
    os.writeString(5, this.totalMemSize);
    os.writeString(6, this.avgMemSize);
};
DCache.ModuleStructRsp.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.ModuleStructRsp.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.ModuleStructRsp.prototype.toObject = function() { 
    return {
        "errMsg" : this.errMsg,
        "serverInfo" : this.serverInfo.toObject(),
        "cacheType" : this.cacheType,
        "idc" : this.idc,
        "nodeNum" : this.nodeNum,
        "totalMemSize" : this.totalMemSize,
        "avgMemSize" : this.avgMemSize
    };
};
DCache.ModuleStructRsp.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "errMsg") && (this.errMsg = json.errMsg);
    _hasOwnProperty.call(json, "serverInfo") && (this.serverInfo.readFromObject(json.serverInfo));
    _hasOwnProperty.call(json, "cacheType") && (this.cacheType = json.cacheType);
    _hasOwnProperty.call(json, "idc") && (this.idc = json.idc);
    _hasOwnProperty.call(json, "nodeNum") && (this.nodeNum = json.nodeNum);
    _hasOwnProperty.call(json, "totalMemSize") && (this.totalMemSize = json.totalMemSize);
    _hasOwnProperty.call(json, "avgMemSize") && (this.avgMemSize = json.avgMemSize);
    return this;
};
DCache.ModuleStructRsp.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.ModuleStructRsp.new = function () {
    return new DCache.ModuleStructRsp();
};
DCache.ModuleStructRsp.create = function (is) {
    return DCache.ModuleStructRsp._readFrom(is);
};

DCache.RouterChangeReq = function() {
    this.cond = new TodoStream.Map(TodoStream.String, TodoStream.String);
    this.index = 0;
    this.number = 0;
    this._classname = "DCache.RouterChangeReq";
};
DCache.RouterChangeReq._classname = "DCache.RouterChangeReq";
DCache.RouterChangeReq._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.RouterChangeReq._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.RouterChangeReq._readFrom = function (is) {
    var tmp = new DCache.RouterChangeReq;
    tmp.cond = is.readMap(0, true, TodoStream.Map(TodoStream.String, TodoStream.String));
    tmp.index = is.readInt32(1, true, 0);
    tmp.number = is.readInt32(2, true, 0);
    return tmp;
};
DCache.RouterChangeReq.prototype._writeTo = function (os) {
    os.writeMap(0, this.cond);
    os.writeInt32(1, this.index);
    os.writeInt32(2, this.number);
};
DCache.RouterChangeReq.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.RouterChangeReq.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.RouterChangeReq.prototype.toObject = function() { 
    return {
        "cond" : this.cond.toObject(),
        "index" : this.index,
        "number" : this.number
    };
};
DCache.RouterChangeReq.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "cond") && (this.cond.readFromObject(json.cond));
    _hasOwnProperty.call(json, "index") && (this.index = json.index);
    _hasOwnProperty.call(json, "number") && (this.number = json.number);
    return this;
};
DCache.RouterChangeReq.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.RouterChangeReq.new = function () {
    return new DCache.RouterChangeReq();
};
DCache.RouterChangeReq.create = function (is) {
    return DCache.RouterChangeReq._readFrom(is);
};

DCache.RouterChangeRsp = function() {
    this.errMsg = "";
    this.totalNum = 0;
    this.transferRecord = new TodoStream.List(DCache.TransferRecord);
    this._classname = "DCache.RouterChangeRsp";
};
DCache.RouterChangeRsp._classname = "DCache.RouterChangeRsp";
DCache.RouterChangeRsp._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.RouterChangeRsp._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.RouterChangeRsp._readFrom = function (is) {
    var tmp = new DCache.RouterChangeRsp;
    tmp.errMsg = is.readString(0, true, "");
    tmp.totalNum = is.readInt32(1, true, 0);
    tmp.transferRecord = is.readList(2, true, TodoStream.List(DCache.TransferRecord));
    return tmp;
};
DCache.RouterChangeRsp.prototype._writeTo = function (os) {
    os.writeString(0, this.errMsg);
    os.writeInt32(1, this.totalNum);
    os.writeList(2, this.transferRecord);
};
DCache.RouterChangeRsp.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.RouterChangeRsp.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.RouterChangeRsp.prototype.toObject = function() { 
    return {
        "errMsg" : this.errMsg,
        "totalNum" : this.totalNum,
        "transferRecord" : this.transferRecord.toObject()
    };
};
DCache.RouterChangeRsp.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "errMsg") && (this.errMsg = json.errMsg);
    _hasOwnProperty.call(json, "totalNum") && (this.totalNum = json.totalNum);
    _hasOwnProperty.call(json, "transferRecord") && (this.transferRecord.readFromObject(json.transferRecord));
    return this;
};
DCache.RouterChangeRsp.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.RouterChangeRsp.new = function () {
    return new DCache.RouterChangeRsp();
};
DCache.RouterChangeRsp.create = function (is) {
    return DCache.RouterChangeRsp._readFrom(is);
};

DCache.SwitchReq = function() {
    this.appName = "";
    this.moduleName = "";
    this.groupName = "";
    this.forceSwitch = true;
    this.diffBinlogTime = 0;
    this._classname = "DCache.SwitchReq";
};
DCache.SwitchReq._classname = "DCache.SwitchReq";
DCache.SwitchReq._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.SwitchReq._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.SwitchReq._readFrom = function (is) {
    var tmp = new DCache.SwitchReq;
    tmp.appName = is.readString(0, true, "");
    tmp.moduleName = is.readString(1, true, "");
    tmp.groupName = is.readString(2, true, "");
    tmp.forceSwitch = is.readBoolean(3, false, true);
    tmp.diffBinlogTime = is.readInt32(4, false, 0);
    return tmp;
};
DCache.SwitchReq.prototype._writeTo = function (os) {
    os.writeString(0, this.appName);
    os.writeString(1, this.moduleName);
    os.writeString(2, this.groupName);
    os.writeBoolean(3, this.forceSwitch);
    os.writeInt32(4, this.diffBinlogTime);
};
DCache.SwitchReq.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.SwitchReq.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.SwitchReq.prototype.toObject = function() { 
    return {
        "appName" : this.appName,
        "moduleName" : this.moduleName,
        "groupName" : this.groupName,
        "forceSwitch" : this.forceSwitch,
        "diffBinlogTime" : this.diffBinlogTime
    };
};
DCache.SwitchReq.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "appName") && (this.appName = json.appName);
    _hasOwnProperty.call(json, "moduleName") && (this.moduleName = json.moduleName);
    _hasOwnProperty.call(json, "groupName") && (this.groupName = json.groupName);
    _hasOwnProperty.call(json, "forceSwitch") && (this.forceSwitch = json.forceSwitch);
    _hasOwnProperty.call(json, "diffBinlogTime") && (this.diffBinlogTime = json.diffBinlogTime);
    return this;
};
DCache.SwitchReq.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.SwitchReq.new = function () {
    return new DCache.SwitchReq();
};
DCache.SwitchReq.create = function (is) {
    return DCache.SwitchReq._readFrom(is);
};

DCache.SwitchRsp = function() {
    this.errMsg = "";
    this._classname = "DCache.SwitchRsp";
};
DCache.SwitchRsp._classname = "DCache.SwitchRsp";
DCache.SwitchRsp._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.SwitchRsp._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.SwitchRsp._readFrom = function (is) {
    var tmp = new DCache.SwitchRsp;
    tmp.errMsg = is.readString(0, true, "");
    return tmp;
};
DCache.SwitchRsp.prototype._writeTo = function (os) {
    os.writeString(0, this.errMsg);
};
DCache.SwitchRsp.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.SwitchRsp.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.SwitchRsp.prototype.toObject = function() { 
    return {
        "errMsg" : this.errMsg
    };
};
DCache.SwitchRsp.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "errMsg") && (this.errMsg = json.errMsg);
    return this;
};
DCache.SwitchRsp.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.SwitchRsp.new = function () {
    return new DCache.SwitchRsp();
};
DCache.SwitchRsp.create = function (is) {
    return DCache.SwitchRsp._readFrom(is);
};

DCache.SwitchInfoReq = function() {
    this.cond = new TodoStream.Map(TodoStream.String, TodoStream.String);
    this.index = 0;
    this.number = 0;
    this._classname = "DCache.SwitchInfoReq";
};
DCache.SwitchInfoReq._classname = "DCache.SwitchInfoReq";
DCache.SwitchInfoReq._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.SwitchInfoReq._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.SwitchInfoReq._readFrom = function (is) {
    var tmp = new DCache.SwitchInfoReq;
    tmp.cond = is.readMap(0, true, TodoStream.Map(TodoStream.String, TodoStream.String));
    tmp.index = is.readInt32(1, true, 0);
    tmp.number = is.readInt32(2, true, 0);
    return tmp;
};
DCache.SwitchInfoReq.prototype._writeTo = function (os) {
    os.writeMap(0, this.cond);
    os.writeInt32(1, this.index);
    os.writeInt32(2, this.number);
};
DCache.SwitchInfoReq.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.SwitchInfoReq.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.SwitchInfoReq.prototype.toObject = function() { 
    return {
        "cond" : this.cond.toObject(),
        "index" : this.index,
        "number" : this.number
    };
};
DCache.SwitchInfoReq.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "cond") && (this.cond.readFromObject(json.cond));
    _hasOwnProperty.call(json, "index") && (this.index = json.index);
    _hasOwnProperty.call(json, "number") && (this.number = json.number);
    return this;
};
DCache.SwitchInfoReq.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.SwitchInfoReq.new = function () {
    return new DCache.SwitchInfoReq();
};
DCache.SwitchInfoReq.create = function (is) {
    return DCache.SwitchInfoReq._readFrom(is);
};

DCache.SwitchInfoRsp = function() {
    this.errMsg = "";
    this.totalNum = 0;
    this.switchRecord = new TodoStream.List(DCache.SwitchRecord);
    this._classname = "DCache.SwitchInfoRsp";
};
DCache.SwitchInfoRsp._classname = "DCache.SwitchInfoRsp";
DCache.SwitchInfoRsp._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.SwitchInfoRsp._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.SwitchInfoRsp._readFrom = function (is) {
    var tmp = new DCache.SwitchInfoRsp;
    tmp.errMsg = is.readString(0, true, "");
    tmp.totalNum = is.readInt32(1, true, 0);
    tmp.switchRecord = is.readList(2, true, TodoStream.List(DCache.SwitchRecord));
    return tmp;
};
DCache.SwitchInfoRsp.prototype._writeTo = function (os) {
    os.writeString(0, this.errMsg);
    os.writeInt32(1, this.totalNum);
    os.writeList(2, this.switchRecord);
};
DCache.SwitchInfoRsp.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.SwitchInfoRsp.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.SwitchInfoRsp.prototype.toObject = function() { 
    return {
        "errMsg" : this.errMsg,
        "totalNum" : this.totalNum,
        "switchRecord" : this.switchRecord.toObject()
    };
};
DCache.SwitchInfoRsp.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "errMsg") && (this.errMsg = json.errMsg);
    _hasOwnProperty.call(json, "totalNum") && (this.totalNum = json.totalNum);
    _hasOwnProperty.call(json, "switchRecord") && (this.switchRecord.readFromObject(json.switchRecord));
    return this;
};
DCache.SwitchInfoRsp.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.SwitchInfoRsp.new = function () {
    return new DCache.SwitchInfoRsp();
};
DCache.SwitchInfoRsp.create = function (is) {
    return DCache.SwitchInfoRsp._readFrom(is);
};

DCache.StopTransferReq = function() {
    this.appName = "";
    this.moduleName = "";
    this.type = DCache.TransferType.UNSPECIFIED_TYPE;
    this.srcGroupName = "";
    this.dstGroupName = "";
    this._classname = "DCache.StopTransferReq";
};
DCache.StopTransferReq._classname = "DCache.StopTransferReq";
DCache.StopTransferReq._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.StopTransferReq._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.StopTransferReq._readFrom = function (is) {
    var tmp = new DCache.StopTransferReq;
    tmp.appName = is.readString(0, true, "");
    tmp.moduleName = is.readString(1, true, "");
    tmp.type = is.readInt32(2, true, DCache.TransferType.UNSPECIFIED_TYPE);
    tmp.srcGroupName = is.readString(3, false, "");
    tmp.dstGroupName = is.readString(4, false, "");
    return tmp;
};
DCache.StopTransferReq.prototype._writeTo = function (os) {
    os.writeString(0, this.appName);
    os.writeString(1, this.moduleName);
    os.writeInt32(2, this.type);
    os.writeString(3, this.srcGroupName);
    os.writeString(4, this.dstGroupName);
};
DCache.StopTransferReq.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.StopTransferReq.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.StopTransferReq.prototype.toObject = function() { 
    return {
        "appName" : this.appName,
        "moduleName" : this.moduleName,
        "type" : this.type,
        "srcGroupName" : this.srcGroupName,
        "dstGroupName" : this.dstGroupName
    };
};
DCache.StopTransferReq.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "appName") && (this.appName = json.appName);
    _hasOwnProperty.call(json, "moduleName") && (this.moduleName = json.moduleName);
    _hasOwnProperty.call(json, "type") && (this.type = json.type);
    _hasOwnProperty.call(json, "srcGroupName") && (this.srcGroupName = json.srcGroupName);
    _hasOwnProperty.call(json, "dstGroupName") && (this.dstGroupName = json.dstGroupName);
    return this;
};
DCache.StopTransferReq.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.StopTransferReq.new = function () {
    return new DCache.StopTransferReq();
};
DCache.StopTransferReq.create = function (is) {
    return DCache.StopTransferReq._readFrom(is);
};

DCache.StopTransferRsp = function() {
    this.errMsg = "";
    this._classname = "DCache.StopTransferRsp";
};
DCache.StopTransferRsp._classname = "DCache.StopTransferRsp";
DCache.StopTransferRsp._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.StopTransferRsp._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.StopTransferRsp._readFrom = function (is) {
    var tmp = new DCache.StopTransferRsp;
    tmp.errMsg = is.readString(0, true, "");
    return tmp;
};
DCache.StopTransferRsp.prototype._writeTo = function (os) {
    os.writeString(0, this.errMsg);
};
DCache.StopTransferRsp.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.StopTransferRsp.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.StopTransferRsp.prototype.toObject = function() { 
    return {
        "errMsg" : this.errMsg
    };
};
DCache.StopTransferRsp.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "errMsg") && (this.errMsg = json.errMsg);
    return this;
};
DCache.StopTransferRsp.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.StopTransferRsp.new = function () {
    return new DCache.StopTransferRsp();
};
DCache.StopTransferRsp.create = function (is) {
    return DCache.StopTransferRsp._readFrom(is);
};

DCache.RestartTransferReq = function() {
    this.appName = "";
    this.moduleName = "";
    this.type = DCache.TransferType.UNSPECIFIED_TYPE;
    this.srcGroupName = "";
    this.dstGroupName = "";
    this._classname = "DCache.RestartTransferReq";
};
DCache.RestartTransferReq._classname = "DCache.RestartTransferReq";
DCache.RestartTransferReq._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.RestartTransferReq._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.RestartTransferReq._readFrom = function (is) {
    var tmp = new DCache.RestartTransferReq;
    tmp.appName = is.readString(0, true, "");
    tmp.moduleName = is.readString(1, true, "");
    tmp.type = is.readInt32(2, true, DCache.TransferType.UNSPECIFIED_TYPE);
    tmp.srcGroupName = is.readString(3, false, "");
    tmp.dstGroupName = is.readString(4, false, "");
    return tmp;
};
DCache.RestartTransferReq.prototype._writeTo = function (os) {
    os.writeString(0, this.appName);
    os.writeString(1, this.moduleName);
    os.writeInt32(2, this.type);
    os.writeString(3, this.srcGroupName);
    os.writeString(4, this.dstGroupName);
};
DCache.RestartTransferReq.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.RestartTransferReq.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.RestartTransferReq.prototype.toObject = function() { 
    return {
        "appName" : this.appName,
        "moduleName" : this.moduleName,
        "type" : this.type,
        "srcGroupName" : this.srcGroupName,
        "dstGroupName" : this.dstGroupName
    };
};
DCache.RestartTransferReq.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "appName") && (this.appName = json.appName);
    _hasOwnProperty.call(json, "moduleName") && (this.moduleName = json.moduleName);
    _hasOwnProperty.call(json, "type") && (this.type = json.type);
    _hasOwnProperty.call(json, "srcGroupName") && (this.srcGroupName = json.srcGroupName);
    _hasOwnProperty.call(json, "dstGroupName") && (this.dstGroupName = json.dstGroupName);
    return this;
};
DCache.RestartTransferReq.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.RestartTransferReq.new = function () {
    return new DCache.RestartTransferReq();
};
DCache.RestartTransferReq.create = function (is) {
    return DCache.RestartTransferReq._readFrom(is);
};

DCache.RestartTransferRsp = function() {
    this.errMsg = "";
    this._classname = "DCache.RestartTransferRsp";
};
DCache.RestartTransferRsp._classname = "DCache.RestartTransferRsp";
DCache.RestartTransferRsp._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.RestartTransferRsp._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.RestartTransferRsp._readFrom = function (is) {
    var tmp = new DCache.RestartTransferRsp;
    tmp.errMsg = is.readString(0, true, "");
    return tmp;
};
DCache.RestartTransferRsp.prototype._writeTo = function (os) {
    os.writeString(0, this.errMsg);
};
DCache.RestartTransferRsp.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.RestartTransferRsp.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.RestartTransferRsp.prototype.toObject = function() { 
    return {
        "errMsg" : this.errMsg
    };
};
DCache.RestartTransferRsp.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "errMsg") && (this.errMsg = json.errMsg);
    return this;
};
DCache.RestartTransferRsp.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.RestartTransferRsp.new = function () {
    return new DCache.RestartTransferRsp();
};
DCache.RestartTransferRsp.create = function (is) {
    return DCache.RestartTransferRsp._readFrom(is);
};

DCache.DeleteTransferReq = function() {
    this.appName = "";
    this.moduleName = "";
    this.type = DCache.TransferType.UNSPECIFIED_TYPE;
    this.srcGroupName = "";
    this.dstGroupName = "";
    this._classname = "DCache.DeleteTransferReq";
};
DCache.DeleteTransferReq._classname = "DCache.DeleteTransferReq";
DCache.DeleteTransferReq._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.DeleteTransferReq._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.DeleteTransferReq._readFrom = function (is) {
    var tmp = new DCache.DeleteTransferReq;
    tmp.appName = is.readString(0, true, "");
    tmp.moduleName = is.readString(1, true, "");
    tmp.type = is.readInt32(2, true, DCache.TransferType.UNSPECIFIED_TYPE);
    tmp.srcGroupName = is.readString(3, false, "");
    tmp.dstGroupName = is.readString(4, false, "");
    return tmp;
};
DCache.DeleteTransferReq.prototype._writeTo = function (os) {
    os.writeString(0, this.appName);
    os.writeString(1, this.moduleName);
    os.writeInt32(2, this.type);
    os.writeString(3, this.srcGroupName);
    os.writeString(4, this.dstGroupName);
};
DCache.DeleteTransferReq.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.DeleteTransferReq.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.DeleteTransferReq.prototype.toObject = function() { 
    return {
        "appName" : this.appName,
        "moduleName" : this.moduleName,
        "type" : this.type,
        "srcGroupName" : this.srcGroupName,
        "dstGroupName" : this.dstGroupName
    };
};
DCache.DeleteTransferReq.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "appName") && (this.appName = json.appName);
    _hasOwnProperty.call(json, "moduleName") && (this.moduleName = json.moduleName);
    _hasOwnProperty.call(json, "type") && (this.type = json.type);
    _hasOwnProperty.call(json, "srcGroupName") && (this.srcGroupName = json.srcGroupName);
    _hasOwnProperty.call(json, "dstGroupName") && (this.dstGroupName = json.dstGroupName);
    return this;
};
DCache.DeleteTransferReq.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.DeleteTransferReq.new = function () {
    return new DCache.DeleteTransferReq();
};
DCache.DeleteTransferReq.create = function (is) {
    return DCache.DeleteTransferReq._readFrom(is);
};

DCache.DeleteTransferRsp = function() {
    this.errMsg = "";
    this._classname = "DCache.DeleteTransferRsp";
};
DCache.DeleteTransferRsp._classname = "DCache.DeleteTransferRsp";
DCache.DeleteTransferRsp._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.DeleteTransferRsp._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.DeleteTransferRsp._readFrom = function (is) {
    var tmp = new DCache.DeleteTransferRsp;
    tmp.errMsg = is.readString(0, true, "");
    return tmp;
};
DCache.DeleteTransferRsp.prototype._writeTo = function (os) {
    os.writeString(0, this.errMsg);
};
DCache.DeleteTransferRsp.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.DeleteTransferRsp.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.DeleteTransferRsp.prototype.toObject = function() { 
    return {
        "errMsg" : this.errMsg
    };
};
DCache.DeleteTransferRsp.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "errMsg") && (this.errMsg = json.errMsg);
    return this;
};
DCache.DeleteTransferRsp.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.DeleteTransferRsp.new = function () {
    return new DCache.DeleteTransferRsp();
};
DCache.DeleteTransferRsp.create = function (is) {
    return DCache.DeleteTransferRsp._readFrom(is);
};

DCache.TransferGroupReq = function() {
    this.appName = "";
    this.moduleName = "";
    this.srcGroupName = "";
    this.dstGroupName = "";
    this.transferData = true;
    this._classname = "DCache.TransferGroupReq";
};
DCache.TransferGroupReq._classname = "DCache.TransferGroupReq";
DCache.TransferGroupReq._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.TransferGroupReq._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.TransferGroupReq._readFrom = function (is) {
    var tmp = new DCache.TransferGroupReq;
    tmp.appName = is.readString(0, true, "");
    tmp.moduleName = is.readString(1, true, "");
    tmp.srcGroupName = is.readString(2, true, "");
    tmp.dstGroupName = is.readString(3, true, "");
    tmp.transferData = is.readBoolean(4, true, true);
    return tmp;
};
DCache.TransferGroupReq.prototype._writeTo = function (os) {
    os.writeString(0, this.appName);
    os.writeString(1, this.moduleName);
    os.writeString(2, this.srcGroupName);
    os.writeString(3, this.dstGroupName);
    os.writeBoolean(4, this.transferData);
};
DCache.TransferGroupReq.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.TransferGroupReq.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.TransferGroupReq.prototype.toObject = function() { 
    return {
        "appName" : this.appName,
        "moduleName" : this.moduleName,
        "srcGroupName" : this.srcGroupName,
        "dstGroupName" : this.dstGroupName,
        "transferData" : this.transferData
    };
};
DCache.TransferGroupReq.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "appName") && (this.appName = json.appName);
    _hasOwnProperty.call(json, "moduleName") && (this.moduleName = json.moduleName);
    _hasOwnProperty.call(json, "srcGroupName") && (this.srcGroupName = json.srcGroupName);
    _hasOwnProperty.call(json, "dstGroupName") && (this.dstGroupName = json.dstGroupName);
    _hasOwnProperty.call(json, "transferData") && (this.transferData = json.transferData);
    return this;
};
DCache.TransferGroupReq.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.TransferGroupReq.new = function () {
    return new DCache.TransferGroupReq();
};
DCache.TransferGroupReq.create = function (is) {
    return DCache.TransferGroupReq._readFrom(is);
};

DCache.TransferGroupRsp = function() {
    this.errMsg = "";
    this._classname = "DCache.TransferGroupRsp";
};
DCache.TransferGroupRsp._classname = "DCache.TransferGroupRsp";
DCache.TransferGroupRsp._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.TransferGroupRsp._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.TransferGroupRsp._readFrom = function (is) {
    var tmp = new DCache.TransferGroupRsp;
    tmp.errMsg = is.readString(0, true, "");
    return tmp;
};
DCache.TransferGroupRsp.prototype._writeTo = function (os) {
    os.writeString(0, this.errMsg);
};
DCache.TransferGroupRsp.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.TransferGroupRsp.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.TransferGroupRsp.prototype.toObject = function() { 
    return {
        "errMsg" : this.errMsg
    };
};
DCache.TransferGroupRsp.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "errMsg") && (this.errMsg = json.errMsg);
    return this;
};
DCache.TransferGroupRsp.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.TransferGroupRsp.new = function () {
    return new DCache.TransferGroupRsp();
};
DCache.TransferGroupRsp.create = function (is) {
    return DCache.TransferGroupRsp._readFrom(is);
};

DCache.RecoverMirrorReq = function() {
    this.appName = "";
    this.moduleName = "";
    this.groupName = "";
    this.mirrorIdc = "";
    this._classname = "DCache.RecoverMirrorReq";
};
DCache.RecoverMirrorReq._classname = "DCache.RecoverMirrorReq";
DCache.RecoverMirrorReq._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.RecoverMirrorReq._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.RecoverMirrorReq._readFrom = function (is) {
    var tmp = new DCache.RecoverMirrorReq;
    tmp.appName = is.readString(0, true, "");
    tmp.moduleName = is.readString(1, true, "");
    tmp.groupName = is.readString(2, true, "");
    tmp.mirrorIdc = is.readString(3, true, "");
    return tmp;
};
DCache.RecoverMirrorReq.prototype._writeTo = function (os) {
    os.writeString(0, this.appName);
    os.writeString(1, this.moduleName);
    os.writeString(2, this.groupName);
    os.writeString(3, this.mirrorIdc);
};
DCache.RecoverMirrorReq.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.RecoverMirrorReq.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.RecoverMirrorReq.prototype.toObject = function() { 
    return {
        "appName" : this.appName,
        "moduleName" : this.moduleName,
        "groupName" : this.groupName,
        "mirrorIdc" : this.mirrorIdc
    };
};
DCache.RecoverMirrorReq.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "appName") && (this.appName = json.appName);
    _hasOwnProperty.call(json, "moduleName") && (this.moduleName = json.moduleName);
    _hasOwnProperty.call(json, "groupName") && (this.groupName = json.groupName);
    _hasOwnProperty.call(json, "mirrorIdc") && (this.mirrorIdc = json.mirrorIdc);
    return this;
};
DCache.RecoverMirrorReq.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.RecoverMirrorReq.new = function () {
    return new DCache.RecoverMirrorReq();
};
DCache.RecoverMirrorReq.create = function (is) {
    return DCache.RecoverMirrorReq._readFrom(is);
};

DCache.RecoverMirrorRsp = function() {
    this.errMsg = "";
    this._classname = "DCache.RecoverMirrorRsp";
};
DCache.RecoverMirrorRsp._classname = "DCache.RecoverMirrorRsp";
DCache.RecoverMirrorRsp._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.RecoverMirrorRsp._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.RecoverMirrorRsp._readFrom = function (is) {
    var tmp = new DCache.RecoverMirrorRsp;
    tmp.errMsg = is.readString(0, true, "");
    return tmp;
};
DCache.RecoverMirrorRsp.prototype._writeTo = function (os) {
    os.writeString(0, this.errMsg);
};
DCache.RecoverMirrorRsp.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.RecoverMirrorRsp.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.RecoverMirrorRsp.prototype.toObject = function() { 
    return {
        "errMsg" : this.errMsg
    };
};
DCache.RecoverMirrorRsp.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "errMsg") && (this.errMsg = json.errMsg);
    return this;
};
DCache.RecoverMirrorRsp.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.RecoverMirrorRsp.new = function () {
    return new DCache.RecoverMirrorRsp();
};
DCache.RecoverMirrorRsp.create = function (is) {
    return DCache.RecoverMirrorRsp._readFrom(is);
};

DCache.CacheServerListReq = function() {
    this.appName = "";
    this.moduleName = "";
    this._classname = "DCache.CacheServerListReq";
};
DCache.CacheServerListReq._classname = "DCache.CacheServerListReq";
DCache.CacheServerListReq._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.CacheServerListReq._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.CacheServerListReq._readFrom = function (is) {
    var tmp = new DCache.CacheServerListReq;
    tmp.appName = is.readString(0, true, "");
    tmp.moduleName = is.readString(1, true, "");
    return tmp;
};
DCache.CacheServerListReq.prototype._writeTo = function (os) {
    os.writeString(0, this.appName);
    os.writeString(1, this.moduleName);
};
DCache.CacheServerListReq.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.CacheServerListReq.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.CacheServerListReq.prototype.toObject = function() { 
    return {
        "appName" : this.appName,
        "moduleName" : this.moduleName
    };
};
DCache.CacheServerListReq.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "appName") && (this.appName = json.appName);
    _hasOwnProperty.call(json, "moduleName") && (this.moduleName = json.moduleName);
    return this;
};
DCache.CacheServerListReq.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.CacheServerListReq.new = function () {
    return new DCache.CacheServerListReq();
};
DCache.CacheServerListReq.create = function (is) {
    return DCache.CacheServerListReq._readFrom(is);
};

DCache.CacheServerListRsp = function() {
    this.errMsg = "";
    this.cacheServerList = new TodoStream.List(DCache.CacheServerInfo);
    this.cacheType = DCache.DCacheType.KVCACHE;
    this._classname = "DCache.CacheServerListRsp";
};
DCache.CacheServerListRsp._classname = "DCache.CacheServerListRsp";
DCache.CacheServerListRsp._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.CacheServerListRsp._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.CacheServerListRsp._readFrom = function (is) {
    var tmp = new DCache.CacheServerListRsp;
    tmp.errMsg = is.readString(0, true, "");
    tmp.cacheServerList = is.readList(1, true, TodoStream.List(DCache.CacheServerInfo));
    tmp.cacheType = is.readInt32(2, true, DCache.DCacheType.KVCACHE);
    return tmp;
};
DCache.CacheServerListRsp.prototype._writeTo = function (os) {
    os.writeString(0, this.errMsg);
    os.writeList(1, this.cacheServerList);
    os.writeInt32(2, this.cacheType);
};
DCache.CacheServerListRsp.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.CacheServerListRsp.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.CacheServerListRsp.prototype.toObject = function() { 
    return {
        "errMsg" : this.errMsg,
        "cacheServerList" : this.cacheServerList.toObject(),
        "cacheType" : this.cacheType
    };
};
DCache.CacheServerListRsp.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "errMsg") && (this.errMsg = json.errMsg);
    _hasOwnProperty.call(json, "cacheServerList") && (this.cacheServerList.readFromObject(json.cacheServerList));
    _hasOwnProperty.call(json, "cacheType") && (this.cacheType = json.cacheType);
    return this;
};
DCache.CacheServerListRsp.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.CacheServerListRsp.new = function () {
    return new DCache.CacheServerListRsp();
};
DCache.CacheServerListRsp.create = function (is) {
    return DCache.CacheServerListRsp._readFrom(is);
};

DCache.CacheConfigReq = function() {
    this.id = "";
    this.remark = "";
    this.item = "";
    this.path = "";
    this.reload = "";
    this.period = "";
    this._classname = "DCache.CacheConfigReq";
};
DCache.CacheConfigReq._classname = "DCache.CacheConfigReq";
DCache.CacheConfigReq._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.CacheConfigReq._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.CacheConfigReq._readFrom = function (is) {
    var tmp = new DCache.CacheConfigReq;
    tmp.id = is.readString(0, false, "");
    tmp.remark = is.readString(1, false, "");
    tmp.item = is.readString(2, false, "");
    tmp.path = is.readString(3, false, "");
    tmp.reload = is.readString(4, false, "");
    tmp.period = is.readString(5, false, "");
    return tmp;
};
DCache.CacheConfigReq.prototype._writeTo = function (os) {
    os.writeString(0, this.id);
    os.writeString(1, this.remark);
    os.writeString(2, this.item);
    os.writeString(3, this.path);
    os.writeString(4, this.reload);
    os.writeString(5, this.period);
};
DCache.CacheConfigReq.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.CacheConfigReq.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.CacheConfigReq.prototype.toObject = function() { 
    return {
        "id" : this.id,
        "remark" : this.remark,
        "item" : this.item,
        "path" : this.path,
        "reload" : this.reload,
        "period" : this.period
    };
};
DCache.CacheConfigReq.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "id") && (this.id = json.id);
    _hasOwnProperty.call(json, "remark") && (this.remark = json.remark);
    _hasOwnProperty.call(json, "item") && (this.item = json.item);
    _hasOwnProperty.call(json, "path") && (this.path = json.path);
    _hasOwnProperty.call(json, "reload") && (this.reload = json.reload);
    _hasOwnProperty.call(json, "period") && (this.period = json.period);
    return this;
};
DCache.CacheConfigReq.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.CacheConfigReq.new = function () {
    return new DCache.CacheConfigReq();
};
DCache.CacheConfigReq.create = function (is) {
    return DCache.CacheConfigReq._readFrom(is);
};

DCache.ServerConfigReq = function() {
    this.appName = "";
    this.moduleName = "";
    this.serverName = "";
    this.nodeName = "";
    this.itemId = "";
    this.configValue = "";
    this.configFlag = "";
    this.lastUser = "";
    this.indexId = "";
    this._classname = "DCache.ServerConfigReq";
};
DCache.ServerConfigReq._classname = "DCache.ServerConfigReq";
DCache.ServerConfigReq._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.ServerConfigReq._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.ServerConfigReq._readFrom = function (is) {
    var tmp = new DCache.ServerConfigReq;
    tmp.appName = is.readString(0, false, "");
    tmp.moduleName = is.readString(1, false, "");
    tmp.serverName = is.readString(2, false, "");
    tmp.nodeName = is.readString(3, false, "");
    tmp.itemId = is.readString(4, false, "");
    tmp.configValue = is.readString(5, false, "");
    tmp.configFlag = is.readString(6, false, "");
    tmp.lastUser = is.readString(7, false, "");
    tmp.indexId = is.readString(8, false, "");
    return tmp;
};
DCache.ServerConfigReq.prototype._writeTo = function (os) {
    os.writeString(0, this.appName);
    os.writeString(1, this.moduleName);
    os.writeString(2, this.serverName);
    os.writeString(3, this.nodeName);
    os.writeString(4, this.itemId);
    os.writeString(5, this.configValue);
    os.writeString(6, this.configFlag);
    os.writeString(7, this.lastUser);
    os.writeString(8, this.indexId);
};
DCache.ServerConfigReq.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.ServerConfigReq.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.ServerConfigReq.prototype.toObject = function() { 
    return {
        "appName" : this.appName,
        "moduleName" : this.moduleName,
        "serverName" : this.serverName,
        "nodeName" : this.nodeName,
        "itemId" : this.itemId,
        "configValue" : this.configValue,
        "configFlag" : this.configFlag,
        "lastUser" : this.lastUser,
        "indexId" : this.indexId
    };
};
DCache.ServerConfigReq.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "appName") && (this.appName = json.appName);
    _hasOwnProperty.call(json, "moduleName") && (this.moduleName = json.moduleName);
    _hasOwnProperty.call(json, "serverName") && (this.serverName = json.serverName);
    _hasOwnProperty.call(json, "nodeName") && (this.nodeName = json.nodeName);
    _hasOwnProperty.call(json, "itemId") && (this.itemId = json.itemId);
    _hasOwnProperty.call(json, "configValue") && (this.configValue = json.configValue);
    _hasOwnProperty.call(json, "configFlag") && (this.configFlag = json.configFlag);
    _hasOwnProperty.call(json, "lastUser") && (this.lastUser = json.lastUser);
    _hasOwnProperty.call(json, "indexId") && (this.indexId = json.indexId);
    return this;
};
DCache.ServerConfigReq.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.ServerConfigReq.new = function () {
    return new DCache.ServerConfigReq();
};
DCache.ServerConfigReq.create = function (is) {
    return DCache.ServerConfigReq._readFrom(is);
};

DCache.ConfigRsp = function() {
    this.errMsg = "";
    this.configItemList = new TodoStream.List(TodoStream.Map(TodoStream.String, TodoStream.String));
    this._classname = "DCache.ConfigRsp";
};
DCache.ConfigRsp._classname = "DCache.ConfigRsp";
DCache.ConfigRsp._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.ConfigRsp._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.ConfigRsp._readFrom = function (is) {
    var tmp = new DCache.ConfigRsp;
    tmp.errMsg = is.readString(0, true, "");
    tmp.configItemList = is.readList(1, false, TodoStream.List(TodoStream.Map(TodoStream.String, TodoStream.String)));
    return tmp;
};
DCache.ConfigRsp.prototype._writeTo = function (os) {
    os.writeString(0, this.errMsg);
    os.writeList(1, this.configItemList);
};
DCache.ConfigRsp.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.ConfigRsp.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.ConfigRsp.prototype.toObject = function() { 
    return {
        "errMsg" : this.errMsg,
        "configItemList" : this.configItemList.toObject()
    };
};
DCache.ConfigRsp.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "errMsg") && (this.errMsg = json.errMsg);
    _hasOwnProperty.call(json, "configItemList") && (this.configItemList.readFromObject(json.configItemList));
    return this;
};
DCache.ConfigRsp.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.ConfigRsp.new = function () {
    return new DCache.ConfigRsp();
};
DCache.ConfigRsp.create = function (is) {
    return DCache.ConfigRsp._readFrom(is);
};

DCache.QueryPropReq = function() {
    this.moduleName = "";
    this.serverName = "";
    this.date = new TodoStream.List(TodoStream.String);
    this.startTime = "";
    this.endTime = "";
    this._classname = "DCache.QueryPropReq";
};
DCache.QueryPropReq._classname = "DCache.QueryPropReq";
DCache.QueryPropReq._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.QueryPropReq._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.QueryPropReq._readFrom = function (is) {
    var tmp = new DCache.QueryPropReq;
    tmp.moduleName = is.readString(0, true, "");
    tmp.serverName = is.readString(1, true, "");
    tmp.date = is.readList(2, true, TodoStream.List(TodoStream.String));
    tmp.startTime = is.readString(3, true, "");
    tmp.endTime = is.readString(4, true, "");
    return tmp;
};
DCache.QueryPropReq.prototype._writeTo = function (os) {
    os.writeString(0, this.moduleName);
    os.writeString(1, this.serverName);
    os.writeList(2, this.date);
    os.writeString(3, this.startTime);
    os.writeString(4, this.endTime);
};
DCache.QueryPropReq.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.QueryPropReq.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.QueryPropReq.prototype.toObject = function() { 
    return {
        "moduleName" : this.moduleName,
        "serverName" : this.serverName,
        "date" : this.date.toObject(),
        "startTime" : this.startTime,
        "endTime" : this.endTime
    };
};
DCache.QueryPropReq.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "moduleName") && (this.moduleName = json.moduleName);
    _hasOwnProperty.call(json, "serverName") && (this.serverName = json.serverName);
    _hasOwnProperty.call(json, "date") && (this.date.readFromObject(json.date));
    _hasOwnProperty.call(json, "startTime") && (this.startTime = json.startTime);
    _hasOwnProperty.call(json, "endTime") && (this.endTime = json.endTime);
    return this;
};
DCache.QueryPropReq.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.QueryPropReq.new = function () {
    return new DCache.QueryPropReq();
};
DCache.QueryPropReq.create = function (is) {
    return DCache.QueryPropReq._readFrom(is);
};

DCache.QueryProp = function() {
    this.timeStamp = "";
    this.propData = new TodoStream.Map(TodoStream.String, TodoStream.Double);
    this._classname = "DCache.QueryProp";
};
DCache.QueryProp._classname = "DCache.QueryProp";
DCache.QueryProp._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.QueryProp._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.QueryProp._readFrom = function (is) {
    var tmp = new DCache.QueryProp;
    tmp.timeStamp = is.readString(0, true, "");
    tmp.propData = is.readMap(1, true, TodoStream.Map(TodoStream.String, TodoStream.Double));
    return tmp;
};
DCache.QueryProp.prototype._writeTo = function (os) {
    os.writeString(0, this.timeStamp);
    os.writeMap(1, this.propData);
};
DCache.QueryProp.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.QueryProp.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.QueryProp.prototype.toObject = function() { 
    return {
        "timeStamp" : this.timeStamp,
        "propData" : this.propData.toObject()
    };
};
DCache.QueryProp.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "timeStamp") && (this.timeStamp = json.timeStamp);
    _hasOwnProperty.call(json, "propData") && (this.propData.readFromObject(json.propData));
    return this;
};
DCache.QueryProp.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.QueryProp.new = function () {
    return new DCache.QueryProp();
};
DCache.QueryProp.create = function (is) {
    return DCache.QueryProp._readFrom(is);
};

DCache.QueryResult = function() {
    this.moduleName = "";
    this.serverName = "";
    this.date = "";
    this.data = new TodoStream.List(DCache.QueryProp);
    this._classname = "DCache.QueryResult";
};
DCache.QueryResult._classname = "DCache.QueryResult";
DCache.QueryResult._write = function (os, tag, value) { os.writeStruct(tag, value); };
DCache.QueryResult._read  = function (is, tag, def) { return is.readStruct(tag, true, def); };
DCache.QueryResult._readFrom = function (is) {
    var tmp = new DCache.QueryResult;
    tmp.moduleName = is.readString(0, true, "");
    tmp.serverName = is.readString(1, true, "");
    tmp.date = is.readString(2, true, "");
    tmp.data = is.readList(3, true, TodoStream.List(DCache.QueryProp));
    return tmp;
};
DCache.QueryResult.prototype._writeTo = function (os) {
    os.writeString(0, this.moduleName);
    os.writeString(1, this.serverName);
    os.writeString(2, this.date);
    os.writeList(3, this.data);
};
DCache.QueryResult.prototype._equal = function () {
    assert.fail("this structure not define key operation");
};
DCache.QueryResult.prototype._genKey = function () {
    if (!this._proto_struct_name_) {
        this._proto_struct_name_ = "STRUCT" + Math.random();
    }
    return this._proto_struct_name_;
};
DCache.QueryResult.prototype.toObject = function() { 
    return {
        "moduleName" : this.moduleName,
        "serverName" : this.serverName,
        "date" : this.date,
        "data" : this.data.toObject()
    };
};
DCache.QueryResult.prototype.readFromObject = function(json) { 
    _hasOwnProperty.call(json, "moduleName") && (this.moduleName = json.moduleName);
    _hasOwnProperty.call(json, "serverName") && (this.serverName = json.serverName);
    _hasOwnProperty.call(json, "date") && (this.date = json.date);
    _hasOwnProperty.call(json, "data") && (this.data.readFromObject(json.data));
    return this;
};
DCache.QueryResult.prototype.toBinBuffer = function () {
    var os = new TodoStream.TodoOutputStream();
    this._writeTo(os);
    return os.getBinBuffer();
};
DCache.QueryResult.new = function () {
    return new DCache.QueryResult();
};
DCache.QueryResult.create = function (is) {
    return DCache.QueryResult._readFrom(is);
};

var __DCache_DCacheOpt$addCacheConfigItem$IF = {
    "name" : "addCacheConfigItem",
    "return" : "int32",
    "arguments" : [{
        "name" : "configReq",
        "class" : "DCache.CacheConfigReq",
        "direction" : "in"
    }, {
        "name" : "configRsp",
        "class" : "DCache.ConfigRsp",
        "direction" : "out"
    }]
};

var __DCache_DCacheOpt$addCacheConfigItem$IE = function (configReq) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, configReq);
    return os.getBinBuffer();
};

var __DCache_DCacheOpt$addCacheConfigItem$ID = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "configRsp" : is.readStruct(2, true, DCache.ConfigRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$addCacheConfigItem$PE = function (configReq, __$PROTOCOL$VERSION) {
    var tup = new TodoStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeStruct("configReq", configReq);
    return tup;
};

var __DCache_DCacheOpt$addCacheConfigItem$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readInt32("", 0),
                "arguments" : {
                    "configRsp" : tup.readStruct("configRsp", DCache.ConfigRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$addCacheConfigItem$ER = function (data) {
    throw _makeError(data, "Call DCacheOpt::addCacheConfigItem failed");
};

DCache.DCacheOptProxy.prototype.addCacheConfigItem = function (configReq) {
    var version = this._worker.version;
    if (version === TodoStream.Tup.TUP_SIMPLE || version === TodoStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("addCacheConfigItem", __DCache_DCacheOpt$addCacheConfigItem$PE(configReq, version), arguments[arguments.length - 1], __DCache_DCacheOpt$addCacheConfigItem$IF).then(__DCache_DCacheOpt$addCacheConfigItem$PD, __DCache_DCacheOpt$addCacheConfigItem$ER);
    } else {
        return this._worker.todo_invoke("addCacheConfigItem", __DCache_DCacheOpt$addCacheConfigItem$IE(configReq), arguments[arguments.length - 1], __DCache_DCacheOpt$addCacheConfigItem$IF).then(__DCache_DCacheOpt$addCacheConfigItem$ID, __DCache_DCacheOpt$addCacheConfigItem$ER);
    }
};
DCache.DCacheOptProxy.addCacheConfigItem = __DCache_DCacheOpt$addCacheConfigItem$IF;

var __DCache_DCacheOpt$addServerConfigItem$IF = {
    "name" : "addServerConfigItem",
    "return" : "int32",
    "arguments" : [{
        "name" : "configReq",
        "class" : "DCache.ServerConfigReq",
        "direction" : "in"
    }, {
        "name" : "configRsp",
        "class" : "DCache.ConfigRsp",
        "direction" : "out"
    }]
};

var __DCache_DCacheOpt$addServerConfigItem$IE = function (configReq) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, configReq);
    return os.getBinBuffer();
};

var __DCache_DCacheOpt$addServerConfigItem$ID = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "configRsp" : is.readStruct(2, true, DCache.ConfigRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$addServerConfigItem$PE = function (configReq, __$PROTOCOL$VERSION) {
    var tup = new TodoStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeStruct("configReq", configReq);
    return tup;
};

var __DCache_DCacheOpt$addServerConfigItem$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readInt32("", 0),
                "arguments" : {
                    "configRsp" : tup.readStruct("configRsp", DCache.ConfigRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$addServerConfigItem$ER = function (data) {
    throw _makeError(data, "Call DCacheOpt::addServerConfigItem failed");
};

DCache.DCacheOptProxy.prototype.addServerConfigItem = function (configReq) {
    var version = this._worker.version;
    if (version === TodoStream.Tup.TUP_SIMPLE || version === TodoStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("addServerConfigItem", __DCache_DCacheOpt$addServerConfigItem$PE(configReq, version), arguments[arguments.length - 1], __DCache_DCacheOpt$addServerConfigItem$IF).then(__DCache_DCacheOpt$addServerConfigItem$PD, __DCache_DCacheOpt$addServerConfigItem$ER);
    } else {
        return this._worker.todo_invoke("addServerConfigItem", __DCache_DCacheOpt$addServerConfigItem$IE(configReq), arguments[arguments.length - 1], __DCache_DCacheOpt$addServerConfigItem$IF).then(__DCache_DCacheOpt$addServerConfigItem$ID, __DCache_DCacheOpt$addServerConfigItem$ER);
    }
};
DCache.DCacheOptProxy.addServerConfigItem = __DCache_DCacheOpt$addServerConfigItem$IF;

var __DCache_DCacheOpt$configTransfer$IF = {
    "name" : "configTransfer",
    "return" : "int32",
    "arguments" : [{
        "name" : "req",
        "class" : "DCache.ConfigTransferReq",
        "direction" : "in"
    }, {
        "name" : "rsp",
        "class" : "DCache.ConfigTransferRsp",
        "direction" : "out"
    }]
};

var __DCache_DCacheOpt$configTransfer$IE = function (req) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, req);
    return os.getBinBuffer();
};

var __DCache_DCacheOpt$configTransfer$ID = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "rsp" : is.readStruct(2, true, DCache.ConfigTransferRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$configTransfer$PE = function (req, __$PROTOCOL$VERSION) {
    var tup = new TodoStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeStruct("req", req);
    return tup;
};

var __DCache_DCacheOpt$configTransfer$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readInt32("", 0),
                "arguments" : {
                    "rsp" : tup.readStruct("rsp", DCache.ConfigTransferRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$configTransfer$ER = function (data) {
    throw _makeError(data, "Call DCacheOpt::configTransfer failed");
};

DCache.DCacheOptProxy.prototype.configTransfer = function (req) {
    var version = this._worker.version;
    if (version === TodoStream.Tup.TUP_SIMPLE || version === TodoStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("configTransfer", __DCache_DCacheOpt$configTransfer$PE(req, version), arguments[arguments.length - 1], __DCache_DCacheOpt$configTransfer$IF).then(__DCache_DCacheOpt$configTransfer$PD, __DCache_DCacheOpt$configTransfer$ER);
    } else {
        return this._worker.todo_invoke("configTransfer", __DCache_DCacheOpt$configTransfer$IE(req), arguments[arguments.length - 1], __DCache_DCacheOpt$configTransfer$IF).then(__DCache_DCacheOpt$configTransfer$ID, __DCache_DCacheOpt$configTransfer$ER);
    }
};
DCache.DCacheOptProxy.configTransfer = __DCache_DCacheOpt$configTransfer$IF;

var __DCache_DCacheOpt$deleteCacheConfigItem$IF = {
    "name" : "deleteCacheConfigItem",
    "return" : "int32",
    "arguments" : [{
        "name" : "configReq",
        "class" : "DCache.CacheConfigReq",
        "direction" : "in"
    }, {
        "name" : "configRsp",
        "class" : "DCache.ConfigRsp",
        "direction" : "out"
    }]
};

var __DCache_DCacheOpt$deleteCacheConfigItem$IE = function (configReq) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, configReq);
    return os.getBinBuffer();
};

var __DCache_DCacheOpt$deleteCacheConfigItem$ID = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "configRsp" : is.readStruct(2, true, DCache.ConfigRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$deleteCacheConfigItem$PE = function (configReq, __$PROTOCOL$VERSION) {
    var tup = new TodoStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeStruct("configReq", configReq);
    return tup;
};

var __DCache_DCacheOpt$deleteCacheConfigItem$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readInt32("", 0),
                "arguments" : {
                    "configRsp" : tup.readStruct("configRsp", DCache.ConfigRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$deleteCacheConfigItem$ER = function (data) {
    throw _makeError(data, "Call DCacheOpt::deleteCacheConfigItem failed");
};

DCache.DCacheOptProxy.prototype.deleteCacheConfigItem = function (configReq) {
    var version = this._worker.version;
    if (version === TodoStream.Tup.TUP_SIMPLE || version === TodoStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("deleteCacheConfigItem", __DCache_DCacheOpt$deleteCacheConfigItem$PE(configReq, version), arguments[arguments.length - 1], __DCache_DCacheOpt$deleteCacheConfigItem$IF).then(__DCache_DCacheOpt$deleteCacheConfigItem$PD, __DCache_DCacheOpt$deleteCacheConfigItem$ER);
    } else {
        return this._worker.todo_invoke("deleteCacheConfigItem", __DCache_DCacheOpt$deleteCacheConfigItem$IE(configReq), arguments[arguments.length - 1], __DCache_DCacheOpt$deleteCacheConfigItem$IF).then(__DCache_DCacheOpt$deleteCacheConfigItem$ID, __DCache_DCacheOpt$deleteCacheConfigItem$ER);
    }
};
DCache.DCacheOptProxy.deleteCacheConfigItem = __DCache_DCacheOpt$deleteCacheConfigItem$IF;

var __DCache_DCacheOpt$deleteServerConfigItem$IF = {
    "name" : "deleteServerConfigItem",
    "return" : "int32",
    "arguments" : [{
        "name" : "configReq",
        "class" : "DCache.ServerConfigReq",
        "direction" : "in"
    }, {
        "name" : "configRsp",
        "class" : "DCache.ConfigRsp",
        "direction" : "out"
    }]
};

var __DCache_DCacheOpt$deleteServerConfigItem$IE = function (configReq) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, configReq);
    return os.getBinBuffer();
};

var __DCache_DCacheOpt$deleteServerConfigItem$ID = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "configRsp" : is.readStruct(2, true, DCache.ConfigRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$deleteServerConfigItem$PE = function (configReq, __$PROTOCOL$VERSION) {
    var tup = new TodoStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeStruct("configReq", configReq);
    return tup;
};

var __DCache_DCacheOpt$deleteServerConfigItem$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readInt32("", 0),
                "arguments" : {
                    "configRsp" : tup.readStruct("configRsp", DCache.ConfigRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$deleteServerConfigItem$ER = function (data) {
    throw _makeError(data, "Call DCacheOpt::deleteServerConfigItem failed");
};

DCache.DCacheOptProxy.prototype.deleteServerConfigItem = function (configReq) {
    var version = this._worker.version;
    if (version === TodoStream.Tup.TUP_SIMPLE || version === TodoStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("deleteServerConfigItem", __DCache_DCacheOpt$deleteServerConfigItem$PE(configReq, version), arguments[arguments.length - 1], __DCache_DCacheOpt$deleteServerConfigItem$IF).then(__DCache_DCacheOpt$deleteServerConfigItem$PD, __DCache_DCacheOpt$deleteServerConfigItem$ER);
    } else {
        return this._worker.todo_invoke("deleteServerConfigItem", __DCache_DCacheOpt$deleteServerConfigItem$IE(configReq), arguments[arguments.length - 1], __DCache_DCacheOpt$deleteServerConfigItem$IF).then(__DCache_DCacheOpt$deleteServerConfigItem$ID, __DCache_DCacheOpt$deleteServerConfigItem$ER);
    }
};
DCache.DCacheOptProxy.deleteServerConfigItem = __DCache_DCacheOpt$deleteServerConfigItem$IF;

var __DCache_DCacheOpt$deleteServerConfigItemBatch$IF = {
    "name" : "deleteServerConfigItemBatch",
    "return" : "int32",
    "arguments" : [{
        "name" : "configReq",
        "class" : "list(DCache.ServerConfigReq)",
        "direction" : "in"
    }, {
        "name" : "configRsp",
        "class" : "DCache.ConfigRsp",
        "direction" : "out"
    }]
};

var __DCache_DCacheOpt$deleteServerConfigItemBatch$IE = function (configReq) {
    var os = new TodoStream.TodoOutputStream();
    os.writeList(1, configReq);
    return os.getBinBuffer();
};

var __DCache_DCacheOpt$deleteServerConfigItemBatch$ID = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "configRsp" : is.readStruct(2, true, DCache.ConfigRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$deleteServerConfigItemBatch$PE = function (configReq, __$PROTOCOL$VERSION) {
    var tup = new TodoStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeList("configReq", configReq);
    return tup;
};

var __DCache_DCacheOpt$deleteServerConfigItemBatch$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readInt32("", 0),
                "arguments" : {
                    "configRsp" : tup.readStruct("configRsp", DCache.ConfigRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$deleteServerConfigItemBatch$ER = function (data) {
    throw _makeError(data, "Call DCacheOpt::deleteServerConfigItemBatch failed");
};

DCache.DCacheOptProxy.prototype.deleteServerConfigItemBatch = function (configReq) {
    var version = this._worker.version;
    if (version === TodoStream.Tup.TUP_SIMPLE || version === TodoStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("deleteServerConfigItemBatch", __DCache_DCacheOpt$deleteServerConfigItemBatch$PE(configReq, version), arguments[arguments.length - 1], __DCache_DCacheOpt$deleteServerConfigItemBatch$IF).then(__DCache_DCacheOpt$deleteServerConfigItemBatch$PD, __DCache_DCacheOpt$deleteServerConfigItemBatch$ER);
    } else {
        return this._worker.todo_invoke("deleteServerConfigItemBatch", __DCache_DCacheOpt$deleteServerConfigItemBatch$IE(configReq), arguments[arguments.length - 1], __DCache_DCacheOpt$deleteServerConfigItemBatch$IF).then(__DCache_DCacheOpt$deleteServerConfigItemBatch$ID, __DCache_DCacheOpt$deleteServerConfigItemBatch$ER);
    }
};
DCache.DCacheOptProxy.deleteServerConfigItemBatch = __DCache_DCacheOpt$deleteServerConfigItemBatch$IF;

var __DCache_DCacheOpt$deleteTransfer$IF = {
    "name" : "deleteTransfer",
    "return" : "int32",
    "arguments" : [{
        "name" : "req",
        "class" : "DCache.DeleteTransferReq",
        "direction" : "in"
    }, {
        "name" : "rsp",
        "class" : "DCache.DeleteTransferRsp",
        "direction" : "out"
    }]
};

var __DCache_DCacheOpt$deleteTransfer$IE = function (req) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, req);
    return os.getBinBuffer();
};

var __DCache_DCacheOpt$deleteTransfer$ID = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "rsp" : is.readStruct(2, true, DCache.DeleteTransferRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$deleteTransfer$PE = function (req, __$PROTOCOL$VERSION) {
    var tup = new TodoStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeStruct("req", req);
    return tup;
};

var __DCache_DCacheOpt$deleteTransfer$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readInt32("", 0),
                "arguments" : {
                    "rsp" : tup.readStruct("rsp", DCache.DeleteTransferRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$deleteTransfer$ER = function (data) {
    throw _makeError(data, "Call DCacheOpt::deleteTransfer failed");
};

DCache.DCacheOptProxy.prototype.deleteTransfer = function (req) {
    var version = this._worker.version;
    if (version === TodoStream.Tup.TUP_SIMPLE || version === TodoStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("deleteTransfer", __DCache_DCacheOpt$deleteTransfer$PE(req, version), arguments[arguments.length - 1], __DCache_DCacheOpt$deleteTransfer$IF).then(__DCache_DCacheOpt$deleteTransfer$PD, __DCache_DCacheOpt$deleteTransfer$ER);
    } else {
        return this._worker.todo_invoke("deleteTransfer", __DCache_DCacheOpt$deleteTransfer$IE(req), arguments[arguments.length - 1], __DCache_DCacheOpt$deleteTransfer$IF).then(__DCache_DCacheOpt$deleteTransfer$ID, __DCache_DCacheOpt$deleteTransfer$ER);
    }
};
DCache.DCacheOptProxy.deleteTransfer = __DCache_DCacheOpt$deleteTransfer$IF;

var __DCache_DCacheOpt$expandDCache$IF = {
    "name" : "expandDCache",
    "return" : "int32",
    "arguments" : [{
        "name" : "expandReq",
        "class" : "DCache.ExpandReq",
        "direction" : "in"
    }, {
        "name" : "expandRsp",
        "class" : "DCache.ExpandRsp",
        "direction" : "out"
    }]
};

var __DCache_DCacheOpt$expandDCache$IE = function (expandReq) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, expandReq);
    return os.getBinBuffer();
};

var __DCache_DCacheOpt$expandDCache$ID = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "expandRsp" : is.readStruct(2, true, DCache.ExpandRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$expandDCache$PE = function (expandReq, __$PROTOCOL$VERSION) {
    var tup = new TodoStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeStruct("expandReq", expandReq);
    return tup;
};

var __DCache_DCacheOpt$expandDCache$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readInt32("", 0),
                "arguments" : {
                    "expandRsp" : tup.readStruct("expandRsp", DCache.ExpandRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$expandDCache$ER = function (data) {
    throw _makeError(data, "Call DCacheOpt::expandDCache failed");
};

DCache.DCacheOptProxy.prototype.expandDCache = function (expandReq) {
    var version = this._worker.version;
    if (version === TodoStream.Tup.TUP_SIMPLE || version === TodoStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("expandDCache", __DCache_DCacheOpt$expandDCache$PE(expandReq, version), arguments[arguments.length - 1], __DCache_DCacheOpt$expandDCache$IF).then(__DCache_DCacheOpt$expandDCache$PD, __DCache_DCacheOpt$expandDCache$ER);
    } else {
        return this._worker.todo_invoke("expandDCache", __DCache_DCacheOpt$expandDCache$IE(expandReq), arguments[arguments.length - 1], __DCache_DCacheOpt$expandDCache$IF).then(__DCache_DCacheOpt$expandDCache$ID, __DCache_DCacheOpt$expandDCache$ER);
    }
};
DCache.DCacheOptProxy.expandDCache = __DCache_DCacheOpt$expandDCache$IF;

var __DCache_DCacheOpt$getCacheConfigItemList$IF = {
    "name" : "getCacheConfigItemList",
    "return" : "int32",
    "arguments" : [{
        "name" : "configReq",
        "class" : "DCache.CacheConfigReq",
        "direction" : "in"
    }, {
        "name" : "configRsp",
        "class" : "DCache.ConfigRsp",
        "direction" : "out"
    }]
};

var __DCache_DCacheOpt$getCacheConfigItemList$IE = function (configReq) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, configReq);
    return os.getBinBuffer();
};

var __DCache_DCacheOpt$getCacheConfigItemList$ID = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "configRsp" : is.readStruct(2, true, DCache.ConfigRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$getCacheConfigItemList$PE = function (configReq, __$PROTOCOL$VERSION) {
    var tup = new TodoStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeStruct("configReq", configReq);
    return tup;
};

var __DCache_DCacheOpt$getCacheConfigItemList$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readInt32("", 0),
                "arguments" : {
                    "configRsp" : tup.readStruct("configRsp", DCache.ConfigRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$getCacheConfigItemList$ER = function (data) {
    throw _makeError(data, "Call DCacheOpt::getCacheConfigItemList failed");
};

DCache.DCacheOptProxy.prototype.getCacheConfigItemList = function (configReq) {
    var version = this._worker.version;
    if (version === TodoStream.Tup.TUP_SIMPLE || version === TodoStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("getCacheConfigItemList", __DCache_DCacheOpt$getCacheConfigItemList$PE(configReq, version), arguments[arguments.length - 1], __DCache_DCacheOpt$getCacheConfigItemList$IF).then(__DCache_DCacheOpt$getCacheConfigItemList$PD, __DCache_DCacheOpt$getCacheConfigItemList$ER);
    } else {
        return this._worker.todo_invoke("getCacheConfigItemList", __DCache_DCacheOpt$getCacheConfigItemList$IE(configReq), arguments[arguments.length - 1], __DCache_DCacheOpt$getCacheConfigItemList$IF).then(__DCache_DCacheOpt$getCacheConfigItemList$ID, __DCache_DCacheOpt$getCacheConfigItemList$ER);
    }
};
DCache.DCacheOptProxy.getCacheConfigItemList = __DCache_DCacheOpt$getCacheConfigItemList$IF;

var __DCache_DCacheOpt$getCacheServerList$IF = {
    "name" : "getCacheServerList",
    "return" : "int32",
    "arguments" : [{
        "name" : "req",
        "class" : "DCache.CacheServerListReq",
        "direction" : "in"
    }, {
        "name" : "rsp",
        "class" : "DCache.CacheServerListRsp",
        "direction" : "out"
    }]
};

var __DCache_DCacheOpt$getCacheServerList$IE = function (req) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, req);
    return os.getBinBuffer();
};

var __DCache_DCacheOpt$getCacheServerList$ID = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "rsp" : is.readStruct(2, true, DCache.CacheServerListRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$getCacheServerList$PE = function (req, __$PROTOCOL$VERSION) {
    var tup = new TodoStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeStruct("req", req);
    return tup;
};

var __DCache_DCacheOpt$getCacheServerList$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readInt32("", 0),
                "arguments" : {
                    "rsp" : tup.readStruct("rsp", DCache.CacheServerListRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$getCacheServerList$ER = function (data) {
    throw _makeError(data, "Call DCacheOpt::getCacheServerList failed");
};

DCache.DCacheOptProxy.prototype.getCacheServerList = function (req) {
    var version = this._worker.version;
    if (version === TodoStream.Tup.TUP_SIMPLE || version === TodoStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("getCacheServerList", __DCache_DCacheOpt$getCacheServerList$PE(req, version), arguments[arguments.length - 1], __DCache_DCacheOpt$getCacheServerList$IF).then(__DCache_DCacheOpt$getCacheServerList$PD, __DCache_DCacheOpt$getCacheServerList$ER);
    } else {
        return this._worker.todo_invoke("getCacheServerList", __DCache_DCacheOpt$getCacheServerList$IE(req), arguments[arguments.length - 1], __DCache_DCacheOpt$getCacheServerList$IF).then(__DCache_DCacheOpt$getCacheServerList$ID, __DCache_DCacheOpt$getCacheServerList$ER);
    }
};
DCache.DCacheOptProxy.getCacheServerList = __DCache_DCacheOpt$getCacheServerList$IF;

var __DCache_DCacheOpt$getModuleStruct$IF = {
    "name" : "getModuleStruct",
    "return" : "int32",
    "arguments" : [{
        "name" : "req",
        "class" : "DCache.ModuleStructReq",
        "direction" : "in"
    }, {
        "name" : "rsp",
        "class" : "DCache.ModuleStructRsp",
        "direction" : "out"
    }]
};

var __DCache_DCacheOpt$getModuleStruct$IE = function (req) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, req);
    return os.getBinBuffer();
};

var __DCache_DCacheOpt$getModuleStruct$ID = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "rsp" : is.readStruct(2, true, DCache.ModuleStructRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$getModuleStruct$PE = function (req, __$PROTOCOL$VERSION) {
    var tup = new TodoStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeStruct("req", req);
    return tup;
};

var __DCache_DCacheOpt$getModuleStruct$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readInt32("", 0),
                "arguments" : {
                    "rsp" : tup.readStruct("rsp", DCache.ModuleStructRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$getModuleStruct$ER = function (data) {
    throw _makeError(data, "Call DCacheOpt::getModuleStruct failed");
};

DCache.DCacheOptProxy.prototype.getModuleStruct = function (req) {
    var version = this._worker.version;
    if (version === TodoStream.Tup.TUP_SIMPLE || version === TodoStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("getModuleStruct", __DCache_DCacheOpt$getModuleStruct$PE(req, version), arguments[arguments.length - 1], __DCache_DCacheOpt$getModuleStruct$IF).then(__DCache_DCacheOpt$getModuleStruct$PD, __DCache_DCacheOpt$getModuleStruct$ER);
    } else {
        return this._worker.todo_invoke("getModuleStruct", __DCache_DCacheOpt$getModuleStruct$IE(req), arguments[arguments.length - 1], __DCache_DCacheOpt$getModuleStruct$IF).then(__DCache_DCacheOpt$getModuleStruct$ID, __DCache_DCacheOpt$getModuleStruct$ER);
    }
};
DCache.DCacheOptProxy.getModuleStruct = __DCache_DCacheOpt$getModuleStruct$IF;

var __DCache_DCacheOpt$getReleaseProgress$IF = {
    "name" : "getReleaseProgress",
    "return" : "int32",
    "arguments" : [{
        "name" : "progressReq",
        "class" : "DCache.ReleaseProgressReq",
        "direction" : "in"
    }, {
        "name" : "progressRsp",
        "class" : "DCache.ReleaseProgressRsp",
        "direction" : "out"
    }]
};

var __DCache_DCacheOpt$getReleaseProgress$IE = function (progressReq) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, progressReq);
    return os.getBinBuffer();
};

var __DCache_DCacheOpt$getReleaseProgress$ID = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "progressRsp" : is.readStruct(2, true, DCache.ReleaseProgressRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$getReleaseProgress$PE = function (progressReq, __$PROTOCOL$VERSION) {
    var tup = new TodoStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeStruct("progressReq", progressReq);
    return tup;
};

var __DCache_DCacheOpt$getReleaseProgress$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readInt32("", 0),
                "arguments" : {
                    "progressRsp" : tup.readStruct("progressRsp", DCache.ReleaseProgressRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$getReleaseProgress$ER = function (data) {
    throw _makeError(data, "Call DCacheOpt::getReleaseProgress failed");
};

DCache.DCacheOptProxy.prototype.getReleaseProgress = function (progressReq) {
    var version = this._worker.version;
    if (version === TodoStream.Tup.TUP_SIMPLE || version === TodoStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("getReleaseProgress", __DCache_DCacheOpt$getReleaseProgress$PE(progressReq, version), arguments[arguments.length - 1], __DCache_DCacheOpt$getReleaseProgress$IF).then(__DCache_DCacheOpt$getReleaseProgress$PD, __DCache_DCacheOpt$getReleaseProgress$ER);
    } else {
        return this._worker.todo_invoke("getReleaseProgress", __DCache_DCacheOpt$getReleaseProgress$IE(progressReq), arguments[arguments.length - 1], __DCache_DCacheOpt$getReleaseProgress$IF).then(__DCache_DCacheOpt$getReleaseProgress$ID, __DCache_DCacheOpt$getReleaseProgress$ER);
    }
};
DCache.DCacheOptProxy.getReleaseProgress = __DCache_DCacheOpt$getReleaseProgress$IF;

var __DCache_DCacheOpt$getRouterChange$IF = {
    "name" : "getRouterChange",
    "return" : "int32",
    "arguments" : [{
        "name" : "req",
        "class" : "DCache.RouterChangeReq",
        "direction" : "in"
    }, {
        "name" : "rsp",
        "class" : "DCache.RouterChangeRsp",
        "direction" : "out"
    }]
};

var __DCache_DCacheOpt$getRouterChange$IE = function (req) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, req);
    return os.getBinBuffer();
};

var __DCache_DCacheOpt$getRouterChange$ID = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "rsp" : is.readStruct(2, true, DCache.RouterChangeRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$getRouterChange$PE = function (req, __$PROTOCOL$VERSION) {
    var tup = new TodoStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeStruct("req", req);
    return tup;
};

var __DCache_DCacheOpt$getRouterChange$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readInt32("", 0),
                "arguments" : {
                    "rsp" : tup.readStruct("rsp", DCache.RouterChangeRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$getRouterChange$ER = function (data) {
    throw _makeError(data, "Call DCacheOpt::getRouterChange failed");
};

DCache.DCacheOptProxy.prototype.getRouterChange = function (req) {
    var version = this._worker.version;
    if (version === TodoStream.Tup.TUP_SIMPLE || version === TodoStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("getRouterChange", __DCache_DCacheOpt$getRouterChange$PE(req, version), arguments[arguments.length - 1], __DCache_DCacheOpt$getRouterChange$IF).then(__DCache_DCacheOpt$getRouterChange$PD, __DCache_DCacheOpt$getRouterChange$ER);
    } else {
        return this._worker.todo_invoke("getRouterChange", __DCache_DCacheOpt$getRouterChange$IE(req), arguments[arguments.length - 1], __DCache_DCacheOpt$getRouterChange$IF).then(__DCache_DCacheOpt$getRouterChange$ID, __DCache_DCacheOpt$getRouterChange$ER);
    }
};
DCache.DCacheOptProxy.getRouterChange = __DCache_DCacheOpt$getRouterChange$IF;

var __DCache_DCacheOpt$getServerConfigItemList$IF = {
    "name" : "getServerConfigItemList",
    "return" : "int32",
    "arguments" : [{
        "name" : "configReq",
        "class" : "DCache.ServerConfigReq",
        "direction" : "in"
    }, {
        "name" : "configRsp",
        "class" : "DCache.ConfigRsp",
        "direction" : "out"
    }]
};

var __DCache_DCacheOpt$getServerConfigItemList$IE = function (configReq) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, configReq);
    return os.getBinBuffer();
};

var __DCache_DCacheOpt$getServerConfigItemList$ID = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "configRsp" : is.readStruct(2, true, DCache.ConfigRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$getServerConfigItemList$PE = function (configReq, __$PROTOCOL$VERSION) {
    var tup = new TodoStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeStruct("configReq", configReq);
    return tup;
};

var __DCache_DCacheOpt$getServerConfigItemList$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readInt32("", 0),
                "arguments" : {
                    "configRsp" : tup.readStruct("configRsp", DCache.ConfigRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$getServerConfigItemList$ER = function (data) {
    throw _makeError(data, "Call DCacheOpt::getServerConfigItemList failed");
};

DCache.DCacheOptProxy.prototype.getServerConfigItemList = function (configReq) {
    var version = this._worker.version;
    if (version === TodoStream.Tup.TUP_SIMPLE || version === TodoStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("getServerConfigItemList", __DCache_DCacheOpt$getServerConfigItemList$PE(configReq, version), arguments[arguments.length - 1], __DCache_DCacheOpt$getServerConfigItemList$IF).then(__DCache_DCacheOpt$getServerConfigItemList$PD, __DCache_DCacheOpt$getServerConfigItemList$ER);
    } else {
        return this._worker.todo_invoke("getServerConfigItemList", __DCache_DCacheOpt$getServerConfigItemList$IE(configReq), arguments[arguments.length - 1], __DCache_DCacheOpt$getServerConfigItemList$IF).then(__DCache_DCacheOpt$getServerConfigItemList$ID, __DCache_DCacheOpt$getServerConfigItemList$ER);
    }
};
DCache.DCacheOptProxy.getServerConfigItemList = __DCache_DCacheOpt$getServerConfigItemList$IF;

var __DCache_DCacheOpt$getServerNodeConfigItemList$IF = {
    "name" : "getServerNodeConfigItemList",
    "return" : "int32",
    "arguments" : [{
        "name" : "configReq",
        "class" : "DCache.ServerConfigReq",
        "direction" : "in"
    }, {
        "name" : "configRsp",
        "class" : "DCache.ConfigRsp",
        "direction" : "out"
    }]
};

var __DCache_DCacheOpt$getServerNodeConfigItemList$IE = function (configReq) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, configReq);
    return os.getBinBuffer();
};

var __DCache_DCacheOpt$getServerNodeConfigItemList$ID = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "configRsp" : is.readStruct(2, true, DCache.ConfigRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$getServerNodeConfigItemList$PE = function (configReq, __$PROTOCOL$VERSION) {
    var tup = new TodoStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeStruct("configReq", configReq);
    return tup;
};

var __DCache_DCacheOpt$getServerNodeConfigItemList$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readInt32("", 0),
                "arguments" : {
                    "configRsp" : tup.readStruct("configRsp", DCache.ConfigRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$getServerNodeConfigItemList$ER = function (data) {
    throw _makeError(data, "Call DCacheOpt::getServerNodeConfigItemList failed");
};

DCache.DCacheOptProxy.prototype.getServerNodeConfigItemList = function (configReq) {
    var version = this._worker.version;
    if (version === TodoStream.Tup.TUP_SIMPLE || version === TodoStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("getServerNodeConfigItemList", __DCache_DCacheOpt$getServerNodeConfigItemList$PE(configReq, version), arguments[arguments.length - 1], __DCache_DCacheOpt$getServerNodeConfigItemList$IF).then(__DCache_DCacheOpt$getServerNodeConfigItemList$PD, __DCache_DCacheOpt$getServerNodeConfigItemList$ER);
    } else {
        return this._worker.todo_invoke("getServerNodeConfigItemList", __DCache_DCacheOpt$getServerNodeConfigItemList$IE(configReq), arguments[arguments.length - 1], __DCache_DCacheOpt$getServerNodeConfigItemList$IF).then(__DCache_DCacheOpt$getServerNodeConfigItemList$ID, __DCache_DCacheOpt$getServerNodeConfigItemList$ER);
    }
};
DCache.DCacheOptProxy.getServerNodeConfigItemList = __DCache_DCacheOpt$getServerNodeConfigItemList$IF;

var __DCache_DCacheOpt$getSwitchInfo$IF = {
    "name" : "getSwitchInfo",
    "return" : "int32",
    "arguments" : [{
        "name" : "req",
        "class" : "DCache.SwitchInfoReq",
        "direction" : "in"
    }, {
        "name" : "rsp",
        "class" : "DCache.SwitchInfoRsp",
        "direction" : "out"
    }]
};

var __DCache_DCacheOpt$getSwitchInfo$IE = function (req) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, req);
    return os.getBinBuffer();
};

var __DCache_DCacheOpt$getSwitchInfo$ID = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "rsp" : is.readStruct(2, true, DCache.SwitchInfoRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$getSwitchInfo$PE = function (req, __$PROTOCOL$VERSION) {
    var tup = new TodoStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeStruct("req", req);
    return tup;
};

var __DCache_DCacheOpt$getSwitchInfo$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readInt32("", 0),
                "arguments" : {
                    "rsp" : tup.readStruct("rsp", DCache.SwitchInfoRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$getSwitchInfo$ER = function (data) {
    throw _makeError(data, "Call DCacheOpt::getSwitchInfo failed");
};

DCache.DCacheOptProxy.prototype.getSwitchInfo = function (req) {
    var version = this._worker.version;
    if (version === TodoStream.Tup.TUP_SIMPLE || version === TodoStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("getSwitchInfo", __DCache_DCacheOpt$getSwitchInfo$PE(req, version), arguments[arguments.length - 1], __DCache_DCacheOpt$getSwitchInfo$IF).then(__DCache_DCacheOpt$getSwitchInfo$PD, __DCache_DCacheOpt$getSwitchInfo$ER);
    } else {
        return this._worker.todo_invoke("getSwitchInfo", __DCache_DCacheOpt$getSwitchInfo$IE(req), arguments[arguments.length - 1], __DCache_DCacheOpt$getSwitchInfo$IF).then(__DCache_DCacheOpt$getSwitchInfo$ID, __DCache_DCacheOpt$getSwitchInfo$ER);
    }
};
DCache.DCacheOptProxy.getSwitchInfo = __DCache_DCacheOpt$getSwitchInfo$IF;

var __DCache_DCacheOpt$getUninstallPercent$IF = {
    "name" : "getUninstallPercent",
    "return" : "int32",
    "arguments" : [{
        "name" : "uninstallInfo",
        "class" : "DCache.UninstallReq",
        "direction" : "in"
    }, {
        "name" : "progressRsp",
        "class" : "DCache.UninstallProgressRsp",
        "direction" : "out"
    }]
};

var __DCache_DCacheOpt$getUninstallPercent$IE = function (uninstallInfo) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, uninstallInfo);
    return os.getBinBuffer();
};

var __DCache_DCacheOpt$getUninstallPercent$ID = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "progressRsp" : is.readStruct(2, true, DCache.UninstallProgressRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$getUninstallPercent$PE = function (uninstallInfo, __$PROTOCOL$VERSION) {
    var tup = new TodoStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeStruct("uninstallInfo", uninstallInfo);
    return tup;
};

var __DCache_DCacheOpt$getUninstallPercent$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readInt32("", 0),
                "arguments" : {
                    "progressRsp" : tup.readStruct("progressRsp", DCache.UninstallProgressRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$getUninstallPercent$ER = function (data) {
    throw _makeError(data, "Call DCacheOpt::getUninstallPercent failed");
};

DCache.DCacheOptProxy.prototype.getUninstallPercent = function (uninstallInfo) {
    var version = this._worker.version;
    if (version === TodoStream.Tup.TUP_SIMPLE || version === TodoStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("getUninstallPercent", __DCache_DCacheOpt$getUninstallPercent$PE(uninstallInfo, version), arguments[arguments.length - 1], __DCache_DCacheOpt$getUninstallPercent$IF).then(__DCache_DCacheOpt$getUninstallPercent$PD, __DCache_DCacheOpt$getUninstallPercent$ER);
    } else {
        return this._worker.todo_invoke("getUninstallPercent", __DCache_DCacheOpt$getUninstallPercent$IE(uninstallInfo), arguments[arguments.length - 1], __DCache_DCacheOpt$getUninstallPercent$IF).then(__DCache_DCacheOpt$getUninstallPercent$ID, __DCache_DCacheOpt$getUninstallPercent$ER);
    }
};
DCache.DCacheOptProxy.getUninstallPercent = __DCache_DCacheOpt$getUninstallPercent$IF;

var __DCache_DCacheOpt$installApp$IF = {
    "name" : "installApp",
    "return" : "int32",
    "arguments" : [{
        "name" : "installReq",
        "class" : "DCache.InstallAppReq",
        "direction" : "in"
    }, {
        "name" : "instalRsp",
        "class" : "DCache.InstallAppRsp",
        "direction" : "out"
    }]
};

var __DCache_DCacheOpt$installApp$IE = function (installReq) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, installReq);
    return os.getBinBuffer();
};

var __DCache_DCacheOpt$installApp$ID = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "instalRsp" : is.readStruct(2, true, DCache.InstallAppRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$installApp$PE = function (installReq, __$PROTOCOL$VERSION) {
    var tup = new TodoStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeStruct("installReq", installReq);
    return tup;
};

var __DCache_DCacheOpt$installApp$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readInt32("", 0),
                "arguments" : {
                    "instalRsp" : tup.readStruct("instalRsp", DCache.InstallAppRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$installApp$ER = function (data) {
    throw _makeError(data, "Call DCacheOpt::installApp failed");
};

DCache.DCacheOptProxy.prototype.installApp = function (installReq) {
    var version = this._worker.version;
    if (version === TodoStream.Tup.TUP_SIMPLE || version === TodoStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("installApp", __DCache_DCacheOpt$installApp$PE(installReq, version), arguments[arguments.length - 1], __DCache_DCacheOpt$installApp$IF).then(__DCache_DCacheOpt$installApp$PD, __DCache_DCacheOpt$installApp$ER);
    } else {
        return this._worker.todo_invoke("installApp", __DCache_DCacheOpt$installApp$IE(installReq), arguments[arguments.length - 1], __DCache_DCacheOpt$installApp$IF).then(__DCache_DCacheOpt$installApp$ID, __DCache_DCacheOpt$installApp$ER);
    }
};
DCache.DCacheOptProxy.installApp = __DCache_DCacheOpt$installApp$IF;

var __DCache_DCacheOpt$installKVCacheModule$IF = {
    "name" : "installKVCacheModule",
    "return" : "int32",
    "arguments" : [{
        "name" : "kvCacheReq",
        "class" : "DCache.InstallKVCacheReq",
        "direction" : "in"
    }, {
        "name" : "kvCacheRsp",
        "class" : "DCache.InstallKVCacheRsp",
        "direction" : "out"
    }]
};

var __DCache_DCacheOpt$installKVCacheModule$IE = function (kvCacheReq) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, kvCacheReq);
    return os.getBinBuffer();
};

var __DCache_DCacheOpt$installKVCacheModule$ID = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "kvCacheRsp" : is.readStruct(2, true, DCache.InstallKVCacheRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$installKVCacheModule$PE = function (kvCacheReq, __$PROTOCOL$VERSION) {
    var tup = new TodoStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeStruct("kvCacheReq", kvCacheReq);
    return tup;
};

var __DCache_DCacheOpt$installKVCacheModule$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readInt32("", 0),
                "arguments" : {
                    "kvCacheRsp" : tup.readStruct("kvCacheRsp", DCache.InstallKVCacheRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$installKVCacheModule$ER = function (data) {
    throw _makeError(data, "Call DCacheOpt::installKVCacheModule failed");
};

DCache.DCacheOptProxy.prototype.installKVCacheModule = function (kvCacheReq) {
    var version = this._worker.version;
    if (version === TodoStream.Tup.TUP_SIMPLE || version === TodoStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("installKVCacheModule", __DCache_DCacheOpt$installKVCacheModule$PE(kvCacheReq, version), arguments[arguments.length - 1], __DCache_DCacheOpt$installKVCacheModule$IF).then(__DCache_DCacheOpt$installKVCacheModule$PD, __DCache_DCacheOpt$installKVCacheModule$ER);
    } else {
        return this._worker.todo_invoke("installKVCacheModule", __DCache_DCacheOpt$installKVCacheModule$IE(kvCacheReq), arguments[arguments.length - 1], __DCache_DCacheOpt$installKVCacheModule$IF).then(__DCache_DCacheOpt$installKVCacheModule$ID, __DCache_DCacheOpt$installKVCacheModule$ER);
    }
};
DCache.DCacheOptProxy.installKVCacheModule = __DCache_DCacheOpt$installKVCacheModule$IF;

var __DCache_DCacheOpt$installMKVCacheModule$IF = {
    "name" : "installMKVCacheModule",
    "return" : "int32",
    "arguments" : [{
        "name" : "mkvCacheReq",
        "class" : "DCache.InstallMKVCacheReq",
        "direction" : "in"
    }, {
        "name" : "mkvCacheRsp",
        "class" : "DCache.InstallMKVCacheRsp",
        "direction" : "out"
    }]
};

var __DCache_DCacheOpt$installMKVCacheModule$IE = function (mkvCacheReq) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, mkvCacheReq);
    return os.getBinBuffer();
};

var __DCache_DCacheOpt$installMKVCacheModule$ID = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "mkvCacheRsp" : is.readStruct(2, true, DCache.InstallMKVCacheRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$installMKVCacheModule$PE = function (mkvCacheReq, __$PROTOCOL$VERSION) {
    var tup = new TodoStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeStruct("mkvCacheReq", mkvCacheReq);
    return tup;
};

var __DCache_DCacheOpt$installMKVCacheModule$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readInt32("", 0),
                "arguments" : {
                    "mkvCacheRsp" : tup.readStruct("mkvCacheRsp", DCache.InstallMKVCacheRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$installMKVCacheModule$ER = function (data) {
    throw _makeError(data, "Call DCacheOpt::installMKVCacheModule failed");
};

DCache.DCacheOptProxy.prototype.installMKVCacheModule = function (mkvCacheReq) {
    var version = this._worker.version;
    if (version === TodoStream.Tup.TUP_SIMPLE || version === TodoStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("installMKVCacheModule", __DCache_DCacheOpt$installMKVCacheModule$PE(mkvCacheReq, version), arguments[arguments.length - 1], __DCache_DCacheOpt$installMKVCacheModule$IF).then(__DCache_DCacheOpt$installMKVCacheModule$PD, __DCache_DCacheOpt$installMKVCacheModule$ER);
    } else {
        return this._worker.todo_invoke("installMKVCacheModule", __DCache_DCacheOpt$installMKVCacheModule$IE(mkvCacheReq), arguments[arguments.length - 1], __DCache_DCacheOpt$installMKVCacheModule$IF).then(__DCache_DCacheOpt$installMKVCacheModule$ID, __DCache_DCacheOpt$installMKVCacheModule$ER);
    }
};
DCache.DCacheOptProxy.installMKVCacheModule = __DCache_DCacheOpt$installMKVCacheModule$IF;

var __DCache_DCacheOpt$queryProperptyData$IF = {
    "name" : "queryProperptyData",
    "return" : "int32",
    "arguments" : [{
        "name" : "req",
        "class" : "DCache.QueryPropReq",
        "direction" : "in"
    }, {
        "name" : "rsp",
        "class" : "list(DCache.QueryResult)",
        "direction" : "out"
    }]
};

var __DCache_DCacheOpt$queryProperptyData$IE = function (req) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, req);
    return os.getBinBuffer();
};

var __DCache_DCacheOpt$queryProperptyData$ID = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "rsp" : is.readList(2, true, TodoStream.List(DCache.QueryResult))
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$queryProperptyData$PE = function (req, __$PROTOCOL$VERSION) {
    var tup = new TodoStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeStruct("req", req);
    return tup;
};

var __DCache_DCacheOpt$queryProperptyData$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readInt32("", 0),
                "arguments" : {
                    "rsp" : tup.readList("rsp", TodoStream.List(DCache.QueryResult))
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$queryProperptyData$ER = function (data) {
    throw _makeError(data, "Call DCacheOpt::queryProperptyData failed");
};

DCache.DCacheOptProxy.prototype.queryProperptyData = function (req) {
    var version = this._worker.version;
    if (version === TodoStream.Tup.TUP_SIMPLE || version === TodoStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("queryProperptyData", __DCache_DCacheOpt$queryProperptyData$PE(req, version), arguments[arguments.length - 1], __DCache_DCacheOpt$queryProperptyData$IF).then(__DCache_DCacheOpt$queryProperptyData$PD, __DCache_DCacheOpt$queryProperptyData$ER);
    } else {
        return this._worker.todo_invoke("queryProperptyData", __DCache_DCacheOpt$queryProperptyData$IE(req), arguments[arguments.length - 1], __DCache_DCacheOpt$queryProperptyData$IF).then(__DCache_DCacheOpt$queryProperptyData$ID, __DCache_DCacheOpt$queryProperptyData$ER);
    }
};
DCache.DCacheOptProxy.queryProperptyData = __DCache_DCacheOpt$queryProperptyData$IF;

var __DCache_DCacheOpt$recoverMirrorStatus$IF = {
    "name" : "recoverMirrorStatus",
    "return" : "int32",
    "arguments" : [{
        "name" : "req",
        "class" : "DCache.RecoverMirrorReq",
        "direction" : "in"
    }, {
        "name" : "rsp",
        "class" : "DCache.RecoverMirrorRsp",
        "direction" : "out"
    }]
};

var __DCache_DCacheOpt$recoverMirrorStatus$IE = function (req) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, req);
    return os.getBinBuffer();
};

var __DCache_DCacheOpt$recoverMirrorStatus$ID = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "rsp" : is.readStruct(2, true, DCache.RecoverMirrorRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$recoverMirrorStatus$PE = function (req, __$PROTOCOL$VERSION) {
    var tup = new TodoStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeStruct("req", req);
    return tup;
};

var __DCache_DCacheOpt$recoverMirrorStatus$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readInt32("", 0),
                "arguments" : {
                    "rsp" : tup.readStruct("rsp", DCache.RecoverMirrorRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$recoverMirrorStatus$ER = function (data) {
    throw _makeError(data, "Call DCacheOpt::recoverMirrorStatus failed");
};

DCache.DCacheOptProxy.prototype.recoverMirrorStatus = function (req) {
    var version = this._worker.version;
    if (version === TodoStream.Tup.TUP_SIMPLE || version === TodoStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("recoverMirrorStatus", __DCache_DCacheOpt$recoverMirrorStatus$PE(req, version), arguments[arguments.length - 1], __DCache_DCacheOpt$recoverMirrorStatus$IF).then(__DCache_DCacheOpt$recoverMirrorStatus$PD, __DCache_DCacheOpt$recoverMirrorStatus$ER);
    } else {
        return this._worker.todo_invoke("recoverMirrorStatus", __DCache_DCacheOpt$recoverMirrorStatus$IE(req), arguments[arguments.length - 1], __DCache_DCacheOpt$recoverMirrorStatus$IF).then(__DCache_DCacheOpt$recoverMirrorStatus$ID, __DCache_DCacheOpt$recoverMirrorStatus$ER);
    }
};
DCache.DCacheOptProxy.recoverMirrorStatus = __DCache_DCacheOpt$recoverMirrorStatus$IF;

var __DCache_DCacheOpt$reduceDCache$IF = {
    "name" : "reduceDCache",
    "return" : "int32",
    "arguments" : [{
        "name" : "reduceReq",
        "class" : "DCache.ReduceReq",
        "direction" : "in"
    }, {
        "name" : "reduceRsp",
        "class" : "DCache.ReduceRsp",
        "direction" : "out"
    }]
};

var __DCache_DCacheOpt$reduceDCache$IE = function (reduceReq) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, reduceReq);
    return os.getBinBuffer();
};

var __DCache_DCacheOpt$reduceDCache$ID = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "reduceRsp" : is.readStruct(2, true, DCache.ReduceRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$reduceDCache$PE = function (reduceReq, __$PROTOCOL$VERSION) {
    var tup = new TodoStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeStruct("reduceReq", reduceReq);
    return tup;
};

var __DCache_DCacheOpt$reduceDCache$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readInt32("", 0),
                "arguments" : {
                    "reduceRsp" : tup.readStruct("reduceRsp", DCache.ReduceRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$reduceDCache$ER = function (data) {
    throw _makeError(data, "Call DCacheOpt::reduceDCache failed");
};

DCache.DCacheOptProxy.prototype.reduceDCache = function (reduceReq) {
    var version = this._worker.version;
    if (version === TodoStream.Tup.TUP_SIMPLE || version === TodoStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("reduceDCache", __DCache_DCacheOpt$reduceDCache$PE(reduceReq, version), arguments[arguments.length - 1], __DCache_DCacheOpt$reduceDCache$IF).then(__DCache_DCacheOpt$reduceDCache$PD, __DCache_DCacheOpt$reduceDCache$ER);
    } else {
        return this._worker.todo_invoke("reduceDCache", __DCache_DCacheOpt$reduceDCache$IE(reduceReq), arguments[arguments.length - 1], __DCache_DCacheOpt$reduceDCache$IF).then(__DCache_DCacheOpt$reduceDCache$ID, __DCache_DCacheOpt$reduceDCache$ER);
    }
};
DCache.DCacheOptProxy.reduceDCache = __DCache_DCacheOpt$reduceDCache$IF;

var __DCache_DCacheOpt$releaseServer$IF = {
    "name" : "releaseServer",
    "return" : "int32",
    "arguments" : [{
        "name" : "releaseInfo",
        "class" : "list(DCache.ReleaseInfo)",
        "direction" : "in"
    }, {
        "name" : "releaseRsp",
        "class" : "DCache.ReleaseRsp",
        "direction" : "out"
    }]
};

var __DCache_DCacheOpt$releaseServer$IE = function (releaseInfo) {
    var os = new TodoStream.TodoOutputStream();
    os.writeList(1, releaseInfo);
    return os.getBinBuffer();
};

var __DCache_DCacheOpt$releaseServer$ID = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "releaseRsp" : is.readStruct(2, true, DCache.ReleaseRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$releaseServer$PE = function (releaseInfo, __$PROTOCOL$VERSION) {
    var tup = new TodoStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeList("releaseInfo", releaseInfo);
    return tup;
};

var __DCache_DCacheOpt$releaseServer$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readInt32("", 0),
                "arguments" : {
                    "releaseRsp" : tup.readStruct("releaseRsp", DCache.ReleaseRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$releaseServer$ER = function (data) {
    throw _makeError(data, "Call DCacheOpt::releaseServer failed");
};

DCache.DCacheOptProxy.prototype.releaseServer = function (releaseInfo) {
    var version = this._worker.version;
    if (version === TodoStream.Tup.TUP_SIMPLE || version === TodoStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("releaseServer", __DCache_DCacheOpt$releaseServer$PE(releaseInfo, version), arguments[arguments.length - 1], __DCache_DCacheOpt$releaseServer$IF).then(__DCache_DCacheOpt$releaseServer$PD, __DCache_DCacheOpt$releaseServer$ER);
    } else {
        return this._worker.todo_invoke("releaseServer", __DCache_DCacheOpt$releaseServer$IE(releaseInfo), arguments[arguments.length - 1], __DCache_DCacheOpt$releaseServer$IF).then(__DCache_DCacheOpt$releaseServer$ID, __DCache_DCacheOpt$releaseServer$ER);
    }
};
DCache.DCacheOptProxy.releaseServer = __DCache_DCacheOpt$releaseServer$IF;

var __DCache_DCacheOpt$reloadRouterConfByModuleFromDB$IF = {
    "name" : "reloadRouterConfByModuleFromDB",
    "return" : "bool",
    "arguments" : [{
        "name" : "appName",
        "class" : "string",
        "direction" : "in"
    }, {
        "name" : "moduleName",
        "class" : "string",
        "direction" : "in"
    }, {
        "name" : "sRouterServerName",
        "class" : "string",
        "direction" : "in"
    }, {
        "name" : "sResult",
        "class" : "string",
        "direction" : "out"
    }]
};

var __DCache_DCacheOpt$reloadRouterConfByModuleFromDB$IE = function (appName, moduleName, sRouterServerName) {
    var os = new TodoStream.TodoOutputStream();
    os.writeString(1, appName);
    os.writeString(2, moduleName);
    os.writeString(3, sRouterServerName);
    return os.getBinBuffer();
};

var __DCache_DCacheOpt$reloadRouterConfByModuleFromDB$ID = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readBoolean(0, true, true),
                "arguments" : {
                    "sResult" : is.readString(4, true, "")
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$reloadRouterConfByModuleFromDB$PE = function (appName, moduleName, sRouterServerName, __$PROTOCOL$VERSION) {
    var tup = new TodoStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeString("appName", appName);
    tup.writeString("moduleName", moduleName);
    tup.writeString("sRouterServerName", sRouterServerName);
    return tup;
};

var __DCache_DCacheOpt$reloadRouterConfByModuleFromDB$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readBoolean("", false),
                "arguments" : {
                    "sResult" : tup.readString("sResult")
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$reloadRouterConfByModuleFromDB$ER = function (data) {
    throw _makeError(data, "Call DCacheOpt::reloadRouterConfByModuleFromDB failed");
};

DCache.DCacheOptProxy.prototype.reloadRouterConfByModuleFromDB = function (appName, moduleName, sRouterServerName) {
    var version = this._worker.version;
    if (version === TodoStream.Tup.TUP_SIMPLE || version === TodoStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("reloadRouterConfByModuleFromDB", __DCache_DCacheOpt$reloadRouterConfByModuleFromDB$PE(appName, moduleName, sRouterServerName, version), arguments[arguments.length - 1], __DCache_DCacheOpt$reloadRouterConfByModuleFromDB$IF).then(__DCache_DCacheOpt$reloadRouterConfByModuleFromDB$PD, __DCache_DCacheOpt$reloadRouterConfByModuleFromDB$ER);
    } else {
        return this._worker.todo_invoke("reloadRouterConfByModuleFromDB", __DCache_DCacheOpt$reloadRouterConfByModuleFromDB$IE(appName, moduleName, sRouterServerName), arguments[arguments.length - 1], __DCache_DCacheOpt$reloadRouterConfByModuleFromDB$IF).then(__DCache_DCacheOpt$reloadRouterConfByModuleFromDB$ID, __DCache_DCacheOpt$reloadRouterConfByModuleFromDB$ER);
    }
};
DCache.DCacheOptProxy.reloadRouterConfByModuleFromDB = __DCache_DCacheOpt$reloadRouterConfByModuleFromDB$IF;

var __DCache_DCacheOpt$restartTransfer$IF = {
    "name" : "restartTransfer",
    "return" : "int32",
    "arguments" : [{
        "name" : "req",
        "class" : "DCache.RestartTransferReq",
        "direction" : "in"
    }, {
        "name" : "rsp",
        "class" : "DCache.RestartTransferRsp",
        "direction" : "out"
    }]
};

var __DCache_DCacheOpt$restartTransfer$IE = function (req) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, req);
    return os.getBinBuffer();
};

var __DCache_DCacheOpt$restartTransfer$ID = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "rsp" : is.readStruct(2, true, DCache.RestartTransferRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$restartTransfer$PE = function (req, __$PROTOCOL$VERSION) {
    var tup = new TodoStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeStruct("req", req);
    return tup;
};

var __DCache_DCacheOpt$restartTransfer$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readInt32("", 0),
                "arguments" : {
                    "rsp" : tup.readStruct("rsp", DCache.RestartTransferRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$restartTransfer$ER = function (data) {
    throw _makeError(data, "Call DCacheOpt::restartTransfer failed");
};

DCache.DCacheOptProxy.prototype.restartTransfer = function (req) {
    var version = this._worker.version;
    if (version === TodoStream.Tup.TUP_SIMPLE || version === TodoStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("restartTransfer", __DCache_DCacheOpt$restartTransfer$PE(req, version), arguments[arguments.length - 1], __DCache_DCacheOpt$restartTransfer$IF).then(__DCache_DCacheOpt$restartTransfer$PD, __DCache_DCacheOpt$restartTransfer$ER);
    } else {
        return this._worker.todo_invoke("restartTransfer", __DCache_DCacheOpt$restartTransfer$IE(req), arguments[arguments.length - 1], __DCache_DCacheOpt$restartTransfer$IF).then(__DCache_DCacheOpt$restartTransfer$ID, __DCache_DCacheOpt$restartTransfer$ER);
    }
};
DCache.DCacheOptProxy.restartTransfer = __DCache_DCacheOpt$restartTransfer$IF;

var __DCache_DCacheOpt$stopTransfer$IF = {
    "name" : "stopTransfer",
    "return" : "int32",
    "arguments" : [{
        "name" : "req",
        "class" : "DCache.StopTransferReq",
        "direction" : "in"
    }, {
        "name" : "rsp",
        "class" : "DCache.StopTransferRsp",
        "direction" : "out"
    }]
};

var __DCache_DCacheOpt$stopTransfer$IE = function (req) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, req);
    return os.getBinBuffer();
};

var __DCache_DCacheOpt$stopTransfer$ID = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "rsp" : is.readStruct(2, true, DCache.StopTransferRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$stopTransfer$PE = function (req, __$PROTOCOL$VERSION) {
    var tup = new TodoStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeStruct("req", req);
    return tup;
};

var __DCache_DCacheOpt$stopTransfer$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readInt32("", 0),
                "arguments" : {
                    "rsp" : tup.readStruct("rsp", DCache.StopTransferRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$stopTransfer$ER = function (data) {
    throw _makeError(data, "Call DCacheOpt::stopTransfer failed");
};

DCache.DCacheOptProxy.prototype.stopTransfer = function (req) {
    var version = this._worker.version;
    if (version === TodoStream.Tup.TUP_SIMPLE || version === TodoStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("stopTransfer", __DCache_DCacheOpt$stopTransfer$PE(req, version), arguments[arguments.length - 1], __DCache_DCacheOpt$stopTransfer$IF).then(__DCache_DCacheOpt$stopTransfer$PD, __DCache_DCacheOpt$stopTransfer$ER);
    } else {
        return this._worker.todo_invoke("stopTransfer", __DCache_DCacheOpt$stopTransfer$IE(req), arguments[arguments.length - 1], __DCache_DCacheOpt$stopTransfer$IF).then(__DCache_DCacheOpt$stopTransfer$ID, __DCache_DCacheOpt$stopTransfer$ER);
    }
};
DCache.DCacheOptProxy.stopTransfer = __DCache_DCacheOpt$stopTransfer$IF;

var __DCache_DCacheOpt$switchServer$IF = {
    "name" : "switchServer",
    "return" : "int32",
    "arguments" : [{
        "name" : "req",
        "class" : "DCache.SwitchReq",
        "direction" : "in"
    }, {
        "name" : "rsp",
        "class" : "DCache.SwitchRsp",
        "direction" : "out"
    }]
};

var __DCache_DCacheOpt$switchServer$IE = function (req) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, req);
    return os.getBinBuffer();
};

var __DCache_DCacheOpt$switchServer$ID = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "rsp" : is.readStruct(2, true, DCache.SwitchRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$switchServer$PE = function (req, __$PROTOCOL$VERSION) {
    var tup = new TodoStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeStruct("req", req);
    return tup;
};

var __DCache_DCacheOpt$switchServer$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readInt32("", 0),
                "arguments" : {
                    "rsp" : tup.readStruct("rsp", DCache.SwitchRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$switchServer$ER = function (data) {
    throw _makeError(data, "Call DCacheOpt::switchServer failed");
};

DCache.DCacheOptProxy.prototype.switchServer = function (req) {
    var version = this._worker.version;
    if (version === TodoStream.Tup.TUP_SIMPLE || version === TodoStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("switchServer", __DCache_DCacheOpt$switchServer$PE(req, version), arguments[arguments.length - 1], __DCache_DCacheOpt$switchServer$IF).then(__DCache_DCacheOpt$switchServer$PD, __DCache_DCacheOpt$switchServer$ER);
    } else {
        return this._worker.todo_invoke("switchServer", __DCache_DCacheOpt$switchServer$IE(req), arguments[arguments.length - 1], __DCache_DCacheOpt$switchServer$IF).then(__DCache_DCacheOpt$switchServer$ID, __DCache_DCacheOpt$switchServer$ER);
    }
};
DCache.DCacheOptProxy.switchServer = __DCache_DCacheOpt$switchServer$IF;

var __DCache_DCacheOpt$transferDCache$IF = {
    "name" : "transferDCache",
    "return" : "int32",
    "arguments" : [{
        "name" : "req",
        "class" : "DCache.TransferReq",
        "direction" : "in"
    }, {
        "name" : "rsp",
        "class" : "DCache.TransferRsp",
        "direction" : "out"
    }]
};

var __DCache_DCacheOpt$transferDCache$IE = function (req) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, req);
    return os.getBinBuffer();
};

var __DCache_DCacheOpt$transferDCache$ID = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "rsp" : is.readStruct(2, true, DCache.TransferRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$transferDCache$PE = function (req, __$PROTOCOL$VERSION) {
    var tup = new TodoStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeStruct("req", req);
    return tup;
};

var __DCache_DCacheOpt$transferDCache$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readInt32("", 0),
                "arguments" : {
                    "rsp" : tup.readStruct("rsp", DCache.TransferRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$transferDCache$ER = function (data) {
    throw _makeError(data, "Call DCacheOpt::transferDCache failed");
};

DCache.DCacheOptProxy.prototype.transferDCache = function (req) {
    var version = this._worker.version;
    if (version === TodoStream.Tup.TUP_SIMPLE || version === TodoStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("transferDCache", __DCache_DCacheOpt$transferDCache$PE(req, version), arguments[arguments.length - 1], __DCache_DCacheOpt$transferDCache$IF).then(__DCache_DCacheOpt$transferDCache$PD, __DCache_DCacheOpt$transferDCache$ER);
    } else {
        return this._worker.todo_invoke("transferDCache", __DCache_DCacheOpt$transferDCache$IE(req), arguments[arguments.length - 1], __DCache_DCacheOpt$transferDCache$IF).then(__DCache_DCacheOpt$transferDCache$ID, __DCache_DCacheOpt$transferDCache$ER);
    }
};
DCache.DCacheOptProxy.transferDCache = __DCache_DCacheOpt$transferDCache$IF;

var __DCache_DCacheOpt$transferDCacheGroup$IF = {
    "name" : "transferDCacheGroup",
    "return" : "int32",
    "arguments" : [{
        "name" : "req",
        "class" : "DCache.TransferGroupReq",
        "direction" : "in"
    }, {
        "name" : "rsp",
        "class" : "DCache.TransferGroupRsp",
        "direction" : "out"
    }]
};

var __DCache_DCacheOpt$transferDCacheGroup$IE = function (req) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, req);
    return os.getBinBuffer();
};

var __DCache_DCacheOpt$transferDCacheGroup$ID = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "rsp" : is.readStruct(2, true, DCache.TransferGroupRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$transferDCacheGroup$PE = function (req, __$PROTOCOL$VERSION) {
    var tup = new TodoStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeStruct("req", req);
    return tup;
};

var __DCache_DCacheOpt$transferDCacheGroup$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readInt32("", 0),
                "arguments" : {
                    "rsp" : tup.readStruct("rsp", DCache.TransferGroupRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$transferDCacheGroup$ER = function (data) {
    throw _makeError(data, "Call DCacheOpt::transferDCacheGroup failed");
};

DCache.DCacheOptProxy.prototype.transferDCacheGroup = function (req) {
    var version = this._worker.version;
    if (version === TodoStream.Tup.TUP_SIMPLE || version === TodoStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("transferDCacheGroup", __DCache_DCacheOpt$transferDCacheGroup$PE(req, version), arguments[arguments.length - 1], __DCache_DCacheOpt$transferDCacheGroup$IF).then(__DCache_DCacheOpt$transferDCacheGroup$PD, __DCache_DCacheOpt$transferDCacheGroup$ER);
    } else {
        return this._worker.todo_invoke("transferDCacheGroup", __DCache_DCacheOpt$transferDCacheGroup$IE(req), arguments[arguments.length - 1], __DCache_DCacheOpt$transferDCacheGroup$IF).then(__DCache_DCacheOpt$transferDCacheGroup$ID, __DCache_DCacheOpt$transferDCacheGroup$ER);
    }
};
DCache.DCacheOptProxy.transferDCacheGroup = __DCache_DCacheOpt$transferDCacheGroup$IF;

var __DCache_DCacheOpt$uninstall4DCache$IF = {
    "name" : "uninstall4DCache",
    "return" : "int32",
    "arguments" : [{
        "name" : "uninstallInfo",
        "class" : "DCache.UninstallReq",
        "direction" : "in"
    }, {
        "name" : "uninstallRsp",
        "class" : "DCache.UninstallRsp",
        "direction" : "out"
    }]
};

var __DCache_DCacheOpt$uninstall4DCache$IE = function (uninstallInfo) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, uninstallInfo);
    return os.getBinBuffer();
};

var __DCache_DCacheOpt$uninstall4DCache$ID = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "uninstallRsp" : is.readStruct(2, true, DCache.UninstallRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$uninstall4DCache$PE = function (uninstallInfo, __$PROTOCOL$VERSION) {
    var tup = new TodoStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeStruct("uninstallInfo", uninstallInfo);
    return tup;
};

var __DCache_DCacheOpt$uninstall4DCache$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readInt32("", 0),
                "arguments" : {
                    "uninstallRsp" : tup.readStruct("uninstallRsp", DCache.UninstallRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$uninstall4DCache$ER = function (data) {
    throw _makeError(data, "Call DCacheOpt::uninstall4DCache failed");
};

DCache.DCacheOptProxy.prototype.uninstall4DCache = function (uninstallInfo) {
    var version = this._worker.version;
    if (version === TodoStream.Tup.TUP_SIMPLE || version === TodoStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("uninstall4DCache", __DCache_DCacheOpt$uninstall4DCache$PE(uninstallInfo, version), arguments[arguments.length - 1], __DCache_DCacheOpt$uninstall4DCache$IF).then(__DCache_DCacheOpt$uninstall4DCache$PD, __DCache_DCacheOpt$uninstall4DCache$ER);
    } else {
        return this._worker.todo_invoke("uninstall4DCache", __DCache_DCacheOpt$uninstall4DCache$IE(uninstallInfo), arguments[arguments.length - 1], __DCache_DCacheOpt$uninstall4DCache$IF).then(__DCache_DCacheOpt$uninstall4DCache$ID, __DCache_DCacheOpt$uninstall4DCache$ER);
    }
};
DCache.DCacheOptProxy.uninstall4DCache = __DCache_DCacheOpt$uninstall4DCache$IF;

var __DCache_DCacheOpt$updateCacheConfigItem$IF = {
    "name" : "updateCacheConfigItem",
    "return" : "int32",
    "arguments" : [{
        "name" : "configReq",
        "class" : "DCache.CacheConfigReq",
        "direction" : "in"
    }, {
        "name" : "configRsp",
        "class" : "DCache.ConfigRsp",
        "direction" : "out"
    }]
};

var __DCache_DCacheOpt$updateCacheConfigItem$IE = function (configReq) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, configReq);
    return os.getBinBuffer();
};

var __DCache_DCacheOpt$updateCacheConfigItem$ID = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "configRsp" : is.readStruct(2, true, DCache.ConfigRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$updateCacheConfigItem$PE = function (configReq, __$PROTOCOL$VERSION) {
    var tup = new TodoStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeStruct("configReq", configReq);
    return tup;
};

var __DCache_DCacheOpt$updateCacheConfigItem$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readInt32("", 0),
                "arguments" : {
                    "configRsp" : tup.readStruct("configRsp", DCache.ConfigRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$updateCacheConfigItem$ER = function (data) {
    throw _makeError(data, "Call DCacheOpt::updateCacheConfigItem failed");
};

DCache.DCacheOptProxy.prototype.updateCacheConfigItem = function (configReq) {
    var version = this._worker.version;
    if (version === TodoStream.Tup.TUP_SIMPLE || version === TodoStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("updateCacheConfigItem", __DCache_DCacheOpt$updateCacheConfigItem$PE(configReq, version), arguments[arguments.length - 1], __DCache_DCacheOpt$updateCacheConfigItem$IF).then(__DCache_DCacheOpt$updateCacheConfigItem$PD, __DCache_DCacheOpt$updateCacheConfigItem$ER);
    } else {
        return this._worker.todo_invoke("updateCacheConfigItem", __DCache_DCacheOpt$updateCacheConfigItem$IE(configReq), arguments[arguments.length - 1], __DCache_DCacheOpt$updateCacheConfigItem$IF).then(__DCache_DCacheOpt$updateCacheConfigItem$ID, __DCache_DCacheOpt$updateCacheConfigItem$ER);
    }
};
DCache.DCacheOptProxy.updateCacheConfigItem = __DCache_DCacheOpt$updateCacheConfigItem$IF;

var __DCache_DCacheOpt$updateServerConfigItem$IF = {
    "name" : "updateServerConfigItem",
    "return" : "int32",
    "arguments" : [{
        "name" : "configReq",
        "class" : "DCache.ServerConfigReq",
        "direction" : "in"
    }, {
        "name" : "configRsp",
        "class" : "DCache.ConfigRsp",
        "direction" : "out"
    }]
};

var __DCache_DCacheOpt$updateServerConfigItem$IE = function (configReq) {
    var os = new TodoStream.TodoOutputStream();
    os.writeStruct(1, configReq);
    return os.getBinBuffer();
};

var __DCache_DCacheOpt$updateServerConfigItem$ID = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "configRsp" : is.readStruct(2, true, DCache.ConfigRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$updateServerConfigItem$PE = function (configReq, __$PROTOCOL$VERSION) {
    var tup = new TodoStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeStruct("configReq", configReq);
    return tup;
};

var __DCache_DCacheOpt$updateServerConfigItem$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readInt32("", 0),
                "arguments" : {
                    "configRsp" : tup.readStruct("configRsp", DCache.ConfigRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$updateServerConfigItem$ER = function (data) {
    throw _makeError(data, "Call DCacheOpt::updateServerConfigItem failed");
};

DCache.DCacheOptProxy.prototype.updateServerConfigItem = function (configReq) {
    var version = this._worker.version;
    if (version === TodoStream.Tup.TUP_SIMPLE || version === TodoStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("updateServerConfigItem", __DCache_DCacheOpt$updateServerConfigItem$PE(configReq, version), arguments[arguments.length - 1], __DCache_DCacheOpt$updateServerConfigItem$IF).then(__DCache_DCacheOpt$updateServerConfigItem$PD, __DCache_DCacheOpt$updateServerConfigItem$ER);
    } else {
        return this._worker.todo_invoke("updateServerConfigItem", __DCache_DCacheOpt$updateServerConfigItem$IE(configReq), arguments[arguments.length - 1], __DCache_DCacheOpt$updateServerConfigItem$IF).then(__DCache_DCacheOpt$updateServerConfigItem$ID, __DCache_DCacheOpt$updateServerConfigItem$ER);
    }
};
DCache.DCacheOptProxy.updateServerConfigItem = __DCache_DCacheOpt$updateServerConfigItem$IF;

var __DCache_DCacheOpt$updateServerConfigItemBatch$IF = {
    "name" : "updateServerConfigItemBatch",
    "return" : "int32",
    "arguments" : [{
        "name" : "configReq",
        "class" : "list(DCache.ServerConfigReq)",
        "direction" : "in"
    }, {
        "name" : "configRsp",
        "class" : "DCache.ConfigRsp",
        "direction" : "out"
    }]
};

var __DCache_DCacheOpt$updateServerConfigItemBatch$IE = function (configReq) {
    var os = new TodoStream.TodoOutputStream();
    os.writeList(1, configReq);
    return os.getBinBuffer();
};

var __DCache_DCacheOpt$updateServerConfigItemBatch$ID = function (data) {
    try {
        var is = new TodoStream.TodoInputStream(data.response.sBuffer);
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : is.readInt32(0, true, 0),
                "arguments" : {
                    "configRsp" : is.readStruct(2, true, DCache.ConfigRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$updateServerConfigItemBatch$PE = function (configReq, __$PROTOCOL$VERSION) {
    var tup = new TodoStream.UniAttribute();
    tup.tupVersion = __$PROTOCOL$VERSION;
    tup.writeList("configReq", configReq);
    return tup;
};

var __DCache_DCacheOpt$updateServerConfigItemBatch$PD = function (data) {
    try {
        var tup = data.response.tup;
        return {
            "request" : data.request,
            "response" : {
                "costtime" : data.request.costtime,
                "return" : tup.readInt32("", 0),
                "arguments" : {
                    "configRsp" : tup.readStruct("configRsp", DCache.ConfigRsp)
                }
            }
        };
    } catch (e) {
        throw _makeError(data, e.message, TodoError.CLIENT.DECODE_ERROR);
    }
};

var __DCache_DCacheOpt$updateServerConfigItemBatch$ER = function (data) {
    throw _makeError(data, "Call DCacheOpt::updateServerConfigItemBatch failed");
};

DCache.DCacheOptProxy.prototype.updateServerConfigItemBatch = function (configReq) {
    var version = this._worker.version;
    if (version === TodoStream.Tup.TUP_SIMPLE || version === TodoStream.Tup.TUP_COMPLEX) {
        return this._worker.tup_invoke("updateServerConfigItemBatch", __DCache_DCacheOpt$updateServerConfigItemBatch$PE(configReq, version), arguments[arguments.length - 1], __DCache_DCacheOpt$updateServerConfigItemBatch$IF).then(__DCache_DCacheOpt$updateServerConfigItemBatch$PD, __DCache_DCacheOpt$updateServerConfigItemBatch$ER);
    } else {
        return this._worker.todo_invoke("updateServerConfigItemBatch", __DCache_DCacheOpt$updateServerConfigItemBatch$IE(configReq), arguments[arguments.length - 1], __DCache_DCacheOpt$updateServerConfigItemBatch$IF).then(__DCache_DCacheOpt$updateServerConfigItemBatch$ID, __DCache_DCacheOpt$updateServerConfigItemBatch$ER);
    }
};
DCache.DCacheOptProxy.updateServerConfigItemBatch = __DCache_DCacheOpt$updateServerConfigItemBatch$IF;




"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { URL } from 'url';
var ApiSecurity_1 = require("./ApiSecurity");
var ApiError = /** @class */ (function (_super) {
    __extends(ApiError, _super);
    function ApiError(code, message, type) {
        if (type === void 0) { type = 'ApiError'; }
        var _this = _super.call(this, "" + (message || '') || 'Internal Server Error') || this;
        _this.type = type;
        _this.code = code || 500;
        return _this;
    }
    return ApiError;
}(Error));
exports.ApiError = ApiError;
var ApiResult = /** @class */ (function () {
    function ApiResult(result, code) {
        if (code === void 0) { code = 200; }
        this.result = result;
        this.code = code;
    }
    return ApiResult;
}());
exports.ApiResult = ApiResult;
var Methods;
(function (Methods) {
    Methods["get"] = "get";
    Methods["head"] = "head";
    Methods["post"] = "post";
    Methods["delete"] = "delete";
    Methods["trace"] = "trace";
    Methods["options"] = "options";
    Methods["connect"] = "connect";
    Methods["patch"] = "patch";
})(Methods = exports.Methods || (exports.Methods = {}));
;
var hooks;
(function (hooks) {
    hooks["starting"] = "starting";
    hooks["routing"] = "routing";
    hooks["resulted"] = "resulted";
    hooks["unauthorized"] = "unauthorized";
    hooks["exception"] = "exception";
    hooks["responding"] = "responding";
})(hooks = exports.hooks || (exports.hooks = {}));
var ApiRouter = /** @class */ (function () {
    function ApiRouter(options) {
        var _this = this;
        var e_1, _a;
        this.options = options;
        this.setContextHandlers = [];
        this._registerHandlers = [];
        this._parsers = {
            'integer': { 'default': [function (v, p, c) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, Math.floor(Number(v))];
                    }); }); }] },
            'number': { 'default': [function (v, p, c) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, Number(v)];
                    }); }); }] },
            'boolean': { 'default': [function (v, p, c) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, typeof v !== 'string' ? (!v ? v : true) : { '': true, 'false': true, '0': true }[v.toLowerCase()] ? false : true];
                    }); }); }] },
            'string': {
                'default': [function (v, p, c) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, v];
                    }); }); }]
                // , 'byte': [], 'binary': [], 'date': [], 'date-time': []
            },
            'array': {
                'default': [function (v, p, c) { return __awaiter(_this, void 0, void 0, function () {
                        var arr, delimit, schema, schemaItems, split, i, _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    if (!v || typeof v !== 'string')
                                        return [2 /*return*/, undefined];
                                    if (p.style === 'json') {
                                        arr = JSON.parse(v);
                                        if (!Array.isArray(arr))
                                            throw "parameter is not array with JSON style";
                                        return [2 /*return*/, arr];
                                    }
                                    delimit = 'json';
                                    if (p.in === 'query') {
                                        if (p.style === 'form') {
                                            if (p.explode) // delimit = 'multi'
                                                throw " not support multi type array";
                                            delimit = 'csv';
                                        }
                                        else if (p.style === 'spaceDelimited')
                                            delimit = 'ssv';
                                        else if (p.style === 'pipeDelimited')
                                            delimit = 'pipes';
                                        else if (p.style === 'simple')
                                            delimit = 'csv';
                                        else
                                            delimit = 'csv';
                                        // throw 'without array parameter style define in query.';
                                    }
                                    else if ((p.in === 'path' || p.in === 'header') && p.style === 'simple') {
                                        delimit = 'csv';
                                    }
                                    schema = p.schema;
                                    schemaItems = schema.items;
                                    if (schemaItems.type === 'array')
                                        throw 'not support nest array.';
                                    split = v.split({ csv: ',', ssv: ' ', pipes: '|' }[delimit] || ',');
                                    i = 0;
                                    _c.label = 1;
                                case 1:
                                    if (!(i < split.length)) return [3 /*break*/, 4];
                                    _a = split;
                                    _b = i;
                                    return [4 /*yield*/, this.toParse(split[i], schemaItems.type || 'string', schemaItems.format, p, c)];
                                case 2:
                                    _a[_b] = _c.sent();
                                    _c.label = 3;
                                case 3:
                                    i++;
                                    return [3 /*break*/, 1];
                                case 4: return [2 /*return*/, split];
                            }
                        });
                    }); }]
            },
            'object': {
                'default': [function (v, p, c) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, JSON.parse(v)];
                    }); }); }]
            }
        };
        this._hookHdls = {};
        // 對應 OAS3 從 server(host) url 取出 baseUrl
        // this.basePath = decodeURI(new URL(options.apiInterface.serverUrl, 'http://localhost').pathname).replace(/\/$/, '');
        this.basePath = '/' + options.apiInterface.serverUrl.split('/').slice(3).join('/');
        // 依 type/format 加入訂製 解析器(parser) 至預設解析器集合
        if (options.parsers && options.parsers.length) {
            this.setParser(options.parsers);
        }
        if (!options.statusMap)
            options.statusMap = {};
        if (options.security) {
            this.security =
                options.security['type'] === 'ApiSecurity' ?
                    options.security :
                    new ApiSecurity_1.ApiSecurity({ controller: options.security });
        }
        if (options.plugins && options.plugins.length) {
            try {
                for (var _b = __values(options.plugins), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var plugin = _c.value;
                    // plugin.apiRouterRegister && plugin.apiRouterRegister(this);
                    this.setPlugin(plugin);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        if (options.controller['apiRouterRegister']) {
            options.controller['apiRouterRegister'](this);
        }
    }
    ApiRouter.prototype.setContext = function (requestStarting) {
        this.setContextHandlers.push(requestStarting);
    };
    ApiRouter.prototype.setParser = function (typeOrList, format, parser) {
        var e_2, _a;
        var ps = Array.isArray(typeOrList) ? typeOrList : [{ type: typeOrList, format: format, parser: parser }];
        try {
            for (var ps_1 = __values(ps), ps_1_1 = ps_1.next(); !ps_1_1.done; ps_1_1 = ps_1.next()) {
                var p = ps_1_1.value;
                var format_1 = p.format || 'default';
                this._parsers[p.type] = this._parsers[p.type] || { 'default': [] };
                this._parsers[p.type][format_1] = this._parsers[p.type][format_1] || [];
                this._parsers[p.type][format_1].unshift(p.parser);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (ps_1_1 && !ps_1_1.done && (_a = ps_1.return)) _a.call(ps_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    ApiRouter.prototype.setOperation = function (apiRegistering) {
        this._registerHandlers.push(apiRegistering);
    };
    ApiRouter.prototype.setStatusCode = function (statusName, code) {
        // this.options.statusMap = this.options.statusMap || {};
        this.options.statusMap[statusName] = code;
    };
    ApiRouter.prototype.setPlugin = function (plugin) {
        plugin.apiRouterRegister && plugin.apiRouterRegister(this);
    };
    ApiRouter.prototype.toParse = function (value, type, format, parameter, context) {
        return __awaiter(this, void 0, void 0, function () {
            var e_3, _a, parsers, parsers_1, parsers_1_1, parser, error_1, e_3_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        parsers = [];
                        if (this._parsers[type])
                            parsers = parsers.concat(this._parsers[type]['default']);
                        if (this._parsers[type] && this._parsers[type][format])
                            parsers = this._parsers[type][format].concat(parsers);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, 9, 10]);
                        parsers_1 = __values(parsers), parsers_1_1 = parsers_1.next();
                        _b.label = 2;
                    case 2:
                        if (!!parsers_1_1.done) return [3 /*break*/, 7];
                        parser = parsers_1_1.value;
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, parser(value, parameter, context)];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5:
                        error_1 = _b.sent();
                        console.log("parameter parse error", error_1);
                        return [3 /*break*/, 6];
                    case 6:
                        parsers_1_1 = parsers_1.next();
                        return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_3_1 = _b.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (parsers_1_1 && !parsers_1_1.done && (_a = parsers_1.return)) _a.call(parsers_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7 /*endfinally*/];
                    case 10:
                        console.log("unable parse parameter value: " + value + ", type: " + type + ", format: " + (format || '') + ".");
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    ApiRouter.prototype.parseParameters = function (schemas, context) {
        return __awaiter(this, void 0, void 0, function () {
            var e_4, _a, schemas_1, schemas_1_1, schema, req, value, e_4_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        context.parameters = {}; //body: context.connection.body
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 8]);
                        schemas_1 = __values(schemas), schemas_1_1 = schemas_1.next();
                        _b.label = 2;
                    case 2:
                        if (!!schemas_1_1.done) return [3 /*break*/, 5];
                        schema = schemas_1_1.value;
                        req = context.connection.parameters[schema.in];
                        if (!req || !schema.schema || !schema.schema['type'])
                            return [3 /*break*/, 4];
                        context.parameters[schema.in] = context.parameters[schema.in] || {};
                        return [4 /*yield*/, this.toParse(req[schema.name], schema.schema['type'], schema.schema['format'], schema, context)];
                    case 3:
                        value = _b.sent();
                        if (value !== undefined)
                            context.parameters[schema.in][schema.name] = value;
                        _b.label = 4;
                    case 4:
                        schemas_1_1 = schemas_1.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_4_1 = _b.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (schemas_1_1 && !schemas_1_1.done && (_a = schemas_1.return)) _a.call(schemas_1);
                        }
                        finally { if (e_4) throw e_4.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/, context.parameters];
                }
            });
        });
    };
    ApiRouter.prototype.hookUp = function (hook, handler, pushTo) {
        if (pushTo === void 0) { pushTo = 'last'; }
        !this._hookHdls[hook] && (this._hookHdls[hook] = []);
        this._hookHdls[hook][pushTo === 'first' ? 'unshift' : 'push'](handler);
    };
    ApiRouter.prototype._hooking = function (hook, ctx, error) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._hookHdls[hook]) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.all(this._hookHdls[hook].map(function (h) { return h(ctx, error); }))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    ApiRouter.prototype.preRouting = function (handler, toFirst) {
        if (toFirst === void 0) { toFirst = false; }
        toFirst ?
            this.hookUp(hooks.starting, handler, 'first') :
            this.hookUp(hooks.routing, handler);
    };
    ApiRouter.prototype.postRouted = function (handler, toLast) {
        if (toLast === void 0) { toLast = false; }
        toLast ?
            this.hookUp(hooks.responding, handler) :
            this.hookUp(hooks.resulted, handler);
    };
    ApiRouter.prototype.onError = function (handler) {
        // this._errorHandlers.push(handler);
        this.hookUp(hooks.exception, handler);
    };
    // static _global_serial: number = 0;
    // private _controller_serial: number = 0;
    ApiRouter.prototype.registerApis = function (connector) {
        var _this = this;
        var e_5, _a;
        var _loop_1 = function (op) {
            var _a = this_1._registerHandlers.length ?
                this_1._registerHandlers.reduce(function (a, b) { return b(a.api, a.connector); }, { api: op, connector: connector }) :
                { api: op, connector: connector }, api = _a.api, regConnector = _a.connector;
            regConnector.registerApi(this_1.basePath, api.path, api.method, function (conn) { return __awaiter(_this, void 0, void 0, function () {
                var e_6, _a, send, connection, ctx, _b, _c, setContext, securityCheck, _d, body, parameters, result, _e, error_2, error_3;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            send = conn.send, connection = __rest(conn, ["send"]);
                            ctx = {
                                // TODO: move this future to plugin
                                // serial: ++ApiRouter._global_serial,
                                // counter: ++this._controller_serial,
                                // createOn: new Date().getTime(),
                                apiInterface: this.options.apiInterface,
                                // openapiName: this.options.apiInterface.openapiName,
                                // controllerName: this.options.apiInterface.controllerName,
                                controller: this.options.controller,
                                basePath: this.basePath,
                                api: api,
                                parameters: undefined,
                                code: undefined,
                                result: undefined,
                                error: undefined,
                                responded: false,
                                connector: regConnector
                            };
                            connection.send = function (result) {
                                if (!ctx.responded) {
                                    ctx.responded = true;
                                    send({
                                        code: result.code,
                                        contentType: result.contentType,
                                        result: result.result !== undefined ? result.result : result.message
                                    });
                                }
                            };
                            ctx.connection = connection;
                            _f.label = 1;
                        case 1:
                            _f.trys.push([1, 10, , 11]);
                            try {
                                for (_b = __values(this.setContextHandlers), _c = _b.next(); !_c.done; _c = _b.next()) {
                                    setContext = _c.value;
                                    setContext instanceof Function && setContext(ctx);
                                }
                            }
                            catch (e_6_1) { e_6 = { error: e_6_1 }; }
                            finally {
                                try {
                                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                }
                                finally { if (e_6) throw e_6.error; }
                            }
                            return [4 /*yield*/, this._hooking(hooks.starting, ctx)];
                        case 2:
                            _f.sent();
                            if (!(api.operation.security && api.operation.security.length && this.security)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.security.check(this.options.apiInterface.security, api.operation, ctx)];
                        case 3:
                            securityCheck = _f.sent();
                            if (securityCheck !== true)
                                throw new ApiSecurity_1.SecurityError();
                            _f.label = 4;
                        case 4: return [4 /*yield*/, this.parseParameters(api.operation.parameters, ctx)];
                        case 5:
                            _d = _f.sent(), body = _d.body, parameters = __rest(_d, ["body"]);
                            ctx.parameters = parameters;
                            ctx.body = connection.body;
                            return [4 /*yield*/, this._hooking(hooks.routing, ctx)];
                        case 6:
                            _f.sent();
                            _e = this.options.controller[api.operation.operationId];
                            if (!_e) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.options.controller[api.operation.operationId](ctx.parameters, ctx.body, ctx)];
                        case 7:
                            _e = (_f.sent());
                            _f.label = 8;
                        case 8:
                            result = _e;
                            if (result) {
                                ctx.responded = !!result.responded;
                                ctx.code = typeof result.code === 'string' && this.options.statusMap[result.code] || typeof +result.code === 'number' && +result.code || this.options.statusMap['default'] || 200;
                                ctx.contentType = result.contentType;
                                ctx.result = result.result !== undefined ? result.result : result.message;
                            }
                            return [4 /*yield*/, this._hooking(hooks.resulted, ctx)];
                        case 9:
                            _f.sent();
                            return [3 /*break*/, 11];
                        case 10:
                            error_2 = _f.sent();
                            ctx.error = error_2;
                            ctx.code = typeof error_2.code === 'string' && this.options.statusMap[error_2.code] || typeof +error_2.code === 'number' && +error_2.code || this.options.statusMap['default'] || 500;
                            ctx.result = typeof error_2 === 'string' ? error_2 : (error_2 && error_2.message || 'ApiRouter process error.');
                            return [3 /*break*/, 11];
                        case 11:
                            _f.trys.push([11, 17, , 18]);
                            if (!ctx.error) return [3 /*break*/, 15];
                            if (!(ctx.error['type'] === 'SecurityError')) return [3 /*break*/, 13];
                            return [4 /*yield*/, this._hooking(hooks.unauthorized, ctx, ctx.error).catch(function (err) { return console.error(err); })];
                        case 12:
                            _f.sent();
                            _f.label = 13;
                        case 13: 
                        // else
                        return [4 /*yield*/, this._hooking(hooks.exception, ctx, ctx.error).catch(function (err) { return console.error(err); })];
                        case 14:
                            // else
                            _f.sent();
                            _f.label = 15;
                        case 15: return [4 /*yield*/, this._hooking(hooks.responding, ctx).catch(function (err) { return console.error(err); })];
                        case 16:
                            _f.sent();
                            return [3 /*break*/, 18];
                        case 17:
                            error_3 = _f.sent();
                            ctx.error = error_3;
                            ctx.code = typeof error_3.code === 'string' && this.options.statusMap[error_3.code] || typeof +error_3.code === 'number' && +error_3.code || this.options.statusMap['default'] || 500;
                            ctx.result = typeof error_3 === 'string' ? error_3 : (error_3 && error_3.message || 'ApiRouter process error.#2');
                            return [3 /*break*/, 18];
                        case 18: return [2 /*return*/, {
                                responded: ctx.responded,
                                code: ctx.code,
                                contentType: ctx.contentType,
                                result: ctx.result
                            }];
                    }
                });
            }); });
        };
        var this_1 = this;
        try {
            for (var _b = __values(this.options.apiInterface.operations), _c = _b.next(); !_c.done; _c = _b.next()) {
                var op = _c.value;
                _loop_1(op);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return connector;
    };
    return ApiRouter;
}());
exports.ApiRouter = ApiRouter;
//# sourceMappingURL=ApiRouter.js.map
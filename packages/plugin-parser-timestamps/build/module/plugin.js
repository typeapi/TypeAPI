"use strict";
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
var api_router_1 = require("@typeapi/api-router");
var moment = require("moment-timezone");
var Plugin = /** @class */ (function () {
    function Plugin(options) {
        this.options = options;
    }
    Plugin.prototype.apiRouterRegister = function (apiRouter) {
        var _this = this;
        apiRouter.hookUp(api_router_1.hooks.routing, function (c, e) { return _this.handler(c, e); });
        // apiRouter.preRouting((c, e) => this.handler(<any>c, e));
    };
    Plugin.prototype.handler = function (context, error) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, _a, dateParameters, symbols, _loop_1, dateParameters_1, dateParameters_1_1, par;
            var _this = this;
            return __generator(this, function (_b) {
                context.timestamps = context.timestamps || {};
                dateParameters = (context.api.operation.parameters || []).filter(function (v) {
                    return context.connection.parameters &&
                        context.connection.parameters[v.in] &&
                        context.connection.parameters[v.in][v.name] &&
                        v.schema['type'] === 'string' &&
                        (v.schema['format'] === 'date-time' || v.schema['format'] === 'date');
                });
                symbols = {};
                _loop_1 = function (par) {
                    //x-typeapi-parameter-name
                    // context.timestamps[par['x-typeapi-parameter-name'] || par.name] = moment(context.connection.parameters[par.in][par.name]).tz(this.options.timezone).valueOf();
                    var key = par['x-typeapi-parameter-name'] || par.name;
                    if (!key || typeof key !== 'string')
                        return "continue";
                    var sym = symbols[key] || (symbols[key] = Symbol());
                    Object.defineProperty(context.timestamps, key, {
                        get: function () {
                            if (context.timestamps[sym] === undefined)
                                context.timestamps[sym] = moment(context.connection.parameters[par.in][par.name]).tz(_this.options.timezone).valueOf();
                            return context.timestamps[sym];
                        },
                        writable: false
                        // set: function (timestamp: number): void {
                        // }
                    });
                };
                try {
                    for (dateParameters_1 = __values(dateParameters), dateParameters_1_1 = dateParameters_1.next(); !dateParameters_1_1.done; dateParameters_1_1 = dateParameters_1.next()) {
                        par = dateParameters_1_1.value;
                        _loop_1(par);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (dateParameters_1_1 && !dateParameters_1_1.done && (_a = dateParameters_1.return)) _a.call(dateParameters_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return [2 /*return*/];
            });
        });
    };
    return Plugin;
}());
exports.Plugin = Plugin;
//# sourceMappingURL=plugin.js.map
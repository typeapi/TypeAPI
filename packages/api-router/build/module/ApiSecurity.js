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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var SecurityError = /** @class */ (function (_super) {
    __extends(SecurityError, _super);
    function SecurityError(codeOrMessage, message) {
        var _this = _super.call(this, "" + ((typeof codeOrMessage === 'string' ? codeOrMessage : message) || '') || 'Security Error.') || this;
        _this.code = 401;
        _this.type = 'SecurityError';
        _this.code = typeof codeOrMessage === 'number' ? codeOrMessage : 401;
        return _this;
    }
    return SecurityError;
}(Error));
exports.SecurityError = SecurityError;
;
var ApiSecurity = /** @class */ (function () {
    function ApiSecurity(options) {
        this.options = options;
        this.type = 'ApiSecurity';
    }
    ApiSecurity.prototype.result = function (actionResult) {
        if (typeof actionResult === 'boolean')
            return actionResult;
        if (typeof actionResult === 'string')
            throw new SecurityError(actionResult);
        if (!actionResult)
            throw new SecurityError();
        actionResult.type = 'SecurityError';
        throw actionResult;
    };
    ApiSecurity.prototype.check = function (securitySchemes, operation, ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, _a, e_2, _b, pass, _c, _d, securityGroup, _e, _f, securityName, securityScheme, lowerType, _g, lowerKeyName, theApiKey, apiKeyCheck, lowerSchema, _h, basicCode, _j, userId, password, _k, _l, token, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, e_2_1, e_1_1;
            return __generator(this, function (_x) {
                switch (_x.label) {
                    case 0:
                        if (!this.options.controller)
                            throw new SecurityError('operation secuity define but no options.security controller.');
                        pass = true;
                        _x.label = 1;
                    case 1:
                        _x.trys.push([1, 34, 35, 36]);
                        _c = __values(operation.security), _d = _c.next();
                        _x.label = 2;
                    case 2:
                        if (!!_d.done) return [3 /*break*/, 33];
                        securityGroup = _d.value;
                        _x.label = 3;
                    case 3:
                        _x.trys.push([3, 29, 30, 31]);
                        _e = __values(Object.keys(securityGroup)), _f = _e.next();
                        _x.label = 4;
                    case 4:
                        if (!!_f.done) return [3 /*break*/, 28];
                        securityName = _f.value;
                        if (!this.options.controller[securityName])
                            throw new SecurityError("options.security controller without security function " + securityName + ".");
                        securityScheme = securitySchemes && securitySchemes[securityName];
                        if (!securityScheme)
                            throw new SecurityError("component securitySchemes without " + securityName + " define.");
                        lowerType = securityScheme.type.toLowerCase();
                        _g = lowerType;
                        switch (_g) {
                            case 'apikey': return [3 /*break*/, 5];
                            case 'http': return [3 /*break*/, 7];
                            case 'oauth2': return [3 /*break*/, 18];
                            case 'openidconnect': return [3 /*break*/, 21];
                        }
                        return [3 /*break*/, 24];
                    case 5:
                        lowerKeyName = securityScheme['name'].toLowerCase();
                        theApiKey = ctx.connection.parameters[securityScheme['in']] && ctx.connection.parameters[securityScheme['in']][lowerKeyName];
                        return [4 /*yield*/, this.options.controller[securityName]({ apiKey: theApiKey }, ctx)];
                    case 6:
                        apiKeyCheck = _x.sent();
                        pass = pass && this.result(apiKeyCheck);
                        return [3 /*break*/, 27];
                    case 7:
                        lowerSchema = securityScheme['scheme'].toLowerCase();
                        _h = lowerSchema;
                        switch (_h) {
                            case 'basic': return [3 /*break*/, 8];
                            case 'bearer': return [3 /*break*/, 11];
                            case 'digest': return [3 /*break*/, 14];
                            case 'hoba': return [3 /*break*/, 14];
                            case 'mutual': return [3 /*break*/, 14];
                            case 'negotiate': return [3 /*break*/, 14];
                            case 'oauth': return [3 /*break*/, 14];
                            case 'scram-sha-1': return [3 /*break*/, 14];
                            case 'scram-sha-256': return [3 /*break*/, 14];
                            case 'vapid': return [3 /*break*/, 14];
                        }
                        return [3 /*break*/, 14];
                    case 8:
                        basicCode = (ctx.connection.parameters.header['Authorization'] || '').replace('Basic', '').trim();
                        _j = __read(new Buffer(basicCode, 'base64').toString('utf8').split(':'), 2), userId = _j[0], password = _j[1];
                        _k = pass;
                        if (!_k) return [3 /*break*/, 10];
                        _l = this.result;
                        return [4 /*yield*/, this.options.controller[securityName]({ userId: userId, password: password }, ctx)];
                    case 9:
                        _k = _l.apply(this, [_x.sent()]);
                        _x.label = 10;
                    case 10:
                        pass = _k;
                        return [3 /*break*/, 17];
                    case 11:
                        token = (ctx.connection.parameters.header['Authorization'] || '').replace('Bearer', '').trim();
                        _m = pass;
                        if (!_m) return [3 /*break*/, 13];
                        _o = this.result;
                        return [4 /*yield*/, this.options.controller[securityName]({ token: token, format: securityScheme['bearerFormat'] }, ctx)];
                    case 12:
                        _m = _o.apply(this, [_x.sent()]);
                        _x.label = 13;
                    case 13:
                        pass = _m;
                        return [3 /*break*/, 17];
                    case 14:
                        _p = pass;
                        if (!_p) return [3 /*break*/, 16];
                        _q = this.result;
                        return [4 /*yield*/, this.options.controller[securityName]({ schema: securityScheme['scheme'], requirement: securityGroup[securityName] }, ctx)];
                    case 15:
                        _p = _q.apply(this, [_x.sent()]);
                        _x.label = 16;
                    case 16:
                        pass = _p;
                        return [3 /*break*/, 17];
                    case 17: return [3 /*break*/, 27];
                    case 18:
                        _r = pass;
                        if (!_r) return [3 /*break*/, 20];
                        _s = this.result;
                        return [4 /*yield*/, this.options.controller[securityName]({ flows: securityScheme['flows'], scopes: securityGroup[securityName] }, ctx)];
                    case 19:
                        _r = _s.apply(this, [_x.sent()]);
                        _x.label = 20;
                    case 20:
                        pass = _r;
                        return [3 /*break*/, 27];
                    case 21:
                        _t = pass;
                        if (!_t) return [3 /*break*/, 23];
                        _u = this.result;
                        return [4 /*yield*/, this.options.controller[securityName]({ openIdConnectUrl: securityScheme['openIdConnectUrl'], scopes: securityGroup[securityName] }, ctx)];
                    case 22:
                        _t = _u.apply(this, [_x.sent()]);
                        _x.label = 23;
                    case 23:
                        pass = _t;
                        return [3 /*break*/, 27];
                    case 24:
                        _v = pass;
                        if (!_v) return [3 /*break*/, 26];
                        _w = this.result;
                        return [4 /*yield*/, this.options.controller[securityName]({ schema: securityScheme, requirement: securityGroup[securityName], parameters: ctx.connection.parameters }, ctx)];
                    case 25:
                        _v = _w.apply(this, [_x.sent()]);
                        _x.label = 26;
                    case 26:
                        pass = _v;
                        return [3 /*break*/, 27];
                    case 27:
                        _f = _e.next();
                        return [3 /*break*/, 4];
                    case 28: return [3 /*break*/, 31];
                    case 29:
                        e_2_1 = _x.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 31];
                    case 30:
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 31:
                        if (pass)
                            return [3 /*break*/, 33];
                        _x.label = 32;
                    case 32:
                        _d = _c.next();
                        return [3 /*break*/, 2];
                    case 33: return [3 /*break*/, 36];
                    case 34:
                        e_1_1 = _x.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 36];
                    case 35:
                        try {
                            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 36: return [2 /*return*/, pass];
                }
            });
        });
    };
    return ApiSecurity;
}());
exports.ApiSecurity = ApiSecurity;
//# sourceMappingURL=ApiSecurity.js.map
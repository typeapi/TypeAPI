"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var interfaceOp_1 = require("./block/interfaceOp");
function default_1(model, escapeFn, include, rethrow) {
    if (model === void 0) { model = {}; }
    return __awaiter(this, void 0, void 0, function () {
        function encode_char(c) {
            return _ENCODE_HTML_RULES[c] || c;
        }
        var e_1, _a, _ENCODE_HTML_RULES, _MATCH_HTML, __output, __append, _b, _c, o, _d, e_1_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    escapeFn = escapeFn || function (markup) {
                        return markup == undefined
                            ? ''
                            : String(markup)
                                .replace(_MATCH_HTML, encode_char);
                    };
                    _ENCODE_HTML_RULES = {
                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        '"': "&#34;",
                        "'": "&#39;"
                    }, _MATCH_HTML = /[&<>'"]/g;
                    ;
                    ;
                    __output = [], __append = __output.push.bind(__output);
                    ;
                    ;
                    __append("/// <reference path=\"./definitions.ts\" />\n\nimport { IContext, IResult, IApiInterface } from '@typeapi/api-router';\n\nexport interface IController {\n");
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 6, 7, 8]);
                    _b = __values(model.operations), _c = _b.next();
                    _e.label = 2;
                case 2:
                    if (!!_c.done) return [3 /*break*/, 5];
                    o = _c.value;
                    ;
                    _d = __append;
                    return [4 /*yield*/, interfaceOp_1.default(__assign({}, (o.operation), { path: o.path, method: o.method }))];
                case 3:
                    _d.apply(void 0, [_e.sent()]);
                    __append(";\n");
                    _e.label = 4;
                case 4:
                    _c = _b.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 8:
                    ;
                    __append("}\n\nexport var apiInterface: IApiInterface = {\n    openapiName: '");
                    __append(model.openapiName);
                    __append("',\n    controllerName: '");
                    __append(model.controllerName === '__default__' ? '' : model.controllerName);
                    __append("',\n    serverUrl: '");
                    __append(model.serverUrl);
                    __append("',\n");
                    if (model.security) {
                        ;
                        __append("    security: ");
                        __append(JSON.stringify(model.security, null, 4));
                        __append(",\n");
                    }
                    ;
                    __append("    operations: <any>");
                    __append(JSON.stringify(model.operations, null, 4));
                    __append("\n}\n");
                    return [2 /*return*/, __output.join("")];
            }
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=interface.js.map
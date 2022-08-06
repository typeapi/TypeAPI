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
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var Connector = /** @class */ (function () {
    function Connector(options) {
        if (options === void 0) { options = {}; }
        this.options = options;
        this.app = options.app || express.Router();
    }
    Connector.prototype.send = function (response, result) {
        // TODO: 處理未定義 code 及 contentType 預設值, 及 依 result 類型(Buffer/Stream)自動判定contentType
        if (!result.responded) {
            response.status(+(result.code) || 500);
            if (result.contentType) // application/json
                response.set('Content-Type', result.contentType);
            var body = typeof result.result === 'undefined' || result.result === null || result.result === NaN ? '' : result.result;
            if (typeof body['pipe'] === 'function' && typeof body['on'] === 'function' && body['readable'] !== false) {
                // body is Stream
                body['on']('data', function (data) { return response.write(data); });
                body['on']('end', function () { return response.end(); });
            }
            else if (typeof body === 'string' || typeof body === 'number')
                response.send("" + body);
            else if (Array.isArray(body) || typeof body === 'object')
                response.send(JSON.stringify(body));
            else
                response.send(body);
            response.end();
        }
    };
    Connector.prototype.parameters = function (request) {
        return { path: request.params, query: request.query, header: request.headers, cookie: request.cookies };
    };
    Connector.prototype.body = function (request) {
        return request.body;
    };
    Connector.prototype.toExpressPath = function (basePath, path) {
        return '/' + (basePath + "/" + path)
            .split('/')
            .filter(function (v) { return !!v; })
            .map(function (v) { return v.replace(/\{([^}]+)}/g, ':$1'); })
            .join('/');
    };
    Connector.prototype.registerApi = function (basePath, apiPath, method, processer) {
        var _this = this;
        this.app[method](this.toExpressPath(basePath, apiPath), function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var parameters, body, pack, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameters = this.parameters(request);
                        body = this.body(request);
                        pack = {
                            parameters: parameters,
                            body: body,
                            send: function (result) { _this.send(response, result); },
                            request: request,
                            response: response,
                            next: next
                        };
                        return [4 /*yield*/, processer(pack)];
                    case 1:
                        result = _a.sent();
                        this.send(response, result);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    Connector.prototype.expressRouter = function () {
        if (this.options.app)
            throw 'already register apis by options.app(express).';
        return this.app;
    };
    return Connector;
}());
exports.Connector = Connector;
//# sourceMappingURL=ExpressConnector.js.map
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
var api_router_1 = require("@typeapi/api-router");
var Ajv = require("ajv");
var Plugin = /** @class */ (function () {
    function Plugin(options) {
        if (options === void 0) { options = { parametersValidable: true }; }
        this.options = options;
        if (typeof options.parametersValidable !== 'boolean' && typeof options.parametersValidable !== 'function')
            options.parametersValidable = true;
        this.ajv = new Ajv(options.ajvOptions);
    }
    Plugin.prototype.apiRouterRegister = function (apiRouter) {
        var _this = this;
        apiRouter.setContext(function (ctx) { return ctx['schemaValidator'] = function (schema, data) { return _this.validator(schema, data); }; });
        apiRouter.hookUp(api_router_1.hooks.routing, function (ctx) { return _this.parametersValid(ctx); }, 'last');
    };
    Plugin.prototype.validator = function (schema, data) {
        try {
            var result = this.ajv.validate(schema, data);
            return typeof result === 'boolean' ? result : false;
        }
        catch (error) {
            return false;
        }
    };
    Plugin.prototype.parametersValid = function (context) {
        return __awaiter(this, void 0, void 0, function () {
            var validName, validSchema, validKey, valid, error;
            return __generator(this, function (_a) {
                if ((typeof this.options.parametersValidable === 'function' && !this.options.parametersValidable(context)) || !this.options.parametersValidable)
                    return [2 /*return*/];
                validName = context.api.operation['x-typeapi-parameters-type'];
                validSchema = context.api.operation['x-typeapi-parameters-schema'];
                validKey = context.apiInterface.openapiName + "-" + context.apiInterface.controllerName + "-" + validName;
                if (context.api.operation.parameters || !validName || !validSchema)
                    return [2 /*return*/];
                try {
                    Plugin.validators[validKey] = Plugin.validators[validKey] || this.ajv.compile(validSchema);
                }
                catch (error) {
                    throw new api_router_1.ApiError(400, "PluginJsonSchemaValid: " + validKey + " parameters schema compile error.", 'ValidError');
                }
                valid = Plugin.validators[validKey](context.parameters);
                if (!valid) {
                    error = new api_router_1.ApiError(400, 'Request parameters valid fail.', 'ValidError');
                    context.parametersValidErrors = error['validErrors'] = Plugin.validators[validName]['errors'];
                    throw error;
                }
                return [2 /*return*/];
            });
        });
    };
    Plugin.validators = {};
    return Plugin;
}());
exports.Plugin = Plugin;
//# sourceMappingURL=plugin.js.map
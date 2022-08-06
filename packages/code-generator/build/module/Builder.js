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
var Parser_1 = require("./Parser");
var interface_1 = require("../render/interface");
var controller_1 = require("../render/controller");
var register_1 = require("../render/register");
var definitions_1 = require("../render/definitions");
var isecurity_1 = require("../render/isecurity");
var security_1 = require("../render/security");
var plugins_1 = require("../render/plugins");
var app_1 = require("../render/app");
var Builder = /** @class */ (function () {
    function Builder(options) {
        this.options = options;
        this.parser = new Parser_1.Parser(options);
    }
    Builder.prototype.definitions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = definitions_1.default;
                        return [4 /*yield*/, this.parser.toDefinitions()];
                    case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                }
            });
        });
    };
    Builder.prototype.interfaceModel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this._interfaceModel) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.parser.toInterfaceModel()];
                    case 1:
                        _a._interfaceModel = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, this._interfaceModel];
                }
            });
        });
    };
    Builder.prototype.isecurity = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = isecurity_1.default;
                        return [4 /*yield*/, this.interfaceModel()];
                    case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent())[0].security || {}])];
                }
            });
        });
    };
    Builder.prototype.security = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = security_1.default;
                        return [4 /*yield*/, this.interfaceModel()];
                    case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent())[0].security || {}])];
                }
            });
        });
    };
    Builder.prototype.plugins = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, plugins_1.default({})];
            });
        });
    };
    Builder.prototype.register = function () {
        return __awaiter(this, void 0, void 0, function () {
            var controllerNames, fileNames;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.interfaceModel()];
                    case 1:
                        controllerNames = (_a.sent()).map(function (v) { return v.controllerName === '' || v.controllerName === '__default__' ? 'controller' : v.controllerName; });
                        fileNames = controllerNames.map(function (v) { return v === 'controller' ? '' : v + "."; });
                        return [2 /*return*/, register_1.default({ controllerNames: controllerNames, fileNames: fileNames })];
                }
            });
        });
    };
    Builder.prototype.interfaces = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, _a, models, codes, models_1, models_1_1, model, _b, _c, _d, e_1_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.interfaceModel()];
                    case 1:
                        models = _e.sent();
                        codes = [];
                        _e.label = 2;
                    case 2:
                        _e.trys.push([2, 7, 8, 9]);
                        models_1 = __values(models), models_1_1 = models_1.next();
                        _e.label = 3;
                    case 3:
                        if (!!models_1_1.done) return [3 /*break*/, 6];
                        model = models_1_1.value;
                        _c = (_b = codes).push;
                        _d = { name: model.controllerName };
                        return [4 /*yield*/, interface_1.default(model)];
                    case 4:
                        _c.apply(_b, [(_d.code = _e.sent(), _d)]);
                        _e.label = 5;
                    case 5:
                        models_1_1 = models_1.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_1_1 = _e.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (models_1_1 && !models_1_1.done && (_a = models_1.return)) _a.call(models_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/, codes];
                }
            });
        });
    };
    Builder.prototype.controllers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_2, _a, models, codes, models_2, models_2_1, model, _b, _c, _d, e_2_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.interfaceModel()];
                    case 1:
                        models = _e.sent();
                        codes = [];
                        _e.label = 2;
                    case 2:
                        _e.trys.push([2, 7, 8, 9]);
                        models_2 = __values(models), models_2_1 = models_2.next();
                        _e.label = 3;
                    case 3:
                        if (!!models_2_1.done) return [3 /*break*/, 6];
                        model = models_2_1.value;
                        model['prefixAsync'] = true;
                        _c = (_b = codes).push;
                        _d = { name: model.controllerName };
                        return [4 /*yield*/, controller_1.default(model)];
                    case 4:
                        _c.apply(_b, [(_d.code = _e.sent(), _d)]);
                        _e.label = 5;
                    case 5:
                        models_2_1 = models_2.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_2_1 = _e.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (models_2_1 && !models_2_1.done && (_a = models_2.return)) _a.call(models_2);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/, codes];
                }
            });
        });
    };
    Builder.prototype.app = function (server) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, app_1.default({ server: server })];
            });
        });
    };
    return Builder;
}());
exports.Builder = Builder;
//# sourceMappingURL=Builder.js.map
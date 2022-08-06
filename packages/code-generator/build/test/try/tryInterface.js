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
var Parser_1 = require("../../module/Parser");
var fs = require("fs");
var path = require("path");
var yaml = require("js-yaml");
var interface_1 = require("../../render/interface");
var controller_1 = require("../../render/controller");
var register_1 = require("../../render/register");
var definitions_1 = require("../../render/definitions");
var isecurity_1 = require("../../render/isecurity");
var security_1 = require("../../render/security");
var plugins_1 = require("../../render/plugins");
var specName = 'petstore-3.0.openapi.yaml'; // 'petstore-2.0.swagger.yaml'; //   'swagger-bitopro-admin.yaml'; //
var filePath = path.resolve(__dirname, "../../../src/test/" + specName);
var fileContent = fs.readFileSync(filePath, 'utf8');
var json = yaml.safeLoad(fileContent);
var parser = new Parser_1.Parser({ openapi: json });
// console.log('parser created.');
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var e_1, _a, definitions, saveFile, _b, _c, _d, faceModel, faceModelFile, isecurityFile, _e, _f, _g, securityFile, _h, _j, _k, pluginsFile, _l, _m, _o, registerFile, controllerNames, fileNames, _p, _q, _r, faceModel_1, faceModel_1_1, face, saveFile_1, _s, _t, _u, ctrlFile, _v, _w, _x, e_1_1;
        return __generator(this, function (_y) {
            switch (_y.label) {
                case 0: return [4 /*yield*/, parser.toDefinitions()];
                case 1:
                    definitions = _y.sent();
                    saveFile = path.resolve(__dirname, '../../../src/test/generator/interface/definitions.ts');
                    _c = (_b = fs).writeFileSync;
                    _d = [saveFile];
                    return [4 /*yield*/, definitions_1.default(definitions)];
                case 2:
                    _c.apply(_b, _d.concat([_y.sent(), 'utf8']));
                    return [4 /*yield*/, parser.toInterfaceModel()];
                case 3:
                    faceModel = _y.sent();
                    faceModelFile = path.resolve(__dirname, "../../../src/test/" + specName + ".interfaceModel.json");
                    // let faceModelFile = path.resolve(__dirname, `../../../src/test/swagger-bitopro-admin.interfaceModel.json`);
                    fs.writeFileSync(faceModelFile, JSON.stringify(faceModel, null, 4), 'utf8');
                    isecurityFile = path.resolve(__dirname, "../../../src/test/generator/interface/isecurity.ts");
                    _f = (_e = fs).writeFileSync;
                    _g = [isecurityFile];
                    return [4 /*yield*/, isecurity_1.default(faceModel[0].security || {})];
                case 4:
                    _f.apply(_e, _g.concat([_y.sent(), 'utf8']));
                    securityFile = path.resolve(__dirname, "../../../src/test/generator/security.ts");
                    _j = (_h = fs).writeFileSync;
                    _k = [securityFile];
                    return [4 /*yield*/, security_1.default(faceModel[0].security || {})];
                case 5:
                    _j.apply(_h, _k.concat([_y.sent(), 'utf8']));
                    pluginsFile = path.resolve(__dirname, "../../../src/test/generator/plugins.ts");
                    _m = (_l = fs).writeFileSync;
                    _o = [pluginsFile];
                    return [4 /*yield*/, plugins_1.default({})];
                case 6:
                    _m.apply(_l, _o.concat([_y.sent(), 'utf8']));
                    registerFile = path.resolve(__dirname, '../../../src/test/generator/register.ts');
                    controllerNames = faceModel.map(function (v) { return v.controllerName === '' || v.controllerName === '__default__' ? 'controller' : v.controllerName; });
                    fileNames = controllerNames.map(function (v) { return v === 'controller' ? '' : v + "."; });
                    _q = (_p = fs).writeFileSync;
                    _r = [registerFile];
                    return [4 /*yield*/, register_1.default({ controllerNames: controllerNames, fileNames: fileNames })];
                case 7:
                    _q.apply(_p, _r.concat([_y.sent(), 'utf8']));
                    _y.label = 8;
                case 8:
                    _y.trys.push([8, 14, 15, 16]);
                    faceModel_1 = __values(faceModel), faceModel_1_1 = faceModel_1.next();
                    _y.label = 9;
                case 9:
                    if (!!faceModel_1_1.done) return [3 /*break*/, 13];
                    face = faceModel_1_1.value;
                    saveFile_1 = path.resolve(__dirname, "../../../src/test/generator/interface/" + (!face.controllerName || face.controllerName === '__default__' ? '' : (face.controllerName + '.')) + "interface.ts");
                    _t = (_s = fs).writeFileSync;
                    _u = [saveFile_1];
                    return [4 /*yield*/, interface_1.default(face)];
                case 10:
                    _t.apply(_s, _u.concat([_y.sent(), 'utf8']));
                    ctrlFile = path.resolve(__dirname, "../../../src/test/generator/" + (!face.controllerName || face.controllerName === '__default__' ? '' : (face.controllerName + '.')) + "controller.ts");
                    face['prefixAsync'] = true;
                    _w = (_v = fs).writeFileSync;
                    _x = [ctrlFile];
                    return [4 /*yield*/, controller_1.default(face)];
                case 11:
                    _w.apply(_v, _x.concat([_y.sent(), 'utf8']));
                    _y.label = 12;
                case 12:
                    faceModel_1_1 = faceModel_1.next();
                    return [3 /*break*/, 9];
                case 13: return [3 /*break*/, 16];
                case 14:
                    e_1_1 = _y.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 16];
                case 15:
                    try {
                        if (faceModel_1_1 && !faceModel_1_1.done && (_a = faceModel_1.return)) _a.call(faceModel_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 16:
                    console.log('done.');
                    process.exit(0);
                    return [2 /*return*/];
            }
        });
    });
})();
//# sourceMappingURL=tryInterface.js.map
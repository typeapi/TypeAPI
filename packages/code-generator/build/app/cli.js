#!/usr/bin/env node --harmony
"use strict";
/* If you don't webpack to dist/cli.js, you need uncomment next line back. */
// #!/usr/bin/env node --harmony
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var program = require("commander");
var fs = require("fs");
var path = require("path");
var Builder_1 = require("../module/Builder");
// import * as globule from 'globule';
var mkdirp = require("mkdirp");
var http = require("http");
var node_machine_id_1 = require("node-machine-id");
var xdeferred_1 = require("xdeferred");
var yaml = require("js-yaml");
var del = require("del");
var oasFile;
var saveDir = './';
program
  .version('0.0.34')
    .usage('path/swagger/openapi.[json|yaml] dir/save/to/')
    .arguments('<source> [target]')
    .option('-c, --controllerProperty <ctrlProperty>', 'default "x-typeapi-controller", split operation to different controller by this property at openapi operation object.')
    .option('-n, --newUserFilesExtName <subName>', 'if user files exist, create new one with this sub file name, empty wont generate new controller files.')
    .option('-s, --httpServer <serverType>', '"express" only for now, empty wont generate app.ts example.')
    .action(function (source, target) {
    oasFile = source;
    saveDir = target || saveDir;
})
    .parse(process.argv);
// function isDir(dpath) {
//   try {
//     return fs.lstatSync(dpath).isDirectory();
//   } catch (e) {
//     return false;
//   }
// };
if (!oasFile || !fs.existsSync(oasFile)) {
    console.error('source openapi/swagger file not exists!');
    process.exit(1);
}
var openapi = yaml.safeLoad(fs.readFileSync(oasFile, 'utf8'));
var ctrlProp = program.controllerProperty || 'x-typeapi-controller';
var builder = new Builder_1.Builder({ openapi: openapi, controllerProperty: ctrlProp });
var newName = ("" + (program.newUserFilesExtName || '')).trim();
(function () { return __awaiter(_this, void 0, void 0, function () {
    var e_1, _a, e_2, _b, controllerPath, interfacePath, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, interfaces, interfaces_1, interfaces_1_1, inf, fileName, e_1_1, controllers, controllers_1, controllers_1_1, ctrl, fileName, e_2_1, _o, _p;
    return __generator(this, function (_q) {
        switch (_q.label) {
            case 0:
                controllerPath = path.resolve(saveDir);
                interfacePath = path.resolve(saveDir, 'interface');
                if (!fs.existsSync(interfacePath)) return [3 /*break*/, 2];
                return [4 /*yield*/, del(interfacePath)];
            case 1:
                _q.sent();
                _q.label = 2;
            case 2:
                mkdirp.sync(interfacePath);
                _c = saveTo;
                _d = [path.resolve(interfacePath, 'definitions.ts')];
                return [4 /*yield*/, builder.definitions()];
            case 3: return [4 /*yield*/, _c.apply(void 0, _d.concat([_q.sent(), true]))];
            case 4:
                _q.sent();
                _e = saveTo;
                _f = [path.resolve(interfacePath, 'isecurity.ts')];
                return [4 /*yield*/, builder.isecurity()];
            case 5: return [4 /*yield*/, _e.apply(void 0, _f.concat([_q.sent(), true]))];
            case 6:
                _q.sent();
                _g = saveTo;
                _h = [path.resolve(controllerPath, 'security.ts')];
                return [4 /*yield*/, builder.security()];
            case 7: return [4 /*yield*/, _g.apply(void 0, _h.concat([_q.sent(), newName]))];
            case 8:
                _q.sent();
                _j = saveTo;
                _k = [path.resolve(controllerPath, 'plugins.ts')];
                return [4 /*yield*/, builder.plugins()];
            case 9: return [4 /*yield*/, _j.apply(void 0, _k.concat([_q.sent(), newName]))];
            case 10:
                _q.sent();
                _l = saveTo;
                _m = [path.resolve(controllerPath, 'register.ts')];
                return [4 /*yield*/, builder.register()];
            case 11: return [4 /*yield*/, _l.apply(void 0, _m.concat([_q.sent(), newName]))];
            case 12:
                _q.sent();
                return [4 /*yield*/, builder.interfaces()];
            case 13:
                interfaces = _q.sent();
                _q.label = 14;
            case 14:
                _q.trys.push([14, 19, 20, 21]);
                interfaces_1 = __values(interfaces), interfaces_1_1 = interfaces_1.next();
                _q.label = 15;
            case 15:
                if (!!interfaces_1_1.done) return [3 /*break*/, 18];
                inf = interfaces_1_1.value;
                fileName = (!inf.name || inf.name === '__default__' ? '' : (inf.name + '.')) + "interface.ts";
                return [4 /*yield*/, saveTo(path.resolve(interfacePath, fileName), inf.code, true)];
            case 16:
                _q.sent();
                _q.label = 17;
            case 17:
                interfaces_1_1 = interfaces_1.next();
                return [3 /*break*/, 15];
            case 18: return [3 /*break*/, 21];
            case 19:
                e_1_1 = _q.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 21];
            case 20:
                try {
                    if (interfaces_1_1 && !interfaces_1_1.done && (_a = interfaces_1.return)) _a.call(interfaces_1);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 21: return [4 /*yield*/, builder.controllers()];
            case 22:
                controllers = _q.sent();
                _q.label = 23;
            case 23:
                _q.trys.push([23, 28, 29, 30]);
                controllers_1 = __values(controllers), controllers_1_1 = controllers_1.next();
                _q.label = 24;
            case 24:
                if (!!controllers_1_1.done) return [3 /*break*/, 27];
                ctrl = controllers_1_1.value;
                fileName = (!ctrl.name || ctrl.name === '__default__' ? '' : (ctrl.name + '.')) + "controller.ts";
                return [4 /*yield*/, saveTo(path.resolve(controllerPath, fileName), ctrl.code, newName)];
            case 25:
                _q.sent();
                _q.label = 26;
            case 26:
                controllers_1_1 = controllers_1.next();
                return [3 /*break*/, 24];
            case 27: return [3 /*break*/, 30];
            case 28:
                e_2_1 = _q.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 30];
            case 29:
                try {
                    if (controllers_1_1 && !controllers_1_1.done && (_b = controllers_1.return)) _b.call(controllers_1);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 30:
                if (!(program.httpServer === 'express')) return [3 /*break*/, 33];
                _o = saveTo;
                _p = [path.resolve(controllerPath, 'app.ts')];
                return [4 /*yield*/, builder.app('express')];
            case 31: return [4 /*yield*/, _o.apply(void 0, _p.concat([_q.sent(), newName]))];
            case 32:
                _q.sent();
                _q.label = 33;
            case 33: return [4 /*yield*/, usageReport()];
            case 34:
                _q.sent();
                console.log('done.');
                process.exit(0);
                return [2 /*return*/];
        }
    });
}); })();
function saveTo(filePath, content, overwriteOrNewSubName) {
    return __awaiter(this, void 0, void 0, function () {
        var exist, old, savePath;
        return __generator(this, function (_a) {
            exist = fs.existsSync(filePath);
            old = exist && fs.readFileSync(filePath, 'utf8') || undefined;
            if (!exist || overwriteOrNewSubName === true) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log("created or overwrite file: " + filePath);
            }
            else if (!overwriteOrNewSubName || old === content) {
                console.log("ignore existed/same content file generate: " + filePath);
            }
            else {
                savePath = "" + filePath + overwriteOrNewSubName;
                fs.writeFileSync(savePath, content, 'utf8');
                console.log("overwrite exist file to new name: " + savePath);
            }
            return [2 /*return*/];
        });
    });
}
function usageReport(action, label, value) {
    if (action === void 0) { action = 'typeapi'; }
    if (label === void 0) { label = 'codegen'; }
    if (value === void 0) { value = 1; }
    return __awaiter(this, void 0, void 0, function () {
        var dfd, gaId, cid;
        return __generator(this, function (_a) {
            dfd = new xdeferred_1.default();
            try {
                gaId = 'UA-136322974-1';
                cid = node_machine_id_1.machineIdSync(true);
                http.get("http://www.google-analytics.com/collect?v=1&tid=" + gaId + "&cid=" + cid + "&t=event&ec=ejs2module&ea=" + action + "&el=" + label + "&ev=" + value, function (res) {
                    res.on('data', function (chunk) { });
                    res.on('end', function () {
                        dfd.resolve('');
                    });
                }).on('error', function (e) {
                    dfd.resolve('');
                });
            }
            catch (error) {
                dfd.resolve('');
            }
            return [2 /*return*/, dfd.promise()];
        });
    });
}
//# sourceMappingURL=cli.js.map
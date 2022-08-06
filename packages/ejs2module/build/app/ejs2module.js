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
Object.defineProperty(exports, "__esModule", { value: true });
var program = require("commander");
var fs = require("fs");
var path = require("path");
var Builder_1 = require("../module/Builder");
var globule = require("globule");
var mkdirp = require("mkdirp");
var http = require("http");
var node_machine_id_1 = require("node-machine-id");
var xdeferred_1 = require("xdeferred");
var ejsFile;
var saveFile = './';
program
    .version('0.0.117')
    .usage('path_or_dir/load/from/source.[ejs] path_or_dir/save/to/target.ts')
    .arguments('<source> [target]')
    .option('-s, --script [js|ts]', 'default "js" for JavaScript, then "ts" for TypeScript module, or auto detect by target file subname.')
    .option('-a, --async [false|true]', 'default "false", set "ture" will add "async" keyword before export function, then you can use "await" keyword inside template.')
    .option('-l, --localsName [value]', 'Name to use for the object storing local variables Defaults to "locals".')
    .action(function (source, target) {
    ejsFile = source;
    saveFile = target || saveFile;
})
    .parse(process.argv);
function isDir(dpath) {
    try {
        return fs.lstatSync(dpath).isDirectory();
    }
    catch (e) {
        return false;
    }
}
;
if (!ejsFile || !fs.existsSync(ejsFile)) {
    console.error('source ejs file/dir not exists!');
    process.exit(1);
}
var mode = 'toJs';
if (program.script) {
    var lang = ("" + program.script).trim().toLowerCase();
    mode = { js: 'toJs', ts: 'toTs' }[lang];
    if (!mode) {
        console.error("-s, --script must be \"js\" or \"ts\".");
        process.exit(1);
    }
}
if (!mode) {
    if (saveFile.endsWith('.ts'))
        mode = 'toTs';
    else
        mode = "toJs";
}
var subname = mode.replace('to', '').toLowerCase();
function build(source, target) {
    return __awaiter(this, void 0, void 0, function () {
        var template, script, dir, saveName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    template = fs.readFileSync(source, 'utf8');
                    return [4 /*yield*/, new Builder_1.Builder({
                            template: template, ejsOptions: {
                                async: ("" + program.async).toLowerCase() === 'true',
                                localsName: program.localsName
                            }
                        })[mode]()];
                case 1:
                    script = _a.sent();
                    dir = path.dirname(target);
                    if (!fs.existsSync(dir))
                        mkdirp.sync(dir);
                    saveName = target.replace(/.ejs$/g, "." + subname);
                    fs.writeFileSync(saveName, script, 'utf8');
                    console.log("build " + source + " to " + saveName + ".");
                    return [2 /*return*/];
            }
        });
    });
}
if (!isDir(ejsFile)) {
    if (saveFile.endsWith('.js') || saveFile.endsWith('.ts'))
        saveFile = saveFile.split('.').map(function (v, i, a) { return i === a.length - 1 ? subname : v; }).join('.');
    else
        saveFile = path.join(saveFile, path.basename(ejsFile, '.ejs') + '.' + subname);
}
var files = isDir(ejsFile) ?
    globule['findMapping']('**/*.ejs', { srcBase: ejsFile, destBase: saveFile }) :
    [{ src: [ejsFile], dest: saveFile }];
function usageReport(buildTo, count) {
    return __awaiter(this, void 0, void 0, function () {
        var dfd, gaId, cid;
        return __generator(this, function (_a) {
            if (!count)
                return [2 /*return*/];
            dfd = new xdeferred_1.default();
            try {
                gaId = 'UA-136322974-1';
                cid = node_machine_id_1.machineIdSync(true);
                http.get("http://www.google-analytics.com/collect?v=1&tid=" + gaId + "&cid=" + cid + "&t=event&ec=ejs2module&ea=build&el=" + buildTo + "&ev=" + count, function (res) {
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
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var e_1, _a, e_2, _b, files_1, files_1_1, f, _c, _d, src, e_2_1, e_1_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 11, 12, 13]);
                    files_1 = __values(files), files_1_1 = files_1.next();
                    _e.label = 1;
                case 1:
                    if (!!files_1_1.done) return [3 /*break*/, 10];
                    f = files_1_1.value;
                    _e.label = 2;
                case 2:
                    _e.trys.push([2, 7, 8, 9]);
                    _c = __values(f.src), _d = _c.next();
                    _e.label = 3;
                case 3:
                    if (!!_d.done) return [3 /*break*/, 6];
                    src = _d.value;
                    return [4 /*yield*/, build(src, f.dest)];
                case 4:
                    _e.sent();
                    _e.label = 5;
                case 5:
                    _d = _c.next();
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 9];
                case 7:
                    e_2_1 = _e.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 9:
                    files_1_1 = files_1.next();
                    return [3 /*break*/, 1];
                case 10: return [3 /*break*/, 13];
                case 11:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 13];
                case 12:
                    try {
                        if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 13: return [4 /*yield*/, usageReport(mode, files.length)];
                case 14:
                    _e.sent();
                    process.exit(0);
                    return [2 /*return*/];
            }
        });
    });
})();
//# sourceMappingURL=ejs2module.js.map
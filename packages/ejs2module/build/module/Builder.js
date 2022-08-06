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
var ejs = require("ejs");
var Builder = /** @class */ (function () {
    function Builder(options) {
        this.options = options;
        this.options.ejsOptions = Builder._extendsOptions(options.ejsOptions);
    }
    Builder._extendsOptions = function (options) {
        if (options === void 0) { options = {}; }
        return __assign({}, Builder._ejsOptions, options);
    };
    Builder.ToJs = function (template, ejsOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var options, renderText, localsName;
            return __generator(this, function (_a) {
                options = Builder._extendsOptions(ejsOptions);
                renderText = ejs.compile(template, options).toString();
                localsName = options.localsName || 'locals';
                return [2 /*return*/, options.async ?
                        renderText.replace(new RegExp("^async function anonymous\\(" + localsName), "module.exports = async function(" + localsName)
                            .replace('.replace(o,u)};', '.replace(_MATCH_HTML,encode_char)};') :
                        renderText.replace(new RegExp("^function anonymous\\(" + localsName), "module.exports = function(" + localsName)
                            .replace('.replace(o,u)};', '.replace(_MATCH_HTML,encode_char)};')];
            });
        });
    };
    Builder.prototype.toJs = function (template, options) {
        if (template === void 0) { template = this.options.template; }
        if (options === void 0) { options = this.options.ejsOptions; }
        if (!template)
            throw 'Can not compile ejs without template';
        return Builder.ToJs(template, options);
        // return this.render.toString().replace(/^function anonymous/, 'module.exports = function');
    };
    Builder.ToTs = function (template, ejsOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, _a, options, lines, imports, content, open, lines_1, lines_1_1, line, trimed, renderText, localsName;
            return __generator(this, function (_b) {
                options = Builder._extendsOptions(ejsOptions);
                lines = template.split('\n');
                imports = [], content = [];
                open = false;
                try {
                    for (lines_1 = __values(lines), lines_1_1 = lines_1.next(); !lines_1_1.done; lines_1_1 = lines_1.next()) {
                        line = lines_1_1.value;
                        if (line.indexOf('<%') >= 0)
                            open = true;
                        if (line.indexOf('%>') >= 0)
                            open = false;
                        if (!open)
                            content.push(line);
                        else {
                            trimed = line.trim();
                            if (trimed.startsWith('import '))
                                imports.push(trimed);
                            else
                                content.push(line);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (lines_1_1 && !lines_1_1.done && (_a = lines_1.return)) _a.call(lines_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                renderText = ejs.compile(content.join('\n'), options).toString();
                localsName = options.localsName || 'locals';
                return [2 /*return*/, options.async ?
                        [
                            imports.length && imports.join('\n') || '',
                            renderText.replace(new RegExp("^async function anonymous\\(" + localsName + ", escapeFn, include, rethrow"), "export default async function(" + localsName + ":any = {}, escapeFn?:Function, include?:Function, rethrow?:Function").replace('.replace(o,u)};', '.replace(_MATCH_HTML,encode_char)};')
                        ].filter(function (v) { return !!v; }).join('\n') :
                        [
                            imports.length && imports.join('\n') || '',
                            renderText.replace(new RegExp("^async function anonymous\\(" + localsName + ", escapeFn, include, rethrow"), "export default function(" + localsName + ":any = {}, escapeFn?:Function, include?:Function, rethrow?:Function").replace('.replace(o,u)};', '.replace(_MATCH_HTML,encode_char)};')
                        ].filter(function (v) { return !!v; }).join('\n')];
            });
        });
    };
    Builder.prototype.toTs = function (template, options) {
        if (template === void 0) { template = this.options.template; }
        if (options === void 0) { options = this.options.ejsOptions; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!template)
                    throw 'Can not compile ejs without template';
                return [2 /*return*/, Builder.ToTs(template, options)];
            });
        });
    };
    Builder._ejsOptions = { client: true, strict: false, _with: false, localsName: 'locals', async: false, rmWhitespace: false, compileDebug: false };
    return Builder;
}());
exports.Builder = Builder;
//# sourceMappingURL=Builder.js.map
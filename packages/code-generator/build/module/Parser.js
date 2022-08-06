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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var converter = require("swagger2openapi");
var $RefParaser = require("json-schema-ref-parser");
// var deref = require('json-schema-deref');
var json_schema_to_typescript_1 = require("json-schema-to-typescript");
var dtsgenerator_1 = require("dtsgenerator");
var openapi_jsonschema_parameters_1 = require("openapi-jsonschema-parameters");
var Parser = /** @class */ (function () {
    function Parser(options) {
        this.options = options;
        // private apiName: string = 'openapi';
        this.schemas = {};
        this.parameters = {};
        // console.log(options);
    }
    /**
     * Transform swagger to openapi 3
     */
    Parser.prototype.openapi3 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!!this._openapi3) return [3 /*break*/, 4];
                        // && !bundle.paths[path][method].deprecated
                        _a = this;
                        if (!(this.options.openapi['swagger'] || !this.options.openapi.openapi.startsWith('3'))) return [3 /*break*/, 2];
                        return [4 /*yield*/, converter.convertObj(this.options.openapi, { targetVersion: '3.0.2' })];
                    case 1:
                        _b = (_c.sent()).openapi;
                        return [3 /*break*/, 3];
                    case 2:
                        _b = this.options.openapi;
                        _c.label = 3;
                    case 3:
                        // && !bundle.paths[path][method].deprecated
                        _a._openapi3 = _b;
                        _c.label = 4;
                    case 4: return [2 /*return*/, this._openapi3];
                }
            });
        });
    };
    /**
     * get marked openapi
     */
    Parser.prototype.markedOpenapi = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, _a, bundle, derefs, methods, insDict_1, _b, _c, path, _loop_1, this_1, method;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!!this._mark) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.bundle()];
                    case 1:
                        bundle = _d.sent();
                        return [4 /*yield*/, this.derefsOpenapi(bundle)];
                    case 2:
                        derefs = _d.sent();
                        // let derefs = await $RefParaser.dereference(JSON.parse(JSON.stringify(bundle))) as OpenAPIV3.Document;
                        // console.log(JSON.stringify(derefs, null, 4));
                        if (!bundle['x-typeapi-openapi'])
                            bundle['x-typeapi-openapi'] = bundle.info && bundle.info.title && this.toCamelCase(bundle.info.title, true) || 'openapi';
                        methods = { get: true, post: true, put: true, delete: true, head: true, trace: true, options: true, connect: true, patch: true };
                        insDict_1 = { path: 'Path', query: 'Query', header: 'Header', cookie: 'Cookie' };
                        try {
                            for (_b = __values(Object.keys(bundle.paths)), _c = _b.next(); !_c.done; _c = _b.next()) {
                                path = _c.value;
                                _loop_1 = function (method) {
                                    var e_2, _a, e_3, _b;
                                    if (methods[method] && bundle.paths[path].hasOwnProperty(method)) {
                                        var operation = bundle.paths[path][method];
                                        var operationNamespace_1 = this_1.toCamelCase(operation.operationId || path + " " + method, true);
                                        if (!operation.operationId)
                                            operation.operationId = this_1.toCamelCase(path + " " + method);
                                        operation['x-typeapi-operation-namespace'] = operationNamespace_1;
                                        if (operation.parameters && operation.parameters.length) {
                                            var parameters = operation.parameters;
                                            var ins = parameters.map(function (v) { return v.in; }).filter(function (v, i, a) { return a.indexOf(v) === i; });
                                            operation['x-typeapi-parameters-type'] = ['Parameters', operationNamespace_1].join('.');
                                            // this.parameters[operationNamespace] = {};
                                            // ins.forEach(v => this.parameters[operationNamespace][v] = `Paths.${operationNamespace}.${insDict[v]}Parameters`);
                                            operation['x-typeapi-parameters-interface'] = ins.map(function (v) { return [v, "Paths." + operationNamespace_1 + "." + insDict_1[v] + "Parameters"]; });
                                            var doubleNames = ['body', 'context'].concat(parameters.map(function (v) { return v.name; }))
                                                .filter(function (v, i, a) { return a.indexOf(v) !== i; })
                                                .filter(function (v, i, a) { return a.indexOf(v) === i; });
                                            try {
                                                for (var parameters_1 = __values(parameters), parameters_1_1 = parameters_1.next(); !parameters_1_1.done; parameters_1_1 = parameters_1.next()) {
                                                    var p = parameters_1_1.value;
                                                    if (doubleNames.indexOf(p.name) >= 0)
                                                        p['x-typeapi-parameter-name'] = this_1.toCamelCase(p.in + " " + p.name);
                                                }
                                            }
                                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                                            finally {
                                                try {
                                                    if (parameters_1_1 && !parameters_1_1.done && (_a = parameters_1.return)) _a.call(parameters_1);
                                                }
                                                finally { if (e_2) throw e_2.error; }
                                            }
                                            var parametersSchemas = openapi_jsonschema_parameters_1.convertParametersToJSONSchema(derefs.paths[path][method].parameters);
                                            operation['x-typeapi-parameters-schema'] = parametersSchemas;
                                        }
                                        if (operation.requestBody) {
                                            var req = operation.requestBody;
                                            if (req['$ref']) {
                                                req['x-typeapi-request-body'] = ['Components', 'RequestBodies', req['$ref'].split('/').reverse()[0]].join('.');
                                            }
                                            else if (req.content) {
                                                var firstKey = Object.keys(req.content)[0];
                                                var schema = req.content[firstKey].schema;
                                                if (schema['items'] && schema['items']['$ref']) {
                                                    req['x-typeapi-request-body'] = this_1.refToTypeName(schema['items']['$ref']) + "[]";
                                                }
                                                else if (schema['$ref']) {
                                                    req['x-typeapi-request-body'] = ['Components', 'Schemas', schema['$ref'].split('/').reverse()[0]].join('.');
                                                }
                                                else {
                                                    // schema is local schema define
                                                    req['x-typeapi-request-body'] = ['Schemas', operationNamespace_1 + "RequestBody"].join('.');
                                                    // this.schemas[`${operationNamespace}RequestBody`] = await compile(schema, `${operationNamespace}RequestBody`, { bannerComment: '' });
                                                    // this.schemas.push([
                                                    //   operationNamespace,
                                                    //   'RequestBody',
                                                    //   await compile(schema, `${operationNamespace}RequestBody`, { bannerComment: '' })
                                                    // ]);
                                                }
                                            }
                                        }
                                        if (operation.responses) {
                                            try {
                                                for (var _c = __values(Object.keys(operation.responses).filter(function (v) { return !isNaN(+v) || v === 'default'; })), _d = _c.next(); !_d.done; _d = _c.next()) {
                                                    var status = _d.value;
                                                    var resp = operation.responses[status];
                                                    if (resp['$ref']) {
                                                        resp['x-typeapi-response'] = ['Components', 'Responses', resp['$ref'].split('/').reverse()[0]].join('.');
                                                    }
                                                    else if (resp.content) {
                                                        var firstKey = Object.keys(resp.content)[0];
                                                        var schema = resp.content[firstKey].schema;
                                                        if (schema['items'] && schema['items']['$ref']) {
                                                            resp['x-typeapi-response'] = this_1.refToTypeName(schema['items']['$ref']) + "[]";
                                                        }
                                                        else if (schema['$ref']) {
                                                            resp['x-typeapi-response'] = ['Components', 'Schemas', schema['$ref'].split('/').reverse()[0]].join('.');
                                                        }
                                                        else {
                                                            // schema is local schema define
                                                            var responseType = this_1.toCamelCase('Response ' + status, true);
                                                            resp['x-typeapi-response'] = ['Schemas', "" + operationNamespace_1 + responseType].join('.');
                                                            // this.schemas[`${operationNamespace}${responseType}`] = await compile(schema, `${operationNamespace}${responseType}`, { bannerComment: '' });
                                                            // this.schemas.push([
                                                            //   operationNamespace,
                                                            //   responseType,
                                                            //   await compile(schema, `${operationNamespace}${responseType}`, { bannerComment: '' })
                                                            // ]);
                                                        }
                                                    }
                                                }
                                            }
                                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                            finally {
                                                try {
                                                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                                                }
                                                finally { if (e_3) throw e_3.error; }
                                            }
                                        }
                                    }
                                };
                                this_1 = this;
                                for (method in bundle.paths[path]) {
                                    _loop_1(method);
                                }
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        this._mark = bundle;
                        _d.label = 3;
                    case 3: return [2 /*return*/, this._mark];
                }
            });
        });
    };
    Parser.prototype.toCamelCase = function (str, pascalCase) {
        if (pascalCase === void 0) { pascalCase = false; }
        // str.replace(/[^A-Za-z0-9_]/g, ' ')
        return str.replace(/[^A-Za-z0-9]/g, ' ')
            .replace(/^\w|[A-Z]|\b\w|\s+/g, function (match, index) {
            if (/\s+/.test(match))
                return '';
            return index === 0 && !pascalCase ? match.toLowerCase() : match.toUpperCase();
        });
    };
    // TODO: implements security functions
    Parser.prototype.toSecurityModel = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bundle()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Parser.prototype.toConrollerName = function (model) {
        if (!this.options.controllerProperty)
            return model['x-typeapi-controller'];
        if (typeof this.options.controllerProperty === 'function') {
            return this.options.controllerProperty(model);
        }
        if (typeof this.options.controllerProperty === 'string' && model[this.options.controllerProperty]) {
            if (Array.isArray(model[this.options.controllerProperty]))
                return model[this.options.controllerProperty][0];
            return "" + model[this.options.controllerProperty];
        }
        return '';
    };
    Parser.prototype.toInterfaceModel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_4, _a, methods, marked, derefs, controllers, apiName, rootSecurity, pathsControllerName, _b, _c, path, pathControllerName, method, operation, opControllerName, model, derefOperation;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        methods = { get: true, post: true, put: true, delete: true, head: true, trace: true, options: true, connect: true, patch: true };
                        return [4 /*yield*/, this.markedOpenapi()];
                    case 1:
                        marked = _d.sent();
                        return [4 /*yield*/, this.derefsOpenapi()];
                    case 2:
                        derefs = _d.sent();
                        controllers = {};
                        apiName = marked['x-typeapi-openapi'];
                        rootSecurity = derefs.security && derefs.security.length ? derefs.security : undefined;
                        pathsControllerName = this.toConrollerName(marked.paths);
                        try {
                            for (_b = __values(Object.keys(marked.paths)), _c = _b.next(); !_c.done; _c = _b.next()) {
                                path = _c.value;
                                pathControllerName = this.toConrollerName(marked.paths[path]) || pathsControllerName;
                                for (method in marked.paths[path]) {
                                    if (!methods[method])
                                        continue;
                                    operation = marked.paths[path][method];
                                    opControllerName = this.toConrollerName(operation) || pathControllerName || '__default__';
                                    model = (controllers[opControllerName] = controllers[opControllerName] || {
                                        controllerName: opControllerName,
                                        openapiName: apiName,
                                        serverUrl: marked.servers[0].url,
                                        // schemas: [],
                                        operations: [],
                                        security: derefs.components.securitySchemes
                                    });
                                    derefOperation = derefs.paths[path][method];
                                    if (derefOperation.security === undefined || derefOperation.security === null)
                                        derefOperation.security = rootSecurity;
                                    if (!derefOperation.security || !derefOperation.security.length)
                                        derefOperation.security = undefined;
                                    model.operations.push({ path: path, method: method, operation: derefOperation });
                                    // if (this.schemas.length)
                                    //   model.schemas = model.schemas.concat(this.schemas.filter(a => a[0] === operation['x-typeapi-operation-namespace']));
                                }
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                        return [2 /*return*/, Object.keys(controllers).map(function (k) { return controllers[k]; })];
                }
            });
        });
    };
    Parser.prototype.refToTypeName = function (ref) {
        var _a = __read(ref.replace('#/', '').split('/').reverse()), latest = _a[0], other = _a.slice(1);
        var nSpaces = other.reverse();
        nSpaces[0] = nSpaces[0].charAt(0).toUpperCase() + nSpaces[0].slice(1);
        nSpaces[1] = nSpaces[1].charAt(0).toUpperCase() + nSpaces[1].slice(1);
        return __spread(nSpaces, [latest]).join('.');
    };
    /**
     * Transform openapi3 to definitions.
     * @returns TypeScript .d.ts file content
     */
    Parser.prototype.toDefinitions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_5, _a, _b, _c, _d, _e, bundle, derefs, methods, insDict_2, _f, _g, path, _loop_2, this_2, _h, _j, _i, method, e_5_1;
            var _this = this;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        if (!!this._definitions) return [3 /*break*/, 14];
                        _b = this;
                        _c = {};
                        _d = dtsgenerator_1.default;
                        _e = {};
                        return [4 /*yield*/, this.markedOpenapi()];
                    case 1: return [4 /*yield*/, _d.apply(void 0, [(_e.contents = [_k.sent()], _e)])];
                    case 2:
                        _b._definitions = (_c.definitions = _k.sent(), _c);
                        return [4 /*yield*/, this.bundle()];
                    case 3:
                        bundle = _k.sent();
                        return [4 /*yield*/, this.derefsOpenapi()];
                    case 4:
                        derefs = _k.sent();
                        methods = { get: true, post: true, put: true, delete: true, head: true, trace: true, options: true, connect: true, patch: true };
                        insDict_2 = { path: 'Path', query: 'Query', header: 'Header', cookie: 'Cookie' };
                        _k.label = 5;
                    case 5:
                        _k.trys.push([5, 12, 13, 14]);
                        _f = __values(Object.keys(bundle.paths)), _g = _f.next();
                        _k.label = 6;
                    case 6:
                        if (!!_g.done) return [3 /*break*/, 11];
                        path = _g.value;
                        _loop_2 = function (method) {
                            var e_6, _a, operation, derefOperation, operationNamespace_2, parameters, ins, req, derefReq, firstKey, schema, derefSchema, _b, _c, _d, _e, status, resp, firstKey, schema, responseType, responseName;
                            return __generator(this, function (_f) {
                                switch (_f.label) {
                                    case 0:
                                        if (!(methods[method] && bundle.paths[path].hasOwnProperty(method))) return [3 /*break*/, 4];
                                        operation = bundle.paths[path][method];
                                        derefOperation = derefs.paths[path][method];
                                        operationNamespace_2 = this_2.toCamelCase(operation.operationId || path + " " + method, true);
                                        if (operation.parameters && operation.parameters.length) {
                                            parameters = operation.parameters;
                                            ins = parameters.map(function (v) { return v.in; }).filter(function (v, i, a) { return a.indexOf(v) === i; });
                                            this_2._definitions.parameters = this_2._definitions.parameters || {};
                                            this_2._definitions.parameters[operationNamespace_2] = this_2._definitions.parameters[operationNamespace_2] || {};
                                            ins.forEach(function (v) { return _this._definitions.parameters[operationNamespace_2][v] = "Paths." + operationNamespace_2 + "." + insDict_2[v] + "Parameters"; });
                                        }
                                        if (!operation.requestBody) return [3 /*break*/, 3];
                                        req = operation.requestBody;
                                        derefReq = derefOperation.requestBody;
                                        if (!req.content) return [3 /*break*/, 3];
                                        firstKey = Object.keys(req.content)[0];
                                        schema = req.content[firstKey].schema;
                                        derefSchema = derefReq.content[firstKey].schema;
                                        if (!(schema['items'] && schema['items']['$ref'])) return [3 /*break*/, 1];
                                        return [3 /*break*/, 3];
                                    case 1:
                                        if (!!schema['$ref']) return [3 /*break*/, 3];
                                        this_2._definitions.schemas = this_2._definitions.schemas || {};
                                        _b = this_2._definitions.schemas;
                                        _c = operationNamespace_2 + "RequestBody";
                                        return [4 /*yield*/, json_schema_to_typescript_1.compile(derefSchema, operationNamespace_2 + "RequestBody", {
                                                bannerComment: ''
                                            })];
                                    case 2:
                                        _b[_c] = _f.sent();
                                        _f.label = 3;
                                    case 3:
                                        if (operation.responses) {
                                            try {
                                                for (_d = __values(Object.keys(operation.responses).filter(function (v) { return !isNaN(+v) || v === 'default'; })), _e = _d.next(); !_e.done; _e = _d.next()) {
                                                    status = _e.value;
                                                    resp = operation.responses[status];
                                                    if (resp.content) {
                                                        firstKey = Object.keys(resp.content)[0];
                                                        schema = resp.content[firstKey].schema;
                                                        responseType = this_2.toCamelCase('Response ' + status, true);
                                                        if (schema['items'] && schema['items']['$ref']) {
                                                            // already use origin type #114
                                                            // this._definitions.schemas = this._definitions.schemas || {};
                                                            // this._definitions.schemas[`${operationNamespace}${responseType}`] = `export type ${`${operationNamespace}${responseType}`} = Array<${this.refToTypeName(schema['items']['$ref'])}>;`;
                                                        }
                                                        else if (!schema['$ref']) {
                                                            responseName = !isNaN(status) ? "$" + status : this_2.toCamelCase(status, true);
                                                            this_2._definitions.schemas = this_2._definitions.schemas || {};
                                                            this_2._definitions.schemas["" + operationNamespace_2 + responseType] = "export type " + operationNamespace_2 + responseType + " = Paths." + operationNamespace_2 + ".Responses." + responseName + ";";
                                                        }
                                                    }
                                                }
                                            }
                                            catch (e_6_1) { e_6 = { error: e_6_1 }; }
                                            finally {
                                                try {
                                                    if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                                                }
                                                finally { if (e_6) throw e_6.error; }
                                            }
                                        }
                                        _f.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        };
                        this_2 = this;
                        _h = [];
                        for (_j in bundle.paths[path])
                            _h.push(_j);
                        _i = 0;
                        _k.label = 7;
                    case 7:
                        if (!(_i < _h.length)) return [3 /*break*/, 10];
                        method = _h[_i];
                        return [5 /*yield**/, _loop_2(method)];
                    case 8:
                        _k.sent();
                        _k.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 7];
                    case 10:
                        _g = _f.next();
                        return [3 /*break*/, 6];
                    case 11: return [3 /*break*/, 14];
                    case 12:
                        e_5_1 = _k.sent();
                        e_5 = { error: e_5_1 };
                        return [3 /*break*/, 14];
                    case 13:
                        try {
                            if (_g && !_g.done && (_a = _f.return)) _a.call(_f);
                        }
                        finally { if (e_5) throw e_5.error; }
                        return [7 /*endfinally*/];
                    case 14: return [2 /*return*/, this._definitions];
                }
            });
        });
    };
    /**
     * Deref local $ref(s)
     */
    Parser.prototype.bundle = function () {
        return __awaiter(this, void 0, void 0, function () {
            var api, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this._bundle) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.openapi3()];
                    case 1:
                        api = _b.sent();
                        // TODO: fix type:array with items:$ref will error with $RefParaser
                        _a = this;
                        return [4 /*yield*/, $RefParaser.bundle(JSON.parse(JSON.stringify(api)))];
                    case 2:
                        // TODO: fix type:array with items:$ref will error with $RefParaser
                        _a._bundle = (_b.sent());
                        _b.label = 3;
                    case 3: return [2 /*return*/, this._bundle];
                }
            });
        });
    };
    /**
     * Get dedefs openapi with marks
     * @returns processed openapi spec with x-typeapi-* marks
     */
    Parser.prototype.derefsOpenapi = function (schema) {
        return __awaiter(this, void 0, void 0, function () {
            var marked, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (schema)
                            return [2 /*return*/, $RefParaser.dereference(JSON.parse(JSON.stringify(schema)))];
                        if (!!this._derefs) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.markedOpenapi()];
                    case 1:
                        marked = _b.sent();
                        _a = this;
                        return [4 /*yield*/, $RefParaser.dereference(JSON.parse(JSON.stringify(marked)))];
                    case 2:
                        _a._derefs = (_b.sent());
                        _b.label = 3;
                    case 3: return [2 /*return*/, this._derefs];
                }
            });
        });
    };
    /**
     * Converting an object to a string
     * https://stackoverflow.com/questions/5612787/converting-an-object-to-a-string
     * http://jsfiddle.net/numoccpk/1/
     */
    Parser.prototype.convertToText = function (obj) {
        //create an array that will later be joined into a string.
        var string = [];
        //is object
        //    Both arrays and objects seem to return "object"
        //    when typeof(obj) is applied to them. So instead
        //    I am checking to see if they have the property
        //    join, which normal objects don't have but
        //    arrays do.
        if (obj == undefined) {
            return String(obj);
        }
        else if (typeof (obj) == "object" && (obj.join == undefined)) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop))
                    string.push(prop + ": " + this.convertToText(obj[prop]));
            }
            ;
            return "{" + string.join(",") + "}";
            //is array
        }
        else if (typeof (obj) == "object" && !(obj.join == undefined)) {
            for (var prop in obj) {
                string.push(this.convertToText(obj[prop]));
            }
            return "[" + string.join(",") + "]";
            //is function
        }
        else if (typeof (obj) == "function") {
            string.push(obj.toString());
            //all other values can be done with JSON.stringify
        }
        else {
            string.push(JSON.stringify(obj));
        }
        return string.join(",");
    };
    return Parser;
}());
exports.Parser = Parser;
//# sourceMappingURL=Parser.js.map
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
function default_1(model, escapeFn, include, rethrow) {
    if (model === void 0) { model = {}; }
    return __awaiter(this, void 0, void 0, function () {
        function encode_char(c) {
            return _ENCODE_HTML_RULES[c] || c;
        }
        function toParameters(t, s) {
            var ty = (t || '').toLowerCase();
            var sc = (s || '').toLowerCase();
            if (ty === 'apikey')
                return '{ apiKey }: IApiKeyParameters';
            if (ty === 'http') {
                if (sc === 'basic')
                    return '{ userId, password }: IHttpBasicParameters';
                if (sc === 'bearer')
                    return '{ token, format }: IHttpBearerParameters';
                return '{ schema, requirement }: IHttpParameters';
            }
            if (ty === 'oauth2')
                return '{ flows, scopes }: IOauth2Parameters';
            if (ty === 'openidconnect')
                return '{ openIdConnectUrl, scopes }: IOpenIdConnectParameters';
            return '{ schema, requirement, parameters }: ISecurityParameters';
        }
        var _ENCODE_HTML_RULES, _MATCH_HTML, __output, __append;
        return __generator(this, function (_a) {
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
            __append("import {\n  IContext,\n  errorMessage, SecurityError,\n  ISecurityAction, IApiKeyParameters, IHttpBasicParameters, IHttpBearerParameters, IHttpParameters, IOauth2Parameters, IOpenIdConnectParameters, ISecurityParameters\n} from '@typeapi/api-router';\n\nexport interface ISecurity {\n");
            Object.keys(model).forEach(function (name) {
                var security = model[name];
                ;
                __append("  /**\n   * ");
                __append(security.description || name);
                __append("\n   * @type ");
                __append(security.type);
                __append("\n   */\n  ");
                __append(name);
                __append("(");
                __append(toParameters(security.type, security.scheme));
                __append(", context: IContext): Promise<boolean | errorMessage | SecurityError>;\n");
            });
            ;
            __append("}");
            return [2 /*return*/, __output.join("")];
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=isecurity.js.map
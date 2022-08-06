export default async function(model:any = {}, escapeFn?:Function, include?:Function, rethrow?:Function
) {
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
;
  var __output = [], __append = __output.push.bind(__output);
    ; __append("import { IRouterRegister } from '@typeapi/api-router';\n// import { IContext as IDatetimeContext, Plugin as DatetimePlugin } from '@typeapi/plugin-parser-datetime';\nexport interface IContext /*extends IDatetimeContext*/ {\n    // extend context type from security, like parsed user from security. ex:\n    // user?: { name: string, age?: number }\n}\nexport const plugins: IRouterRegister[] = [\n    // new DatetimePlugin({ timezone: 'Asia/Taipei' })\n];")
  return __output.join("");

}
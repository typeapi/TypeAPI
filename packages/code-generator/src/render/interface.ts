import operationRender from './block/interfaceOp';
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
    ; 

    ; __append("/// <reference path=\"./definitions.ts\" />\n\nimport { IContext, IResult, IApiInterface } from '@typeapi/api-router';\n\nexport interface IController {\n")
    ;  for(const o of model.operations){ 
    ; __append( await operationRender({...(o.operation),path:o.path,method:o.method}) )
    ; __append(";\n")
    ;  } 
    ; __append("}\n\nexport var apiInterface: IApiInterface = {\n    openapiName: '")
    ; __append( model.openapiName )
    ; __append("',\n    controllerName: '")
    ; __append( model.controllerName==='__default__' ? '' : model.controllerName )
    ; __append("',\n    serverUrl: '")
    ; __append( model.serverUrl )
    ; __append("',\n")
    ;  if(model.security){ 
    ; __append("    security: ")
    ; __append( JSON.stringify(model.security,null,4) )
    ; __append(",\n")
    ;  } 
    ; __append("    operations: <any>")
    ; __append( JSON.stringify(model.operations,null,4) )
    ; __append("\n}\n")
  return __output.join("");

}
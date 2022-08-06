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
    ; __append( model.definitions )
    ; __append("\n")
    ;  if(model.schemas){ 
    ; __append("declare namespace Schemas {\n")
    ;  Object.keys(model.schemas).forEach((v,i,a)=>{ 
    ; __append("    ")
    ; __append( model.schemas[v] )
    ; __append("\n")
    ;  }); 
    ;  
    ; __append("}\n")
    ;  } 
    ;  if(model.parameters && Object.keys(model.parameters).length){ 
    ; __append("declare namespace Parameters {\n")
    ;  Object.keys(model.parameters).length && Object.keys(model.parameters).forEach((v,i,a)=>{ 
    ; __append("    export interface ")
    ; __append( v )
    ; __append("{\n")
    ;  Object.keys(model.parameters[v]).length && Object.keys(model.parameters[v]).forEach((vv,ii,aa)=>{ 
    ; __append("         ")
    ; __append( vv )
    ; __append(": ")
    ; __append( model.parameters[v][vv] )
    ; __append(";\n")
    ;  }); 
    ;  
    ; __append("    }\n")
    ;  }); 
    ; __append("}\n")
    ;  } 
  return __output.join("");

}
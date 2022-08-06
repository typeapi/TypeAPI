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
let desctructer = undefined;
if(model.parameters && model.parameters.length){
    desctructer = {};
    for(const p of model.parameters){
        desctructer[p.in] = desctructer[p.in] || [];
        desctructer[p.in].push(p['x-typeapi-parameter-name']||p.name);
    }
}

    ; __append( model.operationId )
    ; __append("(")
    ;  if(desctructer){ 
    ; __append("{")
    ;  Object.keys(desctructer).forEach((v,i,a)=>{ 
    ; __append("\n        ")
    ; __append( `${v}: { ${desctructer[v].join(', ')} }` )
    ; __append( i===a.length-1?'':',' )
    ;  }); 
    ; __append("\n    }: ")
    ; __append( model['x-typeapi-parameters-type']||'undefined' )
    ;  }else{ 
    ; __append("parameters: undefined")
    ;  } 
    ; __append(", body: ")
    ; __append( model.requestBody && model.requestBody['x-typeapi-request-body'] || 'undefined' )
    ; __append(", context: IContext): Promise<")
    ;  
    ;  model.responses && Object.keys(model.responses).forEach((v,i,a)=>{ 
    ; __append("\n        IResult<")
    ; __append( v==='default' && `'default'` || v )
    ; __append(", '")
    ; __append( model.responses[v].description )
    ; __append("'")
    ; __append( model.responses[v]['x-typeapi-response'] && `, ${model.responses[v]['x-typeapi-response']}` || '' )
    ; __append(">")
    ; __append( i+1!==a.length && ' |' || '' )
    ;  }); 
    ; __append("\n    >")
  return __output.join("");

}
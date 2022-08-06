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
    let requestDescription = model.requestBody && model.requestBody.content && model.requestBody.content[Object.keys(model.requestBody.content)[0]] && model.requestBody.content[Object.keys(model.requestBody.content)[0]].schema && model.requestBody.content[Object.keys(model.requestBody.content)[0]].schema.description;

    ; __append("    /**\n")
    ;  if(model.summary || model.description){ 
    ; __append("     * ")
    ; __append( [model.summary,model.description].filter(v=>!!v).join('\n').replace(/\n/g,'\n     * ') )
    ; __append("\n")
    ;  } 
    ; __append("     * @path ")
    ; __append( model.path )
    ; __append("\n     * @method ")
    ; __append( model.method.toUpperCase() )
    ; __append("\n")
    ;  if(model.tags && model.tags.length){ 
    ; __append("     * @tags ")
    ; __append( model.tags.join(', ') )
    ; __append("\n")
    ;  } 
    ;  if(model.security && model.security.length){ 
    ; __append("     * @security ")
    ; __append( model.security.map(v=>Object.keys(v).join(' AND ')).map(v=>v.indexOf('AND')>0?`(${v})`:v).join(' OR ') )
    ; __append("\n")
    ;  } 
    ;  if(model.parameters && model.parameters.length){ 
    ;  model.parameters.forEach((v,i,a)=>{ 
    ; __append("     * @param ")
    ; __append( `${v['x-typeapi-parameter-name']||v.name}` )
    ; __append(" - ")
    ; __append( v.schema && `{${v.schema.type}${v.schema.items && ':'+v.schema.items.type || ''}${v.schema.format && ':'+v.schema.format || ''}${v.required&&':required'||''}}`||'' )
    ; __append(" ")
    ; __append( v.description )
    ; __append("\n")
    ;  }); 
    ;  } 
    ;  if(requestDescription){ 
    ; __append("     * @param body ")
    ; __append( requestDescription )
    ; __append("\n")
    ;  } 
    ;  if(model.deprecated){ 
    ; __append("     * ***************************** *\n     * This api has been deprecated. *\n     * ***************************** *\n")
    ;  } 
    ; __append("     */")
  return __output.join("");

}
import sub from './sub/sub';
export default async function(model:any = {}, escapeFn?:Function, include?:Function, rethrow?:Function
/*``*/) {
escapeFn = escapeFn || function (markup){return null==markup?"":String(markup).replace(_MATCH_HTML,encode_char)};
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

    ; __append("\ntry{\n// template file\n}cache(e){\n    ")
    ; __append(await sub())
    ; __append("\nthrow e\n}\n")
  return __output.join("");

}
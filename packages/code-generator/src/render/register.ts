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
    ; __append("import { ApiRouter, ApiSecurity, IConnector } from '@typeapi/api-router';\n")
    ;  model.fileNames.forEach( (v,i,a) =>{ 
    ; __append("import * as ")
    ; __append( model.controllerNames[i] )
    ; __append(" from './")
    ; __append( v )
    ; __append("controller';\n")
    ;  }); 
    ; __append("import { Security, IOptions as ISecurityOptions } from './security';\nimport { plugins } from './plugins';\nexport const Controllers = { ")
    ; __append( model.controllerNames.join(', ') )
    ; __append(" };\nexport type ControllersOptions = ")
    ; __append( ['ISecurityOptions'].concat(model.controllerNames.map(v=> `${v}.IOptions` )).join(' & ') )
    ; __append(";\nexport function register<T extends IConnector>(connector: T, controllerOptions?: ControllersOptions, routerRegister?: { (apiRouter: ApiRouter): void }): T;\nexport function register<T extends IConnector>(connector: T, routerRegister?: { (apiRouter: ApiRouter): void }): T;\nexport function register<T extends IConnector>(connector: T, optionsOrRegisters?: ControllersOptions | { (apiRouter: ApiRouter): void }, routerRegister?: { (apiRouter: ApiRouter): void }): T {\n    let controllerOptions: ControllersOptions = {} as ControllersOptions;\n    if (optionsOrRegisters instanceof Function)\n        routerRegister = optionsOrRegisters;\n    else if (typeof optionsOrRegisters === 'object' && optionsOrRegisters !== null)\n        controllerOptions = optionsOrRegisters;\n    let security = new ApiSecurity({ controller: new Security(controllerOptions) });\n    Object.keys(Controllers).forEach(ctrlName => {\n        let Ctrl = Controllers[ctrlName];\n        let controller = new Ctrl.Controller(controllerOptions);\n        let apiRouter = new ApiRouter({ apiInterface: Ctrl.apiInterface, controller, security, plugins });\n        routerRegister && routerRegister(apiRouter);\n        apiRouter.registerApis(connector);\n    });\n    return connector;\n}\n\nexport default register;\n")
  return __output.join("");

}
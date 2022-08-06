import operationRender from './block/controllerOp';
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

    ; __append("/// <reference path=\"./interface/definitions.ts\" />\n\nimport { ApiRouter, IResult, ApiError, IRouterRegister } from '@typeapi/api-router';\nimport { IConnection } from '@typeapi/api-router';\n// if you want use connector specific object in context.connection, import IConnection from connector module. ex:\n// import { IConnection } from '@typeapi/express-connector';\n\nimport { IController } from './interface/")
    ; __append( model.controllerName === '' || model.controllerName === '__default__' ? '' : `${model.controllerName}.` )
    ; __append("interface';\n// export apiInterface for register/apiRouter usage.\nexport { apiInterface } from './interface/")
    ; __append( model.controllerName === '' || model.controllerName === '__default__' ? '' : `${model.controllerName}.` )
    ; __append("interface';\n\nimport { IContext as ISecurityContext } from './security';\nimport { IContext as IPluginsContext } from './plugins';\ninterface IContext extends ISecurityContext<IConnection>, IPluginsContext {\n    // extend context type from plugin or events, like parsed user from security. ex:\n    // user?: { name: string, age?: number }\n}\nexport interface IOptions {\n    // define service object type which passed in options from register. ex:\n    // dbConn: db;\n}\n\nexport class Controller implements IController, IRouterRegister {\n    constructor(private options?: IOptions) {\n    }\n    /**\n     * for register apiRouter event or plugin.\n     * @param apiRouter - inject apiRouter instance at runtime.\n     */\n    apiRouterRegister(apiRouter: ApiRouter): void {\n        //// register events or plugins here\n        // apiRouter.preRouting(async (ctx) => console.log('invoke preRouting.'), true);\n        // apiRouter.postRouting(async (ctx) => console.log('invoke postRouting.'));\n        // apiRouter.onError(async (ctx, err) => console.log('invoke onError.'));\n        // apiRouter.setPlugin(new Plugin(options));\n        // apiRouter.setStatusCode('default', 200);\n    }\n")
    ;  for(const o of model.operations){ 
    ; __append( await operationRender({...(o.operation),path:o.path,method:o.method}) )
    ; __append(" {\n        throw new ApiError(500, 'not implements');\n    }\n")
    ;  } 
    ; __append("}\n\n\n")
  return __output.join("");

}
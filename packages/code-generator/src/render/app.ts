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
    ;  if(model.server==='express'){ 
    ; __append("import * as express from 'express';\nimport * as bodyParser from 'body-parser';\nimport * as cookieParser from 'cookie-parser';\n\nlet app = express();\n/**\n * express body application/json parser.\n */\nvar jsonParser = bodyParser.json();\napp.use(jsonParser);\n/**\n * express form body parser(application/x-www-form-urlencoded).\n */\nvar formParser = bodyParser.urlencoded({ extended: false });\napp.use(formParser);\n/**\n * express cookie parser.\n */\napp.use(cookieParser());\n\n/**\n * multi/auto controller register version\n * setting plugins in plugins.ts\n */\nimport { Connector } from '@typeapi/express-connector';\nimport { register, ControllersOptions } from './register';\nlet controllersOptions: ControllersOptions = {};\napp.use(register(new Connector(), controllersOptions, apiRouter => void 0).expressRouter());\n\n/**\n * single/menu controller register version\n */\n// import { ApiRouter } from '@typeapi/api-router';\n// import { Connector, IConnection } from '@typeapi/express-connector';\n// /**\n//  * import route controllers\n//  */\n// import { apiInterface, Controller, IOptions as IControllerOptions } from './controller';\n// /**\n//  * import security controller\n//  */\n// import { Security, IOptions as ISecurityOptions } from './security';\n// /**\n//  * import api-router plugins\n//  */\n// import { Plugin as Timestamps } from '@typeapi/plugin-parser-timestamps';\n// import { Plugin as SchemaValidator } from '@typeapi/plugin-jsonschema-validator';\n// let options: IControllerOptions & ISecurityOptions = {};\n// app.use(\n//     new ApiRouter<IConnection>({\n//         apiInterface,\n//         controller: new Controller(options),\n//         security: new Security(options),\n//         plugins: [\n//             new Timestamps({ timezone: 'Asia/Taipei' }),\n//             new SchemaValidator({ parametersValidable: true })\n//         ]\n//     }).registerApis(new Connector())\n//         .expressRouter()\n// );\n\napp.listen(3000, err => {\n    console.log('app listen on port 3000...', 'http://localhost:3000');\n});\n")
    ;  } 
  return __output.join("");

}
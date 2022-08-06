"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var app = express();
/**
 * express body application/json parser.
 */
var jsonParser = bodyParser.json();
app.use(jsonParser);
/**
 * express form body parser(application/x-www-form-urlencoded).
 */
var formParser = bodyParser.urlencoded({ extended: false });
app.use(formParser);
/**
 * express cookie parser.
 */
app.use(cookieParser());
/**
 * multi/auto controller register version
 * setting plugins in plugins.ts
 */
var express_connector_1 = require("@typeapi/express-connector");
var register_1 = require("./register");
var controllersOptions = {};
app.use(register_1.register(new express_connector_1.Connector(), controllersOptions, function (apiRouter) { return void 0; }).expressRouter());
/**
 * single/menu controller register version
 */
// import { ApiRouter } from '@typeapi/api-router';
// import { Connector, IConnection } from '@typeapi/express-connector';
// /**
//  * import route controllers
//  */
// import { apiInterface, Controller, IOptions as IControllerOptions } from './controller';
// /**
//  * import security controller
//  */
// import { Security, IOptions as ISecurityOptions } from './security';
// /**
//  * import api-router plugins
//  */
// import { Plugin as Timestamps } from '@typeapi/plugin-parser-timestamps';
// import { Plugin as SchemaValidator } from '@typeapi/plugin-jsonschema-validator';
// let options: IControllerOptions & ISecurityOptions = {};
// app.use(
//     new ApiRouter<IConnection>({
//         apiInterface,
//         controller: new Controller(options),
//         security: new Security(options),
//         plugins: [
//             new Timestamps({ timezone: 'Asia/Taipei' }),
//             new SchemaValidator({ parametersValidable: true })
//         ]
//     }).registerApis(new Connector())
//         .expressRouter()
// );
app.listen(3000, function (err) {
    console.log('app listen on port 3000...', 'http://localhost:3000');
});
//# sourceMappingURL=app.js.map
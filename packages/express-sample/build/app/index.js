"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false });
var app = express();
app.use(jsonParser);
// app.use(urlencodedParser);
app.use(cookieParser());
/**
 * multi controller register version
 */
// import { Connector } from '@typeapi/express-connector';
// import { register } from '../router/register';
// app.use(register(new Connector()).expressRouter());
/**
 * single controller register version
 */
var api_router_1 = require("@typeapi/api-router");
var express_connector_1 = require("@typeapi/express-connector");
var controller_1 = require("../router/controller");
var security_1 = require("../router/security");
var plugin_parser_timestamps_1 = require("@typeapi/plugin-parser-timestamps");
var plugin_jsonschema_validator_1 = require("@typeapi/plugin-jsonschema-validator");
var options = {};
app.use(new api_router_1.ApiRouter({
    apiInterface: controller_1.apiInterface,
    controller: new controller_1.Controller(options),
    security: new security_1.Security(options),
    plugins: [
        new plugin_parser_timestamps_1.Plugin({ timezone: 'Asia/Taipei' }),
        new plugin_jsonschema_validator_1.Plugin({ parametersValidable: true })
    ]
}).registerApis(new express_connector_1.Connector())
    .expressRouter());
app.listen(3000, function (err) {
    console.log('app listen on port 3000...', 'http://localhost:3000');
});
//# sourceMappingURL=index.js.map
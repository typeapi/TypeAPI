import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false });

let app = express();
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
import { ApiRouter } from '@typeapi/api-router';
import { Connector, IConnection } from '@typeapi/express-connector';
import { apiInterface, Controller, IOptions as IControllerOptions } from '../router/controller';
import { Security, IOptions as ISecurityOptions } from '../router/security';
import { Plugin as Timestamps } from '@typeapi/plugin-parser-timestamps';
import { Plugin as SchemaValidator } from '@typeapi/plugin-jsonschema-validator';
let options: IControllerOptions & ISecurityOptions = {};
app.use(
    new ApiRouter<IConnection>({
        apiInterface,
        controller: new Controller(options),
        security: new Security(options),
        plugins: [
            new Timestamps({ timezone: 'Asia/Taipei' }),
            new SchemaValidator({ parametersValidable: true })
        ]
    }).registerApis(new Connector())
        .expressRouter()
);

app.listen(3000, (err) => {
    console.log('app listen on port 3000...', 'http://localhost:3000');
});

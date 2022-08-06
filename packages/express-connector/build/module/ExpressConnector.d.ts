import * as express from 'express';
import { IConnection as IBaseConnection, IConnector, IResult } from '@typeapi/api-router';
export interface IConnection extends IBaseConnection {
    request: express.Request;
    response: express.Response;
    next: express.NextFunction;
}
export interface IConnectorOptions {
    app?: express.Express;
}
export interface IConnectorAccess {
    expressRouter(): express.Router;
}
export declare class Connector implements IConnector<IConnection>, IConnectorAccess {
    private options;
    private app;
    constructor(options?: IConnectorOptions);
    private send;
    private parameters;
    private body;
    private toExpressPath;
    registerApi(basePath: string, apiPath: string, method: string, processer: {
        (connection: IConnection): Promise<IResult>;
    }): void;
    expressRouter(): express.Router;
}
//# sourceMappingURL=ExpressConnector.d.ts.map
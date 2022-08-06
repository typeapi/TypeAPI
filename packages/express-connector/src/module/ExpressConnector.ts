import * as express from 'express';
import { IConnection as IBaseConnection, IConnector, IResult, IParameters } from '@typeapi/api-router';
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
export class Connector implements IConnector<IConnection>, IConnectorAccess {
    private app: express.Express | express.Router;
    constructor(private options: IConnectorOptions = {}) {
        this.app = options.app || express.Router();
    }
    private send(response: express.Response, result: IResult): void {
        // TODO: 處理未定義 code 及 contentType 預設值, 及 依 result 類型(Buffer/Stream)自動判定contentType
        if (!result.responded) {
            response.status(+(result.code) || 500);
            if (result.contentType) // application/json
                response.set('Content-Type', result.contentType);
            let body = typeof result.result === 'undefined' || result.result === null || result.result === NaN ? '' : result.result;

            if (typeof body['pipe'] === 'function' && typeof body['on'] === 'function' && body['readable'] !== false) {
                // body is Stream
                body['on']('data', data => response.write(data));
                body['on']('end', () => response.end());
            } else if (typeof body === 'string' || typeof body === 'number')
                response.send(`${body}`);
            else if (Array.isArray(body) || typeof body === 'object')
                response.send(JSON.stringify(body));
            else
                response.send(body);
            response.end();
        }
    }
    private parameters(request: express.Request): IParameters {
        return { path: request.params, query: request.query, header: request.headers, cookie: request.cookies };
    }
    private body(request: express.Request): any {
        return request.body;
    }
    private toExpressPath(basePath: string, path: string): string {
        return '/' + `${basePath}/${path}`
            .split('/')
            .filter(v => !!v)
            .map(v => v.replace(/\{([^}]+)}/g, ':$1'))
            .join('/');
    }
    registerApi(basePath: string, apiPath: string, method: string, processer: { (connection: IConnection): Promise<IResult> }): void {
        this.app[method](this.toExpressPath(basePath, apiPath), async (request: express.Request, response: express.Response, next: express.NextFunction) => {
            let parameters = this.parameters(request);
            let body = this.body(request);
            let pack = {
                parameters,
                body,
                send: (result: IResult) => { this.send(response, result) },
                request,
                response,
                next
            };
            let result = await processer(pack);
            this.send(response, result);
        });
    }
    expressRouter(): express.Router {
        if (this.options.app)
            throw 'already register apis by options.app(express).';
        return this.app;
    }
}
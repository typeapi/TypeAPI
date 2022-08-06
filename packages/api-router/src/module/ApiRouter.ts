import { OpenAPIV3 } from 'openapi-types';
import { OperationObject } from '../define/OperationObject';
import { IConnector, IConnection, IResult, TData } from './IConnector';
// import { URL } from 'url';
import { ApiSecurity, ISecurityController, SecurityError, errorMessage } from './ApiSecurity';
export interface IApiError<code = 500, message = 'Internal Server Error'> {
    code: code;
    message?: message | string;
    type?: string;
}
export class ApiError<code = 500, message = string> extends Error implements IApiError<code, message>{
    constructor(code: code, message?: message, public type: string = 'ApiError') {
        super(`${message || ''}` || 'Internal Server Error')
        this.code = code || 500 as any;
    }
    public code: code;
}

export class ApiResult implements IResult<number | any, string | any, TData | any> {
    constructor(public result?: TData, public code: number | any = 200) {
    }
}
export enum Methods {
    get = 'get',
    head = 'head',
    post = 'post',
    delete = 'delete',
    trace = 'trace',
    options = 'options',
    connect = 'connect',
    patch = 'patch'
}
export interface ISecuritySchemes {
    [key: string]: OpenAPIV3.SecuritySchemeObject;
};
export interface IApi {
    path: string;
    method: Methods;
    operation: OperationObject;
    // tags: string[];
    // operationId: string;
}
export interface IContext<C extends IConnection = IConnection> {
    // serial: number;
    // counter: number;
    // createOn: number;
    apiInterface: IApiInterface;
    // openapiName?: string;
    // controllerName?: string;
    controller: IApiController | Object;
    basePath?: string;
    api: IApi;
    expressPath?: string;
    parameters?: IParsedParameters;
    body?: TRequestBody;
    code?: number;
    contentType?: string;
    result?: string | Object | Array<any> | Buffer;// | Stream;
    error?: IApiError | errorMessage | Error;
    responded?: boolean;
    connector: IConnector<C>;
    connection?: C;
}
export interface IApiInterface {
    openapiName: string;
    controllerName: string;
    serverUrl: string;
    operations: IApi[];
    security?: ISecuritySchemes;
}
export interface IApiRouterOptions {
    apiInterface: IApiInterface;
    controller: IApiController | Object;
    security?: ApiSecurity | ISecurityController | Object;
    /**
     * custom request parameter parser by type and format with parser function
     */
    parsers?: { type: string, format: string, parser: IParser }[];
    // validators?: { operatId: string, flow: 'request' | 'response', schema: any | 'string' | 'number', validator: (value: any) => boolean | Promise<boolean> }[];
    // requestValidate?: boolean;
    // responseValidate?: boolean;
    // connector: IConnector<GConnection>;
    plugins?: IRouterRegister[];
    statusMap?: { [key: string]: number };
}

export interface IControllerOptions {
    apiRouter: ApiRouter;
}
export interface IApiController {
    // new(options: IControllerOptions): IApiController;
    [operationId: string]: { (parameters: any, body: any, context: IContext<IConnection>): Promise<IResult<number, string, any>> };
}
export interface IApiRouterAccess<C extends IConnection> {
    registerApis(connector: IConnector<C>): IConnector<C>;
}
export interface IParsedParameters {
    // body?: any;
    // requestIn: path, query, header, cookie
    [requestIn: string]: { [parameter: string]: string | number | boolean | Object | Array<string | number | boolean> };
}
export type TRequestBody = any;
export enum hooks {
    starting = 'starting',
    routing = 'routing',
    resulted = 'resulted',
    unauthorized = 'unauthorized',
    exception = 'exception',
    responding = 'responding'
}
export interface IHandler {
    (context: IContext, error?: IApiError | errorMessage | Error): Promise<void>;
}

// export const symRouterRegister = Symbol('routerRegister');
export interface IRouterRegister {
    // [symRouterRegister]?: { (apiRouter: ApiRouter): Promise<void> };
    apiRouterRegister?: { (apiRouter: ApiRouter): void };
}
export interface IParser {
    (value: string, parameter: OpenAPIV3.ParameterObject, context: IContext): Promise<any>
}
export class ApiRouter<C extends IConnection = IConnection> implements IApiRouterAccess<C> {
    private basePath: string;
    private security: ApiSecurity;
    constructor(private options: IApiRouterOptions) {
        // 對應 OAS3 從 server(host) url 取出 baseUrl
        // this.basePath = decodeURI(new URL(options.apiInterface.serverUrl, 'http://localhost').pathname).replace(/\/$/, '');
        this.basePath = '/' + options.apiInterface.serverUrl.split('/').slice(3).join('/');
        // 依 type/format 加入訂製 解析器(parser) 至預設解析器集合
        if (options.parsers && options.parsers.length) {
            this.setParser(options.parsers);
        }
        if (!options.statusMap)
            options.statusMap = {};
        if (options.security) {
            this.security =
                options.security['type'] === 'ApiSecurity' ?
                    <ApiSecurity>options.security :
                    new ApiSecurity({ controller: options.security });
        }
        if (options.plugins && options.plugins.length) {
            for (const plugin of options.plugins) {
                // plugin.apiRouterRegister && plugin.apiRouterRegister(this);
                this.setPlugin(plugin);
            }
        }
        if (options.controller['apiRouterRegister']) {
            options.controller['apiRouterRegister'](this);
        }
    }
    private setContextHandlers: { (context: IContext): void }[] = [];
    setContext(requestStarting: { (context: IContext): void }): void {
        this.setContextHandlers.push(requestStarting);
    }
    setParser(type: string, format: string, parser: IParser): void;
    setParser(parsers: { type: string, format: string, parser: IParser }[]): void;
    setParser(typeOrList: string | { type: string, format: string, parser: IParser }[], format?: string, parser?: IParser): void {
        let ps = Array.isArray(typeOrList) ? typeOrList : [{ type: typeOrList, format, parser }];
        for (const p of ps) {
            let format = p.format || 'default';
            this._parsers[p.type] = this._parsers[p.type] || { 'default': [] };
            this._parsers[p.type][format] = this._parsers[p.type][format] || [];
            this._parsers[p.type][format].unshift(p.parser);
        }
    }
    private _registerHandlers: { (api: IApi, connector: IConnector<C>): { api: IApi, connector: IConnector<C> } }[] = [];
    setOperation(apiRegistering: { (api: IApi, connector: IConnector<C>): { api: IApi, connector: IConnector<C> } }): void {
        this._registerHandlers.push(apiRegistering);
    }
    setStatusCode(statusName: 'default' | string, code: number): void {
        // this.options.statusMap = this.options.statusMap || {};
        this.options.statusMap[statusName] = code;
    }
    setPlugin(plugin: IRouterRegister): void {
        plugin.apiRouterRegister && plugin.apiRouterRegister(this);
    }
    private _parsers: { [type: string]: { [format: string]: IParser[] } } = {
        'integer': { 'default': [async (v, p, c): Promise<number> => Math.floor(Number(v))] },
        'number': { 'default': [async (v, p, c): Promise<number> => Number(v)] },
        'boolean': { 'default': [async (v, p, c): Promise<boolean> => typeof v !== 'string' ? (!v ? v : true) : { '': true, 'false': true, '0': true }[v.toLowerCase()] ? false : true] },
        'string': {
            'default': [async (v, p, c): Promise<string> => v]
            // , 'byte': [], 'binary': [], 'date': [], 'date-time': []
        },
        'array': {
            'default': [async (v, p, c): Promise<any[]> => {
                if (!v || typeof v !== 'string')
                    return undefined;
                if (p.style === 'json') {
                    let arr = JSON.parse(v);
                    if (!Array.isArray(arr))
                        throw `parameter is not array with JSON style`;
                    return arr;
                }
                let delimit: string = 'json';
                if (p.in === 'query') {
                    if (p.style === 'form') {
                        if (p.explode)// delimit = 'multi'
                            throw ` not support multi type array`;
                        delimit = 'csv';
                    }
                    else if (p.style === 'spaceDelimited')
                        delimit = 'ssv';
                    else if (p.style === 'pipeDelimited')
                        delimit = 'pipes';
                    else if (p.style === 'simple')
                        delimit = 'csv';
                    else
                        delimit = 'csv';
                    // throw 'without array parameter style define in query.';
                } else if ((p.in === 'path' || p.in === 'header') && p.style === 'simple') {
                    delimit = 'csv';
                }
                // check nest array
                let schema = p.schema as OpenAPIV3.ArraySchemaObject;
                let schemaItems = schema.items as OpenAPIV3.ArraySchemaObject | OpenAPIV3.NonArraySchemaObject;
                if (schemaItems.type === 'array')
                    throw 'not support nest array.';
                // default for csv spliter
                let split = v.split({ csv: ',', ssv: ' ', pipes: '|' }[delimit] || ',');
                for (let i = 0; i < split.length; i++) {
                    split[i] = await this.toParse(split[i], schemaItems.type || 'string', schemaItems.format, p, c);
                }
                return split;
            }]
        },
        'object': {
            'default': [async (v, p, c): Promise<Object> => JSON.parse(v)]
        }
    };
    private async toParse(value: string, type: string, format: string, parameter: OpenAPIV3.ParameterObject, context: IContext): Promise<any> {
        let parsers = [];
        if (this._parsers[type])
            parsers = parsers.concat(this._parsers[type]['default']);
        if (this._parsers[type] && this._parsers[type][format])
            parsers = this._parsers[type][format].concat(parsers);
        for (const parser of parsers) {
            try {
                return await parser(value, parameter, context);
            } catch (error) {
                console.log(`parameter parse error`, error);
                // continue;
            }
        }
        console.log(`unable parse parameter value: ${value}, type: ${type}, format: ${format || ''}.`);
        return undefined;
    }
    private async parseParameters(schemas: OpenAPIV3.ParameterObject[], context: IContext): Promise<IParsedParameters> {
        context.parameters = {}; //body: context.connection.body
        for (const schema of schemas) {
            let req = context.connection.parameters[schema.in];
            if (!req || !schema.schema || !schema.schema['type']) continue;
            context.parameters[schema.in] = context.parameters[schema.in] || {};
            let value = await this.toParse(req[schema.name], schema.schema['type'], schema.schema['format'], schema, context);
            if (value !== undefined)
                context.parameters[schema.in][schema.name] = value;
        }
        return context.parameters;
    }
    private _hookHdls: { [hook: string]: IHandler[] } = {};
    hookUp(hook: hooks, handler: IHandler, pushTo: 'last' | 'first' = 'last'): void {
        !this._hookHdls[hook] && (this._hookHdls[hook] = []);
        this._hookHdls[hook][pushTo === 'first' ? 'unshift' : 'push'](handler);
    }
    private async _hooking(hook: hooks, ctx: IContext, error?: IApiError | errorMessage | Error): Promise<void> {
        if (this._hookHdls[hook])
            await Promise.all(this._hookHdls[hook].map(h => h(ctx, error)));
        // for (const hdl of this._hookHdls[hook]) {
        //     await hdl(ctx, error);
        // }
    }
    preRouting(handler: IHandler, toFirst: boolean = false): void {
        toFirst ?
            this.hookUp(hooks.starting, handler, 'first') :
            this.hookUp(hooks.routing, handler);
    }
    postRouted(handler: IHandler, toLast: boolean = false): void {
        toLast ?
            this.hookUp(hooks.responding, handler) :
            this.hookUp(hooks.resulted, handler);
    }
    onError(handler: IHandler): void {
        // this._errorHandlers.push(handler);
        this.hookUp(hooks.exception, handler);
    }

    // static _global_serial: number = 0;
    // private _controller_serial: number = 0;
    registerApis<T extends IConnector<C>>(connector: T): T {
        for (const op of this.options.apiInterface.operations) {
            let { api, connector: regConnector } = this._registerHandlers.length ?
                this._registerHandlers.reduce((a, b) => b(a.api, a.connector), { api: op, connector }) :
                { api: op, connector };
            regConnector.registerApi(this.basePath, api.path, api.method, async (conn: C): Promise<IResult> => {
                let { send, ...connection } = conn;
                let ctx: IContext = {
                    // TODO: move this future to plugin
                    // serial: ++ApiRouter._global_serial,
                    // counter: ++this._controller_serial,
                    // createOn: new Date().getTime(),
                    apiInterface: this.options.apiInterface,
                    // openapiName: this.options.apiInterface.openapiName,
                    // controllerName: this.options.apiInterface.controllerName,
                    controller: this.options.controller,
                    basePath: this.basePath,
                    api,
                    parameters: undefined,// this.toParameters(request, api.operation.parameters as OpenAPIV3.ParameterObject[]),
                    code: undefined,
                    result: undefined,
                    error: undefined,
                    responded: false,
                    connector: regConnector
                };
                (connection as C).send = (result: IResult) => {
                    if (!ctx.responded) {
                        ctx.responded = true;
                        send({
                            code: result.code,
                            contentType: result.contentType,
                            result: result.result !== undefined ? result.result : result.message
                        });
                    }
                };
                ctx.connection = connection as C;
                try {
                    for (const setContext of this.setContextHandlers) {
                        setContext instanceof Function && setContext(ctx);
                    }
                    await this._hooking(hooks.starting, ctx);

                    if (api.operation.security && api.operation.security.length && this.security) {
                        let securityCheck = await this.security.check(this.options.apiInterface.security, api.operation, ctx);
                        if (securityCheck !== true)
                            throw new SecurityError();
                    }

                    let { body, ...parameters } = await this.parseParameters(<OpenAPIV3.ParameterObject[]>api.operation.parameters, ctx);
                    ctx.parameters = parameters;
                    ctx.body = connection.body;

                    await this._hooking(hooks.routing, ctx);
                    let result: IResult = this.options.controller[api.operation.operationId] && await this.options.controller[api.operation.operationId](ctx.parameters, ctx.body, ctx);
                    if (result) {
                        ctx.responded = !!result.responded;
                        ctx.code = typeof result.code === 'string' && this.options.statusMap[result.code] || typeof +result.code === 'number' && +result.code || this.options.statusMap['default'] || 200;
                        ctx.contentType = result.contentType;
                        ctx.result = result.result !== undefined ? result.result : result.message;
                    }
                    await this._hooking(hooks.resulted, ctx);
                } catch (error) {
                    ctx.error = error;
                    ctx.code = typeof error.code === 'string' && this.options.statusMap[error.code] || typeof +error.code === 'number' && +error.code || this.options.statusMap['default'] || 500;
                    ctx.result = typeof error === 'string' ? error : (error && error.message || 'ApiRouter process error.');
                }
                try {
                    if (ctx.error) {
                        if (ctx.error['type'] === 'SecurityError')
                            await this._hooking(hooks.unauthorized, ctx, ctx.error).catch(err => console.error(err));
                        // else
                        await this._hooking(hooks.exception, ctx, ctx.error).catch(err => console.error(err));
                    }
                    await this._hooking(hooks.responding, ctx).catch(err => console.error(err));
                } catch (error) {
                    ctx.error = error;
                    ctx.code = typeof error.code === 'string' && this.options.statusMap[error.code] || typeof +error.code === 'number' && +error.code || this.options.statusMap['default'] || 500;
                    ctx.result = typeof error === 'string' ? error : (error && error.message || 'ApiRouter process error.#2');
                }
                return {
                    responded: ctx.responded,
                    code: ctx.code,
                    contentType: ctx.contentType,
                    result: ctx.result
                };
            });
        }
        return connector;
    }
}

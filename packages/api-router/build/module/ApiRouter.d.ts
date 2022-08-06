/// <reference types="node" />
import { OpenAPIV3 } from 'openapi-types';
import { OperationObject } from '../define/OperationObject';
import { IConnector, IConnection, IResult, TData } from './IConnector';
import { ApiSecurity, ISecurityController, errorMessage } from './ApiSecurity';
export interface IApiError<code = 500, message = 'Internal Server Error'> {
    code: code;
    message?: message | string;
    type?: string;
}
export declare class ApiError<code = 500, message = string> extends Error implements IApiError<code, message> {
    type: string;
    constructor(code: code, message?: message, type?: string);
    code: code;
}
export declare class ApiResult implements IResult<number | any, string | any, TData | any> {
    result?: TData;
    code: number | any;
    constructor(result?: TData, code?: number | any);
}
export declare enum Methods {
    get = "get",
    head = "head",
    post = "post",
    delete = "delete",
    trace = "trace",
    options = "options",
    connect = "connect",
    patch = "patch"
}
export interface ISecuritySchemes {
    [key: string]: OpenAPIV3.SecuritySchemeObject;
}
export interface IApi {
    path: string;
    method: Methods;
    operation: OperationObject;
}
export interface IContext<C extends IConnection = IConnection> {
    apiInterface: IApiInterface;
    controller: IApiController | Object;
    basePath?: string;
    api: IApi;
    expressPath?: string;
    parameters?: IParsedParameters;
    body?: TRequestBody;
    code?: number;
    contentType?: string;
    result?: string | Object | Array<any> | Buffer;
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
    parsers?: {
        type: string;
        format: string;
        parser: IParser;
    }[];
    plugins?: IRouterRegister[];
    statusMap?: {
        [key: string]: number;
    };
}
export interface IControllerOptions {
    apiRouter: ApiRouter;
}
export interface IApiController {
    [operationId: string]: {
        (parameters: any, body: any, context: IContext<IConnection>): Promise<IResult<number, string, any>>;
    };
}
export interface IApiRouterAccess<C extends IConnection> {
    registerApis(connector: IConnector<C>): IConnector<C>;
}
export interface IParsedParameters {
    [requestIn: string]: {
        [parameter: string]: string | number | boolean | Object | Array<string | number | boolean>;
    };
}
export declare type TRequestBody = any;
export declare enum hooks {
    starting = "starting",
    routing = "routing",
    resulted = "resulted",
    unauthorized = "unauthorized",
    exception = "exception",
    responding = "responding"
}
export interface IHandler {
    (context: IContext, error?: IApiError | errorMessage | Error): Promise<void>;
}
export interface IRouterRegister {
    apiRouterRegister?: {
        (apiRouter: ApiRouter): void;
    };
}
export interface IParser {
    (value: string, parameter: OpenAPIV3.ParameterObject, context: IContext): Promise<any>;
}
export declare class ApiRouter<C extends IConnection = IConnection> implements IApiRouterAccess<C> {
    private options;
    private basePath;
    private security;
    constructor(options: IApiRouterOptions);
    private setContextHandlers;
    setContext(requestStarting: {
        (context: IContext): void;
    }): void;
    setParser(type: string, format: string, parser: IParser): void;
    setParser(parsers: {
        type: string;
        format: string;
        parser: IParser;
    }[]): void;
    private _registerHandlers;
    setOperation(apiRegistering: {
        (api: IApi, connector: IConnector<C>): {
            api: IApi;
            connector: IConnector<C>;
        };
    }): void;
    setStatusCode(statusName: 'default' | string, code: number): void;
    setPlugin(plugin: IRouterRegister): void;
    private _parsers;
    private toParse;
    private parseParameters;
    private _hookHdls;
    hookUp(hook: hooks, handler: IHandler, pushTo?: 'last' | 'first'): void;
    private _hooking;
    preRouting(handler: IHandler, toFirst?: boolean): void;
    postRouted(handler: IHandler, toLast?: boolean): void;
    onError(handler: IHandler): void;
    registerApis<T extends IConnector<C>>(connector: T): T;
}
//# sourceMappingURL=ApiRouter.d.ts.map
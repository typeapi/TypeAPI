import { OpenAPIV3 } from 'openapi-types';
import { IContext, ISecuritySchemes } from './ApiRouter';
import { IParameters } from './IConnector';
export declare class SecurityError extends Error {
    constructor(codeOrMessage?: number | string, message?: string);
    code: number;
    type: string;
}
export interface ISecurityController {
    [actionName: string]: Function;
}
export interface ISecurityOptions {
    controller: ISecurityController | Object;
}
export declare type errorMessage = string;
export interface IApiKeyParameters {
    apiKey: string;
}
export interface IHttpBasicParameters {
    userId: string;
    password: string;
}
export interface IHttpBearerParameters {
    token: string;
    format: string;
}
export interface IHttpParameters {
    schema: string;
    requirement: string[] | any;
}
export interface IOauth2Flows {
    implicit?: {
        authorizationUrl: string;
        refreshUrl?: string;
        scopes: {
            [scope: string]: string;
        };
    };
    password?: {
        tokenUrl: string;
        refreshUrl?: string;
        scopes: {
            [scope: string]: string;
        };
    };
    clientCredentials?: {
        tokenUrl: string;
        refreshUrl?: string;
        scopes: {
            [scope: string]: string;
        };
    };
    authorizationCode?: {
        authorizationUrl: string;
        tokenUrl: string;
        refreshUrl?: string;
        scopes: {
            [scope: string]: string;
        };
    };
}
export interface IOauth2Parameters {
    flows: IOauth2Flows;
    scopes: string[];
}
export interface IOpenIdConnectParameters {
    openIdConnectUrl: string;
    scopes: string[];
}
export interface ISecurityParameters {
    schema: OpenAPIV3.SecuritySchemeObject;
    requirement: string[] | any;
    parameters: IParameters;
}
export interface ISecurityAction<T = ISecurityParameters> {
    (parameters: T, ctx: IContext): Promise<boolean | errorMessage | SecurityError>;
}
export declare class ApiSecurity {
    private options;
    constructor(options: ISecurityOptions);
    type: string;
    private result;
    check(securitySchemes: ISecuritySchemes, operation: OpenAPIV3.OperationObject, ctx: IContext): Promise<boolean>;
}
//# sourceMappingURL=ApiSecurity.d.ts.map
import { OpenAPIV3 } from 'openapi-types';
import { IContext, IApiError, ISecuritySchemes } from './ApiRouter';
import { IParameters } from './IConnector';
export class SecurityError extends Error {
    constructor(codeOrMessage?: number | string, message?: string) {
        super(`${(typeof codeOrMessage === 'string' ? codeOrMessage : message) || ''}` || 'Security Error.')
        this.code = typeof codeOrMessage === 'number' ? codeOrMessage : 401 as any;
    }
    public code: number = 401;
    public type: string = 'SecurityError';
}
export interface ISecurityController {
    [actionName: string]: Function
}
export interface ISecurityOptions {
    controller: ISecurityController | Object
}
export type errorMessage = string;
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
};
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

export class ApiSecurity {
    constructor(private options: ISecurityOptions) {
    }
    public type = 'ApiSecurity';
    private result(actionResult: boolean | errorMessage | SecurityError): boolean {
        if (typeof actionResult === 'boolean')
            return actionResult;
        if (typeof actionResult === 'string')
            throw new SecurityError(actionResult);
        if (!actionResult)
            throw new SecurityError();
        actionResult.type = 'SecurityError';
        throw actionResult;
    }
    async check(securitySchemes: ISecuritySchemes, operation: OpenAPIV3.OperationObject, ctx: IContext): Promise<boolean> {
        if (!this.options.controller)
            throw new SecurityError('operation secuity define but no options.security controller.');
        let pass = true;
        for (const securityGroup of operation.security) {
            for (const securityName of Object.keys(securityGroup)) {
                if (!this.options.controller[securityName])
                    throw new SecurityError(`options.security controller without security function ${securityName}.`);
                let securityScheme = securitySchemes && securitySchemes[securityName];
                if (!securityScheme)
                    throw new SecurityError(`component securitySchemes without ${securityName} define.`);
                let lowerType = (<string>securityScheme.type).toLowerCase();
                switch (lowerType) {
                    case 'apikey': // apiKey
                        let lowerKeyName = securityScheme['name'].toLowerCase();
                        let theApiKey = ctx.connection.parameters[securityScheme['in']] && ctx.connection.parameters[securityScheme['in']][lowerKeyName];
                        let apiKeyCheck = await (<ISecurityAction<IApiKeyParameters>>this.options.controller[securityName])({ apiKey: theApiKey }, ctx);
                        pass = pass && this.result(apiKeyCheck);
                        break;
                    case 'http':
                        let lowerSchema = (<string>securityScheme['scheme']).toLowerCase();
                        switch (lowerSchema) {
                            // https://www.iana.org/assignments/http-authschemes/http-authschemes.xhtml
                            case 'basic': // Basic
                                let basicCode = (ctx.connection.parameters.header['Authorization'] as string || '').replace('Basic', '').trim();
                                // "ascii" | "utf8" | "utf16le" | "ucs2" | "base64" | "latin1" | "binary" | "hex"
                                let [userId, password] = new Buffer(basicCode, 'base64').toString('utf8').split(':');
                                pass = pass && this.result(await (<ISecurityAction<IHttpBasicParameters>>this.options.controller[securityName])({ userId, password }, ctx));
                                break;
                            case 'bearer': // Bearer
                                let token = (ctx.connection.parameters.header['Authorization'] as string || '').replace('Bearer', '').trim();
                                pass = pass && this.result(await (<ISecurityAction<IHttpBearerParameters>>this.options.controller[securityName])({ token, format: securityScheme['bearerFormat'] }, ctx));
                                break;
                            case 'digest': // Digest
                            case 'hoba': // HOBA
                            case 'mutual': // Mutual
                            case 'negotiate': // Negotiate
                            case 'oauth': // OAuth
                            case 'scram-sha-1': // SCRAM-SHA-1
                            case 'scram-sha-256': // SCRAM-SHA-256
                            case 'vapid':
                            default:
                                pass = pass && this.result(await (<ISecurityAction<IHttpParameters>>this.options.controller[securityName])({ schema: securityScheme['scheme'], requirement: securityGroup[securityName] }, ctx));
                                break;
                        }
                        break;
                    case 'oauth2':
                        pass = pass && this.result(await (<ISecurityAction<IOauth2Parameters>>this.options.controller[securityName])(
                            { flows: securityScheme['flows'], scopes: securityGroup[securityName] },
                            ctx));
                        break;
                    case 'openidconnect': // openIdConnect
                        pass = pass && this.result(await (<ISecurityAction<IOpenIdConnectParameters>>this.options.controller[securityName])(
                            { openIdConnectUrl: securityScheme['openIdConnectUrl'], scopes: securityGroup[securityName] },
                            ctx));
                        break;
                    default:
                        pass = pass && this.result(await (<ISecurityAction<ISecurityParameters>>this.options.controller[securityName])(
                            { schema: securityScheme, requirement: securityGroup[securityName], parameters: ctx.connection.parameters },
                            ctx));
                        break;
                }
            }
            if (pass)
                break;
        }
        return pass;
    }
}

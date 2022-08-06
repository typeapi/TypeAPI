import { IContext as ICtx, errorMessage, SecurityError, IApiKeyParameters, IOauth2Parameters } from '@typeapi/api-router';
import { IConnection } from '@typeapi/api-router';
import { ISecurity } from './interface/isecurity';
export interface IContext<T extends IConnection = IConnection> extends ICtx<T> {
}
export interface IOptions {
}
export declare class Security implements ISecurity {
    private options?;
    constructor(options?: IOptions);
    /**
     * petstore_auth
     * @type oauth2
     */
    petstore_auth({ flows, scopes }: IOauth2Parameters, context: IContext): Promise<boolean | errorMessage | SecurityError>;
    /**
     * api_key
     * @type apiKey
     */
    api_key({ apiKey }: IApiKeyParameters, context: IContext): Promise<boolean | errorMessage | SecurityError>;
}

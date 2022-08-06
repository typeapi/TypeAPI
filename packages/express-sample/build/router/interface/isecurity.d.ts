import { IContext, errorMessage, SecurityError, IApiKeyParameters, IOauth2Parameters } from '@typeapi/api-router';
export interface ISecurity {
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
//# sourceMappingURL=isecurity.d.ts.map
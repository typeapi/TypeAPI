import {
  IContext as ICtx,
  errorMessage, SecurityError,
  ISecurityAction, IApiKeyParameters, IHttpBasicParameters, IHttpBearerParameters, IHttpParameters, IOauth2Parameters, IOpenIdConnectParameters, ISecurityParameters
} from '@typeapi/api-router';
import { IConnection } from '@typeapi/api-router';
// if you want use connector specific object in context.connector, import IConnection from connector module. ex:
// import { IConnection } from '@typeapi/express-connector';

import { ISecurity } from './interface/isecurity';

export interface IContext<T extends IConnection = IConnection> extends ICtx<T> {
  // extend context type, like parsed user from other action. ex:
  // user?: { name: string, age?: number }
}

export interface IOptions {
  // define service object type which passed in options from register. ex:
  // dbConn: db;
}

export class Security implements ISecurity {
  constructor(private options?: IOptions) {
  }
  /**
   * petstore_auth
   * @type oauth2
   */
  async petstore_auth({ flows, scopes }: IOauth2Parameters, context: IContext): Promise<boolean | errorMessage | SecurityError>{
    return 'Security not implements.';
  }
  /**
   * api_key
   * @type apiKey
   */
  async api_key({ apiKey }: IApiKeyParameters, context: IContext): Promise<boolean | errorMessage | SecurityError>{
    return 'Security not implements.';
  }
}
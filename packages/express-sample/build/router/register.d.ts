import { ApiRouter, IConnector } from '@typeapi/api-router';
import * as controller from './controller';
import { IOptions as ISecurityOptions } from './security';
export declare const Controllers: {
    controller: typeof controller;
};
export declare type ControllersOptions = ISecurityOptions & controller.IOptions;
export declare function register<T extends IConnector>(connector: T, controllerOptions?: ControllersOptions, routerRegister?: {
    (apiRouter: ApiRouter): void;
}): T;
export declare function register<T extends IConnector>(connector: T, routerRegister?: {
    (apiRouter: ApiRouter): void;
}): T;
export default register;
//# sourceMappingURL=register.d.ts.map
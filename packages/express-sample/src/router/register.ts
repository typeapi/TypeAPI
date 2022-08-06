import { ApiRouter, ApiSecurity, IConnector } from '@typeapi/api-router';
import * as controller from './controller';
import { Security, IOptions as ISecurityOptions } from './security';
import { plugins } from './plugins';
export const Controllers = { controller };
export type ControllersOptions = ISecurityOptions & controller.IOptions;
export function register<T extends IConnector>(connector: T, controllerOptions?: ControllersOptions, routerRegister?: { (apiRouter: ApiRouter): void }): T;
export function register<T extends IConnector>(connector: T, routerRegister?: { (apiRouter: ApiRouter): void }): T;
export function register<T extends IConnector>(connector: T, optionsOrRegisters?: ControllersOptions | { (apiRouter: ApiRouter): void }, routerRegister?: { (apiRouter: ApiRouter): void }): T {
    let controllerOptions: ControllersOptions = {} as ControllersOptions;
    if (optionsOrRegisters instanceof Function)
        routerRegister = optionsOrRegisters;
    else if (typeof optionsOrRegisters === 'object' && optionsOrRegisters !== null)
        controllerOptions = optionsOrRegisters;
    let security = new ApiSecurity({ controller: new Security(controllerOptions) });
    Object.keys(Controllers).forEach(ctrlName => {
        let Ctrl = Controllers[ctrlName];
        let controller = new Ctrl.Controller(controllerOptions);
        let apiRouter = new ApiRouter({ apiInterface: Ctrl.apiInterface, controller, security, plugins });
        routerRegister && routerRegister(apiRouter);
        apiRouter.registerApis(connector);
    });
    return connector;
}

export default register;

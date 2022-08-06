import { ApiRouter, IRouterRegister, IHandler, IContext as ICtx, IApiError, errorMessage, hooks, ApiError } from '@typeapi/api-router';
import * as Ajv from 'ajv';

export interface IOptions {
    parametersValidable: boolean | { (context: IContext): boolean };
    ajvOptions?: Ajv.Options;
}
export interface IContext {
    parametersValidErrors?: Array<Ajv.ErrorObject>;
    schemaValidator: { (schema: object | string, data: any): boolean };
}
export class Plugin implements IRouterRegister {
    constructor(private options: IOptions = { parametersValidable: true }) {
        if (typeof options.parametersValidable !== 'boolean' && typeof options.parametersValidable !== 'function')
            options.parametersValidable = true;
        this.ajv = new Ajv(options.ajvOptions);
    }
    apiRouterRegister(apiRouter: ApiRouter): void {
        apiRouter.setContext((ctx) => ctx['schemaValidator'] = (schema: object | string, data: any) => this.validator(schema, data));
        apiRouter.hookUp(hooks.routing, ctx => this.parametersValid(<any>ctx), 'last');
    }
    validator(schema: object | string, data: any): boolean {
        try {
            let result = this.ajv.validate(schema, data);
            return typeof result === 'boolean' ? result : false;
        } catch (error) {
            return false;
        }
    }
    private ajv: Ajv.Ajv;
    static validators: { [key: string]: Function } = {};
    async parametersValid(context: ICtx & IContext): Promise<void> {
        if ((typeof this.options.parametersValidable === 'function' && !this.options.parametersValidable(context)) || !this.options.parametersValidable)
            return;
        let validName = context.api.operation['x-typeapi-parameters-type'];
        let validSchema = context.api.operation['x-typeapi-parameters-schema'];
        let validKey = `${context.apiInterface.openapiName}-${context.apiInterface.controllerName}-${validName}`;
        if (context.api.operation.parameters || !validName || !validSchema)
            return;
        try {
            Plugin.validators[validKey] = Plugin.validators[validKey] || this.ajv.compile(validSchema);
        } catch (error) {
            throw new ApiError(400, `PluginJsonSchemaValid: ${validKey} parameters schema compile error.`, 'ValidError');
        }
        let valid = Plugin.validators[validKey](context.parameters);
        if (!valid) {
            let error = new ApiError(400, 'Request parameters valid fail.', 'ValidError');
            context.parametersValidErrors = error['validErrors'] = Plugin.validators[validName]['errors'];
            throw error;
        }
        return;
    }
}

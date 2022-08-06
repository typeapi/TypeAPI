import { ApiRouter, IRouterRegister, IContext as ICtx } from '@typeapi/api-router';
import * as Ajv from 'ajv';
export interface IOptions {
    parametersValidable: boolean | {
        (context: IContext): boolean;
    };
    ajvOptions?: Ajv.Options;
}
export interface IContext {
    parametersValidErrors?: Array<Ajv.ErrorObject>;
    schemaValidator: {
        (schema: object | string, data: any): boolean;
    };
}
export declare class Plugin implements IRouterRegister {
    private options;
    constructor(options?: IOptions);
    apiRouterRegister(apiRouter: ApiRouter): void;
    validator(schema: object | string, data: any): boolean;
    private ajv;
    static validators: {
        [key: string]: Function;
    };
    parametersValid(context: ICtx & IContext): Promise<void>;
}
//# sourceMappingURL=plugin.d.ts.map
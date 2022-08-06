import { ApiRouter, IRouterRegister, IContext as ICtx, IApiError, errorMessage } from '@typeapi/api-router';
export interface IOptions {
    timezone: string;
}
export interface IContext {
    timestamps: {
        [parameterName: string]: number;
    };
}
export declare class Plugin implements IRouterRegister {
    private options;
    constructor(options: IOptions);
    apiRouterRegister(apiRouter: ApiRouter): void;
    handler(context: ICtx & IContext, error?: IApiError | errorMessage | Error): Promise<void>;
}

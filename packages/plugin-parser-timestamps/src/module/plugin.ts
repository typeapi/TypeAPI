import { ApiRouter, IRouterRegister, IHandler, IContext as ICtx, IApiError, errorMessage, hooks } from '@typeapi/api-router';
import * as moment from 'moment-timezone';

export interface IOptions {
  timezone: string;
}
export interface IContext {
  timestamps: { [parameterName: string]: number };
}
export class Plugin implements IRouterRegister {
  constructor(private options: IOptions) {
  }
  apiRouterRegister(apiRouter: ApiRouter): void {
    apiRouter.hookUp(hooks.routing, (c, e) => this.handler(<any>c, e));
    // apiRouter.preRouting((c, e) => this.handler(<any>c, e));
  }
  async handler(context: ICtx & IContext, error?: IApiError | errorMessage | Error): Promise<void> {
    context.timestamps = context.timestamps || {};
    let dateParameters = (context.api.operation.parameters || []).filter(v =>
      context.connection.parameters &&
      context.connection.parameters[v.in] &&
      context.connection.parameters[v.in][v.name] &&
      v.schema['type'] === 'string' &&
      (v.schema['format'] === 'date-time' || v.schema['format'] === 'date')
    );
    let symbols: { [name: string]: Symbol } = {};
    for (const par of dateParameters) {
      //x-typeapi-parameter-name
      // context.timestamps[par['x-typeapi-parameter-name'] || par.name] = moment(context.connection.parameters[par.in][par.name]).tz(this.options.timezone).valueOf();
      let key = par['x-typeapi-parameter-name'] || par.name;
      if (!key || typeof key !== 'string') continue;
      let sym = symbols[key] || (symbols[key] = Symbol());
      Object.defineProperty(context.timestamps, key, {
        get: (): number => {
          if (context.timestamps[<any>sym] === undefined)
            context.timestamps[<any>sym] = moment(context.connection.parameters[par.in][par.name]).tz(this.options.timezone).valueOf();
          return context.timestamps[<any>sym];
        },
        writable: false
        // set: function (timestamp: number): void {
        // }
      });
    }
    return;
  }
}  
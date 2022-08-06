/// <reference types="node" />
import { Stream } from 'stream';
export declare type TData = string | Object | Array<any> | Buffer | Stream;
export interface IResult<code = 200 | number, message = string, result = string | Object | Array<any> | Buffer | Stream> {
    responded?: boolean;
    code: code;
    contentType?: string;
    result?: result;
    message?: message | string;
}
export interface IParameters {
    path?: {
        [name: string]: string;
    };
    query?: {
        [name: string]: string;
    };
    header?: {
        [name: string]: string | string[];
    };
    cookie?: {
        [name: string]: string;
    };
}
export interface IConnection {
    parameters: IParameters;
    body: any;
    send: (result: IResult) => void;
    [reqRepNext: string]: any;
}
export interface IConnector<T extends IConnection = IConnection> {
    registerApi(basePath: string, apiPath: string, method: string, processer: {
        (connection: T): Promise<IResult>;
    }): void;
}
//# sourceMappingURL=IConnector.d.ts.map
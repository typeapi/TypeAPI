import { OpenAPIV3 } from 'openapi-types';
export interface IOptions {
    openapi: OpenAPIV3.Document;
    controllerProperty?: string | {
        (model: OpenAPIV3.PathObject | OpenAPIV3.PathItemObject | OpenAPIV3.OperationObject): string;
    };
}
export declare class Builder {
    private options;
    private parser;
    constructor(options: IOptions);
    definitions(): Promise<string>;
    private _interfaceModel;
    private interfaceModel;
    isecurity(): Promise<string>;
    security(): Promise<string>;
    plugins(): Promise<string>;
    register(): Promise<string>;
    interfaces(): Promise<{
        name: string;
        code: string;
    }[]>;
    controllers(): Promise<{
        name: string;
        code: string;
    }[]>;
    app(server: 'express'): Promise<string>;
}

import { OpenAPIV3 } from 'openapi-types';
import { IInterfaceModel } from '../model/interface.model';
import { IDefinitions } from '../model/definitions.model';
import { ISecurityModel } from '../model/security.model';
export interface ParserOptions {
    openapi: OpenAPIV3.Document;
    controllerProperty?: string | {
        (model: OpenAPIV3.PathObject | OpenAPIV3.PathItemObject | OpenAPIV3.OperationObject): string;
    };
}
export declare class Parser {
    private options;
    constructor(options: ParserOptions);
    private _openapi3;
    /**
     * Transform swagger to openapi 3
     */
    private openapi3;
    private _mark;
    schemas: {
        [operation: string]: string;
    };
    parameters: {
        [operation: string]: {
            [local: string]: string;
        };
    };
    /**
     * get marked openapi
     */
    markedOpenapi(): Promise<OpenAPIV3.Document>;
    private toCamelCase;
    toSecurityModel(): Promise<ISecurityModel>;
    private toConrollerName;
    toInterfaceModel(): Promise<IInterfaceModel[]>;
    private refToTypeName;
    private _definitions;
    /**
     * Transform openapi3 to definitions.
     * @returns TypeScript .d.ts file content
     */
    toDefinitions(): Promise<IDefinitions>;
    private _bundle;
    /**
     * Deref local $ref(s)
     */
    private bundle;
    private _derefs;
    /**
     * Get dedefs openapi with marks
     * @returns processed openapi spec with x-typeapi-* marks
     */
    derefsOpenapi(schema?: OpenAPIV3.Document): Promise<OpenAPIV3.Document>;
    /**
     * Converting an object to a string
     * https://stackoverflow.com/questions/5612787/converting-an-object-to-a-string
     * http://jsfiddle.net/numoccpk/1/
     */
    convertToText(obj: any): string;
}

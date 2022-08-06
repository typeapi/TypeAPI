import { OpenAPIV3 } from 'openapi-types';
export interface IDefinitions {
    definitions: string;
    schemas?: { [operation: string]: string };
    parameters?: { [operation: string]: { [local: string]: string } };
    // openapi?: OpenAPIV3.Document;
}
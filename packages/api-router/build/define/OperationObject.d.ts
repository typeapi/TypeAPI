import { OpenAPIV3 } from 'openapi-types';
export interface OperationObject {
    tags?: string[];
    summary?: string;
    description?: string;
    externalDocs?: OpenAPIV3.ExternalDocumentationObject;
    operationId?: string;
    parameters?: Array<OpenAPIV3.ParameterObject>;
    requestBody?: OpenAPIV3.RequestBodyObject;
    responses?: OpenAPIV3.ResponsesObject;
    callbacks?: {
        [callback: string]: OpenAPIV3.CallbackObject;
    };
    deprecated?: boolean;
    security?: OpenAPIV3.SecurityRequirementObject[];
    servers?: OpenAPIV3.ServerObject[];
}
//# sourceMappingURL=OperationObject.d.ts.map
import * as Router from '@typeapi/api-router';
export interface IInterfaceModel {
    openapiName: string;
    controllerName: string;
    serverUrl: string;
    operations: Router.IApi[];
    security?: Router.ISecuritySchemes;
}

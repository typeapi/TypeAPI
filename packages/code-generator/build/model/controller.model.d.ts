export interface ControllerModel {
    controller: string;
    operations: OperationModel[];
}
export interface OperationModel {
    operationId: string;
    parameters: ParameterModel[];
    parametersType: string;
    bodyType: string;
    responses: ResponseModel[];
}
export interface ParameterModel {
    location: string;
    name: string;
    rename: string;
}
export interface ResponseModel {
    code: number | 'default';
    message: string;
    resultType: string;
}

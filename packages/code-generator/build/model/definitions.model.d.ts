export interface IDefinitions {
    definitions: string;
    schemas?: {
        [operation: string]: string;
    };
    parameters?: {
        [operation: string]: {
            [local: string]: string;
        };
    };
}

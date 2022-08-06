import * as ejs from 'ejs';
export interface IOptions {
    template?: string;
    ejsOptions?: ejs.Options;
}
export declare class Builder {
    private options;
    constructor(options: IOptions);
    static _ejsOptions: ejs.Options;
    static _extendsOptions(options?: ejs.Options): ejs.Options;
    static ToJs(template: string, ejsOptions?: ejs.Options): Promise<string>;
    toJs(template?: string, options?: ejs.Options): Promise<string>;
    static ToTs(template: string, ejsOptions?: ejs.Options): Promise<string>;
    toTs(template?: string, options?: ejs.Options): Promise<string>;
}

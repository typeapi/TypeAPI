import { OpenAPIV3 } from 'openapi-types';
import { Parser } from './Parser';

import { IInterfaceModel } from '../model/interface.model';

import interfaceRender from '../render/interface';
import controllerRender from '../render/controller';
import registerRender from '../render/register';
import definitionsRender from '../render/definitions';
import isecurityRender from '../render/isecurity';
import securityRender from '../render/security';
import pluginsRender from '../render/plugins';
import appRender from '../render/app';

export interface IOptions {
    openapi: OpenAPIV3.Document;
    controllerProperty?: string | { (model: OpenAPIV3.PathObject | OpenAPIV3.PathItemObject | OpenAPIV3.OperationObject): string };
}
export class Builder {
    private parser: Parser;
    constructor(private options: IOptions) {
        this.parser = new Parser(options);
    }

    async definitions(): Promise<string> {
        return definitionsRender(await this.parser.toDefinitions());
    }
    private _interfaceModel: IInterfaceModel[];
    private async interfaceModel(): Promise<IInterfaceModel[]> {
        if (!this._interfaceModel) {
            this._interfaceModel = await this.parser.toInterfaceModel();
        }
        return this._interfaceModel;
    }
    async isecurity(): Promise<string> {
        return isecurityRender((await this.interfaceModel())[0].security || {});
    }
    async security(): Promise<string> {
        return securityRender((await this.interfaceModel())[0].security || {});
    }

    async plugins(): Promise<string> {
        return pluginsRender({});
    }

    async register(): Promise<string> {
        let controllerNames = (await this.interfaceModel()).map(v => v.controllerName === '' || v.controllerName === '__default__' ? 'controller' : v.controllerName);
        let fileNames = controllerNames.map(v => v === 'controller' ? '' : `${v}.`);
        return registerRender({ controllerNames, fileNames });
    }

    async interfaces(): Promise<{ name: string, code: string }[]> {
        let models = await this.interfaceModel();
        let codes: { name: string, code: string }[] = [];
        for (const model of models) {
            codes.push({ name: model.controllerName, code: await interfaceRender(model) });
        }
        return codes;
    }

    async controllers(): Promise<{ name: string, code: string }[]> {
        let models = await this.interfaceModel();
        let codes: { name: string, code: string }[] = [];
        for (const model of models) {
            model['prefixAsync'] = true;
            codes.push({ name: model.controllerName, code: await controllerRender(model) });
        }
        return codes;
    }

    async app(server: 'express'): Promise<string> {
        return appRender({ server });
    }
}
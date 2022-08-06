import { OpenAPIV3 } from 'openapi-types';
import * as converter from 'swagger2openapi';
import * as $RefParaser from 'json-schema-ref-parser';
// var deref = require('json-schema-deref');
import { compile } from 'json-schema-to-typescript';
import dtsGenerator from 'dtsgenerator';
import { convertParametersToJSONSchema } from 'openapi-jsonschema-parameters';

import { Methods } from '@typeapi/api-router';

import { IInterfaceModel } from '../model/interface.model';
import { IDefinitions } from '../model/definitions.model';
import { ISecurityModel } from '../model/security.model';
// import XDeferred, { IDeferred } from 'xdeferred';

export interface ParserOptions {
  // connector: string;
  openapi: OpenAPIV3.Document;
  controllerProperty?: string | { (model: OpenAPIV3.PathObject | OpenAPIV3.PathItemObject | OpenAPIV3.OperationObject): string };
}
export class Parser {
  constructor(private options: ParserOptions) {
    // console.log(options);
  }
  private _openapi3: OpenAPIV3.Document;
  /**
   * Transform swagger to openapi 3
   */
  private async openapi3(): Promise<OpenAPIV3.Document> {
    if (!this._openapi3) {
      // && !bundle.paths[path][method].deprecated
      this._openapi3 = (this.options.openapi['swagger'] || !this.options.openapi.openapi.startsWith('3')) ?
        (await converter.convertObj(this.options.openapi, { targetVersion: '3.0.2' })).openapi :
        this.options.openapi;
      // if (!paths || !Object.keys(paths).length)
      //   this._openapi3 = oas;
      // if (paths && Object.keys(paths).length) {
      //   let nodeprecatedPaths = {};
      //   for (const path of Object.keys(paths)) {
      //     if (paths[path])
      //       for (const method of paths[path]) {
      //         if (!paths[path][method].deprecated) {
      //           nodeprecatedPaths[path] = nodeprecatedPaths[path] || {};
      //           nodeprecatedPaths[path][method] = nodeprecatedPaths[path][method];
      //         }
      //       }
      //   }
      //   this._openapi3 = { ...oas, paths: nodeprecatedPaths };
      // }
    }
    return this._openapi3;
  }
  private _mark: OpenAPIV3.Document;
  // private apiName: string = 'openapi';
  schemas: { [operation: string]: string } = {};
  parameters: { [operation: string]: { [local: string]: string } } = {};
  /**
   * get marked openapi
   */
  async markedOpenapi(): Promise<OpenAPIV3.Document> {
    if (!this._mark) {
      let bundle = await this.bundle();
      let derefs = await this.derefsOpenapi(bundle) as OpenAPIV3.Document;
      // let derefs = await $RefParaser.dereference(JSON.parse(JSON.stringify(bundle))) as OpenAPIV3.Document;
      // console.log(JSON.stringify(derefs, null, 4));
      if (!bundle['x-typeapi-openapi'])
        bundle['x-typeapi-openapi'] = bundle.info && bundle.info.title && this.toCamelCase(bundle.info.title, true) || 'openapi';
      const methods = { get: true, post: true, put: true, delete: true, head: true, trace: true, options: true, connect: true, patch: true };
      const insDict = { path: 'Path', query: 'Query', header: 'Header', cookie: 'Cookie' };
      for (const path of Object.keys(bundle.paths)) {
        for (const method in bundle.paths[path]) {
          if (methods[method] && bundle.paths[path].hasOwnProperty(method)) {
            let operation: OpenAPIV3.OperationObject = bundle.paths[path][method];
            let operationNamespace = this.toCamelCase(operation.operationId || `${path} ${method}`, true);
            if (!operation.operationId)
              operation.operationId = this.toCamelCase(`${path} ${method}`);
            operation['x-typeapi-operation-namespace'] = operationNamespace;
            if (operation.parameters && operation.parameters.length) {
              let parameters = <OpenAPIV3.ParameterObject[]>operation.parameters;
              let ins = parameters.map(v => v.in).filter((v, i, a) => a.indexOf(v) === i);
              operation['x-typeapi-parameters-type'] = ['Parameters', operationNamespace].join('.');

              // this.parameters[operationNamespace] = {};
              // ins.forEach(v => this.parameters[operationNamespace][v] = `Paths.${operationNamespace}.${insDict[v]}Parameters`);

              operation['x-typeapi-parameters-interface'] = ins.map(v => [v, `Paths.${operationNamespace}.${insDict[v]}Parameters`]);
              let doubleNames = ['body', 'context'].concat(parameters.map(v => v.name))
                .filter((v, i, a) => a.indexOf(v) !== i)
                .filter((v, i, a) => a.indexOf(v) === i);
              for (const p of parameters) {
                if (doubleNames.indexOf(p.name) >= 0)
                  p['x-typeapi-parameter-name'] = this.toCamelCase(`${p.in} ${p.name}`);
              }

              const parametersSchemas = convertParametersToJSONSchema(derefs.paths[path][method].parameters);
              operation['x-typeapi-parameters-schema'] = parametersSchemas;
            }
            if (operation.requestBody) {
              let req = <OpenAPIV3.RequestBodyObject>operation.requestBody;
              if (req['$ref']) {
                req['x-typeapi-request-body'] = ['Components', 'RequestBodies', req['$ref'].split('/').reverse()[0]].join('.');
              } else if (req.content) {
                let firstKey = Object.keys(req.content)[0];
                let schema = req.content[firstKey].schema;
                if (schema['items'] && schema['items']['$ref']) {
                  req['x-typeapi-request-body'] = `${this.refToTypeName(schema['items']['$ref'])}[]`;
                } else if (schema['$ref']) {
                  req['x-typeapi-request-body'] = ['Components', 'Schemas', schema['$ref'].split('/').reverse()[0]].join('.');
                } else {
                  // schema is local schema define
                  req['x-typeapi-request-body'] = ['Schemas', `${operationNamespace}RequestBody`].join('.');

                  // this.schemas[`${operationNamespace}RequestBody`] = await compile(schema, `${operationNamespace}RequestBody`, { bannerComment: '' });
                  // this.schemas.push([
                  //   operationNamespace,
                  //   'RequestBody',
                  //   await compile(schema, `${operationNamespace}RequestBody`, { bannerComment: '' })
                  // ]);
                }
              }
            }
            if (operation.responses) {
              for (const status of Object.keys(operation.responses).filter(v => !isNaN(+v) || v === 'default')) {
                let resp = operation.responses[status] as OpenAPIV3.ResponseObject;
                if (resp['$ref']) {
                  resp['x-typeapi-response'] = ['Components', 'Responses', resp['$ref'].split('/').reverse()[0]].join('.');
                } else if (resp.content) {
                  let firstKey = Object.keys(resp.content)[0];
                  let schema = resp.content[firstKey].schema;
                  if (schema['items'] && schema['items']['$ref']) {
                    resp['x-typeapi-response'] = `${this.refToTypeName(schema['items']['$ref'])}[]`;
                  } else if (schema['$ref']) {
                    resp['x-typeapi-response'] = ['Components', 'Schemas', schema['$ref'].split('/').reverse()[0]].join('.');
                  } else {
                    // schema is local schema define
                    let responseType = this.toCamelCase('Response ' + status, true);
                    resp['x-typeapi-response'] = ['Schemas', `${operationNamespace}${responseType}`].join('.');

                    // this.schemas[`${operationNamespace}${responseType}`] = await compile(schema, `${operationNamespace}${responseType}`, { bannerComment: '' });
                    // this.schemas.push([
                    //   operationNamespace,
                    //   responseType,
                    //   await compile(schema, `${operationNamespace}${responseType}`, { bannerComment: '' })
                    // ]);
                  }
                }
              }
            }
          }
        }
      }
      this._mark = bundle;
    }
    return this._mark;
  }
  private toCamelCase(str: string, pascalCase: boolean = false): string {
    // str.replace(/[^A-Za-z0-9_]/g, ' ')
    return str.replace(/[^A-Za-z0-9]/g, ' ')
      .replace(/^\w|[A-Z]|\b\w|\s+/g, function (match, index) {
        if (/\s+/.test(match)) return '';
        return index === 0 && !pascalCase ? match.toLowerCase() : match.toUpperCase();
      });
  }
  // TODO: implements security functions
  async toSecurityModel(): Promise<ISecurityModel> {
    return await this.bundle() as any;
  }
  private toConrollerName(model: OpenAPIV3.PathObject | OpenAPIV3.PathItemObject | OpenAPIV3.OperationObject): string {
    if (!this.options.controllerProperty)
      return model['x-typeapi-controller'];
    if (typeof this.options.controllerProperty === 'function') {
      return this.options.controllerProperty(model);
    }
    if (typeof this.options.controllerProperty === 'string' && model[this.options.controllerProperty]) {
      if (Array.isArray(model[this.options.controllerProperty]))
        return model[this.options.controllerProperty][0];
      return `${model[this.options.controllerProperty]}`;
    }
    return '';
  }
  async toInterfaceModel(): Promise<IInterfaceModel[]> {
    const methods = { get: true, post: true, put: true, delete: true, head: true, trace: true, options: true, connect: true, patch: true };
    let marked = await this.markedOpenapi();
    let derefs = await this.derefsOpenapi();
    let controllers: { [ctrl: string]: IInterfaceModel } = {};
    let apiName = marked['x-typeapi-openapi'];
    let rootSecurity = derefs.security && derefs.security.length ? derefs.security : undefined;
    let pathsControllerName = this.toConrollerName(marked.paths);
    for (const path of Object.keys(marked.paths)) {
      let pathControllerName = this.toConrollerName(marked.paths[path]) || pathsControllerName; //marked.paths['x-typeapi-controller'] as string;
      for (const method in marked.paths[path]) {
        if (!methods[method])
          continue;
        let operation = marked.paths[path][method];
        let opControllerName = this.toConrollerName(operation) || pathControllerName || '__default__';
        let model = (controllers[opControllerName] = <any>controllers[opControllerName] || {
          controllerName: opControllerName,
          openapiName: apiName,
          serverUrl: marked.servers[0].url,
          // schemas: [],
          operations: [],
          security: derefs.components.securitySchemes
        });
        // let operationId = operation.operationId || operation['']
        let derefOperation: OpenAPIV3.OperationObject = derefs.paths[path][method];
        if (derefOperation.security === undefined || derefOperation.security === null)
          derefOperation.security = rootSecurity;
        if (!derefOperation.security || !derefOperation.security.length)
          derefOperation.security = undefined;
        model.operations.push({ path, method: <Methods>method, operation: derefOperation });
        // if (this.schemas.length)
        //   model.schemas = model.schemas.concat(this.schemas.filter(a => a[0] === operation['x-typeapi-operation-namespace']));
      }
    }
    return Object.keys(controllers).map(k => controllers[k]);
  }
  private refToTypeName(ref: string): string {
    let [latest, ...other] = ref.replace('#/', '').split('/').reverse();
    let nSpaces = other.reverse();
    nSpaces[0] = nSpaces[0].charAt(0).toUpperCase() + nSpaces[0].slice(1);
    nSpaces[1] = nSpaces[1].charAt(0).toUpperCase() + nSpaces[1].slice(1);
    return [...nSpaces, latest].join('.');
  }
  private _definitions: IDefinitions;
  /**
   * Transform openapi3 to definitions.
   * @returns TypeScript .d.ts file content
   */
  async toDefinitions(): Promise<IDefinitions> {
    if (!this._definitions) {
      this._definitions = { definitions: await dtsGenerator({ contents: [await this.markedOpenapi()] }) };
      let bundle = await this.bundle();
      let derefs = await this.derefsOpenapi();
      const methods = { get: true, post: true, put: true, delete: true, head: true, trace: true, options: true, connect: true, patch: true };
      const insDict = { path: 'Path', query: 'Query', header: 'Header', cookie: 'Cookie' };
      for (const path of Object.keys(bundle.paths)) {
        for (const method in bundle.paths[path]) {
          if (methods[method] && bundle.paths[path].hasOwnProperty(method)) {
            let operation: OpenAPIV3.OperationObject = bundle.paths[path][method];
            let derefOperation = derefs.paths[path][method];
            let operationNamespace = this.toCamelCase(operation.operationId || `${path} ${method}`, true);
            if (operation.parameters && operation.parameters.length) {
              let parameters = <OpenAPIV3.ParameterObject[]>operation.parameters;
              let ins = parameters.map(v => v.in).filter((v, i, a) => a.indexOf(v) === i);
              this._definitions.parameters = this._definitions.parameters || {};
              this._definitions.parameters[operationNamespace] = this._definitions.parameters[operationNamespace] || {};
              ins.forEach(v => this._definitions.parameters[operationNamespace][v] = `Paths.${operationNamespace}.${insDict[v]}Parameters`);
            }
            if (operation.requestBody) {
              let req = <OpenAPIV3.RequestBodyObject>operation.requestBody;
              let derefReq = derefOperation.requestBody;
              if (req.content) {
                let firstKey = Object.keys(req.content)[0];
                let schema = req.content[firstKey].schema;
                let derefSchema = derefReq.content[firstKey].schema;
                // this._definitions.schemas = this._definitions.schemas || {};
                // this._definitions.schemas[`${operationNamespace}RequestBody`] = `export type ${operationNamespace}RequestBody = Paths.${operationNamespace}.RequestBody;`;
                if (schema['items'] && schema['items']['$ref']) {
                  // already use origin type #89
                  // this._definitions.schemas = this._definitions.schemas || {};
                  // this._definitions.schemas[`${operationNamespace}RequestBody`] = `export type ${`${operationNamespace}RequestBody`} = Array<${this.refToTypeName(schema['items']['$ref'])}>;`;
                } else if (!schema['$ref']) {
                  this._definitions.schemas = this._definitions.schemas || {};
                  this._definitions.schemas[`${operationNamespace}RequestBody`] = await compile(derefSchema, `${operationNamespace}RequestBody`, {
                    bannerComment: ''
                  });
                }
              }
            }
            if (operation.responses) {
              for (const status of Object.keys(operation.responses).filter(v => !isNaN(+v) || v === 'default')) {
                let resp = operation.responses[status] as OpenAPIV3.ResponseObject;
                if (resp.content) {
                  let firstKey = Object.keys(resp.content)[0];
                  let schema = resp.content[firstKey].schema;
                  let responseType = this.toCamelCase('Response ' + status, true);
                  if (schema['items'] && schema['items']['$ref']) {
                    // already use origin type #114
                    // this._definitions.schemas = this._definitions.schemas || {};
                    // this._definitions.schemas[`${operationNamespace}${responseType}`] = `export type ${`${operationNamespace}${responseType}`} = Array<${this.refToTypeName(schema['items']['$ref'])}>;`;
                  } else if (!schema['$ref']) {
                    // this._definitions.schemas = this._definitions.schemas || {};
                    // this._definitions.schemas[`${operationNamespace}${responseType}`] = await compile(schema, `${operationNamespace}${responseType}`, { bannerComment: '' });
                    let responseName = !isNaN(<any>status) ? `$${status}` : this.toCamelCase(status, true);
                    this._definitions.schemas = this._definitions.schemas || {};
                    this._definitions.schemas[`${operationNamespace}${responseType}`] = `export type ${operationNamespace}${responseType} = Paths.${operationNamespace}.Responses.${responseName};`;
                  }
                }
              }
            }
          }
        }
      }
      // this._definitions.openapi = await this.markedOpenapi();
    }
    return this._definitions;
  }
  private _bundle: OpenAPIV3.Document;
  /**
   * Deref local $ref(s)
   */
  private async bundle(): Promise<OpenAPIV3.Document> {
    if (!this._bundle) {
      let api = await this.openapi3();
      // TODO: fix type:array with items:$ref will error with $RefParaser
      this._bundle = await $RefParaser.bundle(JSON.parse(JSON.stringify(api))) as OpenAPIV3.Document;
      // this._bundle = api;
    }
    return this._bundle;
  }
  private _derefs: OpenAPIV3.Document;
  /**
   * Get dedefs openapi with marks
   * @returns processed openapi spec with x-typeapi-* marks
   */
  async derefsOpenapi(schema?: OpenAPIV3.Document): Promise<OpenAPIV3.Document> {
    if (schema)
      return $RefParaser.dereference(JSON.parse(JSON.stringify(schema))) as Promise<OpenAPIV3.Document>;
    // TODO: if bundle fix may fix this too
    if (!this._derefs) {
      let marked = await this.markedOpenapi();
      this._derefs = await $RefParaser.dereference(JSON.parse(JSON.stringify(marked))) as OpenAPIV3.Document;
    }
    return this._derefs;
  }
  /**
   * Converting an object to a string
   * https://stackoverflow.com/questions/5612787/converting-an-object-to-a-string
   * http://jsfiddle.net/numoccpk/1/
   */
  convertToText(obj) {
    //create an array that will later be joined into a string.
    var string = [];

    //is object
    //    Both arrays and objects seem to return "object"
    //    when typeof(obj) is applied to them. So instead
    //    I am checking to see if they have the property
    //    join, which normal objects don't have but
    //    arrays do.
    if (obj == undefined) {
      return String(obj);
    } else if (typeof (obj) == "object" && (obj.join == undefined)) {
      for (const prop in obj) {
        if (obj.hasOwnProperty(prop))
          string.push(prop + ": " + this.convertToText(obj[prop]));
      };
      return "{" + string.join(",") + "}";

      //is array
    } else if (typeof (obj) == "object" && !(obj.join == undefined)) {
      for (const prop in obj) {
        string.push(this.convertToText(obj[prop]));
      }
      return "[" + string.join(",") + "]";

      //is function
    } else if (typeof (obj) == "function") {
      string.push(obj.toString())

      //all other values can be done with JSON.stringify
    } else {
      string.push(JSON.stringify(obj))
    }

    return string.join(",");
  }
}

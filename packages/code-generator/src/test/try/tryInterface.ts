import { Parser } from '../../module/Parser';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import interfaceRender from '../../render/interface';
import controllerRender from '../../render/controller';
import registerRender from '../../render/register';
import definitionsRender from '../../render/definitions';
import isecurityRender from '../../render/isecurity';
import securityRender from '../../render/security';
import pluginsRender from '../../render/plugins';

import { OpenAPIV3 } from 'openapi-types';

let specName = 'petstore-3.0.openapi.yaml';// 'petstore-2.0.swagger.yaml'; //   'swagger-bitopro-admin.yaml'; //
let filePath = path.resolve(__dirname, `../../../src/test/${specName}`);
let fileContent = fs.readFileSync(filePath, 'utf8');
let json: OpenAPIV3.Document = yaml.safeLoad(fileContent);
let parser = new Parser({ openapi: json });
// console.log('parser created.');
(async function () {
  let definitions = await parser.toDefinitions();
  let saveFile = path.resolve(__dirname, '../../../src/test/generator/interface/definitions.ts');
  fs.writeFileSync(saveFile, await definitionsRender(definitions), 'utf8');

  let faceModel = await parser.toInterfaceModel();
  let faceModelFile = path.resolve(__dirname, `../../../src/test/${specName}.interfaceModel.json`);
  // let faceModelFile = path.resolve(__dirname, `../../../src/test/swagger-bitopro-admin.interfaceModel.json`);
  fs.writeFileSync(faceModelFile, JSON.stringify(faceModel, null, 4), 'utf8');

  let isecurityFile = path.resolve(__dirname, `../../../src/test/generator/interface/isecurity.ts`);
  fs.writeFileSync(isecurityFile, await isecurityRender(faceModel[0].security || {}), 'utf8');
  let securityFile = path.resolve(__dirname, `../../../src/test/generator/security.ts`);
  fs.writeFileSync(securityFile, await securityRender(faceModel[0].security || {}), 'utf8');

  let pluginsFile = path.resolve(__dirname, `../../../src/test/generator/plugins.ts`);
  fs.writeFileSync(pluginsFile, await pluginsRender({}), 'utf8');

  let registerFile = path.resolve(__dirname, '../../../src/test/generator/register.ts');
  let controllerNames = faceModel.map(v => v.controllerName === '' || v.controllerName === '__default__' ? 'controller' : v.controllerName);
  let fileNames = controllerNames.map(v => v === 'controller' ? '' : `${v}.`);
  fs.writeFileSync(registerFile, await registerRender({ controllerNames, fileNames }), 'utf8');

  for (const face of faceModel) {
    let saveFile = path.resolve(__dirname, `../../../src/test/generator/interface/${!face.controllerName || face.controllerName === '__default__' ? '' : (face.controllerName + '.')}interface.ts`);
    fs.writeFileSync(saveFile, await interfaceRender(face), 'utf8');

    let ctrlFile = path.resolve(__dirname, `../../../src/test/generator/${!face.controllerName || face.controllerName === '__default__' ? '' : (face.controllerName + '.')}controller.ts`);
    face['prefixAsync'] = true;
    fs.writeFileSync(ctrlFile, await controllerRender(face), 'utf8');
  }
  console.log('done.');
  process.exit(0);
})();

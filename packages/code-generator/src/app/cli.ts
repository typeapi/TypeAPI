/* If you don't webpack to dist/cli.js, you need uncomment next line back. */
// #!/usr/bin/env node --harmony

import * as program from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { Builder } from '../module/Builder';
// import * as globule from 'globule';
import * as mkdirp from 'mkdirp';
import * as http from 'http';
import { machineIdSync } from 'node-machine-id';
import XDeferred from 'xdeferred';
import * as yaml from 'js-yaml';
import * as del from 'del';

let oasFile: string;
let saveDir: string = './';
program
  .version('0.0.1')
  .usage('path/swagger/openapi.[json|yaml] dir/save/to/')
  .arguments('<source> [target]')
  .option('-c, --controllerProperty <ctrlProperty>', 'default "x-typeapi-controller", split operation to different controller by this property at openapi operation object.')
  .option('-n, --newUserFilesExtName <subName>', 'if user files exist, create new one with this sub file name, empty wont generate new controller files.')
  .option('-s, --httpServer <serverType>', '"express" only for now, empty wont generate app.ts example.')
  .action((source, target) => {
    oasFile = source;
    saveDir = target || saveDir;
  })
  .parse(process.argv);

// function isDir(dpath) {
//   try {
//     return fs.lstatSync(dpath).isDirectory();
//   } catch (e) {
//     return false;
//   }
// };

if (!oasFile || !fs.existsSync(oasFile)) {
  console.error('source openapi/swagger file not exists!');
  process.exit(1);
}
let openapi = yaml.safeLoad(fs.readFileSync(oasFile, 'utf8'));
let ctrlProp = program.controllerProperty || 'x-typeapi-controller';
let builder = new Builder({ openapi, controllerProperty: ctrlProp });
let newName = `${program.newUserFilesExtName || ''}`.trim();

(async () => {
  let controllerPath = path.resolve(saveDir); //path.dirname(target);
  let interfacePath = path.resolve(saveDir, 'interface');
  if (fs.existsSync(interfacePath))
    await del(interfacePath);
  mkdirp.sync(interfacePath);

  await saveTo(path.resolve(interfacePath, 'definitions.ts'), await builder.definitions(), true);
  await saveTo(path.resolve(interfacePath, 'isecurity.ts'), await builder.isecurity(), true);
  await saveTo(path.resolve(controllerPath, 'security.ts'), await builder.security(), newName);
  await saveTo(path.resolve(controllerPath, 'plugins.ts'), await builder.plugins(), newName);
  await saveTo(path.resolve(controllerPath, 'register.ts'), await builder.register(), newName);
  let interfaces = await builder.interfaces();
  for (const inf of interfaces) {
    let fileName = `${!inf.name || inf.name === '__default__' ? '' : (inf.name + '.')}interface.ts`;
    await saveTo(path.resolve(interfacePath, fileName), inf.code, true);
  }
  let controllers = await builder.controllers();
  for (const ctrl of controllers) {
    let fileName = `${!ctrl.name || ctrl.name === '__default__' ? '' : (ctrl.name + '.')}controller.ts`
    await saveTo(path.resolve(controllerPath, fileName), ctrl.code, newName);
  }
  if (program.httpServer === 'express')
    await saveTo(path.resolve(controllerPath, 'app.ts'), await builder.app('express'), newName);
  await usageReport();
  console.log('done.');
  process.exit(0);
})();
async function saveTo(filePath: string, content: string, overwriteOrNewSubName?: string | boolean) {
  let exist = fs.existsSync(filePath);
  let old = exist && fs.readFileSync(filePath, 'utf8') || undefined;
  if (!exist || overwriteOrNewSubName === true) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`created or overwrite file: ${filePath}`);
  }
  else if (!overwriteOrNewSubName || old === content) {
    console.log(`ignore existed/same content file generate: ${filePath}`);
  }
  else {
    let savePath = `${filePath}${overwriteOrNewSubName}`;
    fs.writeFileSync(savePath, content, 'utf8');
    console.log(`overwrite exist file to new name: ${savePath}`);
  }
}
async function usageReport(action: string = 'typeapi', label: string = 'codegen', value: number = 1): Promise<string> {
  let dfd = new XDeferred<string>();
  try {
    const gaId = 'UA-136322974-1';
    const cid = machineIdSync(true);
    http.get(`http://www.google-analytics.com/collect?v=1&tid=${gaId}&cid=${cid}&t=event&ec=ejs2module&ea=${action}&el=${label}&ev=${value}`,
      res => {
        res.on('data', (chunk) => { });
        res.on('end', () => {
          dfd.resolve('');
        });
      }).on('error', (e) => {
        dfd.resolve('');
      });
  } catch (error) {
    dfd.resolve('');
  }
  return dfd.promise();
}

/* If you don't webpack to dist/cli.js, you need uncomment next line back. */
// #!/usr/bin/env node --harmony

import * as program from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { Builder } from '../module/Builder';
import * as globule from 'globule';
import * as mkdirp from 'mkdirp';
import * as http from 'http';
import { machineIdSync } from 'node-machine-id';
import XDeferred from 'xdeferred';

let ejsFile: string;
let saveFile: string = './';
program
  .version('0.0.117')
  .usage('path_or_dir/load/from/source.[ejs] path_or_dir/save/to/target.ts')
  .arguments('<source> [target]')
  .option('-s, --script [js|ts]', 'default "js" for JavaScript, then "ts" for TypeScript module, or auto detect by target file subname.')
  .option('-a, --async [false|true]', 'default "false", set "ture" will add "async" keyword before export function, then you can use "await" keyword inside template.')
  .option('-l, --localsName [value]', 'Name to use for the object storing local variables Defaults to "locals".')
  .action((source, target) => {
    ejsFile = source;
    saveFile = target || saveFile;
  })
  .parse(process.argv);

function isDir(dpath) {
  try {
    return fs.lstatSync(dpath).isDirectory();
  } catch (e) {
    return false;
  }
};

if (!ejsFile || !fs.existsSync(ejsFile)) {
  console.error('source ejs file/dir not exists!');
  process.exit(1);
}

let mode = 'toJs';
if (program.script) {
  let lang = `${program.script}`.trim().toLowerCase();
  mode = { js: 'toJs', ts: 'toTs' }[lang];
  if (!mode) {
    console.error(`-s, --script must be "js" or "ts".`)
    process.exit(1);
  }
}

if (!mode) {
  if (saveFile.endsWith('.ts')) mode = 'toTs';
  else mode = "toJs";
}

let subname = mode.replace('to', '').toLowerCase();

async function build(source: string, target: string) {
  let template: string = fs.readFileSync(source, 'utf8');
  let script = await new Builder({
    template, ejsOptions: {
      async: `${program.async}`.toLowerCase() === 'true',
      localsName: program.localsName
    }
  })[mode]();
  let dir = path.dirname(target);
  if (!fs.existsSync(dir))
    mkdirp.sync(dir);
  let saveName = target.replace(/.ejs$/g, `.${subname}`);
  fs.writeFileSync(saveName, script, 'utf8');
  console.log(`build ${source} to ${saveName}.`)
}

if (!isDir(ejsFile)) {
  if (saveFile.endsWith('.js') || saveFile.endsWith('.ts'))
    saveFile = saveFile.split('.').map((v, i, a) => i === a.length - 1 ? subname : v).join('.');
  else
    saveFile = path.join(saveFile, path.basename(ejsFile, '.ejs') + '.' + subname);
}

let files = isDir(ejsFile) ?
  globule['findMapping']('**/*.ejs', { srcBase: ejsFile, destBase: saveFile }) :
  [{ src: [ejsFile], dest: saveFile }];

async function usageReport(buildTo: string, count: number): Promise<string> {
  if (!count) return;
  let dfd = new XDeferred<string>();
  try {
    const gaId = 'UA-136322974-1';
    const cid = machineIdSync(true);
    http.get(`http://www.google-analytics.com/collect?v=1&tid=${gaId}&cid=${cid}&t=event&ec=ejs2module&ea=build&el=${buildTo}&ev=${count}`,
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

(async function () {
  for (const f of files) {
    for (const src of f.src) {
      await build(src, f.dest);
    }
  }
  await usageReport(mode, files.length);
  process.exit(0);
})();

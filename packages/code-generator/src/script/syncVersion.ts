import * as fs from 'fs';
import * as path from 'path';

let npmPkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../package.json'), 'utf8'));
let filePath = path.resolve(__dirname, '../../build/app/cli.js');
let content = fs.readFileSync(filePath, 'utf8');
// fs.writeFileSync(filePath + '_bak', content, 'utf8');
let lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('.version(')) {
        lines[i] = `  .version('${npmPkg.version}')`;
        break;
    }
}
fs.writeFileSync(filePath, lines.join('\n'), 'utf8');

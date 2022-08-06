let fs = require('fs');
let package = JSON.parse(fs.readFileSync('package.json', 'utf8'));
let filePath = 'src/app/ejs2module.ts';
let content = fs.readFileSync(filePath, 'utf8');
// fs.writeFileSync(filePath + '_bak', content, 'utf8');
let lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('.version(')) {
        lines[i] = `  .version('${package.version}')`;
        break;
    }
}
fs.writeFileSync(filePath, lines.join('\n'), 'utf8');

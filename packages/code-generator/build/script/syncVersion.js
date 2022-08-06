"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var npmPkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../package.json'), 'utf8'));
var filePath = path.resolve(__dirname, '../../build/app/cli.js');
var content = fs.readFileSync(filePath, 'utf8');
// fs.writeFileSync(filePath + '_bak', content, 'utf8');
var lines = content.split('\n');
for (var i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('.version(')) {
        lines[i] = "  .version('" + npmPkg.version + "')";
        break;
    }
}
fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
//# sourceMappingURL=syncVersion.js.map
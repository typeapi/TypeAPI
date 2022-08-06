"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var filePath = path.resolve(__dirname, '../../build/app/cli.js');
var content = fs.readFileSync(filePath, 'utf8');
fs.writeFileSync(filePath, '#!/usr/bin/env node --harmony\n' + content, 'utf8');
//# sourceMappingURL=addCliHead.js.map
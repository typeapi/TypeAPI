import * as fs from 'fs';
import * as path from 'path';
let filePath = path.resolve(__dirname, '../../build/app/cli.js');
let content = fs.readFileSync(filePath, 'utf8');
fs.writeFileSync(filePath, '#!/usr/bin/env node --harmony\n' + content, 'utf8');

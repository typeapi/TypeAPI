// '#!/usr/bin/env node --harmony'
let fs = require('fs');
let filePath = 'build/app/ejs2module.js';
let content = fs.readFileSync('build/app/ejs2module.js', 'utf8');
fs.writeFileSync(filePath, '#!/usr/bin/env node --harmony\n' + content, 'utf8');

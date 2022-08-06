# ejs2module

> Command line tool to compile *.ejs template file to typescript/javascript module.

Useful for transform ejs template to render function(js or ts) mdule then you can pack it with webpack, no need runtime ejs compile or load runtime ejs core.

When you transform to ts mode, ejs2module will extract 'import xxx from xxx;' to ts file top, so you can use orther ejs module or others(npm or your selfs) in template.

In js mode, use 'require()' replace ejs 'include()' function.

In ts mode, you can write "import XXX from 'XXX';" in any template script(code) block, then use it. Because ejs compile fail with 'import()', just use require() replace it(dynamic import()).

*I really like use it with transform to 'ts' and 'async' mode, then I can write TypeScript and await function call in template.*

## Usage
You can use npx to run ejs2module without install it. Of course you need npm first.
```
$ npx ejs2module -h

Usage: npx ejs2module path_or_dir/load/from/[source.ejs] path_or_dir/save/to/[target.ts|target.js]

Options:
  -V, --version             output the version number
  -s, --script [js|ts]      default "js" for JavaScript, then "ts" for TypeScript module, or auto detect by target file subname.
  -a, --async [false|true]  default "false", set "ture" will add "async" keyword before export function, then you can use 'await' keyword inside template.
  -l, --localsName [value]  Name to use for the object storing local variables Defaults to "locals".
  -h, --help                output usage information
```
## Single file transform
Build main.ejs to main.ts with payload name "model" and export "async function".
```
$ project/>npx ejs2module src/template/main.ejs src/render/main.ts -l model -a true
```

## Multi-files transform
If source is a directory, ejs2module will build **/*.ejs in source direcroty, then use same directory hierarchy to save target file. You must specified target script type by "-s ts" or "-s js".
```
$ project/>npx ejs2module src/template/ src/render/ -s ts -l model -a true
```

## Integrate into your npm project
Usually you only use ejs2module in development stage, it is good to install it with -D or --save-dev.
```
$ workspace/npm-project/>npm install --save-dev ejs2module
```

Then you can add build script to project's package.json like:
```
{
  "scripts": {
    "ejs2m": "ejs2module src/template/ src/render/ --script ts --async true -l model",
    ...
  }
  ...
}
```

And every time after you modify your ejs file, just run this:
```
$ workspace/npm-project/>npm run ejs2m
```

## Use js require() replace ejs include()
>In js mode, module will direct exports render function. So require and render module like this:
```
var result = require('./path/to/module')(payload);
```

### js example:
workspace/npm-project/src/template/sub-dir/child.ejs
```
==== child component ====
Msg: <%- locals.msg %>
=========================
```

workspace/npm-project/src/template/main.ejs
```
=== main start ===
<%- require('./sub-dir/child')({msg:'main message'}) %>
==================
```

Build ejs to js.
```
$ workspace/npm-project/>npx ejs2module src/template/ src/render/ -s js
```

Render main.js in some js file.
```
var result = require('./src/render/main')({});
```

The result should be:
```
=== main start ===
==== child component ====
Msg: main message
=========================
==================
```

## Use ts(TypeScript) 'import from' and 'async' mode module
>In ts mode, module will export render function to default. So import module like this:
```
import uNameIt from './render/moduleName';
```

### ts async example:
workspace/npm-project/src/template/sub-dir/child.ejs
```
==== child component ====
Msg: <%- locals.msg %>
=========================
```

workspace/npm-project/src/template/main.ejs
```
<%
import subChild from './sub-dir/child';
%>
=== main start ===
<%- await subChild({msg:'main message'}) %>
==================
```

Build ejs to async ts.
```
$ workspace/npm-project/>npx ejs2module src/template/ src/render/ -s ts -a true
```

Render main.ts in some ts file.
```
import mainRender from './src/render/main';
(async function(){
  let result = await mainRender();
})();
```

The result should be the same as above:
```
=== main start ===
==== child component ====
Msg: main message
=========================
==================
```

## Install to global
Better not, because you will not keep it update.
```
$ install --global ejs2module
```

## Dependencies
In order to speed up the (npx) loading speed and reduce the dependency complexity, I packaged the library used in the execution period into a single js file. The following is the list of libraries used in runtime:
- [commander: 2.19.0](https://www.npmjs.com/package/commander/v/2.19.0)
- [ejs: 2.6.1](https://www.npmjs.com/package/ejs/v/2.6.1)
- [globule: 1.2.1](https://www.npmjs.com/package/globule/v/1.2.1)
- [mkdirp: 0.5.1](https://www.npmjs.com/package/mkdirp/v/0.5.1)

## Related
- [ejs](https://github.com/mde/ejs) - EJS template engine

## License
MIT

## Author
[gkctou](mailto:gkctou@gmail.com)

## Counter
Readme views: ![Counter](http://www.cutercounter.com/hit.php?id=gvvmofkdc&nd=9&style=34)

![Counter](https://www.google-analytics.com/collect?v=1&tid=UA-136322974-1&cid=00000000-0000-0000-0000-000000000000&t=pageview&an=ejs2module&dp=%2F%2Fwww.npmjs.com%2Fpackage%2Fejs2module&dt=ejs2module%20-%20npm)

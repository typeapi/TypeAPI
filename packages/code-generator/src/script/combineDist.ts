// require('@zeit/ncc')('/path/to/input', {
//     // provide a custom cache path or disable caching
//     cache: "./custom/cache/path" | false,
//     // externals to leave as requires of the build
//     externals: ["externalpackage"],
//     minify: false, // default
//     sourceMap: false, // default
//     sourceMapBasePrefix: '../' // default treats sources as output-relative
//     // when outputting a sourcemap, automatically include
//     // source-map-support in the output file (increases output by 32kB).
//     sourceMapRegister: true, // default
//     watch: false, // default
//     v8cache: false, // default
//     quiet: false, // default
//     debugLog = false // default
// }).then(({ code, map, assets }) => {
//     console.log(code);
//     // Assets is an object of asset file names to { source, permissions, symlinks }
//     // expected relative to the output code (if any)
// })

//   {
//     // handler re-run on each build completion
//     // watch errors are reported on "err"
//     handler (({ err, code, map, assets }) => { ... })
//     // handler re-run on each rebuild start
//     rebuild (() => {})
//     // close the watcher
//     void close ();
//   }

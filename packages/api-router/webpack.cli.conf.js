var path = require('path');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

module.exports = {
  entry: './build/app/index.js',
  mode: 'production',
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: 'index.js',
    // library: "libraryName",
    libraryTarget: 'commonjs2'//'umd'//
  },
  stats: {
    warnings: false,
    warningsFilter: (w) => !w.startsWith('require.extensions')
  },
  plugins: [
    new FilterWarningsPlugin({ 
      exclude: /^require\.extensions/ 
    })
  ]
}

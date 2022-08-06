var path = require('path');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

module.exports = {
  entry: './build/app/ejs2module.js',
  mode: 'production',
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: 'ejs2module.js'
    // library: "sodaextend",
    // libraryTarget: 'umd'//'commonjs2'
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

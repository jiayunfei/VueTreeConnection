const path = require('path')
const VueLoadPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'none',
  entry: {
    'index': './src/components/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: '[name].js',
    library: 'cloudWords',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: path.resolve(__dirname, 'node_modules/')
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules/')
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'images/[name].[ext]'
          }
        }],
        exclude: path.resolve(__dirname, 'node_modules/')
      },
      {
        test: /\.(woff|woff2|svg|eot|ttf|otf)$/,
        exclude: path.resolve(__dirname, 'node_modules/'),
        use: [{
          loader: 'file-loader',
          options: {
            limit: 10000,
            name: 'fonts/[name].[ext]'
          }
        }]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } }
        ],
        exclude: path.resolve(__dirname, 'node_modules/'),
      }
    ]
  },
  plugins: [
    new VueLoadPlugin()
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src'),
    }
  }
}
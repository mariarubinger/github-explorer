const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

// Criando Ambiente de Desenvolvimento
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval-source-map' : 'source-map', // source map
  entry: path.resolve(__dirname, 'src', 'index.tsx'), // no entry fala qual é o arquivo principal da nossa aplicação
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js' // o arquivo que é gerado com o webpack
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'), // no public que está o conteúdo estático da nossa aplicação
    hot: true,
  },
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    })
  ].filter(Boolean),
  module: {
    rules: [ // array de regras
      {
        test: /\.(j|t)sx$/, // recebe uma expressão regular pra vê se o arquivo é um arquivo JavaScript ou não
        exclude: /node_modules/, // já são arquivos prontos então não precisa converter
        use: {
          loader: 'babel-loader', // dependência que faz a ligação entre o babel e o webpack
          options: {
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel')
            ].filter(Boolean)
          }
        },
      },
      // regra para arquivos SCSS : SASS
      {
        test: /\.scss$/, 
        exclude: /node_modules/, 
        use: ['style-loader', 'css-loader', 'sass-loader'], 
      },
    ],
  }
};
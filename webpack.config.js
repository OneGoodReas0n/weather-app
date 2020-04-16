const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
   entry: './src/js/index.js',

   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'build.js',
      publicPath: '/'
   },

   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: [
               {
                  loader: 'babel-loader',
                  options: {
                     presets: ['@babel/preset-env']
                  }
               },
               {
                  loader: 'eslint-loader'
               }
            ]
         },

         {
            test: /\.(sa|sc|c)ss$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
         },

         {
            test: /\.(png|jpe?g|gif|svg)$/,
            use: [
               {
                  loader: 'file-loader',
                  options: {
                     outputPath: 'assets',
                     publicPath: 'dist/assets'
                  }
               }
            ]
         },

         {
            test: /\.(woff|woff2|ttf|otf|eot)$/,
            use: [
               {
                  loader: 'file-loader',
                  options: {
                     outputPath: 'fonts'
                  }
               }
            ]
         }
      ]
   },

   plugins: [new CleanWebpackPlugin()],

   mode: 'development'
};

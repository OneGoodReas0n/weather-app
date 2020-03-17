const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const sass = require('sass');

module.exports = {
   entry: './src/js/index.js',

   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'build.js',
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
                     presets: ['@babel/preset-env'],
                  },
               },
               {
                  loader: 'eslint-loader',
               },
            ],
         },

         {
            test: /\.(sa|sc|c)ss$/,
            use: [
               { loader: MiniCssExtractPlugin.loader },

               {
                  loader: 'css-loader',
               },
               {
                  loader: 'sass-loader',
                  options: {
                     implementation: sass,
                  },
               },
            ],
         },

         {
            test: /\.(png|jpe?g|gif|svg)$/,
            use: [
               {
                  loader: 'file-loader',
                  options: {
                     outputPath: 'images',
                  },
               },
            ],
         },

         {
            test: /\.(woff|woff2|ttf|otf|eot)$/,
            use: [
               {
                  loader: 'file-loader',
                  options: {
                     outputPath: 'fonts',
                  },
               },
            ],
         },
      ],
   },

   plugins: [
      new MiniCssExtractPlugin({
         filename: 'style.css',
      }),
   ],

   mode: 'development',
};

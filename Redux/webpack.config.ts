import path from 'path';
import { Configuration } from 'webpack';

const config: Configuration = {
  mode: 'development',
  devtool: 'eval', // hidden-source-map
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts'],
  },

  entry: {
    app: './client',
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader',
    }],
  },
  plugins: [],
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/' //webpack-dev-server 사용하려면 넣어줘야함
  },
};

export default config;

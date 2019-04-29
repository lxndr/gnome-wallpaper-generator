const { BannerPlugin } = require('webpack');
const path = require('path');

module.exports = {
  target: 'node',
  entry: './index.js',
  mode: process.env.NODE_ENV || 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'gnome-wallpaper-generator.js',
    pathinfo: true
  },
  plugins: [
    new BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
  ],
};


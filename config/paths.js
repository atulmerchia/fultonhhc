const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appAssets: resolveApp('public'),
  appBuild: resolveApp('build'),
  appConfig: resolveApp('config'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.js'),
  appSrc: resolveApp('src')
};

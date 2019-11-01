const WebpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
const paths = require("./paths");
const config = require("./webpack-dev-config.js");

const Port = 3000;
const Host = "localhost";

const options = {
  host: Host,
  hot: true,
  overlay: {
    warnings: false,
    errors: true
  },
  quiet: false,
  noInfo: false,
  contentBase: paths.appAssets,
  watchContentBase: true,
  after() {
    process.stdout.write(`dev server is running: http://${Host}:${Port}\n`);
  }
};

WebpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new WebpackDevServer(compiler, options);

server.listen(Port, Host, () => {});

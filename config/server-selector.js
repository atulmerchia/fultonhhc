require('dotenv').config();

console.log(process.env.PIPELINE_STAGE);

if (process.env.PIPELINE_STAGE === "prod") {
  require('child_process').execSync("npm run build")
  require("./express-prod-server");
}
else
  require("./webpack-dev-server");

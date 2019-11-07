require('dotenv').config();

if (process.env.SERVER_MODE === 'prod') {
  if (process.env.IS_LOCAL)
    require('child_process').execSync('npm run build');
  require('./express-prod-server');
}
else
  require('./webpack-dev-server');

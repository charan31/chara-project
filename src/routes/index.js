// Include all route files with a base route of the file name
const fs = require('fs')

let allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', '*')

  next()
}

console.log('here1')

function routes(app) {
  fs.readdirSync(__dirname + '/')
    .filter(file => file.match(/\.js$/))
    .forEach(file => {
        console.log('files', file)
      if (file !== 'index.js') {
        let sp = file.split('.');
        console.log('ss', sp[0])
        app.use('/' + sp[0], require('./' + sp[0]));
        app.use(allowCrossDomain);
      }
    });
}

module.exports = routes;

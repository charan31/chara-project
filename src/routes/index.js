// Include all route files with a base route of the file name
const fs = require('fs')

//CORS will allow client to access server even both are in different domains
let allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
}

// construct routes by taking routes folder.
//each file in routes folder will becomes one route.
function routes(app) {
  fs.readdirSync(__dirname + '/')
    .filter(file => file.match(/\.js$/))
    .forEach(file => {
      if (file !== 'index.js') {
        let sp = file.split('.');
        app.use('/' + sp[0], require('./' + sp[0]));
        app.use(allowCrossDomain);
      }
    });
}

module.exports = routes;

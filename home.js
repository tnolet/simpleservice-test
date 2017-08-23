const config = require('config')

const routes = [
  {
    method: 'GET',
    path: '/',
    config: {
      handler: getHome
    }
  }
]

function getHome (request, reply) {
  reply.view('index', {
    heroText: config.heroText,
    backgroundColor: config.backgroundColour,
    version: config.version
  })
}


exports.register = function (server, options, next) {
  server.route(routes)
  next()
}

exports.register.attributes = {
  name: 'home'
}

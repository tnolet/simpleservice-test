const config = {}

config.bind = '0.0.0.0'
config.port = 3000

config.version = require('../package').version
config.backgroundColour = process.env.SIMPLE_SERVICE_BGCOLOR || 'red'
config.heroText = process.env.SIMPLE_SERVICE_HERO_TEXT || 'oh my!'

module.exports = config

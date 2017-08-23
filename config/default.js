const config = {}

config.bind = '0.0.0.0'
config.port = 3000

config.version = require('../package').version
config.backgroundColour = process.env.SIMPLE_SERVICE_BGCOLOR || 'cornflowerblue'
config.heroText = process.env.SIMPLE_SERVICE_HERO_TEXT || 'This looks great!'

module.exports = config

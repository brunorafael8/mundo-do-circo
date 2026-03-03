const path = require('path')
const { getDefaultConfig } = require('expo/metro-config')

const config = getDefaultConfig(__dirname)

config.resolver.sourceExts.push('mjs')

// Custom transformer to handle import.meta on web
config.transformer = {
  ...config.transformer,
  babelTransformerPath: path.resolve(__dirname, 'metro-transformer.js'),
}

// Prefer web-specific modules when available
config.resolver.resolverMainFields = ['browser', 'main', 'module']

module.exports = config

const upstreamTransformer = require('@expo/metro-config/babel-transformer')

module.exports.transform = async function transform({ src, filename, options }) {
  // Transform import.meta references for web compatibility
  if (options.platform === 'web' && src.includes('import.meta')) {
    src = src
      .replace(/import\.meta\.env\?\.MODE/g, '"production"')
      .replace(/import\.meta\.env\.MODE/g, '"production"')
      .replace(/import\.meta\.env/g, 'process.env')
      .replace(/import\.meta\.url/g, '""')
      .replace(/typeof import\.meta/g, '"undefined"')
  }

  return upstreamTransformer.transform({ src, filename, options })
}

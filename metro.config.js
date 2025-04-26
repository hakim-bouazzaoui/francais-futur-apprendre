const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add JSON to assetExts
config.resolver.assetExts.push('json');

// Add support for importing JSON files
config.transformer.babelTransformerPath = require.resolve('metro-react-native-babel-transformer');

module.exports = {
  ...config,
  resolver: {
    ...config.resolver,
    sourceExts: [...config.resolver.sourceExts, 'json'],
  },
};
const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add custom config
module.exports = {
  ...config,
  resolver: {
    ...config.resolver,
    assetExts: [...config.resolver.assetExts, 'json'],
    sourceExts: [...config.resolver.sourceExts],
    resolverMainFields: ['react-native', 'browser', 'main'],
    extraNodeModules: {
      '@': path.resolve(__dirname),
      '@components': path.resolve(__dirname, 'components'),
      '@screens': path.resolve(__dirname, 'screens'),
      '@services': path.resolve(__dirname, 'services'),
      '@constants': path.resolve(__dirname, 'constants'),
      '@data': path.resolve(__dirname, 'data'),
    },
  },
  transformer: {
    ...config.transformer,
    minifierConfig: {
      keep_classnames: true,
      keep_fnames: true,
      mangle: {
        keep_classnames: true,
        keep_fnames: true,
      },
    },
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  maxWorkers: 2, // Reduce parallel processing to avoid EMFILE
  resetCache: true,
  watchFolders: [path.resolve(__dirname)],
};
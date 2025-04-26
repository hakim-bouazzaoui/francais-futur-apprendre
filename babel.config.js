module.exports = function(api) {
  api.cache(true);
  
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Single source of transformation plugins
      ['module-resolver', {
        root: ['./'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@': './',
          '@components': './components',
          '@screens': './screens',
          '@services': './services',
          '@constants': './constants',
          '@data': './data',
        },
      }],
    ],
    env: {
      production: {
        plugins: ['transform-remove-console']
      }
    }
  };
};
module.exports = {
  name: 'App Naturalisation',
  slug: 'app-naturalisation',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  assetBundlePatterns: [
    "**/*",
    "data/json/*.json"
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.francaisfutur.apprendre'
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff'
    },
    package: 'com.francaisfutur.apprendre'
  },
  web: {
    favicon: './assets/favicon.png'
  },
  extra: {
    enableJsonLoading: true,
    eas: {
      projectId: 'app-naturalisation'
    }
  },
  plugins: [],
  experiments: {
    tsconfigPaths: true
  },
  developmentClient: {
    silentLaunch: true
  }
};
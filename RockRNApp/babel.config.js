module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-worklets/plugin',
    [
      'module-resolver',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        root: ['../vega-sports-app/'],
        alias: {
          '@Api': '../vega-sports-app/src/api',
          '@AppAssets': '../vega-sports-app/src/assets',
          '@AppComponents': '../vega-sports-app/src/components',
          '@AppScreens': '../vega-sports-app/src/screens',
          '@AppServices': '../vega-sports-app/src/services',
          '@AppUtils': '../vega-sports-app/src/utils',
          '@AppTestUtils': '../vega-sports-app/src/test-utils',
          '@AppTheme': '../vega-sports-app/src/theme',
          '@AppStore': '../vega-sports-app/src/store',
          '@AppModels': '../vega-sports-app/src/models',
          '@AppSrc': '../vega-sports-app/src',
          '@AppRoot': '../vega-sports-app/',
        },
      },
    ],
  ],
};

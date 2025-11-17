module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['*.js'],
      parserOptions: {
        babelOptions: {
          configFile: require.resolve('./babel.config.js'),
        },
      },
    },
  ],
};

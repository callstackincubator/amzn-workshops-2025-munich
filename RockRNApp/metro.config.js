const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');
const fs = require('fs');

const polyfills = fs
  .readdirSync(path.join(__dirname, 'polyfills'), { withFileTypes: true })
  .map(file =>
    file.isDirectory()
      ? {
          name: file.name,
          path: `${file.name}/index`,
        }
      : {
          name: file.name.replace(/\.[jt]sx?$/i, ''),
          path: file.name,
        },
  );

console.log('Polyfills:', polyfills);

const vegaSportsAppPath = path.resolve(__dirname, '../vega-sports-app');
const aliases = {
  '@Api': path.join(vegaSportsAppPath, 'src/api/'),
  '@AppAssets': path.join(vegaSportsAppPath, 'src/assets/'),
  '@AppComponents': path.join(vegaSportsAppPath, 'src/components/'),
  '@AppScreens': path.join(vegaSportsAppPath, 'src/screens/'),
  '@AppServices': path.join(vegaSportsAppPath, 'src/services/'),
  '@AppUtils': path.join(vegaSportsAppPath, 'src/utils/'),
  '@AppTestUtils': path.join(vegaSportsAppPath, 'src/test-utils/'),
  '@AppTheme': path.join(vegaSportsAppPath, 'src/theme/'),
  '@AppStore': path.join(vegaSportsAppPath, 'src/store/'),
  '@AppModels': path.join(vegaSportsAppPath, 'src/models/'),
  '@AppSrc': path.join(vegaSportsAppPath, 'src/'),
  '@AppRoot': vegaSportsAppPath,
};

const selfNodeModulesPath = path.resolve(__dirname, 'node_modules');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  watchFolders: [path.resolve(vegaSportsAppPath)],
  resolver: {
    nodeModulesPaths: [selfNodeModulesPath],
    extraNodeModules: aliases,
    resolveRequest: function resolveRequest(context, moduleName, platform) {
      const absoluteOriginModulePath = path.resolve(
        context.originModulePath,
        moduleName,
      );

      if (absoluteOriginModulePath.includes(vegaSportsAppPath)) {
        // override @amazon-devices scoped packages to non-amazon ones
        if (moduleName.includes('@amazon-devices')) {
          let newModuleName;

          if (moduleName.includes('__')) {
            // convert paths like @amazon-devices/react-navigation__core -> @react-navigation/core etc.
            const parts = moduleName.split('/');
            const scopedPackage = parts[1]; // e.g. react-navigation__core
            const [prefix, rest] = scopedPackage.split('__');

            newModuleName = `@${prefix}/${rest}`;
          } else {
            // convert scoped packages: @amazon-devices/... -> ...
            newModuleName = moduleName.replace('@amazon-devices/', '');
          }

          // check for Amazon package custom renames
          switch (newModuleName) {
            case 'react-linear-gradient':
              newModuleName = 'react-native-linear-gradient';
              break;
          }

          console.log(`${moduleName} mapped to ${newModuleName}`);
          moduleName = newModuleName;
        }

        // check for polyfills
        const maybePolyfillPath = polyfills.find(
          polyfill => polyfill.name === moduleName,
        );
        if (maybePolyfillPath) {
          const polyfillFullPath = path.join(
            __dirname,
            'polyfills',
            maybePolyfillPath.path,
          );

          console.log(
            `${moduleName} resolved to polyfill at ${polyfillFullPath}`,
          );

          return {
            type: 'sourceFile',
            filePath: polyfillFullPath,
          };
        }
      }

      // fallback to default Metro resolver
      return context.resolveRequest(context, moduleName, platform);
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

const path = require('path');
const { loaderByName, addBeforeLoader } = require('@craco/craco');

module.exports = {
  webpack: {
    alias: {
      react: path.resolve('./node_modules/react')
    },
    configure: function(webpackConfig) {
      const graphqlLoader = {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: require.resolve('graphql-tag/loader')
      }

      addBeforeLoader(webpackConfig, loaderByName('file-loader'), graphqlLoader);
  
      return webpackConfig;
    }
  }
};

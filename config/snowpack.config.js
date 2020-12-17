const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  plugins: [
    [
      "@snowpack/plugin-babel",
      {
        "input": ['.js','.jsx'],
        transformOptions: {
        }
      }
    ],
    '@snowpack/plugin-react-refresh',
  ],
  installOptions: {
    treeshake: true,
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    clean: true,
  },
  mount: {
  },
  alias: {
    lodash$: "lodash-es",
    src: resolve('src'),
    assets: resolve('assets'),
    models: resolve('src/models'),
    utils: resolve('src/utils'),
    layouts: resolve('src/layouts'),
    services: resolve('src/services'),
    components: resolve('src/components'),
    common: resolve('src/common'),
  },
};

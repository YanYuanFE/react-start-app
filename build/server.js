/* eslint no-console: 0 */
import fs from 'fs';
import httpProxy from 'http-proxy';
import webpack from  'webpack';
import config from './webpack.dev.conf';
import webpackMiddleware from 'koa-webpack-dev-middleware';
import webpackHotMiddleware from 'koa-webpack-hot-middleware';
import path from 'path';

import Koa from  'koa';
import cors from 'kcors';
import convert from 'koa-convert';
import Router from 'koa-router';
import koaStatic from  'koa-static';
import compress from 'koa-compress';
import bodyParser from 'koa-bodyparser';
import send from 'koa-send';
import nodeCommandParams from 'node-command-params';

const app = new Koa();
app.use(compress());
app.use(bodyParser());
const router = new Router();

// runtime params
// proxy proxy backend server
const runtimeConfig = nodeCommandParams();
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(cors({ credentials: true }));

  app.use(convert(middleware));
  app.use(convert(webpackHotMiddleware(compiler)));

  router.all('*', async (ctx, next) => {
    await next();
  });

  // mocks
  router.use('*', async (ctx, next) => {
    try {
      let filePath = ctx.request.url + '.' + ctx.request.method + '.json';
      const rootDir = path.resolve(__dirname, '..', 'mocks');

      fs.accessSync(__dirname + '/../mocks' + filePath, fs.R_OK);
      await send(ctx, filePath, { root: rootDir });
    } catch (e) {
      await next();
    }
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  // Proxy api requests
  if (runtimeConfig.proxy) {
    app.use(async() => {
      await new Promise((resolve, reject) => {
        httpProxy.createProxyServer(runtimeConfig.proxy).web(this.req, this.res, function (err) {
          if (err) {
            return reject();
          }

          resolve();
        })
      })
    }); // ex: http://localhost:3100
  }
} else {
  app.use(koaStatic('dist'));

  app.use(router.get('*', async function (ctx, next) {
    await send(ctx, 'dist/index.html');
  }).routes());
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }

  console.info('==>   Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});

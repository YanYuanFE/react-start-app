import dva from 'dva';

import { createHashHistory } from 'history';
// user BrowserHistory
// import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import {createLogger} from 'redux-logger';
import 'dayjs/locale/zh-cn';

import './index.less';
// 1. Initialize
const app = dva({
  history: createHashHistory(),
});

// 2. Plugins
app.use(createLoading());
app.use({
  onAction: createLogger(),
});

// 3. Register global model
app.model(require('./models/global').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

window.onerror = function handleErr(message, source, lineno, colno, error) {
  console.dir(error);
  const info = {
    message: error.message,
    name: error.name,
  };
  const { stack } = error;
  const matchUrl = stack.match(/http:\/\/[^\n]*/)[0];
  [info.fileName] = matchUrl.match(/http:\/\/(?:\S*)\.js/);
  const [, row, column] = matchUrl.match(/:(\d+):(\d+)/);
  info.row = row;
  info.column = column;
  console.dir(info);
};

export default app._store; // eslint-disable-line

import dva from 'dva';
import { createHashHistory } from 'history';
import createLoading from 'dva-loading';
import {createLogger} from 'redux-logger';

import globalModel from './models/global';
import router from './router';

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
app.model(globalModel);

// 4. Router
app.router(router);

// 5. Start
app.start('#root');

export default app;

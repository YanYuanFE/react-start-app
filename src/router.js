import React from 'react';
import { routerRedux } from 'dva';
import { Route, Switch, Redirect } from "react-router-dom";
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';
import { map } from "lodash";
import { getRouterData } from './common/router';
import Authorized from './utils/Authorized';
import { getQueryPath } from './utils/utils';

const { AuthorizedRoute } = Authorized;
const { ConnectedRouter } = routerRedux;

export function RouterConfig(api) {
  const { history, app } = api;
  const routerData = getRouterData(app);
  const UserLayout = routerData['/user'].component;
  const BasicLayout = routerData['/'].component;
  return (
    <ConfigProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/user" render={props => <UserLayout {...props} routerData={routerData} />} />
          <AuthorizedRoute
            path="/"
            render={props => <BasicLayout {...props} routerData={routerData} />}
            authority={['admin', 'user']}
            redirectPath={getQueryPath('/user/login', {
              redirect: window.location.href,
            })}
          />
        </Switch>
      </ConnectedRouter>
    </ConfigProvider>
  );
}

const RouteWithSubRoutes = (route) => {
  const Comp = route.component;
  return (
    <Route
      path={route.path}
      render={(props) => {
        return route.redirect ? (
          <Redirect to={route.redirect} />
        ) : Comp ? (
          <Comp {...props} route={route}>
            <DynamicRoute routes={route.routes} />
          </Comp>
        ) : (
          <>
            <DynamicRoute routes={route.routes} />
          </>
        );
      }}
    />
  );
};

const DynamicRoute = ({ routes }) => {
  if (!routes) return null;

  return (
    <Switch>
      {map(routes, (route, index) => {
        return <RouteWithSubRoutes key={index} {...route} />;
      })}
    </Switch>
  );
};

const App = ({ history, app }) => {
  const routes = getRouterData(app);
  return (
    <ConfigProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <DynamicRoute routes={routes} />
      </ConnectedRouter>
    </ConfigProvider>
  );
};

export default App;

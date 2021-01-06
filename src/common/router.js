import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import dynamic from 'dva/dynamic';
import {DashboardOutlined, UserOutlined, WarningOutlined} from "@ant-design/icons";

export const modelNotExisted = (app, model) =>
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic

const Loading = () => <Spin size="large" className="global-spin" />;

const dynamicWrapper = (app, models, component) => {
  return dynamic({
    app,
    models: () => models.map(model => {
      return import(`../models/${model}`);
    }),
    component,
    LoadingComponent: Loading,
  })
};

export const load = (factory) => {
  const Comp = lazy(factory);

  const Dynamic = (props) => (
    <Suspense fallback={<Spin size="large" className="global-spin" />}>
      <Comp {...props} />
    </Suspense>
  );
  return Dynamic;
};


export const getRouterData = app => {
  const routerData = [
    {
      path: '/user',
      name: '账户',
      icon: <UserOutlined />,
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
      routes: [
        {
          path: '/user/login',
          name: '登录',
          component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
        },
        {
          path: '/user/register',
          name: '注册',
          component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
        },
        {
          path: '/user',
          redirect: '/user/login',
        },
      ],
    },
    {
      path: '/',
      component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
      // '/': {
      //   component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/MenuLayout')),
      // },
      routes: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          icon: <DashboardOutlined />,
          routes: [
            {
              path: '/dashboard/analysis',
              name: '分析页',
              component: dynamicWrapper(app, [], () => import('../routes/Dashboard/Analysis')),
            },
            {
              path: '/dashboard/monitor',
              name: '监控页',
              component: dynamicWrapper(app, [], () => import('../routes/Dashboard/Monitor')),
            },
            {
              path: '/dashboard/workplace',
              name: '工作台',
              component: dynamicWrapper(app, [], () => import('../routes/Dashboard/Workplace')),
            },
            {
              path: '/dashboard',
              redirect: '/dashboard/analysis',
            },
          ],
        },
        {
          path: '/exception',
          name: '异常页',
          icon: <WarningOutlined />,
          routes: [
            {
              path: '/exception/403',
              name: '403',
              component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
            },
            {
              path: '/exception/404',
              name: '404',
              component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
            },
            {
              path: '/exception/500',
              name: '500',
              component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
            },
          ],
        },
        {
          path: '/',
          redirect: '/dashboard/analysis',
        },
      ],
    },
  ];
  return routerData;
};

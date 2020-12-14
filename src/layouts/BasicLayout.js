import React from 'react';
import { Layout, message } from 'antd';
import {CopyrightOutlined, GithubOutlined} from "@ant-design/icons";
import { router, routerRedux, useSelector, useDispatch, useLocation, useRouteMatch } from 'dva';
import {pathToRegexp} from 'path-to-regexp';
import { useMediaQuery } from 'react-responsive';
import {DocumentTitle} from '../components/DocumentTitle';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SiderMenu from '../components/SiderMenu';
import NotFound from '../routes/Exception/404';
import { getRoutes } from '../utils/utils';
import Authorized from '../utils/Authorized';
import { getMenuData } from '../common/menu';
import logo from '../assets/logo.svg';

const { Content, Header, Footer } = Layout;
const { AuthorizedRoute, check } = Authorized;
const { Route, Redirect, Switch } = router;

/**
 * 根据菜单取得重定向地址.
 */
const redirectData = [];
const getRedirect = item => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `${item.path}`,
        to: `${item.children[0].path}`,
      });
      item.children.forEach(children => {
        getRedirect(children);
      });
    }
  }
};
getMenuData().forEach(getRedirect);

/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 * @param {Object} routerData 路由配置
 */
export const getBreadcrumbNameMap = (menuData, routerData) => {
  const result = {};
  let childResult = {};
  for (const i of menuData) {
    if (!routerData[i.path]) {
      result[i.path] = i;
    }
    if (i.children) {
      childResult = getBreadcrumbNameMap(i.children, routerData);
    }
  }
  return {...routerData, ...result, ...childResult};
};

export const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
};

const BasicLayout = ({routerData}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const match = useRouteMatch();
  const currentUser = useSelector(({user}) => user.currentUser);
  const collapsed = useSelector(({global}) => global.collapsed);
  const fetchingNotices = useSelector(({loading}) => loading.effects['global/fetchNotices']);
  const notices = useSelector(({global}) => global.notices);

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  // const getChildContext = () => {
  //   return {
  //     location,
  //     breadcrumbNameMap: getBreadcrumbNameMap(getMenuData(), routerData),
  //   };
  // }

  const getPageTitle = () => {
    console.log(routerData)
    const { pathname } = location;
    let title = 'Ant Design Pro';
    let currRouterData = null;
    // match params path
    Object.keys(routerData).forEach(key => {
      if (pathToRegexp(key).test(pathname)) {
        currRouterData = routerData[key];
      }
    });
    if (currRouterData && currRouterData.name) {
      title = `${currRouterData.name} - Ant Design Pro`;
    }
    return title;
  }

  const getBashRedirect = () => {
    // According to the url parameter to redirect
    // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
    const urlParams = window.location.href.split('?redirect');

    const redirect = urlParams[1] && urlParams[1].substr(1);
    // Remove the parameters in the url
    if (redirect) {
      window.history.replaceState(null, 'redirect', redirect);
    } else {
      // get the first authorized route path in routerData
      const authorizedPath = Object.keys(routerData).find(
        item => check(routerData[item].authority, item) && item !== '/'
      );
      return authorizedPath;
    }
    return redirect;
  };

  const handleMenuCollapse = (isCollapsed) => {
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: isCollapsed,
    });
  };

  const handleNoticeClear = type => {
    message.success(`清空了${type}`);
    dispatch({
      type: 'global/clearNotices',
      payload: type,
    });
  };

  const handleMenuClick = ({ key }) => {
    if (key === 'triggerError') {
      dispatch(routerRedux.push('/exception/trigger'));
      return;
    }
    if (key === 'logout') {
      dispatch({
        type: 'login/logout',
      });
    }
  };

  const handleNoticeVisibleChange = visible => {
    if (visible) {
      dispatch({
        type: 'global/fetchNotices',
      });
    }
  };


  const bashRedirect = getBashRedirect();
  console.log(routerData);
  const layout = (
    <Layout>
      <SiderMenu
        logo={logo}
        // 不带Authorized参数的情况下如果没有权限,会强制跳到403界面
        // If you do not have the Authorized parameter
        // you will be forced to jump to the 403 interface without permission
        Authorized={Authorized}
        menuData={getMenuData()}
        collapsed={collapsed}
        location={location}
        isMobile={isMobile}
        onCollapse={handleMenuCollapse}
      />
      <Layout>
        <Header style={{ padding: 0 }}>
          <GlobalHeader
            logo={logo}
            currentUser={currentUser}
            fetchingNotices={fetchingNotices}
            notices={notices}
            collapsed={collapsed}
            isMobile={isMobile}
            onNoticeClear={handleNoticeClear}
            onCollapse={handleMenuCollapse}
            onMenuClick={handleMenuClick}
            onNoticeVisibleChange={handleNoticeVisibleChange}
          />
        </Header>
        <Content style={{ margin: '24px 24px 0', height: '100%' }}>
          <Switch>
            {redirectData.map(item => (
              <Redirect key={item.from} exact from={item.from} to={item.to} />
            ))}
            {getRoutes(match.path, routerData).map(item => (
              <AuthorizedRoute
                key={item.key}
                path={item.path}
                component={item.component}
                exact={item.exact}
                authority={item.authority}
                redirectPath="/exception/403"
              />
            ))}
            <Redirect exact from="/" to={bashRedirect} />
            <Route render={NotFound} />
          </Switch>
        </Content>
        <Footer style={{ padding: 0 }}>
          <GlobalFooter
            links={[
              {
                key: 'Pro 首页',
                title: 'Pro 首页',
                href: 'http://pro.ant.design',
                blankTarget: true,
              },
              {
                key: 'github',
                title: <GithubOutlined />,
                href: 'https://github.com/ant-design/ant-design-pro',
                blankTarget: true,
              },
              {
                key: 'Ant Design',
                title: 'Ant Design',
                href: 'http://ant.design',
                blankTarget: true,
              },
            ]}
            copyright={
              <>
                Copyright <CopyrightOutlined /> 2018 蚂蚁金服体验技术部出品
              </>
            }
          />
        </Footer>
      </Layout>
    </Layout>
  );

  return (
    <DocumentTitle title={getPageTitle()}>
      {layout}
    </DocumentTitle>
  );
}

export default BasicLayout;

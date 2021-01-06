import React from 'react';
import {CopyrightOutlined, GithubOutlined} from "@ant-design/icons";
import ProLayout, { DefaultFooter, getPageTitle } from "@ant-design/pro-layout";
import { useDispatch } from 'dva';
import { useLocation, Link } from 'react-router-dom';
import {DocumentTitle} from '../components/DocumentTitle';
import Authorized from '../utils/Authorized';
import logo from '../assets/logo.svg';
import defaultSettings from '../common/setting';
import RightContent from "../components/GlobalHeader/RightContent";

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

const footerDom = (
<DefaultFooter
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
)

const BasicLayout = ({route, children}) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const title = getPageTitle({
    pathname: location.pathname,
  });

  const handleMenuCollapse = (isCollapsed) => {
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: isCollapsed,
    });
  };
  console.log(route, location)

  return (
    <DocumentTitle title={title}>
      <ProLayout
        title={defaultSettings.title}
        logo={logo}
        location={location}
        route={route}
        footerRender={() => footerDom}
        onCollapse={handleMenuCollapse}
        menuItemRender={(item, dom) => {
          return <Link to={item.path}>{dom}</Link>;
        }}
        rightContentRender={() => <RightContent theme={defaultSettings.navTheme} layout={defaultSettings.layout} />}
      >
        <Authorized authority={undefined} noMatch={<span>403</span>}>
          {children}
        </Authorized>
      </ProLayout>
    </DocumentTitle>
  );
}

export default BasicLayout;

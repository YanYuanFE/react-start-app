import React from 'react';
import { router } from 'dva';
import {CopyrightOutlined} from "@ant-design/icons";
import {DocumentTitle} from '../components/DocumentTitle';
import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';
import {getPageTitle} from "@ant-design/pro-layout";

const { Link } = router;

const links = [
  {
    key: 'help',
    title: '帮助',
    href: '',
  },
  {
    key: 'privacy',
    title: '隐私',
    href: '',
  },
  {
    key: 'terms',
    title: '条款',
    href: '',
  },
];

const copyright = (
  <>
    Copyright <CopyrightOutlined /> 2018 蚂蚁金服体验技术部出品
  </>
);

const UserLayout = ({ location, children }) => {
  const title = getPageTitle({
    pathname: location.pathname,
  });

  return (
    <DocumentTitle title={title}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>Ant Design</span>
              </Link>
            </div>
            <div className={styles.desc}>Ant Design 是西湖区最具影响力的 Web 设计规范</div>
          </div>
          {children}
        </div>
        <GlobalFooter links={links} copyright={copyright} />
      </div>
    </DocumentTitle>
  );
}

export default UserLayout;

import React, {useEffect} from 'react';
import { Tabs } from 'antd';
import {useLoginContext} from "./index";

const { TabPane } = Tabs;

const generateId = (() => {
  let i = 0;
  return (prefix = '') => {
    i += 1;
    return `${prefix}${i}`;
  };
})();

const LoginTab = (props) => {
  const {tabUtil} = useLoginContext();

  useEffect(()=> {
    const uniqueId = generateId('login-tab-');
    if (tabUtil) {
      tabUtil.addTab(uniqueId);
    }
  }, []);

  return <TabPane {...props} />;
}

LoginTab.ANT_PRO_LOGIN_TAB = true;

export default LoginTab;

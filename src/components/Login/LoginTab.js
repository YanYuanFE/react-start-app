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
  const uniqueId = generateId('login-tab-');

  useEffect(()=> {
    if (tabUtil) {
      tabUtil.addTab(uniqueId);
    }
  }, [tabUtil, uniqueId]);

  return <TabPane {...props} />;
}

LoginTab.ANT_PRO_LOGIN_TAB = true;

export default LoginTab;

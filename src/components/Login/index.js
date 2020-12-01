import React, {createContext, useContext, useState} from 'react';
import { Form, Tabs } from 'antd';
import classNames from 'classnames';
import LoginItem from './LoginItem';
import LoginTab from './LoginTab';
import LoginSubmit from './LoginSubmit';
import styles from './index.less';

const LoginContext = createContext();
const LoginProvider = LoginContext.Provider;
export const useLoginContext = () => useContext(LoginContext);

const Login = ({
 className = '',
 defaultActiveKey = '',
 onTabChange = () => {},
  onSubmit = () => {},
  children,
}) => {
  const [form] = Form.useForm();
  const [type, setType] = useState(defaultActiveKey);
  const [tabs, setTabs] = useState([]);
  const [active, setActive] = useState({});

  const getContext = () => {
    return {
      tabUtil: {
        addTab: id => {
          setTabs([...tabs, id]);
        },
        removeTab: id => {
          setTabs(tabs.filter(currentId => currentId !== id));
        },
      },
      updateActive: activeItem => {
        if (active[type]) {
          active[type].push(activeItem);
        } else {
          active[type] = [activeItem];
        }
        setActive(active)
      },
    };
  }

  const onSwitch = (t) => {
    // const { onTabChange } = this.props;
    setType(t);
    onTabChange(t);
  };

  const handleSubmit = (values) => {
    onSubmit(values);
  };

  const TabChildren = [];
  const otherChildren = [];
  React.Children.forEach(children, item => {
    if (!item) {
      return;
    }
    if (item.type.ANT_PRO_LOGIN_TAB) {
      TabChildren.push(item);
    } else {
      otherChildren.push(item);
    }
  });

  return (
    <LoginProvider value={getContext()}>
      <div className={classNames(className, styles.login)}>
        <Form onFinish={handleSubmit} form={form} name="login">
          {tabs.length ? (
            <div>
              <Tabs
                animated={false}
                className={styles.tabs}
                activeKey={type}
                onChange={onSwitch}
              >
                {TabChildren}
              </Tabs>
              {otherChildren}
            </div>
          ) : (
            [...children]
          )}
        </Form>
      </div>
    </LoginProvider>
  );
}

Login.Tab = LoginTab;
Login.Submit = LoginSubmit;
Object.keys(LoginItem).forEach(item => {
  Login[item] = LoginItem[item];
});

export default Login;

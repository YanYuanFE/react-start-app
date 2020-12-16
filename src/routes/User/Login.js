import React, {useState} from 'react';
import {connect, router, useDispatch} from 'dva';
import { Checkbox, Alert } from 'antd';
import {AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined} from "@ant-design/icons";
import Login from 'components/Login';
import styles from './Login.less';

const { Link } = router;
const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;


const LoginPage = ({login, submitting}) => {
  const dispatch = useDispatch();
  const [type, setType] = useState('account');
  const [autoLogin, setAutoLogin] = useState(true);


  const onTabChange = type => {
    setType(type);
  };

  const handleSubmit = (err, values) => {
    if (!err) {
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  const changeAutoLogin = e => {
    setAutoLogin(e.target.checked);
  };

  const renderMessage = content => {
    return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
  };

  return (
    <div className={styles.main}>
      <Login defaultActiveKey={type} onTabChange={onTabChange} onSubmit={handleSubmit}>
        <Tab key="account" tab="账户密码登录">
          {login.status === 'error' &&
          login.type === 'account' &&
          !login.submitting &&
          renderMessage('账户或密码错误（admin/888888）')}
          <UserName name="userName" placeholder="admin/user" />
          <Password name="password" placeholder="888888/123456" />
        </Tab>
        <Tab key="mobile" tab="手机号登录">
          {login.status === 'error' &&
          login.type === 'mobile' &&
          !login.submitting &&
          renderMessage('验证码错误')}
          <Mobile name="mobile" />
          <Captcha name="captcha" />
        </Tab>
        <div>
          <Checkbox checked={autoLogin} onChange={changeAutoLogin}>
            自动登录
          </Checkbox>
          <a style={{ float: 'right' }} href="">
            忘记密码
          </a>
        </div>
        <Submit loading={submitting}>登录</Submit>
        <div className={styles.other}>
          其他登录方式
          <AlipayCircleOutlined className={styles.icon} type="alipay-circle" />
          <TaobaoCircleOutlined className={styles.icon} type="taobao-circle" />
          <WeiboCircleOutlined className={styles.icon} type="weibo-circle" />
          <Link className={styles.register} to="/user/register">
            注册账户
          </Link>
        </div>
      </Login>
    </div>
  );
}

export default connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))(LoginPage);

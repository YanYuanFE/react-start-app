import React from 'react';
import { Input } from 'antd';
import { UserOutlined, LockOutlined, MobileOutlined, MailOutlined } from "@ant-design/icons";
import styles from './index.less';

const map = {
  UserName: {
    component: Input,
    props: {
      size: 'large',
      prefix: <UserOutlined className={styles.prefixIcon} />,
      placeholder: 'admin',
    },
    rules: [
      {
        required: true,
        message: 'Please enter username!',
      },
    ],
  },
  Password: {
    component: Input,
    props: {
      size: 'large',
      prefix: <LockOutlined className={styles.prefixIcon} />,
      type: 'password',
      placeholder: '888888',
    },
    rules: [
      {
        required: true,
        message: 'Please enter password!',
      },
    ],
  },
  Mobile: {
    component: Input,
    props: {
      size: 'large',
      prefix: <MobileOutlined className={styles.prefixIcon} />,
      placeholder: 'mobile number',
    },
    rules: [
      {
        required: true,
        message: 'Please enter mobile number!',
      },
      {
        pattern: /^1\d{10}$/,
        message: 'Wrong mobile number format!',
      },
    ],
  },
  Captcha: {
    component: Input,
    props: {
      size: 'large',
      prefix: <MailOutlined className={styles.prefixIcon} />,
      placeholder: 'captcha',
    },
    rules: [
      {
        required: true,
        message: 'Please enter Captcha!',
      },
    ],
  },
};

export default map;

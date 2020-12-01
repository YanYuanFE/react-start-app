import React, {useEffect, useState} from 'react';
import {connect, router, routerRedux, useDispatch} from 'dva';
import { Form, Input, Button, Select, Row, Col, Popover, Progress } from 'antd';
import styles from './Register.less';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;
const { Link } = router;

const passwordStatusMap = {
  ok: <div className={styles.success}>强度：强</div>,
  pass: <div className={styles.warning}>强度：中</div>,
  poor: <div className={styles.error}>强度：太短</div>,
};

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

const Register = ({register, submitting}) => {
  let interval = null;
  const [form] = Form.useForm();
  const [count, setCount] = useState(0);
  const [confirmDirty] = useState(false);
  const [visible, setVisible] = useState(false);
  const [help, setHelp] = useState("");
  const [prefix, setPrefix] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const account = form.getFieldValue('mail');
    if (register.status === 'ok') {
      dispatch(
        routerRedux.push({
          pathname: '/user/register-result',
          state: {
            account,
          },
        })
      );
    }
  }, [register, form, dispatch]);

  useEffect(() => {
    return () => {
      clearInterval(interval);
    }
  }, [interval]);

  const onGetCaptcha = () => {
    let c = 59;
    setCount(c);
    interval = setInterval(() => {
      c -= 1;
      setCount(c);
      if (c === 0) {
        clearInterval(interval);
      }
    }, 1000);
  };

  const getPasswordStatus = () => {
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  const handleSubmit = (values) => {
    dispatch({
      type: 'register/submit',
      payload: {
        ...values,
        prefix,
      },
    });
  };

  // const handleConfirmBlur = e => {
  //   const { value } = e.target;
  //   setConfirm(confirmDirty || !!value);
  // };

  const checkConfirm = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不匹配!');
    } else {
      callback();
    }
  };

  const checkPassword = (rule, value, callback) => {
    if (!value) {
      setHelp("请输入密码！");
      setVisible(!!value);
      callback('error');
    } else {
      setHelp("");
      if (!visible) {
        setVisible(!!value);
      }
      if (value.length < 6) {
        callback('error');
      } else {
        if (value && confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
    }
  };

  const changePrefix = value => {
    setPrefix(value);
  };

  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  return (
    <div className={styles.main}>
      <h3>注册</h3>
      <Form onFinish={handleSubmit} form={form}>
        <FormItem
          name="mail"
          rules={[
          {
            required: true,
            message: '请输入邮箱地址！',
          },
          {
            type: 'email',
            message: '邮箱地址格式错误！',
          },
        ]}
        >
          <Input size="large" placeholder="邮箱" />
        </FormItem>
        <FormItem
          help={help}
          name="password"
          rules={[
          {
            validator: checkPassword,
          },
        ]}
        >
          <Popover
            content={
              <div style={{ padding: '4px 0' }}>
                {passwordStatusMap[getPasswordStatus()]}
                {renderPasswordProgress()}
                <div style={{ marginTop: 10 }}>
                  请至少输入 6 个字符。请不要使用容易被猜到的密码。
                </div>
              </div>
            }
            overlayStyle={{ width: 240 }}
            placement="right"
            visible={visible}
          >
            <Input size="large" type="password" placeholder="至少6位密码，区分大小写" />
          </Popover>
        </FormItem>
        <FormItem
          name="confirm"
          rules={[
          {
            required: true,
            message: '请确认密码！',
          },
          {
            validator: checkConfirm,
          },
        ]}
        >
          <Input size="large" type="password" placeholder="确认密码" />
        </FormItem>
        <FormItem
          name="mobile"
          rules={[
          {
            required: true,
            message: '请输入手机号！',
          },
          {
            pattern: /^1\d{10}$/,
            message: '手机号格式错误！',
          },
        ]}
        >
          <InputGroup compact>
            <Select
              size="large"
              value={prefix}
              onChange={changePrefix}
              style={{ width: '20%' }}
            >
              <Option value="86">+86</Option>
              <Option value="87">+87</Option>
            </Select>
            <Input size="large" style={{ width: '80%' }} placeholder="11位手机号" />
          </InputGroup>
        </FormItem>
        <FormItem
          name="captcha"
          rules={[
          {
            required: true,
            message: '请输入验证码！',
          },
        ]}
        >
          <Row gutter={8}>
            <Col span={16}>
              <Input size="large" placeholder="验证码" />
            </Col>
            <Col span={8}>
              <Button
                size="large"
                disabled={count}
                className={styles.getCaptcha}
                onClick={onGetCaptcha}
              >
                {count ? `${count} s` : '获取验证码'}
              </Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Button
            size="large"
            loading={submitting}
            className={styles.submit}
            type="primary"
            htmlType="submit"
          >
            注册
          </Button>
          <Link className={styles.login} to="/user/login">
            使用已有账户登录
          </Link>
        </FormItem>
      </Form>
    </div>
  );
}

export default connect(({ register, loading }) => ({
  register,
  submitting: loading.effects['register/submit'],
}))(Register);

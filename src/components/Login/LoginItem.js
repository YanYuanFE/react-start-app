import React, {useEffect, useRef, useState} from 'react';
import { Form, Button, Row, Col } from 'antd';
import {omit} from 'lodash';
import styles from './index.less';
import map from './map';
import {useLoginContext} from "./index";

const FormItem = Form.Item;

function generator({ defaultProps, defaultRules, type }) {
  return WrappedComponent => {
    const BasicComponent = (props) => {
      const { updateActive } = useLoginContext();
      const { onChange, defaultValue, rules, name, onGetCaptcha, ...restProps } = props;
      const intervalRef = useRef();
      // static contextTypes = {
      //   form: PropTypes.object,
      //   updateActive: PropTypes.func,
      // };
      const [count, setCount] = useState(0);

      useEffect(() => {
        if (updateActive) {
          updateActive(name);
        }
        return () => {
          clearInterval(intervalRef.current);
        }
      }, [updateActive, name]);

      const handleOnGetCaptcha = () => {
        let c = 59;
        setCount(c);
        if (onGetCaptcha) {
          onGetCaptcha();
        }
        intervalRef.current = setInterval(() => {
          c -= 1;
          setCount(c);
          if (count === 0) {
            clearInterval(intervalRef.current);
          }
        }, 1000);
      };

      const options = {};
      let otherProps = {};
      options.rules = rules || defaultRules;
      if (onChange) {
        options.onChange = onChange;
      }
      if (defaultValue) {
        options.initialValue = defaultValue;
      }
      otherProps = restProps || otherProps;
      if (type === 'Captcha') {
        const inputProps = omit(otherProps, "onGetCaptcha");
        return (
          <FormItem name={name} {...options}>
            <Row gutter={8}>
              <Col span={16}>
                <WrappedComponent {...defaultProps} {...inputProps} />
              </Col>
              <Col span={8}>
                <Button
                  disabled={count}
                  className={styles.getCaptcha}
                  size="large"
                  onClick={handleOnGetCaptcha}
                >
                  {count ? `${count} s` : '获取验证码'}
                </Button>
              </Col>
            </Row>
          </FormItem>
        );
      }
      return (
        <FormItem name={name} {...options}>
          <WrappedComponent {...defaultProps} {...otherProps} />
        </FormItem>
      );
    };
    return BasicComponent;
  };
}

const LoginItem = {};
Object.keys(map).forEach(item => {
  LoginItem[item] = generator({
    defaultProps: map[item].props,
    defaultRules: map[item].rules,
    type: item,
  })(map[item].component);
});

export default LoginItem;

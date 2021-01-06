import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Menu, Spin } from "antd";
import React from "react";
import { useSelector, useDispatch, useHistory } from "dva";
import HeaderDropdown from "../HeaderDropdown";
import styles from "./index.less";
import avatar from "../../assets/logo.svg";

const AvatarDropdown = ({ menu }) => {
  const currentUser = useSelector(({ user }) => user.currentUser);
  const history = useHistory();
  const dispatch = useDispatch();
  const onMenuClick = (event) => {
    const { key } = event;
    if (key === "logout") {
      dispatch({
        type: "auth/logout",
      });
      return;
    }

    if (key === "settings") {
      history.push("/settings");

      return;
    }

    history.push(`/auth/${key}`);
  };

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <>
          <Menu.Item key="settings">
            <SettingOutlined />
            个人设置
          </Menu.Item>
          <Menu.Divider />
        </>
      )}

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return currentUser && currentUser.name ? (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={avatar} alt="avatar" />
        <span className={`${styles.name} anticon`}>{currentUser.name}</span>
      </span>
    </HeaderDropdown>
  ) : (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );
};

export default AvatarDropdown;

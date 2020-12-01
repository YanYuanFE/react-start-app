import React, { PureComponent } from 'react';
import { Menu, Spin, Tag, Dropdown, Avatar, Divider, Tooltip } from 'antd';
import { QuestionCircleOutlined, MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, SettingOutlined, CloseCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import moment from 'moment';
import {groupBy} from 'lodash';
// import Debounce from 'lodash-decorators/debounce';
import { router } from 'dva';
import NoticeIcon from '../NoticeIcon';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';

const { Link } = router;

export default class GlobalHeader extends PureComponent {
  // componentWillUnmount() {
  //   this.triggerResizeEvent.cancel();
  // }

  getNoticeData() {
    const { notices } = this.props;
    if (notices == null || notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      // transform id to item key
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    // this.triggerResizeEvent();
  };
  /* eslint-disable*/
  // @Debounce(600)
  // triggerResizeEvent() {
  //   const event = document.createEvent('HTMLEvents');
  //   event.initEvent('resize', true, false);
  //   window.dispatchEvent(event);
  // }
  render() {
    const {
      currentUser = {},
      collapsed,
      fetchingNotices,
      isMobile,
      logo,
      onNoticeVisibleChange,
      onMenuClick,
      onNoticeClear,
    } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item disabled>
          <UserOutlined />个人中心
        </Menu.Item>
        <Menu.Item disabled>
          <SettingOutlined />设置
        </Menu.Item>
        <Menu.Item key="triggerError">
          <CloseCircleOutlined />触发报错
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <LogoutOutlined />退出登录
        </Menu.Item>
      </Menu>
    );
    const noticeData = this.getNoticeData();
    return (
      <div className={styles.header}>
        {isMobile && [
          <Link to="/" className={styles.logo} key="logo">
            <img src={logo} alt="logo" width="32" />
          </Link>,
          <Divider type="vertical" key="line" />,
        ]}
        {
          collapsed ? <MenuUnfoldOutlined className={styles.trigger} onClick={this.toggle}/> : <MenuFoldOutlined className={styles.trigger} onClick={this.toggle}/>
        }
        <div className={styles.right}>
          <HeaderSearch
            className={`${styles.action} ${styles.search}`}
            placeholder="站内搜索"
            defaultValue="umi ui"
            options={
              [
                {
                  label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>,
                  value: 'umi ui',
                },
                {
                  label: <a href="next.ant.design">Ant Design</a>,
                  value: 'Ant Design',
                },
                {
                  label: <a href="https://protable.ant.design/">Pro Table</a>,
                  value: 'Pro Table',
                },
                {
                  label: <a href="https://prolayout.ant.design/">Pro Layout</a>,
                  value: 'Pro Layout',
                },
              ]
            }
            onSearch={value => {
              console.log('input', value); // eslint-disable-line
            }}
          />
          <Tooltip title="使用文档">
            <a
              target="_blank"
              href="http://pro.ant.design/docs/getting-started"
              rel="noopener noreferrer"
              className={styles.action}
            >
              <QuestionCircleOutlined />
            </a>
          </Tooltip>
          <NoticeIcon
            className={styles.action}
            count={currentUser.notifyCount}
            onItemClick={(item, tabProps) => {
              console.log(item, tabProps); // eslint-disable-line
            }}
            onClear={onNoticeClear}
            onPopupVisibleChange={onNoticeVisibleChange}
            loading={fetchingNotices}
            popupAlign={{ offset: [20, -16] }}
          >
            <NoticeIcon.Tab
              list={noticeData['通知']}
              title="通知"
              emptyText="你已查看所有通知"
              emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
            />
            <NoticeIcon.Tab
              list={noticeData['消息']}
              title="消息"
              emptyText="您已读完所有消息"
              emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
            />
            <NoticeIcon.Tab
              list={noticeData['待办']}
              title="待办"
              emptyText="你已完成所有待办"
              emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
            />
          </NoticeIcon>
          {currentUser.name ? (
            <Dropdown overlay={menu}>
              <span className={`${styles.action} ${styles.account}`}>
                <Avatar size="small" className={styles.avatar} src={currentUser.avatar} />
                <span className={styles.name}>{currentUser.name}</span>
              </span>
            </Dropdown>
          ) : (
            <Spin size="small" style={{ marginLeft: 8 }} />
          )}
        </div>
      </div>
    );
  }
}

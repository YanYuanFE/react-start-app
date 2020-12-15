import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import {pathToRegexp} from 'path-to-regexp';
import { router } from 'dva';
import styles from './index.less';
import { urlToList } from '../_utils/pathTools';

const { Sider } = Layout;
const { SubMenu } = Menu;
const { Link } = router;

// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />,
const getIcon = icon => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" className={`${styles.icon} sider-menu-item-img`} />;
  }
  if (typeof icon === 'string') {
    // return <Icon type={icon} />;
  }
  return icon;
};

/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => {path,path2}
 * @param  menu
 */
export const getFlatMenuKeys = menu =>
  menu.reduce((keys, item) => {
    keys.push(item.path);
    if (item.children) {
      return keys.concat(getFlatMenuKeys(item.children));
    }
    return keys;
  }, []);

/**
 * Find all matched menu keys based on paths
 * @param  flatMenuKeys: [/abc, /abc/:id, /abc/:id/info]
 * @param  paths: [/abc, /abc/11, /abc/11/info]
 */
export const getMenuMatchKeys = (flatMenuKeys, paths) => {
  return paths.reduce(
    (matchKeys, path) =>
      matchKeys.concat(flatMenuKeys.filter(item => {
        return pathToRegexp(item).test(path);
      })),
    []
  )
};

const SiderMenu = ({ logo, collapsed, menuData, location, isMobile, onCollapse, Authorized }) => {
  const menus = menuData;
  const flatMenuKeys = getFlatMenuKeys(menuData);

  /**
   * Convert pathname to openKeys
   * /list/search/articles = > ['list','/list/search']
   * @param  props
   */
  const getDefaultCollapsedSubMenus = () => {
    return getMenuMatchKeys(flatMenuKeys, urlToList(location.pathname));
  };

  const [openKeys, setKeys] = useState(() => {
    return getDefaultCollapsedSubMenus();
  });

  useEffect(() => {
    setKeys(getDefaultCollapsedSubMenus());
  }, [location.pathname]);

  const getMenuItemPath = (item) => {
    const itemPath = conversionPath(item.path);
    const icon = getIcon(item.icon);
    const { target, name } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }

    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === location.pathname}
        onClick={
          isMobile
            ? () => {
              onCollapse(true);
            }
            : undefined
        }
      >
        {icon}
        <span>{name}</span>
      </Link>
    );
  };

  const getSubMenuOrItem = (item) => {
    if (item.children && item.children.some((child) => child.name)) {
      const childrenItems = getNavMenuItems(item.children);
      // 当无子菜单时就不展示菜单
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  {getIcon(item.icon)}
                  <span>{item.name}</span>
                </span>
              ) : (
                item.name
              )
            }
            key={item.path}
          >
            {childrenItems}
          </SubMenu>
        );
      }
      return null;
    } else {
      return <Menu.Item key={item.path}>{getMenuItemPath(item)}</Menu.Item>;
    }
  };

  /**
   * 获得菜单子节点
   * @memberof SiderMenu
   */
  const getNavMenuItems = (menusData) => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter((item) => item.name && !item.hideInMenu)
      .map((item) => {
        // make dom
        const ItemDom = getSubMenuOrItem(item);
        return checkPermissionItem(item.authority, ItemDom);
      })
      .filter((item) => item);
  };

  // Get the currently selected menu
  const getSelectedMenuKeys = () => {
    return getMenuMatchKeys(flatMenuKeys, urlToList(location.pathname));
  };

  // conversion Path
  // 转化路径
  const conversionPath = (path) => {
    if (path && path.indexOf("http") === 0) {
      return path;
    } else {
      return `/${path || ""}`.replace(/\/+/g, "/");
    }
  };

  // permission to check
  const checkPermissionItem = (authority, ItemDom) => {
    if (Authorized && Authorized.check) {
      const { check } = Authorized;
      return check(authority, ItemDom);
    }
    return ItemDom;
  };

  const isMainMenu = (key) => {
    return menus.some((item) => key && (item.key === key || item.path === key));
  };

  const handleOpenChange = (openKeys) => {
    const lastOpenKey = openKeys[openKeys.length - 1];
    const moreThanOne = openKeys.filter((openKey) => isMainMenu(openKey)).length > 1;
    setKeys(moreThanOne ? [lastOpenKey] : [...openKeys]);
  };

  // Don't show popup menu when it is been collapsed
  const menuProps = collapsed
    ? {}
    : {
      openKeys,
    };
  // if pathname can't match, use the nearest parent's key
  let selectedKeys = getSelectedMenuKeys();
  if (!selectedKeys.length) {
    selectedKeys = [openKeys[openKeys.length - 1]];
  }
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      onCollapse={onCollapse}
      width={256}
      className={styles.sider}
    >
      <div className={styles.logo} key="logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <Menu
        key="Menu"
        theme="dark"
        mode="inline"
        {...menuProps}
        onOpenChange={handleOpenChange}
        selectedKeys={selectedKeys}
        style={{ padding: "16px 0", width: "100%" }}
      >
        {getNavMenuItems(menus)}
      </Menu>
    </Sider>
  );
};

export default SiderMenu;

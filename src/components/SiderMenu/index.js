import React from 'react';
import Drawer from 'rc-drawer';
import 'rc-drawer/assets/index.css';
import SiderMenu from './SiderMenu';

const SiderMenuWrapper = ({isMobile, collapsed, onCollapse, ...other}) =>
  isMobile ? (
    <Drawer
      handler={false}
      level={null}
      open={!collapsed}
      onMaskClick={() => {
        onCollapse(true);
      }}
      width="256px"
    >
      <SiderMenu {...{isMobile, collapsed, onCollapse, ...other}} collapsed={isMobile ? false : collapsed} />
    </Drawer>
  ) : (
    <SiderMenu {...{isMobile, collapsed, onCollapse, ...other}} />
  );

export default SiderMenuWrapper;

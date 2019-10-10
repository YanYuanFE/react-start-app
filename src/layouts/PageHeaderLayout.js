import React from 'react';
import { router } from 'dva';
import PageHeader from '../components/PageHeader';
import styles from './PageHeaderLayout.less';

const { Link } = router;

export default ({ children, wrapperClassName, top, ...restProps }) => (
  <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
    {top}
    <PageHeader key="pageheader" {...restProps} linkElement={Link} />
    {children ? <div className={styles.content}>{children}</div> : null}
  </div>
);

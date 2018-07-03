import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { loadData, recordPath } from '../../redux/actions/user';
import { connect } from 'react-redux';
import API from '../../constants/api';
import { SUCCESS, ERR_OK } from '../../constants/config';

@withRouter
@connect(
  null,
  {loadData, recordPath}
)
class AuthRoute extends React.Component {
  static propTypes = {
    location: PropTypes.object,
    history: PropTypes.object
  };

  componentDidMount() {
    const publicList = ['/user/login', '/user/register'];
    const pathname = this.props.location.pathname;
    if (publicList.indexOf(pathname) > -1) {
      return null;
    }
    // 获取用户信息
    axios.get(API.USERINFO).
      then(res => {
        if (res.status === SUCCESS) {
          if (res.data.code === ERR_OK) {
            this.props.loadData(res.data.data);
          }else{
            this.props.recordPath(pathname);
            this.props.history.push('/user/login');
          }
        }
      });
    return true;
  }

  render() {
    return null;
  }
}
export default AuthRoute;

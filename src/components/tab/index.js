import React, { Component, cloneElement } from 'react';
import classnames from 'classnames';
import style from 'style.scss';
import PropTypes from 'prop-types';

class Tabs extends Component {
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    defaultActiveIndex: PropTypes.number,
    activeIndex: PropTypes.number,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    classPrefix: 'tabs',
    onChange: () => {}
  }

  constructor(props) {
    super(props);

    this.handleTabClick = this.handleTabClick.bind(this);

    const currProps = this.props;
    let activeIndex;
    if ('activeIndex' in currProps) {
      activeIndex = currProps.activeIndex;
    } else if ('defaultIndex' in currProps) {
      activeIndex = currProps.defaultActiveIndex;
    }

    this.state = {
      activeIndex,
      prevIndex: activeIndex
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('activeIndex' in nextProps) {
      this.setState({
        activeIndex: nextProps.activeIndex,
      })
    }
  }

  handleTabClick(activeIndex) {
    const prevIndex = this.state.activeIndex;

    if (this.state.activeIndex !== activeIndex && 'defaultActiveIndex' in this.props) {
      this.setState({
        activeIndex,
        prevIndex,
      });

      this.props.onChange({ activeIndex, prevIndex});
    }
  }
  render() {
    const { match } = this.props;
    return (
      <div className="user-container">
        <div className="top">
          <div className="header">
            <img src={logo} alt="" className="logo"/>
            <span className="title">Chat Room</span>
          </div>
        </div>
        <div className="main">
          <Route path={`${match.url}/login`} component={Login} />
          <Route path={`${match.url}/register`} component={Register} />
        </div>
      </div>
    );
  }
}

export default User;

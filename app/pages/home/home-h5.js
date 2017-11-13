import React from 'react';
import './home-h5.scss';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {test: 'foo'};
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 content">
            Home
          </div>
        </div>
      </div>
    );
  }
}

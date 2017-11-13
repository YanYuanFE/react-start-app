import React from 'react';
import './profile-h5.scss';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {test: 'foo'};
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 content">
            Profile
          </div>
        </div>
      </div>
    );
  }
}

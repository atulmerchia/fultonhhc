import React from 'react';
import Icon from '@material-ui/core/Icon';

export default class Loading extends React.Component {
  render() {
    return (
      <div id="loading-wrapper" className={this.props.wrapperClass}>
        <span>
          <Icon
            id="loading-icon"
            fontSize="large">
            favorite
          </Icon>
          <br/>
          Loading
        </span>
      </div>
    )
  }
}

import React from 'react';
import helpers from 'lib/helpers';
import Icon from '@material-ui/core/Icon';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: 0 }
    this.next = this.next.bind(this);
  }

  componentWillReceiveProps(props) { this.setState({ index: 0 }); }
  next(i) {
    let next = this.state.index + i;
    if (next < 0 || this.props.imgs.length <= next)
      this.props.callback(i);
    this.setState({ index: next });
  }

  render() {
    return (
      <div className={this.props.className || ""}>
        <div className="lock-aspect lock-aspect-16x9">
          <img src={this.props.imgs[this.state.index]}/>
          <div className="next" onClick={_ => this.next(-1)}>
            <Icon>forward</Icon>
          </div>
          <div className="next rev" onClick={_ => this.next(1)}>
            <Icon>forward</Icon>
          </div>
        </div>
      </div>
    )
  }
}

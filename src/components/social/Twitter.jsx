import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

export default class Twitter extends React.Component {
  constructor(props) { super(props); this.state = { height: props.height }}

  comopnentDidReceiveProps(props) {
    this.setState({height: props.height})
  }
  render() {
    return (
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName={this.props.profile}
        options={{width: 500, height: this.state.height}}
      />
    )
  }
}

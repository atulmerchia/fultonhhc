import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";

export default class Twitter extends React.Component {
  comopnentDidReceiveProps(props) {
    this.setState({height: props.height})
  }
  render() {
    return (
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="twitterdev"
        options={{width: 500, height: this.props.height}}
      />
    )
  }
}

import React from "react";

export default class Facebook extends React.Component {
  componentDidUpdate() {
    window.FB && window.FB.XFBML.parse();
  }

  render() {
    return (
      <div
        className="fb-page"
        data-href="https://www.facebook.com/HealthHeartCoalition/?epa=SEARCH_BOX"
        data-tabs="timeline, events"
        data-width={`${this.props.width}px`}
        data-height={`${this.props.height}px`}
        data-small-header="true"
        data-hide-cover="true"
        data-show-facepile="false"
      >
      </div>
    )
  }
}

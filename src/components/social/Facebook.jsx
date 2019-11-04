import React from 'react';
import API from 'lib/api';

export default class Facebook extends React.Component {
  componentDidMount() {
    this.options = API.buildQuery({
      href: encodeURIComponent("https://www.facebook.com/HealthHeartCoalition/?epa=SEARCH_BOX"),
      tabs: 'timeline',
      small_header: true,
      adapt_container_width: true,
      hide_cover: true,
      show_facepile: false,
      appId: 713648069140404
    })
  }

  render() {
    return (
      <iframe
        src={`https://www.facebook.com/plugins/page.php?${this.options}&${API.buildQuery({ width: this.props.width, height: this.props.height})}`}
        width={this.props.width}
        height={this.props.height}
        style={{border:'none',overflow:'hidden'}}
        scrolling="no"
        frameborder="0"
        allowTransparency="true"
        allow="encrypted-media">
      </iframe>
    )
  }
}

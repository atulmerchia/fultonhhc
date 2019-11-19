import React from 'react';
import API from 'lib/api';

export default class Facebook extends React.Component {
  constructor(props) {
    super(props);
    this.options = API.buildQuery({
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
        src={`https://www.facebook.com/plugins/page.php?${this.options}&${API.buildQuery({ href: this.props.profile, width: this.props.width, height: this.props.height})}`}
        width={this.props.width}
        height={this.props.height}
        style={{border:'none', overflow:'hidden', marginBottom: -4}}
        scrolling="no"
        frameBorder={0}
        allow="encrypted-media">
      </iframe>
    )
  }
}

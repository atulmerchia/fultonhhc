import * as React from 'react';
import withInstagramFeed from 'origen-react-instagram-feed';

class _Instagram extends React.Component {
  render() {
    if (!this.props.media || this.props.status !== 'completed') return <div className="media-col"/>
    return (
      <div className="media-col media-col-ig" style={{maxHeight: this.props.height}}>
        {this.props.media.map(post => (
          <div className="ig-post" key={post.id}>
            <img
              src={post.displayImage}
              alt={post.accessibilityCaption || "Instagram picture"}
              onClick={_ => window.open(post.postLink)}
            />
            <div className="ig-caption">
              {post.caption || ""}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const Instagram = withInstagramFeed(_Instagram);

class Wrapper extends React.Component {
  render() {
    return <Instagram {...this.props} account={this.props.profile}/>
  }
}

export default Wrapper;

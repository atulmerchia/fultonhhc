import React from 'react';
import API from 'lib/api';
import { Loading } from 'components/common';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount() {
    API.get('/home')
      .then(data => this.setState({ loading: false, data }))
      .catch(err => window.alert(err.err))
  }

  render() {
    if (this.state.loading) return <Loading/>

    return (
      <div className="home">
        <h1>{this.state.data.title}</h1>
        <h2>{this.state.data.subtitle}</h2>
        <div className="jumbotron">
          <div className="lock-aspect lock-aspect-16x9">
            <img src={this.state.data.cover_image} />
          </div>
        </div>
        <pre>
          {this.state.data.text}
        </pre>
      </div>
    )
  }
}

// TODO

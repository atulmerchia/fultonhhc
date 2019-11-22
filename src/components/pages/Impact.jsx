import React from 'react';
import { Carousel, Loading } from 'components/common';
import API from 'lib/api';
import helpers from 'lib/helpers';
import Parse from 'react-html-parser'

export default class Impact extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: -1 }
    this.next = this.next.bind(this);
  }

  componentDidMount() {
    API.get('/impact')
      .then(data => Object.values(data).sort( (a,b) => a.title < b.title ? -1 : 1 ))
      .then(data => this.setState({index: helpers.rand(data.length), data}))
      .catch(err => window.alert(err.err))
  }

  next(i) {
    let len = this.state.data.length;
    this.setState({ index: (this.state.index + len + i) % len });
  }

  render() {
    if (this.state.index === -1) return <Loading/>
    const active = this.state.data[this.state.index];

    return (
      <div className="impact">
        <h1>{active.title}</h1>
        <div className="spacer spacer-top"/>
        <Carousel className="carousel" imgs={active.img_urls} callback={i => this.next(i)}/>
        <div className="spacer spacer-bottom"/>
        <p>{Parse(active.description)}</p>
        <hr/>
        <h2>Explore All</h2>
        <div className="all-projects">
          {this.state.data.map( (x, i) => (
            <div onClick={_ => this.setState({ index: i }, window.scrollTo({top: 0, behavior: 'smooth'}))}>
              {x.title}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

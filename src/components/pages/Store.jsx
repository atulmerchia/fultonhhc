import React from 'react';
import { Loading } from 'components/common';
import API from 'lib/api';
import helpers from 'lib/helpers';

export default class Store extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, cart: {}, total: 0 }
    this.addToCart = this.addToCart.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    API.get('/inventory')
      .then(data => this.setState({ loading: false, data: Object.entries(data) }))
      .catch(err => window.alert(err.err))
  }

  componentDidUpdate(_, prevState) {
    if (prevState.loading && !this.state.loading) {
      let details = document.getElementsByClassName('product-details');
      for (var x of details) x.style.maxHeight = `${x.scrollHeight}px`;
    }
  }

  componentWillUnmount() { window.removeEventListener('resize', this.updateDimensions); }

  updateDimensions() {
    const id = Date.now();
    this.updateId = id;
    setTimeout(_ => {
      if (this.updateId !== id || this.state.loading) return;
      this.componentDidUpdate(undefined, { loading: true })
    }, 100)
  }

  addToCart(e, id, p) {
    e = e.target.parentNode.classList;
    e.toggle("active");
    setTimeout(_ => e.toggle('active'), 600)

    this.setState({
      cart: Object.assign(this.state.cart, {
        [id]: {
          name: p.name,
          price: p.price,
          count: (this.state.cart[id] || { count: 0 }).count + 1
        }
      }),
      total: this.state.total + p.price
    }, _ => {
      this.refs.cart.classList.toggle('resizing');
      this.refs.cart.style.maxWidth = `${this.refs.cart.scrollWidth}px`;
      this.refs.cart.style.maxHeight = `${this.refs.cart.scrollHeight}px`;
      console.log(this.refs.cart.classList);
      setTimeout(_ => this.refs.cart.classList.toggle('resizing'), 100);
    })
  }

  render() {
    if (this.state.loading) return <Loading/>
    return (
      <div className="store">
        {this.state.data.map( ([id, p]) => (
          <div key={id} className="product-card" >
            <div className="lock-aspect lock-aspect-1x1">
              <img src={p.img_url}/>
            </div>
            <div className="product-info">
              <div className="product-name">{p.name}</div>
              <div className="product-price">{helpers.formatDollar(p.price)}</div>
            </div>
            <div className="product-purchase">
              <span className="one" onClick={e => this.addToCart(e, id, p)}>Add to Cart</span>
              <span className="two">Added!</span>
            </div>
            {p.details
              ? <div className="product-details"><br/>{p.details}<br/></div>
              : <></>
            }
            </div>
        ))}
        {this.state.total
          ? <div className="checkout">
              <div className="checkout-contents" ref="cart">
                {Object.values(this.state.cart).map((item, i) => (
                  <div className="row" key={i}>
                    <div className="item item-name">{item.count} x {item.name}</div>
                    <div className="item item-price">{Number(item.count * item.price / 100).toFixed(2)}</div>
                  </div>
                ))}
                <div className="row">
                  <div className="item item-name">Total</div>
                  <div className="item item-price">{helpers.formatDollar(this.state.total)}</div>
                </div>
              </div>
              <div
                className="proceed"
                onClick={_ => this.state.total && this.props.history.push({ pathname: '/checkout', state: { order: this.state.cart, total: this.state.total } })}
              >
                Proceed to Checkout
              </div>
            </div>
          : <></>
        }
      </div>
    )
  }
}

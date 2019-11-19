import React from 'react';
import { injectStripe, CardElement, Elements, StripeProvider } from 'react-stripe-elements';
import style from 'css/common/stripe.json';

class __Stripe extends React.Component {
  componentDidMount() { this.props.registerStripe(this.generateToken.bind(this)) }
  generateToken(options = {}) { return this.props.stripe.createToken(options) }
  render() { return <CardElement className="stripe-element" style={style} /> }
}

const _Stripe = injectStripe(__Stripe);

export default class Stripe extends React.Component {
  render() {
    return (
      <div className={this.props.className || ""}>
        <StripeProvider apiKey={process.env.STRIPE_API_KEY}>
            <Elements>
              <_Stripe registerStripe={r => this.props.stripeRef({ generateToken: r })} />
            </Elements>
        </StripeProvider>
      </div>
    );
  }
}

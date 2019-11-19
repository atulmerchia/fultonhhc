import React from 'react'
import { Form, Input, Stripe } from 'components/common'
import Icon from '@material-ui/core/icon'
import helpers from 'lib/helpers'
import API from 'lib/api'

const BUTTONS = {
  READY:  ['Submit order', ''],
  BUSY: ['Submitting', 'autorenew']
};

export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { same_address: false, buttonState: BUTTONS.READY }
    this.submitPayment = this.submitPayment.bind(this);
    window.refresh = _ => this.setState({ buttonState: BUTTONS.READY })
  }

  submitPayment() {
    if (this.state.buttonState[1]) return;
    this.setState({ buttonState: BUTTONS.BUSY })

    let required = ['name', 'email', 'phone', 'billing_street1', 'billing_city', 'billing_state', 'billing_zip']
    if (!this.state.same_address) required = required.concat(['shipping_street1', 'shipping_city', 'shipping_state', 'shipping_zip'])

    const data = this.form.getData();
    data.phone = parseInt(`${data.phone}`.replace(/\D/g, ""));
    if (isNaN(data.phone)) data.phone = null;
    for (var k of required) {
      if (!data[k] || !`${data[k]}`.trim()) {
        window.alert(`Invalid ${k}`);
        return this.setState({ buttonState: BUTTONS.READY });
      }
    }

    const stripe_billing = {
      address_line1: data.billing_street1.trim(),
      address_line2: (data.billing_street2 || "").trim(),
      address_city: data.billing_city.trim(),
      address_state: data.billing_state.trim(),
      address_zip: data.billing_zip,
    }
    if (!stripe_billing.address_line2) delete stripe_billing.address_line2;

    console.log(stripe_billing);

    const billing = {
      address_line1: stripe_billing.address_line1,
      address_line2: stripe_billing.address_line2,
      city: stripe_billing.address_city,
      state: stripe_billing.address_state,
      zip: parseInt(stripe_billing.address_zip)
    }
    if (!billing.address_line2) delete billing.address_line2;

    console.log(billing);

    const shipping = this.state.same_address ? billing : {
      address_line1: data.shipping_street1.trim(),
      address_line2: (data.shipping_street2 || "").trim(),
      city: data.shipping_city.trim(),
      state: data.shipping_state.trim(),
      zip: parseInt(data.shipping_zip),
    }
    if (!shipping.address_line2) delete shipping.address_line2;

    console.log(shipping);

    this.stripe.generateToken({
      name: data.name.trim(),
      ...stripe_billing,
      address_country: 'US'
    })
    .then( ({ token }) => API.post('/order', {
      token: token,
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone,
      billing_address: billing,
      shipping_address: shipping,
      order: this.props.location.state.order
    }))
    .then(_ => {
      window.alert('Order placed. Please check your email for confirmation. Dismiss this alert to be redirected.')
      this.props.history.push('/store')
    })
    .catch(err => { console.log(err); window.alert(err.err) })
  }

  render() {
    const summary = this.props.location.state;
    return (
      <div className="checkout">
        <h1>Order summary</h1>
        <div className="summary">
          {Object.values(summary.order).map(item => (
            <div className="row">
              <div className="item item-name">{item.count} x {item.name}</div>
              <div className="item item-price">{Number(item.count * item.price / 100).toFixed(2)}</div>
            </div>
          ))}
          <hr/>
          <div className="row">
            <div className="item item-name">Total</div>
            <div className="item item-price">{helpers.formatDollar(summary.total)}</div>
          </div>
        </div>
        <h1>Payment Form</h1>
        <Stripe stripeRef={r => { this.stripe = r }}/>
        <div className="form">
          <Form ref={r => {this.form = r}}>
            <div className="section">
              <h2>Personal Information</h2>
              <div className="row">
                <Input name="name" prompt="Cardholder Name" type="text"/>
              </div>
              <div className="row">
                <Input name="email" prompt="E-mail" type="email"/>
                <Input name="phone" prompt="Phone #" type="tel" format={helpers.num2phone}/>
              </div>
            </div>

            <div className="section">
              <h2>Billing Address</h2>
              <div className="row">
                <Input name="billing_street1" prompt="Address Line 1"/>
              </div>
              <div className="row">
                <Input name="billing_street2" prompt="Address Line 2"/>
              </div>
              <div className="row">
                <Input name="billing_city" prompt="City"/>
                <Input className="narrow" name="billing_state" prompt="State" format={x => x.replace(/[^a-zA-Z]/g, "").substr(0, 2).toUpperCase()}/>
                <Input className="narrow" name="billing_zip" prompt="Zip" format={x => x.replace(/\D/g, "").substring(0, 5)}/>
              </div>
            </div>

            <div className="section">
              <h2>Shipping Address</h2>
              <label htmlFor="same-address">
              <input id="same-address" type="checkbox" checked={this.state.same_address} onClick={e => this.setState({ same_address: e.target.checked })} />
                Same as billing address
              </label>
              { this.state.same_address ? <></> : (<>
              <div className="row" style={{marginTop: '1rem'}}>
                <Input name="shipping_street1" prompt="Address Line 1"/>
              </div>
              <div className="row">
                <Input name="shipping_street2" prompt="Address Line 2"/>
              </div>
              <div className="row">
                <Input name="shipping_city" prompt="City"/>
                <Input className="narrow" name="shipping_state" prompt="State" format={x => x.replace(/[^a-zA-Z]/g, "").substr(0, 2).toUpperCase()}/>
                <Input className="narrow" name="shipping_zip" prompt="Zip" format={x => x.replace(/\D/g, "").substring(0, 5)}/>
              </div>
              </>)}
            </div>
          </Form>
        </div>
        <div className={"submit " + this.state.buttonState[1]} tabIndex="0" onClick={this.submitPayment} onKeyPress={e => e.key === 'Enter' && this.submitPayment()}>
          <span>{this.state.buttonState[0]}</span>
          {this.state.buttonState[1] ? <Icon>{this.state.buttonState[1]}</Icon> : <></>}
        </div>
      </div>
    )
  }
}

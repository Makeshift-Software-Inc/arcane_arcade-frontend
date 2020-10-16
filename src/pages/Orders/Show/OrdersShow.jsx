import React from 'react';
// import { useStore } from "../../../store";
import Countdown from 'react-countdown';
import { Link } from 'react-router-dom';

import '../../../magic.css';
import './OrdersShow.scss';

import logo from '../../../img/temp-logo.png';

import '@fortawesome/fontawesome-free/css/all.min.css';

import Api from '../../../services/Api';

class OrdersShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = { order: {}, paymentReceived: false };
    this.twoMinutes = 120;
    this.checkAddress = this.checkAddress.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const path = `/orders/${id}`;

    Api.get(path).then((response) => {
      this.setState({
        order: response.data.data.attributes,
      });
    });

    Api.get(`${path}/payment_status`).then((response) => {
      this.setState({
        paymentReceived: !response.data.active,
      });
    });
  }

  checkAddress() {
    this.twoMinutes -= 1;

    if (this.twoMinutes <= 0) {
      const { match: { params: { id } } } = this.props;
      // eslint-disable-next-line
      const address = this.state.order.escrow_address;
      const path = `/orders/${id}/payment_status`;

      this.twoMinutes = 120;
      Api.get(path).then((response) => {
        this.setState({
          paymentReceived: !response.data.active,
        });
      });
    }
  }

  render() {
    // eslint-disable-next-line
    const expiresAt = new Date(this.state.order.expires_at);
    // eslint-disable-next-line
    const listingPath = `/games/${this.state.order.listing_slug}`;

    return (
      <div className="App orders-show">
        {/* eslint-disable-next-line */}
        <div className={this.state.paymentReceived ? 'modal show-modal' : 'modal'}>
          <div className="modal-background" />
          <div className="modal-content">
            <article className="panel is-success magictime puffIn">
              <p className="panel-heading">Payment Received</p>
              <div className="panel-block">
                <div className="payment-success">
                  <i className="far fa-check-circle" />
                </div>

                <div className="ellipsis">
                  <div className="dot" />
                  <div className="dot" />
                  <div className="dot" />
                </div>
              </div>
            </article>
          </div>
          <button type="button" className="modal-close is-large" aria-label="close" />
        </div>

        <div className="logo magictime puffIn">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <div className="logo magictime puffIn">
          <h1>
            {' '}
            Order ID:
            {/* eslint-disable-next-line */}
            {this.state.order.id}
          </h1>
        </div>

        <div className="qr-code">
          {/* eslint-disable-next-line */}
          <img src={this.state.order.qr_url} alt="qr-code" />
        </div>

        <div className="order-text">
          <h3>
            Send
            {' '}
            <b>exactly</b>
            {' '}
            {/* eslint-disable-next-line */}
            {this.state.order.coin_amount}
            {' '}
            {/* eslint-disable-next-line */}
            {this.state.order.coin_type}
            {' '}
            to:
          </h3>
        </div>

        <div className="coin-address">
          {/* eslint-disable-next-line */}
          <b>{this.state.order.escrow_address}</b>
        </div>

        {/* eslint-disable-next-line */}
        {!this.state.paymentReceived && (
          <div className="expiry">
            <h2>
              Expires In:
              <Countdown
                date={expiresAt}
                onTick={this.checkAddress}
              />
            </h2>
          </div>
        )}
      </div>
    );
  }
}

export default OrdersShow;

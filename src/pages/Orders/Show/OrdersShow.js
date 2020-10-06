import React, { useEffect } from "react";
// import { useStore } from "../../../store";
import Countdown from 'react-countdown';

import '../../../magic.css';
import './OrdersShow.scss'
import logo from "../../../img/temp-logo.png";

import { Link } from "react-router-dom";
import Api from "../../../services/Api";


class OrdersShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = { order: {} }
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    const path = `/orders/${id}`;

    Api.get(path).then((response) => {
      this.setState({
        order: response.data.data.attributes
      });
    })
  }

  render() {
    const expiresAt = new Date(this.state.order.expires_at);

    return (
      <div className="App orders-show">
        <div className="logo magictime puffIn">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <div className="logo magictime puffIn">
          <h1> Order ID: {this.state.order.id} </h1>
        </div>

        <div className="qr-code">
          <img src={this.state.order.qr_url} alt="qr-code" />
        </div>

        <div className="order-text" >
          <h3>
            Send <b>exactly</b> {this.state.order.coin_amount} {this.state.order.coin_type} to:
          </h3>
        </div>

        <div className="coin-address">
          <b>{this.state.order.escrow_address}</b>
        </div>

        <div className="expiry">
          <h2>
            Expires In:<Countdown date={expiresAt} />
          </h2>
        </div>
      </div>
    )
  }
};

export default OrdersShow;

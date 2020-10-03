import React, { useEffect } from "react";
// import { useStore } from "../../../store";

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
      debugger
      // This is unacceptable. I have to call data THREE TIMES?!
      this.setState({
        order: response.data.data.data.attributes
      });
    })
  }

  render() {
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
      </div>
    )
  }
};

export default OrdersShow;

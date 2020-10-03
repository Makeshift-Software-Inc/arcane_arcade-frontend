import React, { useEffect } from "react";
import { observer } from "mobx-react";



import Navbar from "../../../components/Navbar/Navbar";
import Api from "../../../services/Api";

import './GamesNew.scss'



class GamesNew extends React.Component {
  constructor(props) {
    super(props);

    this.state = { game: {}}
  }

  componentDidMount() {
  }

  onFormSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="App listings-new">
        <Navbar />
      </div>
    )
  }
};

export default observer(GamesNew);

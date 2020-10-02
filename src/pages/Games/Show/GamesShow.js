import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";


import ReactPlayer from "react-player";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

import { useStore } from "../../../store";
import Navbar from "../../../components/Navbar/Navbar";
import Api from "../../../services/Api";

import './GamesShow.scss'



class GamesShow extends React.Component {
  constructor(props) {
    super(props);


    this.state = { game: {}}
  }

  componentDidMount() {
    const slug = this.props.match.params.slug;
    const path = `/listings/${slug}`;

    Api.get(path).then((response) => {
      this.setState({
        game: response.data.data.attributes
      });
    })
  }

  splideSlides() {
    let slides = [];

    if (!this.state.game.id) return [];

    this.state.game.videos.forEach((video, i) => {
      const playing = i === 0 ? true : false;
      slides.push(
        <SplideSlide>
          <ReactPlayer
            url={video}
            thumbnail={this.state.game.images[0]}
            playing={false}
            controls
            width="640px"
            height="640px"
            muted
            />
        </SplideSlide>
      )
    });

    this.state.game.images.forEach((image) => {
      const imageAlt = `${this.state.game.title} cover`;

      slides.push(
        <SplideSlide>
          <img src={image} alt={imageAlt} />
        </SplideSlide>
      )
    });

    return slides;
  }

  render() {
    const coverAlt = `${this.state.game.title} cover`
    return (
      <div className="App listings-show">
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="splide-container">
              <Splide className="splide-slider" hasSliderWrapper={true}
                options= {{
                  type:"loop",
                  easing:"ease",
                  keyboard: true,
                  autoHeight: true,
                  autoWidth: true
                }}>
                {this.splideSlides()}
              </Splide>
            </div>

            <div className="game-info">
              { this.state.game.images && (
                <img src={this.state.game.images[0]} alt={coverAlt} />
              )}
              <p>{this.state.game.description}</p>
            </div>
          </div>
        </div>


      </div>
    )
  }
};

export default observer(GamesShow);

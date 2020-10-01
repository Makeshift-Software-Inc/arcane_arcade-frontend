import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import './GameListing.scss'

class GameListing extends React.Component {
  constructor(props) {
    super(props);

    this.state = { listing: this.props.listing }
  }


  popoverContent() {
    let popoverContent = [];

    const firstImg  = this.state.listing.images[1];
    const secondImg = this.state.listing.images[2];

    if (firstImg) popoverContent.push(<img src={firstImg} alt=""/>)
    if (secondImg) popoverContent.push(<img src={secondImg}  alt=""/>)

    if (this.props.listing.videos.length > 0) {
      popoverContent.push(
        <button onClick={this.playTrailer.bind(this)} class="topcoat-button--large--cta" >Play Trailer</button>
      )
    }

    return popoverContent;
  }

  playTrailer() {
    this.props.playVideo(this.state.listing);
  }



  render() {
    const coverImageSrc = this.state.listing.images[0];
    const imgAlt = `${this.state.listing.title} cover`;

    const popupContent = (
      <div className="popover">
        <div className="title">
          {this.state.listing.title}
        </div>
        {this.popoverContent()}
      </div>
    )

    return (
      <Tippy
        content={popupContent}
        interactive={true}
        interactiveBorder={20}
        delay={100}
        arrow={true}
        placement="top"
        key={this.state.listing.id}
      >
        <div className="game-listing" key={this.state.listing.id}>
          <img src={coverImageSrc}  alt={imgAlt} />
        </div>
      </Tippy>
    )
  }
}

export default GameListing;

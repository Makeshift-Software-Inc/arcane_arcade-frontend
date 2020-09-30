import React from 'react';


class GameListing extends React.Component {
  constructor(props) {
    super(props);

    this.state = { listing: this.props.listing }
  }

  render() {
    const coverImageSrc = this.state.listing.images[0];
    const imgAlt = `${this.state.listing.title} cover`;
    return (
      <div className="game-listing">
        <img src={coverImageSrc}  alt={imgAlt} />

      </div>
    )
  }
}

export default GameListing;

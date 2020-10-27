import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Helmet } from 'react-helmet';

import { useStore } from '../../../store';

import Loading from '../../../components/Loading/Loading';
import Form from './Form';

import './New.scss';

const SellerListingsNew = ({ history }) => {
  const {
    games,
    forms: { listing },
  } = useStore();

  useEffect(() => {
    listing.load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!listing.allFilesUploaded() || games.creating) return;

    const data = {
      title: listing.title,
      description: listing.description,
      esrb: listing.esrb,
      early_access: listing.early_access,
      price: listing.price ? listing.price * 100 : null,
      release_date: listing.release_date,
      preorderable: listing.preorderable,
      category_ids: listing.categories.map((category) => category.id),
      supported_platforms_ids: listing.supported_platforms.map(
        (platform) => platform.id,
      ),
      listing_images_attributes: listing.images().map((image) => ({
        image: image.keys(),
      })),
      listing_videos_attributes: listing.videos().map((video) => ({
        video: video.keys(),
      })),
      listing_attachments_attributes: listing.attachments.map((attachment) => ({
        attachment: attachment.keys(),
      })),
      listing_tags_attributes: listing.tags.map((tag) => ({ tag_id: tag.id })),
    };

    const id = await games.create(data);

    if (id) {
      const notification = 'Listing created.';
      history.push({
        pathname: `/sell-your-game/${id}/distribution/add`,
        state: { notification },
      });
    }
  };

  if (games.creating || listing.loading) return <Loading />;

  const title = 'Sell Your Game';

  const metaDesc = 'Sell your game with Arcane Arcade. Receive cryptocurrency (Bitcoin and/or Monero) for your game.';
  return (
    <div className="App seller-listings-new">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={metaDesc} />
      </Helmet>
      <div className="form-container">
        <div className="back-to-dashboard">
          <Link to="/seller/dashboard">⟵ Back To Dashboard</Link>
        </div>

        <Form form={listing} text={title} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default observer(SellerListingsNew);

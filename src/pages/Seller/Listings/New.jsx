import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Helmet } from 'react-helmet';
import Navbar from '../../../components/Navbar/Navbar';

import { useStore } from '../../../store';

import Loading from '../../../components/Loading/Loading';
import Form from './Form/Form';

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
      // category_ids: listing.categories.map((category) => category.id),
      // supported_platforms_ids: listing.supported_platforms.map(
      //   (platform) => platform.id,
      // ),
      category_listings_attributes: listing.categories.map((category) => ({
        category_id: category.id,
      })),
      supported_platform_listings_attributes: listing.supported_platforms.map(
        (platform) => {
          const system_requirement = listing.system_requirements.find(
            (requirement) => requirement.platform === platform.name,
          );
          return {
            supported_platform_id: platform.id,
            system_requirements: system_requirement
              ? system_requirement.keysToSend()
              : null,
          };
        },
      ),
      supported_languages: listing.supported_languages,
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
      <Navbar />
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={metaDesc} />
      </Helmet>
      <div className="form-container">
        <Form form={listing} text={title} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default observer(SellerListingsNew);

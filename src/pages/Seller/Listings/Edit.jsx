import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Helmet } from 'react-helmet';

import { useStore } from '../../../store';
import Form from './Form/Form';

import Navbar from '../../../components/Navbar/Navbar';
import Loading from '../../../components/Loading/Loading';

const SellerListingsEdit = ({ match }) => {
  const { slug } = match.params;

  const {
    forms: { listing },
  } = useStore();

  useEffect(() => {
    const prepare = async () => {
      await listing.load();
      await listing.prepareEdit(slug);
    };

    prepare();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!listing.allFilesUploaded()) return;

    // eslint-disable-next-line
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
  };

  if (listing.loading) return <Loading />;

  const title = 'Edit Your Game';

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
        <Form form={listing} text={title} onSubmit={handleSubmit} isUpdate />
      </div>
    </div>
  );
};

export default observer(SellerListingsEdit);

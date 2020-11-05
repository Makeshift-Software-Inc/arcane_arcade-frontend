import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';

import { useStore } from '../../../store';
import Form from './Form/Form';

import Navbar from '../../../components/Navbar/Navbar';
import Loading from '../../../components/Loading/Loading';

const SellerListingsEdit = ({ match, history }) => {
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
      listing_images_attributes: listing
        .savedImages()
        .map((image) => image.keys())
        .concat(
          listing
            .images()
            .map((image) => ({ position: image.position, image: image.keys() })),
        ),
      listing_videos_attributes: listing
        .savedVideos()
        .map((video) => video.keys())
        .concat(
          listing
            .videos()
            .map((video) => ({ position: video.position, video: video.keys() })),
        ),
      listing_attachments_attributes: listing.attachments.map((attachment) => ({
        attachment: attachment.keys(),
      })),
      category_listings_attributes: listing.categoryListingsKeys(),
      listing_tags_attributes: listing.listingTagsKeys(),
      supported_platform_listings_attributes: listing.supportedPlatformListingsKeys(),
      supported_languages: listing.supportedLanguagesKeys(),
    };

    if (await listing.updateGame(slug, data)) {
      const notification = 'Listing updated.';
      toast(notification);
      history.push({
        pathname: '/seller/dashboard',
      });
    }
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

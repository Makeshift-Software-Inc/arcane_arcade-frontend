import React, { useEffect } from "react";
import { useStore } from "../../../store";
import { observer } from "mobx-react";

import Errors from "../../../components/Errors/Errors";

import Uploader from "../../../components/Uploader/Uploader";
import Loading from "../../../components/Loading/Loading";
import "./New.scss";

const SellerListingsNew = ({ history }) => {
  const {
    games,
    forms: {
      listing: {
        load,
        loading,
        categoryOptions,
        selected_category,
        selectCategory,
        supportedPlatformOptions,
        supported_platforms,
        addSupportedPlatform,
        removeSupportedPlatform,
        esrb,
        title,
        description,
        earlyAccess,
        price,
        update,
        onChange,
        system_requirements,
        files,
        addFile,
        reorderFiles,
        errors,
        images,
        videos,
      },
    },
  } = useStore();

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleEarlyAccess = () => {
    update({ earlyAccess: !earlyAccess });
  };

  const handleCategoryChange = (e) => {
    selectCategory(e.target.value);
  };

  const handleSupportedPlatformChange = (e) => {
    if (e.target.checked) {
      addSupportedPlatform(e.target.dataset.id, e.target.name);
    } else {
      removeSupportedPlatform(e.target.dataset.id, e.target.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const listing = {
      title,
      description,
      esrb,
      early_access: earlyAccess,
      price,
      category_ids: selected_category ? [selected_category.id] : null,
      supported_platforms_ids: supported_platforms.map(
        (platform) => platform.id
      ),
      listing_images_attributes: images().map((image) => ({
        image: image.keys(),
      })),
      listing_videos_attributes: videos().map((video) => ({
        video: video.keys(),
      })),
    };

    if (await games.create(listing)) {
      const notification = "Listing created.";
      history.push({ pathname: "/seller/dashboard", state: { notification } });
    }
  };

  return (
    <div className="App seller-listings-new">
      <form onSubmit={handleSubmit}>
        <h1>Sell your game</h1>
        <label>
          Game title
          <input
            type="text"
            value={title}
            onChange={onChange}
            name="title"
            className="topcoat-text-input"
          />
        </label>
        <label>
          Select ESRB
          <select
            name="esrb"
            value={esrb}
            onChange={onChange}
            className="topcoat-text-input"
          >
            <option value="EVERYONE">EVERYONE</option>
            <option value="E_TEN_PLUS">E_TEN_PLUS</option>
            <option value="TEEN">TEEN</option>
            <option value="MATURE">MATURE</option>
            <option value="ADULT">ADULT</option>
          </select>
        </label>

        <h1>Add photos and videos</h1>
        <Uploader
          accepts="image/*, video/*"
          addFile={addFile}
          files={files}
          reorder={reorderFiles}
        />

        <div>
          <label>
            Game Category
            {loading ? (
              <Loading />
            ) : (
              <select
                name="category"
                className="topcoat-text-input"
                onChange={handleCategoryChange}
                value={selected_category && selected_category.title}
              >
                <option>SELECT</option>
                {categoryOptions.map((category) => (
                  <option key={category.id} value={category.title}>
                    {category.title}
                  </option>
                ))}
              </select>
            )}
          </label>
          <label>
            Game Tags
            <input type="text" name="tags" className="topcoat-text-input" />
          </label>
        </div>
        <label>
          Game Desscription
          <textarea
            name="description"
            value={description}
            onChange={onChange}
            className="topcoat-text-input"
          ></textarea>
        </label>
        <div>
          <h4>Platforms Supported</h4>
          <div className="flex-column">
            {loading ? (
              <Loading />
            ) : (
              supportedPlatformOptions.map((platform) => {
                const checked = !!supported_platforms.find(
                  (p) => p.id === platform.id
                );
                return (
                  <React.Fragment key={platform.id}>
                    <label className="topcoat-checkbox" style={{ margin: 10 }}>
                      <input
                        type="checkbox"
                        name={platform.name}
                        data-id={platform.id}
                        onChange={handleSupportedPlatformChange}
                        checked={checked}
                      />
                      <div
                        className="topcoat-checkbox__checkmark"
                        style={{ marginRight: 10 }}
                      ></div>
                      {platform.name}
                    </label>
                    {checked &&
                      platform.children.length > 0 &&
                      platform.children.map((children) => (
                        <label
                          className="topcoat-checkbox"
                          key={children.id}
                          style={{ margin: 10 }}
                        >
                          <input
                            type="checkbox"
                            name={children.name}
                            data-id={children.id}
                            onChange={handleSupportedPlatformChange}
                            checked={
                              !!supported_platforms.find(
                                (p) => p.id === children.id
                              )
                            }
                          />
                          <div
                            className="topcoat-checkbox__checkmark"
                            style={{ marginRight: 10 }}
                          ></div>
                          {children.name}
                        </label>
                      ))}
                  </React.Fragment>
                );
              })
            )}
          </div>
        </div>
        <div>
          {system_requirements.length > 0 && (
            <React.Fragment>
              <h4>System Requirements</h4>
              {system_requirements.map((systemRequirement) => (
                <label key={systemRequirement.name}>
                  {systemRequirement.name}
                  <textarea
                    name="description"
                    className="topcoat-text-input"
                    value={systemRequirement.description}
                    onChange={systemRequirement.onChange}
                  ></textarea>
                </label>
              ))}
            </React.Fragment>
          )}
        </div>
        <div>
          <div className="early-access">
            <div>Early access</div>
            <div>NO</div>
            <input
              type="checkbox"
              onChange={toggleEarlyAccess}
              id="early-access"
              name="early-access"
              value={earlyAccess}
            />
            <label htmlFor="early-access">Toggle</label>
            <div>YES</div>
          </div>

          <div className="price">
            <label>
              Price in USD
              <input
                type="number"
                className="topcoat-text-input"
                value={price}
                onChange={onChange}
                name="price"
              />
            </label>
          </div>
        </div>

        <br />

        <Errors errors={errors.full_messages.toJSON()} />

        <br />

        <button type="submit" className="topcoat-button--large">
          CREATE
        </button>
      </form>
    </div>
  );
};

export default observer(SellerListingsNew);

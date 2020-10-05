import React, { useEffect } from "react";
import { useStore } from "../../../store";
import { observer } from "mobx-react";

import Trix from "trix";
import "trix/dist/trix.css";

import Tagify from '@yaireo/tagify'
import '@yaireo/tagify/src/tagify.scss';


import Errors from "../../../components/Errors/Errors";

import Uploader from "../../../components/Uploader/Uploader";
import Loading from "../../../components/Loading/Loading";
import "./New.scss";


const SellerListingsNew = ({ history }) => {
  const trixInput = React.createRef();
  const tagsInput = React.createRef();

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
    const trix = trixInput.current;
    trixInput.current.addEventListener("trix-change", event => {
       console.log("trix change event fired");
       onChange(event); //calling custom event
    });

    trixInput.current.addEventListener("trix-attachment-add", event => {
       console.log("trix attachment event fired");
    });

    new Tagify(tagsInput.current);

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
      <div className="container">
        <form onSubmit={handleSubmit}>
        <h1>Sell your game</h1>

        <div className="field spacer">
          <div className="title">
            <label htmlFor="title" className="form-label"> Game title </label>
            <input
              type="text"
              value={title}
              onChange={onChange}
              name="title"
              className="topcoat-text-input"
              />
          </div>
          <div className="esrb">
            <label htmlFor="esrb" className="form-label">
              Rated
            </label>
            <select
              name="esrb"
              value={esrb}
              onChange={onChange}
              className="topcoat-text-input"
              >
              <option value="EVERYONE">EVERYONE</option>
              <option value="E10+">E_TEN_PLUS</option>
              <option value="TEEN">TEEN</option>
              <option value="MATURE">MATURE</option>
              <option value="ADULT">ADULT</option>
            </select>
          </div>
        </div>


        <h3>Add photos and videos</h3>
        <Uploader
          accepts="image/*, video/*"
          addFile={addFile}
          files={files}
          reorder={reorderFiles}
        />

        <div className="field spacer">
          <div className="game-category">
            <label htmlFor="category" className="form-label">
              Game Category
            </label>
            {loading ? (
              <Loading />
            ) : (
              <select
                multiple
                name="category"
                className="topcoat-text-input"
                onChange={handleCategoryChange}
                value={selected_category && selected_category.title}
                >
                <option></option>
                {categoryOptions.map((category) => (
                  <option key={category.id} value={category.title}>
                    {category.title}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="game-tags">
            <label htmlFor="tags" className="form-label">Game Tags</label>
            <input type="text" ref={tagsInput} name="tags" className="topcoat-text-input" />
          </div>
        </div>

        <div className="field description-field">
          <h2>Game Description</h2>
          <div>
            <input
                type="hidden"
                id="trix"
                name="description"
            />
          <trix-editor input="trix" name="description" ref={trixInput} />
          </div>
        </div>

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

        <div className="system-requirements" >
          {system_requirements.length > 0 && (
            <React.Fragment>
              <h4>System Requirements</h4>
              {system_requirements.map((systemRequirement) => (
                <div>
                  <div className="topcoat-tab-bar">
                    <label className="topcoat-tab-bar__item">
                      <input type="radio" name="tab-bar" />
                      <button className="topcoat-tab-bar__button">
                        {systemRequirement.name}
                      </button>
                    </label>
                  </div>

                  <textarea
                    name="description"
                    className="topcoat-text-input"
                    value={systemRequirement.description}
                    onChange={systemRequirement.onChange}
                  />
              </div>
              ))}
            </React.Fragment>
          )}
        </div>
        <div>
          <div className="early-access">
            <div>Early access</div>
              <label className="topcoat-checkbox">
                <input type="checkbox"/>
                <div className="topcoat-checkbox__checkmark"></div>
              </label>
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
    </div>
  );
};

export default observer(SellerListingsNew);

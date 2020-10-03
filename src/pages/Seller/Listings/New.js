import React, { useEffect } from "react";
import { useStore } from "../../../store";
import { observer } from "mobx-react";

import Loading from "../../../components/Loading/Loading";
import "./New.scss";

const SellerListingsNew = () => {
  const {
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
      systemRequirementsFields,
      esrb,
      title,
      description,
      earlyAccess,
      price,
      update,
      onChange,
    },
  } = useStore("forms");

  console.log(description);

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
      addSupportedPlatform(e.target.dataset.id);
    } else {
      removeSupportedPlatform(e.target.dataset.id);
    }
  };

  return (
    <div className="App seller-listings-new">
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
      <div className="uploader">
        <div className="drop-placeholder">
          <h4>Drop files or browser</h4>
          <input type="file" name="files" />
        </div>
        <div className="previews"></div>
      </div>

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
        <h4>System Requirements</h4>
        {systemRequirementsFields().map((platform) => (
          <label key={platform.id}>
            {platform.name}
            <textarea></textarea>
          </label>
        ))}
      </div>
      <div>
        <div className="early-access">
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
    </div>
  );
};

export default observer(SellerListingsNew);

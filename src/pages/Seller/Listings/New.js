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
    },
  } = useStore("forms");

  console.log(supported_platforms.toJSON());
  console.log(selected_category && selected_category.toJSON());

  useEffect(() => {
    load();
  }, []);

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
    <div className="seller-listings-new">
      <h1>Sell your game</h1>
      <label>
        Game title
        <input type="text" name="title" className="topcoat-text-input" />
      </label>
      <label>
        Select ESRB
        <select name="esrb" className="topcoat-text-input">
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
        <textarea name="description" className="topcoat-text-input"></textarea>
      </label>
      <div>
        <h4>Platforms Supported</h4>
        <div className="flex-column">
          {loading ? (
            <Loading />
          ) : (
            supportedPlatformOptions.map((platform) => (
              <label
                key={platform.id}
                className="topcoat-checkbox"
                style={{ margin: 10 }}
              >
                <input
                  type="checkbox"
                  name={platform.name}
                  data-id={platform.id}
                  onChange={handleSupportedPlatformChange}
                  checked={supported_platforms.find(
                    (p) => p.id === platform.id
                  )}
                />
                <div
                  className="topcoat-checkbox__checkmark"
                  style={{ marginRight: 10 }}
                ></div>
                {platform.name}
              </label>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(SellerListingsNew);

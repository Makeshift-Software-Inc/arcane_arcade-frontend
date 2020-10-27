import React, { useState, useRef, useEffect } from 'react';
import { observer } from 'mobx-react';

import Tippy from '@tippyjs/react';
import ReactTags from 'react-tag-autocomplete';
import DatePicker from 'react-datepicker';

import Errors from '../../../components/Errors/Errors';

import Uploader from '../../../components/Uploader/Uploader';

import 'trix/dist/trix';
import 'trix/dist/trix.css';

const Form = ({
  form, onSubmit, text, isUpdate,
}) => {
  const [waitList, setWaitList] = useState([]);

  const trixInput = useRef(null);

  useEffect(() => {
    trixInput.current.addEventListener('trix-change', (event) => {
      if (event.target.name) {
        form.onChange(event);
      }
    });

    trixInput.current.addEventListener('trix-file-accept', (event) => {
      const acceptedAttachments = [
        'image/png',
        'image/jpeg',
        'image/gif',
        'image/jpg',
      ];
      if (!acceptedAttachments.includes(event.file.type)) {
        event.preventDefault();
        // eslint-disable-next-line no-alert
        alert('You can only add images with jpeg or png format.');
      }
      const maxFileSize = 1024 * 1024 * 10; // 10MB
      if (event.file.size > maxFileSize) {
        event.preventDefault();
        // eslint-disable-next-line no-alert
        alert('Only support attachment files upto 10MB.');
      }
    });

    trixInput.current.addEventListener('trix-attachment-add', async (event) => {
      if (event.attachment.file) {
        setWaitList([...waitList, event.attachment.id]);
        const data = await form.addAttachment(event);
        if (data) {
          event.attachment.setAttributes(data);
        }
        setWaitList([...waitList.filter((id) => event.attachment.id !== id)]);
      }
    });
  }, []);

  const toggleEarlyAccess = () => {
    form.update({ early_access: !form.early_access });
  };

  const togglePreorderable = () => {
    form.update({ preorderable: !form.preorderable });
  };

  const handleSupportedPlatformChange = (e) => {
    if (e.target.checked) {
      form.addSupportedPlatform(e.target.dataset.id, e.target.name);
    } else {
      form.removeSupportedPlatform(e.target.dataset.id, e.target.name);
    }
  };

  const selectedCategoriesAsTags = form.categories.map((category) => ({
    ...category,
    name: category.title,
  }));

  const categoriesOptionsAsTags = form.categoryOptions.map((category) => ({
    ...category,
    name: category.title,
  }));

  const releaseDateAsDate = form.release_date.length > 0 ? new Date(form.release_date) : null;

  return (
    <form onSubmit={onSubmit}>
      <h1>{text}</h1>

      <div className="columns">
        <div className="column flex">
          <Uploader
            accept="image/*,video/*"
            addFile={form.addFile}
            files={form.files}
            reorder={form.reorderFiles}
          />
          <div className="form-column">
            <div className="title">
              <label htmlFor="title" className="form-label">
                Game Title
              </label>
              <input
                type="text"
                value={form.title}
                onChange={form.onChange}
                name="title"
                className="topcoat-text-input"
              />
            </div>
            <div className="esrb">
              <label htmlFor="esrb" className="form-label">
                ESRB
              </label>

              <select
                name="esrb"
                value={form.esrb}
                onChange={form.onChange}
                className="topcoat-text-input"
              >
                <option value="EVERYONE">EVERYONE</option>
                <option value="E_TEN_PLUS">E10+</option>
                <option value="TEEN">TEEN</option>
                <option value="MATURE">MATURE</option>
                <option value="ADULT">ADULT</option>
              </select>
            </div>
            <div className="game-category">
              <label htmlFor="category" className="form-label">
                Game Category
              </label>
              <ReactTags
                tags={selectedCategoriesAsTags}
                suggestions={categoriesOptionsAsTags}
                onDelete={form.removeCategory}
                onAddition={form.addCategory}
                autoresize={false}
                placeholderText="Select Category"
                minQueryLength={0}
                maxSuggestionsLength={
                  selectedCategoriesAsTags.length === 2 ? 0 : 100
                }
                classNames={{
                  root: 'react-tags',
                  rootFocused: 'is-focused',
                  selected: 'react-tags__selected',
                  selectedTag: 'react-tags__selected-tag',
                  selectedTagName: 'react-tags__selected-tag-name',
                  search: `react-tags__search ${
                    selectedCategoriesAsTags.length === 2 ? 'is-hidden' : ''
                  }`,
                  searchWrapper: 'react-tags__search-wrapper',
                  searchInput: 'react-tags__search-input topcoat-text-input',
                  suggestions: 'react-tags__suggestions',
                  suggestionActive: 'is-active',
                  suggestionDisabled: 'is-disabled',
                }}
              />
            </div>
            <div className="game-tags">
              <label htmlFor="tags" className="form-label">
                Game Tags
              </label>
              <ReactTags
                tags={form.tags}
                suggestions={form.tagsOptions.filter((tag) => !tag.disabled)}
                onDelete={form.removeTag}
                onAddition={form.addTag}
                autoresize={false}
                classNames={{
                  root: 'react-tags',
                  rootFocused: 'is-focused',
                  selected: 'react-tags__selected',
                  selectedTag: 'react-tags__selected-tag',
                  selectedTagName: 'react-tags__selected-tag-name',
                  search: 'react-tags__search',
                  searchWrapper: 'react-tags__search-wrapper',
                  searchInput: 'react-tags__search-input topcoat-text-input',
                  suggestions: 'react-tags__suggestions',
                  suggestionActive: 'is-active',
                  suggestionDisabled: 'is-disabled',
                }}
              />
            </div>
            <div className="early-access">
              <label className="form-label" htmlFor="early-access">
                Early Access
                <input
                  type="checkbox"
                  className="topcoat-switch__input"
                  onChange={toggleEarlyAccess}
                  id="early-access"
                  name="early-access"
                  checked={form.early_access}
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="field description-field">
        <div className="form-row">
          <div className="price">
            <label className="form-label" htmlFor="price">
              Price in USD
            </label>
            <input
              type="number"
              className="topcoat-text-input"
              value={form.price || ''}
              onChange={form.setPrice}
              name="price"
            />
          </div>

          <div>
            <label className="form-label">Release Date:</label>
            <DatePicker
              selected={releaseDateAsDate}
              onChange={form.setReleaseDate}
              dateFormat="Pp"
            />
          </div>
        </div>

        <label className="form-label description">
          Game Description
          <Tippy
            content="You may want to add photos or .gifs for a more appealing synopsis. (600x295)"
            interactive
            interactiveBorder={20}
            delay={100}
            arrow
            placement="auto"
          >
            <i className="fas fa-question-circle" />
          </Tippy>
        </label>
        <div>
          <input
            type="hidden"
            id="trix"
            value={form.description}
            name="description"
          />
          <trix-editor input="trix" name="description" ref={trixInput} />
        </div>
      </div>

      <div>
        <h4>Platforms Supported</h4>
        <div className="flex-column">
          {form.supportedPlatformOptions.map((platform) => {
            const checked = !!form.supported_platforms.find(
              (p) => p.id === platform.id,
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
                  />
                  {platform.name}
                </label>
                {platform.children.length > 0 && (
                  <div className="pc-platforms">
                    {checked
                      && platform.children.map((children) => (
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
                              !!form.supported_platforms.find(
                                (p) => p.id === children.id,
                              )
                            }
                          />
                          <div
                            className="topcoat-checkbox__checkmark"
                            style={{ marginRight: 10 }}
                          />
                          {children.name}
                        </label>
                      ))}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="system-requirements">
        {form.system_requirements.length > 0 && (
          <React.Fragment>
            <h4>System Requirements</h4>
            {form.system_requirements.map((systemRequirement) => (
              <div key={systemRequirement.name}>
                <div className="topcoat-tab-bar">
                  <label className="topcoat-tab-bar__item">
                    <button type="button" className="topcoat-tab-bar__button">
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

      {form.releaseDateInFuture() && (
        <div className="early-access">
          <label className="form-label">Preorderable</label>
          <label className="topcoat-switch">
            <input
              type="checkbox"
              className="topcoat-switch__input"
              onChange={togglePreorderable}
              id="preorderable"
              name="preorderable"
              value={form.preorderable}
            />
            <div className="topcoat-switch__toggle" />
          </label>
        </div>
      )}

      <br />

      <Errors errors={form.errors.full_messages.toJSON()} />

      <br />

      <button
        type="submit"
        disabled={!form.allFilesUploaded() || waitList.length !== 0}
        className="button"
      >
        {isUpdate ? 'UPDATE' : 'CREATE'}
      </button>
      {(!form.allFilesUploaded() || waitList.length !== 0) && (
        <p>Some files are still not uploaded.</p>
      )}
    </form>
  );
};

export default observer(Form);

import React, { useState, useRef, useEffect } from 'react';
import { observer } from 'mobx-react';

import Tippy from '@tippyjs/react';
import ReactTags from 'react-tag-autocomplete';
import DatePicker from 'react-datepicker';

import Errors from '../../../../components/Errors/Errors';

import Uploader from '../../../../components/Uploader/Uploader';
import SortablePreviews from '../../../../components/Uploader/SortablePreviews';
import Switch from '../../../../components/Form/Switch/Switch';

import SystemRequirements from './SystemRequirements';
import SupportedPlatforms from './SupportedPlatforms';
import SupportedLanguages from './SupportedLanguages';

import 'trix/dist/trix';
import 'trix/dist/trix.css';

import './Form.scss';

const Form = ({
  form, onSubmit, text, isUpdate,
}) => {
  const [waitList, setWaitList] = useState([]);

  const trixInput = useRef(null);

  useEffect(() => {
    trixInput.current.addEventListener('trix-initialize', (e) => {
      e.currentTarget.editor.loadHTML(form.description);
    });

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

  const onSortEnd = ({ oldIndex, newIndex }) => {
    form.reorderFiles(oldIndex, newIndex);
  };

  const selectedCategoriesAsTags = form
    .categories()
    .map((category_listing) => ({
      ...category_listing.category,
      name: category_listing.category.title,
    }));

  const categoriesOptionsAsTags = form.categoryOptions.map((category) => ({
    ...category,
    name: category.title,
  }));

  const tags = form.tags().map((listing_tag) => ({
    ...listing_tag.tag,
  }));

  const releaseDateAsDate = form.release_date.length > 0 ? new Date(form.release_date) : null;

  return (
    <form onSubmit={onSubmit} className="listing-form">
      <h1 className="form-title">{text}</h1>

      <div className="flex-row large-and-down-flex-column">
        <div className="flex-column flex-3">
          <Uploader
            accept="image/*,video/*"
            addFile={form.addFile}
            className={
              form.errors.hasError('uploader') ? 'input-with-error' : ''
            }
          />
          {form.errors.hasError('uploader') && (
            <small className="input-error">
              {form.errors.getErrors('uploader')}
            </small>
          )}
        </div>
        <div className="flex-row is-flex-touch if-flex-desktop is-hidden-widescreen">
          <SortablePreviews
            files={form.filesSorted()}
            onSortEnd={onSortEnd}
            helperClass="SortableHelper"
            axis="x"
            lockAxis="x"
            pressDelay={100}
          />
        </div>
        <div className="flex-column listing-basic-info flex-1">
          <div className="flex-column mb-5">
            <label htmlFor="title" className="label">
              Game Title
            </label>
            <input
              type="text"
              value={form.title}
              onChange={form.onChange}
              name="title"
              placeholder="Game Title"
              className={
                form.errors.hasError('title') ? 'input-with-error' : ''
              }
            />
            {form.errors.hasError('title') && (
              <small className="input-error">
                {form.errors.getErrors('title')}
              </small>
            )}
          </div>
          <div className="flex-column mb-5">
            <label htmlFor="esrb" className="label">
              ESRB
            </label>
            <select name="esrb" value={form.esrb} onChange={form.onChange}>
              <option value="EVERYONE">EVERYONE</option>
              <option value="E_TEN_PLUS">E10+</option>
              <option value="TEEN">TEEN</option>
              <option value="MATURE">MATURE</option>
              <option value="ADULT">ADULT</option>
            </select>
          </div>
          <div className="flex-column mb-5">
            <label htmlFor="category" className="label">
              Game Category
            </label>
            <ReactTags
              tags={selectedCategoriesAsTags}
              suggestions={categoriesOptionsAsTags}
              onDelete={form.removeCategory}
              onAddition={form.addCategory}
              autoresize
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
                search: `${
                  selectedCategoriesAsTags.length === 2
                    ? 'is-hidden'
                    : 'react-tags__search'
                }`,
                searchWrapper: 'react-tags__search-wrapper',
                searchInput: 'react-tags__search-input',
                suggestions: 'react-tags__suggestions',
                suggestionActive: 'is-active',
                suggestionDisabled: 'is-disabled',
              }}
            />
            {form.errors.hasError('categories') && (
              <small className="input-error">
                {form.errors.getErrors('categories')}
              </small>
            )}
          </div>
          <div className="flex-column mb-5">
            <label htmlFor="tags" className="label">
              Game Tags
            </label>
            <ReactTags
              tags={tags}
              suggestions={form.tagsOptions.filter((tag) => !tag.disabled)}
              onDelete={form.removeTag}
              onAddition={form.addTag}
              autoresize
            />
          </div>
          <div className="flex-column mb-5">
            <div className="flex-row align-center">
              <label
                className="label flex-row align-center m-0"
                htmlFor="early-access"
              >
                Early Access
              </label>
              <Switch
                value={form.early_access}
                checked={form.early_access}
                onChange={toggleEarlyAccess}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-row is-hidden-touch is-hidden-desktop-only is-flex-widescreen">
        <SortablePreviews
          files={form.filesSorted()}
          onSortEnd={onSortEnd}
          helperClass="SortableHelper"
          axis="x"
          lockAxis="x"
          pressDelay={100}
        />
      </div>

      <div className="flex-column mb-6">
        <label className="label">
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
          <trix-editor
            placeholder="Enter game description here"
            input="trix"
            name="description"
            ref={trixInput}
            class={
              form.errors.hasError('description') ? 'input-with-error' : ''
            }
          />
        </div>
        {form.errors.hasError('description') && (
          <small className="input-error">
            {form.errors.getErrors('description')}
          </small>
        )}
      </div>

      <div className="flex-row large-and-down-flex-column">
        <div className="flex-column align-start supported-platforms">
          <label className="label">Platforms Supported</label>
          <SupportedPlatforms
            options={form.supportedPlatformOptions}
            platforms={form.supportedPlatforms()}
            onChange={handleSupportedPlatformChange}
          />
          {form.errors.hasError('supportedPlatforms') && (
            <small className="input-error">
              {form.errors.getErrors('supportedPlatforms')}
            </small>
          )}
        </div>
        <div className="flex-column flex-grow">
          {form.systemRequirements().length > 0 && (
            <SystemRequirements
              system_requirements={form.systemRequirements()}
              error={
                form.errors.hasError('systemRequirements')
                && form.errors.getErrors('systemRequirements')
              }
            />
          )}
        </div>
      </div>

      <div className="flex-row">
        <div className="flex-column flex-1">
          <label className="label">Languages Supported</label>
          <SupportedLanguages
            languages={form.supported_languages}
            errors={form.errors}
          />
        </div>
      </div>

      <div className="flex-row justify-between align-center mobile-align-start price-details mobile-flex-column">
        <div className="flex-column mb-5">
          <label className="label" htmlFor="price">
            Price in USD
          </label>
          <div>
            <span className="input-addon-left">$</span>
            <input
              type="number"
              value={form.price || ''}
              onChange={form.setPrice}
              name="price"
              placeholder="Enter price"
              className={
                form.errors.hasError('price') ? 'input-with-error' : ''
              }
            />
          </div>
          {form.errors.hasError('price') && (
            <small className="input-error input-error-right">
              {form.errors.getErrors('price')}
            </small>
          )}
        </div>
        <div className="flex-column mb-5">
          <label className="label">Release Date:</label>
          <DatePicker
            selected={releaseDateAsDate}
            onChange={form.setReleaseDate}
            showTimeSelect
            dateFormat="Pp"
            placeholderText="Select release date"
            className={
              form.errors.hasError('releaseDate') ? 'input-with-error' : ''
            }
          />
          {form.errors.hasError('releaseDate') && (
            <small className="input-error">
              {form.errors.getErrors('releaseDate')}
            </small>
          )}
        </div>
      </div>
      {form.releaseDateInFuture() && (
        <div className="flex-column preorderable">
          <label className="label flex-row align-center">
            Preorderable
            <Switch
              value={form.preorderable}
              checked={form.preorderable}
              onChange={togglePreorderable}
            />
          </label>
        </div>
      )}

      <Errors errors={form.errors.full_messages.toJSON()} />

      {(!form.allFilesUploaded() || waitList.length !== 0) && (
        <p className="text-center">Please wait until all files are uploaded.</p>
      )}

      <div className="flex-row align-center justify-center">
        <button
          type="submit"
          disabled={!form.allFilesUploaded() || waitList.length !== 0}
          className="button"
        >
          {isUpdate ? 'UPDATE' : 'POST'}
        </button>
      </div>
    </form>
  );
};

export default observer(Form);

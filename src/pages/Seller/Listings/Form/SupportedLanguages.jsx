import React from 'react';
import ReactTags from 'react-tag-autocomplete';
import { observer } from 'mobx-react';

import './SupportedLanguages.scss';

const SupportedLanguages = ({ languages, errors }) => (
  <div className="flex-row supported-languages mobile-flex-column">
    <div className="flex-column flex-1 audio-languages mb-5">
      <span className="content-item-text">Audio</span>
      <ReactTags
        tags={languages.audio}
        suggestions={languages.audioSuggestions}
        onDelete={languages.removeAudio}
        onAddition={languages.addAudio}
        autoresize={false}
        minQueryLength={0}
        placeholderText="Select or add language"
        allowNew
      />
      {errors.hasError('audioLanguages') && (
        <small className="input-error">
          {errors.getErrors('audioLanguages')}
        </small>
      )}
    </div>
    <div className="flex-column flex-1 text-languages mb-5">
      <span className="content-item-text">Text</span>
      <ReactTags
        tags={languages.text}
        suggestions={languages.textSuggestions}
        onDelete={languages.removeText}
        onAddition={languages.addText}
        autoresize={false}
        minQueryLength={0}
        placeholderText="Select or add language"
        allowNew
      />
      {errors.hasError('textLanguages') && (
        <small className="input-error">
          {errors.getErrors('textLanguages')}
        </small>
      )}
    </div>
  </div>
);

export default observer(SupportedLanguages);

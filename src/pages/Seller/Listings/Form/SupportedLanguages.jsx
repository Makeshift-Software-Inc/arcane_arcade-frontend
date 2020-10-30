import React from 'react';
import ReactTags from 'react-tag-autocomplete';

const SupportedLanguages = ({ languages }) => (
  <div className="flex-row supported-languages">
    <div className="flex-column flex-1">
      <span className="content-item-text">Audio</span>
      <ReactTags
        tags={languages.audio}
        suggestions={languages.suggestions()}
        onDelete={languages.removeAudio}
        onAddition={languages.addAudio}
        autoresize={false}
        minQueryLength={0}
        allowNew
      />
    </div>
    <div className="flex-column flex-1">
      <span className="content-item-text">Text</span>
      <ReactTags
        tags={languages.text}
        suggestions={languages.suggestions()}
        onDelete={languages.removeText}
        onAddition={languages.addText}
        autoresize={false}
        minQueryLength={0}
        allowNew
      />
    </div>
  </div>
);

export default SupportedLanguages;

import React from 'react';
import { observer } from 'mobx-react';

import Loading from '../../Loading/Loading';
import AutocompleteItem from './AutocompleteItem';

import './AutocompleteDropdown.scss';

const AutocompleteDropdown = ({ items, searching, showMore }) => {
  const content = () => {
    if (searching) return <Loading small />;

    if (items.length === 0) return <p className="no-results">No search results.</p>;

    return items.map((item) => <AutocompleteItem key={item.id} item={item} />);
  };

  return (
    <div className="search-autocomplete-dropdown absolute flex-column">
      {content()}
      {showMore && (
        <button type="button" className="show-more" onClick={showMore}>
          Show More Results
        </button>
      )}
    </div>
  );
};

export default observer(AutocompleteDropdown);

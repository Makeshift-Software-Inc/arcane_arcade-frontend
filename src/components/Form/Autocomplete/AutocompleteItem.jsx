import React from 'react';
import { Link } from 'react-router-dom';

import './AutocompleteItem.scss';

const AutocompleteItem = ({ item }) => (
  <Link
    to={item.autocomplete().link}
    className="search-autocomplete-dropdown-item flex-row"
  >
    <img
      src={item.autocomplete().image.small}
      alt={item.autocomplete().title}
    />
    <div className="flex-column item-details">
      <p className="item-title text-overflow">{item.autocomplete().title}</p>
      <p className="item-price">
        $
        {item.autocomplete().price}
      </p>
    </div>
  </Link>
);

export default AutocompleteItem;

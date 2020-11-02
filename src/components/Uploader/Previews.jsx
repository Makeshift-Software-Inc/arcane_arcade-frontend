import React from 'react';
import { observer } from 'mobx-react';

import SortablePreview from './SortablePreview';

import './Previews.scss';

const Previews = ({ files }) => (
  <div className="uploader-previews">
    {files.map((file, index) => (
      <SortablePreview key={file.name} index={index} file={file} />
    ))}
  </div>
);

export default observer(Previews);

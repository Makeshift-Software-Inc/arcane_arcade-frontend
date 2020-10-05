import React from "react";
import { observer } from "mobx-react";

import SortablePreview from "./SortablePreview";

const Previews = ({ files }) => {
  return (
    <div className="previews">
      {files.map((file, index) => (
        <SortablePreview key={file.name} index={index} file={file} />
      ))}
    </div>
  );
};

export default observer(Previews);

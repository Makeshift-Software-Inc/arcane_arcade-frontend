import { types, flow } from "mobx-state-tree";
import BaseUpdate from "./BaseUpdate";

import Api from "../../services/Api";
import axios from "axios";

const CancelToken = axios.CancelToken;

const UploadedFile = types
  .model("UploadedFile", {
    name: types.string,
    type: types.string,
    size: types.number,
    url: types.string,
    data: types.frozen(),
    isDragged: false,
    loading: false,
    source: types.frozen(),
  })
  .actions((self) => ({
    afterCreate() {
      self.source = CancelToken.source();
      self.upload();
    },
    setDragging(value) {
      self.isDragged = value;
    },
    presign: flow(function* presign() {
      const params = {
        filename: self.name,
        type: self.type,
      };

      // get direct to s3 upload params
      try {
        const response = yield Api.get("/s3/params", { params });
        return response.data;
      } catch (e) {
        console.log("PRESIGN ERROR", e);
        return false;
      }
    }),
    upload: flow(function* upload() {
      self.loading = true;
      const presignParams = yield self.presign();

      if (!presignParams) {
        self.loading = false;
        return false;
      }

      try {
        const response = yield axios({
          method: presignParams.method,
          url: presignParams.url,
          data: presignParams.fields,
          headers: presignParams.headers,
          onUploadProgress: self.onUploadProgress,
          cancelToken: self.source.token,
        });

        console.log(response);
      } catch (e) {
        debugger;
        console.log("UPLOAD ERROR", e);
      }
    }),
    cancelUpload() {
      self.source.cancel("Upload canceled");
    },
    onUploadProgress(progressEvent) {
      console.log(progressEvent);
    },
  }));

export default types.compose(BaseUpdate, UploadedFile);

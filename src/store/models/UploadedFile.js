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
    progress: 0,
    awsId: types.maybe(types.string),
    awsUrl: types.maybe(types.string),
    attachment: types.frozen(),
  })
  .views((self) => ({
    uploaded() {
      return self.progress === 100;
    },
    keys() {
      return {
        id: self.awsId,
        storage: "cache",
        metadata: {
          size: self.size,
          filename: self.name,
          mime_type: self.type,
        },
      };
    },
  }))
  .actions((self) => ({
    afterCreate() {
      console.log("CREATED");
      self.source = CancelToken.source();
      // don't auto upload attachments
      if (!self.attachment) {
        self.upload();
      }
    },
    setDragging(value) {
      self.isDragged = value;
    },
    presign: flow(function* presign() {
      const params = {
        filename: self.name,
        type: self.type,
        size: self.size,
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

      const data = new FormData();
      Object.keys(presignParams.fields).forEach((field) => {
        data.append(field, presignParams.fields[field]);
      });

      data.append("file", self.data);

      try {
        yield axios({
          method: "post",
          url: presignParams.url,
          data,
          onUploadProgress: self.onUploadProgress,
          cancelToken: self.source.token,
        });

        const splitedKeys = presignParams.fields.key.split("/");

        self.awsId = splitedKeys[splitedKeys.length - 1];

        self.awsUrl = presignParams.full_url;
        self.loading = false;
        return true;
      } catch (e) {
        console.log("UPLOAD ERROR", e);
        self.loading = false;
        return false;
      }
    }),
    cancelUpload() {
      self.source.cancel("Upload canceled");
    },
    onUploadProgress(e) {
      self.progress = Math.round(e.loaded / e.total) * 100;
      console.log(self.progress);
    },
  }));

export default types.compose(BaseUpdate, UploadedFile);

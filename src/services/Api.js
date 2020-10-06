import axios from "axios";

class Api {
  static instance = (versionPath = "/v1") =>
    axios.create({
      baseURL: process.env.REACT_APP_API_URL + versionPath,
      withCredentials: true,
      headers: { 'Authorization': localStorage.getItem('auth_token') }
    });

  static async get(path, params = {}) {
    return await this.instance().get(path, params);
  }

  static async post(path, data) {
    return await this.instance().post(path, data);
  }

  static async put(path, data) {
    return await this.instance().put(path, data);
  }

  static async delete(path) {
    return await this.instance().delete(path);
  }
}

export default Api;

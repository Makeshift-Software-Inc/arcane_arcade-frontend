import axios from 'axios';

class Api {
  static instance = (versionPath = '/v1') => axios.create({
    baseURL: process.env.REACT_APP_API_URL + versionPath,
    withCredentials: true,
    headers: { Authorization: localStorage.getItem('auth_token') },
  });

  static async get(path, params = {}) {
    return this.instance().get(path, params);
  }

  static async post(path, data) {
    return this.instance().post(path, data);
  }

  static async put(path, data) {
    return this.instance().put(path, data);
  }

  static async delete(path) {
    return this.instance().delete(path);
  }
}

export default Api;

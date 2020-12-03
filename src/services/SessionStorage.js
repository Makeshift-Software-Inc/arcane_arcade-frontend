class SessionStorage {
  static buildKey(key) {
    return `${this.appName}-${key}`;
  }

  static get(key) {
    const value = sessionStorage.getItem(this.buildKey(key));
    return value ? JSON.parse(value) : null;
  }

  static set(key, value) {
    return sessionStorage.setItem(this.buildKey(key), JSON.stringify(value));
  }

  static remove(key) {
    return sessionStorage.removeItem(this.buildKey(key));
  }
}

SessionStorage.appName = 'ArcaneArcade';

export default SessionStorage;

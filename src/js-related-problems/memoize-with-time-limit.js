// Write a class that allows getting and setting key-value pairs,
// however a time until expiration is associated with each key.
// The class has three public methods:
// set(key, value, duration): accepts an integer key, an integer value, and a duration in milliseconds.
// Once the duration has elapsed, the key should be inaccessible.
// The method should return true if the same un-expired key already exists and false otherwise.
// Both the value and duration should be overwritten if the key already exists.
// get(key): if an un-expired key exists, it should return the associated value.
// Otherwise, it should return -1.
// count(): returns the count of un-expired keys.

class TimeLimitedCache {
  constructor() {
    this.cache = new Map();
  }

  /**
   * @param {number} key
   * @return {boolean} if un-expired key already existed
   */
  checkAndExpireCacheByKey(key) {
    let keyExisted = this.cache.has(key);
    if (keyExisted && Date.now() > this.cache.get(key).expired) {
      this.cache.delete(key);
      keyExisted = false;
    }
    return keyExisted;
  }

  checkAndExpireCache() {
    for (const key of this.cache.keys()) {
      this.checkAndExpireCacheByKey(key);
    }
  }

  /**
   * @param {number} key
   * @param {number} value
   * @param {number} duration time until expiration in ms
   * @return {boolean} if un-expired key already existed
   */
  set(key, value, duration) {
    const keyExisted = this.checkAndExpireCacheByKey(key);
    this.cache.set(key, {
      value,
      expired: duration + Date.now()
    });
    return keyExisted;
  };

  /**
   * @param {number} key
   * @return {number} value associated with key
   */
  get(key) {
    return this.checkAndExpireCacheByKey(key) ? this.cache.get(key).value : -1;
  };

  /**
   * @return {number} count of non-expired keys
   */
  count() {
    this.checkAndExpireCache();
    return this.cache.size;
  };
}

class TimeLimitedCacheTimeout {
  constructor() {
    this.cache = new Map();
  }

  /**
   * @param {number} key
   * @param {number} value
   * @param {number} duration time until expiration in ms
   * @return {boolean} if un-expired key already existed
   */
  set(key, value, duration) {
    const keyExisted = this.cache.has(key);
    if (keyExisted) {
      clearTimeout(this.cache.get(key).timer);
    }
    this.cache.set(key, {
      value,
      timer: setTimeout(() => this.cache.delete(key), duration)
    });
    return keyExisted;
  };

  /**
   * @param {number} key
   * @return {number} value associated with key
   */
  get(key) {
    return this.cache.has(key) ? this.cache.get(key).value : -1;
  };

  /**
   * @return {number} count of non-expired keys
   */
  count() {
    return this.cache.size;
  };
}

const timeLimitedCache = new TimeLimitedCache();
console.log('timeLimitedCache:', timeLimitedCache.set(1, 42, 1000)); // false
console.log('timeLimitedCache:', timeLimitedCache.get(1)); // 42
console.log('timeLimitedCache:', timeLimitedCache.count()); // 1
setTimeout(
  () => console.log('timeLimitedCache after 1200 ms:', timeLimitedCache.count()),
  1200
); // 0

const timeLimitedCacheTimeout = new TimeLimitedCacheTimeout();
console.log('timeLimitedCacheTimeout:', timeLimitedCacheTimeout.set(1, 42, 1000)); // false
console.log('timeLimitedCacheTimeout:', timeLimitedCacheTimeout.get(1)); // 42
console.log('timeLimitedCacheTimeout:', timeLimitedCacheTimeout.count()); // 1
setTimeout(
  () => console.log('timeLimitedCacheTimeout after 1200 ms:', timeLimitedCacheTimeout.count()),
  1200
); // 0

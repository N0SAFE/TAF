const privateField = {
    cache: true,
    blackList: [],
    dbName: "cache_storage"
}

export default new(class CacheManager {

    get dbName() {
        return privateField.dbName
    }
    get blackList() {
        return privateField.blackList
    }
    set blackList(item) {
        privateField.blackList = item
    }
    get cache() {
        return privateField.cache
    }
    set cache(item) {
        privateField.cache = item
    }

    createBlacklist(list = []) {
        this.blackList.push(...list);
    }

    checkBlacklist(method, url) {
        return this.blackList.find(i => i[0] === method && url.match(i[1]));
    }

    put(url, data, options = {}) {
        const self = this
        return new Promise(resolve => {
            if (self.cache == false) {
                resolve(false)
            }

            const cacheRequest = indexedDB.open(self.dbName);

            cacheRequest.onupgradeneeded = function(event) {
                const db = event.target.result;
                if (!db.objectStoreNames.length || !db.objectStoreNames.contains("requests")) {
                    self.createStore(db);
                }
            };

            cacheRequest.onsuccess = function(event) {
                const db = event.target.result;
                const requestObjectStore = db.transaction(["requests"], "readwrite").objectStore("requests");
                const { method, ttl } = options;
                let expires = 0;
                if (ttl) {
                    expires = new Date().getTime() + ttl;
                }
                const save = {
                    urlMethod: `${url}:::${method}`,
                    url,
                    method,
                    expires,
                    data,
                };
                requestObjectStore.add(save);
                db.close();
                resolve(true);
            }
        });
    }

    get(url, options = {}) {
        const self = this
        return new Promise(resolve => {
            if (self.cache == false) {
                resolve(false)
            } else if (this.checkBlacklist(options.method, url)) {
                resolve(false);
            } else {
                const checkCacheRequest = indexedDB.open(self.dbName);
                checkCacheRequest.onupgradeneeded = function(event) {
                    const db = event.target.result;
                    if (!db.objectStoreNames.length || !db.objectStoreNames.contains("requests")) {
                        self.createStore(db);
                    }
                }
                checkCacheRequest.onsuccess = function(event) {
                    const db = event.target.result;
                    if (!db.objectStoreNames.length || !db.objectStoreNames.contains("requests")) {
                        db.close();
                        resolve(false);
                    } else {
                        try {
                            const requestObjectStore = db.transaction(["requests"], "readwrite").objectStore("requests");
                            const method = options.method;
                            const key = `${url}:::${method}`;
                            const data = requestObjectStore.get(key);
                            data.onsuccess = function(event) {
                                const record = event.target.result;
                                if (record && record.expires && record.expires >= new Date().getTime()) {
                                    db.close();
                                    resolve(record);
                                } else if (record && !record.expires) {
                                    resolve(record);
                                } else if (record) {
                                    requestObjectStore.delete(key)
                                }
                                db.close();
                                resolve(false);
                            }
                        } catch (error) {
                            db.close();
                            resolve(false);
                        }
                    }
                }
            }
        });
    }

    clear() {
        const self = this
        return new Promise(resolve => {
            const cacheRequest = indexedDB.open(self.dbName);

            cacheRequest.onupgradeneeded = function(event) {
                const db = event.target.result;
                if (!db.objectStoreNames.length || !db.objectStoreNames.contains("requests")) {
                    self.createStore(db);
                }
            };

            cacheRequest.onsuccess = function(event) {
                const db = event.target.result;
                const requestObjectStore = db.transaction(["requests"], "readwrite").objectStore("requests");
                const data = requestObjectStore.getAll();

                data.onsuccess = function() {
                    this.result.forEach(function(obj) {
                        requestObjectStore.delete(obj.urlMethod)
                    })
                    db.close();
                    resolve(true)
                }
            }
        });
    }

    createStore(db) {
        const objectStore = db.createObjectStore("requests", { keyPath: "urlMethod" });
        objectStore.onsuccess = function(event) {
            console.info("XHRCache Created Store");
        }
    }
})
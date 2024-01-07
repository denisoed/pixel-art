import { openDB } from 'idb';

const useIDBService = (db: string, table: string, version: number) => {
  const dbPromise = openDB(db, version, {
    upgrade(db) {
      db.createObjectStore(table);
    },
  });

  async function get(key: string) {
    return (await dbPromise).get(table, key);
  }
  async function set(key: string, val: string) {
    return (await dbPromise).put(table, val, key);
  }
  async function del(key: string) {
    return (await dbPromise).delete(table, key);
  }
  async function clear() {
    return (await dbPromise).clear(table);
  }
  async function keys() {
    return (await dbPromise).getAllKeys(table);
  }
  async function count() {
    return (await dbPromise).count(table);
  }

  return {
    get,
    set,
    del,
    clear,
    keys,
    count,
  };
};

export default useIDBService;

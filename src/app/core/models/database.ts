export default class Database {
    indexedDB: any;
    name: string;

    constructor(name: string) {
        this.name = name
        this.init()
    }

    private init(): void {
        if (!('indexedDB' in window)) {
            console.error('This browser doesn\'t support IndexedDB');
            return;
        }
        
        this.indexedDB = window.indexedDB 
        window.IDBTransaction = window.IDBTransaction;
        window.IDBKeyRange = window.IDBKeyRange;
    }

    insert(objectStore: string, data: {key: string, value: any}): void {
        let open = this.indexedDB.open(this.name, 3)

        open.onupgradeneeded = function (): void {
            let db = open.result
            if (!db.objectStoreNames.contains(objectStore)) {
                db.createObjectStore(objectStore, { keyPath: 'key' });
            }
        }

        open.onsuccess = function (): void {
            let db = open.result
            let tx = db.transaction(objectStore, 'readwrite')
            let store = tx.objectStore(objectStore)

            store.put(data)

            tx.oncomplete = function (): void {
                console.log("Inserted")
                db.close()
            }
        }

        open.onerror = function (): void {
            console.log("Database connection error")
        }
    }

    read(objectStore: string, key: string): void {
        let open = this.indexedDB.open(this.name, 3)
        open.onupgradeneeded = function () {
            let db = open.result
            if (!db.objectStoreNames.contains(objectStore)) {
                db.createObjectStore(objectStore, { keyPath: 'key' });
            }
        }
        open.onsuccess = () => {
            let db = open.result
            let rx = db.transaction(objectStore, 'readwrite')
            let store = rx.objectStore(objectStore)
            store.get(key)
            store.onsuccess = (event) => {
                console.log(store.result);
                db.close()
            };
            store.onerror = (event) => {
                console.log(store.result);
                db.close()
            };

            /*if(callback !== null && typeof callback == 'function') {
                    callback(store.result)
                }*/
        }
        open.onerror = function (): void {
            console.log("Database connection error")
        }
    }
}
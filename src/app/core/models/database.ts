export default class Database {
    indexedDB: any;
    name: string;

    constructor(name: string) {
        this.name = name
        this.init()
    }

    private init(): void {
        if (!("indexedDB" in window)) {
            console.error("This browser doesn't support IndexedDB");
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
                db.createObjectStore(objectStore, { keyPath: "key" });
            }
        }

        open.onsuccess = function (): void {
            let db = open.result
            let tx = db.transaction(objectStore, "readwrite")
            let store = tx.objectStore(objectStore)

            store.put(data)

            tx.oncomplete = function (): void {
                console.log("Inserted")
                db.close()
            }
        }

        open.onerror = function (): void {
            alert("error")
            console.log("Database connection error")
        }
    }

    read(objectStore: string, key: string, callback: Function): void {
        let open = this.indexedDB.open(this.name, 3)
        open.onupgradeneeded = () => {
            let db = open.result
            if (!db.objectStoreNames.contains(objectStore)) {
                db.createObjectStore(objectStore, { keyPath: "key" });
            }
        }
        open.onsuccess = () => {
            let db = open.result
            let transaction = db.transaction([objectStore]);
            let object_store = transaction.objectStore(key);
            let request = object_store.openCursor();

            request.onerror = function(event) {
                console.error("error fetching data");
            };
            request.onsuccess = (event) => {
                let cursor = event.target.result;
                if (cursor) {
                    let key = cursor.primaryKey;
                    let value = cursor.value;
                    cursor.continue();
                    if(callback !== undefined && typeof callback === "function") {
                        callback(value)
                    }
                }
                else {
                    // no more results
                }
            };
        }
        open.onerror = function (): void {
            console.log("Database connection error")
        }
    }
}
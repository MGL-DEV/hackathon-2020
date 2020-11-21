import { Injectable } from "@angular/core";

import { Database } from "@app/core/models"

@Injectable({
    providedIn: "root"
})
export class IDBService {

    private database;

    constructor() {
        this.database = new Database("storage")
    }

    insert(objectStore: string, data: any) {
        this.database.insert(objectStore, data)
    }

    get(objectStore: string, key: string, callback: () => any) {
        return this.database.read(objectStore, key, callback)
    }

}

import { Injectable } from "@angular/core";

import { Storage } from "@app/core/models"

@Injectable({
    providedIn: "root"
})
export class IDBService {

    private storage;

    constructor() {
        this.storage = new Storage()
    }

    set(key: string, value: string) {
        this.storage.set(key, value)
    }

    get(key: string) {
        return this.storage.read(key)
    }

}

import { Injectable } from "@angular/core";

import { Storage } from "@app/core/models"

@Injectable({
    providedIn: "root"
})
export class StorageService {

    private storage;

    constructor() {
        this.storage = new Storage()
    }

    append(key: string, value: string) {
        let data = [... this.get("log")];
        console.log(key, value, data)
        data.push(value)
        this.set(key, data)
    }

    set(key: string, value: any) {
        console.log(JSON.stringify(value))
        this.storage.set(key, JSON.stringify(value))
    }

    get(key: string): any {
        let data = this.storage.read(key)
        if (data !== undefined) {
            return JSON.parse(data)
        }
        return []
    }

}

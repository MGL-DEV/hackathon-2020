export default class Storage {
    constructor() { }

    set(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    read(key: string): string {
        return localStorage[key]
    }
}
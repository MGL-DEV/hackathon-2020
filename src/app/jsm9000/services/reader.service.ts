import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class ReaderService {

    constructor() { }

    read(): Observable<string> {
        return new Observable(observer => {
            fetch("./assets/subtitles/introduction.txt").then(response => {
                const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
                return reader.read().then( function processResult(result) {
                    if (result.done) {
                        observer.complete();
                        return;
                    }
                    observer.next(result.value);
                    return reader.read().then(processResult);
                });
            });
        });
    }

}

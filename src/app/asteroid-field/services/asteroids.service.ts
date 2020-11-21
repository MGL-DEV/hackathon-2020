import { Injectable } from "@angular/core";
import { InlineWorker } from "@app/asteroid-field/models";
import { IDBService } from "@app/core/services/idb.service";

@Injectable({
    providedIn: "root"
})
export class AsteroidsService {
    postMessage: any;

    constructor(
        public iDBService: IDBService
    ) { }

    generate() {
        const worker = new InlineWorker(() => {
            const count = 1000
            function getRandom(min: number, max: number) { // min and max included
                return Math.floor(Math.random() * (max - min + 1) + min);
            }

            function generate() {
                const asteroidId = getRandom(1,4)
                const asteroidKey = `asteorid_${asteroidId}`

                return {
                    speed: 0,
                    assets: asteroidKey,
                    coord: {
                        x: 0,
                        y: 0
                    },
                    size: {
                        width: 0,
                        height: 0
                    }
                }
            }

            let asteroids = []
            for(let i = 0; i < count; i++) {
                asteroids.push(generate())
            }

            this.postMessage({
                asteroids
            });
        });

        worker.postMessage({ limit: 300000 });

        worker.onmessage().subscribe((data) => {
            this.iDBService.insert("asteroids", {
                key: "asteroids",
                value: data.data.asteroids
            })
            worker.terminate();
        });
    }

    get(callback: () => any) {
        this.iDBService.get("asteroids", "asteroids", callback)
    }

}

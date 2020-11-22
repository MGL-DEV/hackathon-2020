import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { VideoComponent } from "./components";

const routes: Routes = [
    {
        path: "introduction",
        component: VideoComponent,
        data: {
            scene: {
                source: "https://sileo.mgldev.hu/video/intro.mp4",
                next: "/jsm9000/introduction"
            }
        }
    }, {
        path: "explode",
        component: VideoComponent,
        data: {
            scene: {
                source: "https://sileo.mgldev.hu/video/robbanas.mp4",
                next: "/jsm9000/spacecraft-chapter"
            }
        }
    }, {
        path: "travel/1",
        component: VideoComponent,
        data: {
            scene: {
                source: "https://sileo.mgldev.hu/video/atvezeto_1.mp4",
                next: "/jsm9000/asteroid-field-chapter"
            }
        }
    }, {
        path: "travel/2",
        component: VideoComponent,
        data: {
            scene: {
                source: "https://sileo.mgldev.hu/video/atvezeto_2.mp4",
                next: "/jsm9000/alien-hunting-chapter"
            }
        }
    }, {
        path: "travel/3",
        component: VideoComponent,
        data: {
            scene: {
                source: "https://sileo.mgldev.hu/video/atvezeto_1.mp4",
                next: "/jsm9000/run-chapter"
            }
        }
    }, {
        path: "travel/4",
        component: VideoComponent,
        data: {
            scene: {
                source: "https://sileo.mgldev.hu/video/atvezeto_3.mp4",
                next: "/jsm9000/end"
            }
        }
    }, {
        path: "end",
        component: VideoComponent,
        data: {
            scene: {
                source: "https://sileo.mgldev.hu/video/ending.mp4",
                next: "/big-red-button"
            }
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CinematicsRoutingModule { }
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Jsm9000Component } from "./components";

import { JSM9000State } from "./models";

const routes: Routes = [
    {
        path: "introduction",
        component: Jsm9000Component,
        data: {
            chapter: {
                source: "./assets/subtitles/introduction.txt",
                next: "/big-red-button",
                status: JSM9000State.Default
            }
        }
    }, {
        path: "spacecraft-chapter",
        component: Jsm9000Component,
        data: {
            chapter: {
                source: "./assets/subtitles/spacecraft-chapter.txt",
                next: "/spacecraft",
                status: JSM9000State.Alert
            }
        }
    }, {
        path: "spacecraft-success",
        component: Jsm9000Component,
        data: {
            chapter: {
                source: "./assets/subtitles/spacecraft-success.txt",
                next: "/jsm9000/report-chapter",
                status: JSM9000State.Success
            }
        }
    }, {
        path: "report-chapter",
        component: Jsm9000Component,
        data: {
            chapter: {
                source: "./assets/subtitles/report-chapter.txt",
                next: "/report",
                status: JSM9000State.Default
            }
        }
    }, {
        path: "report-success",
        component: Jsm9000Component,
        data: {
            chapter: {
                source: "./assets/subtitles/report-success.txt",
                next: "/cinematics/travel/1",
                status: JSM9000State.Default
            }
        }
    }, {
        path: "asteroid-field-chapter",
        component: Jsm9000Component,
        data: {
            chapter: {
                source: "./assets/subtitles/asteroid-field-chapter.txt",
                next: "/asteroid-field",
                status: JSM9000State.Alert
            }
        }
    }, {
        path: "asteroid-field-success",
        component: Jsm9000Component,
        data: {
            chapter: {
                source: "./assets/subtitles/asteroid-field-success.txt",
                next: "/cinematics/travel/2",
                status: JSM9000State.Success
            }
        }
    }, {
        path: "alien-hunting-chapter",
        component: Jsm9000Component,
        data: {
            chapter: {
                source: "./assets/subtitles/alien-hunting-chapter.txt",
                next: "/alien-hunting",
                status: JSM9000State.Alert
            }
        }
    }, {
        path: "alien-hunting-success",
        component: Jsm9000Component,
        data: {
            chapter: {
                source: "./assets/subtitles/alien-hunting-success.txt",
                next: "/cinematics/travel/3",
                status: JSM9000State.Success
            }
        }
    }, {
        path: "run-chapter",
        component: Jsm9000Component,
        data: {
            chapter: {
                source: "./assets/subtitles/run-chapter.txt",
                next: "/run",
                status: JSM9000State.Alert
            }
        }
    }, {
        path: "run-success",
        component: Jsm9000Component,
        data: {
            chapter: {
                source: "./assets/subtitles/run-success.txt",
                next: "/cinematics/travel/4",
                status: JSM9000State.Success
            }
        }
    }, {
        path: "end",
        component: Jsm9000Component,
        data: {
            chapter: {
                source: "./assets/subtitles/end.txt",
                next: "/cinematics/end",
                status: JSM9000State.Default
            }
        }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Jsm9000RoutingModule {}
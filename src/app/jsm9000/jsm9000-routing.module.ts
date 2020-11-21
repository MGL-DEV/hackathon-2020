import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Jsm9000Component } from "./components";

const routes: Routes = [
    {
        path: "introduction",
        component: Jsm9000Component,
        data: {
            chapter: {
                source: "./assets/subtitles/introduction.txt",
                next: "/big-red-button"
            }
        }
    }, {
        path: "spacecraft-chapter",
        component: Jsm9000Component,
        data: {
            chapter: {
                source: "./assets/subtitles/spacecraft-chapter.txt",
                next: "/spacecraft"
            }
        }
    }, {
        path: "spacecraft-success",
        component: Jsm9000Component,
        data: {
            chapter: {
                source: "./assets/subtitles/spacecraft-success.txt",
                next: "/jsm9000/report-chapter"
            }
        }
    }, {
        path: "report-chapter",
        component: Jsm9000Component,
        data: {
            chapter: {
                source: "./assets/subtitles/report-chapter.txt",
                next: "/report"
            }
        }
    }, {
        path: "report-success",
        component: Jsm9000Component,
        data: {
            chapter: {
                source: "./assets/subtitles/report-success.txt",
                next: "/cinematics/travel/1"
            }
        }
    }, {
        path: "asteroid-field-chapter",
        component: Jsm9000Component,
        data: {
            chapter: {
                source: "./assets/subtitles/asteroid-field-chapter.txt",
                next: "/asteroid-field"
            }
        }
    }, {
        path: "asteroid-field-success",
        component: Jsm9000Component,
        data: {
            chapter: {
                source: "./assets/subtitles/asteroid-field-success.txt",
                next: "/cinematics/travel/2"
            }
        }
    }, {
        path: "alien-hunting-chapter",
        component: Jsm9000Component,
        data: {
            chapter: {
                source: "./assets/subtitles/alien-hunting-chapter.txt",
                next: "/alien-hunting"
            }
        }
    }, {
        path: "alien-hunting-success",
        component: Jsm9000Component,
        data: {
            chapter: {
                source: "./assets/subtitles/alien-hunting-success.txt",
                next: "/cinematics/travel/3"
            }
        }
    }, {
        path: "run-chapter",
        component: Jsm9000Component,
        data: {
            chapter: {
                source: "./assets/subtitles/run-chapter.txt",
                next: "/run"
            }
        }
    }, {
        path: "run-success",
        component: Jsm9000Component,
        data: {
            chapter: {
                source: "./assets/subtitles/run-success.txt",
                next: "/cinematics/travel/4"
            }
        }
    }, {
        path: "end",
        component: Jsm9000Component,
        data: {
            chapter: {
                source: "./assets/subtitles/end.txt",
                next: "/cinematics/end"
            }
        }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Jsm9000RoutingModule {}
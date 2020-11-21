import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { VideoComponent } from "./components";

const routes: Routes = [
    {
        path: "",
        component: VideoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CinematicsRoutingModule { }

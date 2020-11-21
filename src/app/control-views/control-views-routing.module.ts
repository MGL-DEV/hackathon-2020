import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LaunchScreenComponent, BigRedButtonComponent } from "./components";

const routes: Routes = [
    {
        path: "",
        component: LaunchScreenComponent
    }, {
        path: "big-red-button",
        component: BigRedButtonComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ControlViewsRoutingModule { }

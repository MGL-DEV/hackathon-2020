import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RunComponent } from "./components";

const routes: Routes = [
    {
        path: "",
        component: RunComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RunRoutingModule { }

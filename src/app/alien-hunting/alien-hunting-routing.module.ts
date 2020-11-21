import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AlienHuntingComponent } from "./components";

const routes: Routes = [
    {
        path: "",
        component: AlienHuntingComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AlienHuntingRoutingModule { }

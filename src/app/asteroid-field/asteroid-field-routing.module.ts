import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AsteroidFieldComponent } from "./components";

const routes: Routes = [
    {
        path: "",
        component: AsteroidFieldComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AsteroidFieldRoutingModule { }

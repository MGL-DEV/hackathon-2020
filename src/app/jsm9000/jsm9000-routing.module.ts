import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Jsm9000Component } from "./components";

const routes: Routes = [
    {
        path: ":chapter",
        component: Jsm9000Component
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Jsm9000RoutingModule {}
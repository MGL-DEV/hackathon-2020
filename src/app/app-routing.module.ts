import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        loadChildren: () => import("./cinematics/cinematics.module").then(m => m.CinematicsModule)
    }, {
        path: "jsm9000",
        loadChildren: () => import("./jsm9000/jsm9000.module").then(m => m.Jsm9000Module)
    }, {
        path: "asteroid-field",
        loadChildren: () => import("./asteroid-field/asteroid-field.module").then(m => m.AsteroidFieldModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

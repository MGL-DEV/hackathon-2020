import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
    {
        path: "",
        loadChildren: () => import("./control-views/control-views.module").then(m => m.ControlViewsModule)
    }, {
        path: "cinematics",
        loadChildren: () => import("./cinematics/cinematics.module").then(m => m.CinematicsModule)
    }, {
        path: "jsm9000",
        loadChildren: () => import("./jsm9000/jsm9000.module").then(m => m.Jsm9000Module)
    }, {
        path: "asteroid-field",
        loadChildren: () => import("./asteroid-field/asteroid-field.module").then(m => m.AsteroidFieldModule)
    }, {
        path: "spacecraft",
        loadChildren: () => import("./spacecraft/spacecraft.module").then(m => m.SpacecraftModule)
    }, {
        path: "report",
        loadChildren: () => import("./report/report.module").then(m => m.ReportModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

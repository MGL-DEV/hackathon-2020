import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        loadChildren: () => import("./jsm9000/jsm9000.module").then(m => m.Jsm9000Module)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@shared/shared.module";
import { Jsm9000RoutingModule } from "./jsm9000-routing.module";
import { DisplayComponent } from "./components";

@NgModule({
    declarations: [
        DisplayComponent
    ],
    imports: [
        CommonModule,
        Jsm9000RoutingModule,
        SharedModule
    ]
})
export class Jsm9000Module { }

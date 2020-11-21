import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@shared/shared.module";
import { Jsm9000RoutingModule } from "./jsm9000-routing.module";
import { Jsm9000Component, MachineFaceComponent, DisplayComponent } from "./components";

@NgModule({
    declarations: [
        DisplayComponent,
        MachineFaceComponent,
        Jsm9000Component
    ],
    imports: [
        CommonModule,
        Jsm9000RoutingModule,
        SharedModule
    ]
})
export class Jsm9000Module { }

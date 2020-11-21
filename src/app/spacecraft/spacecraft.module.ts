import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@shared/shared.module";
import { SpacecraftRoutingModule } from "./spacecraft-routing.module";
import { SpacecraftComponent } from "./components";

@NgModule({
    declarations: [
        SpacecraftComponent
    ],
    imports: [
        CommonModule,
        SpacecraftRoutingModule,
        SharedModule
    ]
})
export class SpacecraftModule { }

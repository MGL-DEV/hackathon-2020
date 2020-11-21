import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@shared/shared.module";
import { AlienHuntingRoutingModule } from "./alien-hunting-routing.module";
import { AlienHuntingComponent } from "./components";


@NgModule({
    declarations: [AlienHuntingComponent],
    imports: [
        CommonModule,
        AlienHuntingRoutingModule,
        SharedModule
    ]
})
export class AlienHuntingModule { }

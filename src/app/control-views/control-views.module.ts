import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@shared/shared.module";
import { ControlViewsRoutingModule } from "./control-views-routing.module";
import { LaunchScreenComponent, BigRedButtonComponent } from "./components";

@NgModule({
    declarations: [
        LaunchScreenComponent,
        BigRedButtonComponent
    ],
    imports: [
        CommonModule,
        ControlViewsRoutingModule,
        SharedModule
    ]
})
export class ControlViewsModule { }

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@shared/shared.module";
import { RunRoutingModule } from "./run-routing.module";
import { RunComponent } from "./components";

@NgModule({
    declarations: [RunComponent],
    imports: [
        CommonModule,
        RunRoutingModule,
        SharedModule
    ]
})
export class RunModule { }

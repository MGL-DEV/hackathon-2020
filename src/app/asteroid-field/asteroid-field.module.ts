import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@shared/shared.module";
import { AsteroidFieldRoutingModule } from "./asteroid-field-routing.module";
import { AsteroidFieldComponent } from "./components";

@NgModule({
    declarations: [
        AsteroidFieldComponent
    ],
    imports: [
        CommonModule,
        AsteroidFieldRoutingModule,
        SharedModule
    ]
})
export class AsteroidFieldModule { }

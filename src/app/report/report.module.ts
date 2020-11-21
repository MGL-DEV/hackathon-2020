import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@shared/shared.module";
import { ReportRoutingModule } from "./report-routing.module";
import { ReportComponent } from "./components";


@NgModule({
    declarations: [ReportComponent],
    imports: [
        CommonModule,
        ReportRoutingModule,
        SharedModule
    ]
})
export class ReportModule { }

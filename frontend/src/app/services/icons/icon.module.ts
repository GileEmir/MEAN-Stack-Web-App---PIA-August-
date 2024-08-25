import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconUserComponent } from "./icon-user";
import { IconLockDotsComponent } from "./icon-lock-dots";
import { IconWarningHexComponent } from "./icon-warning-hex";
import { IconGearComponent } from "./icon-gear";
@NgModule({
	imports: [CommonModule],
	declarations: [
        IconUserComponent,
        IconLockDotsComponent,
        IconWarningHexComponent,
        IconGearComponent
	],
	exports: [
        IconUserComponent,
        IconLockDotsComponent,
        IconWarningHexComponent,
        IconGearComponent
	],
})
export class IconModule { }

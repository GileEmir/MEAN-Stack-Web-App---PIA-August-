import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconUserComponent } from "./icon-user";
import { IconLockDotsComponent } from "./icon-lock-dots";
import { IconWarningHexComponent } from "./icon-warning-hex";
@NgModule({
	imports: [CommonModule],
	declarations: [
        IconUserComponent,
        IconLockDotsComponent,
        IconWarningHexComponent
	],
	exports: [
        IconUserComponent,
        IconLockDotsComponent,
        IconWarningHexComponent
	],
})
export class IconModule { }

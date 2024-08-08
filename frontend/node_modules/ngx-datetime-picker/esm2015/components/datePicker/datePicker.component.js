import * as tslib_1 from "tslib";
var DatePickerComponent_1;
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, ElementRef, forwardRef, ViewChild, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { IsMobileService } from '../../services/isMobile.service';
import { DateService } from '../../services/date.service';
import { StyleObject } from '../../models/styleObject.model';
import { Renderer } from '../../services/renderer.service';
let DatePickerComponent = DatePickerComponent_1 = class DatePickerComponent {
    constructor(isMobileService, dateService, eRef, renderer) {
        this.isMobileService = isMobileService;
        this.dateService = dateService;
        this.eRef = eRef;
        this.renderer = renderer;
        this.disableInput = false;
        this.disableButton = false;
        this.disablePicker = false;
        this.doNotCloseOnDateSet = false;
        this.styles = new StyleObject();
        this.selectedDateChange = new EventEmitter();
        this.pickerVisible = false;
        this.isMobile = isMobileService.isMobile;
        this.placeholder = this.placeholder || '';
    }
    offClick(event) {
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.pickerVisible = false;
        }
    }
    get formattedDate() {
        return this.dateService.formatMMDDYYYY(this.selectedDate);
    }
    get mobileFormattedDate() {
        return this.dateService.formatMobileYYYYMMDD(this.selectedDate);
    }
    writeValue(value) {
        this.selectedDate = value;
    }
    registerOnChange(handler) {
        this.selectedDateChange.subscribe(handler);
    }
    registerOnTouched() { }
    // for use with the native html5 element. only emit's new valid dates.
    setDate(date) {
        this.invalid = !Date.parse(`${date} 00:00:00`);
        if (!this.invalid) {
            // set the time to zero so that values emitted on mobile are the same as on desktop
            this.selectedDate = new Date(`${date} 00:00:00`);
            this.selectedDateChange.emit(this.selectedDate);
        }
    }
    ngOnInit() {
        if (typeof this.selectedDate == 'string') {
            this.selectedDate = new Date(this.selectedDate);
        }
    }
    newDatePicked(date) {
        this.invalid = false;
        this.selectedDateChange.emit(date);
        this.selectedDate = date;
    }
    setPickerVisible(close) {
        this.pickerVisible = close;
    }
    focus() {
        this.renderer.invokeElementMethod(this.input.nativeElement, 'focus');
    }
};
DatePickerComponent.ctorParameters = () => [
    { type: IsMobileService },
    { type: DateService },
    { type: ElementRef },
    { type: Renderer }
];
tslib_1.__decorate([
    Input()
], DatePickerComponent.prototype, "selectedDate", void 0);
tslib_1.__decorate([
    Input()
], DatePickerComponent.prototype, "min", void 0);
tslib_1.__decorate([
    Input()
], DatePickerComponent.prototype, "max", void 0);
tslib_1.__decorate([
    Input()
], DatePickerComponent.prototype, "placeholder", void 0);
tslib_1.__decorate([
    Input()
], DatePickerComponent.prototype, "inputTabIndex", void 0);
tslib_1.__decorate([
    Input()
], DatePickerComponent.prototype, "disableInput", void 0);
tslib_1.__decorate([
    Input()
], DatePickerComponent.prototype, "disableButton", void 0);
tslib_1.__decorate([
    Input()
], DatePickerComponent.prototype, "disablePicker", void 0);
tslib_1.__decorate([
    Input()
], DatePickerComponent.prototype, "doNotCloseOnDateSet", void 0);
tslib_1.__decorate([
    Input()
], DatePickerComponent.prototype, "styles", void 0);
tslib_1.__decorate([
    Output()
], DatePickerComponent.prototype, "selectedDateChange", void 0);
tslib_1.__decorate([
    ViewChild('input')
], DatePickerComponent.prototype, "input", void 0);
tslib_1.__decorate([
    HostListener('document:click', ['$event'])
], DatePickerComponent.prototype, "offClick", null);
DatePickerComponent = DatePickerComponent_1 = tslib_1.__decorate([
    Component({
        selector: 'ngx-date-picker',
        template: "<div [ngSwitch]=\"isMobile\"\n     [class.invalid]=\"invalid\">\n\t<div *ngSwitchCase=\"true\">\n\t\t<input type=\"date\" #input [disabled]=\"disableInput || disablePicker\" [placeholder]=\"placeholder\" [value]=\"mobileFormattedDate\" (change)=\"setDate($event.target.value)\" [tabindex]=\"inputTabIndex\" [min]=\"min\" [max]=\"max\" />\n\t</div>\n\t<div *ngSwitchDefault>\n\t\t<div class=\"ngx-picker\">\n\t\t\t<input type=\"text\"\n                   #input\n                   [ngStyle]=\"styles.input\"\n                   [disabled]=\"disableInput || disablePicker\"\n                   [placeholder]=\"placeholder\"\n                   (focusin)=\"setPickerVisible(true)\"\n                   [value]=\"formattedDate\"\n                   (change)=\"setDate($event.target.value)\"\n                   [tabindex]=\"inputTabIndex\"\n\t\t\t/>\n\n\t\t\t<button type=\"button\"\n                    [ngStyle]=\"styles.button\"\n                    [disabled]=\"disableButton || disablePicker\"\n                    (focusin)=\"setPickerVisible(true)\">\n\t\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\"  width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n\t\t\t\t\t<path fill=\"#000000\" d=\"M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z\" />\n\t\t\t\t</svg>\n\t\t\t</button>\n\n\t\t\t<ngx-date *ngIf=\"pickerVisible\"\n                      [ngStyle]=\"styles.date\"\n                      [doNotCloseOnDateSet]=\"doNotCloseOnDateSet\"\n                      (closeDatePicker)=\"setPickerVisible($event)\"\n                      (selectedDateChange)=\"newDatePicked($event)\"\n                      [selectedDate]=\"selectedDate\"\n                      [min]=\"min\"\n                      [max]=\"max\">\n\t\t\t</ngx-date>\n\t\t</div>\n\t</div>\n</div>\n",
        encapsulation: ViewEncapsulation.None,
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => DatePickerComponent_1),
                multi: true,
            },
        ]
    })
], DatePickerComponent);
export { DatePickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZVBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGF0ZXRpbWUtcGlja2VyLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlUGlja2VyL2RhdGVQaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osaUJBQWlCLEVBQ2pCLFVBQVUsRUFDVixVQUFVLEVBQ1YsU0FBUyxFQUNULFlBQVksRUFDZixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0QsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBY3pELElBQWEsbUJBQW1CLDJCQUFoQztJQW1DSSxZQUNZLGVBQWdDLEVBQ2hDLFdBQXdCLEVBQ3hCLElBQWdCLEVBQ2hCLFFBQWtCO1FBSGxCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFqQ3JCLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBQzlCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLHdCQUFtQixHQUFZLEtBQUssQ0FBQztRQUNyQyxXQUFNLEdBQWdCLElBQUksV0FBVyxFQUFFLENBQUM7UUFFdkMsdUJBQWtCLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQVd4RCxr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T0FBTyxDQUFDO2tEQUFrQjtBQUdyQztJQURDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO21EQUsxQztBQXJCUSxtQkFBbUI7SUFaL0IsU0FBUyxDQUFDO1FBQ1YsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQiwrM0RBQTBDO1FBQzFDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1FBQ2xDLFNBQVMsRUFBRTtZQUNiO2dCQUNDLE9BQU8sRUFBRSxpQkFBaUI7Z0JBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMscUJBQW1CLENBQUM7Z0JBQ2xELEtBQUssRUFBRSxJQUFJO2FBQ1g7U0FDRDtLQUNELENBQUM7R0FDVyxtQkFBbUIsQ0FzRi9CO1NBdEZZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIE9uSW5pdCxcbiAgICBJbnB1dCxcbiAgICBPdXRwdXQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgZm9yd2FyZFJlZixcbiAgICBWaWV3Q2hpbGQsXG4gICAgSG9zdExpc3RlbmVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtJc01vYmlsZVNlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2lzTW9iaWxlLnNlcnZpY2UnO1xuaW1wb3J0IHtEYXRlU2VydmljZX0gZnJvbSAnLi4vLi4vc2VydmljZXMvZGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7U3R5bGVPYmplY3R9IGZyb20gJy4uLy4uL21vZGVscy9zdHlsZU9iamVjdC5tb2RlbCc7XG5pbXBvcnQge1JlbmRlcmVyfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9yZW5kZXJlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnbmd4LWRhdGUtcGlja2VyJyxcblx0dGVtcGxhdGVVcmw6ICcuL2RhdGVQaWNrZXIuY29tcG9uZW50Lmh0bWwnLFxuXHRlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHByb3ZpZGVyczogW1xuXHRcdHtcblx0XHRcdHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuXHRcdFx0dXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGF0ZVBpY2tlckNvbXBvbmVudCksXG5cdFx0XHRtdWx0aTogdHJ1ZSxcblx0XHR9LFxuXHRdXG59KVxuZXhwb3J0IGNsYXNzIERhdGVQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgICBASW5wdXQoKSBzZWxlY3RlZERhdGU6IERhdGU7XG4gICAgQElucHV0KCkgbWluOiBzdHJpbmc7XG4gICAgQElucHV0KCkgbWF4OiBzdHJpbmc7XG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgICBASW5wdXQoKSBpbnB1dFRhYkluZGV4OiBudW1iZXI7XG4gICAgQElucHV0KCkgZGlzYWJsZUlucHV0OiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgZGlzYWJsZUJ1dHRvbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGRpc2FibGVQaWNrZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBkb05vdENsb3NlT25EYXRlU2V0OiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgc3R5bGVzOiBTdHlsZU9iamVjdCA9IG5ldyBTdHlsZU9iamVjdCgpO1xuXG4gICAgQE91dHB1dCgpIHNlbGVjdGVkRGF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8RGF0ZT4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ2lucHV0JykgaW5wdXQ6RWxlbWVudFJlZjtcblxuICAgIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSlcbiAgICBvZmZDbGljayhldmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuZVJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIHRoaXMucGlja2VyVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGlja2VyVmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlzTW9iaWxlOiBib29sZWFuO1xuICAgIGludmFsaWQ6IGJvb2xlYW47XG5cbiAgICBnZXQgZm9ybWF0dGVkRGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZVNlcnZpY2UuZm9ybWF0TU1ERFlZWVkodGhpcy5zZWxlY3RlZERhdGUpO1xuICAgIH1cblxuICAgIGdldCBtb2JpbGVGb3JtYXR0ZWREYXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlU2VydmljZS5mb3JtYXRNb2JpbGVZWVlZTU1ERCh0aGlzLnNlbGVjdGVkRGF0ZSk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgaXNNb2JpbGVTZXJ2aWNlOiBJc01vYmlsZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZGF0ZVNlcnZpY2U6IERhdGVTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGVSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyXG4gICAgKSB7XG4gICAgICAgIHRoaXMuaXNNb2JpbGUgPSBpc01vYmlsZVNlcnZpY2UuaXNNb2JpbGU7XG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSB0aGlzLnBsYWNlaG9sZGVyIHx8ICcnO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IERhdGUpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGhhbmRsZXIpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGVDaGFuZ2Uuc3Vic2NyaWJlKGhhbmRsZXIpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKCkge31cblxuICAgIC8vIGZvciB1c2Ugd2l0aCB0aGUgbmF0aXZlIGh0bWw1IGVsZW1lbnQuIG9ubHkgZW1pdCdzIG5ldyB2YWxpZCBkYXRlcy5cbiAgICBzZXREYXRlKGRhdGU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmludmFsaWQgPSAhRGF0ZS5wYXJzZShgJHtkYXRlfSAwMDowMDowMGApO1xuXG4gICAgICAgIGlmICghdGhpcy5pbnZhbGlkKSB7XG4gICAgICAgICAgICAvLyBzZXQgdGhlIHRpbWUgdG8gemVybyBzbyB0aGF0IHZhbHVlcyBlbWl0dGVkIG9uIG1vYmlsZSBhcmUgdGhlIHNhbWUgYXMgb24gZGVza3RvcFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSBuZXcgRGF0ZShgJHtkYXRlfSAwMDowMDowMGApO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGVDaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkRGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnNlbGVjdGVkRGF0ZSA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSBuZXcgRGF0ZSh0aGlzLnNlbGVjdGVkRGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZXdEYXRlUGlja2VkKGRhdGU6IERhdGUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbnZhbGlkID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGVDaGFuZ2UuZW1pdChkYXRlKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSBkYXRlO1xuICAgIH1cblxuICAgIHNldFBpY2tlclZpc2libGUoY2xvc2U6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5waWNrZXJWaXNpYmxlID0gY2xvc2U7XG4gICAgfVxuXG4gICAgZm9jdXMoKTp2b2lkIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudCwgJ2ZvY3VzJyk7XG4gICAgfVxufVxuIl19
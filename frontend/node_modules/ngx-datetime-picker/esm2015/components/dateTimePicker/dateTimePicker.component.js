import * as tslib_1 from "tslib";
var DateTimePickerComponent_1;
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, ElementRef, forwardRef, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { IsMobileService } from '../../services/isMobile.service';
import { DateService } from '../../services/date.service';
import { StyleObject } from '../../models/styleObject.model';
let DateTimePickerComponent = DateTimePickerComponent_1 = class DateTimePickerComponent {
    constructor(isMobileService, dateService, eRef) {
        this.isMobileService = isMobileService;
        this.dateService = dateService;
        this.eRef = eRef;
        this.pickerVisible = false;
        this.disableInput = false;
        this.disableButton = false;
        this.disablePicker = false;
        this.doNotCloseOnDateSet = false;
        this.min = null;
        this.max = null;
        this.styles = new StyleObject();
        this.use24HourClock = false;
        this.selectedDateTimeChange = new EventEmitter();
        this.isMobile = isMobileService.isMobile;
        this.placeholder = this.placeholder || '';
    }
    offClick(event) {
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.pickerVisible = false;
        }
    }
    get formattedDate() {
        if (this.use24HourClock) {
            return this.dateService.formatMMDDYYYY_HHMM(this.selectedDateTime);
        }
        return this.dateService.formatMMDDYYYY_HHMM_AMPM(this.selectedDateTime);
    }
    get mobileFormattedDate() {
        return this.dateService.formatMobileYYYYMMDDTHHMM(this.selectedDateTime);
    }
    writeValue(value) {
        this.selectedDateTime = value;
    }
    registerOnChange(handler) {
        this.selectedDateTimeChange.subscribe(handler);
    }
    registerOnTouched() { }
    setDateTime(dateTime) {
        this.invalid = !Date.parse(dateTime);
        if (!this.invalid) {
            this.selectedDateTime = new Date(dateTime);
            this.selectedDateTimeChange.emit(this.selectedDateTime);
        }
    }
    ngOnInit() {
        if (typeof this.selectedDateTime === 'string') {
            this.selectedDateTime = new Date(this.selectedDateTime);
        }
    }
    newDatePicked(date) {
        this.invalid = false;
        this.selectedDateTimeChange.emit(date);
        this.selectedDateTime = date;
    }
    setPickerVisible(close) {
        this.pickerVisible = close;
    }
};
DateTimePickerComponent.ctorParameters = () => [
    { type: IsMobileService },
    { type: DateService },
    { type: ElementRef }
];
tslib_1.__decorate([
    Input()
], DateTimePickerComponent.prototype, "selectedDateTime", void 0);
tslib_1.__decorate([
    Input()
], DateTimePickerComponent.prototype, "placeholder", void 0);
tslib_1.__decorate([
    Input()
], DateTimePickerComponent.prototype, "disableInput", void 0);
tslib_1.__decorate([
    Input()
], DateTimePickerComponent.prototype, "disableButton", void 0);
tslib_1.__decorate([
    Input()
], DateTimePickerComponent.prototype, "disablePicker", void 0);
tslib_1.__decorate([
    Input()
], DateTimePickerComponent.prototype, "doNotCloseOnDateSet", void 0);
tslib_1.__decorate([
    Input()
], DateTimePickerComponent.prototype, "min", void 0);
tslib_1.__decorate([
    Input()
], DateTimePickerComponent.prototype, "max", void 0);
tslib_1.__decorate([
    Input()
], DateTimePickerComponent.prototype, "styles", void 0);
tslib_1.__decorate([
    Input()
], DateTimePickerComponent.prototype, "use24HourClock", void 0);
tslib_1.__decorate([
    Output()
], DateTimePickerComponent.prototype, "selectedDateTimeChange", void 0);
tslib_1.__decorate([
    HostListener('document:click', ['$event'])
], DateTimePickerComponent.prototype, "offClick", null);
DateTimePickerComponent = DateTimePickerComponent_1 = tslib_1.__decorate([
    Component({
        selector: 'ngx-datetime-picker',
        template: "<div [ngSwitch]=\"isMobile\" [class.invalid]=\"invalid\">\n\t<div *ngSwitchCase=\"true\">\n\t\t<input type=\"datetime-local\"\n               style=\"{{ styles }}\"\n               [disabled]=\"disableInput || disablePicker\" [placeholder]=\"placeholder\"\n               [value]=\"mobileFormattedDate\"\n               (change)=\"setDateTime($event.target.value)\"\n\t\t/>\n\t</div>\n\t<div *ngSwitchDefault>\n\t\t<div class=\"ngx-picker\">\n\t\t\t<input type=\"text\"\n                   [ngStyle]=\"styles.input\"\n                   [disabled]=\"disableInput || disablePicker\"\n                   [placeholder]=\"placeholder\"\n                   (focusin)=\"setPickerVisible(true)\"\n                   [value]=\"formattedDate\"\n                   (change)=\"setDateTime($event.target.value)\"\n\t\t\t/>\n\n\t\t\t<button type=\"button\"\n                    [ngStyle]=\"styles.button\"\n                    [disabled]=\"disableButton || disablePicker\"\n                    (focusin)=\"setPickerVisible(true)\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\"  width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n                    <path fill=\"#000000\" d=\"M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z\" />\n                </svg>\n            </button>\n\n\t\t\t<ngx-date [hidden]=\"!pickerVisible\"\n                      [ngStyle]=\"styles.date\"\n                      includeTime=\"true\"\n                      [doNotCloseOnDateSet]=\"doNotCloseOnDateSet\"\n                      (closeDatePicker)=\"setPickerVisible($event)\"\n                      (selectedDateChange)=\"newDatePicked($event)\"\n\t\t\t          [min]=\"min\"\n                      [max]=\"max\"\n                      [use24HourClock]=\"use24HourClock\"\n\t\t\t          [selectedDate]=\"selectedDateTime\"> </ngx-date>\n\t\t</div>\n\t</div>\n</div>\n",
        encapsulation: ViewEncapsulation.None,
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => DateTimePickerComponent_1),
                multi: true,
            },
        ]
    })
], DateTimePickerComponent);
export { DateTimePickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZVRpbWVQaWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRhdGV0aW1lLXBpY2tlci8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGF0ZVRpbWVQaWNrZXIvZGF0ZVRpbWVQaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEksT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBYzdELElBQWEsdUJBQXVCLCtCQUFwQztJQW9DSSxZQUNZLGVBQWdDLEVBQ2hDLFdBQXdCLEVBQ3hCLElBQWdCO1FBRmhCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixTQUFJLEdBQUosSUFBSSxDQUFZO1FBdENyQixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQU03QixpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUM5QixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQix3QkFBbUIsR0FBWSxLQUFLLENBQUM7UUFDckMsUUFBRyxHQUFXLElBQUksQ0FBQztRQUNuQixRQUFHLEdBQVcsSUFBSSxDQUFDO1FBQ25CLFdBQU0sR0FBZ0IsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUN4QyxtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUUvQiwyQkFBc0IsR0FBRyxJ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Qzt1REFLMUM7QUF2QlEsdUJBQXVCO0lBWm5DLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBSyxxQkFBcUI7UUFDbEMsMHZFQUE4QztRQUM5QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtRQUNyQyxTQUFTLEVBQUU7WUFDUDtnQkFDSSxPQUFPLEVBQUUsaUJBQWlCO2dCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHlCQUF1QixDQUFDO2dCQUN0RCxLQUFLLEVBQUUsSUFBSTthQUNkO1NBQ0o7S0FDSixDQUFDO0dBQ1csdUJBQXVCLENBaUZuQztTQWpGWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFZpZXdFbmNhcHN1bGF0aW9uLCBFbGVtZW50UmVmLCBmb3J3YXJkUmVmLCBIb3N0TGlzdGVuZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgSXNNb2JpbGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvaXNNb2JpbGUuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2RhdGUuc2VydmljZSc7XG5pbXBvcnQgeyBTdHlsZU9iamVjdCB9IGZyb20gJy4uLy4uL21vZGVscy9zdHlsZU9iamVjdC5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAgICAnbmd4LWRhdGV0aW1lLXBpY2tlcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2RhdGVUaW1lUGlja2VyLmNvbXBvbmVudC5odG1sJyxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERhdGVUaW1lUGlja2VyQ29tcG9uZW50KSxcbiAgICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICB9LFxuICAgIF0sXG59KVxuZXhwb3J0IGNsYXNzIERhdGVUaW1lUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gICAgcHVibGljIHBpY2tlclZpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgaXNNb2JpbGU6IGJvb2xlYW47XG4gICAgcHVibGljIGludmFsaWQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBzZWxlY3RlZERhdGVUaW1lOiBEYXRlO1xuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gICAgQElucHV0KCkgZGlzYWJsZUlucHV0OiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgZGlzYWJsZUJ1dHRvbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGRpc2FibGVQaWNrZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBkb05vdENsb3NlT25EYXRlU2V0OiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgbWluOiBzdHJpbmcgPSBudWxsO1xuICAgIEBJbnB1dCgpIG1heDogc3RyaW5nID0gbnVsbDtcbiAgICBASW5wdXQoKSBzdHlsZXM6IFN0eWxlT2JqZWN0ID0gbmV3IFN0eWxlT2JqZWN0KCk7XG4gICAgQElucHV0KCkgdXNlMjRIb3VyQ2xvY2s6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBPdXRwdXQoKSBzZWxlY3RlZERhdGVUaW1lQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxEYXRlPigpO1xuXG4gICAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKVxuICAgIG9mZkNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5lUmVmLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy5waWNrZXJWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgZm9ybWF0dGVkRGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMudXNlMjRIb3VyQ2xvY2spIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGVTZXJ2aWNlLmZvcm1hdE1NRERZWVlZX0hITU0odGhpcy5zZWxlY3RlZERhdGVUaW1lKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5kYXRlU2VydmljZS5mb3JtYXRNTUREWVlZWV9ISE1NX0FNUE0odGhpcy5zZWxlY3RlZERhdGVUaW1lKTtcbiAgICB9XG5cbiAgICBnZXQgbW9iaWxlRm9ybWF0dGVkRGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZVNlcnZpY2UuZm9ybWF0TW9iaWxlWVlZWU1NRERUSEhNTSh0aGlzLnNlbGVjdGVkRGF0ZVRpbWUpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGlzTW9iaWxlU2VydmljZTogSXNNb2JpbGVTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGRhdGVTZXJ2aWNlOiBEYXRlU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBlUmVmOiBFbGVtZW50UmVmXG4gICAgKSB7XG4gICAgICAgIHRoaXMuaXNNb2JpbGUgPSBpc01vYmlsZVNlcnZpY2UuaXNNb2JpbGU7XG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSB0aGlzLnBsYWNlaG9sZGVyIHx8ICcnO1xuXG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogRGF0ZSkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZVRpbWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGhhbmRsZXIpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGVUaW1lQ2hhbmdlLnN1YnNjcmliZShoYW5kbGVyKTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZCgpIHt9XG5cbiAgICBzZXREYXRlVGltZShkYXRlVGltZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuaW52YWxpZCA9ICFEYXRlLnBhcnNlKGRhdGVUaW1lKTtcblxuICAgICAgICBpZiAoIXRoaXMuaW52YWxpZCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGVUaW1lID0gbmV3IERhdGUoZGF0ZVRpbWUpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGVUaW1lQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZERhdGVUaW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuc2VsZWN0ZWREYXRlVGltZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlVGltZSA9IG5ldyBEYXRlKHRoaXMuc2VsZWN0ZWREYXRlVGltZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZXdEYXRlUGlja2VkKGRhdGU6IERhdGUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbnZhbGlkID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGVUaW1lQ2hhbmdlLmVtaXQoZGF0ZSk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlVGltZSA9IGRhdGU7XG4gICAgfVxuXG4gICAgc2V0UGlja2VyVmlzaWJsZShjbG9zZTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLnBpY2tlclZpc2libGUgPSBjbG9zZTtcbiAgICB9XG59XG4iXX0=
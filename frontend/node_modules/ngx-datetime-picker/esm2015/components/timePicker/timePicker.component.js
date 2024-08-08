import * as tslib_1 from "tslib";
var TimePickerComponent_1;
import { Component, ViewEncapsulation, EventEmitter, Input, Output, forwardRef, ElementRef, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { IsMobileService } from '../../services/isMobile.service';
import { DateService } from '../../services/date.service';
import { StyleObject } from '../../models/styleObject.model';
let TimePickerComponent = TimePickerComponent_1 = class TimePickerComponent {
    constructor(isMobileService, dateService, eRef) {
        this.isMobileService = isMobileService;
        this.dateService = dateService;
        this.eRef = eRef;
        this.disableInput = false;
        this.disableButton = false;
        this.disablePicker = false;
        this.doNotCloseOnDateSet = false;
        this.styles = new StyleObject();
        this.use24HourClock = false;
        this.pickerVisible = false;
        this.selectedTimeChange = new EventEmitter();
        this.isMobile = isMobileService.isMobile;
        this.placeholder = this.placeholder || '';
    }
    offClick(event) {
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.pickerVisible = false;
        }
    }
    get formattedTime() {
        if (this.selectedTime == null) {
            return '';
        }
        this.selectedHour = parseInt(this.selectedTime.split(':')[0]);
        this.selectedMinute = parseInt(this.selectedTime.split(':')[1]);
        if (this.use24HourClock) {
            return this.dateService.formatHHMM(this.selectedHour, this.selectedMinute);
        }
        return this.dateService.formatHHMM_AMPM(this.selectedHour, this.selectedMinute);
    }
    get mobileFormattedTime() {
        if (this.selectedTime == null) {
            return '';
        }
        this.selectedHour = parseInt(this.selectedTime.split(':')[0]);
        this.selectedMinute = parseInt(this.selectedTime.split(':')[1]);
        return `${(this.selectedHour < 10 ? '0' + this.selectedHour : this.selectedHour)}:${(this.selectedMinute < 10 ? '0' + this.selectedMinute : this.selectedMinute)}`;
    }
    set mobileFormattedTime(value) {
        const hour = value.split(':')[0];
        const minute = value.split(':')[1];
        if (parseInt(hour)) {
            this.selectedHour = parseInt(hour);
        }
        else {
            this.selectedHour = 0;
        }
        if (parseInt(minute)) {
            this.selectedMinute = parseInt(minute);
        }
        else {
            this.selectedMinute = 0;
        }
        this.selectedTime = `${hour}:${minute} ${parseInt(hour) <= 11 ? 'am' : 'pm'}`;
    }
    writeValue(value) {
        this.selectedTime = value;
    }
    registerOnChange(handler) {
        this.selectedTimeChange.subscribe(handler);
    }
    registerOnTouched() {
    }
    setMobileFormattedTime(time) {
        this.selectedTimeChange.emit(time);
        this.selectedTime = time;
    }
    setFormattedTime(formattedTime) {
        this.selectedTime = formattedTime;
        this.selectedTimeChange.emit(formattedTime);
    }
    setHourNow(hour) {
        const clock = hour <= 11 ? 'am' : 'pm';
        if (this.selectedTime == null || this.selectedTime === '') {
            this.selectedTime = `${hour}:00 ${clock}`;
        }
        else {
            const prevMinute = parseInt(this.selectedTime.split(':')[1]);
            this.selectedTime = `${hour}:${prevMinute} ${clock}`;
        }
        this.selectedTimeChange.emit(this.selectedTime);
    }
    setMinuteNow(minute) {
        if (this.selectedTime == null || this.selectedTime === '') {
            this.selectedTime = `12:${minute} pm`;
        }
        else {
            const prevHour = parseInt(this.selectedTime.split(':')[0]);
            this.selectedTime = `${prevHour}:${minute} ${prevHour <= 11 ? 'am' : 'pm'}`;
        }
        this.selectedTimeChange.emit(this.selectedTime);
    }
    setPickerVisible(close) {
        this.pickerVisible = close;
    }
};
TimePickerComponent.ctorParameters = () => [
    { type: IsMobileService },
    { type: DateService },
    { type: ElementRef }
];
tslib_1.__decorate([
    Input()
], TimePickerComponent.prototype, "selectedTime", void 0);
tslib_1.__decorate([
    Input()
], TimePickerComponent.prototype, "placeholder", void 0);
tslib_1.__decorate([
    Input()
], TimePickerComponent.prototype, "disableInput", void 0);
tslib_1.__decorate([
    Input()
], TimePickerComponent.prototype, "disableButton", void 0);
tslib_1.__decorate([
    Input()
], TimePickerComponent.prototype, "disablePicker", void 0);
tslib_1.__decorate([
    Input()
], TimePickerComponent.prototype, "doNotCloseOnDateSet", void 0);
tslib_1.__decorate([
    Input()
], TimePickerComponent.prototype, "styles", void 0);
tslib_1.__decorate([
    Input()
], TimePickerComponent.prototype, "use24HourClock", void 0);
tslib_1.__decorate([
    Output()
], TimePickerComponent.prototype, "selectedTimeChange", void 0);
tslib_1.__decorate([
    HostListener('document:click', ['$event'])
], TimePickerComponent.prototype, "offClick", null);
TimePickerComponent = TimePickerComponent_1 = tslib_1.__decorate([
    Component({
        selector: 'ngx-time-picker',
        template: "<div [ngSwitch]=\"isMobile\">\n\t<div *ngSwitchCase=\"true\">\n\t\t<input type=\"time\"\n               [disabled]=\"disableInput || disablePicker\"\n               [placeholder]=\"placeholder\"\n               [value]=\"mobileFormattedTime\"\n               (change)=\"setMobileFormattedTime($event.target.value)\"\n\t\t/>\n\t</div>\n\n\t<div *ngSwitchDefault>\n\t\t<div class=\"ngx-picker\">\n\t\t\t<input type=\"text\"\n                   [ngStyle]=\"styles.input\"\n                   [disabled]=\"disableInput || disablePicker\"\n                   [placeholder]=\"placeholder\"\n                   [value]=\"formattedTime\"\n                   (change)=\"setFormattedTime($event.target.value)\"\n                   (focusin)=\"setPickerVisible(true)\"/>\n\n\t\t\t<button type=\"button\"\n                    [ngStyle]=\"styles.button\"\n                    [disabled]=\"disableButton || disablePicker\"\n                    (focusin)=\"setPickerVisible(true)\">\n\t\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\"  width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n\t\t\t\t\t<path fill=\"#000000\" d=\"M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z\" />\n\t\t\t\t</svg>\n\t\t\t</button>\n\n\t\t\t<div class=\"calendar\"\n                 [hidden]=\"!pickerVisible\">\n\t\t\t\t<ngx-time [selectedHour]=\"selectedHour\"\n                          [selectedMinute]=\"selectedMinute\"\n                          [use24HourClock]=\"use24HourClock\"\n                          [doNotCloseOnDateSet]=\"doNotCloseOnDateSet\"\n                          (closeDatePicker)=\"setPickerVisible(!$event)\"\n                          (selectedHourChange)=\"setHourNow($event)\"\n                          (selectedMinuteChange)=\"setMinuteNow($event)\"></ngx-time>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n",
        encapsulation: ViewEncapsulation.None,
        providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => TimePickerComponent_1),
                multi: true,
            },
        ]
    })
], TimePickerComponent);
export { TimePickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZVBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGF0ZXRpbWUtcGlja2VyLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy90aW1lUGlja2VyL3RpbWVQaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM5SCxPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFjM0QsSUFBYSxtQkFBbUIsMkJBQWhDO0lBcUVFLFlBQ1UsZUFBK0IsRUFDL0IsV0FBdUIsRUFDdkIsSUFBZTtRQUZmLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUMvQixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUN2QixTQUFJLEdBQUosSUFBSSxDQUFXO1FBckVoQixpQkFBWSxHQUFXLEtBQUssQ0FBQztRQUM3QixrQkFBYSxHQUFXLEtBQUssQ0FBQztRQUM5QixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQix3QkFBbUIsR0FBWSxLQUFLLENBQUM7UUFDckMsV0FBTSxHQUFnQixJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQ3hDLG1CQUFjLEdBQVcsS0FBSyxDQUFDO1FBV2pDLGtCQUFhLEdBQVcsS0FBSyxDQUFDO1FBdURuQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUVyRCxJQUFJLENBQUMsUUFBUSxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUM7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QUFDO21EQUsxQztBQWpCVSxtQkFBbUI7SUFaL0IsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFLLGlCQUFpQjtRQUM5QixzK0RBQTBDO1FBQzFDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1FBQ3JDLFNBQVMsRUFBRTtZQUNUO2dCQUNFLE9BQU8sRUFBRSxpQkFBaUI7Z0JBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMscUJBQW1CLENBQUM7Z0JBQ2xELEtBQUssRUFBRSxJQUFJO2FBQ1o7U0FDRjtLQUNGLENBQUM7R0FDVyxtQkFBbUIsQ0FrSS9CO1NBbElZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0LCBmb3J3YXJkUmVmLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7SXNNb2JpbGVTZXJ2aWNlfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9pc01vYmlsZS5zZXJ2aWNlJztcbmltcG9ydCB7RGF0ZVNlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2RhdGUuc2VydmljZSc7XG5pbXBvcnQge1N0eWxlT2JqZWN0fSBmcm9tICcuLi8uLi9tb2RlbHMvc3R5bGVPYmplY3QubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICAgICduZ3gtdGltZS1waWNrZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vdGltZVBpY2tlci5jb21wb25lbnQuaHRtbCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gVGltZVBpY2tlckNvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBUaW1lUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBASW5wdXQoKSBzZWxlY3RlZFRpbWU6c3RyaW5nO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjpzdHJpbmc7XG4gIEBJbnB1dCgpIGRpc2FibGVJbnB1dDpib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGRpc2FibGVCdXR0b246Ym9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBkaXNhYmxlUGlja2VyOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGRvTm90Q2xvc2VPbkRhdGVTZXQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgc3R5bGVzOiBTdHlsZU9iamVjdCA9IG5ldyBTdHlsZU9iamVjdCgpO1xuICBASW5wdXQoKSB1c2UyNEhvdXJDbG9jazpib29sZWFuID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIHNlbGVjdGVkVGltZUNoYW5nZTpFdmVudEVtaXR0ZXI8c3RyaW5nPjtcblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50J10pXG4gIG9mZkNsaWNrKGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLmVSZWYubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICB0aGlzLnBpY2tlclZpc2libGUgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcGlja2VyVmlzaWJsZTpib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBpc01vYmlsZTpib29sZWFuO1xuXG4gIGdldCBmb3JtYXR0ZWRUaW1lKCk6c3RyaW5nIHtcbiAgICBpZiAodGhpcy5zZWxlY3RlZFRpbWUgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0ZWRIb3VyID0gcGFyc2VJbnQodGhpcy5zZWxlY3RlZFRpbWUuc3BsaXQoJzonKVswXSk7XG4gICAgdGhpcy5zZWxlY3RlZE1pbnV0ZSA9IHBhcnNlSW50KHRoaXMuc2VsZWN0ZWRUaW1lLnNwbGl0KCc6JylbMV0pO1xuXG4gICAgaWYgKHRoaXMudXNlMjRIb3VyQ2xvY2spIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGVTZXJ2aWNlLmZvcm1hdEhITU0odGhpcy5zZWxlY3RlZEhvdXIsIHRoaXMuc2VsZWN0ZWRNaW51dGUpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmRhdGVTZXJ2aWNlLmZvcm1hdEhITU1fQU1QTSh0aGlzLnNlbGVjdGVkSG91ciwgdGhpcy5zZWxlY3RlZE1pbnV0ZSk7XG4gIH1cblxuICBnZXQgbW9iaWxlRm9ybWF0dGVkVGltZSgpOnN0cmluZyB7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRUaW1lID09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdGVkSG91ciA9IHBhcnNlSW50KHRoaXMuc2VsZWN0ZWRUaW1lLnNwbGl0KCc6JylbMF0pO1xuICAgIHRoaXMuc2VsZWN0ZWRNaW51dGUgPSBwYXJzZUludCh0aGlzLnNlbGVjdGVkVGltZS5zcGxpdCgnOicpWzFdKTtcblxuICAgIHJldHVybiBgJHsodGhpcy5zZWxlY3RlZEhvdXIgPCAxMCA/ICcwJyArIHRoaXMuc2VsZWN0ZWRIb3VyIDogdGhpcy5zZWxlY3RlZEhvdXIpfTokeyh0aGlzLnNlbGVjdGVkTWludXRlIDwgMTAgPyAnMCcgKyB0aGlzLnNlbGVjdGVkTWludXRlIDogdGhpcy5zZWxlY3RlZE1pbnV0ZSl9YFxuICB9XG5cbiAgc2V0IG1vYmlsZUZvcm1hdHRlZFRpbWUodmFsdWU6c3RyaW5nKSB7XG4gICAgY29uc3QgaG91ciA9IHZhbHVlLnNwbGl0KCc6JylbMF07XG4gICAgY29uc3QgbWludXRlID0gdmFsdWUuc3BsaXQoJzonKVsxXTtcblxuICAgIGlmIChwYXJzZUludChob3VyKSkge1xuICAgICAgdGhpcy5zZWxlY3RlZEhvdXIgPSBwYXJzZUludChob3VyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RlZEhvdXIgPSAwO1xuICAgIH1cblxuICAgIGlmIChwYXJzZUludChtaW51dGUpKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkTWludXRlID0gcGFyc2VJbnQobWludXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RlZE1pbnV0ZSA9IDA7XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3RlZFRpbWUgPSBgJHtob3VyfToke21pbnV0ZX0gJHtwYXJzZUludChob3VyKSA8PSAxMSA/ICdhbScgOiAncG0nfWBcbiAgfVxuICBwdWJsaWMgc2VsZWN0ZWRIb3VyOiBudW1iZXI7XG4gIHB1YmxpYyBzZWxlY3RlZE1pbnV0ZTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaXNNb2JpbGVTZXJ2aWNlOklzTW9iaWxlU2VydmljZSxcbiAgICBwcml2YXRlIGRhdGVTZXJ2aWNlOkRhdGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgZVJlZjpFbGVtZW50UmVmXG4gICkge1xuICAgIHRoaXMuc2VsZWN0ZWRUaW1lQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgICB0aGlzLmlzTW9iaWxlID0gaXNNb2JpbGVTZXJ2aWNlLmlzTW9iaWxlO1xuICAgIHRoaXMucGxhY2Vob2xkZXIgPSB0aGlzLnBsYWNlaG9sZGVyIHx8ICcnO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTpzdHJpbmcpOnZvaWQge1xuICAgIHRoaXMuc2VsZWN0ZWRUaW1lID0gdmFsdWU7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGhhbmRsZXIpOnZvaWQge1xuICAgIHRoaXMuc2VsZWN0ZWRUaW1lQ2hhbmdlLnN1YnNjcmliZShoYW5kbGVyKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKCk6dm9pZCB7XG5cbiAgfVxuXG4gIHNldE1vYmlsZUZvcm1hdHRlZFRpbWUodGltZTpzdHJpbmcpIHtcbiAgICB0aGlzLnNlbGVjdGVkVGltZUNoYW5nZS5lbWl0KHRpbWUpO1xuICAgIHRoaXMuc2VsZWN0ZWRUaW1lID0gdGltZTtcbiAgfVxuXG4gIHNldEZvcm1hdHRlZFRpbWUoZm9ybWF0dGVkVGltZTpzdHJpbmcpIHtcbiAgICB0aGlzLnNlbGVjdGVkVGltZSA9IGZvcm1hdHRlZFRpbWU7XG4gICAgdGhpcy5zZWxlY3RlZFRpbWVDaGFuZ2UuZW1pdChmb3JtYXR0ZWRUaW1lKTtcbiAgfVxuXG4gIHNldEhvdXJOb3coaG91cjphbnkpOnZvaWQge1xuICAgIGNvbnN0IGNsb2NrID0gaG91ciA8PSAxMSA/ICdhbScgOiAncG0nO1xuXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRUaW1lID09IG51bGwgfHwgdGhpcy5zZWxlY3RlZFRpbWUgPT09ICcnKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkVGltZSA9IGAke2hvdXJ9OjAwICR7Y2xvY2t9YFxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwcmV2TWludXRlID0gcGFyc2VJbnQodGhpcy5zZWxlY3RlZFRpbWUuc3BsaXQoJzonKVsxXSk7XG5cbiAgICAgIHRoaXMuc2VsZWN0ZWRUaW1lID0gYCR7aG91cn06JHtwcmV2TWludXRlfSAke2Nsb2NrfWBcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdGVkVGltZUNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWRUaW1lKTtcbiAgfVxuXG4gIHNldE1pbnV0ZU5vdyhtaW51dGU6YW55KTp2b2lkIHtcbiAgICBpZiAodGhpcy5zZWxlY3RlZFRpbWUgPT0gbnVsbCB8fCB0aGlzLnNlbGVjdGVkVGltZSA9PT0gJycpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRUaW1lID0gYDEyOiR7bWludXRlfSBwbWBcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcHJldkhvdXIgPSBwYXJzZUludCh0aGlzLnNlbGVjdGVkVGltZS5zcGxpdCgnOicpWzBdKTtcblxuICAgICAgdGhpcy5zZWxlY3RlZFRpbWUgPSBgJHtwcmV2SG91cn06JHttaW51dGV9ICR7cHJldkhvdXIgPD0gMTEgPyAnYW0nIDogJ3BtJ31gXG4gICAgfVxuICAgIHRoaXMuc2VsZWN0ZWRUaW1lQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZFRpbWUpO1xuICB9XG5cbiAgc2V0UGlja2VyVmlzaWJsZShjbG9zZTpib29sZWFuKTp2b2lkIHtcbiAgICB0aGlzLnBpY2tlclZpc2libGUgPSBjbG9zZTtcbiAgfVxufVxuIl19
import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation, EventEmitter, Input, Output, forwardRef, ElementRef, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { IsMobileService } from '../../services/isMobile.service';
import { DateService } from '../../services/date.service';
import { StyleObject } from '../../models/styleObject.model';
var TimePickerComponent = /** @class */ (function () {
    function TimePickerComponent(isMobileService, dateService, eRef) {
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
    TimePickerComponent_1 = TimePickerComponent;
    TimePickerComponent.prototype.offClick = function (event) {
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.pickerVisible = false;
        }
    };
    Object.defineProperty(TimePickerComponent.prototype, "formattedTime", {
        get: function () {
            if (this.selectedTime == null) {
                return '';
            }
            this.selectedHour = parseInt(this.selectedTime.split(':')[0]);
            this.selectedMinute = parseInt(this.selectedTime.split(':')[1]);
            if (this.use24HourClock) {
                return this.dateService.formatHHMM(this.selectedHour, this.selectedMinute);
            }
            return this.dateService.formatHHMM_AMPM(this.selectedHour, this.selectedMinute);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimePickerComponent.prototype, "mobileFormattedTime", {
        get: function () {
            if (this.selectedTime == null) {
                return '';
            }
            this.selectedHour = parseInt(this.selectedTime.split(':')[0]);
            this.selectedMinute = parseInt(this.selectedTime.split(':')[1]);
            return (this.selectedHour < 10 ? '0' + this.selectedHour : this.selectedHour) + ":" + (this.selectedMinute < 10 ? '0' + this.selectedMinute : this.selectedMinute);
        },
        set: function (value) {
            var hour = value.split(':')[0];
            var minute = value.split(':')[1];
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
            this.selectedTime = hour + ":" + minute + " " + (parseInt(hour) <= 11 ? 'am' : 'pm');
        },
        enumerable: true,
        configurable: true
    });
    TimePickerComponent.prototype.writeValue = function (value) {
        this.selectedTime = value;
    };
    TimePickerComponent.prototype.registerOnChange = function (handler) {
        this.selectedTimeChange.subscribe(handler);
    };
    TimePickerComponent.prototype.registerOnTouched = function () {
    };
    TimePickerComponent.prototype.setMobileFormattedTime = function (time) {
        this.selectedTimeChange.emit(time);
        this.selectedTime = time;
    };
    TimePickerComponent.prototype.setFormattedTime = function (formattedTime) {
        this.selectedTime = formattedTime;
        this.selectedTimeChange.emit(formattedTime);
    };
    TimePickerComponent.prototype.setHourNow = function (hour) {
        var clock = hour <= 11 ? 'am' : 'pm';
        if (this.selectedTime == null || this.selectedTime === '') {
            this.selectedTime = hour + ":00 " + clock;
        }
        else {
            var prevMinute = parseInt(this.selectedTime.split(':')[1]);
            this.selectedTime = hour + ":" + prevMinute + " " + clock;
        }
        this.selectedTimeChange.emit(this.selectedTime);
    };
    TimePickerComponent.prototype.setMinuteNow = function (minute) {
        if (this.selectedTime == null || this.selectedTime === '') {
            this.selectedTime = "12:" + minute + " pm";
        }
        else {
            var prevHour = parseInt(this.selectedTime.split(':')[0]);
            this.selectedTime = prevHour + ":" + minute + " " + (prevHour <= 11 ? 'am' : 'pm');
        }
        this.selectedTimeChange.emit(this.selectedTime);
    };
    TimePickerComponent.prototype.setPickerVisible = function (close) {
        this.pickerVisible = close;
    };
    var TimePickerComponent_1;
    TimePickerComponent.ctorParameters = function () { return [
        { type: IsMobileService },
        { type: DateService },
        { type: ElementRef }
    ]; };
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
                    useExisting: forwardRef(function () { return TimePickerComponent_1; }),
                    multi: true,
                },
            ]
        })
    ], TimePickerComponent);
    return TimePickerComponent;
}());
export { TimePickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZVBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGF0ZXRpbWUtcGlja2VyLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy90aW1lUGlja2VyL3RpbWVQaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlILE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQWMzRDtJQXFFRSw2QkFDVSxlQUErQixFQUMvQixXQUF1QixFQUN2QixJQUFlO1FBRmYsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQy9CLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3ZCLFNBQUksR0FBSixJQUFJLENBQVc7UUFyRWhCLGlCQUFZLEdBQVcsS0FBSyxDQUFDO1FBQzdCLGtCQUFhLEdBQVcsS0FBSyxDQUFDO1FBQzlCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLHdCQUFtQixHQUFZLEtBQUssQ0FBQztRQUNyQyxXQUFNLEdBQWdCLElBQUksV0FBVyxFQUFFLENBQUM7UUFDeEMsbUJBQWMsR0FBVyxLQUFLLENBQUM7UUFXakMsa0JBQWEsR0FBVyxLQUFLLENBQUM7UUF1RG5DLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBRXJELElBQUksQ0FBQyxRQUFRLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQztRQUN6QyxJQUFJLENBQUMsV0FB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LENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzt1REFLMUM7SUFqQlUsbUJBQW1CO1FBWi9CLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBSyxpQkFBaUI7WUFDOUIscytEQUEwQztZQUMxQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtZQUNyQyxTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLGlCQUFpQjtvQkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEscUJBQW1CLEVBQW5CLENBQW1CLENBQUM7b0JBQ2xELEtBQUssRUFBRSxJQUFJO2lCQUNaO2FBQ0Y7U0FDRixDQUFDO09BQ1csbUJBQW1CLENBa0kvQjtJQUFELDBCQUFDO0NBQUEsQUFsSUQsSUFrSUM7U0FsSVksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIGZvcndhcmRSZWYsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtJc01vYmlsZVNlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2lzTW9iaWxlLnNlcnZpY2UnO1xuaW1wb3J0IHtEYXRlU2VydmljZX0gZnJvbSAnLi4vLi4vc2VydmljZXMvZGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7U3R5bGVPYmplY3R9IGZyb20gJy4uLy4uL21vZGVscy9zdHlsZU9iamVjdC5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogICAgJ25neC10aW1lLXBpY2tlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi90aW1lUGlja2VyLmNvbXBvbmVudC5odG1sJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBUaW1lUGlja2VyQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIEBJbnB1dCgpIHNlbGVjdGVkVGltZTpzdHJpbmc7XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOnN0cmluZztcbiAgQElucHV0KCkgZGlzYWJsZUlucHV0OmJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgZGlzYWJsZUJ1dHRvbjpib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGRpc2FibGVQaWNrZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgZG9Ob3RDbG9zZU9uRGF0ZVNldDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBzdHlsZXM6IFN0eWxlT2JqZWN0ID0gbmV3IFN0eWxlT2JqZWN0KCk7XG4gIEBJbnB1dCgpIHVzZTI0SG91ckNsb2NrOmJvb2xlYW4gPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgc2VsZWN0ZWRUaW1lQ2hhbmdlOkV2ZW50RW1pdHRlcjxzdHJpbmc+O1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSlcbiAgb2ZmQ2xpY2soZXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuZVJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgIHRoaXMucGlja2VyVmlzaWJsZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBwaWNrZXJWaXNpYmxlOmJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGlzTW9iaWxlOmJvb2xlYW47XG5cbiAgZ2V0IGZvcm1hdHRlZFRpbWUoKTpzdHJpbmcge1xuICAgIGlmICh0aGlzLnNlbGVjdGVkVGltZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3RlZEhvdXIgPSBwYXJzZUludCh0aGlzLnNlbGVjdGVkVGltZS5zcGxpdCgnOicpWzBdKTtcbiAgICB0aGlzLnNlbGVjdGVkTWludXRlID0gcGFyc2VJbnQodGhpcy5zZWxlY3RlZFRpbWUuc3BsaXQoJzonKVsxXSk7XG5cbiAgICBpZiAodGhpcy51c2UyNEhvdXJDbG9jaykge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0ZVNlcnZpY2UuZm9ybWF0SEhNTSh0aGlzLnNlbGVjdGVkSG91ciwgdGhpcy5zZWxlY3RlZE1pbnV0ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZGF0ZVNlcnZpY2UuZm9ybWF0SEhNTV9BTVBNKHRoaXMuc2VsZWN0ZWRIb3VyLCB0aGlzLnNlbGVjdGVkTWludXRlKTtcbiAgfVxuXG4gIGdldCBtb2JpbGVGb3JtYXR0ZWRUaW1lKCk6c3RyaW5nIHtcbiAgICBpZiAodGhpcy5zZWxlY3RlZFRpbWUgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0ZWRIb3VyID0gcGFyc2VJbnQodGhpcy5zZWxlY3RlZFRpbWUuc3BsaXQoJzonKVswXSk7XG4gICAgdGhpcy5zZWxlY3RlZE1pbnV0ZSA9IHBhcnNlSW50KHRoaXMuc2VsZWN0ZWRUaW1lLnNwbGl0KCc6JylbMV0pO1xuXG4gICAgcmV0dXJuIGAkeyh0aGlzLnNlbGVjdGVkSG91ciA8IDEwID8gJzAnICsgdGhpcy5zZWxlY3RlZEhvdXIgOiB0aGlzLnNlbGVjdGVkSG91cil9OiR7KHRoaXMuc2VsZWN0ZWRNaW51dGUgPCAxMCA/ICcwJyArIHRoaXMuc2VsZWN0ZWRNaW51dGUgOiB0aGlzLnNlbGVjdGVkTWludXRlKX1gXG4gIH1cblxuICBzZXQgbW9iaWxlRm9ybWF0dGVkVGltZSh2YWx1ZTpzdHJpbmcpIHtcbiAgICBjb25zdCBob3VyID0gdmFsdWUuc3BsaXQoJzonKVswXTtcbiAgICBjb25zdCBtaW51dGUgPSB2YWx1ZS5zcGxpdCgnOicpWzFdO1xuXG4gICAgaWYgKHBhcnNlSW50KGhvdXIpKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkSG91ciA9IHBhcnNlSW50KGhvdXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdGVkSG91ciA9IDA7XG4gICAgfVxuXG4gICAgaWYgKHBhcnNlSW50KG1pbnV0ZSkpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRNaW51dGUgPSBwYXJzZUludChtaW51dGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdGVkTWludXRlID0gMDtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdGVkVGltZSA9IGAke2hvdXJ9OiR7bWludXRlfSAke3BhcnNlSW50KGhvdXIpIDw9IDExID8gJ2FtJyA6ICdwbSd9YFxuICB9XG4gIHB1YmxpYyBzZWxlY3RlZEhvdXI6IG51bWJlcjtcbiAgcHVibGljIHNlbGVjdGVkTWludXRlOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBpc01vYmlsZVNlcnZpY2U6SXNNb2JpbGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgZGF0ZVNlcnZpY2U6RGF0ZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBlUmVmOkVsZW1lbnRSZWZcbiAgKSB7XG4gICAgdGhpcy5zZWxlY3RlZFRpbWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICAgIHRoaXMuaXNNb2JpbGUgPSBpc01vYmlsZVNlcnZpY2UuaXNNb2JpbGU7XG4gICAgdGhpcy5wbGFjZWhvbGRlciA9IHRoaXMucGxhY2Vob2xkZXIgfHwgJyc7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOnN0cmluZyk6dm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZFRpbWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoaGFuZGxlcik6dm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZFRpbWVDaGFuZ2Uuc3Vic2NyaWJlKGhhbmRsZXIpO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoKTp2b2lkIHtcblxuICB9XG5cbiAgc2V0TW9iaWxlRm9ybWF0dGVkVGltZSh0aW1lOnN0cmluZykge1xuICAgIHRoaXMuc2VsZWN0ZWRUaW1lQ2hhbmdlLmVtaXQodGltZSk7XG4gICAgdGhpcy5zZWxlY3RlZFRpbWUgPSB0aW1lO1xuICB9XG5cbiAgc2V0Rm9ybWF0dGVkVGltZShmb3JtYXR0ZWRUaW1lOnN0cmluZykge1xuICAgIHRoaXMuc2VsZWN0ZWRUaW1lID0gZm9ybWF0dGVkVGltZTtcbiAgICB0aGlzLnNlbGVjdGVkVGltZUNoYW5nZS5lbWl0KGZvcm1hdHRlZFRpbWUpO1xuICB9XG5cbiAgc2V0SG91ck5vdyhob3VyOmFueSk6dm9pZCB7XG4gICAgY29uc3QgY2xvY2sgPSBob3VyIDw9IDExID8gJ2FtJyA6ICdwbSc7XG5cbiAgICBpZiAodGhpcy5zZWxlY3RlZFRpbWUgPT0gbnVsbCB8fCB0aGlzLnNlbGVjdGVkVGltZSA9PT0gJycpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRUaW1lID0gYCR7aG91cn06MDAgJHtjbG9ja31gXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHByZXZNaW51dGUgPSBwYXJzZUludCh0aGlzLnNlbGVjdGVkVGltZS5zcGxpdCgnOicpWzFdKTtcblxuICAgICAgdGhpcy5zZWxlY3RlZFRpbWUgPSBgJHtob3VyfToke3ByZXZNaW51dGV9ICR7Y2xvY2t9YFxuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0ZWRUaW1lQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZFRpbWUpO1xuICB9XG5cbiAgc2V0TWludXRlTm93KG1pbnV0ZTphbnkpOnZvaWQge1xuICAgIGlmICh0aGlzLnNlbGVjdGVkVGltZSA9PSBudWxsIHx8IHRoaXMuc2VsZWN0ZWRUaW1lID09PSAnJykge1xuICAgICAgdGhpcy5zZWxlY3RlZFRpbWUgPSBgMTI6JHttaW51dGV9IHBtYFxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwcmV2SG91ciA9IHBhcnNlSW50KHRoaXMuc2VsZWN0ZWRUaW1lLnNwbGl0KCc6JylbMF0pO1xuXG4gICAgICB0aGlzLnNlbGVjdGVkVGltZSA9IGAke3ByZXZIb3VyfToke21pbnV0ZX0gJHtwcmV2SG91ciA8PSAxMSA/ICdhbScgOiAncG0nfWBcbiAgICB9XG4gICAgdGhpcy5zZWxlY3RlZFRpbWVDaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkVGltZSk7XG4gIH1cblxuICBzZXRQaWNrZXJWaXNpYmxlKGNsb3NlOmJvb2xlYW4pOnZvaWQge1xuICAgIHRoaXMucGlja2VyVmlzaWJsZSA9IGNsb3NlO1xuICB9XG59XG4iXX0=
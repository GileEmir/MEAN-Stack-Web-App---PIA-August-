import * as tslib_1 from "tslib";
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, ElementRef, forwardRef, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { IsMobileService } from '../../services/isMobile.service';
import { DateService } from '../../services/date.service';
import { StyleObject } from '../../models/styleObject.model';
var DateTimePickerComponent = /** @class */ (function () {
    function DateTimePickerComponent(isMobileService, dateService, eRef) {
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
    DateTimePickerComponent_1 = DateTimePickerComponent;
    DateTimePickerComponent.prototype.offClick = function (event) {
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.pickerVisible = false;
        }
    };
    Object.defineProperty(DateTimePickerComponent.prototype, "formattedDate", {
        get: function () {
            if (this.use24HourClock) {
                return this.dateService.formatMMDDYYYY_HHMM(this.selectedDateTime);
            }
            return this.dateService.formatMMDDYYYY_HHMM_AMPM(this.selectedDateTime);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateTimePickerComponent.prototype, "mobileFormattedDate", {
        get: function () {
            return this.dateService.formatMobileYYYYMMDDTHHMM(this.selectedDateTime);
        },
        enumerable: true,
        configurable: true
    });
    DateTimePickerComponent.prototype.writeValue = function (value) {
        this.selectedDateTime = value;
    };
    DateTimePickerComponent.prototype.registerOnChange = function (handler) {
        this.selectedDateTimeChange.subscribe(handler);
    };
    DateTimePickerComponent.prototype.registerOnTouched = function () { };
    DateTimePickerComponent.prototype.setDateTime = function (dateTime) {
        this.invalid = !Date.parse(dateTime);
        if (!this.invalid) {
            this.selectedDateTime = new Date(dateTime);
            this.selectedDateTimeChange.emit(this.selectedDateTime);
        }
    };
    DateTimePickerComponent.prototype.ngOnInit = function () {
        if (typeof this.selectedDateTime === 'string') {
            this.selectedDateTime = new Date(this.selectedDateTime);
        }
    };
    DateTimePickerComponent.prototype.newDatePicked = function (date) {
        this.invalid = false;
        this.selectedDateTimeChange.emit(date);
        this.selectedDateTime = date;
    };
    DateTimePickerComponent.prototype.setPickerVisible = function (close) {
        this.pickerVisible = close;
    };
    var DateTimePickerComponent_1;
    DateTimePickerComponent.ctorParameters = function () { return [
        { type: IsMobileService },
        { type: DateService },
        { type: ElementRef }
    ]; };
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
                    useExisting: forwardRef(function () { return DateTimePickerComponent_1; }),
                    multi: true,
                },
            ]
        })
    ], DateTimePickerComponent);
    return DateTimePickerComponent;
}());
export { DateTimePickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZVRpbWVQaWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRhdGV0aW1lLXBpY2tlci8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZGF0ZVRpbWVQaWNrZXIvZGF0ZVRpbWVQaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN0SSxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFjN0Q7SUFvQ0ksaUNBQ1ksZUFBZ0MsRUFDaEMsV0FBd0IsRUFDeEIsSUFBZ0I7UUFGaEIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFNBQUksR0FBSixJQUFJLENBQVk7UUF0Q3JCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBTTdCLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBQzlCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLHdCQUFtQixHQUFZLEtBQUssQ0FBQztRQUNyQyxRQUFHLEdBQVcsSUFBSSxDQUFDO1FBQ25CLFFBQUcsR0FBVyxJQUFJLENBQUM7UUFDbkIsV0FBTSxHQUFnQixJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQ3hDLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBRS9CLDJCQUFzQixHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7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VCxNQUFNLEVBQUU7MkVBQW1EO0lBRzVEO1FBREMsWUFBWSxDQUFDLGdCQUFnQixFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7MkRBSzFDO0lBdkJRLHVCQUF1QjtRQVpuQyxTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUsscUJBQXFCO1lBQ2xDLDB2RUFBOEM7WUFDOUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDckMsU0FBUyxFQUFFO2dCQUNQO29CQUNJLE9BQU8sRUFBRSxpQkFBaUI7b0JBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLHlCQUF1QixFQUF2QixDQUF1QixDQUFDO29CQUN0RCxLQUFLLEVBQUUsSUFBSTtpQkFDZDthQUNKO1NBQ0osQ0FBQztPQUNXLHVCQUF1QixDQWlGbkM7SUFBRCw4QkFBQztDQUFBLEFBakZELElBaUZDO1NBakZZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgVmlld0VuY2Fwc3VsYXRpb24sIEVsZW1lbnRSZWYsIGZvcndhcmRSZWYsIEhvc3RMaXN0ZW5lcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBJc01vYmlsZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9pc01vYmlsZS5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFN0eWxlT2JqZWN0IH0gZnJvbSAnLi4vLi4vbW9kZWxzL3N0eWxlT2JqZWN0Lm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICAgICduZ3gtZGF0ZXRpbWUtcGlja2VyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZGF0ZVRpbWVQaWNrZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGF0ZVRpbWVQaWNrZXJDb21wb25lbnQpLFxuICAgICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgIH0sXG4gICAgXSxcbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVRpbWVQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgICBwdWJsaWMgcGlja2VyVmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBpc01vYmlsZTogYm9vbGVhbjtcbiAgICBwdWJsaWMgaW52YWxpZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHNlbGVjdGVkRGF0ZVRpbWU6IERhdGU7XG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgICBASW5wdXQoKSBkaXNhYmxlSW5wdXQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBkaXNhYmxlQnV0dG9uOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgZGlzYWJsZVBpY2tlcjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGRvTm90Q2xvc2VPbkRhdGVTZXQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBtaW46IHN0cmluZyA9IG51bGw7XG4gICAgQElucHV0KCkgbWF4OiBzdHJpbmcgPSBudWxsO1xuICAgIEBJbnB1dCgpIHN0eWxlczogU3R5bGVPYmplY3QgPSBuZXcgU3R5bGVPYmplY3QoKTtcbiAgICBASW5wdXQoKSB1c2UyNEhvdXJDbG9jazogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQE91dHB1dCgpIHNlbGVjdGVkRGF0ZVRpbWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPERhdGU+KCk7XG5cbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50J10pXG4gICAgb2ZmQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmVSZWYubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLnBpY2tlclZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBmb3JtYXR0ZWREYXRlKCkge1xuICAgICAgICBpZiAodGhpcy51c2UyNEhvdXJDbG9jaykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZVNlcnZpY2UuZm9ybWF0TU1ERFlZWVlfSEhNTSh0aGlzLnNlbGVjdGVkRGF0ZVRpbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVTZXJ2aWNlLmZvcm1hdE1NRERZWVlZX0hITU1fQU1QTSh0aGlzLnNlbGVjdGVkRGF0ZVRpbWUpO1xuICAgIH1cblxuICAgIGdldCBtb2JpbGVGb3JtYXR0ZWREYXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlU2VydmljZS5mb3JtYXRNb2JpbGVZWVlZTU1ERFRISE1NKHRoaXMuc2VsZWN0ZWREYXRlVGltZSk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgaXNNb2JpbGVTZXJ2aWNlOiBJc01vYmlsZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZGF0ZVNlcnZpY2U6IERhdGVTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGVSZWY6IEVsZW1lbnRSZWZcbiAgICApIHtcbiAgICAgICAgdGhpcy5pc01vYmlsZSA9IGlzTW9iaWxlU2VydmljZS5pc01vYmlsZTtcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IHRoaXMucGxhY2Vob2xkZXIgfHwgJyc7XG5cbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBEYXRlKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlVGltZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoaGFuZGxlcikge1xuICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZVRpbWVDaGFuZ2Uuc3Vic2NyaWJlKGhhbmRsZXIpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKCkge31cblxuICAgIHNldERhdGVUaW1lKGRhdGVUaW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5pbnZhbGlkID0gIURhdGUucGFyc2UoZGF0ZVRpbWUpO1xuXG4gICAgICAgIGlmICghdGhpcy5pbnZhbGlkKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZVRpbWUgPSBuZXcgRGF0ZShkYXRlVGltZSk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZVRpbWVDaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkRGF0ZVRpbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5zZWxlY3RlZERhdGVUaW1lID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGVUaW1lID0gbmV3IERhdGUodGhpcy5zZWxlY3RlZERhdGVUaW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5ld0RhdGVQaWNrZWQoZGF0ZTogRGF0ZSk6IHZvaWQge1xuICAgICAgICB0aGlzLmludmFsaWQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZVRpbWVDaGFuZ2UuZW1pdChkYXRlKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGVUaW1lID0gZGF0ZTtcbiAgICB9XG5cbiAgICBzZXRQaWNrZXJWaXNpYmxlKGNsb3NlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGlja2VyVmlzaWJsZSA9IGNsb3NlO1xuICAgIH1cbn1cbiJdfQ==
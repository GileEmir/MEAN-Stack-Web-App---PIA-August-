import * as tslib_1 from "tslib";
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, ElementRef, forwardRef, ViewChild, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { IsMobileService } from '../../services/isMobile.service';
import { DateService } from '../../services/date.service';
import { StyleObject } from '../../models/styleObject.model';
import { Renderer } from '../../services/renderer.service';
var DatePickerComponent = /** @class */ (function () {
    function DatePickerComponent(isMobileService, dateService, eRef, renderer) {
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
    DatePickerComponent_1 = DatePickerComponent;
    DatePickerComponent.prototype.offClick = function (event) {
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.pickerVisible = false;
        }
    };
    Object.defineProperty(DatePickerComponent.prototype, "formattedDate", {
        get: function () {
            return this.dateService.formatMMDDYYYY(this.selectedDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "mobileFormattedDate", {
        get: function () {
            return this.dateService.formatMobileYYYYMMDD(this.selectedDate);
        },
        enumerable: true,
        configurable: true
    });
    DatePickerComponent.prototype.writeValue = function (value) {
        this.selectedDate = value;
    };
    DatePickerComponent.prototype.registerOnChange = function (handler) {
        this.selectedDateChange.subscribe(handler);
    };
    DatePickerComponent.prototype.registerOnTouched = function () { };
    // for use with the native html5 element. only emit's new valid dates.
    DatePickerComponent.prototype.setDate = function (date) {
        this.invalid = !Date.parse(date + " 00:00:00");
        if (!this.invalid) {
            // set the time to zero so that values emitted on mobile are the same as on desktop
            this.selectedDate = new Date(date + " 00:00:00");
            this.selectedDateChange.emit(this.selectedDate);
        }
    };
    DatePickerComponent.prototype.ngOnInit = function () {
        if (typeof this.selectedDate == 'string') {
            this.selectedDate = new Date(this.selectedDate);
        }
    };
    DatePickerComponent.prototype.newDatePicked = function (date) {
        this.invalid = false;
        this.selectedDateChange.emit(date);
        this.selectedDate = date;
    };
    DatePickerComponent.prototype.setPickerVisible = function (close) {
        this.pickerVisible = close;
    };
    DatePickerComponent.prototype.focus = function () {
        this.renderer.invokeElementMethod(this.input.nativeElement, 'focus');
    };
    var DatePickerComponent_1;
    DatePickerComponent.ctorParameters = function () { return [
        { type: IsMobileService },
        { type: DateService },
        { type: ElementRef },
        { type: Renderer }
    ]; };
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
                    useExisting: forwardRef(function () { return DatePickerComponent_1; }),
                    multi: true,
                },
            ]
        })
    ], DatePickerComponent);
    return DatePickerComponent;
}());
export { DatePickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZVBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGF0ZXRpbWUtcGlja2VyLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlUGlja2VyL2RhdGVQaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixpQkFBaUIsRUFDakIsVUFBVSxFQUNWLFVBQVUsRUFDVixTQUFTLEVBQ1QsWUFBWSxFQUNmLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFjekQ7SUFtQ0ksNkJBQ1ksZUFBZ0MsRUFDaEMsV0FBd0IsRUFDeEIsSUFBZ0IsRUFDaEIsUUFBa0I7UUFIbEIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQWpDckIsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFDOUIsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0Isa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0Isd0JBQW1CLEdBQVksS0FBSyxDQUFDO1FBQ3JDLFdBQU0sR0FBZ0IsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUV2Qyx1QkFBa0IsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBV3hELGtCQUFhLEdBQVksS0FBSyxDQUFD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QUFLLEVBQUU7dURBQXlDO0lBRXZDO1FBQVQsTUFBTSxFQUFFO21FQUErQztJQUVwQztRQUFuQixTQUFTLENBQUMsT0FBTyxDQUFDO3NEQUFrQjtJQUdyQztRQURDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3VEQUsxQztJQXJCUSxtQkFBbUI7UUFaL0IsU0FBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQiwrM0RBQTBDO1lBQzFDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ2xDLFNBQVMsRUFBRTtnQkFDYjtvQkFDQyxPQUFPLEVBQUUsaUJBQWlCO29CQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxxQkFBbUIsRUFBbkIsQ0FBbUIsQ0FBQztvQkFDbEQsS0FBSyxFQUFFLElBQUk7aUJBQ1g7YUFDRDtTQUNELENBQUM7T0FDVyxtQkFBbUIsQ0FzRi9CO0lBQUQsMEJBQUM7Q0FBQSxBQXRGRCxJQXNGQztTQXRGWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBPbkluaXQsXG4gICAgSW5wdXQsXG4gICAgT3V0cHV0LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICBFbGVtZW50UmVmLFxuICAgIGZvcndhcmRSZWYsXG4gICAgVmlld0NoaWxkLFxuICAgIEhvc3RMaXN0ZW5lclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7SXNNb2JpbGVTZXJ2aWNlfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9pc01vYmlsZS5zZXJ2aWNlJztcbmltcG9ydCB7RGF0ZVNlcnZpY2V9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2RhdGUuc2VydmljZSc7XG5pbXBvcnQge1N0eWxlT2JqZWN0fSBmcm9tICcuLi8uLi9tb2RlbHMvc3R5bGVPYmplY3QubW9kZWwnO1xuaW1wb3J0IHtSZW5kZXJlcn0gZnJvbSAnLi4vLi4vc2VydmljZXMvcmVuZGVyZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ25neC1kYXRlLXBpY2tlcicsXG5cdHRlbXBsYXRlVXJsOiAnLi9kYXRlUGlja2VyLmNvbXBvbmVudC5odG1sJyxcblx0ZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBwcm92aWRlcnM6IFtcblx0XHR7XG5cdFx0XHRwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcblx0XHRcdHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERhdGVQaWNrZXJDb21wb25lbnQpLFxuXHRcdFx0bXVsdGk6IHRydWUsXG5cdFx0fSxcblx0XVxufSlcbmV4cG9ydCBjbGFzcyBEYXRlUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gICAgQElucHV0KCkgc2VsZWN0ZWREYXRlOiBEYXRlO1xuICAgIEBJbnB1dCgpIG1pbjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIG1heDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gICAgQElucHV0KCkgaW5wdXRUYWJJbmRleDogbnVtYmVyO1xuICAgIEBJbnB1dCgpIGRpc2FibGVJbnB1dDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGRpc2FibGVCdXR0b246IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBkaXNhYmxlUGlja2VyOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgZG9Ob3RDbG9zZU9uRGF0ZVNldDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHN0eWxlczogU3R5bGVPYmplY3QgPSBuZXcgU3R5bGVPYmplY3QoKTtcblxuICAgIEBPdXRwdXQoKSBzZWxlY3RlZERhdGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPERhdGU+KCk7XG5cbiAgICBAVmlld0NoaWxkKCdpbnB1dCcpIGlucHV0OkVsZW1lbnRSZWY7XG5cbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50J10pXG4gICAgb2ZmQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmVSZWYubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLnBpY2tlclZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBpY2tlclZpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc01vYmlsZTogYm9vbGVhbjtcbiAgICBpbnZhbGlkOiBib29sZWFuO1xuXG4gICAgZ2V0IGZvcm1hdHRlZERhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVTZXJ2aWNlLmZvcm1hdE1NRERZWVlZKHRoaXMuc2VsZWN0ZWREYXRlKTtcbiAgICB9XG5cbiAgICBnZXQgbW9iaWxlRm9ybWF0dGVkRGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZVNlcnZpY2UuZm9ybWF0TW9iaWxlWVlZWU1NREQodGhpcy5zZWxlY3RlZERhdGUpO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGlzTW9iaWxlU2VydmljZTogSXNNb2JpbGVTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGRhdGVTZXJ2aWNlOiBEYXRlU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBlUmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlclxuICAgICkge1xuICAgICAgICB0aGlzLmlzTW9iaWxlID0gaXNNb2JpbGVTZXJ2aWNlLmlzTW9iaWxlO1xuICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gdGhpcy5wbGFjZWhvbGRlciB8fCAnJztcbiAgICB9XG5cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBEYXRlKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlQ2hhbmdlLnN1YnNjcmliZShoYW5kbGVyKTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZCgpIHt9XG5cbiAgICAvLyBmb3IgdXNlIHdpdGggdGhlIG5hdGl2ZSBodG1sNSBlbGVtZW50LiBvbmx5IGVtaXQncyBuZXcgdmFsaWQgZGF0ZXMuXG4gICAgc2V0RGF0ZShkYXRlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5pbnZhbGlkID0gIURhdGUucGFyc2UoYCR7ZGF0ZX0gMDA6MDA6MDBgKTtcblxuICAgICAgICBpZiAoIXRoaXMuaW52YWxpZCkge1xuICAgICAgICAgICAgLy8gc2V0IHRoZSB0aW1lIHRvIHplcm8gc28gdGhhdCB2YWx1ZXMgZW1pdHRlZCBvbiBtb2JpbGUgYXJlIHRoZSBzYW1lIGFzIG9uIGRlc2t0b3BcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gbmV3IERhdGUoYCR7ZGF0ZX0gMDA6MDA6MDBgKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZERhdGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5zZWxlY3RlZERhdGUgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gbmV3IERhdGUodGhpcy5zZWxlY3RlZERhdGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmV3RGF0ZVBpY2tlZChkYXRlOiBEYXRlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW52YWxpZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlQ2hhbmdlLmVtaXQoZGF0ZSk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gZGF0ZTtcbiAgICB9XG5cbiAgICBzZXRQaWNrZXJWaXNpYmxlKGNsb3NlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMucGlja2VyVmlzaWJsZSA9IGNsb3NlO1xuICAgIH1cblxuICAgIGZvY3VzKCk6dm9pZCB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuaW52b2tlRWxlbWVudE1ldGhvZCh0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQsICdmb2N1cycpO1xuICAgIH1cbn1cbiJdfQ==
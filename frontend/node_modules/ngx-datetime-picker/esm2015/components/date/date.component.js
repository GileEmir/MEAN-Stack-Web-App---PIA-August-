import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { DateService } from '../../services/date.service';
let DateComponent = class DateComponent {
    constructor(dateService) {
        this.dateService = dateService;
        this.doNotCloseOnDateSet = false;
        this.min = null;
        this.max = null;
        this.use24HourClock = false;
        this.selectedDateChange = new EventEmitter();
        this.closeDatePicker = new EventEmitter();
        this.alreadySpecifiedMonth = false;
        this.alreadySpecifiedYear = false;
        this.showMonthSelection = false;
        this.showYearSelection = false;
    }
    get selectedMonth() {
        if (this.selectedDate == null) {
            return new Date().getMonth() + 1;
        }
        return this.selectedDate.getMonth() + 1;
    }
    get selectedDay() {
        if (this.selectedDate == null) {
            return new Date().getDate();
        }
        return this.selectedDate.getDate();
    }
    get selectedYear() {
        if (this.selectedDate == null) {
            return new Date().getFullYear();
        }
        return this.selectedDate.getFullYear();
    }
    set selectedMonth(month) {
        let newDate = new Date(this.selectedDate);
        if (month == null) {
            month = new Date().getMonth();
        }
        newDate.setMonth(month - 1);
        this.loadCalendarMonth(newDate);
    }
    set selectedDay(day) {
        let newDate = new Date(this.selectedDate);
        newDate.setDate(day);
        this.loadCalendarMonth(newDate);
    }
    set selectedYear(year) {
        let newDate = new Date(this.selectedDate);
        newDate.setFullYear(year);
        this.loadCalendarMonth(newDate);
    }
    get selectedMonthText() {
        return this.dateService.getMonthText(this.selectedDate);
    }
    setMonth(i) {
        this.selectedMonth = i;
        this.showMonthSelection = false;
        this.alreadySpecifiedMonth = true;
        if (!this.alreadySpecifiedYear) {
            this.showYearSelection = true;
        }
    }
    setSelectedDate(date, hour, minutes) {
        if (this.includeTime && !!date && !!this.selectedDate) {
            date.setHours(this.selectedDate.getHours(), this.selectedDate.getMinutes());
        }
        if (!date) {
            date = new Date();
        }
        if (this.min && date < new Date(this.min)) {
            date = new Date(this.min);
        }
        if (this.max && date > new Date(this.max)) {
            date = new Date(this.max);
        }
        //load calendarMonth will set the selected date;
        this.loadCalendarMonth(date);
        if (hour != null) {
            this.selectedDate.setHours(hour);
        }
        if (minutes != null) {
            this.selectedDate.setMinutes(minutes);
        }
        this.selectedDateChange.emit(this.selectedDate);
        this.highlightedDate = this.selectedDate;
        this.selectedHour = date.getHours();
        this.selectedMinute = date.getMinutes();
        if (!this.doNotCloseOnDateSet) {
            this.closePicker();
        }
    }
    setYear(year) {
        this.selectedYear = year;
        this.showYearSelection = false;
        this.alreadySpecifiedYear = true;
        if (!this.alreadySpecifiedMonth) {
            this.showMonthSelection = true;
        }
    }
    loadCalendarMonth(date) {
        if (date == null) {
            date = new Date();
        }
        const shouldReloadCalendar = (this.selectedMonth != (date.getMonth() + 1) || this.selectedYear != date.getFullYear());
        this.selectedDate = date;
        if (shouldReloadCalendar) {
            this.availableDays = [...this.dateService.getDateList(this.selectedMonth, this.selectedYear)];
        }
    }
    ngOnInit() {
        this.months = this.dateService.getMonths();
        this.years = this.dateService.getAvailableYears();
        // subscribing to it's own event emitter to set the selected year position
        this.selectedDateChange.subscribe(() => {
            this.scrollToMonth();
            this.scrollToYear();
        });
        //If no date is selected then default to today's date.
        if (!this.selectedDate) {
            if (this.min && new Date(this.min) > new Date()) {
                this.selectedDate = new Date(this.min);
            }
            else if (this.max && new Date(this.max) < new Date()) {
                this.selectedDate = new Date(this.max);
            }
            else {
                this.selectedDate = new Date();
            }
        }
        if (typeof this.selectedDate == 'string') {
            this.selectedDate = new Date(this.selectedDate);
        }
        if (this.includeTime) {
            this.selectedHour = this.selectedDate.getHours();
        }
        if (this.includeTime) {
            this.selectedMinute = this.selectedDate.getMinutes();
        }
        this.highlightedDate = this.selectedDate;
        this.availableDays = [...this.dateService.getDateList(this.selectedMonth, this.selectedYear)];
    }
    canSelectYear(year) {
        return this.dateService.canSelectYear(year, this.min, this.max);
    }
    canSelectMonth(month) {
        return this.dateService.canSelectMonth(month, this.selectedYear, this.min, this.max);
    }
    canSelectDay(day, month) {
        return this.dateService.canSelectDay(day, month, this.selectedYear, this.min, this.max);
    }
    scrollToYear() {
        // setTime out is being used since I need this code to excute next, if not the change won't be visible until the second click
        setTimeout(() => {
            if (this.yearSelect && this.yearSelect.nativeElement) {
                const selectContainer = this.yearSelect.nativeElement;
                const selectedYear = selectContainer.querySelector('.calendar--year__selected');
                selectContainer.scrollTop = selectedYear.offsetTop - (selectContainer.clientHeight / 2) - (selectedYear.clientHeight);
            }
        });
    }
    scrollToMonth() {
        // setTime out is being used since I need this code to execute next, if not the change won't be visible until the second click
        setTimeout(() => {
            if (this.monthSelect && this.monthSelect.nativeElement) {
                const selectContainer = this.monthSelect.nativeElement;
                const selectedMonth = selectContainer.querySelector('.calendar--month__selected');
                selectContainer.scrollTop = selectedMonth.offsetTop - (selectContainer.clientHeight / 2) - (selectedMonth.clientHeight);
            }
        });
    }
    previousMonth() {
        this.alreadySpecifiedMonth = false;
        let previousMonth = new Date(this.selectedDate);
        //because javascript sets months based on a 0 index need to jump back 2 to go to the previous month.
        previousMonth.setMonth(this.selectedMonth - 2);
        this.loadCalendarMonth(previousMonth);
    }
    nextMonth() {
        this.alreadySpecifiedMonth = false;
        let nextMonth = new Date(this.selectedDate);
        /// same as above but since selected month is 1-12 the index is already the next month.
        nextMonth.setMonth(this.selectedMonth);
        this.loadCalendarMonth(nextMonth);
    }
    toggleMonthMenu() {
        this.scrollToMonth();
        this.showMonthSelection = !this.showMonthSelection;
    }
    toggleYearMenu() {
        this.scrollToYear();
        this.showYearSelection = !this.showYearSelection;
    }
    closePicker() {
        this.alreadySpecifiedMonth = false;
        this.alreadySpecifiedYear = false;
        this.closeDatePicker.emit(false);
    }
};
DateComponent.ctorParameters = () => [
    { type: DateService }
];
tslib_1.__decorate([
    Input()
], DateComponent.prototype, "selectedDate", void 0);
tslib_1.__decorate([
    Input()
], DateComponent.prototype, "includeTime", void 0);
tslib_1.__decorate([
    Input()
], DateComponent.prototype, "doNotCloseOnDateSet", void 0);
tslib_1.__decorate([
    Input()
], DateComponent.prototype, "min", void 0);
tslib_1.__decorate([
    Input()
], DateComponent.prototype, "max", void 0);
tslib_1.__decorate([
    Input()
], DateComponent.prototype, "use24HourClock", void 0);
tslib_1.__decorate([
    Output()
], DateComponent.prototype, "selectedDateChange", void 0);
tslib_1.__decorate([
    Output()
], DateComponent.prototype, "closeDatePicker", void 0);
tslib_1.__decorate([
    ViewChild('yearSelect')
], DateComponent.prototype, "yearSelect", void 0);
tslib_1.__decorate([
    ViewChild('monthSelect')
], DateComponent.prototype, "monthSelect", void 0);
DateComponent = tslib_1.__decorate([
    Component({
        selector: 'ngx-date',
        template: "<div class=\"calendar\">\n\t<button type=\"button\"\n            class=\"ngx-picker--btn ngx-picker--btn__month\"\n            (click)=\"toggleMonthMenu(); showYearSelection = false\">\n        {{ selectedMonthText }}\n    </button>\n\n\t<button type=\"button\"\n            class=\"ngx-picker--btn ngx-picker--btn__year\"\n            (click)=\"toggleYearMenu(); showMonthSelection = false\">\n        {{ selectedYear }}\n    </button>\n\n\t<span class=\"calendar--previous-and-next\">\n\t\t<button type=\"button\"\n                class=\"ngx-picker--btn ngx-picker--btn__previous\"\n\t\t\t(click)=\"previousMonth()\">\n            &lt;\n        </button>\n\n\t\t<button type=\"button\"\n                class=\"ngx-picker--btn ngx-picker--btn__next\"\n                (click)=\"nextMonth()\">\n            &gt;\n        </button>\n\t</span>\n\n\t<div class=\"calendar--months-select\"\n         #monthSelect\n         [hidden]=\"!showMonthSelection\">\n\t\t<span *ngFor=\"let month of months; let i = index ;\"\n              class=\"calendar--month\"\n\t\t\t  [class.calendar--month__selected]=\"i + 1 == selectedMonth\"\n\t\t\t  [class.calendar--month__disabled]=\"!canSelectMonth(i)\"\n\t\t\t  (click)=\"setMonth(i + 1)\">\n            {{ month }}\n        </span>\n\t</div>\n\n\t<div class=\"calendar--years-select\"\n         #yearSelect\n         [hidden]=\"!showYearSelection\">\n\t\t<span *ngFor=\"let year of years\"\n              class=\"calendar--year\"\n\t\t\t  [class.calendar--year__selected]=\"selectedYear == year\"\n\t\t\t  [class.calendar--year__disabled]=\"!canSelectYear(year)\"\n\t\t\t  (click)=\"this.setYear(year)\">\n            {{ year }}\n\t\t</span>\n\t</div>\n\n\t<div *ngIf=\"showMonthSelection == false && showYearSelection == false\"\n         class=\"calendar--days-and-weeks\">\n        <div class=\"calendar--days-of-week\">\n            <span class=\"calendar--day-of-week\">Su</span>\n            <span class=\"calendar--day-of-week\">Mo</span>\n            <span class=\"calendar--day-of-week\">Tu</span>\n            <span class=\"calendar--day-of-week\">We</span>\n            <span class=\"calendar--day-of-week\">Th</span>\n            <span class=\"calendar--day-of-week\">Fr</span>\n            <span class=\"calendar--day-of-week\">Sa</span>\n        </div>\n\n        <div class=\"calendar--days-select\">\n            <span *ngFor=\"let day of availableDays\"\n                  class=\"calendar--day\"\n                  [class.calendar--day__muted]=\"day.month != selectedMonth\"\n                  [class.calendar--day__selected]=\"(\n                      day.date.getDate() == highlightedDate?.getDate()\n                      && day.date.getFullYear() == highlightedDate?.getFullYear()\n                      && day.date.getMonth() == highlightedDate?.getMonth()\n                  )\"\n                  [class.calendar--day__disabled]=\"!canSelectDay(day.day, day.date.getMonth())\"\n                  (click)=\"setSelectedDate(day.date)\">\n                {{ day.day}}\n            </span>\n        </div>\n\t</div>\n\n\t<ngx-time *ngIf=\"includeTime\"\n\t\t\t  [selectedHour]=\"selectedHour\"\n\t\t\t  [selectedMinute]=\"selectedMinute\"\n\t\t\t  (selectedHourChange)=\"setSelectedDate(highlightedDate,$event)\"\n\t\t\t  (selectedMinuteChange)=\"setSelectedDate(highlightedDate,null, $event)\"\n              (closeDatePicker)=\"closePicker()\"\n\t\t\t  [use24HourClock]=\"use24HourClock\"></ngx-time>\n</div>\n",
        encapsulation: ViewEncapsulation.None
    })
], DateComponent);
export { DateComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGF0ZXRpbWUtcGlja2VyLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlL2RhdGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFjLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6SCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFRMUQsSUFBYSxhQUFhLEdBQTFCO0lBK0VDLFlBQ1ksV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUE3RTFCLHdCQUFtQixHQUFZLEtBQUssQ0FBQztRQUNyQyxRQUFHLEdBQVcsSUFBSSxDQUFDO1FBQ25CLFFBQUcsR0FBVyxJQUFJLENBQUM7UUFDbkIsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFFL0IsdUJBQWtCLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUM5QyxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFjOUMsMEJBQXFCLEdBQVksS0FBSyxDQUFDO1FBQ3ZDLHlCQUFvQixHQUFZLEtBQUssQ0FBQztRQUV0Qyx1QkFBa0IsR0FBWSxLQUFLLENBQUM7UUFDdkMsc0JBQWlCLEdBQVksS0FBSyxDQUFDO0lBd0R2QyxDQUFDO0lBdERKLElBQUksYUFBYTtRQUNoQixJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxFQUFFO1lBQzlCLE9BQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDakM7UUFDRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDZCxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxFQUFF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c0M7QUFDckM7SUFBUixLQUFLLEVBQUU7MENBQW9CO0FBQ25CO0lBQVIsS0FBSyxFQUFFOzBDQUFvQjtBQUNuQjtJQUFSLEtBQUssRUFBRTtxREFBaUM7QUFFL0I7SUFBVCxNQUFNLEVBQUU7eURBQStDO0FBQzlDO0lBQVQsTUFBTSxFQUFFO3NEQUErQztBQUUvQjtJQUF4QixTQUFTLENBQUMsWUFBWSxDQUFDO2lEQUF3QjtBQUN0QjtJQUF6QixTQUFTLENBQUMsYUFBYSxDQUFDO2tEQUF5QjtBQVp0QyxhQUFhO0lBTHpCLFNBQVMsQ0FBQztRQUNWLFFBQVEsRUFBSyxVQUFVO1FBQ3ZCLDQ1R0FBb0M7UUFDcEMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7S0FDckMsQ0FBQztHQUNXLGFBQWEsQ0F3UXpCO1NBeFFZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERhdGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IGRheU9mVGhlTW9udGggfSBmcm9tICcuLi8uLi9tb2RlbHMvZGF5T2ZUaGVNb250aC5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICAgICduZ3gtZGF0ZScsXG5cdHRlbXBsYXRlVXJsOiAnLi9kYXRlLmNvbXBvbmVudC5odG1sJyxcblx0ZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgRGF0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cdEBJbnB1dCgpIHNlbGVjdGVkRGF0ZTogRGF0ZTtcblx0QElucHV0KCkgaW5jbHVkZVRpbWU6IGJvb2xlYW47XG5cdEBJbnB1dCgpIGRvTm90Q2xvc2VPbkRhdGVTZXQ6IGJvb2xlYW4gPSBmYWxzZTtcblx0QElucHV0KCkgbWluOiBzdHJpbmcgPSBudWxsO1xuXHRASW5wdXQoKSBtYXg6IHN0cmluZyA9IG51bGw7XG5cdEBJbnB1dCgpIHVzZTI0SG91ckNsb2NrOiBib29sZWFuID0gZmFsc2U7XG5cblx0QE91dHB1dCgpIHNlbGVjdGVkRGF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8RGF0ZT4oKTtcblx0QE91dHB1dCgpIGNsb3NlRGF0ZVBpY2tlciA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuXHRAVmlld0NoaWxkKCd5ZWFyU2VsZWN0JykgeWVhclNlbGVjdDogRWxlbWVudFJlZjtcblx0QFZpZXdDaGlsZCgnbW9udGhTZWxlY3QnKSBtb250aFNlbGVjdDogRWxlbWVudFJlZjtcblxuXHRwdWJsaWMgYXZhaWxhYmxlRGF5czogZGF5T2ZUaGVNb250aFtdO1xuXHRwdWJsaWMgbW9udGhzOiBzdHJpbmdbXTtcblx0cHVibGljIHllYXJzOiBudW1iZXJbXTtcblxuXHRwdWJsaWMgaGlnaGxpZ2h0ZWREYXRlOiBEYXRlO1xuXG5cdHB1YmxpYyBzZWxlY3RlZEhvdXI6IG51bWJlcjtcblx0cHVibGljIHNlbGVjdGVkTWludXRlOiBudW1iZXI7XG5cbiAgICBwdWJsaWMgYWxyZWFkeVNwZWNpZmllZE1vbnRoOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGFscmVhZHlTcGVjaWZpZWRZZWFyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwdWJsaWMgc2hvd01vbnRoU2VsZWN0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cdHB1YmxpYyBzaG93WWVhclNlbGVjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG5cdGdldCBzZWxlY3RlZE1vbnRoKCk6IG51bWJlciB7XG5cdFx0aWYgKHRoaXMuc2VsZWN0ZWREYXRlID09IG51bGwpIHtcblx0XHRcdHJldHVybiBuZXcgRGF0ZSgpLmdldE1vbnRoKCkgKyAxO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5zZWxlY3RlZERhdGUuZ2V0TW9udGgoKSArIDE7XG5cdH1cblxuXHRnZXQgc2VsZWN0ZWREYXkoKTogbnVtYmVyIHtcblx0XHRpZiAodGhpcy5zZWxlY3RlZERhdGUgPT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIG5ldyBEYXRlKCkuZ2V0RGF0ZSgpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5zZWxlY3RlZERhdGUuZ2V0RGF0ZSgpO1xuXHR9XG5cblx0Z2V0IHNlbGVjdGVkWWVhcigpOiBudW1iZXIge1xuXHRcdGlmICh0aGlzLnNlbGVjdGVkRGF0ZSA9PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5zZWxlY3RlZERhdGUuZ2V0RnVsbFllYXIoKTtcblx0fVxuXG5cdHNldCBzZWxlY3RlZE1vbnRoKG1vbnRoOiBudW1iZXIpIHtcblx0XHRsZXQgbmV3RGF0ZSA9IG5ldyBEYXRlKHRoaXMuc2VsZWN0ZWREYXRlKTtcblxuXHRcdGlmIChtb250aCA9PSBudWxsKSB7XG5cdFx0XHRtb250aCA9IG5ldyBEYXRlKCkuZ2V0TW9udGgoKTtcblx0XHR9XG5cblx0XHRuZXdEYXRlLnNldE1vbnRoKG1vbnRoIC0gMSk7XG5cdFx0dGhpcy5sb2FkQ2FsZW5kYXJNb250aChuZXdEYXRlKTtcblx0fVxuXG5cdHNldCBzZWxlY3RlZERheShkYXk6IG51bWJlcikge1xuXHRcdGxldCBuZXdEYXRlID0gbmV3IERhdGUodGhpcy5zZWxlY3RlZERhdGUpO1xuXG5cdFx0bmV3RGF0ZS5zZXREYXRlKGRheSk7XG5cdFx0dGhpcy5sb2FkQ2FsZW5kYXJNb250aChuZXdEYXRlKTtcblxuXHR9XG5cdHNldCBzZWxlY3RlZFllYXIoeWVhcjogbnVtYmVyKSB7XG5cdFx0bGV0IG5ld0RhdGUgPSBuZXcgRGF0ZSh0aGlzLnNlbGVjdGVkRGF0ZSk7XG5cblx0XHRuZXdEYXRlLnNldEZ1bGxZZWFyKHllYXIpO1xuXHRcdHRoaXMubG9hZENhbGVuZGFyTW9udGgobmV3RGF0ZSk7XG5cdH1cblxuXHRnZXQgc2VsZWN0ZWRNb250aFRleHQoKTogc3RyaW5nIHtcblx0XHRyZXR1cm4gdGhpcy5kYXRlU2VydmljZS5nZXRNb250aFRleHQodGhpcy5zZWxlY3RlZERhdGUpO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoXG5cdCAgICBwcml2YXRlIGRhdGVTZXJ2aWNlOkRhdGVTZXJ2aWNlXG4gICAgKSB7XG5cbiAgICB9XG5cblx0c2V0TW9udGgoaTpudW1iZXIpOnZvaWQge1xuXHQgICAgdGhpcy5zZWxlY3RlZE1vbnRoID0gaTtcblxuXHQgICAgdGhpcy5zaG93TW9udGhTZWxlY3Rpb24gPSBmYWxzZTtcblx0ICAgIHRoaXMuYWxyZWFkeVNwZWNpZmllZE1vbnRoID0gdHJ1ZTtcblxuICAgICAgICBpZiAoIXRoaXMuYWxyZWFkeVNwZWNpZmllZFllYXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1llYXJTZWxlY3Rpb24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG5cdHNldFNlbGVjdGVkRGF0ZShkYXRlOiBEYXRlLCBob3VyPzogbnVtYmVyLCBtaW51dGVzPzogbnVtYmVyKTogdm9pZCB7XG5cdFx0aWYgKHRoaXMuaW5jbHVkZVRpbWUgJiYgISFkYXRlICYmICEhdGhpcy5zZWxlY3RlZERhdGUpIHtcblx0XHRcdGRhdGUuc2V0SG91cnModGhpcy5zZWxlY3RlZERhdGUuZ2V0SG91cnMoKSwgdGhpcy5zZWxlY3RlZERhdGUuZ2V0TWludXRlcygpKTtcblx0XHR9XG5cdFx0aWYgKCFkYXRlKSB7XG5cdFx0XHRkYXRlID0gbmV3IERhdGUoKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5taW4gJiYgZGF0ZSA8IG5ldyBEYXRlKHRoaXMubWluKSkge1xuXHRcdFx0ZGF0ZSA9IG5ldyBEYXRlKHRoaXMubWluKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5tYXggJiYgZGF0ZSA+IG5ldyBEYXRlKHRoaXMubWF4KSkge1xuXHRcdFx0ZGF0ZSA9IG5ldyBEYXRlKHRoaXMubWF4KTtcblx0XHR9XG5cblx0XHQvL2xvYWQgY2FsZW5kYXJNb250aCB3aWxsIHNldCB0aGUgc2VsZWN0ZWQgZGF0ZTtcblx0XHR0aGlzLmxvYWRDYWxlbmRhck1vbnRoKGRhdGUpO1xuXG5cdFx0aWYgKGhvdXIgIT0gbnVsbCkge1xuXHRcdFx0dGhpcy5zZWxlY3RlZERhdGUuc2V0SG91cnMoaG91cik7XG5cdFx0fVxuXG5cdFx0aWYgKG1pbnV0ZXMgIT0gbnVsbCkge1xuXHRcdFx0dGhpcy5zZWxlY3RlZERhdGUuc2V0TWludXRlcyhtaW51dGVzKTtcblx0XHR9XG5cblx0XHR0aGlzLnNlbGVjdGVkRGF0ZUNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWREYXRlKTtcblx0XHR0aGlzLmhpZ2hsaWdodGVkRGF0ZSA9IHRoaXMuc2VsZWN0ZWREYXRlO1xuXHRcdHRoaXMuc2VsZWN0ZWRIb3VyID0gZGF0ZS5nZXRIb3VycygpO1xuXHRcdHRoaXMuc2VsZWN0ZWRNaW51dGUgPSBkYXRlLmdldE1pbnV0ZXMoKTtcblxuXHRcdGlmICghdGhpcy5kb05vdENsb3NlT25EYXRlU2V0KSB7XG5cdFx0XHR0aGlzLmNsb3NlUGlja2VyKCk7XG5cdFx0fVxuXHR9XG5cbiAgICBzZXRZZWFyKHllYXI6bnVtYmVyKTp2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFllYXIgPSB5ZWFyO1xuXG4gICAgICAgIHRoaXMuc2hvd1llYXJTZWxlY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hbHJlYWR5U3BlY2lmaWVkWWVhciA9IHRydWU7XG5cbiAgICAgICAgaWYgKCF0aGlzLmFscmVhZHlTcGVjaWZpZWRNb250aCkge1xuICAgICAgICAgICAgdGhpcy5zaG93TW9udGhTZWxlY3Rpb24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG5cdHByaXZhdGUgbG9hZENhbGVuZGFyTW9udGgoZGF0ZTogRGF0ZSkge1xuXHRcdGlmIChkYXRlID09IG51bGwpIHtcblx0XHRcdGRhdGUgPSBuZXcgRGF0ZSgpO1xuXHRcdH1cblx0XHRjb25zdCBzaG91bGRSZWxvYWRDYWxlbmRhciA9ICh0aGlzLnNlbGVjdGVkTW9udGggIT0gKGRhdGUuZ2V0TW9udGgoKSArIDEpIHx8IHRoaXMuc2VsZWN0ZWRZZWFyICE9IGRhdGUuZ2V0RnVsbFllYXIoKSk7XG5cdFx0dGhpcy5zZWxlY3RlZERhdGUgPSBkYXRlO1xuXG5cdFx0aWYgKHNob3VsZFJlbG9hZENhbGVuZGFyKSB7XG5cdFx0XHR0aGlzLmF2YWlsYWJsZURheXMgPSBbLi4udGhpcy5kYXRlU2VydmljZS5nZXREYXRlTGlzdCh0aGlzLnNlbGVjdGVkTW9udGgsIHRoaXMuc2VsZWN0ZWRZZWFyKV07XG5cdFx0fVxuXHR9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy5tb250aHMgPSB0aGlzLmRhdGVTZXJ2aWNlLmdldE1vbnRocygpO1xuXHRcdHRoaXMueWVhcnMgPSB0aGlzLmRhdGVTZXJ2aWNlLmdldEF2YWlsYWJsZVllYXJzKCk7XG5cblx0XHQvLyBzdWJzY3JpYmluZyB0byBpdCdzIG93biBldmVudCBlbWl0dGVyIHRvIHNldCB0aGUgc2VsZWN0ZWQgeWVhciBwb3NpdGlvblxuXHRcdHRoaXMuc2VsZWN0ZWREYXRlQ2hhbmdlLnN1YnNjcmliZShcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFRvTW9udGgoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFRvWWVhcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG5cblx0XHQvL0lmIG5vIGRhdGUgaXMgc2VsZWN0ZWQgdGhlbiBkZWZhdWx0IHRvIHRvZGF5J3MgZGF0ZS5cblx0XHRpZiAoIXRoaXMuc2VsZWN0ZWREYXRlKSB7XG5cdFx0XHRpZiAodGhpcy5taW4gJiYgbmV3IERhdGUodGhpcy5taW4pID4gbmV3IERhdGUoKSkge1xuXHRcdFx0XHR0aGlzLnNlbGVjdGVkRGF0ZSA9IG5ldyBEYXRlKHRoaXMubWluKTtcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5tYXggJiYgbmV3IERhdGUodGhpcy5tYXgpIDwgbmV3IERhdGUoKSkge1xuXHRcdFx0XHR0aGlzLnNlbGVjdGVkRGF0ZSA9IG5ldyBEYXRlKHRoaXMubWF4KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWREYXRlID0gbmV3IERhdGUoKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHR5cGVvZiB0aGlzLnNlbGVjdGVkRGF0ZSA9PSAnc3RyaW5nJykge1xuXHRcdFx0dGhpcy5zZWxlY3RlZERhdGUgPSBuZXcgRGF0ZSh0aGlzLnNlbGVjdGVkRGF0ZSk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuaW5jbHVkZVRpbWUpIHtcblx0XHRcdHRoaXMuc2VsZWN0ZWRIb3VyID0gdGhpcy5zZWxlY3RlZERhdGUuZ2V0SG91cnMoKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5pbmNsdWRlVGltZSkge1xuXHRcdFx0dGhpcy5zZWxlY3RlZE1pbnV0ZSA9IHRoaXMuc2VsZWN0ZWREYXRlLmdldE1pbnV0ZXMoKTtcblx0XHR9XG5cdFx0dGhpcy5oaWdobGlnaHRlZERhdGUgPSB0aGlzLnNlbGVjdGVkRGF0ZTtcblx0XHR0aGlzLmF2YWlsYWJsZURheXMgPSBbLi4udGhpcy5kYXRlU2VydmljZS5nZXREYXRlTGlzdCh0aGlzLnNlbGVjdGVkTW9udGgsIHRoaXMuc2VsZWN0ZWRZZWFyKV07XG5cblx0fVxuXG5cdHB1YmxpYyBjYW5TZWxlY3RZZWFyKHllYXI6IG51bWJlcik6IGJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLmRhdGVTZXJ2aWNlLmNhblNlbGVjdFllYXIoeWVhciwgdGhpcy5taW4sIHRoaXMubWF4KTtcblx0fVxuXG5cdHB1YmxpYyBjYW5TZWxlY3RNb250aChtb250aDogbnVtYmVyKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMuZGF0ZVNlcnZpY2UuY2FuU2VsZWN0TW9udGgobW9udGgsIHRoaXMuc2VsZWN0ZWRZZWFyLCB0aGlzLm1pbiwgdGhpcy5tYXgpO1xuXHR9XG5cblx0cHVibGljIGNhblNlbGVjdERheShkYXk6IG51bWJlciwgbW9udGg6IG51bWJlcik6IGJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLmRhdGVTZXJ2aWNlLmNhblNlbGVjdERheShkYXksIG1vbnRoLCB0aGlzLnNlbGVjdGVkWWVhciwgdGhpcy5taW4sIHRoaXMubWF4KTtcblx0fVxuXG5cdHB1YmxpYyBzY3JvbGxUb1llYXIoKTogdm9pZCB7XG5cdFx0Ly8gc2V0VGltZSBvdXQgaXMgYmVpbmcgdXNlZCBzaW5jZSBJIG5lZWQgdGhpcyBjb2RlIHRvIGV4Y3V0ZSBuZXh0LCBpZiBub3QgdGhlIGNoYW5nZSB3b24ndCBiZSB2aXNpYmxlIHVudGlsIHRoZSBzZWNvbmQgY2xpY2tcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdGlmICh0aGlzLnllYXJTZWxlY3QgJiYgdGhpcy55ZWFyU2VsZWN0Lm5hdGl2ZUVsZW1lbnQpIHtcblx0XHRcdFx0Y29uc3Qgc2VsZWN0Q29udGFpbmVyID0gdGhpcy55ZWFyU2VsZWN0Lm5hdGl2ZUVsZW1lbnQ7XG5cdFx0XHRcdGNvbnN0IHNlbGVjdGVkWWVhciA9IHNlbGVjdENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuY2FsZW5kYXItLXllYXJfX3NlbGVjdGVkJyk7XG5cdFx0XHRcdHNlbGVjdENvbnRhaW5lci5zY3JvbGxUb3AgPSBzZWxlY3RlZFllYXIub2Zmc2V0VG9wIC0gKHNlbGVjdENvbnRhaW5lci5jbGllbnRIZWlnaHQgLyAyKSAtIChzZWxlY3RlZFllYXIuY2xpZW50SGVpZ2h0KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHB1YmxpYyBzY3JvbGxUb01vbnRoKCk6IHZvaWQge1xuXHRcdC8vIHNldFRpbWUgb3V0IGlzIGJlaW5nIHVzZWQgc2luY2UgSSBuZWVkIHRoaXMgY29kZSB0byBleGVjdXRlIG5leHQsIGlmIG5vdCB0aGUgY2hhbmdlIHdvbid0IGJlIHZpc2libGUgdW50aWwgdGhlIHNlY29uZCBjbGlja1xuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0aWYgKHRoaXMubW9udGhTZWxlY3QgJiYgdGhpcy5tb250aFNlbGVjdC5uYXRpdmVFbGVtZW50KSB7XG5cdFx0XHRcdGNvbnN0IHNlbGVjdENvbnRhaW5lciA9IHRoaXMubW9udGhTZWxlY3QubmF0aXZlRWxlbWVudDtcblx0XHRcdFx0Y29uc3Qgc2VsZWN0ZWRNb250aCA9IHNlbGVjdENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuY2FsZW5kYXItLW1vbnRoX19zZWxlY3RlZCcpO1xuXHRcdFx0XHRzZWxlY3RDb250YWluZXIuc2Nyb2xsVG9wID0gc2VsZWN0ZWRNb250aC5vZmZzZXRUb3AgLSAoc2VsZWN0Q29udGFpbmVyLmNsaWVudEhlaWdodCAvIDIpIC0gKHNlbGVjdGVkTW9udGguY2xpZW50SGVpZ2h0KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHB1YmxpYyBwcmV2aW91c01vbnRoKCk6IHZvaWQge1xuXHQgICAgdGhpcy5hbHJlYWR5U3BlY2lmaWVkTW9udGggPSBmYWxzZTtcblxuXHRcdGxldCBwcmV2aW91c01vbnRoID0gbmV3IERhdGUodGhpcy5zZWxlY3RlZERhdGUpO1xuXHRcdC8vYmVjYXVzZSBqYXZhc2NyaXB0IHNldHMgbW9udGhzIGJhc2VkIG9uIGEgMCBpbmRleCBuZWVkIHRvIGp1bXAgYmFjayAyIHRvIGdvIHRvIHRoZSBwcmV2aW91cyBtb250aC5cblx0XHRwcmV2aW91c01vbnRoLnNldE1vbnRoKHRoaXMuc2VsZWN0ZWRNb250aCAtIDIpO1xuXHRcdHRoaXMubG9hZENhbGVuZGFyTW9udGgocHJldmlvdXNNb250aCk7XG5cdH1cblxuXHRwdWJsaWMgbmV4dE1vbnRoKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmFscmVhZHlTcGVjaWZpZWRNb250aCA9IGZhbHNlO1xuXG5cdFx0bGV0IG5leHRNb250aCA9IG5ldyBEYXRlKHRoaXMuc2VsZWN0ZWREYXRlKTtcblx0XHQvLy8gc2FtZSBhcyBhYm92ZSBidXQgc2luY2Ugc2VsZWN0ZWQgbW9udGggaXMgMS0xMiB0aGUgaW5kZXggaXMgYWxyZWFkeSB0aGUgbmV4dCBtb250aC5cblx0XHRuZXh0TW9udGguc2V0TW9udGgodGhpcy5zZWxlY3RlZE1vbnRoKTtcblx0XHR0aGlzLmxvYWRDYWxlbmRhck1vbnRoKG5leHRNb250aCk7XG5cdH1cblxuXHRwdWJsaWMgdG9nZ2xlTW9udGhNZW51KCk6IHZvaWQge1xuXHRcdHRoaXMuc2Nyb2xsVG9Nb250aCgpO1xuXG5cdFx0dGhpcy5zaG93TW9udGhTZWxlY3Rpb24gPSAhdGhpcy5zaG93TW9udGhTZWxlY3Rpb247XG5cdH1cblxuXHRwdWJsaWMgdG9nZ2xlWWVhck1lbnUoKTogdm9pZCB7XG5cdFx0dGhpcy5zY3JvbGxUb1llYXIoKTtcblx0XHR0aGlzLnNob3dZZWFyU2VsZWN0aW9uID0gIXRoaXMuc2hvd1llYXJTZWxlY3Rpb247XG5cdH1cblxuXHRwdWJsaWMgY2xvc2VQaWNrZXIoKTogdm9pZCB7XG5cdCAgICB0aGlzLmFscmVhZHlTcGVjaWZpZWRNb250aCA9IGZhbHNlO1xuXHQgICAgdGhpcy5hbHJlYWR5U3BlY2lmaWVkWWVhciA9IGZhbHNlO1xuXG5cdFx0dGhpcy5jbG9zZURhdGVQaWNrZXIuZW1pdChmYWxzZSk7XG5cdH1cbn1cbiJdfQ==
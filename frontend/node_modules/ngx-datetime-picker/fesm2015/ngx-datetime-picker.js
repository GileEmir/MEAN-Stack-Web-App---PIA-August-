import { __decorate, __param } from 'tslib';
import { Injectable, EventEmitter, Input, Output, ViewChild, Component, ViewEncapsulation, Inject, PLATFORM_ID, ElementRef, HostListener, forwardRef, NgModule } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

let DateService = class DateService {
    constructor() {
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    }
    addLeadingZero(value) {
        if (value < 10) {
            return `0${value.toString()}`;
        }
        return value.toString();
    }
    formatMobileYYYYMMDD(date) {
        if (!date || typeof date == 'string') {
            return '';
        }
        return `${date.getFullYear()}-${this.addLeadingZero(date.getMonth() + 1)}-${this.addLeadingZero(date.getDate())}`;
    }
    formatMobileYYYYMMDDTHHMM(date) {
        if (!date || typeof date == 'string') {
            return '';
        }
        return `${this.formatMobileYYYYMMDD(date)}T${this.addLeadingZero(date.getHours())}:${this.addLeadingZero(date.getMinutes())}`;
    }
    formatMMDDYYYY(date) {
        if (!date || typeof date == 'string') {
            return '';
        }
        return `${(date.getMonth() + 1)}/${date.getDate()}/${date.getFullYear()}`;
    }
    formatMMDDYYYY_HHMM_AMPM(date) {
        if (!date || typeof date == 'string') {
            return '';
        }
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${this.formatMMDDYYYY(date)} ${this.formatHHMM_AMPM(hours, minutes)}`;
    }
    formatMMDDYYYY_HHMM(date) {
        if (!date || typeof date == 'string') {
            return '';
        }
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${this.formatMMDDYYYY(date)} ${this.formatHHMM(hours, minutes)}`;
    }
    formatHHMM_AMPM(hour, minute, clock) {
        if (hour == null || minute == null) {
            return '';
        }
        if (typeof clock === 'undefined') {
            clock = hour >= 12 ? 'pm' : 'am';
        }
        if (hour > 12) {
            hour = hour - 12;
        }
        else if (hour === 0) {
            hour = 12;
        }
        let formattedMinute = (!minute ? '00' : (minute <= 9 ? `0${minute}` : minute));
        return `${hour}:${formattedMinute} ${clock}`;
    }
    formatHHMM(hour, minute) {
        if (hour == null || minute == null) {
            return '';
        }
        let formattedHour = (!hour ? '00' : (hour <= 9 ? `0${hour}` : hour));
        let formattedMinute = (!minute ? '00' : (minute <= 9 ? `0${minute}` : minute));
        return `${formattedHour}:${formattedMinute}`;
    }
    getCurrentMonthDays(month, year) {
        let dayOfTheMonth = new Date(year, month - 1, 1);
        let nextMonth = new Date(year, month - 1, 1);
        let returnedDays = [];
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        while (dayOfTheMonth.getMonth() != nextMonth.getMonth()) {
            const dayToAdd = {
                day: dayOfTheMonth.getDate(),
                dayOfTheWeek: dayOfTheMonth.getDay(),
                month: dayOfTheMonth.getMonth() + 1,
                date: new Date((dayOfTheMonth.getMonth() + 1) + '/' + dayOfTheMonth.getDate() + '/' + dayOfTheMonth.getFullYear())
            };
            returnedDays.push(dayToAdd);
            dayOfTheMonth.setDate(dayOfTheMonth.getDate() + 1);
        }
        return returnedDays;
    }
    getDateList(Month, Year) {
        return [...this.getPreviousMonthDays(Month, Year),
            ...this.getCurrentMonthDays(Month, Year),
            ...this.getNextMonthDays(Month, Year)];
    }
    getPreviousMonthDays(Month, Year) {
        let day = new Date(Month + '/1/' + Year);
        let returnedDays = [];
        let dayOfTheWeek = day.getDay();
        while (dayOfTheWeek != 0) {
            day.setDate(day.getDate() - 1);
            returnedDays = [{
                    day: day.getDate(),
                    dayOfTheWeek: day.getDay(),
                    month: day.getMonth() + 1,
                    date: new Date((day.getMonth() + 1) + '/' + day.getDate() + '/' + day.getFullYear())
                }, ...returnedDays];
            dayOfTheWeek = day.getDay();
        }
        return returnedDays;
    }
    getNextMonthDays(Month, Year) {
        let day = new Date(Month + '/1/' + Year);
        day.setMonth(day.getMonth() + 1);
        day.setDate(day.getDate() - 1);
        let returnedDays = [];
        let dayOfTheWeek = day.getDay();
        while (dayOfTheWeek != 6) {
            day.setDate(day.getDate() + 1);
            returnedDays = [...returnedDays, {
                    day: day.getDate(),
                    dayOfTheWeek: day.getDay(),
                    month: day.getMonth() + 1,
                    date: new Date((day.getMonth() + 1) + '/' + day.getDate() + '/' + day.getFullYear())
                }];
            dayOfTheWeek = day.getDay();
        }
        return returnedDays;
    }
    getMonths() {
        return this.months;
    }
    getMonthText(date) {
        if (date == null) {
            date = new Date();
        }
        return this.months[date.getMonth()];
    }
    getAvailableYears() {
        const currentYear = new Date().getFullYear();
        let startYear = currentYear - 80;
        let returnYears = [];
        while (startYear <= (currentYear + 5)) {
            returnYears.push(startYear);
            startYear = startYear + 1;
        }
        return returnYears;
    }
    canSelectYear(year, min, max) {
        if (!min && !max) {
            return true;
        }
        if (min && year < new Date(min).getFullYear()) {
            return false;
        }
        if (max && year > new Date(max).getFullYear()) {
            return false;
        }
        return true;
    }
    canSelectMonth(month, year, min, max) {
        if (!min && !max) {
            return true;
        }
        if ((min && year === new Date(min).getFullYear())
            || (max && year === new Date(max).getFullYear())) {
            if (min && year === new Date(min).getFullYear() && month < new Date(min).getMonth()) {
                return false;
            }
            if (max && year === new Date(max).getFullYear() && month > new Date(max).getMonth()) {
                return false;
            }
            return true;
        }
        else {
            return this.canSelectYear(year, min, max);
        }
    }
    canSelectDay(day, month, year, min, max) {
        if (!min && !max) {
            return true;
        }
        if ((min && (year === new Date(min).getFullYear() && month === new Date(min).getMonth()))
            || (max && (year === new Date(max).getFullYear() && month === new Date(max).getMonth()))) {
            if (min && year === new Date(min).getFullYear() && month === new Date(min).getMonth() && day < new Date(min).getDate()) {
                return false;
            }
            if (max && year === new Date(max).getFullYear() && month === new Date(max).getMonth() && day > new Date(max).getDate()) {
                return false;
            }
            return true;
        }
        else {
            return this.canSelectMonth(month, year, min, max);
        }
    }
};
DateService = __decorate([
    Injectable()
], DateService);

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
__decorate([
    Input()
], DateComponent.prototype, "selectedDate", void 0);
__decorate([
    Input()
], DateComponent.prototype, "includeTime", void 0);
__decorate([
    Input()
], DateComponent.prototype, "doNotCloseOnDateSet", void 0);
__decorate([
    Input()
], DateComponent.prototype, "min", void 0);
__decorate([
    Input()
], DateComponent.prototype, "max", void 0);
__decorate([
    Input()
], DateComponent.prototype, "use24HourClock", void 0);
__decorate([
    Output()
], DateComponent.prototype, "selectedDateChange", void 0);
__decorate([
    Output()
], DateComponent.prototype, "closeDatePicker", void 0);
__decorate([
    ViewChild('yearSelect')
], DateComponent.prototype, "yearSelect", void 0);
__decorate([
    ViewChild('monthSelect')
], DateComponent.prototype, "monthSelect", void 0);
DateComponent = __decorate([
    Component({
        selector: 'ngx-date',
        template: "<div class=\"calendar\">\n\t<button type=\"button\"\n            class=\"ngx-picker--btn ngx-picker--btn__month\"\n            (click)=\"toggleMonthMenu(); showYearSelection = false\">\n        {{ selectedMonthText }}\n    </button>\n\n\t<button type=\"button\"\n            class=\"ngx-picker--btn ngx-picker--btn__year\"\n            (click)=\"toggleYearMenu(); showMonthSelection = false\">\n        {{ selectedYear }}\n    </button>\n\n\t<span class=\"calendar--previous-and-next\">\n\t\t<button type=\"button\"\n                class=\"ngx-picker--btn ngx-picker--btn__previous\"\n\t\t\t(click)=\"previousMonth()\">\n            &lt;\n        </button>\n\n\t\t<button type=\"button\"\n                class=\"ngx-picker--btn ngx-picker--btn__next\"\n                (click)=\"nextMonth()\">\n            &gt;\n        </button>\n\t</span>\n\n\t<div class=\"calendar--months-select\"\n         #monthSelect\n         [hidden]=\"!showMonthSelection\">\n\t\t<span *ngFor=\"let month of months; let i = index ;\"\n              class=\"calendar--month\"\n\t\t\t  [class.calendar--month__selected]=\"i + 1 == selectedMonth\"\n\t\t\t  [class.calendar--month__disabled]=\"!canSelectMonth(i)\"\n\t\t\t  (click)=\"setMonth(i + 1)\">\n            {{ month }}\n        </span>\n\t</div>\n\n\t<div class=\"calendar--years-select\"\n         #yearSelect\n         [hidden]=\"!showYearSelection\">\n\t\t<span *ngFor=\"let year of years\"\n              class=\"calendar--year\"\n\t\t\t  [class.calendar--year__selected]=\"selectedYear == year\"\n\t\t\t  [class.calendar--year__disabled]=\"!canSelectYear(year)\"\n\t\t\t  (click)=\"this.setYear(year)\">\n            {{ year }}\n\t\t</span>\n\t</div>\n\n\t<div *ngIf=\"showMonthSelection == false && showYearSelection == false\"\n         class=\"calendar--days-and-weeks\">\n        <div class=\"calendar--days-of-week\">\n            <span class=\"calendar--day-of-week\">Su</span>\n            <span class=\"calendar--day-of-week\">Mo</span>\n            <span class=\"calendar--day-of-week\">Tu</span>\n            <span class=\"calendar--day-of-week\">We</span>\n            <span class=\"calendar--day-of-week\">Th</span>\n            <span class=\"calendar--day-of-week\">Fr</span>\n            <span class=\"calendar--day-of-week\">Sa</span>\n        </div>\n\n        <div class=\"calendar--days-select\">\n            <span *ngFor=\"let day of availableDays\"\n                  class=\"calendar--day\"\n                  [class.calendar--day__muted]=\"day.month != selectedMonth\"\n                  [class.calendar--day__selected]=\"(\n                      day.date.getDate() == highlightedDate?.getDate()\n                      && day.date.getFullYear() == highlightedDate?.getFullYear()\n                      && day.date.getMonth() == highlightedDate?.getMonth()\n                  )\"\n                  [class.calendar--day__disabled]=\"!canSelectDay(day.day, day.date.getMonth())\"\n                  (click)=\"setSelectedDate(day.date)\">\n                {{ day.day}}\n            </span>\n        </div>\n\t</div>\n\n\t<ngx-time *ngIf=\"includeTime\"\n\t\t\t  [selectedHour]=\"selectedHour\"\n\t\t\t  [selectedMinute]=\"selectedMinute\"\n\t\t\t  (selectedHourChange)=\"setSelectedDate(highlightedDate,$event)\"\n\t\t\t  (selectedMinuteChange)=\"setSelectedDate(highlightedDate,null, $event)\"\n              (closeDatePicker)=\"closePicker()\"\n\t\t\t  [use24HourClock]=\"use24HourClock\"></ngx-time>\n</div>\n",
        encapsulation: ViewEncapsulation.None
    })
], DateComponent);

let IsMobileService = class IsMobileService {
    constructor() {
        this.isMobile = !!(window.navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
            || navigator.userAgent.match(/Opera Mini/i)
            || navigator.userAgent.match(/IEMobile/i));
    }
};
IsMobileService = __decorate([
    Injectable()
], IsMobileService);

class StyleObject {
    constructor() {
        this.button = {};
        this.date = {};
        this.input = {};
    }
}

let Renderer = class Renderer {
    constructor(platformId) {
        this.platformId = platformId;
    }
    invokeElementMethod(eleRef, method) {
        if (isPlatformBrowser(this.platformId)) {
            eleRef.nativeElement[method]();
        }
    }
};
Renderer.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
Renderer = __decorate([
    Injectable(),
    __param(0, Inject(PLATFORM_ID))
], Renderer);

var DatePickerComponent_1;
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
__decorate([
    Input()
], DatePickerComponent.prototype, "selectedDate", void 0);
__decorate([
    Input()
], DatePickerComponent.prototype, "min", void 0);
__decorate([
    Input()
], DatePickerComponent.prototype, "max", void 0);
__decorate([
    Input()
], DatePickerComponent.prototype, "placeholder", void 0);
__decorate([
    Input()
], DatePickerComponent.prototype, "inputTabIndex", void 0);
__decorate([
    Input()
], DatePickerComponent.prototype, "disableInput", void 0);
__decorate([
    Input()
], DatePickerComponent.prototype, "disableButton", void 0);
__decorate([
    Input()
], DatePickerComponent.prototype, "disablePicker", void 0);
__decorate([
    Input()
], DatePickerComponent.prototype, "doNotCloseOnDateSet", void 0);
__decorate([
    Input()
], DatePickerComponent.prototype, "styles", void 0);
__decorate([
    Output()
], DatePickerComponent.prototype, "selectedDateChange", void 0);
__decorate([
    ViewChild('input')
], DatePickerComponent.prototype, "input", void 0);
__decorate([
    HostListener('document:click', ['$event'])
], DatePickerComponent.prototype, "offClick", null);
DatePickerComponent = DatePickerComponent_1 = __decorate([
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

let TimeComponent = class TimeComponent {
    constructor() {
        this.selectedHourChange = new EventEmitter();
        this.selectedMinuteChange = new EventEmitter();
        this.doNotCloseOnDateSet = false;
        this.use24HourClock = false;
        this.closeDatePicker = new EventEmitter();
        this.hours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
        this.minutes = ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
    }
    get formatSelectedMinute() {
        return this.selectedMinute <= 9 ? '0' + this.selectedMinute : '' + this.selectedMinute;
    }
    get formatSelectedHour() {
        if (!this.use24HourClock) {
            if (this.selectedHour === 12 || this.selectedHour === 0) {
                return '12';
            }
            return (this.selectedHour > 12 ? this.selectedHour - 12 : this.selectedHour) + '';
        }
        else {
            return (this.selectedHour < 10 ? '0' + this.selectedHour : this.selectedHour) + '';
        }
    }
    ngOnInit() {
        if (!this.selectedHour) {
            this.selectedHour = 12;
        }
        if (!this.selectedMinute) {
            this.selectedMinute = 0;
        }
        if (this.selectedHour >= 12) {
            this.selectedClock = 'pm';
        }
        if (this.use24HourClock) {
            this.hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
            this.minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
            this.selectedClock = '';
        }
    }
    selectHourChange(selected) {
        let hour = parseInt(selected);
        if (!this.use24HourClock) {
            hour = this.selectedClock === 'pm' ? hour + 12 : hour;
        }
        this.selectedHourChange.emit(hour);
        this.selectedHour = hour;
        if (this.selectedMinute == null) {
            this.selectMinuteChange('0');
        }
        this.minutesOpen = false;
        this.hoursOpen = false;
    }
    selectMinuteChange(selected) {
        const minute = parseInt(selected);
        this.selectedMinuteChange.emit(minute);
        this.selectedMinute = minute;
        this.minutesOpen = false;
        this.hoursOpen = false;
    }
    selectClockChange(clock) {
        if (this.selectedClock !== clock) {
            this.selectedClock = clock;
            if (this.selectedClock === 'pm' && this.selectedHour <= 11) {
                this.selectedHour = this.selectedHour + 12;
            }
            else if (this.selectedClock === 'am' && this.selectedHour >= 12) {
                this.selectedHour = this.selectedHour - 12;
            }
            this.selectedHourChange.emit(this.selectedHour);
        }
    }
    closePicker() {
        this.closeDatePicker.emit(true);
    }
    setTimeToNow() {
        const now = new Date();
        this.selectedHour = now.getHours();
        this.selectedHourChange.emit(this.selectedHour);
        this.selectedMinute = now.getMinutes();
        this.selectedMinuteChange.emit(this.selectedMinute);
        this.selectedClock = this.selectedHour >= 12 ? 'pm' : 'am';
        if (!this.doNotCloseOnDateSet) {
            this.closePicker();
        }
    }
    toggleHourMenu() {
        this.minutesOpen = false;
        this.hoursOpen = !this.hoursOpen;
    }
    toggleMinuteMenu() {
        this.hoursOpen = false;
        this.minutesOpen = !this.minutesOpen;
    }
};
__decorate([
    Input()
], TimeComponent.prototype, "selectedHour", void 0);
__decorate([
    Output()
], TimeComponent.prototype, "selectedHourChange", void 0);
__decorate([
    Input()
], TimeComponent.prototype, "selectedMinute", void 0);
__decorate([
    Output()
], TimeComponent.prototype, "selectedMinuteChange", void 0);
__decorate([
    Input()
], TimeComponent.prototype, "doNotCloseOnDateSet", void 0);
__decorate([
    Input()
], TimeComponent.prototype, "use24HourClock", void 0);
__decorate([
    Output()
], TimeComponent.prototype, "closeDatePicker", void 0);
TimeComponent = __decorate([
    Component({
        selector: 'ngx-time',
        template: "<div class=\"time-picker\">\n\t<button type=\"button\" class=\"ngx-picker--btn ngx-picker--btn__hour\"\n            (click)=\"toggleHourMenu()\"\n            [class.ngx-picker--btn__24h]=\"use24HourClock\">\n        {{ formatSelectedHour }}\n    </button>\n\n\t<button type=\"button\" class=\"ngx-picker--btn ngx-picker--btn__minute\"\n            (click)=\"toggleMinuteMenu()\"\n            [class.ngx-picker--btn__24h]=\"use24HourClock\">\n        {{ formatSelectedMinute }}\n    </button>\n\n\t<div *ngIf=\"!use24HourClock\"\n         class=\"time--periods\">\n\t\t<button type=\"button\"\n                class=\"ngx-picker--btn ngx-picker--btn__am\"\n                (click)=\"selectClockChange('am')\"\n                [class.ngx-picker--btn__selected]=\"selectedClock === 'am'\">\n            AM\n        </button>\n\n\t\t<button type=\"button\"\n                class=\"ngx-picker--btn ngx-picker--btn__pm\"\n                (click)=\"selectClockChange('pm')\"\n                [class.ngx-picker--btn__selected]=\"selectedClock === 'pm'\">\n            PM\n        </button>\n\t</div>\n\t<div class=\"time--selection__hours\"\n         [hidden]=\"!hoursOpen\">\n\t\t<div class=\"time--values\">\n\t\t\t<div *ngFor=\"let hour of hours\"\n                 class=\"time--value\"\n                 [class.time--value__selected]=\"selectedHour == hour\"\n                 (click)=\"selectHourChange(hour)\">\n                {{ hour }}\n            </div>\n\t\t</div>\n\t</div>\n\n\t<div class=\"time--selection__minutes\"\n         [hidden]=\"!minutesOpen\">\n\t\t<div class=\"time--values\">\n\t\t\t<div *ngFor=\"let minute of minutes\"\n                 class=\"time--value\"\n                 [class.time--value__selected]=\"selectedMinute == minute\"\n                 (click)=\"selectMinuteChange(minute)\">\n                {{ minute }}\n            </div>\n\t\t</div>\n\t</div>\n</div>\n\n<div class=\"calendar--footer\">\n    <button type=\"button\"\n            class=\"ngx-picker--btn ngx-picker--btn__now\"\n            (click)=\"setTimeToNow()\">\n        Now\n    </button>\n\n    <button type=\"button\"\n            class=\"ngx-picker--btn ngx-picker--btn__close\"\n            (click)=\"closePicker()\">\n        Close\n    </button>\n</div>\n",
        encapsulation: ViewEncapsulation.None
    })
], TimeComponent);

var DateTimePickerComponent_1;
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
__decorate([
    Input()
], DateTimePickerComponent.prototype, "selectedDateTime", void 0);
__decorate([
    Input()
], DateTimePickerComponent.prototype, "placeholder", void 0);
__decorate([
    Input()
], DateTimePickerComponent.prototype, "disableInput", void 0);
__decorate([
    Input()
], DateTimePickerComponent.prototype, "disableButton", void 0);
__decorate([
    Input()
], DateTimePickerComponent.prototype, "disablePicker", void 0);
__decorate([
    Input()
], DateTimePickerComponent.prototype, "doNotCloseOnDateSet", void 0);
__decorate([
    Input()
], DateTimePickerComponent.prototype, "min", void 0);
__decorate([
    Input()
], DateTimePickerComponent.prototype, "max", void 0);
__decorate([
    Input()
], DateTimePickerComponent.prototype, "styles", void 0);
__decorate([
    Input()
], DateTimePickerComponent.prototype, "use24HourClock", void 0);
__decorate([
    Output()
], DateTimePickerComponent.prototype, "selectedDateTimeChange", void 0);
__decorate([
    HostListener('document:click', ['$event'])
], DateTimePickerComponent.prototype, "offClick", null);
DateTimePickerComponent = DateTimePickerComponent_1 = __decorate([
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

var TimePickerComponent_1;
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
__decorate([
    Input()
], TimePickerComponent.prototype, "selectedTime", void 0);
__decorate([
    Input()
], TimePickerComponent.prototype, "placeholder", void 0);
__decorate([
    Input()
], TimePickerComponent.prototype, "disableInput", void 0);
__decorate([
    Input()
], TimePickerComponent.prototype, "disableButton", void 0);
__decorate([
    Input()
], TimePickerComponent.prototype, "disablePicker", void 0);
__decorate([
    Input()
], TimePickerComponent.prototype, "doNotCloseOnDateSet", void 0);
__decorate([
    Input()
], TimePickerComponent.prototype, "styles", void 0);
__decorate([
    Input()
], TimePickerComponent.prototype, "use24HourClock", void 0);
__decorate([
    Output()
], TimePickerComponent.prototype, "selectedTimeChange", void 0);
__decorate([
    HostListener('document:click', ['$event'])
], TimePickerComponent.prototype, "offClick", null);
TimePickerComponent = TimePickerComponent_1 = __decorate([
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

var DateTimePickerModule_1;
let DateTimePickerModule = DateTimePickerModule_1 = class DateTimePickerModule {
    static forRoot() {
        return {
            ngModule: DateTimePickerModule_1,
            providers: []
        };
    }
};
DateTimePickerModule = DateTimePickerModule_1 = __decorate([
    NgModule({
        declarations: [
            TimeComponent,
            DateComponent,
            DatePickerComponent,
            DateTimePickerComponent,
            TimePickerComponent
        ],
        exports: [
            DatePickerComponent,
            DateTimePickerComponent,
            TimePickerComponent
        ],
        imports: [
            CommonModule
        ],
        providers: [
            DateService,
            IsMobileService,
            Renderer
        ],
    })
], DateTimePickerModule);

/**
 * Generated bundle index. Do not edit.
 */

export { DatePickerComponent, DateService, DateTimePickerComponent, DateTimePickerModule, TimePickerComponent, TimeComponent as ɵa, DateComponent as ɵb, IsMobileService as ɵc, Renderer as ɵd };
//# sourceMappingURL=ngx-datetime-picker.js.map

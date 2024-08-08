import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { DateService } from '../../services/date.service';
var DateComponent = /** @class */ (function () {
    function DateComponent(dateService) {
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
    Object.defineProperty(DateComponent.prototype, "selectedMonth", {
        get: function () {
            if (this.selectedDate == null) {
                return new Date().getMonth() + 1;
            }
            return this.selectedDate.getMonth() + 1;
        },
        set: function (month) {
            var newDate = new Date(this.selectedDate);
            if (month == null) {
                month = new Date().getMonth();
            }
            newDate.setMonth(month - 1);
            this.loadCalendarMonth(newDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateComponent.prototype, "selectedDay", {
        get: function () {
            if (this.selectedDate == null) {
                return new Date().getDate();
            }
            return this.selectedDate.getDate();
        },
        set: function (day) {
            var newDate = new Date(this.selectedDate);
            newDate.setDate(day);
            this.loadCalendarMonth(newDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateComponent.prototype, "selectedYear", {
        get: function () {
            if (this.selectedDate == null) {
                return new Date().getFullYear();
            }
            return this.selectedDate.getFullYear();
        },
        set: function (year) {
            var newDate = new Date(this.selectedDate);
            newDate.setFullYear(year);
            this.loadCalendarMonth(newDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateComponent.prototype, "selectedMonthText", {
        get: function () {
            return this.dateService.getMonthText(this.selectedDate);
        },
        enumerable: true,
        configurable: true
    });
    DateComponent.prototype.setMonth = function (i) {
        this.selectedMonth = i;
        this.showMonthSelection = false;
        this.alreadySpecifiedMonth = true;
        if (!this.alreadySpecifiedYear) {
            this.showYearSelection = true;
        }
    };
    DateComponent.prototype.setSelectedDate = function (date, hour, minutes) {
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
    };
    DateComponent.prototype.setYear = function (year) {
        this.selectedYear = year;
        this.showYearSelection = false;
        this.alreadySpecifiedYear = true;
        if (!this.alreadySpecifiedMonth) {
            this.showMonthSelection = true;
        }
    };
    DateComponent.prototype.loadCalendarMonth = function (date) {
        if (date == null) {
            date = new Date();
        }
        var shouldReloadCalendar = (this.selectedMonth != (date.getMonth() + 1) || this.selectedYear != date.getFullYear());
        this.selectedDate = date;
        if (shouldReloadCalendar) {
            this.availableDays = tslib_1.__spread(this.dateService.getDateList(this.selectedMonth, this.selectedYear));
        }
    };
    DateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.months = this.dateService.getMonths();
        this.years = this.dateService.getAvailableYears();
        // subscribing to it's own event emitter to set the selected year position
        this.selectedDateChange.subscribe(function () {
            _this.scrollToMonth();
            _this.scrollToYear();
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
        this.availableDays = tslib_1.__spread(this.dateService.getDateList(this.selectedMonth, this.selectedYear));
    };
    DateComponent.prototype.canSelectYear = function (year) {
        return this.dateService.canSelectYear(year, this.min, this.max);
    };
    DateComponent.prototype.canSelectMonth = function (month) {
        return this.dateService.canSelectMonth(month, this.selectedYear, this.min, this.max);
    };
    DateComponent.prototype.canSelectDay = function (day, month) {
        return this.dateService.canSelectDay(day, month, this.selectedYear, this.min, this.max);
    };
    DateComponent.prototype.scrollToYear = function () {
        var _this = this;
        // setTime out is being used since I need this code to excute next, if not the change won't be visible until the second click
        setTimeout(function () {
            if (_this.yearSelect && _this.yearSelect.nativeElement) {
                var selectContainer = _this.yearSelect.nativeElement;
                var selectedYear = selectContainer.querySelector('.calendar--year__selected');
                selectContainer.scrollTop = selectedYear.offsetTop - (selectContainer.clientHeight / 2) - (selectedYear.clientHeight);
            }
        });
    };
    DateComponent.prototype.scrollToMonth = function () {
        var _this = this;
        // setTime out is being used since I need this code to execute next, if not the change won't be visible until the second click
        setTimeout(function () {
            if (_this.monthSelect && _this.monthSelect.nativeElement) {
                var selectContainer = _this.monthSelect.nativeElement;
                var selectedMonth = selectContainer.querySelector('.calendar--month__selected');
                selectContainer.scrollTop = selectedMonth.offsetTop - (selectContainer.clientHeight / 2) - (selectedMonth.clientHeight);
            }
        });
    };
    DateComponent.prototype.previousMonth = function () {
        this.alreadySpecifiedMonth = false;
        var previousMonth = new Date(this.selectedDate);
        //because javascript sets months based on a 0 index need to jump back 2 to go to the previous month.
        previousMonth.setMonth(this.selectedMonth - 2);
        this.loadCalendarMonth(previousMonth);
    };
    DateComponent.prototype.nextMonth = function () {
        this.alreadySpecifiedMonth = false;
        var nextMonth = new Date(this.selectedDate);
        /// same as above but since selected month is 1-12 the index is already the next month.
        nextMonth.setMonth(this.selectedMonth);
        this.loadCalendarMonth(nextMonth);
    };
    DateComponent.prototype.toggleMonthMenu = function () {
        this.scrollToMonth();
        this.showMonthSelection = !this.showMonthSelection;
    };
    DateComponent.prototype.toggleYearMenu = function () {
        this.scrollToYear();
        this.showYearSelection = !this.showYearSelection;
    };
    DateComponent.prototype.closePicker = function () {
        this.alreadySpecifiedMonth = false;
        this.alreadySpecifiedYear = false;
        this.closeDatePicker.emit(false);
    };
    DateComponent.ctorParameters = function () { return [
        { type: DateService }
    ]; };
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
    return DateComponent;
}());
export { DateComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGF0ZXRpbWUtcGlja2VyLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9kYXRlL2RhdGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFjLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6SCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFRMUQ7SUErRUMsdUJBQ1ksV0FBdUI7UUFBdkIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUE3RTFCLHdCQUFtQixHQUFZLEtBQUssQ0FBQztRQUNyQyxRQUFHLEdBQVcsSUFBSSxDQUFDO1FBQ25CLFFBQUcsR0FBVyxJQUFJLENBQUM7UUFDbkIsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUFFL0IsdUJBQWtCLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUM5QyxvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFjOUMsMEJBQXFCLEdBQVksS0FBSyxDQUFDO1FBQ3ZDLHlCQUFvQixHQUFZLEtBQUssQ0FBQztRQUV0Qyx1QkFBa0IsR0FBWSxLQUFLLENBQUM7UUFDdkMsc0JBQWlCLEdBQVksS0FBSyxDQUFDO0lBd0R2QyxDQUFDO0lBdERKLHNCQUFJLHdDQUFhO2FBQWpCO1lBQ0MsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksRUFBRTtnQkFDOUIsT0FBTyxJQUFJLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNqQztZQUNELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDekMsQ0FBQzthQWdCRCxVQUFrQixLQUFhO1lBQzlCLElBQUksT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FB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LENBQUM7O2dCQXZMdUIsV0FBVzs7SUEvRTFCO1FBQVIsS0FBSyxFQUFFO3VEQUFvQjtJQUNuQjtRQUFSLEtBQUssRUFBRTtzREFBc0I7SUFDckI7UUFBUixLQUFLLEVBQUU7OERBQXNDO0lBQ3JDO1FBQVIsS0FBSyxFQUFFOzhDQUFvQjtJQUNuQjtRQUFSLEtBQUssRUFBRTs4Q0FBb0I7SUFDbkI7UUFBUixLQUFLLEVBQUU7eURBQWlDO0lBRS9CO1FBQVQsTUFBTSxFQUFFOzZEQUErQztJQUM5QztRQUFULE1BQU0sRUFBRTswREFBK0M7SUFFL0I7UUFBeEIsU0FBUyxDQUFDLFlBQVksQ0FBQztxREFBd0I7SUFDdEI7UUFBekIsU0FBUyxDQUFDLGFBQWEsQ0FBQztzREFBeUI7SUFadEMsYUFBYTtRQUx6QixTQUFTLENBQUM7WUFDVixRQUFRLEVBQUssVUFBVTtZQUN2Qiw0NUdBQW9DO1lBQ3BDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1NBQ3JDLENBQUM7T0FDVyxhQUFhLENBd1F6QjtJQUFELG9CQUFDO0NBQUEsQUF4UUQsSUF3UUM7U0F4UVksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRGF0ZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kYXRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgZGF5T2ZUaGVNb250aCB9IGZyb20gJy4uLy4uL21vZGVscy9kYXlPZlRoZU1vbnRoLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogICAgJ25neC1kYXRlJyxcblx0dGVtcGxhdGVVcmw6ICcuL2RhdGUuY29tcG9uZW50Lmh0bWwnLFxuXHRlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBEYXRlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblx0QElucHV0KCkgc2VsZWN0ZWREYXRlOiBEYXRlO1xuXHRASW5wdXQoKSBpbmNsdWRlVGltZTogYm9vbGVhbjtcblx0QElucHV0KCkgZG9Ob3RDbG9zZU9uRGF0ZVNldDogYm9vbGVhbiA9IGZhbHNlO1xuXHRASW5wdXQoKSBtaW46IHN0cmluZyA9IG51bGw7XG5cdEBJbnB1dCgpIG1heDogc3RyaW5nID0gbnVsbDtcblx0QElucHV0KCkgdXNlMjRIb3VyQ2xvY2s6IGJvb2xlYW4gPSBmYWxzZTtcblxuXHRAT3V0cHV0KCkgc2VsZWN0ZWREYXRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxEYXRlPigpO1xuXHRAT3V0cHV0KCkgY2xvc2VEYXRlUGlja2VyID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG5cdEBWaWV3Q2hpbGQoJ3llYXJTZWxlY3QnKSB5ZWFyU2VsZWN0OiBFbGVtZW50UmVmO1xuXHRAVmlld0NoaWxkKCdtb250aFNlbGVjdCcpIG1vbnRoU2VsZWN0OiBFbGVtZW50UmVmO1xuXG5cdHB1YmxpYyBhdmFpbGFibGVEYXlzOiBkYXlPZlRoZU1vbnRoW107XG5cdHB1YmxpYyBtb250aHM6IHN0cmluZ1tdO1xuXHRwdWJsaWMgeWVhcnM6IG51bWJlcltdO1xuXG5cdHB1YmxpYyBoaWdobGlnaHRlZERhdGU6IERhdGU7XG5cblx0cHVibGljIHNlbGVjdGVkSG91cjogbnVtYmVyO1xuXHRwdWJsaWMgc2VsZWN0ZWRNaW51dGU6IG51bWJlcjtcblxuICAgIHB1YmxpYyBhbHJlYWR5U3BlY2lmaWVkTW9udGg6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgYWxyZWFkeVNwZWNpZmllZFllYXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHB1YmxpYyBzaG93TW9udGhTZWxlY3Rpb246IGJvb2xlYW4gPSBmYWxzZTtcblx0cHVibGljIHNob3dZZWFyU2VsZWN0aW9uOiBib29sZWFuID0gZmFsc2U7XG5cblx0Z2V0IHNlbGVjdGVkTW9udGgoKTogbnVtYmVyIHtcblx0XHRpZiAodGhpcy5zZWxlY3RlZERhdGUgPT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIG5ldyBEYXRlKCkuZ2V0TW9udGgoKSArIDE7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLnNlbGVjdGVkRGF0ZS5nZXRNb250aCgpICsgMTtcblx0fVxuXG5cdGdldCBzZWxlY3RlZERheSgpOiBudW1iZXIge1xuXHRcdGlmICh0aGlzLnNlbGVjdGVkRGF0ZSA9PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gbmV3IERhdGUoKS5nZXREYXRlKCk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLnNlbGVjdGVkRGF0ZS5nZXREYXRlKCk7XG5cdH1cblxuXHRnZXQgc2VsZWN0ZWRZZWFyKCk6IG51bWJlciB7XG5cdFx0aWYgKHRoaXMuc2VsZWN0ZWREYXRlID09IG51bGwpIHtcblx0XHRcdHJldHVybiBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLnNlbGVjdGVkRGF0ZS5nZXRGdWxsWWVhcigpO1xuXHR9XG5cblx0c2V0IHNlbGVjdGVkTW9udGgobW9udGg6IG51bWJlcikge1xuXHRcdGxldCBuZXdEYXRlID0gbmV3IERhdGUodGhpcy5zZWxlY3RlZERhdGUpO1xuXG5cdFx0aWYgKG1vbnRoID09IG51bGwpIHtcblx0XHRcdG1vbnRoID0gbmV3IERhdGUoKS5nZXRNb250aCgpO1xuXHRcdH1cblxuXHRcdG5ld0RhdGUuc2V0TW9udGgobW9udGggLSAxKTtcblx0XHR0aGlzLmxvYWRDYWxlbmRhck1vbnRoKG5ld0RhdGUpO1xuXHR9XG5cblx0c2V0IHNlbGVjdGVkRGF5KGRheTogbnVtYmVyKSB7XG5cdFx0bGV0IG5ld0RhdGUgPSBuZXcgRGF0ZSh0aGlzLnNlbGVjdGVkRGF0ZSk7XG5cblx0XHRuZXdEYXRlLnNldERhdGUoZGF5KTtcblx0XHR0aGlzLmxvYWRDYWxlbmRhck1vbnRoKG5ld0RhdGUpO1xuXG5cdH1cblx0c2V0IHNlbGVjdGVkWWVhcih5ZWFyOiBudW1iZXIpIHtcblx0XHRsZXQgbmV3RGF0ZSA9IG5ldyBEYXRlKHRoaXMuc2VsZWN0ZWREYXRlKTtcblxuXHRcdG5ld0RhdGUuc2V0RnVsbFllYXIoeWVhcik7XG5cdFx0dGhpcy5sb2FkQ2FsZW5kYXJNb250aChuZXdEYXRlKTtcblx0fVxuXG5cdGdldCBzZWxlY3RlZE1vbnRoVGV4dCgpOiBzdHJpbmcge1xuXHRcdHJldHVybiB0aGlzLmRhdGVTZXJ2aWNlLmdldE1vbnRoVGV4dCh0aGlzLnNlbGVjdGVkRGF0ZSk7XG5cdH1cblxuXHRjb25zdHJ1Y3Rvcihcblx0ICAgIHByaXZhdGUgZGF0ZVNlcnZpY2U6RGF0ZVNlcnZpY2VcbiAgICApIHtcblxuICAgIH1cblxuXHRzZXRNb250aChpOm51bWJlcik6dm9pZCB7XG5cdCAgICB0aGlzLnNlbGVjdGVkTW9udGggPSBpO1xuXG5cdCAgICB0aGlzLnNob3dNb250aFNlbGVjdGlvbiA9IGZhbHNlO1xuXHQgICAgdGhpcy5hbHJlYWR5U3BlY2lmaWVkTW9udGggPSB0cnVlO1xuXG4gICAgICAgIGlmICghdGhpcy5hbHJlYWR5U3BlY2lmaWVkWWVhcikge1xuICAgICAgICAgICAgdGhpcy5zaG93WWVhclNlbGVjdGlvbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cblx0c2V0U2VsZWN0ZWREYXRlKGRhdGU6IERhdGUsIGhvdXI/OiBudW1iZXIsIG1pbnV0ZXM/OiBudW1iZXIpOiB2b2lkIHtcblx0XHRpZiAodGhpcy5pbmNsdWRlVGltZSAmJiAhIWRhdGUgJiYgISF0aGlzLnNlbGVjdGVkRGF0ZSkge1xuXHRcdFx0ZGF0ZS5zZXRIb3Vycyh0aGlzLnNlbGVjdGVkRGF0ZS5nZXRIb3VycygpLCB0aGlzLnNlbGVjdGVkRGF0ZS5nZXRNaW51dGVzKCkpO1xuXHRcdH1cblx0XHRpZiAoIWRhdGUpIHtcblx0XHRcdGRhdGUgPSBuZXcgRGF0ZSgpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLm1pbiAmJiBkYXRlIDwgbmV3IERhdGUodGhpcy5taW4pKSB7XG5cdFx0XHRkYXRlID0gbmV3IERhdGUodGhpcy5taW4pO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLm1heCAmJiBkYXRlID4gbmV3IERhdGUodGhpcy5tYXgpKSB7XG5cdFx0XHRkYXRlID0gbmV3IERhdGUodGhpcy5tYXgpO1xuXHRcdH1cblxuXHRcdC8vbG9hZCBjYWxlbmRhck1vbnRoIHdpbGwgc2V0IHRoZSBzZWxlY3RlZCBkYXRlO1xuXHRcdHRoaXMubG9hZENhbGVuZGFyTW9udGgoZGF0ZSk7XG5cblx0XHRpZiAoaG91ciAhPSBudWxsKSB7XG5cdFx0XHR0aGlzLnNlbGVjdGVkRGF0ZS5zZXRIb3Vycyhob3VyKTtcblx0XHR9XG5cblx0XHRpZiAobWludXRlcyAhPSBudWxsKSB7XG5cdFx0XHR0aGlzLnNlbGVjdGVkRGF0ZS5zZXRNaW51dGVzKG1pbnV0ZXMpO1xuXHRcdH1cblxuXHRcdHRoaXMuc2VsZWN0ZWREYXRlQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZERhdGUpO1xuXHRcdHRoaXMuaGlnaGxpZ2h0ZWREYXRlID0gdGhpcy5zZWxlY3RlZERhdGU7XG5cdFx0dGhpcy5zZWxlY3RlZEhvdXIgPSBkYXRlLmdldEhvdXJzKCk7XG5cdFx0dGhpcy5zZWxlY3RlZE1pbnV0ZSA9IGRhdGUuZ2V0TWludXRlcygpO1xuXG5cdFx0aWYgKCF0aGlzLmRvTm90Q2xvc2VPbkRhdGVTZXQpIHtcblx0XHRcdHRoaXMuY2xvc2VQaWNrZXIoKTtcblx0XHR9XG5cdH1cblxuICAgIHNldFllYXIoeWVhcjpudW1iZXIpOnZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGVkWWVhciA9IHllYXI7XG5cbiAgICAgICAgdGhpcy5zaG93WWVhclNlbGVjdGlvbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFscmVhZHlTcGVjaWZpZWRZZWFyID0gdHJ1ZTtcblxuICAgICAgICBpZiAoIXRoaXMuYWxyZWFkeVNwZWNpZmllZE1vbnRoKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dNb250aFNlbGVjdGlvbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cblx0cHJpdmF0ZSBsb2FkQ2FsZW5kYXJNb250aChkYXRlOiBEYXRlKSB7XG5cdFx0aWYgKGRhdGUgPT0gbnVsbCkge1xuXHRcdFx0ZGF0ZSA9IG5ldyBEYXRlKCk7XG5cdFx0fVxuXHRcdGNvbnN0IHNob3VsZFJlbG9hZENhbGVuZGFyID0gKHRoaXMuc2VsZWN0ZWRNb250aCAhPSAoZGF0ZS5nZXRNb250aCgpICsgMSkgfHwgdGhpcy5zZWxlY3RlZFllYXIgIT0gZGF0ZS5nZXRGdWxsWWVhcigpKTtcblx0XHR0aGlzLnNlbGVjdGVkRGF0ZSA9IGRhdGU7XG5cblx0XHRpZiAoc2hvdWxkUmVsb2FkQ2FsZW5kYXIpIHtcblx0XHRcdHRoaXMuYXZhaWxhYmxlRGF5cyA9IFsuLi50aGlzLmRhdGVTZXJ2aWNlLmdldERhdGVMaXN0KHRoaXMuc2VsZWN0ZWRNb250aCwgdGhpcy5zZWxlY3RlZFllYXIpXTtcblx0XHR9XG5cdH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLm1vbnRocyA9IHRoaXMuZGF0ZVNlcnZpY2UuZ2V0TW9udGhzKCk7XG5cdFx0dGhpcy55ZWFycyA9IHRoaXMuZGF0ZVNlcnZpY2UuZ2V0QXZhaWxhYmxlWWVhcnMoKTtcblxuXHRcdC8vIHN1YnNjcmliaW5nIHRvIGl0J3Mgb3duIGV2ZW50IGVtaXR0ZXIgdG8gc2V0IHRoZSBzZWxlY3RlZCB5ZWFyIHBvc2l0aW9uXG5cdFx0dGhpcy5zZWxlY3RlZERhdGVDaGFuZ2Uuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9Nb250aCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9ZZWFyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cblxuXHRcdC8vSWYgbm8gZGF0ZSBpcyBzZWxlY3RlZCB0aGVuIGRlZmF1bHQgdG8gdG9kYXkncyBkYXRlLlxuXHRcdGlmICghdGhpcy5zZWxlY3RlZERhdGUpIHtcblx0XHRcdGlmICh0aGlzLm1pbiAmJiBuZXcgRGF0ZSh0aGlzLm1pbikgPiBuZXcgRGF0ZSgpKSB7XG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWREYXRlID0gbmV3IERhdGUodGhpcy5taW4pO1xuXHRcdFx0fSBlbHNlIGlmICh0aGlzLm1heCAmJiBuZXcgRGF0ZSh0aGlzLm1heCkgPCBuZXcgRGF0ZSgpKSB7XG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWREYXRlID0gbmV3IERhdGUodGhpcy5tYXgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5zZWxlY3RlZERhdGUgPSBuZXcgRGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAodHlwZW9mIHRoaXMuc2VsZWN0ZWREYXRlID09ICdzdHJpbmcnKSB7XG5cdFx0XHR0aGlzLnNlbGVjdGVkRGF0ZSA9IG5ldyBEYXRlKHRoaXMuc2VsZWN0ZWREYXRlKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5pbmNsdWRlVGltZSkge1xuXHRcdFx0dGhpcy5zZWxlY3RlZEhvdXIgPSB0aGlzLnNlbGVjdGVkRGF0ZS5nZXRIb3VycygpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmluY2x1ZGVUaW1lKSB7XG5cdFx0XHR0aGlzLnNlbGVjdGVkTWludXRlID0gdGhpcy5zZWxlY3RlZERhdGUuZ2V0TWludXRlcygpO1xuXHRcdH1cblx0XHR0aGlzLmhpZ2hsaWdodGVkRGF0ZSA9IHRoaXMuc2VsZWN0ZWREYXRlO1xuXHRcdHRoaXMuYXZhaWxhYmxlRGF5cyA9IFsuLi50aGlzLmRhdGVTZXJ2aWNlLmdldERhdGVMaXN0KHRoaXMuc2VsZWN0ZWRNb250aCwgdGhpcy5zZWxlY3RlZFllYXIpXTtcblxuXHR9XG5cblx0cHVibGljIGNhblNlbGVjdFllYXIoeWVhcjogbnVtYmVyKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMuZGF0ZVNlcnZpY2UuY2FuU2VsZWN0WWVhcih5ZWFyLCB0aGlzLm1pbiwgdGhpcy5tYXgpO1xuXHR9XG5cblx0cHVibGljIGNhblNlbGVjdE1vbnRoKG1vbnRoOiBudW1iZXIpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gdGhpcy5kYXRlU2VydmljZS5jYW5TZWxlY3RNb250aChtb250aCwgdGhpcy5zZWxlY3RlZFllYXIsIHRoaXMubWluLCB0aGlzLm1heCk7XG5cdH1cblxuXHRwdWJsaWMgY2FuU2VsZWN0RGF5KGRheTogbnVtYmVyLCBtb250aDogbnVtYmVyKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMuZGF0ZVNlcnZpY2UuY2FuU2VsZWN0RGF5KGRheSwgbW9udGgsIHRoaXMuc2VsZWN0ZWRZZWFyLCB0aGlzLm1pbiwgdGhpcy5tYXgpO1xuXHR9XG5cblx0cHVibGljIHNjcm9sbFRvWWVhcigpOiB2b2lkIHtcblx0XHQvLyBzZXRUaW1lIG91dCBpcyBiZWluZyB1c2VkIHNpbmNlIEkgbmVlZCB0aGlzIGNvZGUgdG8gZXhjdXRlIG5leHQsIGlmIG5vdCB0aGUgY2hhbmdlIHdvbid0IGJlIHZpc2libGUgdW50aWwgdGhlIHNlY29uZCBjbGlja1xuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0aWYgKHRoaXMueWVhclNlbGVjdCAmJiB0aGlzLnllYXJTZWxlY3QubmF0aXZlRWxlbWVudCkge1xuXHRcdFx0XHRjb25zdCBzZWxlY3RDb250YWluZXIgPSB0aGlzLnllYXJTZWxlY3QubmF0aXZlRWxlbWVudDtcblx0XHRcdFx0Y29uc3Qgc2VsZWN0ZWRZZWFyID0gc2VsZWN0Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5jYWxlbmRhci0teWVhcl9fc2VsZWN0ZWQnKTtcblx0XHRcdFx0c2VsZWN0Q29udGFpbmVyLnNjcm9sbFRvcCA9IHNlbGVjdGVkWWVhci5vZmZzZXRUb3AgLSAoc2VsZWN0Q29udGFpbmVyLmNsaWVudEhlaWdodCAvIDIpIC0gKHNlbGVjdGVkWWVhci5jbGllbnRIZWlnaHQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cHVibGljIHNjcm9sbFRvTW9udGgoKTogdm9pZCB7XG5cdFx0Ly8gc2V0VGltZSBvdXQgaXMgYmVpbmcgdXNlZCBzaW5jZSBJIG5lZWQgdGhpcyBjb2RlIHRvIGV4ZWN1dGUgbmV4dCwgaWYgbm90IHRoZSBjaGFuZ2Ugd29uJ3QgYmUgdmlzaWJsZSB1bnRpbCB0aGUgc2Vjb25kIGNsaWNrXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRpZiAodGhpcy5tb250aFNlbGVjdCAmJiB0aGlzLm1vbnRoU2VsZWN0Lm5hdGl2ZUVsZW1lbnQpIHtcblx0XHRcdFx0Y29uc3Qgc2VsZWN0Q29udGFpbmVyID0gdGhpcy5tb250aFNlbGVjdC5uYXRpdmVFbGVtZW50O1xuXHRcdFx0XHRjb25zdCBzZWxlY3RlZE1vbnRoID0gc2VsZWN0Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5jYWxlbmRhci0tbW9udGhfX3NlbGVjdGVkJyk7XG5cdFx0XHRcdHNlbGVjdENvbnRhaW5lci5zY3JvbGxUb3AgPSBzZWxlY3RlZE1vbnRoLm9mZnNldFRvcCAtIChzZWxlY3RDb250YWluZXIuY2xpZW50SGVpZ2h0IC8gMikgLSAoc2VsZWN0ZWRNb250aC5jbGllbnRIZWlnaHQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cHVibGljIHByZXZpb3VzTW9udGgoKTogdm9pZCB7XG5cdCAgICB0aGlzLmFscmVhZHlTcGVjaWZpZWRNb250aCA9IGZhbHNlO1xuXG5cdFx0bGV0IHByZXZpb3VzTW9udGggPSBuZXcgRGF0ZSh0aGlzLnNlbGVjdGVkRGF0ZSk7XG5cdFx0Ly9iZWNhdXNlIGphdmFzY3JpcHQgc2V0cyBtb250aHMgYmFzZWQgb24gYSAwIGluZGV4IG5lZWQgdG8ganVtcCBiYWNrIDIgdG8gZ28gdG8gdGhlIHByZXZpb3VzIG1vbnRoLlxuXHRcdHByZXZpb3VzTW9udGguc2V0TW9udGgodGhpcy5zZWxlY3RlZE1vbnRoIC0gMik7XG5cdFx0dGhpcy5sb2FkQ2FsZW5kYXJNb250aChwcmV2aW91c01vbnRoKTtcblx0fVxuXG5cdHB1YmxpYyBuZXh0TW9udGgoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYWxyZWFkeVNwZWNpZmllZE1vbnRoID0gZmFsc2U7XG5cblx0XHRsZXQgbmV4dE1vbnRoID0gbmV3IERhdGUodGhpcy5zZWxlY3RlZERhdGUpO1xuXHRcdC8vLyBzYW1lIGFzIGFib3ZlIGJ1dCBzaW5jZSBzZWxlY3RlZCBtb250aCBpcyAxLTEyIHRoZSBpbmRleCBpcyBhbHJlYWR5IHRoZSBuZXh0IG1vbnRoLlxuXHRcdG5leHRNb250aC5zZXRNb250aCh0aGlzLnNlbGVjdGVkTW9udGgpO1xuXHRcdHRoaXMubG9hZENhbGVuZGFyTW9udGgobmV4dE1vbnRoKTtcblx0fVxuXG5cdHB1YmxpYyB0b2dnbGVNb250aE1lbnUoKTogdm9pZCB7XG5cdFx0dGhpcy5zY3JvbGxUb01vbnRoKCk7XG5cblx0XHR0aGlzLnNob3dNb250aFNlbGVjdGlvbiA9ICF0aGlzLnNob3dNb250aFNlbGVjdGlvbjtcblx0fVxuXG5cdHB1YmxpYyB0b2dnbGVZZWFyTWVudSgpOiB2b2lkIHtcblx0XHR0aGlzLnNjcm9sbFRvWWVhcigpO1xuXHRcdHRoaXMuc2hvd1llYXJTZWxlY3Rpb24gPSAhdGhpcy5zaG93WWVhclNlbGVjdGlvbjtcblx0fVxuXG5cdHB1YmxpYyBjbG9zZVBpY2tlcigpOiB2b2lkIHtcblx0ICAgIHRoaXMuYWxyZWFkeVNwZWNpZmllZE1vbnRoID0gZmFsc2U7XG5cdCAgICB0aGlzLmFscmVhZHlTcGVjaWZpZWRZZWFyID0gZmFsc2U7XG5cblx0XHR0aGlzLmNsb3NlRGF0ZVBpY2tlci5lbWl0KGZhbHNlKTtcblx0fVxufVxuIl19
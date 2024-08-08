(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('ngx-datetime-picker', ['exports', '@angular/core', '@angular/common', '@angular/forms'], factory) :
    (global = global || self, factory(global['ngx-datetime-picker'] = {}, global.ng.core, global.ng.common, global.ng.forms));
}(this, function (exports, core, common, forms) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
                t[p[i]] = s[p[i]];
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    var DateService = /** @class */ (function () {
        function DateService() {
            this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        }
        DateService.prototype.addLeadingZero = function (value) {
            if (value < 10) {
                return "0" + value.toString();
            }
            return value.toString();
        };
        DateService.prototype.formatMobileYYYYMMDD = function (date) {
            if (!date || typeof date == 'string') {
                return '';
            }
            return date.getFullYear() + "-" + this.addLeadingZero(date.getMonth() + 1) + "-" + this.addLeadingZero(date.getDate());
        };
        DateService.prototype.formatMobileYYYYMMDDTHHMM = function (date) {
            if (!date || typeof date == 'string') {
                return '';
            }
            return this.formatMobileYYYYMMDD(date) + "T" + this.addLeadingZero(date.getHours()) + ":" + this.addLeadingZero(date.getMinutes());
        };
        DateService.prototype.formatMMDDYYYY = function (date) {
            if (!date || typeof date == 'string') {
                return '';
            }
            return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
        };
        DateService.prototype.formatMMDDYYYY_HHMM_AMPM = function (date) {
            if (!date || typeof date == 'string') {
                return '';
            }
            var hours = date.getHours();
            var minutes = date.getMinutes();
            return this.formatMMDDYYYY(date) + " " + this.formatHHMM_AMPM(hours, minutes);
        };
        DateService.prototype.formatMMDDYYYY_HHMM = function (date) {
            if (!date || typeof date == 'string') {
                return '';
            }
            var hours = date.getHours();
            var minutes = date.getMinutes();
            return this.formatMMDDYYYY(date) + " " + this.formatHHMM(hours, minutes);
        };
        DateService.prototype.formatHHMM_AMPM = function (hour, minute, clock) {
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
            var formattedMinute = (!minute ? '00' : (minute <= 9 ? "0" + minute : minute));
            return hour + ":" + formattedMinute + " " + clock;
        };
        DateService.prototype.formatHHMM = function (hour, minute) {
            if (hour == null || minute == null) {
                return '';
            }
            var formattedHour = (!hour ? '00' : (hour <= 9 ? "0" + hour : hour));
            var formattedMinute = (!minute ? '00' : (minute <= 9 ? "0" + minute : minute));
            return formattedHour + ":" + formattedMinute;
        };
        DateService.prototype.getCurrentMonthDays = function (month, year) {
            var dayOfTheMonth = new Date(year, month - 1, 1);
            var nextMonth = new Date(year, month - 1, 1);
            var returnedDays = [];
            nextMonth.setMonth(nextMonth.getMonth() + 1);
            while (dayOfTheMonth.getMonth() != nextMonth.getMonth()) {
                var dayToAdd = {
                    day: dayOfTheMonth.getDate(),
                    dayOfTheWeek: dayOfTheMonth.getDay(),
                    month: dayOfTheMonth.getMonth() + 1,
                    date: new Date((dayOfTheMonth.getMonth() + 1) + '/' + dayOfTheMonth.getDate() + '/' + dayOfTheMonth.getFullYear())
                };
                returnedDays.push(dayToAdd);
                dayOfTheMonth.setDate(dayOfTheMonth.getDate() + 1);
            }
            return returnedDays;
        };
        DateService.prototype.getDateList = function (Month, Year) {
            return __spread(this.getPreviousMonthDays(Month, Year), this.getCurrentMonthDays(Month, Year), this.getNextMonthDays(Month, Year));
        };
        DateService.prototype.getPreviousMonthDays = function (Month, Year) {
            var day = new Date(Month + '/1/' + Year);
            var returnedDays = [];
            var dayOfTheWeek = day.getDay();
            while (dayOfTheWeek != 0) {
                day.setDate(day.getDate() - 1);
                returnedDays = __spread([{
                        day: day.getDate(),
                        dayOfTheWeek: day.getDay(),
                        month: day.getMonth() + 1,
                        date: new Date((day.getMonth() + 1) + '/' + day.getDate() + '/' + day.getFullYear())
                    }], returnedDays);
                dayOfTheWeek = day.getDay();
            }
            return returnedDays;
        };
        DateService.prototype.getNextMonthDays = function (Month, Year) {
            var day = new Date(Month + '/1/' + Year);
            day.setMonth(day.getMonth() + 1);
            day.setDate(day.getDate() - 1);
            var returnedDays = [];
            var dayOfTheWeek = day.getDay();
            while (dayOfTheWeek != 6) {
                day.setDate(day.getDate() + 1);
                returnedDays = __spread(returnedDays, [{
                        day: day.getDate(),
                        dayOfTheWeek: day.getDay(),
                        month: day.getMonth() + 1,
                        date: new Date((day.getMonth() + 1) + '/' + day.getDate() + '/' + day.getFullYear())
                    }]);
                dayOfTheWeek = day.getDay();
            }
            return returnedDays;
        };
        DateService.prototype.getMonths = function () {
            return this.months;
        };
        DateService.prototype.getMonthText = function (date) {
            if (date == null) {
                date = new Date();
            }
            return this.months[date.getMonth()];
        };
        DateService.prototype.getAvailableYears = function () {
            var currentYear = new Date().getFullYear();
            var startYear = currentYear - 80;
            var returnYears = [];
            while (startYear <= (currentYear + 5)) {
                returnYears.push(startYear);
                startYear = startYear + 1;
            }
            return returnYears;
        };
        DateService.prototype.canSelectYear = function (year, min, max) {
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
        };
        DateService.prototype.canSelectMonth = function (month, year, min, max) {
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
        };
        DateService.prototype.canSelectDay = function (day, month, year, min, max) {
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
        };
        DateService = __decorate([
            core.Injectable()
        ], DateService);
        return DateService;
    }());

    var DateComponent = /** @class */ (function () {
        function DateComponent(dateService) {
            this.dateService = dateService;
            this.doNotCloseOnDateSet = false;
            this.min = null;
            this.max = null;
            this.use24HourClock = false;
            this.selectedDateChange = new core.EventEmitter();
            this.closeDatePicker = new core.EventEmitter();
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
                this.availableDays = __spread(this.dateService.getDateList(this.selectedMonth, this.selectedYear));
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
            this.availableDays = __spread(this.dateService.getDateList(this.selectedMonth, this.selectedYear));
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
        __decorate([
            core.Input()
        ], DateComponent.prototype, "selectedDate", void 0);
        __decorate([
            core.Input()
        ], DateComponent.prototype, "includeTime", void 0);
        __decorate([
            core.Input()
        ], DateComponent.prototype, "doNotCloseOnDateSet", void 0);
        __decorate([
            core.Input()
        ], DateComponent.prototype, "min", void 0);
        __decorate([
            core.Input()
        ], DateComponent.prototype, "max", void 0);
        __decorate([
            core.Input()
        ], DateComponent.prototype, "use24HourClock", void 0);
        __decorate([
            core.Output()
        ], DateComponent.prototype, "selectedDateChange", void 0);
        __decorate([
            core.Output()
        ], DateComponent.prototype, "closeDatePicker", void 0);
        __decorate([
            core.ViewChild('yearSelect')
        ], DateComponent.prototype, "yearSelect", void 0);
        __decorate([
            core.ViewChild('monthSelect')
        ], DateComponent.prototype, "monthSelect", void 0);
        DateComponent = __decorate([
            core.Component({
                selector: 'ngx-date',
                template: "<div class=\"calendar\">\n\t<button type=\"button\"\n            class=\"ngx-picker--btn ngx-picker--btn__month\"\n            (click)=\"toggleMonthMenu(); showYearSelection = false\">\n        {{ selectedMonthText }}\n    </button>\n\n\t<button type=\"button\"\n            class=\"ngx-picker--btn ngx-picker--btn__year\"\n            (click)=\"toggleYearMenu(); showMonthSelection = false\">\n        {{ selectedYear }}\n    </button>\n\n\t<span class=\"calendar--previous-and-next\">\n\t\t<button type=\"button\"\n                class=\"ngx-picker--btn ngx-picker--btn__previous\"\n\t\t\t(click)=\"previousMonth()\">\n            &lt;\n        </button>\n\n\t\t<button type=\"button\"\n                class=\"ngx-picker--btn ngx-picker--btn__next\"\n                (click)=\"nextMonth()\">\n            &gt;\n        </button>\n\t</span>\n\n\t<div class=\"calendar--months-select\"\n         #monthSelect\n         [hidden]=\"!showMonthSelection\">\n\t\t<span *ngFor=\"let month of months; let i = index ;\"\n              class=\"calendar--month\"\n\t\t\t  [class.calendar--month__selected]=\"i + 1 == selectedMonth\"\n\t\t\t  [class.calendar--month__disabled]=\"!canSelectMonth(i)\"\n\t\t\t  (click)=\"setMonth(i + 1)\">\n            {{ month }}\n        </span>\n\t</div>\n\n\t<div class=\"calendar--years-select\"\n         #yearSelect\n         [hidden]=\"!showYearSelection\">\n\t\t<span *ngFor=\"let year of years\"\n              class=\"calendar--year\"\n\t\t\t  [class.calendar--year__selected]=\"selectedYear == year\"\n\t\t\t  [class.calendar--year__disabled]=\"!canSelectYear(year)\"\n\t\t\t  (click)=\"this.setYear(year)\">\n            {{ year }}\n\t\t</span>\n\t</div>\n\n\t<div *ngIf=\"showMonthSelection == false && showYearSelection == false\"\n         class=\"calendar--days-and-weeks\">\n        <div class=\"calendar--days-of-week\">\n            <span class=\"calendar--day-of-week\">Su</span>\n            <span class=\"calendar--day-of-week\">Mo</span>\n            <span class=\"calendar--day-of-week\">Tu</span>\n            <span class=\"calendar--day-of-week\">We</span>\n            <span class=\"calendar--day-of-week\">Th</span>\n            <span class=\"calendar--day-of-week\">Fr</span>\n            <span class=\"calendar--day-of-week\">Sa</span>\n        </div>\n\n        <div class=\"calendar--days-select\">\n            <span *ngFor=\"let day of availableDays\"\n                  class=\"calendar--day\"\n                  [class.calendar--day__muted]=\"day.month != selectedMonth\"\n                  [class.calendar--day__selected]=\"(\n                      day.date.getDate() == highlightedDate?.getDate()\n                      && day.date.getFullYear() == highlightedDate?.getFullYear()\n                      && day.date.getMonth() == highlightedDate?.getMonth()\n                  )\"\n                  [class.calendar--day__disabled]=\"!canSelectDay(day.day, day.date.getMonth())\"\n                  (click)=\"setSelectedDate(day.date)\">\n                {{ day.day}}\n            </span>\n        </div>\n\t</div>\n\n\t<ngx-time *ngIf=\"includeTime\"\n\t\t\t  [selectedHour]=\"selectedHour\"\n\t\t\t  [selectedMinute]=\"selectedMinute\"\n\t\t\t  (selectedHourChange)=\"setSelectedDate(highlightedDate,$event)\"\n\t\t\t  (selectedMinuteChange)=\"setSelectedDate(highlightedDate,null, $event)\"\n              (closeDatePicker)=\"closePicker()\"\n\t\t\t  [use24HourClock]=\"use24HourClock\"></ngx-time>\n</div>\n",
                encapsulation: core.ViewEncapsulation.None
            })
        ], DateComponent);
        return DateComponent;
    }());

    var IsMobileService = /** @class */ (function () {
        function IsMobileService() {
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
        IsMobileService = __decorate([
            core.Injectable()
        ], IsMobileService);
        return IsMobileService;
    }());

    var StyleObject = /** @class */ (function () {
        function StyleObject() {
            this.button = {};
            this.date = {};
            this.input = {};
        }
        return StyleObject;
    }());

    var Renderer = /** @class */ (function () {
        function Renderer(platformId) {
            this.platformId = platformId;
        }
        Renderer.prototype.invokeElementMethod = function (eleRef, method) {
            if (common.isPlatformBrowser(this.platformId)) {
                eleRef.nativeElement[method]();
            }
        };
        Renderer.ctorParameters = function () { return [
            { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] }
        ]; };
        Renderer = __decorate([
            core.Injectable(),
            __param(0, core.Inject(core.PLATFORM_ID))
        ], Renderer);
        return Renderer;
    }());

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
            this.selectedDateChange = new core.EventEmitter();
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
            { type: core.ElementRef },
            { type: Renderer }
        ]; };
        __decorate([
            core.Input()
        ], DatePickerComponent.prototype, "selectedDate", void 0);
        __decorate([
            core.Input()
        ], DatePickerComponent.prototype, "min", void 0);
        __decorate([
            core.Input()
        ], DatePickerComponent.prototype, "max", void 0);
        __decorate([
            core.Input()
        ], DatePickerComponent.prototype, "placeholder", void 0);
        __decorate([
            core.Input()
        ], DatePickerComponent.prototype, "inputTabIndex", void 0);
        __decorate([
            core.Input()
        ], DatePickerComponent.prototype, "disableInput", void 0);
        __decorate([
            core.Input()
        ], DatePickerComponent.prototype, "disableButton", void 0);
        __decorate([
            core.Input()
        ], DatePickerComponent.prototype, "disablePicker", void 0);
        __decorate([
            core.Input()
        ], DatePickerComponent.prototype, "doNotCloseOnDateSet", void 0);
        __decorate([
            core.Input()
        ], DatePickerComponent.prototype, "styles", void 0);
        __decorate([
            core.Output()
        ], DatePickerComponent.prototype, "selectedDateChange", void 0);
        __decorate([
            core.ViewChild('input')
        ], DatePickerComponent.prototype, "input", void 0);
        __decorate([
            core.HostListener('document:click', ['$event'])
        ], DatePickerComponent.prototype, "offClick", null);
        DatePickerComponent = DatePickerComponent_1 = __decorate([
            core.Component({
                selector: 'ngx-date-picker',
                template: "<div [ngSwitch]=\"isMobile\"\n     [class.invalid]=\"invalid\">\n\t<div *ngSwitchCase=\"true\">\n\t\t<input type=\"date\" #input [disabled]=\"disableInput || disablePicker\" [placeholder]=\"placeholder\" [value]=\"mobileFormattedDate\" (change)=\"setDate($event.target.value)\" [tabindex]=\"inputTabIndex\" [min]=\"min\" [max]=\"max\" />\n\t</div>\n\t<div *ngSwitchDefault>\n\t\t<div class=\"ngx-picker\">\n\t\t\t<input type=\"text\"\n                   #input\n                   [ngStyle]=\"styles.input\"\n                   [disabled]=\"disableInput || disablePicker\"\n                   [placeholder]=\"placeholder\"\n                   (focusin)=\"setPickerVisible(true)\"\n                   [value]=\"formattedDate\"\n                   (change)=\"setDate($event.target.value)\"\n                   [tabindex]=\"inputTabIndex\"\n\t\t\t/>\n\n\t\t\t<button type=\"button\"\n                    [ngStyle]=\"styles.button\"\n                    [disabled]=\"disableButton || disablePicker\"\n                    (focusin)=\"setPickerVisible(true)\">\n\t\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\"  width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n\t\t\t\t\t<path fill=\"#000000\" d=\"M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z\" />\n\t\t\t\t</svg>\n\t\t\t</button>\n\n\t\t\t<ngx-date *ngIf=\"pickerVisible\"\n                      [ngStyle]=\"styles.date\"\n                      [doNotCloseOnDateSet]=\"doNotCloseOnDateSet\"\n                      (closeDatePicker)=\"setPickerVisible($event)\"\n                      (selectedDateChange)=\"newDatePicked($event)\"\n                      [selectedDate]=\"selectedDate\"\n                      [min]=\"min\"\n                      [max]=\"max\">\n\t\t\t</ngx-date>\n\t\t</div>\n\t</div>\n</div>\n",
                encapsulation: core.ViewEncapsulation.None,
                providers: [
                    {
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: core.forwardRef(function () { return DatePickerComponent_1; }),
                        multi: true,
                    },
                ]
            })
        ], DatePickerComponent);
        return DatePickerComponent;
    }());

    var TimeComponent = /** @class */ (function () {
        function TimeComponent() {
            this.selectedHourChange = new core.EventEmitter();
            this.selectedMinuteChange = new core.EventEmitter();
            this.doNotCloseOnDateSet = false;
            this.use24HourClock = false;
            this.closeDatePicker = new core.EventEmitter();
            this.hours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
            this.minutes = ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
        }
        Object.defineProperty(TimeComponent.prototype, "formatSelectedMinute", {
            get: function () {
                return this.selectedMinute <= 9 ? '0' + this.selectedMinute : '' + this.selectedMinute;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeComponent.prototype, "formatSelectedHour", {
            get: function () {
                if (!this.use24HourClock) {
                    if (this.selectedHour === 12 || this.selectedHour === 0) {
                        return '12';
                    }
                    return (this.selectedHour > 12 ? this.selectedHour - 12 : this.selectedHour) + '';
                }
                else {
                    return (this.selectedHour < 10 ? '0' + this.selectedHour : this.selectedHour) + '';
                }
            },
            enumerable: true,
            configurable: true
        });
        TimeComponent.prototype.ngOnInit = function () {
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
        };
        TimeComponent.prototype.selectHourChange = function (selected) {
            var hour = parseInt(selected);
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
        };
        TimeComponent.prototype.selectMinuteChange = function (selected) {
            var minute = parseInt(selected);
            this.selectedMinuteChange.emit(minute);
            this.selectedMinute = minute;
            this.minutesOpen = false;
            this.hoursOpen = false;
        };
        TimeComponent.prototype.selectClockChange = function (clock) {
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
        };
        TimeComponent.prototype.closePicker = function () {
            this.closeDatePicker.emit(true);
        };
        TimeComponent.prototype.setTimeToNow = function () {
            var now = new Date();
            this.selectedHour = now.getHours();
            this.selectedHourChange.emit(this.selectedHour);
            this.selectedMinute = now.getMinutes();
            this.selectedMinuteChange.emit(this.selectedMinute);
            this.selectedClock = this.selectedHour >= 12 ? 'pm' : 'am';
            if (!this.doNotCloseOnDateSet) {
                this.closePicker();
            }
        };
        TimeComponent.prototype.toggleHourMenu = function () {
            this.minutesOpen = false;
            this.hoursOpen = !this.hoursOpen;
        };
        TimeComponent.prototype.toggleMinuteMenu = function () {
            this.hoursOpen = false;
            this.minutesOpen = !this.minutesOpen;
        };
        __decorate([
            core.Input()
        ], TimeComponent.prototype, "selectedHour", void 0);
        __decorate([
            core.Output()
        ], TimeComponent.prototype, "selectedHourChange", void 0);
        __decorate([
            core.Input()
        ], TimeComponent.prototype, "selectedMinute", void 0);
        __decorate([
            core.Output()
        ], TimeComponent.prototype, "selectedMinuteChange", void 0);
        __decorate([
            core.Input()
        ], TimeComponent.prototype, "doNotCloseOnDateSet", void 0);
        __decorate([
            core.Input()
        ], TimeComponent.prototype, "use24HourClock", void 0);
        __decorate([
            core.Output()
        ], TimeComponent.prototype, "closeDatePicker", void 0);
        TimeComponent = __decorate([
            core.Component({
                selector: 'ngx-time',
                template: "<div class=\"time-picker\">\n\t<button type=\"button\" class=\"ngx-picker--btn ngx-picker--btn__hour\"\n            (click)=\"toggleHourMenu()\"\n            [class.ngx-picker--btn__24h]=\"use24HourClock\">\n        {{ formatSelectedHour }}\n    </button>\n\n\t<button type=\"button\" class=\"ngx-picker--btn ngx-picker--btn__minute\"\n            (click)=\"toggleMinuteMenu()\"\n            [class.ngx-picker--btn__24h]=\"use24HourClock\">\n        {{ formatSelectedMinute }}\n    </button>\n\n\t<div *ngIf=\"!use24HourClock\"\n         class=\"time--periods\">\n\t\t<button type=\"button\"\n                class=\"ngx-picker--btn ngx-picker--btn__am\"\n                (click)=\"selectClockChange('am')\"\n                [class.ngx-picker--btn__selected]=\"selectedClock === 'am'\">\n            AM\n        </button>\n\n\t\t<button type=\"button\"\n                class=\"ngx-picker--btn ngx-picker--btn__pm\"\n                (click)=\"selectClockChange('pm')\"\n                [class.ngx-picker--btn__selected]=\"selectedClock === 'pm'\">\n            PM\n        </button>\n\t</div>\n\t<div class=\"time--selection__hours\"\n         [hidden]=\"!hoursOpen\">\n\t\t<div class=\"time--values\">\n\t\t\t<div *ngFor=\"let hour of hours\"\n                 class=\"time--value\"\n                 [class.time--value__selected]=\"selectedHour == hour\"\n                 (click)=\"selectHourChange(hour)\">\n                {{ hour }}\n            </div>\n\t\t</div>\n\t</div>\n\n\t<div class=\"time--selection__minutes\"\n         [hidden]=\"!minutesOpen\">\n\t\t<div class=\"time--values\">\n\t\t\t<div *ngFor=\"let minute of minutes\"\n                 class=\"time--value\"\n                 [class.time--value__selected]=\"selectedMinute == minute\"\n                 (click)=\"selectMinuteChange(minute)\">\n                {{ minute }}\n            </div>\n\t\t</div>\n\t</div>\n</div>\n\n<div class=\"calendar--footer\">\n    <button type=\"button\"\n            class=\"ngx-picker--btn ngx-picker--btn__now\"\n            (click)=\"setTimeToNow()\">\n        Now\n    </button>\n\n    <button type=\"button\"\n            class=\"ngx-picker--btn ngx-picker--btn__close\"\n            (click)=\"closePicker()\">\n        Close\n    </button>\n</div>\n",
                encapsulation: core.ViewEncapsulation.None
            })
        ], TimeComponent);
        return TimeComponent;
    }());

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
            this.selectedDateTimeChange = new core.EventEmitter();
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
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.Input()
        ], DateTimePickerComponent.prototype, "selectedDateTime", void 0);
        __decorate([
            core.Input()
        ], DateTimePickerComponent.prototype, "placeholder", void 0);
        __decorate([
            core.Input()
        ], DateTimePickerComponent.prototype, "disableInput", void 0);
        __decorate([
            core.Input()
        ], DateTimePickerComponent.prototype, "disableButton", void 0);
        __decorate([
            core.Input()
        ], DateTimePickerComponent.prototype, "disablePicker", void 0);
        __decorate([
            core.Input()
        ], DateTimePickerComponent.prototype, "doNotCloseOnDateSet", void 0);
        __decorate([
            core.Input()
        ], DateTimePickerComponent.prototype, "min", void 0);
        __decorate([
            core.Input()
        ], DateTimePickerComponent.prototype, "max", void 0);
        __decorate([
            core.Input()
        ], DateTimePickerComponent.prototype, "styles", void 0);
        __decorate([
            core.Input()
        ], DateTimePickerComponent.prototype, "use24HourClock", void 0);
        __decorate([
            core.Output()
        ], DateTimePickerComponent.prototype, "selectedDateTimeChange", void 0);
        __decorate([
            core.HostListener('document:click', ['$event'])
        ], DateTimePickerComponent.prototype, "offClick", null);
        DateTimePickerComponent = DateTimePickerComponent_1 = __decorate([
            core.Component({
                selector: 'ngx-datetime-picker',
                template: "<div [ngSwitch]=\"isMobile\" [class.invalid]=\"invalid\">\n\t<div *ngSwitchCase=\"true\">\n\t\t<input type=\"datetime-local\"\n               style=\"{{ styles }}\"\n               [disabled]=\"disableInput || disablePicker\" [placeholder]=\"placeholder\"\n               [value]=\"mobileFormattedDate\"\n               (change)=\"setDateTime($event.target.value)\"\n\t\t/>\n\t</div>\n\t<div *ngSwitchDefault>\n\t\t<div class=\"ngx-picker\">\n\t\t\t<input type=\"text\"\n                   [ngStyle]=\"styles.input\"\n                   [disabled]=\"disableInput || disablePicker\"\n                   [placeholder]=\"placeholder\"\n                   (focusin)=\"setPickerVisible(true)\"\n                   [value]=\"formattedDate\"\n                   (change)=\"setDateTime($event.target.value)\"\n\t\t\t/>\n\n\t\t\t<button type=\"button\"\n                    [ngStyle]=\"styles.button\"\n                    [disabled]=\"disableButton || disablePicker\"\n                    (focusin)=\"setPickerVisible(true)\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\"  width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n                    <path fill=\"#000000\" d=\"M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z\" />\n                </svg>\n            </button>\n\n\t\t\t<ngx-date [hidden]=\"!pickerVisible\"\n                      [ngStyle]=\"styles.date\"\n                      includeTime=\"true\"\n                      [doNotCloseOnDateSet]=\"doNotCloseOnDateSet\"\n                      (closeDatePicker)=\"setPickerVisible($event)\"\n                      (selectedDateChange)=\"newDatePicked($event)\"\n\t\t\t          [min]=\"min\"\n                      [max]=\"max\"\n                      [use24HourClock]=\"use24HourClock\"\n\t\t\t          [selectedDate]=\"selectedDateTime\"> </ngx-date>\n\t\t</div>\n\t</div>\n</div>\n",
                encapsulation: core.ViewEncapsulation.None,
                providers: [
                    {
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: core.forwardRef(function () { return DateTimePickerComponent_1; }),
                        multi: true,
                    },
                ]
            })
        ], DateTimePickerComponent);
        return DateTimePickerComponent;
    }());

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
            this.selectedTimeChange = new core.EventEmitter();
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
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.Input()
        ], TimePickerComponent.prototype, "selectedTime", void 0);
        __decorate([
            core.Input()
        ], TimePickerComponent.prototype, "placeholder", void 0);
        __decorate([
            core.Input()
        ], TimePickerComponent.prototype, "disableInput", void 0);
        __decorate([
            core.Input()
        ], TimePickerComponent.prototype, "disableButton", void 0);
        __decorate([
            core.Input()
        ], TimePickerComponent.prototype, "disablePicker", void 0);
        __decorate([
            core.Input()
        ], TimePickerComponent.prototype, "doNotCloseOnDateSet", void 0);
        __decorate([
            core.Input()
        ], TimePickerComponent.prototype, "styles", void 0);
        __decorate([
            core.Input()
        ], TimePickerComponent.prototype, "use24HourClock", void 0);
        __decorate([
            core.Output()
        ], TimePickerComponent.prototype, "selectedTimeChange", void 0);
        __decorate([
            core.HostListener('document:click', ['$event'])
        ], TimePickerComponent.prototype, "offClick", null);
        TimePickerComponent = TimePickerComponent_1 = __decorate([
            core.Component({
                selector: 'ngx-time-picker',
                template: "<div [ngSwitch]=\"isMobile\">\n\t<div *ngSwitchCase=\"true\">\n\t\t<input type=\"time\"\n               [disabled]=\"disableInput || disablePicker\"\n               [placeholder]=\"placeholder\"\n               [value]=\"mobileFormattedTime\"\n               (change)=\"setMobileFormattedTime($event.target.value)\"\n\t\t/>\n\t</div>\n\n\t<div *ngSwitchDefault>\n\t\t<div class=\"ngx-picker\">\n\t\t\t<input type=\"text\"\n                   [ngStyle]=\"styles.input\"\n                   [disabled]=\"disableInput || disablePicker\"\n                   [placeholder]=\"placeholder\"\n                   [value]=\"formattedTime\"\n                   (change)=\"setFormattedTime($event.target.value)\"\n                   (focusin)=\"setPickerVisible(true)\"/>\n\n\t\t\t<button type=\"button\"\n                    [ngStyle]=\"styles.button\"\n                    [disabled]=\"disableButton || disablePicker\"\n                    (focusin)=\"setPickerVisible(true)\">\n\t\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\"  width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n\t\t\t\t\t<path fill=\"#000000\" d=\"M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z\" />\n\t\t\t\t</svg>\n\t\t\t</button>\n\n\t\t\t<div class=\"calendar\"\n                 [hidden]=\"!pickerVisible\">\n\t\t\t\t<ngx-time [selectedHour]=\"selectedHour\"\n                          [selectedMinute]=\"selectedMinute\"\n                          [use24HourClock]=\"use24HourClock\"\n                          [doNotCloseOnDateSet]=\"doNotCloseOnDateSet\"\n                          (closeDatePicker)=\"setPickerVisible(!$event)\"\n                          (selectedHourChange)=\"setHourNow($event)\"\n                          (selectedMinuteChange)=\"setMinuteNow($event)\"></ngx-time>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n",
                encapsulation: core.ViewEncapsulation.None,
                providers: [
                    {
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: core.forwardRef(function () { return TimePickerComponent_1; }),
                        multi: true,
                    },
                ]
            })
        ], TimePickerComponent);
        return TimePickerComponent;
    }());

    var DateTimePickerModule = /** @class */ (function () {
        function DateTimePickerModule() {
        }
        DateTimePickerModule_1 = DateTimePickerModule;
        DateTimePickerModule.forRoot = function () {
            return {
                ngModule: DateTimePickerModule_1,
                providers: []
            };
        };
        var DateTimePickerModule_1;
        DateTimePickerModule = DateTimePickerModule_1 = __decorate([
            core.NgModule({
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
                    common.CommonModule
                ],
                providers: [
                    DateService,
                    IsMobileService,
                    Renderer
                ],
            })
        ], DateTimePickerModule);
        return DateTimePickerModule;
    }());

    exports.DatePickerComponent = DatePickerComponent;
    exports.DateService = DateService;
    exports.DateTimePickerComponent = DateTimePickerComponent;
    exports.DateTimePickerModule = DateTimePickerModule;
    exports.TimePickerComponent = TimePickerComponent;
    exports.ɵa = TimeComponent;
    exports.ɵb = DateComponent;
    exports.ɵc = IsMobileService;
    exports.ɵd = Renderer;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ngx-datetime-picker.umd.js.map

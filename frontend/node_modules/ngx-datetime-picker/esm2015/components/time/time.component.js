import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
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
tslib_1.__decorate([
    Input()
], TimeComponent.prototype, "selectedHour", void 0);
tslib_1.__decorate([
    Output()
], TimeComponent.prototype, "selectedHourChange", void 0);
tslib_1.__decorate([
    Input()
], TimeComponent.prototype, "selectedMinute", void 0);
tslib_1.__decorate([
    Output()
], TimeComponent.prototype, "selectedMinuteChange", void 0);
tslib_1.__decorate([
    Input()
], TimeComponent.prototype, "doNotCloseOnDateSet", void 0);
tslib_1.__decorate([
    Input()
], TimeComponent.prototype, "use24HourClock", void 0);
tslib_1.__decorate([
    Output()
], TimeComponent.prototype, "closeDatePicker", void 0);
TimeComponent = tslib_1.__decorate([
    Component({
        selector: 'ngx-time',
        template: "<div class=\"time-picker\">\n\t<button type=\"button\" class=\"ngx-picker--btn ngx-picker--btn__hour\"\n            (click)=\"toggleHourMenu()\"\n            [class.ngx-picker--btn__24h]=\"use24HourClock\">\n        {{ formatSelectedHour }}\n    </button>\n\n\t<button type=\"button\" class=\"ngx-picker--btn ngx-picker--btn__minute\"\n            (click)=\"toggleMinuteMenu()\"\n            [class.ngx-picker--btn__24h]=\"use24HourClock\">\n        {{ formatSelectedMinute }}\n    </button>\n\n\t<div *ngIf=\"!use24HourClock\"\n         class=\"time--periods\">\n\t\t<button type=\"button\"\n                class=\"ngx-picker--btn ngx-picker--btn__am\"\n                (click)=\"selectClockChange('am')\"\n                [class.ngx-picker--btn__selected]=\"selectedClock === 'am'\">\n            AM\n        </button>\n\n\t\t<button type=\"button\"\n                class=\"ngx-picker--btn ngx-picker--btn__pm\"\n                (click)=\"selectClockChange('pm')\"\n                [class.ngx-picker--btn__selected]=\"selectedClock === 'pm'\">\n            PM\n        </button>\n\t</div>\n\t<div class=\"time--selection__hours\"\n         [hidden]=\"!hoursOpen\">\n\t\t<div class=\"time--values\">\n\t\t\t<div *ngFor=\"let hour of hours\"\n                 class=\"time--value\"\n                 [class.time--value__selected]=\"selectedHour == hour\"\n                 (click)=\"selectHourChange(hour)\">\n                {{ hour }}\n            </div>\n\t\t</div>\n\t</div>\n\n\t<div class=\"time--selection__minutes\"\n         [hidden]=\"!minutesOpen\">\n\t\t<div class=\"time--values\">\n\t\t\t<div *ngFor=\"let minute of minutes\"\n                 class=\"time--value\"\n                 [class.time--value__selected]=\"selectedMinute == minute\"\n                 (click)=\"selectMinuteChange(minute)\">\n                {{ minute }}\n            </div>\n\t\t</div>\n\t</div>\n</div>\n\n<div class=\"calendar--footer\">\n    <button type=\"button\"\n            class=\"ngx-picker--btn ngx-picker--btn__now\"\n            (click)=\"setTimeToNow()\">\n        Now\n    </button>\n\n    <button type=\"button\"\n            class=\"ngx-picker--btn ngx-picker--btn__close\"\n            (click)=\"closePicker()\">\n        Close\n    </button>\n</div>\n",
        encapsulation: ViewEncapsulation.None
    })
], TimeComponent);
export { TimeComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGF0ZXRpbWUtcGlja2VyLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy90aW1lL3RpbWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBT2xHLElBQWEsYUFBYSxHQUExQjtJQUxBO1FBT1csdUJBQWtCLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUdoRCx5QkFBb0IsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBRW5ELHdCQUFtQixHQUFZLEtBQUssQ0FBQztRQUNyQyxtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUU1QixvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFJcEQsVUFBSyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4RSxZQUFPLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBMkd6RixDQUFDO0lBdEdBLElBQUksb0JBQW9CO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUN4RixDQUFDO0lBRUQsSUFBSSxrQkFBa0I7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YSxHQUFHLElBQUksQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUUzRCxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQzNCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUFFTSxjQUFjO1FBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3JDLENBQUM7SUFFTSxnQkFBZ0I7UUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDekMsQ0FBQztDQUNKLENBQUE7QUF6SFM7SUFBUixLQUFLLEVBQUU7bURBQXNCO0FBQ3BCO0lBQVQsTUFBTSxFQUFFO3lEQUFpRDtBQUVqRDtJQUFSLEtBQUssRUFBRTtxREFBd0I7QUFDdEI7SUFBVCxNQUFNLEVBQUU7MkRBQW1EO0FBRW5EO0lBQVIsS0FBSyxFQUFFOzBEQUFzQztBQUNyQztJQUFSLEtBQUssRUFBRTtxREFBaUM7QUFFNUI7SUFBVCxNQUFNLEVBQUU7c0RBQStDO0FBVi9DLGFBQWE7SUFMekIsU0FBUyxDQUFDO1FBQ1YsUUFBUSxFQUFFLFVBQVU7UUFDcEIsbXVFQUFvQztRQUNwQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtLQUNyQyxDQUFDO0dBQ1csYUFBYSxDQTBIekI7U0ExSFksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ25neC10aW1lJyxcblx0dGVtcGxhdGVVcmw6ICcuL3RpbWUuY29tcG9uZW50Lmh0bWwnLFxuXHRlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBUaW1lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblx0QElucHV0KCkgc2VsZWN0ZWRIb3VyOiBudW1iZXI7XG5cdEBPdXRwdXQoKSBzZWxlY3RlZEhvdXJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuXHRASW5wdXQoKSBzZWxlY3RlZE1pbnV0ZTogbnVtYmVyO1xuXHRAT3V0cHV0KCkgc2VsZWN0ZWRNaW51dGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuXHRASW5wdXQoKSBkb05vdENsb3NlT25EYXRlU2V0OiBib29sZWFuID0gZmFsc2U7XG5cdEBJbnB1dCgpIHVzZTI0SG91ckNsb2NrOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBAT3V0cHV0KCkgY2xvc2VEYXRlUGlja2VyID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG5cdHB1YmxpYyBzZWxlY3RlZENsb2NrOiBzdHJpbmc7XG5cblx0cHVibGljIGhvdXJzID0gWycxJywgJzInLCAnMycsICc0JywgJzUnLCAnNicsICc3JywgJzgnLCAnOScsICcxMCcsICcxMScsICcxMiddO1xuXHRwdWJsaWMgbWludXRlcyA9IFsnMCcsICc1JywgJzEwJywgJzE1JywgJzIwJywgJzI1JywgJzMwJywgJzM1JywgJzQwJywgJzQ1JywgJzUwJywgJzU1J107XG5cblx0cHVibGljIG1pbnV0ZXNPcGVuOiBib29sZWFuO1xuXHRwdWJsaWMgaG91cnNPcGVuOiBib29sZWFuO1xuXG5cdGdldCBmb3JtYXRTZWxlY3RlZE1pbnV0ZSgpOnN0cmluZyB7XG5cdFx0cmV0dXJuIHRoaXMuc2VsZWN0ZWRNaW51dGUgPD0gOSA/ICcwJyArIHRoaXMuc2VsZWN0ZWRNaW51dGUgOiAnJyArIHRoaXMuc2VsZWN0ZWRNaW51dGU7XG5cdH1cblxuXHRnZXQgZm9ybWF0U2VsZWN0ZWRIb3VyKCk6c3RyaW5nIHtcblx0XHRpZiAoIXRoaXMudXNlMjRIb3VyQ2xvY2spIHtcblx0XHRcdGlmICh0aGlzLnNlbGVjdGVkSG91ciA9PT0gMTIgfHwgdGhpcy5zZWxlY3RlZEhvdXIgPT09IDApIHtcblx0XHRcdFx0cmV0dXJuICcxMic7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAodGhpcy5zZWxlY3RlZEhvdXIgPiAxMiA/IHRoaXMuc2VsZWN0ZWRIb3VyIC0gMTIgOiB0aGlzLnNlbGVjdGVkSG91cikgKyAnJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuICh0aGlzLnNlbGVjdGVkSG91ciA8IDEwID8gJzAnICsgdGhpcy5zZWxlY3RlZEhvdXIgOiB0aGlzLnNlbGVjdGVkSG91cikgKyAnJztcblx0XHR9XG5cdH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHRpZiAoIXRoaXMuc2VsZWN0ZWRIb3VyKSB7XG5cdFx0XHR0aGlzLnNlbGVjdGVkSG91ciA9IDEyO1xuXHRcdH1cblx0XHRpZiAoIXRoaXMuc2VsZWN0ZWRNaW51dGUpIHtcblx0XHRcdHRoaXMuc2VsZWN0ZWRNaW51dGUgPSAwO1xuXHRcdH1cblx0XHRpZiAodGhpcy5zZWxlY3RlZEhvdXIgPj0gMTIpIHtcblx0XHRcdHRoaXMuc2VsZWN0ZWRDbG9jayA9ICdwbSc7XG5cdFx0fVxuXHRcdGlmICh0aGlzLnVzZTI0SG91ckNsb2NrKSB7XG5cdFx0XHR0aGlzLmhvdXJzID0gWycwMCcsICcwMScsICcwMicsICcwMycsICcwNCcsICcwNScsICcwNicsICcwNycsICcwOCcsICcwOScsICcxMCcsICcxMScsICcxMicsICcxMycsICcxNCcsICcxNScsICcxNicsICcxNycsICcxOCcsICcxOScsICcyMCcsICcyMScsICcyMicsICcyMyddO1xuXHRcdFx0dGhpcy5taW51dGVzID0gWycwMCcsICcwNScsICcxMCcsICcxNScsICcyMCcsICcyNScsICczMCcsICczNScsICc0MCcsICc0NScsICc1MCcsICc1NSddO1xuXHRcdFx0dGhpcy5zZWxlY3RlZENsb2NrID0gJyc7XG5cdFx0fVxuXHR9XG5cblx0c2VsZWN0SG91ckNoYW5nZShzZWxlY3RlZDpzdHJpbmcpOnZvaWQge1xuICAgICAgICBsZXQgaG91ciA9IHBhcnNlSW50KHNlbGVjdGVkKTtcbiAgICAgICAgaWYgKCF0aGlzLnVzZTI0SG91ckNsb2NrKSB7XG4gICAgICAgICAgICBob3VyID0gdGhpcy5zZWxlY3RlZENsb2NrID09PSAncG0nID8gaG91ciArIDEyIDogaG91cjtcbiAgICAgICAgfVxuXG5cdFx0dGhpcy5zZWxlY3RlZEhvdXJDaGFuZ2UuZW1pdChob3VyKTtcblx0XHR0aGlzLnNlbGVjdGVkSG91ciA9IGhvdXI7XG5cblx0XHRpZiAodGhpcy5zZWxlY3RlZE1pbnV0ZSA9PSBudWxsKSB7XG5cdFx0XHR0aGlzLnNlbGVjdE1pbnV0ZUNoYW5nZSgnMCcpO1xuXHRcdH1cblxuXHRcdHRoaXMubWludXRlc09wZW4gPSBmYWxzZTtcblx0XHR0aGlzLmhvdXJzT3BlbiA9IGZhbHNlO1xuXHR9XG5cblx0c2VsZWN0TWludXRlQ2hhbmdlKHNlbGVjdGVkOnN0cmluZyk6dm9pZCB7XG5cdCAgICBjb25zdCBtaW51dGUgPSBwYXJzZUludChzZWxlY3RlZCk7XG5cblx0XHR0aGlzLnNlbGVjdGVkTWludXRlQ2hhbmdlLmVtaXQobWludXRlKTtcblx0XHR0aGlzLnNlbGVjdGVkTWludXRlID0gbWludXRlO1xuXG5cdFx0dGhpcy5taW51dGVzT3BlbiA9IGZhbHNlO1xuXHRcdHRoaXMuaG91cnNPcGVuID0gZmFsc2U7XG5cdH1cblxuXHRzZWxlY3RDbG9ja0NoYW5nZShjbG9jazpzdHJpbmcpOnZvaWQge1xuXHRcdGlmICh0aGlzLnNlbGVjdGVkQ2xvY2sgIT09IGNsb2NrKSB7XG5cdFx0XHR0aGlzLnNlbGVjdGVkQ2xvY2sgPSBjbG9jaztcblxuXHRcdFx0aWYgKHRoaXMuc2VsZWN0ZWRDbG9jayA9PT0gJ3BtJyAmJiB0aGlzLnNlbGVjdGVkSG91ciA8PSAxMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRIb3VyID0gdGhpcy5zZWxlY3RlZEhvdXIgKyAxMjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWxlY3RlZENsb2NrID09PSAnYW0nICYmIHRoaXMuc2VsZWN0ZWRIb3VyID49IDEyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEhvdXIgPSB0aGlzLnNlbGVjdGVkSG91ciAtIDEyO1xuICAgICAgICAgICAgfVxuXG5cdFx0XHR0aGlzLnNlbGVjdGVkSG91ckNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWRIb3VyKTtcblx0XHR9XG5cdH1cblxuICAgIGNsb3NlUGlja2VyKCk6dm9pZCB7XG4gICAgICAgIHRoaXMuY2xvc2VEYXRlUGlja2VyLmVtaXQodHJ1ZSk7XG4gICAgfVxuXG4gICAgc2V0VGltZVRvTm93KCk6dm9pZCB7XG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZEhvdXIgPSBub3cuZ2V0SG91cnMoKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEhvdXJDaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkSG91cik7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRNaW51dGUgPSBub3cuZ2V0TWludXRlcygpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkTWludXRlQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZE1pbnV0ZSk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZENsb2NrID0gdGhpcy5zZWxlY3RlZEhvdXIgPj0gMTIgPyAncG0nIDogJ2FtJztcblxuICAgICAgICBpZiAoIXRoaXMuZG9Ob3RDbG9zZU9uRGF0ZVNldCkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZVBpY2tlcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHRvZ2dsZUhvdXJNZW51KCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1pbnV0ZXNPcGVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaG91cnNPcGVuID0gIXRoaXMuaG91cnNPcGVuO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b2dnbGVNaW51dGVNZW51KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmhvdXJzT3BlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1pbnV0ZXNPcGVuID0gIXRoaXMubWludXRlc09wZW47XG4gICAgfVxufVxuIl19
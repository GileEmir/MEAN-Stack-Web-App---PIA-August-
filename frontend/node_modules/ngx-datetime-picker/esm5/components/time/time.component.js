import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
var TimeComponent = /** @class */ (function () {
    function TimeComponent() {
        this.selectedHourChange = new EventEmitter();
        this.selectedMinuteChange = new EventEmitter();
        this.doNotCloseOnDateSet = false;
        this.use24HourClock = false;
        this.closeDatePicker = new EventEmitter();
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
    return TimeComponent;
}());
export { TimeComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGF0ZXRpbWUtcGlja2VyLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy90aW1lL3RpbWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBT2xHO0lBTEE7UUFPVyx1QkFBa0IsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBR2hELHlCQUFvQixHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFbkQsd0JBQW1CLEdBQVksS0FBSyxDQUFDO1FBQ3JDLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBRTVCLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUlwRCxVQUFLLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hFLFlBQU8sR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUEyR3pGLENBQUM7SUF0R0Esc0JBQUksK0NBQW9CO2FBQXhCO1lBQ0MsT0FBTyxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQ3hGLENBQUM7OztPQUFBO0lBRUQsc0JBQUksNkNBQWtCO2FB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SUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUVwRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUUzRCxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQzNCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUFFTSxzQ0FBYyxHQUFyQjtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3JDLENBQUM7SUFFTSx3Q0FBZ0IsR0FBdkI7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUN6QyxDQUFDO0lBeEhLO1FBQVIsS0FBSyxFQUFFO3VEQUFzQjtJQUNwQjtRQUFULE1BQU0sRUFBRTs2REFBaUQ7SUFFakQ7UUFBUixLQUFLLEVBQUU7eURBQXdCO0lBQ3RCO1FBQVQsTUFBTSxFQUFFOytEQUFtRDtJQUVuRDtRQUFSLEtBQUssRUFBRTs4REFBc0M7SUFDckM7UUFBUixLQUFLLEVBQUU7eURBQWlDO0lBRTVCO1FBQVQsTUFBTSxFQUFFOzBEQUErQztJQVYvQyxhQUFhO1FBTHpCLFNBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLG11RUFBb0M7WUFDcEMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7U0FDckMsQ0FBQztPQUNXLGFBQWEsQ0EwSHpCO0lBQUQsb0JBQUM7Q0FBQSxBQTFIRCxJQTBIQztTQTFIWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnbmd4LXRpbWUnLFxuXHR0ZW1wbGF0ZVVybDogJy4vdGltZS5jb21wb25lbnQuaHRtbCcsXG5cdGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXHRASW5wdXQoKSBzZWxlY3RlZEhvdXI6IG51bWJlcjtcblx0QE91dHB1dCgpIHNlbGVjdGVkSG91ckNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG5cdEBJbnB1dCgpIHNlbGVjdGVkTWludXRlOiBudW1iZXI7XG5cdEBPdXRwdXQoKSBzZWxlY3RlZE1pbnV0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG5cdEBJbnB1dCgpIGRvTm90Q2xvc2VPbkRhdGVTZXQ6IGJvb2xlYW4gPSBmYWxzZTtcblx0QElucHV0KCkgdXNlMjRIb3VyQ2xvY2s6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBPdXRwdXQoKSBjbG9zZURhdGVQaWNrZXIgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cblx0cHVibGljIHNlbGVjdGVkQ2xvY2s6IHN0cmluZztcblxuXHRwdWJsaWMgaG91cnMgPSBbJzEnLCAnMicsICczJywgJzQnLCAnNScsICc2JywgJzcnLCAnOCcsICc5JywgJzEwJywgJzExJywgJzEyJ107XG5cdHB1YmxpYyBtaW51dGVzID0gWycwJywgJzUnLCAnMTAnLCAnMTUnLCAnMjAnLCAnMjUnLCAnMzAnLCAnMzUnLCAnNDAnLCAnNDUnLCAnNTAnLCAnNTUnXTtcblxuXHRwdWJsaWMgbWludXRlc09wZW46IGJvb2xlYW47XG5cdHB1YmxpYyBob3Vyc09wZW46IGJvb2xlYW47XG5cblx0Z2V0IGZvcm1hdFNlbGVjdGVkTWludXRlKCk6c3RyaW5nIHtcblx0XHRyZXR1cm4gdGhpcy5zZWxlY3RlZE1pbnV0ZSA8PSA5ID8gJzAnICsgdGhpcy5zZWxlY3RlZE1pbnV0ZSA6ICcnICsgdGhpcy5zZWxlY3RlZE1pbnV0ZTtcblx0fVxuXG5cdGdldCBmb3JtYXRTZWxlY3RlZEhvdXIoKTpzdHJpbmcge1xuXHRcdGlmICghdGhpcy51c2UyNEhvdXJDbG9jaykge1xuXHRcdFx0aWYgKHRoaXMuc2VsZWN0ZWRIb3VyID09PSAxMiB8fCB0aGlzLnNlbGVjdGVkSG91ciA9PT0gMCkge1xuXHRcdFx0XHRyZXR1cm4gJzEyJztcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuICh0aGlzLnNlbGVjdGVkSG91ciA+IDEyID8gdGhpcy5zZWxlY3RlZEhvdXIgLSAxMiA6IHRoaXMuc2VsZWN0ZWRIb3VyKSArICcnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gKHRoaXMuc2VsZWN0ZWRIb3VyIDwgMTAgPyAnMCcgKyB0aGlzLnNlbGVjdGVkSG91ciA6IHRoaXMuc2VsZWN0ZWRIb3VyKSArICcnO1xuXHRcdH1cblx0fVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdGlmICghdGhpcy5zZWxlY3RlZEhvdXIpIHtcblx0XHRcdHRoaXMuc2VsZWN0ZWRIb3VyID0gMTI7XG5cdFx0fVxuXHRcdGlmICghdGhpcy5zZWxlY3RlZE1pbnV0ZSkge1xuXHRcdFx0dGhpcy5zZWxlY3RlZE1pbnV0ZSA9IDA7XG5cdFx0fVxuXHRcdGlmICh0aGlzLnNlbGVjdGVkSG91ciA+PSAxMikge1xuXHRcdFx0dGhpcy5zZWxlY3RlZENsb2NrID0gJ3BtJztcblx0XHR9XG5cdFx0aWYgKHRoaXMudXNlMjRIb3VyQ2xvY2spIHtcblx0XHRcdHRoaXMuaG91cnMgPSBbJzAwJywgJzAxJywgJzAyJywgJzAzJywgJzA0JywgJzA1JywgJzA2JywgJzA3JywgJzA4JywgJzA5JywgJzEwJywgJzExJywgJzEyJywgJzEzJywgJzE0JywgJzE1JywgJzE2JywgJzE3JywgJzE4JywgJzE5JywgJzIwJywgJzIxJywgJzIyJywgJzIzJ107XG5cdFx0XHR0aGlzLm1pbnV0ZXMgPSBbJzAwJywgJzA1JywgJzEwJywgJzE1JywgJzIwJywgJzI1JywgJzMwJywgJzM1JywgJzQwJywgJzQ1JywgJzUwJywgJzU1J107XG5cdFx0XHR0aGlzLnNlbGVjdGVkQ2xvY2sgPSAnJztcblx0XHR9XG5cdH1cblxuXHRzZWxlY3RIb3VyQ2hhbmdlKHNlbGVjdGVkOnN0cmluZyk6dm9pZCB7XG4gICAgICAgIGxldCBob3VyID0gcGFyc2VJbnQoc2VsZWN0ZWQpO1xuICAgICAgICBpZiAoIXRoaXMudXNlMjRIb3VyQ2xvY2spIHtcbiAgICAgICAgICAgIGhvdXIgPSB0aGlzLnNlbGVjdGVkQ2xvY2sgPT09ICdwbScgPyBob3VyICsgMTIgOiBob3VyO1xuICAgICAgICB9XG5cblx0XHR0aGlzLnNlbGVjdGVkSG91ckNoYW5nZS5lbWl0KGhvdXIpO1xuXHRcdHRoaXMuc2VsZWN0ZWRIb3VyID0gaG91cjtcblxuXHRcdGlmICh0aGlzLnNlbGVjdGVkTWludXRlID09IG51bGwpIHtcblx0XHRcdHRoaXMuc2VsZWN0TWludXRlQ2hhbmdlKCcwJyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5taW51dGVzT3BlbiA9IGZhbHNlO1xuXHRcdHRoaXMuaG91cnNPcGVuID0gZmFsc2U7XG5cdH1cblxuXHRzZWxlY3RNaW51dGVDaGFuZ2Uoc2VsZWN0ZWQ6c3RyaW5nKTp2b2lkIHtcblx0ICAgIGNvbnN0IG1pbnV0ZSA9IHBhcnNlSW50KHNlbGVjdGVkKTtcblxuXHRcdHRoaXMuc2VsZWN0ZWRNaW51dGVDaGFuZ2UuZW1pdChtaW51dGUpO1xuXHRcdHRoaXMuc2VsZWN0ZWRNaW51dGUgPSBtaW51dGU7XG5cblx0XHR0aGlzLm1pbnV0ZXNPcGVuID0gZmFsc2U7XG5cdFx0dGhpcy5ob3Vyc09wZW4gPSBmYWxzZTtcblx0fVxuXG5cdHNlbGVjdENsb2NrQ2hhbmdlKGNsb2NrOnN0cmluZyk6dm9pZCB7XG5cdFx0aWYgKHRoaXMuc2VsZWN0ZWRDbG9jayAhPT0gY2xvY2spIHtcblx0XHRcdHRoaXMuc2VsZWN0ZWRDbG9jayA9IGNsb2NrO1xuXG5cdFx0XHRpZiAodGhpcy5zZWxlY3RlZENsb2NrID09PSAncG0nICYmIHRoaXMuc2VsZWN0ZWRIb3VyIDw9IDExKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEhvdXIgPSB0aGlzLnNlbGVjdGVkSG91ciArIDEyO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNlbGVjdGVkQ2xvY2sgPT09ICdhbScgJiYgdGhpcy5zZWxlY3RlZEhvdXIgPj0gMTIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSG91ciA9IHRoaXMuc2VsZWN0ZWRIb3VyIC0gMTI7XG4gICAgICAgICAgICB9XG5cblx0XHRcdHRoaXMuc2VsZWN0ZWRIb3VyQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZEhvdXIpO1xuXHRcdH1cblx0fVxuXG4gICAgY2xvc2VQaWNrZXIoKTp2b2lkIHtcbiAgICAgICAgdGhpcy5jbG9zZURhdGVQaWNrZXIuZW1pdCh0cnVlKTtcbiAgICB9XG5cbiAgICBzZXRUaW1lVG9Ob3coKTp2b2lkIHtcbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcblxuICAgICAgICB0aGlzLnNlbGVjdGVkSG91ciA9IG5vdy5nZXRIb3VycygpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkSG91ckNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWRIb3VyKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZE1pbnV0ZSA9IG5vdy5nZXRNaW51dGVzKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRNaW51dGVDaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkTWludXRlKTtcblxuICAgICAgICB0aGlzLnNlbGVjdGVkQ2xvY2sgPSB0aGlzLnNlbGVjdGVkSG91ciA+PSAxMiA/ICdwbScgOiAnYW0nO1xuXG4gICAgICAgIGlmICghdGhpcy5kb05vdENsb3NlT25EYXRlU2V0KSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlUGlja2VyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgdG9nZ2xlSG91ck1lbnUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWludXRlc09wZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ob3Vyc09wZW4gPSAhdGhpcy5ob3Vyc09wZW47XG4gICAgfVxuXG4gICAgcHVibGljIHRvZ2dsZU1pbnV0ZU1lbnUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaG91cnNPcGVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMubWludXRlc09wZW4gPSAhdGhpcy5taW51dGVzT3BlbjtcbiAgICB9XG59XG4iXX0=
import { OnInit, EventEmitter } from '@angular/core';
export declare class TimeComponent implements OnInit {
    selectedHour: number;
    selectedHourChange: EventEmitter<number>;
    selectedMinute: number;
    selectedMinuteChange: EventEmitter<number>;
    doNotCloseOnDateSet: boolean;
    use24HourClock: boolean;
    closeDatePicker: EventEmitter<boolean>;
    selectedClock: string;
    hours: string[];
    minutes: string[];
    minutesOpen: boolean;
    hoursOpen: boolean;
    readonly formatSelectedMinute: string;
    readonly formatSelectedHour: string;
    ngOnInit(): void;
    selectHourChange(selected: string): void;
    selectMinuteChange(selected: string): void;
    selectClockChange(clock: string): void;
    closePicker(): void;
    setTimeToNow(): void;
    toggleHourMenu(): void;
    toggleMinuteMenu(): void;
}

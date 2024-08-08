import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateComponent } from './components/date/date.component';
import { DatePickerComponent } from './components/datePicker/datePicker.component';
import { TimeComponent } from './components/time/time.component';
import { DateTimePickerComponent } from './components/dateTimePicker/dateTimePicker.component';
import { TimePickerComponent } from './components/timePicker/timePicker.component';
export * from './components/datePicker/datePicker.component';
export * from './components/dateTimePicker/dateTimePicker.component';
export * from './components/timePicker/timePicker.component';
export * from './services/date.service';
import { DateService } from './services/date.service';
import { IsMobileService } from './services/isMobile.service';
import { Renderer } from './services/renderer.service';
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
    DateTimePickerModule = DateTimePickerModule_1 = tslib_1.__decorate([
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
    return DateTimePickerModule;
}());
export { DateTimePickerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGF0ZXRpbWUtcGlja2VyLyIsInNvdXJjZXMiOlsiaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDakUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDbkYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQy9GLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBRW5GLGNBQWMsOENBQThDLENBQUM7QUFDN0QsY0FBYyxzREFBc0QsQ0FBQztBQUNyRSxjQUFjLDhDQUE4QyxDQUFDO0FBRTdELGNBQWMseUJBQXlCLENBQUM7QUFFeEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUF3QnZEO0lBQUE7SUFPQSxDQUFDOzZCQVBZLG9CQUFvQjtJQUN0Qiw0QkFBTyxHQUFkO1FBQ0ksT0FBTztZQUNILFFBQVEsRUFBRSxzQkFBb0I7WUFDOUIsU0FBUyxFQUFFLEVBQUU7U0FDaEIsQ0FBQztJQUNOLENBQUM7O0lBTlEsb0JBQW9CO1FBdEJoQyxRQUFRLENBQUM7WUFDTixZQUFZLEVBQUU7Z0JBQ1YsYUFBYTtnQkFDYixhQUFhO2dCQUNiLG1CQUFtQjtnQkFDbkIsdUJBQXVCO2dCQUN2QixtQkFBbUI7YUFDdEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsbUJBQW1CO2dCQUNuQix1QkFBdUI7Z0JBQ3ZCLG1CQUFtQjthQUN0QjtZQUNELE9BQU8sRUFBRTtnQkFDTCxZQUFZO2FBQ2Y7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsV0FBVztnQkFDWCxlQUFlO2dCQUNmLFFBQVE7YUFDWDtTQUNKLENBQUM7T0FDVyxvQkFBb0IsQ0FPaEM7SUFBRCwyQkFBQztDQUFBLEFBUEQsSUFPQztTQVBZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBEYXRlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2RhdGUvZGF0ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGF0ZVBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9kYXRlUGlja2VyL2RhdGVQaWNrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRpbWVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdGltZS90aW1lLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRlVGltZVBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9kYXRlVGltZVBpY2tlci9kYXRlVGltZVBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGltZVBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90aW1lUGlja2VyL3RpbWVQaWNrZXIuY29tcG9uZW50JztcblxuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2RhdGVQaWNrZXIvZGF0ZVBpY2tlci5jb21wb25lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9jb21wb25lbnRzL2RhdGVUaW1lUGlja2VyL2RhdGVUaW1lUGlja2VyLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvdGltZVBpY2tlci90aW1lUGlja2VyLmNvbXBvbmVudCc7XG5cbmV4cG9ydCAqIGZyb20gJy4vc2VydmljZXMvZGF0ZS5zZXJ2aWNlJztcblxuaW1wb3J0IHsgRGF0ZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2RhdGUuc2VydmljZSc7XG5pbXBvcnQgeyBJc01vYmlsZVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2lzTW9iaWxlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVuZGVyZXIgfSBmcm9tICcuL3NlcnZpY2VzL3JlbmRlcmVyLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBUaW1lQ29tcG9uZW50LFxuICAgICAgICBEYXRlQ29tcG9uZW50LFxuICAgICAgICBEYXRlUGlja2VyQ29tcG9uZW50LFxuICAgICAgICBEYXRlVGltZVBpY2tlckNvbXBvbmVudCxcbiAgICAgICAgVGltZVBpY2tlckNvbXBvbmVudFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBEYXRlUGlja2VyQ29tcG9uZW50LFxuICAgICAgICBEYXRlVGltZVBpY2tlckNvbXBvbmVudCxcbiAgICAgICAgVGltZVBpY2tlckNvbXBvbmVudFxuICAgIF0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGVcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBEYXRlU2VydmljZSxcbiAgICAgICAgSXNNb2JpbGVTZXJ2aWNlLFxuICAgICAgICBSZW5kZXJlclxuICAgIF0sXG59KVxuZXhwb3J0IGNsYXNzIERhdGVUaW1lUGlja2VyTW9kdWxlIHtcbiAgICBzdGF0aWMgZm9yUm9vdCgpOk1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IERhdGVUaW1lUGlja2VyTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXVxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdfQ==
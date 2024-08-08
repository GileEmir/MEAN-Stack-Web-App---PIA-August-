import * as tslib_1 from "tslib";
var DateTimePickerModule_1;
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
let DateTimePickerModule = DateTimePickerModule_1 = class DateTimePickerModule {
    static forRoot() {
        return {
            ngModule: DateTimePickerModule_1,
            providers: []
        };
    }
};
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
export { DateTimePickerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGF0ZXRpbWUtcGlja2VyLyIsInNvdXJjZXMiOlsiaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUMvRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUVuRixjQUFjLDhDQUE4QyxDQUFDO0FBQzdELGNBQWMsc0RBQXNELENBQUM7QUFDckUsY0FBYyw4Q0FBOEMsQ0FBQztBQUU3RCxjQUFjLHlCQUF5QixDQUFDO0FBRXhDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBd0J2RCxJQUFhLG9CQUFvQiw0QkFBakM7SUFDSSxNQUFNLENBQUMsT0FBTztRQUNWLE9BQU87WUFDSCxRQUFRLEVBQUUsc0JBQW9CO1lBQzlCLFNBQVMsRUFBRSxFQUFFO1NBQ2hCLENBQUM7SUFDTixDQUFDO0NBQ0osQ0FBQTtBQVBZLG9CQUFvQjtJQXRCaEMsUUFBUSxDQUFDO1FBQ04sWUFBWSxFQUFFO1lBQ1YsYUFBYTtZQUNiLGFBQWE7WUFDYixtQkFBbUI7WUFDbkIsdUJBQXVCO1lBQ3ZCLG1CQUFtQjtTQUN0QjtRQUNELE9BQU8sRUFBRTtZQUNMLG1CQUFtQjtZQUNuQix1QkFBdUI7WUFDdkIsbUJBQW1CO1NBQ3RCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsWUFBWTtTQUNmO1FBQ0QsU0FBUyxFQUFFO1lBQ1AsV0FBVztZQUNYLGVBQWU7WUFDZixRQUFRO1NBQ1g7S0FDSixDQUFDO0dBQ1csb0JBQW9CLENBT2hDO1NBUFksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IERhdGVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZGF0ZS9kYXRlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEYXRlUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2RhdGVQaWNrZXIvZGF0ZVBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGltZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90aW1lL3RpbWUuY29tcG9uZW50JztcbmltcG9ydCB7IERhdGVUaW1lUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2RhdGVUaW1lUGlja2VyL2RhdGVUaW1lUGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUaW1lUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RpbWVQaWNrZXIvdGltZVBpY2tlci5jb21wb25lbnQnO1xuXG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvZGF0ZVBpY2tlci9kYXRlUGlja2VyLmNvbXBvbmVudCc7XG5leHBvcnQgKiBmcm9tICcuL2NvbXBvbmVudHMvZGF0ZVRpbWVQaWNrZXIvZGF0ZVRpbWVQaWNrZXIuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vY29tcG9uZW50cy90aW1lUGlja2VyL3RpbWVQaWNrZXIuY29tcG9uZW50JztcblxuZXhwb3J0ICogZnJvbSAnLi9zZXJ2aWNlcy9kYXRlLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBEYXRlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IElzTW9iaWxlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvaXNNb2JpbGUuc2VydmljZSc7XG5pbXBvcnQgeyBSZW5kZXJlciB9IGZyb20gJy4vc2VydmljZXMvcmVuZGVyZXIuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFRpbWVDb21wb25lbnQsXG4gICAgICAgIERhdGVDb21wb25lbnQsXG4gICAgICAgIERhdGVQaWNrZXJDb21wb25lbnQsXG4gICAgICAgIERhdGVUaW1lUGlja2VyQ29tcG9uZW50LFxuICAgICAgICBUaW1lUGlja2VyQ29tcG9uZW50XG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIERhdGVQaWNrZXJDb21wb25lbnQsXG4gICAgICAgIERhdGVUaW1lUGlja2VyQ29tcG9uZW50LFxuICAgICAgICBUaW1lUGlja2VyQ29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIERhdGVTZXJ2aWNlLFxuICAgICAgICBJc01vYmlsZVNlcnZpY2UsXG4gICAgICAgIFJlbmRlcmVyXG4gICAgXSxcbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVRpbWVQaWNrZXJNb2R1bGUge1xuICAgIHN0YXRpYyBmb3JSb290KCk6TW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogRGF0ZVRpbWVQaWNrZXJNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtdXG4gICAgICAgIH07XG4gICAgfVxufVxuIl19
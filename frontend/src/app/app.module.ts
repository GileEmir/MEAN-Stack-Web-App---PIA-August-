import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { AdminComponent } from './admin/admin.component';
import { IconModule } from './services/icons/icon.module';
import { OwnerComponent } from './owner/owner.component';
import { DecorComponent } from './decor/decor.component';
import { RegisterComponent } from './register/register.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { LayoutComponent } from './layout/layout.component';
import { MainPageComponent } from './mainpage/mainpage.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { OwnerInfoComponent } from './owner/owner-info/owner-info.component';
import { OwnerCompaniesComponent } from './owner/owner-companies/owner-companies.component';
import { OwnerAppointmentsComponent } from './owner/owner-appointments/owner-appointments.component';
import { OwnerMaintenanceComponent } from './owner/owner-maintenance/owner-maintenance.component';
import { DecorInfoComponent } from './decor/decor-info/decor-info.component';
import { DecorAppointmentsComponent } from './decor/decor-appointments/decor-appointments.component';
import { DecorMaintenanceComponent } from './decor/decor-maintenance/decor-maintenance.component';
import { DecorStatisticsComponent } from './decor/decor-statistics/decor-statistics.component';
import { CompanyDetailComponent } from './companydetail/companydetail.component';
import { ScheduleFormComponent } from './schedule-form/schedule-form.component';
import { GardenCanvasComponent } from './garden-canvas/garden-canvas.component';
import { GardenSchedulingComponent } from './garden-scheduling/garden-scheduling.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    OwnerComponent,
    DecorComponent,
    RegisterComponent,
    AdminLoginComponent,
    LayoutComponent,
    MainPageComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    NotAuthorizedComponent,
    PasswordChangeComponent,
    OwnerInfoComponent,
    OwnerCompaniesComponent,
    OwnerAppointmentsComponent,
    OwnerMaintenanceComponent,
    DecorInfoComponent,
    DecorAppointmentsComponent,
    DecorMaintenanceComponent,
    DecorStatisticsComponent,
    CompanyDetailComponent,
    ScheduleFormComponent,
    GardenCanvasComponent,
    GardenSchedulingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    IconModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule
  
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
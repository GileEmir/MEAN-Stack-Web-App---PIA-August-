import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { OwnerComponent } from './owner/owner.component';
import { DecorComponent } from './decor/decor.component';
import { RegisterComponent } from './register/register.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { LayoutComponent } from './layout/layout.component';
import { MainPageComponent } from './mainpage/mainpage.component';
import { authGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
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
import { AdminOwnersComponent } from './admin/admin-owners/admin-owners.component';
import { AdminDecorsComponent } from './admin/admin-decors/admin-decors.component';
import { AdminCompaniesComponent } from './admin/admin-companies/admin-companies.component';
import { UserDetailComponent } from './userdetail/userdetail.component';
import { AdminAddDecoratorComponent } from './admin/admin-add-decorator/admin-add-decorator.component';
import { AdminAddCompanyComponent } from './admin/admin-add-company/admin-add-company.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: 'change_password', component: PasswordChangeComponent },
  { path: "admin_login", component: AdminLoginComponent,pathMatch: "full"  },
  { path: "login", component: LoginComponent ,pathMatch: "full" },
  { path: "register", component: RegisterComponent },
  {
    path: "dashboard",
    component: LayoutComponent,
    children: [
      { path: "main_page", component: MainPageComponent }
    ]
  },
  {
    path: "dashboard",
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { 
        path: "owner/info", 
        component: OwnerInfoComponent, 
        canActivate: [RoleGuard], 
        data: { expectedRole: 'owner' }
      },
      { 
        path: "owner/companies", 
        component: OwnerCompaniesComponent, 
        canActivate: [RoleGuard], 
        data: { expectedRole: 'owner' }
      },
      { 
        path: "owner/companies/:id", 
        component: CompanyDetailComponent, 
        canActivate: [RoleGuard], 
        data: { expectedRole: 'owner' }
      },
      { 
        path: "owner/appointments", 
        component: OwnerAppointmentsComponent, 
        canActivate: [RoleGuard], 
        data: { expectedRole: 'owner' }
      },
      { 
        path: "owner/maintenance", 
        component: OwnerMaintenanceComponent, 
        canActivate: [RoleGuard], 
        data: { expectedRole: 'owner' }
      },
      { 
        path: "decor/info", 
        component: DecorInfoComponent, 
        canActivate: [RoleGuard], 
        data: { expectedRole: 'decor' } 
      },  { 
        path: "decor/appointments", 
        component: DecorAppointmentsComponent, 
        canActivate: [RoleGuard], 
        data: { expectedRole: 'decor' } 
      },
      { 
        path: "decor/maintenance", 
        component: DecorMaintenanceComponent, 
        canActivate: [RoleGuard], 
        data: { expectedRole: 'decor' } 
      },
      { 
        path: "decor/statistics", 
        component: DecorStatisticsComponent, 
        canActivate: [RoleGuard], 
        data: { expectedRole: 'decor' } 
      },
      {
      path: "admin/registration-requests", 
      component: AdminComponent, 
      canActivate: [RoleGuard], 
      data: { expectedRole: 'admin' }
      },
      {
        path: "admin/owners", 
        component: AdminOwnersComponent, 
        canActivate: [RoleGuard], 
        data: { expectedRole: 'admin' }
      },
      {
        path: "admin/decors", 
        component: AdminDecorsComponent, 
        canActivate: [RoleGuard], 
        data: { expectedRole: 'admin' }
      },
      {
        path: "admin/companies", 
        component: AdminCompaniesComponent, 
        canActivate: [RoleGuard], 
        data: { expectedRole: 'admin' }
      },
      {
        path: "admin/users/:username", 
        component: UserDetailComponent, 
        canActivate: [RoleGuard], 
        data: { expectedRole: 'admin' }
      },
      {
        path: "admin/add-decorator", 
        component: AdminAddDecoratorComponent, 
        canActivate: [RoleGuard], 
        data: { expectedRole: 'admin' }
      },
      {
        path: "admin/add-company", 
        component: AdminAddCompanyComponent, 
        canActivate: [RoleGuard], 
        data: { expectedRole: 'admin' }
      }  
    ]
  },
  { path: 'not_authorized', component: NotAuthorizedComponent },
  { path: "**", redirectTo: "login", pathMatch: "full" }, // Wildcard route to catch undefined paths
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
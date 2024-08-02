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
        path: "admin", 
        component: AdminComponent, 
        canActivate: [RoleGuard], 
        data: { expectedRole: 'admin' } 
      },
      { 
        path: "decor", 
        component: DecorComponent, 
        canActivate: [RoleGuard], 
        data: { expectedRole: 'decor' } 
      },
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
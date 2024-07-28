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

const routes: Routes = [
  { path: "admin_login", component: AdminLoginComponent,pathMatch: "full"  },
  { path: "login", component: LoginComponent ,pathMatch: "full" },
  { path: "register", component: RegisterComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "dashboard",
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: "main_page", component: MainPageComponent },
      { path: "owner", component: OwnerComponent,canActivate: [authGuard] },
      { path: "admin", component: AdminComponent,canActivate: [authGuard] },
      { path: "decor", component: DecorComponent,canActivate: [authGuard] },
  ]
  },
  { path: "**", redirectTo: "login", pathMatch: "full" }, // Wildcard route to catch undefined paths
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
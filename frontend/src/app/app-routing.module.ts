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

const routes: Routes = [
  { path: "admin_login", component: AdminLoginComponent,pathMatch: "full"  },
  { path: "login", component: LoginComponent ,pathMatch: "full" },
  { path: "owner", component: OwnerComponent },
  { path: "admin", component: AdminComponent },
  { path: "decor", component: DecorComponent },
  { path: "register", component: RegisterComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "**", redirectTo: "login", pathMatch: "full" }, // Wildcard route to catch undefined paths
  {
    path: 'dashboard',
    component: LayoutComponent,
    children: [
      { path: 'main-page', component: MainPageComponent },
      // Add other routes here that need the layout
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
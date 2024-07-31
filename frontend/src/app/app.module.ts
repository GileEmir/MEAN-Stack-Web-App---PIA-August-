import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
    PasswordChangeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    IconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

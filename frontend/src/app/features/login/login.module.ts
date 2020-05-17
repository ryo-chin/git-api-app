import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule, InputTextModule } from 'primeng';
import { UiLibsModule } from '../../ui-libs/ui-libs.module';


@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    UiLibsModule,
  ]
})
export class LoginModule { }

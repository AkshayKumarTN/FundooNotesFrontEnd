import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { from } from 'rxjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatButtonModule} from '@angular/material/button';
import {  MatCardModule} from '@angular/material/card';
import {  MatToolbarModule} from '@angular/material/toolbar';
import {  MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input'
import { MatCheckboxModule} from '@angular/material/checkbox';
import { LoginComponent } from './components/login/login.component'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

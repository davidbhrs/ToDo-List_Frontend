import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatTableModule} from '@angular/material/table';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodolistComponent } from './todolist/todolist.component';

import { DatastorageService } from './datastorage.service';
import { HttpClientModule } from '@angular/common/http';
import { TasksComponent } from './tasks/tasks.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent,
    TasksComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatSliderModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    TextFieldModule,
    MatTableModule
  ],
  providers: [DatastorageService, MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

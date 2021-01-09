import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServerService } from './services/server.service';


import {MatChipsModule,
        MatFormFieldModule,
        MatIconModule,
        MatExpansionModule} from '@angular/material';

import {NgxPrintModule} from 'ngx-print';
import { LoginComponent } from './user-pages/login/login.component';
import { UserPagesModule } from './user-pages/user-pages.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ContentAnimateDirective } from './shared/directives/content-animate.directive';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TodoListComponent } from './apps/todo-list/todo-list.component';
import { TodoComponent } from './apps/todo-list/todo/todo.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    SpinnerComponent,
    ContentAnimateDirective,
    NavbarComponent,
    LoginComponent,
    TodoComponent,
    TodoListComponent,
  ],
  imports: [
    BrowserModule,
    UserPagesModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    HttpClientModule,
    MatExpansionModule,
    NgxPrintModule
  ],

  providers: [
    ServerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

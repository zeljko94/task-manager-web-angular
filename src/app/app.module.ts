import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { PasswordModule } from "primeng/password";
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { ChartModule } from 'primeng/chart';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { PaginatorModule } from 'primeng/paginator';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { UsersPageComponent } from './pages/admin/users/users-page/users-page.component';
import { MessageService } from 'primeng/api';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { KanbanPageComponent } from './pages/kanban-page/kanban-page.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PickListModule } from 'primeng/picklist';
import { CardModule } from 'primeng/card';
import { BoardDetailsPageComponent } from './pages/board-details-page/board-details-page.component';
import { TaskDetailsPageComponent } from './pages/task-details-page/task-details-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    UsersPageComponent,
    ProjectsPageComponent,
    KanbanPageComponent,
    BoardDetailsPageComponent,
    TaskDetailsPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppLayoutModule,
    PasswordModule,
    CheckboxModule,
    TableModule,
    DialogModule,
    FileUploadModule,
    ToolbarModule,
    ToastModule,
    InputTextModule,
    DropdownModule,
    MenuModule,
    ChartModule,
    DataViewModule,
    RatingModule,
    PaginatorModule,
    InputTextareaModule,
    PickListModule,
    CardModule
  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

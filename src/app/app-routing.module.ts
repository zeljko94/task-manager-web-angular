import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { LoginComponent } from './pages/login/login.component';
import { UsersPageComponent } from './pages/admin/users/users-page/users-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { KanbanPageComponent } from './pages/kanban-page/kanban-page.component';
import { BoardDetailsPageComponent } from './pages/board-details-page/board-details-page.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent 
  },
  { 
    path: '', component: AppLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'users', component: UsersPageComponent },
      { path: 'projects', component: ProjectsPageComponent },
      { path: 'my-projects', component: ProjectsPageComponent },
      { path: 'kanban', component: KanbanPageComponent },
      { path: 'my-kanban', component: KanbanPageComponent },
      { path: 'board-details/:boardId', component: BoardDetailsPageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Board } from 'src/app/models/board';
import { Project } from 'src/app/models/project';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-kanban-page',
  templateUrl: './kanban-page.component.html',
  styleUrls: ['./kanban-page.component.scss']
})
export class KanbanPageComponent {
  loggedUser: any;
  selectedProject: any;
  myProjects: Project[] = [];
  boards: Board[] = [];
  

  sortField: string = '';
  sortOrder: number = 0;
  sortOptions: SelectItem[] = [];

  constructor(private projectsService: ProjectsService, private authService: AuthService, private router: Router) {
    
  }

  ngOnInit() {
    this.authService.getLoggedInUser().then(loggedUser => {
      this.projectsService.getProjectsWhereUserIsMember(loggedUser.id).then(projects => {
        this.loggedUser = loggedUser;
        this.myProjects = projects;

        this.boards = this.myProjects[0].boards.slice();
      });
    });
  }

  openBoardDetails(boardId: any) {
    this.router.navigate(['/board-details', boardId]);
  }

  onProjectChange(e: any) {
    if(e.value) {
      this.boards = e.value.boards.slice();
    }
  }

  onFilter(dv: any, event: Event) {
    dv.filter((event.target as HTMLInputElement).value);
  }

  onSortChange(event: any) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    } else {
        this.sortOrder = 1;
        this.sortField = value;
    }
  }

}

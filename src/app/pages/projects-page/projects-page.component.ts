import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { ProjectsService } from 'src/app/services/projects.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent {
  projectDialog: boolean = false;

  deleteProjectDialog: boolean = false;

  deleteProjectsDialog: boolean = false;

  projects: Project[] = [];

  project: Project = new Project();

  selectedProjects: Project[] = [];
  users: User[] = [];
  sourceUsers: User[] = [];
  targetUsers: User[] = [];

  submitted: boolean = false;
  
  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private projectService: ProjectsService, private usersService: UsersService, private messageService: MessageService) { }

  // createTestProjects() {
  //   var projects = [];

  //   var admin1 = new Project();
  //   admin1.id = this.createId();
  //   admin1.name = "Admin1";
  //   admin1.lastName = "Admin1";
  //   admin1.email = "admin1@test.com";
  //   admin1.projectname = "admin1";
  //   admin1.password = "Test1234.";
  //   admin1.role = "admin";
    
  //   var admin2 = new Project();
  //   admin2.id = this.createId();
  //   admin2.name = "Admin2";
  //   admin2.lastName = "Admin2";
  //   admin2.email = "admin2@test.com";
  //   admin2.projectname = "admin2";
  //   admin2.password = "Test1234.";
  //   admin2.role = "admin";


  //   projects.push(admin1);
  //   projects.push(admin2);

  //   for(var i=1; i<6; i++) {
  //     var project = new Project();
  //     project.id = this.createId();
  //     project.name = "Project" + i;
  //     project.lastName = "Project" + i;
  //     project.email = "project" + i + "@test.com";
  //     project.projectname = "project" + i;
  //     project.password = "Test1234.";
  //     project.role = "project";
  //     projects.push(project);
  //   }

  //   console.log(projects);
  // }


  ngOnInit() {
      this.projectService.getProjectsWithMembers().then((data:Project[]) => this.projects = data);
      this.usersService.getUsers().then((data:User[]) => {this.users = data; this.sourceUsers = this.users.slice()});


    //   this.projectService.getProjectsWhereUserIsMember("FVxmi").then((data:Project[]) => { console.log(data); });p
    

  }

  openNew() {
      this.project = new Project();
      this.submitted = false;
      this.projectDialog = true;
      this.sourceUsers = this.users.slice();
      this.targetUsers = [];
  }

  deleteSelectedProjects() {
      this.deleteProjectsDialog = true;
  }

  editProject(project: Project) {
      this.project = { ...project };
      this.projectDialog = true;
      
      this.targetUsers = this.project.members.slice();
      this.sourceUsers = this.users.slice().filter(item1 => !this.targetUsers.some(item2 => item1.id === item2.id));
  }

  deleteProject(project: Project) {
      this.deleteProjectDialog = true;
      this.project = { ...project };
  }

  confirmDeleteSelected() {
      this.deleteProjectsDialog = false;
      this.projects = this.projects.filter(val => !this.selectedProjects.includes(val));
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Projects Deleted', life: 3000 });
      this.selectedProjects = [];
  }

  confirmDelete() {
      this.deleteProjectDialog = false;
      this.projects = this.projects.filter(val => val.id !== this.project.id);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Project Deleted', life: 3000 });
      this.project = new Project();
  }

  hideDialog() {
    this.sourceUsers = this.users;
    this.targetUsers = [];
    this.projectDialog = false;
    this.submitted = false;
  }

  saveProject() {
      this.submitted = true;

      if (this.project.name?.trim()) {
          if (this.project.id) {
            this.project.members = this.targetUsers.slice();
              this.projects[this.findIndexById(this.project.id)] = this.project;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Project Updated', life: 3000 });
          } else {
              this.project.id = this.createId();
              this.project.members = this.targetUsers.slice();
              this.projects.unshift(this.project);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Project Created', life: 3000 });
          }

          this.projects = [...this.projects];
          this.projectDialog = false;
          this.project = new Project();
      }
  }


  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.projects.length; i++) {
          if (this.projects[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  createId(): string {
      let id = '';
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 5; i++) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }

  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}

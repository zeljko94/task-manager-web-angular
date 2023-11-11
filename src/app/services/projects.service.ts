import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) { }

  getProjects() {
    return this.http.get<any>('assets/demo/data/projects.json')
        .toPromise()
        .then(res => res.data as Project[])
        .then(data => data);
  }

  getProjectsWithMembers() {
    return this.http.get<any>('assets/demo/data/projects-with-members.json')
        .toPromise()
        .then(res => res.data as Project[])
        .then(data => data);
  }


  getProjectsWhereUserIsMember(userId: string) {
    return this.http.get<any>('assets/demo/data/projects-with-members.json')
        .toPromise()
        .then(res => res.data as Project[])
        .then(projects => projects.filter(x => x.members.find(m => m.id == userId)));
  }
}

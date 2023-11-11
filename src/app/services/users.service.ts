import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }


  getUsers() {
      return this.http.get<any>('assets/demo/data/users.json')
          .toPromise()
          .then(res => res.data as User[])
          .then(data => data);
  }

  checkEmailExists(email: string): Promise<boolean> {
    return this.getUsers()
      .then(users => {
        const userWithEmail = users.find(user => user.email === email);
        return !!userWithEmail; 
      });
  }
}

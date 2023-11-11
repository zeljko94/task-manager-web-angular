import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userKey = "USER";

  constructor(private usersService: UsersService) { }


  getLoggedInUser() {
    return this.usersService.getUsers().then(users => {
      return users[2];  
    });


    // var user = JSON.parse(localStorage.getItem(this.userKey) || "") as User;
    // return 
  }

  login(user: User) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem(this.userKey);
  }
}

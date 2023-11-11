import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userKey = "USER";

  constructor(private usersService: UsersService, private router: Router) { }


  getLoggedInUser() {
    return this.usersService.getUsers().then(users => {
      return users[2];  
    });


    // var user = JSON.parse(localStorage.getItem(this.userKey) || "") as User;
    // return 
  }

  checkLogin(email: string, password: string) {
    return this.usersService.getByEmailAndPassword(email, password)
      .then(user => {return user; });
  }

  login(user: User) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.router.navigate(['']);
  }

  logout() {
    localStorage.removeItem(this.userKey);
    this.router.navigate(['/login']);
  }
}

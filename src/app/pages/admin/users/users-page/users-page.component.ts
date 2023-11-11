import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent {
  userDialog: boolean = false;

  deleteUserDialog: boolean = false;

  deleteUsersDialog: boolean = false;

  users: User[] = [];

  user: User = new User();

  selectedUsers: User[] = [];

  submitted: boolean = false;
  
  invalidEmail: boolean = false;
  passwordsMatch: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private userService: UsersService, private messageService: MessageService) { }

  createTestUsers() {
    var users = [];

    var admin1 = new User();
    admin1.id = this.createId();
    admin1.name = "Admin1";
    admin1.lastName = "Admin1";
    admin1.email = "admin1@test.com";
    admin1.username = "admin1";
    admin1.password = "Test1234.";
    admin1.role = "admin";
    
    var admin2 = new User();
    admin2.id = this.createId();
    admin2.name = "Admin2";
    admin2.lastName = "Admin2";
    admin2.email = "admin2@test.com";
    admin2.username = "admin2";
    admin2.password = "Test1234.";
    admin2.role = "admin";


    users.push(admin1);
    users.push(admin2);

    for(var i=1; i<6; i++) {
      var user = new User();
      user.id = this.createId();
      user.name = "User" + i;
      user.lastName = "User" + i;
      user.email = "user" + i + "@test.com";
      user.username = "user" + i;
      user.password = "Test1234.";
      user.role = "user";
      users.push(user);
    }

    console.log(users);
  }


  ngOnInit() {
      this.userService.getUsers().then((data:User[]) => this.users = data);


  }

  openNew() {
      this.user = new User();
      this.submitted = false;
      this.userDialog = true;
  }

  deleteSelectedUsers() {
      this.deleteUsersDialog = true;
  }

  editUser(user: User) {
      this.user = { ...user };
      this.userDialog = true;
  }

  deleteUser(user: User) {
      this.deleteUserDialog = true;
      this.user = { ...user };
  }

  confirmDeleteSelected() {
      this.deleteUsersDialog = false;
      this.users = this.users.filter(val => !this.selectedUsers.includes(val));
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
      this.selectedUsers = [];
  }

  confirmDelete() {
      this.deleteUserDialog = false;
      this.users = this.users.filter(val => val.id !== this.user.id);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
      this.user = new User();
  }

  hideDialog() {
      this.userDialog = false;
      this.submitted = false;
  }

  saveUser() {
      this.submitted = true;

      if(this.checkEmailAlreadyInUse()) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email already in use', life: 3000 });
        return;
      }

      if(this.checkUsernameAlreadyInUse()) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Username already in use', life: 3000 });
        return;
      }

      if (this.user.name?.trim() && this.user.lastName?.trim() && this.user.username.trim() && this.user.password.trim() && this.user.email.trim() && !this.invalidEmail && this.passwordsMatch) {
          if (this.user.id) {
              this.users[this.findIndexById(this.user.id)] = this.user;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
          } else {
              this.user.id = this.createId();
              this.users.unshift(this.user);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
          }

          this.users = [...this.users];
          this.userDialog = false;
          this.user = new User();
      }
  }

  checkEmailAlreadyInUse() {
    const userWithEmail = this.users.find(user => user.email === this.user.email);
    return !!userWithEmail; 
  }

  checkUsernameAlreadyInUse() {
    const userWithUsername = this.users.find(user => user.username === this.user.username);
    return !!userWithUsername; 
  }


  checkEmailValidity() {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    this.invalidEmail = !emailPattern.test(this.user.email);
  }

  checkPasswordsMatch() {
    this.passwordsMatch = this.user.password === this.user.rePassword;
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].id === id) {
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

import { Component } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
      :host ::ng-deep .pi-eye,
      :host ::ng-deep .pi-eye-slash {
          transform:scale(1.6);
          margin-right: 1rem;
          color: var(--primary-color) !important;
      }
  `]
})
export class LoginComponent {
  valCheck: string[] = ['remember'];

  email!: string;
  password!: string;
  msgs: Message[] = [];

  constructor(private authService: AuthService, public layoutService: LayoutService, private messageService: MessageService) { }

  ngOnInit() {
  }


  login() {
    this.authService.checkLogin(this.email, this.password)
      .then(user => {
        if(user) {
          this.authService.login(user);
        }
        else {
          this.messageService.add({ key: 'login', severity: 'error', summary: 'Error', detail: 'Login error', life: 1000 });
        }
      })
  }
}

import { AuthService } from '../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: false,
  
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  onLogin():void {
    this.authService.login('oscaranton@gmail.com', '12345')
    .subscribe(user => {
      this.router.navigate(['/'])
    })
  }
}

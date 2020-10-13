import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.required)
  })

  user: User = {
    email: '',
    password: ''
  }

  constructor(private userSevice: UserService, private router: Router) { }

  ngOnInit(): void { }

  login(): void {
    if (this.validateUser(this.user)) {
      this.loginToServer(this.user)
    } else {
      this.userSevice.showMessege('Digite seu Email e senha')
    }
  }

  validateUser(user: User): boolean {
    if (!this.loginForm.get('email').invalid && !this.loginForm.get('password').invalid) {
      return true;
    }
    return false
  }

  loginToServer(user: User): void {
    this.userSevice.login(user).subscribe(
      res => {
        this.userSevice.setToken(res.token)
        this.router.navigate(['/home'])
      },
      err => {
        if (err.status === 404)
          this.userSevice.showMessege('Email não encontrado')

        if (err.status === 403)
          this.userSevice.showMessege('Senha errada')
      })

  }

}

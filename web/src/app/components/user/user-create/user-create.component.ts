import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})

export class UserCreateComponent implements OnInit {

  userForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
  })

  user: User = {
    name: '',
    email: '',
    password: ''
  }


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void { }

  createUser(): void {
    if (this.validateUser()) {
      this.userService.create(this.user).subscribe(
        () => {
          this.userService.showMessege('Operação executada com sucesso!')
          this.router.navigate(['/users'])
        },
        err =>{
          if (err.status === 409) {
            this.userService.showMessege('Usuário já existe')
          }
        })
    }
  }

  validateUser(): boolean {
    if (this.userForm.get('name').invalid || this.userForm.get('email').invalid || this.userForm.get('password').invalid) {
      return false;
    }
    return true;
  }

  cancel(): void {
    this.userService.showMessege('Operação cancelada!')
    this.router.navigate(['/users'])
  }
}

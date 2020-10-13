import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  userForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
  })

  user: User = {
    name: '',
    email: '',
    createdAt: null
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('user_id').split(':')[1]
    this.userService.readById(id).subscribe(user => {
      this.user = user
    })
  }

  updateUser(): void {
    if (this.validateUser()) {
      this.userService.update(this.user).subscribe(
        () => {
          this.userService.showMessege('Operação executada com sucesso!')
          this.router.navigate(['/users'])
        },
        err =>{
          this.userService.showMessege('Erro tente mais tarde')
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

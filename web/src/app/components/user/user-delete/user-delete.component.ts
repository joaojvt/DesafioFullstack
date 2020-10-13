import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {

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

  deleteUser(): void {
    const id = this.user._id.toString()
    this.userService.delete(id).subscribe(
      () => {
        this.userService.showMessege('Usuario Apagado!')
      },
      err =>{
        this.userService.showMessege('Erro tente mais tarde')
      })
  }

  cancel(): void {
    this.userService.showMessege('Operação cancelada!')
    this.router.navigate(['/users'])
  }


}

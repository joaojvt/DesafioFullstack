import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/components/user/user.model';
import { UserService } from 'src/app/components/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User = {
    name: '',
    email: '',
    createdAt: null
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserByToken().subscribe(
      user => {
        this.user = user
      },
      err => {
        console.log(err.error);
      })
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-read',
  templateUrl: './user-read.component.html',
  styleUrls: ['./user-read.component.css']
})
export class UserReadComponent implements OnInit {

  users: User[]
  displayedColumns = ['name', 'email', 'createdAt', 'action'];
  dataSource: User[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(): void {
    this.userService.read().subscribe(users => {
      this.users = users
    })
  }
}



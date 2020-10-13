import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {

  users: User[]
  displayedColumns = ['name', 'email', 'createdAt', 'action'];
  dataSource: User[];

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(): void {
    const name = this.route.snapshot.paramMap.get('filter').split(':')[1]
    this.userService.searchByName(name).subscribe(users => {
      this.users = users
    })
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../users.service';
import { Users } from '../users';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.sass']
})
export class UsersListComponent implements OnInit {

  @Input() users: Users;

  constructor(private UsersService: UsersService) { }

  ngOnInit(): void {
  }

}

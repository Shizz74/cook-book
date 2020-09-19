import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {

  constructor(private usersService:UsersService) { }

  ngOnInit(): void {
  }

}

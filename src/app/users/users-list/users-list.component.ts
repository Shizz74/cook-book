import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { map } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.sass']
})
export class UsersListComponent implements OnInit {

  displayedColumns: string[] = ['mail', 'name', 'role'];

  users: any;
  dataSource: { email: string; items: number; name: string; role: string; }[];


  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.getUsersList();
  }


  getUsersList() {
    this.usersService.getUsersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(users => {
      this.users = users;
      this.dataSource = users;
      console.log(this.dataSource);
    });
  }

}

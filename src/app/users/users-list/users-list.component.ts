import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UsersService } from '../users.service';
import { map } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import  {MatSort } from '@angular/material/sort';
import { MatLine } from '@angular/material/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.sass']
})
export class UsersListComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = ['email', 'name', 'role'];

  users: any;
  dataSource;
  
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

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
      this.dataSource = new MatTableDataSource<Element>(this.users);
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
        if(!data[sortHeaderId]) {
          return this.sort.direction === "asc" ? '3' : '1';
        }
        return '2' + data[sortHeaderId].toLocaleLowerCase();
      }
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    
  }
}

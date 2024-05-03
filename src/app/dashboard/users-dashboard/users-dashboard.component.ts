import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IUser } from '../../../modles/user.modle';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserRequestsService } from '../../services/users/user-requests.service';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { range } from '../../utils/range';
import { EditUserComponent } from './edit-user/edit-user.component';
import {
  Observable,
  catchError,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  startWith,
  switchMap,
  throwError,
} from 'rxjs';
import { createHttpObservable } from '../../utils/createHttpObservable';

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrl: './users-dashboard.component.css',
})
export class UsersDashboardComponent implements OnInit, AfterViewInit {
  user$: any;
  @ViewChild('searchinput', { static: true }) input: ElementRef;

  allUsers: any;
  user: IUser;

  numberOfPages: number;
  pages: any = [];
  page: number;
  loading: boolean = false;

  constructor(
    private usersRequest: UserRequestsService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loading = true;

    this.usersRequest.getAllUsersRequest().subscribe((data: any) => {
      this.loading = false;
      this.allUsers = data;
      console.log(this.allUsers);
    });
  }

  ngAfterViewInit() {
    this.user$ = fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map((event) => {
          return event.target.value;
        }),
        startWith(''),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((search) => this.loadUsers(search))
      )
      .subscribe();
  }

  loadUsers(search: string): Observable<any> {

    if (search) {
      return createHttpObservable(
        `http://localhost:3010/api/v1/users/search/user/${search}`
      ).pipe(
        map((res) => {
          console.log(res);

          this.allUsers = res;
          console.log(this.allUsers);
          return res['payload'];
        })
      );
    } else {
      this.usersRequest.getAllUsersRequest().subscribe((data: any) => {
        console.log(data);
        this.allUsers = data;
      });
      console.log(this.allUsers);
      return this.allUsers;
    }
  }

  currentPage(pageNumber: number) {
    this.usersRequest.getAllUsersRequest().subscribe((data: any) => {
      console.log(data);
      this.allUsers = data;
      console.log(this.allUsers);
      this.page = pageNumber;
    });
  }

  nextPage(pageNumber: number) {
    console.log(pageNumber);
    this.page = pageNumber + 1;
    this.currentPage(this.page);
  }

  prevPage(pageNumber: number) {
    console.log(pageNumber);
    this.page = pageNumber - 1;
    this.currentPage(this.page);
  }

  deleteUser(user: IUser) {
    // const index = this.allUsers.findIndex((item) => item._id === user._id);
    // this.allUsers.splice(index, 1);
    user.isDeleted = true;
    console.log(user.isDeleted);
    // this.usersRequest.deletUserRequest(user).subscribe((data) => {
    //   console.log(data);
    // });
  }

  openAddUserPopup() {
    console.log('entered');
    this.dialog.open(AddNewUserComponent);
  }

  openEditUserPopup(user: IUser) {
    this.dialog.open(EditUserComponent, { data: { userId: user._id } });
  }
}

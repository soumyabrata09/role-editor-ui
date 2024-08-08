import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { User, UserDto } from '../lib/generated/models';
import { UserService } from './user.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandler } from '../shared/helpers/error-handler';

@Component({
  selector: 'user',
  standalone: true,
  imports: [
    ReactiveFormsModule, SharedModule, CommonModule
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {

  userList: UserDto[] = [];
  isLoading: boolean = false;
  spinnerColor: string = 'text-success';

  constructor(private userService: UserService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.isLoading = true;
    this.userService.getAllUserService.getUsers().subscribe({
      next: (response: Array<UserDto>) => {
        setTimeout(() => {
          this.userList = response;
          this.isLoading = false
        }, 1000);
      },
      error: (err: Error) => {
        this.isLoading = false;
        const detailedMsg: string = 'Unable to load role list';
        ErrorHandler.handleError(err, detailedMsg, this.toastr);
      }
    });
  }

  openModal(UserDetails?: User) {
    throw new Error('Method not implemented.');
  }

  openDeletionModal(_t13: UserDto) {
    throw new Error('Method not implemented.');
  }

}

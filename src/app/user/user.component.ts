import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RoleDto, User, UserDto } from '../lib/generated/models';
import { UserService } from './user.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandler } from '../shared/helpers/error-handler';
import { RoleService } from '../role/role.service';
import { CreateRole$Json$Params } from '../lib/generated/fn/create-role/create-role-json';
import { CreateUser$Params } from '../lib/generated/fn/create-user/create-user';

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

  @ViewChild('closeUserModal') closeUserModal!: ElementRef;
  userList: UserDto[] = [];
  roleList: RoleDto[] = [];
  isLoading: boolean = false;
  isRolesDataLoading: boolean = false;
  spinnerColor: string = 'text-success';
  userFormGroup!: FormGroup;
  user!: User;
  isCreateButtonDisabled: boolean = false;
  shouldCreateNewUser: boolean = false;

  constructor(readonly userService: UserService,
    readonly roleService: RoleService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.createForm();
  }

  createForm(): void {
    this.userFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      roleName: ['', Validators.required]
    });
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

  getAllAvailableRoles(): void {
    this.isRolesDataLoading = true;
    this.roleService.getAllRoleService.getRoles().subscribe({
      next: (response: Array<RoleDto>) => {
        setTimeout(() => {
          this.roleList = response;
          this.isRolesDataLoading = false;
        }, 1000);
      },
      error: (err: Error) => {
        this.isRolesDataLoading = false;
        const detailedMsg: string = 'Unable to load role list';
        ErrorHandler.handleError(err, detailedMsg, this.toastr);
      }
    });
  }

  createUser(): void {
    if (this.userFormGroup.controls['firstName'].value || this.userFormGroup.controls['lastName'].value
        && this.userFormGroup.controls['roleName'].value) {
          let userRequest: User = {
            firstName: this.userFormGroup.controls['firstName'].value,
            lastName: this.userFormGroup.controls['lastName'].value,
            Role: this.roleList.find(data => data.id === this.userFormGroup.controls['roleName'].value)
          };
          const userDetailsInputRequest: CreateUser$Params = {
            body: userRequest
          };
          this.userService.createUserService.createUser(userDetailsInputRequest).subscribe({
            next: (response: UserDto) => {
              if (response.id) {
                this.userList.push(response);
                this.toastr.success(`New User: ${response.firstName} has been created successfully with assigning ${response.Role?.roleName}`);
              }
              this.closeModalDialog();
            },
            error: (err: Error) => {
              const detailedMsg: string = `Unable to create User:\n ${this.userFormGroup.controls['firstName'].value}
               with role: ${this.userFormGroup.controls['roleName'].value}`;
              ErrorHandler.handleError(err, detailedMsg, this.toastr);
              this.closeModalDialog();
            }
          });
        }
  }

  openModal(UserDetails?: User): void {
    this.getAllAvailableRoles();
    if (UserDetails?.id) {
      this.user = UserDetails;
      this.userFormGroup.controls['roleName'].setValue(this.user.Role?.roleName);
      this.shouldCreateNewUser = false;
    } else {
      this.shouldCreateNewUser = true;
      this.userFormGroup.reset();
      this.isCreateButtonDisabled = true;
    }
  }

  isFormValid(): boolean {
    return this.userFormGroup.controls['firstName'].value && this.userFormGroup.controls['lastName'].value
      && this.userFormGroup.controls['roleName'].value;
  }

  openDeletionModal(_t13: UserDto) {
    throw new Error('Method not implemented.');
  }

  closeModalDialog(): void {
    this.closeUserModal.nativeElement.click();
  }

}

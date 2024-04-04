import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Role, RoleDto } from '../lib/generated/models';
import { RoleService } from './role.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from "../shared/shared.module";
import { UpdateRole$Json$Params } from '../lib/generated/fn/update-role/update-role-json';
import { ToastrService } from 'ngx-toastr';
import { CreateRole$Json$Params } from '../lib/generated/fn/create-role/create-role-json';
import { ErrorHandler } from '../shared/helpers/error-handler';
import { DeleteRole$Params } from '../lib/generated/fn/delete-role/delete-role';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'role',
  standalone: true,
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss',
  imports: [
    ReactiveFormsModule, SharedModule, CommonModule
  ]
})
export class RoleComponent implements OnInit {

  @ViewChild('closeModal') closeModal!: ElementRef;
  roleList: RoleDto[] = [];
  role!: Role;
  unmaskedId: string | null = null;
  spinnerColor: string = "text-success";
  shouldCreateNewRole: boolean = false;
  roleformGroup!: FormGroup;
  isLoading: boolean = false;
  isCreateButtonDisabled: boolean = false;

  constructor(private roleService: RoleService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.createRoleForm();
    this.getAllRoles();
  }

  createRoleForm(): void {
    this.roleformGroup = this.formBuilder.group({
      roleName: ['', Validators.required]
    });
  }

  unmaskId(id: string): void {
    this.unmaskedId = id;
    setTimeout(() => {
      this.unmaskedId = null;
    }, 2000);
  }

  openModal(roleDetails?: Role): void {
    if (roleDetails && roleDetails.id) {
      this.role = roleDetails;
      this.roleformGroup.controls['roleName'].setValue(this.role.roleName);
      this.shouldCreateNewRole = false;
    } else {
      this.shouldCreateNewRole = true;
      this.roleformGroup.reset();
      this.isCreateButtonDisabled = true;
    }
  }

  openDeletionModal(roleDetails: Role): void {
    if (roleDetails.id) {
      this.role = roleDetails;
    }
  }

  getAllRoles(): void {
    this.isLoading = true;
    this.roleService.getAllRoleService.getRoles().subscribe({
      next: (response: Array<RoleDto>) => {
        setTimeout(() => {
          this.roleList = response;
          this.isLoading = false;
        }, 1000);
      },
      error: (error: Error) => {
        this.isLoading = false;
        const detailedMsg: string = 'Unable to load role list';
        ErrorHandler.handleError(error, detailedMsg, this.toastr);
      }
    });
  }

  createRole(): void {
    const inputRequest: CreateRole$Json$Params = {
      body: {
        roleName: this.roleformGroup.controls['roleName'].value
      }
    };
    this.roleService.createRoleService.createRole$Json(inputRequest).subscribe({
      next: (response: RoleDto) => {
        if (response.id) {
          this.roleList.push(response);
          this.toastr.success(`Role: ${response.roleName} created successfully`);
        }
        this.closeModalDialog();

      },
      error: (error: Error) => {
        const detailedMsg: string = `Unable to create Role:\n ${this.roleformGroup.controls['roleName'].value}`;
        ErrorHandler.handleError(error, detailedMsg, this.toastr);
        this.closeModalDialog();
      }
    });
  }

  updateRole(roleId: string): void {
    const inputRequest: UpdateRole$Json$Params = {
      body: {
        id: roleId,
        roleName: this.roleformGroup.controls['roleName'].value
      }
    }
    this.roleService.updateRoleService.updateRole$Json(inputRequest).subscribe({
      next: (response: RoleDto) => {
        const existingRoleIndex = this.roleList.findIndex(role => role.id === response.id);
        if (existingRoleIndex !== -1) {
          this.roleList[existingRoleIndex].roleName = response.roleName;
          this.toastr.success(`Role: ${response.roleName} updated successfully`);
        }
        this.closeModalDialog();
      },
      error: (error: Error) => {
        const detailedMsg: string = `Unable to update Role:\n ${this.roleformGroup.controls['roleName'].value}`;
        ErrorHandler.handleError(error, detailedMsg, this.toastr);
        this.closeModalDialog();
      }
    });
  }

  deleteRole(roleId: string): void {
    // if (confirm("Are you sure you want to delete this role !!!")) {
      const input: DeleteRole$Params = {
        roleId: roleId
      };
      this.roleService.deleteRoleService.deleteRole(input).subscribe({
        next: () => {
          this.roleList = this.roleList.filter(role => role.id !== roleId); // This will remove the data from the array
          this.toastr.success(`Role: associated with id: ${input} has been deleted successfully`);
        },
        error: (error: Error) => {
          const detailedMsg: string = `Unable to delete Role as per id: ${input} given\n Please check the id`;
          ErrorHandler.handleError(error, detailedMsg, this.toastr);
        }
      });
    // }
  }

  private closeModalDialog(): void {
    this.closeModal.nativeElement.click();
  }
}

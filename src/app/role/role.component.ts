import { Component, OnInit } from '@angular/core';
import { Role, RoleDto } from '../lib/generated/models';
import { RoleService } from './role.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../shared/shared.module";

@Component({
    selector: 'role',
    standalone: true,
    templateUrl: './role.component.html',
    styleUrl: './role.component.scss',
    imports: [ReactiveFormsModule, SharedModule]
})
export class RoleComponent implements OnInit {

  roleList: RoleDto[] = [];
  role!: Role;
  errorMsg: string = '';
  spinnerColor: string = "text-success";
  shouldCreateNewRole: boolean = false;
  showToaster: boolean = false;
  roleformGroup!: FormGroup;
  isLoading: boolean = false;

  constructor(private roleService: RoleService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.createRoleForm();
    this.getAllRoles();
  }

  createRoleForm(): void {
    this.roleformGroup = this.formBuilder.group({
      roleName: ['']
    });
  }

  getAllRoles(): void {
    this.isLoading = true;
    this.roleService.getAllRoleService.getRoles().subscribe({
      next: (response: Array<RoleDto>) => {
        setTimeout(() => {
          this.roleList = response;
          this.showToaster = true;
          this.isLoading = false;
        }, 1000);
      },
      error: (error: Error) => {
        this.isLoading = false;
        this.showToaster = true;
        this.errorMsg = error.message;
      }
    });
  }

  openModal(roleDetails: Role): void {
    if (roleDetails.id) {
      this.role = roleDetails;
      this.roleformGroup.controls['roleName'].setValue(this.role.roleName);
    } else {
      this.shouldCreateNewRole = true;
      this.role = {
        id: '',
        roleName: ''
      }
    }
  }

}

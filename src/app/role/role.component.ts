import { Component, OnInit } from '@angular/core';
import { Role, RoleDto } from '../lib/generated/models';
import { RoleService } from './role.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent implements OnInit {

  roleList: RoleDto[] = [];
  role!: Role;
  errorMsg: string = '';
  shouldCreateNewRole: boolean = false;
  showToaster: boolean = false;
  formGroup!: FormGroup;

  constructor(private roleService: RoleService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createRoleForm();
    this.getAllRoles();
  }

  createRoleForm(): void {
    this.formGroup = this.formBuilder.group({
      roleName: ['']
    });
  }

  getAllRoles(): void {
    this.roleService.getAllRoleService.getRoles().subscribe({
      next: (response: Array<RoleDto>) => {
        this.roleList = response;
      },
      error: (error: Error) => {
        this.showToaster = true;
        this.errorMsg = error.message;
      }
    });
  }

  openModal(roleDetails: Role): void {
    if (roleDetails.id) {
      this.role = roleDetails;
    } else {
      this.shouldCreateNewRole = true;
      this.role = {
        id: '',
        roleName: ''
      }
    }
  }

}

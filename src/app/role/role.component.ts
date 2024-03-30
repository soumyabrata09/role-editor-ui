import { Component, OnInit } from '@angular/core';
import { Role, RoleDto } from '../lib/generated/models';
import { RoleService } from './role.service';

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

  constructor(private roleService: RoleService) { }

  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles(): void {
    this.roleService.getAllRoleService.getRoles().subscribe({
      next: this.onGetRoleByIdSuccess,
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

  private onGetRoleByIdSuccess = (response: Array<RoleDto>) => {
    this.roleList = response;
    this.showToaster = true;
  };

}

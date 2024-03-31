import { Component, OnInit } from '@angular/core';
import { Role, RoleDto } from '../lib/generated/models';
import { RoleService } from './role.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent implements OnInit {

  roleList: RoleDto[] = [];
  role!: Role;
  errorMsg: string = '';
  shouldCreateNewRole: boolean = false;
  showToaster: boolean = false;
  roleformGroup!: FormGroup;

  constructor(private roleService: RoleService,
    private formBuilder: FormBuilder) { 
      this.createRoleForm();
    }

  ngOnInit(): void {
    // this.createRoleForm();
    this.getAllRoles();
  }

  createRoleForm(): void {
    this.roleformGroup = this.formBuilder.group({
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

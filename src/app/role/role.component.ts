import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Role, RoleDto } from '../lib/generated/models';
import { RoleService } from './role.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../shared/shared.module";
import { UpdateRole$Json$Params } from '../lib/generated/fn/update-role/update-role-json';

@Component({
    selector: 'role',
    standalone: true,
    templateUrl: './role.component.html',
    styleUrl: './role.component.scss',
    imports: [ 
      ReactiveFormsModule, 
      SharedModule
    ]
})
export class RoleComponent implements OnInit {

  @ViewChild('closeModal') closeModal!: ElementRef;
  roleList: RoleDto[] = [];
  role!: Role;
  unmaskedId: string | null = null;
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

  unmaskId(id: string): void {
    this.unmaskedId = id;
    setTimeout(() => {
      this.unmaskedId = null;
    }, 2000);
  }

  openModal(roleDetails: Role): void {
    if (roleDetails.id) {
      this.role = roleDetails;
      this.roleformGroup.controls['roleName'].setValue(this.role.roleName);
      this.shouldCreateNewRole = false;
    } else {
      this.shouldCreateNewRole = true;
      this.role = {
        id: '',
        roleName: ''
      }
    }
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

  updateRole(roleId: string): void {
    const inputParam: UpdateRole$Json$Params = {
      body: {
        id: roleId,
        roleName: this.roleformGroup.controls['roleName'].value
      }
    }
    this.roleService.updateRoleService.updateRole$Json(inputParam).subscribe({
      next: (response: RoleDto) => {
        const existingRoleIndex = this.roleList.findIndex(role => role.id === response.id);
        if (existingRoleIndex !== -1) {
          this.roleList[existingRoleIndex].roleName = response.roleName;
          this.showToaster = true;
        }
        this.closeModal.nativeElement.click();
      },
      error: (error: Error) => {
        this.showToaster = true;
        this.errorMsg = error.message;
      }
    });
  }
}

import { Injectable } from '@angular/core';
import { CreateRoleService, DeleteRoleService, GetAllRolesService, GetRoleByIdService, UpdateRoleService } from '../lib/generated/services';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  unmaskedRoleId: string | null = null;
  
  constructor(readonly createRoleService: CreateRoleService,
    readonly getAllRoleService: GetAllRolesService,
    readonly updateRoleService: UpdateRoleService,
    readonly getRoleByIdService: GetRoleByIdService,
    readonly deleteRoleService: DeleteRoleService
  ) { }

  unmaskRoleId(selectedRoleId: string): void {
    this.unmaskedRoleId = selectedRoleId;
    setTimeout(() => {
      this.unmaskedRoleId = null;
    }, 2000);
  }

}

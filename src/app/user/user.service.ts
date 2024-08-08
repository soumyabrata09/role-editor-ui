import { Injectable } from '@angular/core';
import { CreateUserService, DeleteUserService, GetAllUserService, UpdateUserService } from '../lib/generated/services';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(readonly createUserService: CreateUserService,
    readonly getAllUserService: GetAllUserService,
    readonly updateUserService: UpdateUserService,
    readonly deleteUserService: DeleteUserService
  ) { }
}

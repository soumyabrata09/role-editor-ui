import { Injectable } from '@angular/core';
import { CreateUserService, DeleteUserService, GetAllUserService, UpdateUserService } from '../lib/generated/services';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  unmaskedUserId: string | null = null;

  constructor(readonly createUserService: CreateUserService,
    readonly getAllUserService: GetAllUserService,
    readonly updateUserService: UpdateUserService,
    readonly deleteUserService: DeleteUserService
  ) { }

  unmaskUserId(selectedUserId: string): void {
    this.unmaskedUserId = selectedUserId;
    setTimeout(() => {
      this.unmaskedUserId = null;
    }, 2000);
  }

}

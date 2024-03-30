import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';

export const routes: Routes = [
    {
        path: "users", component: UserComponent
    },
    {
        path: "roles", component: RoleComponent
    },
    {
        path: "", redirectTo: "/users", pathMatch: "full"
    }
];

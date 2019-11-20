import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { DealerComponent} from './dealer/dealer.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent} from './admin/admin.component';
import { UserResolver } from './user/user.resolver';
import { DealerResolver } from './dealer/dealer.resolver';
import { AuthGuard } from './core/auth.guard';
import { HomeComponent} from './users_list/home/home.component'
import { ShowUserComponent} from './users_list/show-user/show-user.component'
import { ShowUserResolver} from './users_list/show-user/show-user.resolver'
import { InventoryListComponent} from './inventory/inventory-list/inventory-list.component'
import { AddInventoryComponent} from './inventory/add-inventory/add-inventory.component'
import { EditInventoryComponent} from './inventory/edit-inventory/edit-inventory.component'
import { EditUserComponent} from './edit-user/edit-user.component'
import { EditUserResolver} from './edit-user/edit-user.resolver'
import { ShowDrugsComponent} from './show-drugs/show-drugs.component'
import { from } from 'rxjs';



export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent,  resolve: { data: UserResolver}},
  { path: 'dealer_dashboard', component: DealerComponent,  resolve: { data: UserResolver}},
  { path: 'admin_dashboard', component: AdminComponent,  resolve: { data: UserResolver}},
  { path: 'user_list', component: HomeComponent },
  { path: 'show_user/:id', component: ShowUserComponent, resolve:{data : ShowUserResolver}},
  { path: 'add-inventory', component: AddInventoryComponent },
  { path: 'view-inventory', component: InventoryListComponent },
  { path: 'edit-inventory/:id', component: EditInventoryComponent },
  { path: 'edit-user', component: EditUserComponent, resolve:{data : EditUserResolver } },
  { path: 'show-drugs', component: ShowDrugsComponent },

];
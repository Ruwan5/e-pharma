import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { DealerComponent} from './dealer/dealer.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent} from './admin/admin.component';
import { UserResolver } from './user/user.resolver';
import { DealerResolver } from './dealer/dealer.resolver';
import { AuthGuard } from './core/auth.guard';
<<<<<<< HEAD
import { HomeComponent} from './users_list/home/home.component'
import { ShowUserComponent} from './users_list/show-user/show-user.component'


=======
import { HomeComponent} from './users_list/home/home.component';
import { OrderingComponent } from "./ordering/ordering.component";
>>>>>>> 0c624df371fb856b3265025382657e1f3bd03c90

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent,  resolve: { data: UserResolver}},
  { path: 'dealer_dashboard', component: DealerComponent,  resolve: { data: UserResolver}},
<<<<<<< HEAD
  { path: 'admin_dashboard', component: AdminComponent},
=======
  { path: 'admin_dashboard', component: AdminComponent,  resolve: { data: UserResolver}},
  { path: 'ordering', component: OrderingComponent,  resolve: { data: UserResolver}},
>>>>>>> 0c624df371fb856b3265025382657e1f3bd03c90
  { path: 'user_list', component: HomeComponent },
  { path: 'show_user', component: ShowUserComponent},



];
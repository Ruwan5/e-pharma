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
import { EditUserDealerComponent} from './edit-user-dealer/edit-user-dealer.component'
import { EditUserPharmacistComponent} from './edit-user-pharmacist/edit-user-pharmacist.component'
import { ShowDrugsComponent} from './show-drugs/show-drugs.component'
import { ForgetPasswordComponent} from './login/forget-password/forget-password.component'
import { from } from 'rxjs';
import { VerifyComponent} from './register/verify/verify.component'
import {DrugDetailsComponent} from './inventory/drug-details/drug-details/drug-details.component'
import {DrugDetailsResolver} from './inventory/drug-details/drug-details/drugs-details.resolver'
<<<<<<< HEAD
import {PharmacyReportComponent} from './pharmacy-report/pharmacy-report.component'
=======
import {EditDrugResolver} from './inventory/edit-inventory/edit-inventory.resolver'
import {ChatroomComponent} from './chatroom/chatroom.component';
import { ChatFormComponent } from './chat-form/chat-form.component';
import{MassageComponent} from './massage/massage.component';
import{FeedComponent} from './feed/feed.component';


>>>>>>> 2df5148233573eeef323817033808240699ae39a


export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'user', component: UserComponent,  resolve: { data: UserResolver}},
  { path: 'dealer_dashboard', component: DealerComponent,  resolve: { data: UserResolver}},
  { path: 'admin_dashboard', component: AdminComponent,  resolve: { data: UserResolver}},
  { path: 'user_list', component: HomeComponent },
  { path: 'show_user/:id', component: ShowUserComponent, resolve:{data : ShowUserResolver}},
  { path: 'add-inventory', component: AddInventoryComponent },
  { path: 'view-inventory', component: InventoryListComponent },
  { path: 'edit-inventory/:id', component: EditInventoryComponent , resolve:{data : EditDrugResolver}},
  { path: 'edit-user', component: EditUserComponent},
  { path: 'edit-user-dealer', component: EditUserDealerComponent},
  { path: 'edit-user-pharmacist', component: EditUserPharmacistComponent},
  { path: 'show-drugs', component: ShowDrugsComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'list-inventory', component: InventoryListComponent },
  { path: 'verify', component: VerifyComponent },
<<<<<<< HEAD
  { path: 'drugs-details/:id', component:DrugDetailsComponent, resolve:{data : DrugDetailsResolver}},
  { path: 'pharmacy-report', component:PharmacyReportComponent,}
=======
  { path: 'drugs-details/:id', component:DrugDetailsComponent, resolve:{data : DrugDetailsResolver},},
  { path: 'chatroom', component: ChatroomComponent },
  { path: 'chat-form', component: ChatFormComponent },
  {path:'message',component:MassageComponent},
  {path:'feed', component:FeedComponent}



>>>>>>> 2df5148233573eeef323817033808240699ae39a

];
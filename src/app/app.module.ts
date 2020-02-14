import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase} from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {AngularFireDatabaseModule} from '@angular/fire/database'
import {HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { DealerComponent } from './dealer/dealer.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './users_list/home/home.component';
import { ShowUserComponent } from './users_list/show-user/show-user.component';
import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';
import { AddInventoryComponent } from './inventory/add-inventory/add-inventory.component';
import { EditInventoryComponent } from './inventory/edit-inventory/edit-inventory.component';
import { InventoryListComponent } from './inventory/inventory-list/inventory-list.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShowUserResolver } from './users_list/show-user/show-user.resolver';
import {DrugDetailsResolver} from './inventory/drug-details/drug-details/drugs-details.resolver'
import {EditDrugResolver} from './inventory/edit-inventory/edit-inventory.resolver'

 
import { NgxPaginationModule } from 'ngx-pagination';

import { ToastrModule } from 'ngx-toastr';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AdminSidebarComponent } from './sidebar/admin-sidebar/admin-sidebar.component';
import { ShowDrugsComponent } from './show-drugs/show-drugs.component';
import { PharmacistSidebarComponent } from './sidebar/pharmacist-sidebar/pharmacist-sidebar.component';
import { DealerSidebarComponent } from './sidebar/dealer-sidebar/dealer-sidebar.component';
import { EditUserPharmacistComponent } from './edit-user-pharmacist/edit-user-pharmacist.component';
import { EditUserDealerComponent } from './edit-user-dealer/edit-user-dealer.component';
import { ForgetPasswordComponent } from './login/forget-password/forget-password.component';
import { VerifyComponent } from './register/verify/verify.component';
import { DrugDetailsComponent } from './inventory/drug-details/drug-details/drug-details.component';
import { ChatFormComponent } from './chat-form/chat-form.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { FeedComponent } from './feed/feed.component';
import { MassageComponent } from './massage/massage.component';

import { ChatService } from './core/chat.service';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    DealerComponent,
    AdminComponent,
    HomeComponent,
    ShowUserComponent,
    AddInventoryComponent,
    EditInventoryComponent,
    InventoryListComponent,
    EditUserComponent,
    AdminSidebarComponent,
    ShowDrugsComponent,
    PharmacistSidebarComponent,
    DealerSidebarComponent,
    EditUserPharmacistComponent,
    EditUserDealerComponent,
    ForgetPasswordComponent,
    VerifyComponent,
    DrugDetailsComponent,
    ChatFormComponent,
    ChatroomComponent,
    FeedComponent,
    MassageComponent,
    
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    // AngularFireDatabase
    ToastrModule.forRoot({
      timeOut:3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), // ToastrModule added
    AngularFireDatabaseModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,  // Include it in imports array
    HttpClientModule
  ],
  providers: [AuthService, UserService, UserResolver, AuthGuard, ShowUserResolver, DrugDetailsResolver, EditDrugResolver,ChatService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase} from '@angular/fire/database'
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { UserResolver } from './user/user.resolver';
import { EditUserResolver } from './edit-user/edit-user.resolver';
import { AuthGuard } from './core/auth.guard';
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {AngularFireDatabaseModule} from '@angular/fire/database'

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
import { NgxPaginationModule } from 'ngx-pagination';// NGX Pagination

import { ToastrModule } from 'ngx-toastr';
import { EditUserComponent } from './edit-user/edit-user.component';

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
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    // AngularFireDatabase
    ToastrModule.forRoot(), // ToastrModule added
    AngularFireDatabaseModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule  // Include it in imports array
  ],
  providers: [AuthService, UserService, UserResolver, AuthGuard, ShowUserResolver, EditUserResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }

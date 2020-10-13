import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { LoginComponent } from './components/user/login/login.component';
import { UserCrudComponent } from './views/user-crud/user-crud.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { UserDeleteComponent } from './components/user/user-delete/user-delete.component';
import { UserSearchComponent } from './components/user/user-search/user-search.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UserCrudComponent },
  { path: 'user/create', component: UserCreateComponent },
  { path: 'user/update/:user_id', component: UserUpdateComponent },
  { path: 'user/delete/:user_id', component: UserDeleteComponent },
  { path: 'users/search/:filter', component: UserSearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

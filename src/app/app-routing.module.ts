import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { canMatch } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path:'register', component: RegisterComponent },
  { 
    path: '',
    canMatch : [canMatch],
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule)
  },
  { path: '**', redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

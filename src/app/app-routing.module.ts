import { AuthGuard } from './components/auth/auth-guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPassComponent } from './components/reset-pass/reset-pass.component';
import { StoreComponent } from './components/store/store.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'store' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPassComponent },
  { path: 'store', component: StoreComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

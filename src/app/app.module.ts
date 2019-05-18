import { AuthGuard } from './components/auth/auth-guard';
import { AuthService } from './components/auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatInputModule, MatIconModule, MatCardModule, MatTableModule, MatCheckboxModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPassComponent } from './components/reset-pass/reset-pass.component';
import { CartComponent } from './components/cart/cart.component';
import { StoreComponent } from './components/store/store.component';
import { StoreService } from './components/services/store.service';

const MATERIAL_MODULES = [
  // MatFormFieldModule,
  MatInputModule,
  // MatSelectModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatTableModule,
  MatCheckboxModule
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ResetPassComponent,
    CartComponent,
    StoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    StoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

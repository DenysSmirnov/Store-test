import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;

    this.user.subscribe(user => {
      if (user) {
        this.userDetails = user;
        localStorage.setItem('testUser', JSON.stringify({uid: this.userDetails.uid, email: this.userDetails.email}));
      } else {
        this.userDetails = null;
      }
    });
  }

  isLoggedIn() {
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }

  getUserEmail() {
    return JSON.parse(localStorage.getItem('testUser')).email;
  }

  getUserCart() {
    return JSON.parse(localStorage.getItem('testUserCart'));
  }

  logout() {
    this._firebaseAuth.auth.signOut()
      .then(() => this.router.navigateByUrl('/login'));
    localStorage.removeItem('testUser');
    localStorage.removeItem('testUserCart');
    this.userDetails = null;
  }

  doRegister(email, password) {
    return this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  signIn(email, password) {
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  resetPassword(email) {
    return this._firebaseAuth.auth.sendPasswordResetEmail(email);
  }

}

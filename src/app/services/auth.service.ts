import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth) { }

  initAuthListener() {

    this.auth.authState.subscribe( fuser => {
      console.log(fuser);
      console.log(fuser?.uid);
      console.log(fuser?.email);
    });

  }

  createUser(name: string, email: string, password: string) {
    //console.log(nombre, email, password);
    return this.auth.createUserWithEmailAndPassword(email, password).then(fbUser => {

    })
  }

  loginUser(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logoutUser() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null)
    );
  }
}

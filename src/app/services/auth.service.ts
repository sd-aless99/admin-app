import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { map, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authAct from '../auth/auth.actions';
import * as transAct from '../admin/transaction.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubs!: Subscription;
 
  //propiedad privada, solo para lectura y tiene getter
  private _user!: User;

  get user() {
    return {...this._user};
  }

  constructor(public auth: AngularFireAuth,
              private store: Store<AppState>, 
              private firestore: AngularFirestore) {}

  initAuthListener() {

    this.auth.authState.subscribe( fuser => {
      if (fuser) {
        this.userSubs = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
        .subscribe( (firestoreUser: any) => {
          console.log({firestoreUser});
          const tempUser = User.fromFirebase(firestoreUser);

          //inicializar propiedad de lectura _user una vez que se obtienen los datos
          this._user = tempUser;

          this.store.dispatch(authAct.setUser({user: tempUser}));
        })
      } else {
        if (this.userSubs) {
          this.userSubs.unsubscribe();
        }
        this.store.dispatch(authAct.unSetUser());
        this.store.dispatch(transAct.unsetItems());
      }
    });
  }

  createUser(name: string, email: string, password: string) {
    //console.log(nombre, email, password);
    return this.auth.createUserWithEmailAndPassword(email, password).then( ({ user }) => {
      const newUser = new User(user!.uid, name, email);

      return this.firestore.doc(`${user!.uid}/usuario`).set({...newUser});
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

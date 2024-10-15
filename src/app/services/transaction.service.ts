import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseApp } from '@angular/fire/app';
import { deleteDoc, doc, getFirestore } from '@angular/fire/firestore';

import { Transaction } from '../models/transaction.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private firestore: AngularFirestore,
              private app: FirebaseApp,
              private authService: AuthService) { }

  createTransaction(transaction: Transaction) {
    
    //obtener el uid desde el servicio de autenticacion
    const uid = this.authService.user.uid;
    console.log(uid);

    delete transaction.uid;
    return this.firestore.doc(`${uid}/transaction`).collection('items').add({...transaction});
  }

  initTransactionsListener(uid: string) {
    return this.firestore.collection(`${uid}/transaction/items`).snapshotChanges()
      .pipe(
        map( snapshot => snapshot.map( doc => ({
          uid: doc.payload.doc.id,
          ...doc.payload.doc.data() as any
        })))
      );
  }

  removeTransaction(uidItem?: string) {
    
    const uid = this.authService.user.uid;

    const db = getFirestore(this.app)
    
    //solucion del video que no funciona bien
    //return this.firestore.doc(`${uid}/transaction/${uidItem}`).delete();

    return deleteDoc(doc(db,`${uid}`, `transaction`, `items`, `${uidItem}`));

  }
}

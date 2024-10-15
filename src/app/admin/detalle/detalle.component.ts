import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Transaction } from '../../models/transaction.model';
import { Subscription } from 'rxjs';
import { TransactionService } from '../../services/transaction.service';
import Swal from 'sweetalert2';
import { AppStateAdmin } from '../transaction.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: ``
})
export class DetalleComponent {
  
  transactionItems: Transaction[] = [];
  transactionSubs!: Subscription;
  
  constructor(private store: Store<AppStateAdmin>, private transactionService: TransactionService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    this.transactionSubs = this.store.select('transaction').subscribe( ({items}) => this.transactionItems = items);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
    this.transactionSubs?.unsubscribe();
  }

  removeItem(uid?: string) {
    this.transactionService.removeTransaction(uid)
      .then( () => Swal.fire('Borrado', 'Item borrado', 'success'))
      .catch( err => Swal.fire('Error', err.message, 'error'));
  }
}

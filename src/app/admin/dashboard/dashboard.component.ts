import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { filter, Subscription } from 'rxjs';
import { TransactionService } from '../../services/transaction.service';
import { setItems } from '../transaction.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent {

  userSubs!: Subscription;
  transactionSubs!: Subscription;

  constructor(private store: Store<AppState>, private transactionService: TransactionService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.userSubs = this.store.select('user')
      //el pipe sirve para procesar info, el filter sirve para filtrar en base a una condicion
      .pipe(
        filter( auth => auth.user != null)
      )
      .subscribe( ({user}) => {
        console.log(user);
        
        this.transactionSubs = this.transactionService.initTransactionsListener(user!.uid)
          .subscribe( transactionsFB => {
            this.store.dispatch(setItems({items: transactionsFB}))
          })
      });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.transactionSubs?.unsubscribe();
    this.userSubs?.unsubscribe();
  }

}
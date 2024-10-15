import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Transaction } from '../../models/transaction.model';
import { AppStateAdmin } from '../transaction.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: ``
})

export class EstadisticaComponent {
  
  deposit: number = 0;
  withdrawal: number = 0;

  depositSum: number = 0;
  withdrawalSum: number = 0;

  constructor(private store:Store<AppStateAdmin>) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.store.select('transaction').subscribe( ({items}) => this.generateStats(items))
  }

  generateStats(items: Transaction[]) {
    
    this.deposit = 0;
    this.withdrawal = 0;
    this.depositSum = 0;
    this.withdrawalSum = 0;

    
    console.log(items);

    for (const item of items) {
      if (item.type === 'ingreso') {
        this.depositSum += item.amount;
        this.deposit++;
      } else {
        this.withdrawalSum += item.amount;
        this.withdrawal++;
      }
    }
  }
}

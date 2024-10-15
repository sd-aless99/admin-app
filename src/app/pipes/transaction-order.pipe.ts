import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../models/transaction.model';

@Pipe({
  name: 'transactionOrder'
})
export class TransactionOrderPipe implements PipeTransform {

  transform(items: Transaction[]): Transaction[] {
    return items = items.slice().sort( (a,b) => {
      if (a.type === 'ingreso') {
        return -1;
      } else {
        return 1;
      }
    });
  }

}

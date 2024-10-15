import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction } from '../models/transaction.model';
import { TransactionService } from '../services/transaction.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

//ngrx
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as ui from '../shared/ui.actions'


@Component({
  selector: 'app-admin',
  templateUrl: './transaction.component.html',
  styles: ``
})
export class TransactionComponent {

  transactionForm!: FormGroup;
  transactionType: string = 'ingreso';
  loading: boolean = false;
  uiSubs!: Subscription;

  constructor(private fb: FormBuilder,
              private store: Store<AppState>,
              private transactionService: TransactionService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.transactionForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required],
    });

    this.uiSubs =  this.store.select('ui').subscribe( ui => {
      this.loading = ui.isLoading;
      console.log('cargando sub transactions');
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.uiSubs.unsubscribe();
  }

  saveChanges() {
    
    
    if (this.transactionForm.invalid) {return;}
    
    this.store.dispatch(ui.isLoading());
    
    console.log(this.transactionForm.value);
    console.log(this.transactionType);

    const {description, amount} = this.transactionForm.value;
    const transaction = new Transaction(description, amount, this.transactionType);

    this.transactionService.createTransaction(transaction)
    .then( () => {
      this.transactionForm.reset();
      this.store.dispatch(ui.stopLoading());
      Swal.fire('Registro creado', description, 'success');
    })
    .catch( err => {
      this.store.dispatch(ui.stopLoading());   
      Swal.fire('Error', err.message, 'error')
    }); 
  }
}

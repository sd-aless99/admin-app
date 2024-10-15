import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionComponent } from './transaction.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { TransactionOrderPipe } from '../pipes/transaction-order.pipe';
import { ChartComponent } from './estadistica/chart/chart.component';
import { StoreModule } from '@ngrx/store';
import { transactionReducer } from './transaction.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    TransactionComponent,
    EstadisticaComponent,
    DetalleComponent,
    TransactionOrderPipe
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('transaction', transactionReducer),
    ReactiveFormsModule,
    ChartComponent,
    SharedModule,
    DashboardRoutingModule
  ],
  providers: [
    provideCharts(withDefaultRegisterables()),
  ]
})
export class AdminModule { }

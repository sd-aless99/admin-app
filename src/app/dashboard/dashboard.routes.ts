import { Routes } from "@angular/router";
import { EstadisticaComponent } from "../admin/estadistica/estadistica.component";
import { TransactionComponent } from "../admin/transaction.component";
import { DetalleComponent } from "../admin/detalle/detalle.component";

export const dashboardRoutes: Routes = [
    { path: '', component: EstadisticaComponent },
    { path: 'transactions', component: TransactionComponent},
    { path: 'detalle', component: DetalleComponent},
]
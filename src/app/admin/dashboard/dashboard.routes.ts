import { Routes } from "@angular/router";
import { EstadisticaComponent } from "../estadistica/estadistica.component";
import { TransactionComponent } from "../transaction.component";
import { DetalleComponent } from "../detalle/detalle.component";

export const dashboardRoutes: Routes = [
    { path: '', component: EstadisticaComponent },
    { path: 'transactions', component: TransactionComponent},
    { path: 'detalle', component: DetalleComponent},
]
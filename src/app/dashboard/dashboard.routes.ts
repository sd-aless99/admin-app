import { Routes } from "@angular/router";
import { EstadisticaComponent } from "../admin/estadistica/estadistica.component";
import { AdminComponent } from "../admin/admin.component";
import { DetalleComponent } from "../admin/detalle/detalle.component";

export const dashboardRoutes: Routes = [
    { path: '', component: EstadisticaComponent },
    { path: 'admin', component: AdminComponent},
    { path: 'detalle', component: DetalleComponent},
]
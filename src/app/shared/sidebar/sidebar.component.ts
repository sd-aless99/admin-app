import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {

  constructor(private authServicio: AuthService, private router: Router) {}

  cerrarSesion() {
    this.authServicio.logoutUsuario().then( () => {
      this.router.navigate(['/login']);
    });
  }
}

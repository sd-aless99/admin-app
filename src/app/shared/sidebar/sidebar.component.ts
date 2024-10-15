import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {

  userName?: string;
  userSubs!: Subscription; 

  constructor(private authService: AuthService, private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.userSubs = this.store.select('user').pipe(
      filter( auth => auth.user != null)
    )
    .subscribe( user => this.userName = user.user?.name);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userSubs.unsubscribe();
  }

  cerrarSesion() {
    this.authService.logoutUser().then( () => {
      this.router.navigate(['/login']);
    });
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: ``
})
export class RegisterComponent {
  
  registrerForm!: FormGroup;
  loading: boolean = false;
  uiSub!: Subscription;
  
  constructor(private fb: FormBuilder, 
              private authService: AuthService, 
              private store: Store<AppState>, 
              private router: Router) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.registrerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.uiSub =  this.store.select('ui').subscribe( ui => {
      this.loading = ui.isLoading;
      console.log('cargando subs');
    });

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.uiSub?.unsubscribe();
  }

  createUser() {
    
    if (this.registrerForm.invalid) {return;}

    this.store.dispatch(ui.isLoading());

    // Swal.fire({
    //   title: 'Espere por favor',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   }
    // });

    const {name, email, password} = this.registrerForm.value;
    
    this.authService.createUser(name, email, password).then(credentials => {
      // Swal.close();
      this.store.dispatch(ui.stopLoading());
      this.router.navigate(['/']);
    }).catch(err => {
      this.store.dispatch(ui.stopLoading());
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message
      });
    });    

    // console.log(this.registerForm);
    // console.log(this.registerForm.valid);
    // console.log(this.registerForm.value);
  }

}

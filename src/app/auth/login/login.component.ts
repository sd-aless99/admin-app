import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authServicio: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  iniciarSesion() {
    if (this.loginForm.invalid) {return;}

    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const {correo, password} = this.loginForm.value;
    
    this.authServicio.loginUsuario(correo, password).then(credenciales => {
      console.log(credenciales);
      Swal.close();
      this.router.navigate(['/']);
    }).catch(err => {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message
      });
    });
  }
}

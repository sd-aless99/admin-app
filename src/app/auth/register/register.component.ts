import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: ``
})
export class RegisterComponent {
  
  registroForm!: FormGroup;
  
  constructor(private fb: FormBuilder, private authServicio: AuthService, private router: Router) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  crearUsuario() {
    
    if (this.registroForm.invalid) {return;}

    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const {nombre, correo, password} = this.registroForm.value;
    
    this.authServicio.crearUsuario(nombre, correo, password).then(credenciales => {
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

    // console.log(this.registroForm);
    // console.log(this.registroForm.valid);
    // console.log(this.registroForm.value);
  }

}

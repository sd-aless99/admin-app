import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: ``
})
export class RegisterComponent {
  
  registroForm!: FormGroup;
  
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    });
  }

  crearUsuario() {
    
  }

}

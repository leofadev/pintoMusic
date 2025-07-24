import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
/* Crear un nuevo guard para cuando intente entrar al home validar si estoy logueado, si no redireccionar al login*/

  loginForm: FormGroup;
  error_message: string = '';
  validation_messages ={
    email:[
      {
        type: 'required', message: 'El correo es obligatorio'
      },
      {
        type: 'email', message: 'El correo no es valido'
      }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres' }
    ]
  }

  constructor( private formBuilder: FormBuilder, private AuthService: AuthService, private navCtrl: NavController ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required, //Campo obligatorio
          Validators.email //Valida el correo electronico
          ])
    ),

      password: new FormControl(
        '',
        Validators.compose([
          Validators.required, //Campo obligatorio
          Validators.minLength(6) //validar que la contraseña tenga minimo 6 caracteres
          ])
      )
    })
  }

  ngOnInit() {
  }

  loginUser(credentials: any){
    console.log(credentials);
    this.AuthService.loginUser(credentials).then(res => {
      this.error_message = '';
      this.navCtrl.navigateForward('/home')
    }).catch(error => {
      this.error_message = error;
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicModule, NavController, ToastController  } from '@ionic/angular';
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
      { type: 'required', message: 'El correo es obligatorio' },
      { type: 'email', message: 'El correo no es valido' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres' }
    ]
  }

  constructor( private formBuilder: FormBuilder, private AuthService: AuthService, private navCtrl: NavController, private toastController: ToastController ) {
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
    this.AuthService.loginUser(credentials).then(async user => {
      this.error_message = '';
      await this.showToast(`Bienvenido ${user.name}`, 'success');
      this.navCtrl.navigateForward('/menu/home');
    }).catch(async error => {
      this.error_message = error;
      await this.showToast(error, 'danger');
    })
  }

  goRegister(){
    this.navCtrl.navigateForward('register');
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'top'
    });
    toast.present();
  }
}

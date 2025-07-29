
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicModule, NavController, LoadingController, ToastController } from '@ionic/angular';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule]
})
export class RegisterPage implements OnInit {

  registerForm!: FormGroup;
  error_message: string = '';
  success_message: string = '';
  isLoading: boolean = false;

  validation_messages = {
    name: [
      { type: 'required', message: 'El nombre es obligatorio' },
      { type: 'pattern', message: 'El nombre solo debe contener letras'},
      { type: 'minlength', message: 'El nombre debe tener al menos 3 caracteres'}
    ],
    lastName: [
      { type: 'required', message: 'El apellido es obligatorio' },
      { type: 'pattern', message: 'El apellido solo debe contener letras' },
      { type: 'minlength', message: 'El apellido debe tener al menos 3 caracteres' }
    ],
    email:[
      { type: 'required', message: 'El correo es obligatorio' },
      { type: 'email', message: 'El correo no es válido' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres' }
    ],
    password_confirmation: [
      { type: 'required', message: 'Debe confirmar la contraseña' },
      { type: 'minlength', message: 'La confirmación debe tener al menos 6 caracteres' },
      { type: 'mismatch', message: 'Las contraseñas no coinciden' }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private RegisterService: RegisterService,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.formBuilder.group({
      name: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')
        ])
      ),
      lastName: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')
        ])
      ),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ])
      ),
      password_confirmation: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ])
      )
    },
    {
      validator: this.passwordsMatchValidator
    });
  }

  ngOnInit() {
    // Limpiar mensajes al inicializar
    this.error_message = '';
    this.success_message = '';
  }

  async registerUser(credentials: any) {
    if (this.registerForm.invalid) {
      this.error_message = 'Por favor, corrige los errores en el formulario';
      return;
    }

    this.isLoading = true;
    this.error_message = '';
    this.success_message = '';

    // Mostrar loading
    const loading = await this.loadingController.create({
      message: 'Registrando usuario...',
      duration: 5000
    });
    await loading.present();

    try {
      const result = await this.RegisterService.registerUser(credentials);

      await loading.dismiss();
      this.success_message = result;

      // Mostrar toast de éxito
      await this.showToast('Usuario registrado exitosamente', 'success');

      // Limpiar formulario
      this.registerForm.reset();

      // Navegar al login después de un breve delay
      setTimeout(() => {
        this.navCtrl.navigateForward('/login');
      }, 2000);

    } catch (error) {
      await loading.dismiss();
      this.error_message = error as string;

      // Mostrar toast de error
      await this.showToast(this.error_message, 'danger');
    } finally {
      this.isLoading = false;
    }
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

  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }

  // Método para limpiar mensajes de error/éxito
  clearMessages() {
    this.error_message = '';
    this.success_message = '';
  }

  // Método para obtener errores específicos de un campo
  getFieldError(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    if (field && field.errors && field.touched) {
      const firstError = Object.keys(field.errors)[0];
      const messages = this.validation_messages[fieldName as keyof typeof this.validation_messages];
      const errorMessage = messages.find(msg => msg.type === firstError);
      return errorMessage ? errorMessage.message : '';
    }
    return '';
  }

  // Método para verificar si un campo es válido
  isFieldValid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return field ? field.valid && field.touched : false;
  }

  // Método para verificar si un campo es inválido
  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('password_confirmation')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  hasPasswordMismatch(): boolean {
    const password = this.registerForm.get('password')?.value;
    const confirm = this.registerForm.get('password_confirmation')?.value;
    return password && confirm && password !== confirm;
  }

}

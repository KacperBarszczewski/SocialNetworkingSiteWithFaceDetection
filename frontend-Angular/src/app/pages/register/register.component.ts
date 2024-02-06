import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  loginError: string = '';
  showPassword: boolean = false;
  showRepPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  form = this.fb.nonNullable.group(
    {
      name:['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      repPassword: ['', [Validators.required]],
    },
    {
      validators: this.passwordConfirmValidator(),
    }
  );

  passwordConfirmValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('repPassword')?.value;

      return password === confirmPassword ? null : { notMatching: true };
    };
  }

  onSubmit() {
    const { email, password } = this.form.getRawValue();

    this.authService.login(email, password).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        this.loginError = err.error.message;
      },
    });
  }
}

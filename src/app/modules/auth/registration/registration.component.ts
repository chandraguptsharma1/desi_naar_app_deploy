import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  standalone: false,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  registerForm: FormGroup;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private loginService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fill all fields correctly.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.loginService.register(this.registerForm.value).subscribe({
      next: (response: any) => {
        if (response.status === 201) {

          this.router.navigate(['/auth']);
        } else {
          this.toastr.error(response.message || 'Login failed.', 'Error');
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Login Error:', error);
        this.toastr.error(error.error.message || 'Login failed.', 'Error');
        this.loading = false;
      },
    });
  }
}

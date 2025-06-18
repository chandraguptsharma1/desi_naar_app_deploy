import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './Services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; // For Toast messages
@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  loginForm: FormGroup;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private loginService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill all fields correctly .';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.loginService.loginuser(this.loginForm.value).subscribe({
      next: (response: any) => {
        if (response.status === 200) {
          console.log('Login Response:', response);

          // Save token and user details
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));

          // Show success toast
          this.toastr.success('Login successful!', 'Success');

          if(response?.user?.role == "admin"){
             this.router.navigate(['/admin']);
          }else{
             this.router.navigate(['/admin']);
            // this.router.navigate(['/products']);
          }

          // Redirect to dashboard (example path)
          
        } else {
          this.toastr.error(response.message || 'Login failed.', 'Error');
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Login Error:', error);
        this.toastr.error(error.error.message || 'Login failed.', 'Try Again Later');
        this.loading = false;
      },
    });
  }

   register(){
    this.router.navigate(['/register'])
  }
}

import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log('Form values:', this.loginForm.value); // הוספי שורה זו
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const user = this.authService.login(username, password);
      console.log('Login result:', user); // הוספי שורה זו
      if (user) {
        if (user.role === 'teacher') {
          this.router.navigate(['/lessons']);
        } else {
          this.router.navigate(['/registrations']);
        }
      } else {
        this.errorMessage = 'שם משתמש או סיסמה שגויים';
      }
    }
  }
}
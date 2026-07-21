import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  userType: string = '';
  isHighlighted: boolean = false;

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

  // keep for backwards compatibility if needed, but not used (boxes are not clickable)
  selectUserType(type: string) {
    this.userType = type;
    this.isHighlighted = false;
  }

  onSubmit() {
    console.log('Form values:', this.loginForm.value);
    console.log('User type:', this.userType);
    
    if (!this.loginForm.valid) {
      return;
    }

    this.errorMessage = '';
    const { username, password } = this.loginForm.value;
    const user = this.authService.login(username, password);
    console.log('Login result:', user);

    if (user) {
      // set role from server and animate highlight
      this.userType = user.role === 'teacher' ? 'teacher' : 'registrar';
      this.isHighlighted = true;
      setTimeout(() => {
        this.isHighlighted = false;
        if (user.role === 'teacher') {
          this.router.navigate(['/lessons']);
        } else {
          this.router.navigate(['/registrations']);
        }
      }, 600);
    } else {
      this.errorMessage = 'שם משתמש או סיסמה שגויים';
      this.isHighlighted = false;
    }
  }
}
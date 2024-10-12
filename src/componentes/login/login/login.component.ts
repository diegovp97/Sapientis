import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(loginForm: any) {
    this.authService.login(loginForm.value).subscribe(
      (response: any) => {
        
        
        // Almacenar el token y el usuario en sessionStorage
        this.authService.saveToken(response.token);
        sessionStorage.setItem('username', loginForm.value.username);  // Guarda el username aquí también
  
        
  
        // Redirigir al dashboard
        this.router.navigate(['/dashboard']).then(() => {
          
        }).catch((error) => {
          console.error('onLogin: Error al redirigir al dashboard:', error);
        });
      },
      (error) => {
        alert('Error al iniciar sesión');
      }
    );
  }
}
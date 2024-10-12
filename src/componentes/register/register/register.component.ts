import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../servicios/auth.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private authService: AuthService) {}

  // Este es el método que debe existir en el componente
  onRegister(form: any) {
    const userData = {
      username: form.value.username,
      password: form.value.password,
      role: form.value.role
    };
  
    this.authService.register(userData).subscribe(
      (response) => {
        // Mostrar mensaje de éxito cuando el registro sea correcto
        alert(response.message);  // Muestra el mensaje del backend
      },
      (error) => {
        // Mostrar un mensaje de error si el registro falla
        if (error.status === 400) {
          alert('El usuario ya existe');
        } else if (error.status === 500) {
          alert('Error en el servidor');
        } else {
          alert('Error en el registro');
        }
        console.error(error);  // Imprime el error en la consola para ver más detalles
      }
    );
  }
}
  


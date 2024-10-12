import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../servicios/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  selectedView: string = 'dashboard'; // Controla qué vista mostrar
  user: any = {
    username: '',
    email: '',
    role: ''
  };

  

  // Variables para las secciones de ajustes
  selectedLanguage: string = 'es';  // Idioma por defecto
  isDarkMode: boolean = false;  // Control del tema oscuro
  notifications = { tasks: true, events: true };  // Preferencias de notificaciones
  accessibility = { textSize: 16, highContrast: false };  // Preferencias de accesibilidad

  private lastActivityTime: number = new Date().getTime(); // Control de inactividad

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.log('ngOnInit: Iniciando componente Dashboard');

    // Verificar si el usuario está autenticado
    const token = sessionStorage.getItem('token');
    console.log('ngOnInit: Verificando token...', token);
    if (!token) {
      console.log('ngOnInit: No hay token, redirigiendo a login');
      this.router.navigate(['/login']);
      return;
    }
    console.log('ngOnInit: Token encontrado.');

    // Recuperar el nombre de usuario desde sessionStorage
    const storedUser = sessionStorage.getItem('username');
    console.log('ngOnInit: Verificando usuario...', storedUser);
    if (storedUser) {
      this.user.username = storedUser;
    } else {
      this.user.username = 'Usuario';  // Si no hay nada almacenado, muestra un valor por defecto
      console.log('ngOnInit: No se encontró usuario, estableciendo valor por defecto');
    }

    // Cargar configuraciones de tema e idioma
    this.loadSettings();

    // Escuchar el evento beforeunload para borrar la sesión al cerrar la pestaña
    window.addEventListener('beforeunload', () => {
      console.log('beforeunload: Cierre de pestaña detectado, eliminando datos de sesión.');
      localStorage.removeItem('authToken');
      localStorage.removeItem('username');
    });

    // Control de inactividad
    window.addEventListener('mousemove', () => {
      console.log('mousemove: Detectado movimiento, reiniciando temporizador.');
      this.resetTimer();
    });
    window.addEventListener('keydown', () => {
      console.log('keydown: Detectada actividad de teclado, reiniciando temporizador.');
      this.resetTimer();
    });

    setInterval(() => {
      console.log('setInterval: Comprobando inactividad.');
      this.checkInactivity();
    }, 60000); // Verifica la inactividad cada minuto
  }

  // Cargar configuraciones de tema e idioma desde sessionStorage
  loadSettings() {
    const storedLanguage = sessionStorage.getItem('language');
    const storedTheme = sessionStorage.getItem('darkMode');
    console.log('loadSettings: Configuraciones cargadas - Idioma:', storedLanguage, ', Tema oscuro:', storedTheme);

    if (storedLanguage) {
      this.selectedLanguage = storedLanguage;
    }

    if (storedTheme === 'true') {
      this.isDarkMode = true;
      document.body.classList.add('dark-mode');
    } else {
      this.isDarkMode = false;
      document.body.classList.remove('dark-mode');
    }
  }

  // Cambiar idioma
  changeLanguage() {
    console.log('Cambiando idioma a:', this.selectedLanguage);
    sessionStorage.setItem('language', this.selectedLanguage); // Guardar la preferencia de idioma
  }

  // Cambiar tema
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    console.log(`Cambiando al modo: ${this.isDarkMode ? 'Oscuro' : 'Claro'}`);
  }

  // Configuración de 2FA
  setup2FA() {
    console.log('Configurando autenticación de dos factores...');
    // Aquí va la lógica real de configuración de 2FA
  }

  // Ver sesiones activas
  viewActiveSessions() {
    console.log('Mostrando sesiones activas...');
    // Aquí va la lógica real de sesiones activas
  }

  resetTimer() {
    this.lastActivityTime = new Date().getTime();
    console.log('resetTimer: Reiniciando el temporizador de inactividad.');
  }

  checkInactivity() {
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - this.lastActivityTime;
    console.log('checkInactivity: Tiempo de inactividad:', timeDifference / 1000, 'segundos');

    // Si ha pasado más de 30 minutos (1800000 ms), cerrar sesión
    if (timeDifference > 1800000) {
      console.log('checkInactivity: Tiempo excedido, cerrando sesión.');
      localStorage.removeItem('authToken');
      localStorage.removeItem('username');
      this.router.navigate(['/login']);
    } else {
      console.log('checkInactivity: Aún dentro del tiempo permitido.');
    }
  }

  logout() {
    console.log('logout: Cerrando sesión.');
    this.authService.logout();
    localStorage.removeItem('authToken');  // Limpia el localStorage al cerrar sesión
    localStorage.removeItem('username');
    this.router.navigate(['/login']); // Redirige al login después de cerrar sesión
  }

  showView(view: string) {
    console.log('showView: Cambiando vista a:', view);
    this.selectedView = view;
  }

  onSubmit() {
    // Aquí puedes manejar la lógica de actualización del perfil.
    console.log('onSubmit: Perfil actualizado:', this.user);
    alert('Perfil actualizado con éxito');
  }
}

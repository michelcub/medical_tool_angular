
import { Component, Inject, OnInit } from '@angular/core';
import { enviroments } from '../../../enviroments/enviroments';
import { AuthService } from '../../services/auth/auth.service'; // Ajusta la ruta según sea necesario
import { Router } from '@angular/router'; // Ajusta la ruta según sea necesario
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userData: any = {};

  // Inyecta el AuthService en el constructor
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.checkAuthentication();
  }

  checkAuthentication() {
    // Usa el método isAuthenticated del servicio AuthService
    if (this.authService.isAuthenticated()) {
      console.log('El usuario está autenticado');
      console.log(this.authService.user);
      console.log(this.authService.isLogged);
      // Aquí puedes redirigir al usuario a otra página o realizar otra acción
    } else {
      console.log('El usuario no está autenticado');
      console.log(this.authService.user);
      console.log(this.authService.isLogged);
      // Manejo de usuarios no autenticados
    }
  }

  handleLogin(e: Event){
    const input = e.target as HTMLInputElement
    this.userData[input.name] = input.value.trim()
  }

  handleLoginSubmit(e: Event){
    e.preventDefault()
    console.log(this.userData)
    this.setLogin()
  }

  setLogin(){
    fetch(enviroments['route-api'] + '/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.userData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
    console.log(data)

      const user = data
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('userName', data.user_name)
      localStorage.setItem('userLastname', data.user_last_name)
      localStorage.setItem('user_rol', data.user_rol)
      localStorage.setItem('user_num_colegiado', data.user_num_colegiado)
      
      this.router.navigateByUrl('/calendar')
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });

    console.log('enviado')
  }

}

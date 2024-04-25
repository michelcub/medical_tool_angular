import { Component, OnInit } from '@angular/core';
import { enviroments } from '../../../enviroments/enviroments';
import { AuthService } from '../../services/auth/auth.service';



@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
  standalone: true
})
export class MyProfileComponent implements OnInit {
  user_id: any;
  file_selected: any;
  fileName: String = '';
  userName: String = '';
  userLastname: String = '';
  user_rol: String = '';
  user_num_colegiado:any;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user_id = localStorage.getItem('user');
    console.log(this.user_id);
    this.userName = this.authService.userName;
    this.userLastname = this.authService.userLastname;
    this.user_rol = this.authService.user_rol;
    this.user_num_colegiado = this.authService.user_num_colegiado;

    console.log(this.userName);
    console.log(this.userLastname);
    console.log(this.user_rol);
    console.log(this.user_num_colegiado);
    
    
  }

  onFileSelected(event: Event) {
    const files: any = event.target as HTMLInputElement;
    this.file_selected = files?.files[0];
  }
  
  
  
  saveRecetaXml() {
    if (!this.file_selected) {
      console.error('No hay archivo seleccionado');
      return;
    }
    fetch(enviroments['route-api'] + '/uploads/', {
      method: 'POST',
      body: (() => {
        const formData = new FormData();
        formData.append('pdffile', this.file_selected); // 'file' debe coincidir con el nombre que espera tu backend
        formData.append('user_id', this.user_id);
        return formData;
      })(),
      headers: {
        // No establecer 'Content-Type' aquí, dejar que FormData lo establezca automáticamente
        'Authorization': 'Bearer ' + localStorage.getItem('token'), // Asegúrate de que la ortografía de 'Authorization' es correcta
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log('Respuesta del servidor:', data);
      let message = data.message
      this.fileName = data.filename
      console.log(data)
    })
    .catch(error => {
      console.error('Error al subir el archivo:', error);
    });
  }


  asignarReceta() {
    if (!this.fileName) {
      console.error('No hay archivo seleccionado');
      return;
    }
    fetch(enviroments['route-api'] + '/recetas/', {
      method: 'POST',
      body: JSON.stringify({
        'user_id': this.user_id,
        'xmlfile': this.fileName
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'), // Asegúrate de que la ortografía de 'Authorization' es correcta
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log('Respuesta del servidor:', data);
      let message = data.message
    })
    .catch(error => {
      console.error('Error al subir el archivo:', error);
    });
  }


  logout() {
    this.authService.logout();
  }
}

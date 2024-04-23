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
  fileName: any;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user_id = localStorage.getItem('user');
    console.log(this.user_id);
  
    
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

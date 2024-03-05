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

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user_id = localStorage.getItem('user');
    console.log(this.user_id);
  
    
  }

  onFileSelected(event: Event) {
    const files: any = event.target as HTMLInputElement;
    this.file_selected = files?.files[0];
  }
  
  
  
  savePDF() {
    if (!this.file_selected) {
      console.error('No hay archivo seleccionado');
      return;
    }
    fetch(enviroments['route-api'] + '/upload/', {
      method: 'POST',
      body: (() => {
        const formData = new FormData();
        formData.append('file', this.file_selected); // 'file' debe coincidir con el nombre que espera tu backend
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
    })
    .catch(error => {
      console.error('Error al subir el archivo:', error);
    });
    
  
    console.log('PDF guardado');
  }


  logout() {
    this.authService.logout();
  }
}

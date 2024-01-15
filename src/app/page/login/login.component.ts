import { Component, OnInit } from '@angular/core';
import { enviroments } from '../../../enviroments/enviroments';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userData : any = {}
  constructor() { }

  ngOnInit() {
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
      //const user = JSON.parse(data)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      window.location.href = '/pacientes'
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });

    console.log('enviado')
  }

}

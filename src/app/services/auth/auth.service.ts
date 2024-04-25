import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged: boolean = false;
  user = ''
  userName = ''
  userLastname = ''
  user_rol = ''
  user_num_colegiado:any
  constructor(private router: Router) {
    if(localStorage.getItem('token')){
      this.isLogged = true
      this.user = localStorage.getItem('user')||''
      this.userName = localStorage.getItem('userName')||''
      this.userLastname = localStorage.getItem('userLastname')||''
      this.user_rol = localStorage.getItem('user_rol')||''
      this.user_num_colegiado = localStorage.getItem('user_num_colegiado')

    }
   }

  isAuthenticated() {
    return this.isLogged;
  }


  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.isLogged = false
    this.user = ''
    this.router.navigateByUrl('/login')
  }
}
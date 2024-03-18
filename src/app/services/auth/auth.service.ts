import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged: boolean = false;
  user = ''
  constructor(private router: Router) {
    if(localStorage.getItem('token')){
      this.isLogged = true
      this.user = localStorage.getItem('user')||''
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
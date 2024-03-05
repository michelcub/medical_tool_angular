import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard{
  constructor(private router: Router,) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = /* Tu lógica para verificar si el usuario está autenticado */;
    if (!isAuthenticated) {
      this.router.navigateByUrl('/login'); // Redirige al usuario al login si no está autenticado
      return false;
    }
    this.router.navigateByUrl('/calendar'); // Redirige al usuario a la página principal si está autenticado
    return true;
  }
}

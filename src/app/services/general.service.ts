import { Router } from '@angular/router';
import { UsuarioModel } from './../models/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  usuarioActivo: UsuarioModel;

  url = 'http://localhost/mantenimiento-imss/inicio/';

  constructor(private http: HttpClient, private router: Router) {
    this.usuarioActivo = new UsuarioModel(null, null, null, null, null);
  }

  setLocalStorage(variable: string, data: any): void {
    localStorage.setItem(variable, JSON.stringify(data));
  }

  getLocalStorage(variable: string): any {
    return localStorage.getItem(variable);
  }

  setSessionStorage(variable: string, data: any): void {
    sessionStorage.setItem(variable, JSON.stringify(data));
  }

  getSessionStorage(variable: string): any {
    return sessionStorage.getItem(variable);
  }

  /* Creo que se puede optimizar mas */
  setUsuarioActivo(usuario: UsuarioModel): void{
    this.usuarioActivo.idUsuario = usuario.idUsuario;
    this.usuarioActivo.usuario = usuario.usuario;
    this.usuarioActivo.rol = usuario.rol;
    this.usuarioActivo.empleado = usuario.empleado;
    this.setSessionStorage('usuario_activo', this.usuarioActivo);
  }

  iniciarSesion(usuario: UsuarioModel): any {
    return this.http.post(`${this.url}iniciar-sesion.php`, JSON.stringify(usuario));
  }

  cerrarSesion(): void{
    this.usuarioActivo = new UsuarioModel(null, null, null, null, null);
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigateByUrl('inicio-sesion');
  }

  /* Validar restricción de modulos */
  restringirEmpleado(): void {
    if (this.usuarioActivo !== undefined) {
      if (this.router.isActive('empleados', true) || this.router.isActive('departamentos', true)) {
        if (this.usuarioActivo.rol !== 'admin') {
          this.router.navigateByUrl('restringido');
        }
      }
    }
    else {
      this.router.navigateByUrl('restringido');
    }
  }
}

import { EspecialidadModel } from './../models/especialidad.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  url = 'http://localhost/mantenimiento-imss/departamentos/';

  constructor(private http: HttpClient) { }

  consultar_lista_deptos(): any{
    return this.http.get(`${this.url}consultar-lista-especialidades.php`);
  }

  eliminarEspecialidad(especialidad: EspecialidadModel): any{
    return this.http.post(`${this.url}eliminar-especialidades.php`, JSON.stringify(especialidad));
  }

  guardarNuevaEspecialidad(especialidad: any): any {
    return this.http.post(`${this.url}guardar-especialidad.php`, JSON.stringify(especialidad));
  }
}

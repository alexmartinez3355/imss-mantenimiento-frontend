import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  url = 'http://localhost/mantenimiento-imss/empleados/';

  constructor(private http: HttpClient) { }

  consultarListaEmpleados(): any {
    return this.http.get(`${this.url}consultar-lista-empleados.php`);
  }
}

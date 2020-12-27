import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmpleadoModel } from '../models/empleado.model';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  url = 'http://localhost/mantenimiento-imss/empleados/';

  constructor(private http: HttpClient) { }

  consultarListaEmpleados(): any {
    return this.http.get(`${this.url}consultar-lista-empleados.php`);
  }

  consultarListaPuestos(): any {
    return this.http.get(`${this.url}consultar-puestos-empleados.php`);
  }

  guardarNuevoEmpleado(empleado: any): any {
    return this.http.post(`${this.url}guardar-empleado.php`, JSON.stringify(empleado));
  }

  eliminarEmpleado(empleado: any): any {
    return this.http.post(`${this.url}eliminar-empleado.php`, JSON.stringify(empleado));
  }

  consultarEmpleado(empleado): any {
    return this.http.post(`${this.url}consultar-empleado-id.php`, JSON.stringify(empleado));
  }
}

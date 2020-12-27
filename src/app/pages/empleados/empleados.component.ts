import { Router } from '@angular/router';
import { EmpleadoModel } from './../../models/empleado.model';
import { EmpleadosService } from './../../services/empleados.service';
import { GeneralService } from './../../services/general.service';
import { Component, OnInit } from '@angular/core';
import { faTrashAlt, faPencilAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  /* Icons */
  IEditar = faPencilAlt;
  IEliminar = faTrashAlt;
  IBuscar = faSearch;

  

  listaEmpleados: EmpleadoModel[] = [];

  constructor(private empleadosS: EmpleadosService, private generalS: GeneralService, private router: Router) {
    this.generalS.restringirEmpleado();
  }

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(): void {
    this.empleadosS.consultarListaEmpleados().subscribe((datos: EmpleadoModel[]) => {
      if (Object.keys(datos).length >= 1) {
        Object.values(datos).forEach(empleado => {
          this.listaEmpleados.push(EmpleadoModel.instCargarEmpleados(empleado));
        });
      }
    });
  }

  eliminarEmpleado(empleado: EmpleadoModel, index: number): void {
    this.empleadosS.eliminarEmpleado(empleado).subscribe(datos => {
      if (Object.keys(datos).length >= 1) {
        this.listaEmpleados.splice(index, 1);
      }
    })
  }

  confirmarEliminarEmpleado(index: number): void{
    Swal.fire({
      title: 'Está a punto de eliminar a un empleado!',
      icon: 'warning',
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: `Si, eliminar`,
      cancelButtonText: `No`
    }).then((result) => {
      if (result.isDenied) {
        this.eliminarEmpleado(this.listaEmpleados[index], index);
      }
    });
  }

  editarEmpleado(idEmpleado: number): void {
    this.router.navigate(['empleados', 'editar-empleado', idEmpleado]);
  }
}

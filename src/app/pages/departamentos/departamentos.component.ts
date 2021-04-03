import { EspecialidadModel } from './../../models/especialidad.model';
import { DepartamentosService } from './../../services/departamentos.service';
import { GeneralService } from './../../services/general.service';
import { Component, OnInit } from '@angular/core';
import { faTrashAlt, faPencilAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {
  IEditar = faPencilAlt;
  IEliminar = faTrashAlt;
  IBuscar = faSearch;

  listaEspecialidades: EspecialidadModel[] = [];

  constructor(private generalS: GeneralService, private deptoS: DepartamentosService) {
    this.generalS.restringirEmpleado();
  }

  ngOnInit(): void {
    this.cargarDeptos();
  }

  cargarDeptos(): void{
    this.deptoS.consultar_lista_deptos().subscribe((datos: EspecialidadModel[]) => {
      if (Object.keys(datos).length >= 1) {
        Object.values(datos).forEach(depto => {
          this.listaEspecialidades.push(depto);
        })
      }
    })
    console.log(this.listaEspecialidades);
  }

  confirmarEliminarEspecialidad(index: number): void{
    Swal.fire({
      title: 'Esta a punto de eliminar una especialidad',
      icon: 'warning',
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: 'Si, eliminar',
      cancelButtonText: 'No'
    }).then((result) => {
      if(result.isDenied){
        this.eliminarEspecialidad(this.listaEspecialidades[index], index);
      }
    })
  }

  eliminarEspecialidad(especialidad: EspecialidadModel, index: number): void{
    this.deptoS.eliminarEspecialidad(especialidad).subscribe(datos => {
      if (Object.keys(datos).length >= 1){
        this.listaEspecialidades.splice(index, 1);
      }
    })
  }

  elitarEspecialidad(): void {
    
  }
}
import { EmpleadoModel } from './../../models/empleado.model';
import { EmpleadosService } from './../../services/empleados.service';
import { GeneralService } from './../../services/general.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faTrashAlt, faPencilAlt, faSearch } from '@fortawesome/free-solid-svg-icons';

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

  empleadoForm: FormGroup;

  listaEmpleados: EmpleadoModel[] = [];

  constructor(private empleadosS: EmpleadosService, private generalS: GeneralService, private fb: FormBuilder) {
    this.generalS.restringirEmpleado();
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  crearFormulario(): void {
    this.empleadoForm = this.fb.group({
      nombreEmpleado: ['', [Validators.required]],
      apellidoPaterno: ['', [Validators.required]],
      apellidoMaterno: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      matricula: ['', [Validators.required]],
      numPlaza: ['', [Validators.required]],
      puesto: ['', [Validators.required]]
    });
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
}

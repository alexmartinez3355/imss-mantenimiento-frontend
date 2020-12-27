import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoModel } from './../../../models/empleado.model';
import { PuestoEmpleadoModel } from './../../../models/puesto-empleado.model';
import { EmpleadosService } from './../../../services/empleados.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.css']
})
export class EditarEmpleadoComponent implements OnInit {

  empleadoForm: FormGroup;

  listaPuestos: PuestoEmpleadoModel[] = [];

  datosEmpleado: EmpleadoModel;

  empleado = {
    idEmpleado: ''
  }

  puesto: string;

  constructor( private activateRoute: ActivatedRoute, private empleadoS: EmpleadosService, private fb: FormBuilder, private router: Router) {
    

    this.activateRoute.params.subscribe(parametros => {
      this.empleado.idEmpleado = parametros['id_empleado'];

    });
    this.formularioEmpleado();
    
  }

  ngOnInit(): void {
    this.cargarDatosEmpleado();
  }

  cargarPuestos(): void {
    this.empleadoS.consultarListaPuestos().subscribe((datos: PuestoEmpleadoModel[]) => {
      if (Object.keys(datos).length >= 1) {
        this.listaPuestos = datos;
        this.listaPuestos = this.listaPuestos.filter(puesto => puesto.nombrePuesto !== this.puesto);
      }
    });
  }

  cargarDatosEmpleado(): void {
    
    this.empleadoS.consultarEmpleado(this.empleado).subscribe((datos: EmpleadoModel) => {
      this.datosEmpleado = EmpleadoModel.instCargarEmpleados(datos);
      this.mostrarDatosFormulario(this.datosEmpleado);
      this.mostrarPuestoEmpleado(this.datosEmpleado);
      this.cargarPuestos();
    });
  }

  formularioEmpleado(): void {
    this.empleadoForm = this.fb.group({
      nombreEmpleado: ['', [Validators.required]],
      apellidoPaterno: [''],
      apellidoMaterno: [''],
      edad: [''],
      fechaNacimiento: [''],
      sexo: [''],
      matricula: [''],
      numPlaza: [''],
      puesto: ['']
    });
  }

  mostrarDatosFormulario(empleado: EmpleadoModel): void {
    this.empleadoForm.get('nombreEmpleado').setValue(this.datosEmpleado.nombreEmpleado);
    this.empleadoForm.get('apellidoPaterno').setValue(this.datosEmpleado.apellidoPaterno);
    this.empleadoForm.get('apellidoMaterno').setValue(this.datosEmpleado.apellidoMaterno);
    this.empleadoForm.get('edad').setValue(this.datosEmpleado.edad);
    this.empleadoForm.get('fechaNacimiento').setValue(this.datosEmpleado.fechaNacimiento);
    this.empleadoForm.get('sexo').setValue(this.datosEmpleado.sexo);
    this.empleadoForm.get('matricula').setValue(this.datosEmpleado.matricula);
    this.empleadoForm.get('numPlaza').setValue(this.datosEmpleado.numPlaza);
    /* this.empleadoForm.get('puesto').setValue(this.datosEmpleado.puesto.nombrePuesto); */
  }

  mostrarPuestoEmpleado(empleado: EmpleadoModel): void{
    this.puesto = empleado.puesto.nombrePuesto;
    this.empleadoForm.get('puesto').setValue(this.puesto);
  }

  formatearSelectPuesto(): void{
    this.listaPuestos = this.listaPuestos.filter(puesto => puesto.nombrePuesto !== this.puesto);
  }

  actualizar(): void {
    if (this.empleadoForm.invalid) {
      return Object.values(this.empleadoForm.controls).forEach(control => {
        control.markAllAsTouched();
        console.log('Marca mal un elemento');
      });
    }
  }

  cancelar(): void {
    this.router.navigateByUrl('empleados');
  }
}

import { UsuarioModel } from './../../../models/usuario.model';
import { Router } from '@angular/router';
import { EmpleadoModel } from './../../../models/empleado.model';
import { PuestoEmpleadoModel } from './../../../models/puesto-empleado.model';
import { EmpleadosService } from './../../../services/empleados.service';
import { GeneralService } from './../../../services/general.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-empleado',
  templateUrl: './nuevo-empleado.component.html',
  styleUrls: ['./nuevo-empleado.component.css']
})
export class NuevoEmpleadoComponent implements OnInit {

  empleadoForm: FormGroup;

  listaPuestos: PuestoEmpleadoModel[] = [];

  nuevoUsuario = {
    userHabilitado: false,
    usuario: null,
    empleado: null
  }

  indicadorPuesto: boolean;
  indicadorSexo: boolean;
  indicadorRol: boolean;

  indicadorNuevoUsuario: boolean;

  constructor(private fb: FormBuilder, private generalS: GeneralService, private empleadoS: EmpleadosService, private router: Router) {
    this.indicadorSexo = true;
    this.indicadorPuesto = true;
    this.indicadorRol = true;
    this.indicadorNuevoUsuario = false;
    this.generalS.restringirEmpleado();
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.cargarPuestos();
    this.mostrarIndicadorPuesto();
    this.mostrarIndicadorSexo();
  }

  guardarEmpleado(): void {
    console.log('Entro al metodo');
    if (this.empleadoForm.invalid) {
      return Object.values(this.empleadoForm.controls).forEach(control => {
        control.markAllAsTouched();
        console.log('Marca mal un elemento');
      });
    }
    if (this.indicadorNuevoUsuario) {
      const p: PuestoEmpleadoModel[] = this.listaPuestos.filter(puesto => puesto.nombrePuesto === this.empleadoForm.get('puesto').value);
      const puestoSeleccionado: PuestoEmpleadoModel = p[0];
      let nuevoUsuario: UsuarioModel;
      nuevoUsuario = UsuarioModel.instUsuarioNuevo(this.empleadoForm.get('datosUsuario').value, puestoSeleccionado, this.empleadoForm.value);

      this.nuevoUsuario.userHabilitado = true;
      this.nuevoUsuario.usuario = nuevoUsuario;
      this.nuevoUsuario.empleado = null;

      console.log('Nuevo usuario: ', this.nuevoUsuario);
      this.empleadoS.guardarNuevoEmpleado(this.nuevoUsuario).subscribe(datos => {
        console.log(datos);
        this.usuarioNuevoGuardado();
        this.router.navigateByUrl('empleados');
      });
    }
    else {
      const p: PuestoEmpleadoModel[] = this.listaPuestos.filter(puesto => puesto.nombrePuesto === this.empleadoForm.get('puesto').value);
      const puestoSeleccionado: PuestoEmpleadoModel = p[0];
      let nuevoEmpleado: EmpleadoModel;
      nuevoEmpleado = EmpleadoModel.instEmpleadoNuevo(this.empleadoForm.value, puestoSeleccionado);

      this.nuevoUsuario.userHabilitado = false;
      this.nuevoUsuario.usuario = null;
      this.nuevoUsuario.empleado = nuevoEmpleado;

      console.log('Nuevo usuario: ', this.nuevoUsuario);
      this.empleadoS.guardarNuevoEmpleado(this.nuevoUsuario).subscribe(datos => {
        console.log(datos);
        this.empleadoNuevoGuardado();
        this.router.navigateByUrl('empleados');
      });
    }
  }

  volver(): void {
    this.router.navigateByUrl('empleados');
  }

  crearFormulario(): void {
    this.empleadoForm = this.fb.group({
      nombreEmpleado: ['', [Validators.required]],
      apellidoPaterno: ['', [Validators.required]],
      apellidoMaterno: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      edad: ['', [Validators.required, Validators.min(15), Validators.max(99)]],
      fechaNacimiento: ['', [Validators.required]],
      matricula: ['', []],
      numPlaza: ['', [Validators.required]],
      puesto: ['', [Validators.required]]
    });
  }

  cargarPuestos(): void {
    this.empleadoS.consultarListaPuestos().subscribe((datos: PuestoEmpleadoModel[]) => {
      if (Object.keys(datos).length >= 1) {
        this.listaPuestos = datos;
      }
    });
  }

  mostrarIndicadorPuesto(): void {
    this.empleadoForm.get('puesto').valueChanges.subscribe(datos => {
      this.indicadorPuesto = false;
    });
  }

  mostrarIndicadorRol(): void {
    this.empleadoForm.get('datosUsuario.rol').valueChanges.subscribe(datos => {
      this.indicadorRol = false;
    })
  }

  mostrarIndicadorSexo(): void {
    this.empleadoForm.get('sexo').valueChanges.subscribe(datos => {
      this.indicadorSexo = false;
    });
  }

  mostrarNuevoUsuario(): void {
    
    if (this.indicadorNuevoUsuario) {
      this.empleadoForm.removeControl('datosUsuario');
      this.indicadorNuevoUsuario = false;
    }
    else {
      this.empleadoForm.addControl('datosUsuario', this.fb.group({
        usuario: ['', Validators.required],
        passUsuario: ['', Validators.required],
        rol: ['', Validators.required]
      }))
      this.indicadorNuevoUsuario = true;
    }
    this.mostrarIndicadorRol();
  }

  /* Validación de campos del formulario */
  get nombreNoValido(): boolean {
    return this.empleadoForm.get('nombreEmpleado').invalid && this.empleadoForm.get('nombreEmpleado').touched;
  }

  get nombreValido(): boolean {
    return this.empleadoForm.get('nombreEmpleado').valid && this.empleadoForm.get('nombreEmpleado').touched;
  }

  get apellidoPNoValido(): boolean {
    return this.empleadoForm.get('apellidoPaterno').invalid && this.empleadoForm.get('apellidoPaterno').touched;
  }

  get apellidoPValido(): boolean {
    return this.empleadoForm.get('apellidoPaterno').valid && this.empleadoForm.get('apellidoPaterno').touched;
  }

  get apellidoMNoValido(): boolean {
    return this.empleadoForm.get('apellidoMaterno').invalid && this.empleadoForm.get('apellidoMaterno').touched;
  }

  get apellidoMValido(): boolean {
    return this.empleadoForm.get('apellidoMaterno').valid && this.empleadoForm.get('apellidoMaterno').touched;
  }

  get sexoNoValido(): boolean {
    return this.empleadoForm.get('sexo').invalid && this.empleadoForm.get('sexo').touched;
  }

  get sexoValido(): boolean {
    return this.empleadoForm.get('sexo').valid && this.empleadoForm.get('sexo').touched;
  }

  get edadNoValido(): boolean {
    return this.empleadoForm.get('edad').invalid && this.empleadoForm.get('edad').touched;
  }

  get edadValido(): boolean {
    return this.empleadoForm.get('edad').valid && this.empleadoForm.get('edad').touched;
  }

  get fechaNacimientoNoValido(): boolean {
    return this.empleadoForm.get('fechaNacimiento').invalid && this.empleadoForm.get('fechaNacimiento').touched;
  }

  get fechaNacimientoValido(): boolean {
    return this.empleadoForm.get('fechaNacimiento').valid && this.empleadoForm.get('fechaNacimiento').touched;
  }

  get matriculaNoValido(): boolean {
    return this.empleadoForm.get('matricula').invalid && this.empleadoForm.get('matricula').touched;
  }

  get matriculaValido(): boolean {
    return this.empleadoForm.get('matricula').valid && this.empleadoForm.get('matricula').touched;
  }

  get numPlazaNoValido(): boolean {
    return this.empleadoForm.get('numPlaza').invalid && this.empleadoForm.get('numPlaza').touched;
  }

  get numPlazaValido(): boolean {
    return this.empleadoForm.get('numPlaza').valid && this.empleadoForm.get('numPlaza').touched;
  }

  get puestoNoValido(): boolean {
    return this.empleadoForm.get('puesto').invalid && this.empleadoForm.get('puesto').touched;
  }

  get puestoValido(): boolean {
    return this.empleadoForm.get('puesto').valid && this.empleadoForm.get('puesto').touched;
  }

  get usuarioNoValido(): boolean {
    return this.empleadoForm.get('datosUsuario').get('usuario').invalid && this.empleadoForm.get('datosUsuario').get('usuario').touched;
  }

  get usuarioValido(): boolean {
    return this.empleadoForm.get('datosUsuario').get('usuario').valid && this.empleadoForm.get('datosUsuario').get('usuario').touched;
  }

  get passUsuarioNoValido(): boolean {
    return this.empleadoForm.get('datosUsuario').get('passUsuario').invalid && this.empleadoForm.get('datosUsuario').get('passUsuario').touched;
  }

  get passUsuarioValido(): boolean {
    return this.empleadoForm.get('datosUsuario').get('passUsuario').valid && this.empleadoForm.get('datosUsuario').get('passUsuario').touched;
  }

  usuarioNuevoGuardado(): void {
    Swal.fire({
      text: 'Usuario guardado correctamente',
      timer: 2000
    });
  }

  empleadoNuevoGuardado(): void {
    Swal.fire({
      text: 'Empleado guardado correctamente',
      timer: 2000
    });
  }
}

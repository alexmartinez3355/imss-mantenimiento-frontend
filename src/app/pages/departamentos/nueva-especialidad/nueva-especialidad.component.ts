import { EspecialidadModel } from './../../../models/especialidad.model';
import { DepartamentosService } from './../../../services/departamentos.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-especialidad',
  templateUrl: './nueva-especialidad.component.html',
  styleUrls: ['./nueva-especialidad.component.css']
})
export class NuevaEspecialidadComponent implements OnInit {

  especialidadForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private deptoS: DepartamentosService) {
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  crearFormulario(): void {
    this.especialidadForm = this.fb.group({
      especialidad: ['', Validators.required]
    })
  }

  guardarEspecialidad(): void {
    if (this.especialidadForm.invalid) {
      return Object.values(this.especialidadForm.controls).forEach(control => {
        control.markAllAsTouched();
      });
    }

    let nuevaEspecialidad: EspecialidadModel = {
      idEspecialidad: 0,
      nombreEspecialidad: ''
    };
    nuevaEspecialidad.nombreEspecialidad = this.especialidadForm.get('especialidad').value;

    this.deptoS.guardarNuevaEspecialidad(nuevaEspecialidad).subscribe(data => {
      this.especialidadNuevoGuardado();
      this.router.navigateByUrl('departamentos');
    })
  }

  volver(): void {
    this.router.navigateByUrl('departamentos');
  }

  get especialidadNoValido(): boolean {
    return this.especialidadForm.get('especialidad').invalid && this.especialidadForm.get('especialidad').touched;
  }

  get especialidadValido(): boolean {
    return this.especialidadForm.get('especialidad').valid && this.especialidadForm.get('especialidad').touched;
  }

  especialidadNuevoGuardado(): void {
    Swal.fire({
      text: 'Especialidad guardada correctamente',
      timer: 2000
    });
  }
}

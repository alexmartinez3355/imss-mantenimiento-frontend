import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-orden-servicio',
  templateUrl: './orden-servicio.component.html',
  styleUrls: ['./orden-servicio.component.css']
})
export class OrdenServicioComponent implements OnInit {

  /* ordenServicioForm: FormGroup; */

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  /* createForm(): void {
    this.ordenServicioForm = this.fb.group({
      delegacion: [''],
      unidad: [''],
      claveUnica: [],
    });
  } */
}


/* idOrdenServicio?: number;
    delegacion?: string;
    unidad?: string;
    claveUnica?: string;
    jcu?: string;
    nombreEquipoSistema?: string;
    idEquipoSistema?: string;
    ubicacionFisicaEquipoSistema?: string;
    yearId?: number;
    monthId?: number;
    numOrderId?: number;
    fechaEmicion?: string;
    condicionEncontrado?: string;
    partida?: string;
    descripcionServicio?: string;
    condicionFinal?: string;
    recomendaciones?: string;
    elaboro?: UsuarioModel;
    empleadoEntrega?: EmpleadoModel;
    empleadoRecibe?: EmpleadoModel;
    especialidad?: EspecialidadModel; */
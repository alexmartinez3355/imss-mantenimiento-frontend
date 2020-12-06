import { UsuarioModel } from './usuario.model';
import { EspecialidadModel } from './especialidad.model';
import { EmpleadoModel } from './empleado.model';
export class OrdenServicioModel {
    idOrdenServicio?: number;
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
    especialidad?: EspecialidadModel;

    constructor(){
    }
}
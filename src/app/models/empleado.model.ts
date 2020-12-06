import { PuestoEmpleadoModel } from './puesto-empleado.model';
export class EmpleadoModel {
    idEmpleado?: number;
    nombreEmpleado?: string;
    apellidoPaterno?: string;
    apellidoMaterno?: string;
    sexo?: string;
    edad?: number;
    fechaNacimiento?: string;
    matricula?: string;
    numPlaza?: string;
    puesto?: PuestoEmpleadoModel;

    constructor(
        idEmpleado: number, nombreEmpleado: string, apellidoPaterno: string, apellidoMaterno: string,
        sexo: string, edad: number, fechaNacimiento: string,
        matricula: string, numPlaza: string, puesto: PuestoEmpleadoModel) {
        this.idEmpleado = idEmpleado;
        this.nombreEmpleado = nombreEmpleado;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.sexo = sexo;
        this.edad = edad;
        this.fechaNacimiento = fechaNacimiento;
        this.matricula = matricula;
        this.numPlaza = numPlaza;
        this.puesto = puesto;
    }

    static instEmpleadoLoginRespuesta(obj: EmpleadoModel): any {
        return new EmpleadoModel(
            obj.idEmpleado,
            obj.nombreEmpleado,
            obj.apellidoPaterno,
            obj.apellidoMaterno,
            null,
            null,
            null,
            null,
            null,
            null
        );
    }

    static instEmpleadoLoginPeticion(obj: EmpleadoModel): any {
        return new EmpleadoModel(
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        );
    }

    static instCargarEmpleados(obj: EmpleadoModel): any {
        return new EmpleadoModel(
            obj.idEmpleado,
            obj.nombreEmpleado,
            obj.apellidoPaterno,
            obj.apellidoMaterno,
            obj.sexo,
            obj.edad,
            obj.fechaNacimiento,
            obj.matricula,
            obj.numPlaza,
            PuestoEmpleadoModel.instPuestoNuevoEmpleado(obj.puesto)
        );
    }

    static instEmpleadoNuevo(obj: EmpleadoModel): any {
        return new EmpleadoModel(
            null,
            obj.nombreEmpleado,
            obj.apellidoPaterno,
            obj.apellidoMaterno,
            obj.sexo,
            obj.edad,
            obj.fechaNacimiento,
            obj.matricula,
            obj.numPlaza,
            PuestoEmpleadoModel.instPuestoNuevoEmpleado(obj.puesto)
        );
    }

    getNombreCompleto(): string{
        return `${this.nombreEmpleado} ${this.apellidoPaterno} ${this.apellidoMaterno}`;
    }
}

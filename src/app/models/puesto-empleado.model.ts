export class PuestoEmpleadoModel {
    idPuesto?: number;
    nombrePuesto?: string;

    constructor(idPuesto: number, nombrePuesto: string){
        this.idPuesto = idPuesto;
        this.nombrePuesto = nombrePuesto;
    }

    static instPuestoEmpleadoNuevo(obj: PuestoEmpleadoModel): any {
        return new PuestoEmpleadoModel(
            null,
            obj.nombrePuesto
        );
    }

    static instPuestoNuevoEmpleado(obj: PuestoEmpleadoModel): any {
        return new PuestoEmpleadoModel(
            obj.idPuesto,
            obj.nombrePuesto
        );
    }
}

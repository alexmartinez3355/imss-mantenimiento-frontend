import { EmpleadoModel } from './empleado.model';
export class UsuarioModel {
    idUsuario?: number;
    usuario?: string;
    passUsuario?: string;
    rol?: string;
    empleado?: EmpleadoModel;

    constructor(id: number, usuario: string, passUsuario: string, rol: string, empleado: EmpleadoModel) {
        this.idUsuario = id;
        this.usuario = usuario;
        this.passUsuario = passUsuario;
        this.rol = rol;
        this.empleado = empleado;
    }

    static instUsuarioLoginPeticion(obj: UsuarioModel): any {
        return new UsuarioModel(
            null,
            obj.usuario,
            obj.passUsuario,
            '',
            EmpleadoModel.instEmpleadoLoginPeticion(obj.empleado)
        );
    }

    static instUsuarioLoginRespuesta(obj: UsuarioModel): any {
        return new UsuarioModel(
            obj.idUsuario,
            obj.usuario,
            null,
            obj.rol,
            EmpleadoModel.instEmpleadoLoginRespuesta(obj.empleado)
        );
    }

    static instUsuarioNuevo(obj: UsuarioModel): any {
        return new UsuarioModel(
            null,
            obj.usuario,
            obj.passUsuario,
            obj.rol,
            obj.empleado
        );
    }
}

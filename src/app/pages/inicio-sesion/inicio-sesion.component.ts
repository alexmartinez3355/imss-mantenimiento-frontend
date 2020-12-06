import { UsuarioModel } from './../../models/usuario.model';
import { GeneralService } from './../../services/general.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUserCircle, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {

  /* Icons */
  usuarioI = faUserCircle;
  passI = faUnlockAlt;

  loginForm: FormGroup;

  usuarioLogin: UsuarioModel;

  constructor(private fb: FormBuilder, private router: Router, private generalS: GeneralService) {
    this.crearForm();
  }

  ngOnInit(): void {
  }

  crearForm(): void {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required]],
      passUsuario: ['', [Validators.required]]
    });
  }

  iniciarSesion(): void {
    if (this.loginForm.invalid) {
      return Object.values(this.loginForm.controls).forEach(control => {
        control.markAllAsTouched();
      });
    }
    this.usuarioLogin = new UsuarioModel(null, null, null, null, null);
    this.usuarioLogin.usuario = this.loginForm.get('usuario').value;
    this.usuarioLogin.passUsuario = this.loginForm.get('passUsuario').value;
    const usuario: UsuarioModel = UsuarioModel.instUsuarioLoginPeticion(this.usuarioLogin);
    this.generalS.iniciarSesion(usuario).subscribe((datos: UsuarioModel) => {
      if (Object.keys(datos).length >= 1) {
        this.usuarioLogin = UsuarioModel.instUsuarioLoginRespuesta(datos);
        this.usuarioEncontrado(this.usuarioLogin);
        this.generalS.setUsuarioActivo(this.usuarioLogin);
        this.router.navigateByUrl('inicio');
      }
    }, (error) => {
      this.loginForm.reset();
      if (error.status === 0) {
        return this.servicorNoDisponible();
      }

      if (error.status === 200) {
        return this.credencialesIncorrectas();
      }
    }
    );
  }

  get usuarioNoValido(): boolean {
    return this.loginForm.get('usuario').invalid && this.loginForm.get('usuario').touched;
  }

  get usuarioValido(): boolean {
    return this.loginForm.get('usuario').valid && this.loginForm.get('usuario').touched;
  }

  get passNoValido(): boolean {
    return this.loginForm.get('passUsuario').invalid && this.loginForm.get('passUsuario').touched;
  }

  get passValido(): boolean {
    return this.loginForm.get('passUsuario').valid && this.loginForm.get('passUsuario').touched;
  }

  servicorNoDisponible(): void{
    Swal.fire({
      icon: 'error',
      title: 'Servidor no disponible',
      text: 'El servidor no se encuentra disponible, intentalo mas tarde.'
    });
  }

  credencialesIncorrectas(): void {
    Swal.fire({
      icon: 'question',
      title: 'Datos incorrectos',
      text: '¿Seguro que ese es tu usuario y contraseña?'
    });
  }

  usuarioEncontrado(usuario: UsuarioModel): void {
    Swal.fire({
      icon: 'success',
      text: `Bienvenido ${usuario.empleado.nombreEmpleado} ${usuario.empleado.apellidoPaterno} ${usuario.empleado.apellidoMaterno}`
    });
  }
}

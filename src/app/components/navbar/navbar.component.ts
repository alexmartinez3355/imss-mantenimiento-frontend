import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { UsuarioModel } from './../../models/usuario.model';
import { GeneralService } from './../../services/general.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuarioActivo: UsuarioModel;
  componente: string;

  constructor(public generalS: GeneralService, private router: Router) {
    this.verificarUsuarioActivo();
    this.mostrarModulo();
  }

  ngOnInit(): void {
  }

  verificarUsuarioActivo(): void {
    if (sessionStorage.getItem('usuario_activo')) {
      this.usuarioActivo = UsuarioModel.instUsuarioLoginRespuesta(JSON.parse(this.generalS.getSessionStorage('usuario_activo')));
      this.generalS.setUsuarioActivo(this.usuarioActivo);
    }
  }

  mostrarModulo(): void{
    this.router.events
  .subscribe(
    (event: NavigationEvent) => {
      if(event instanceof NavigationStart) {
        if (event.url === '/orden-servicio') {
          this.componente = '/ordenes de servicio'.toLocaleUpperCase();
        }
        else if (event.url === '/empleados/nuevo-empleado') {
          this.componente = '/empleados/nuevo empleado'.toLocaleUpperCase();
        }
        else if (event.url.includes('/empleados/editar-empleado')) {
          this.componente = '/empleados/editar empleado'.toLocaleUpperCase();
        }
        else if (event.url === '/restringido') {
          this.componente = '/error'.toLocaleUpperCase();
        }
        else {
          this.componente = event.url.toLocaleUpperCase();
        }
      }
    });
  }
}

import { GeneralService } from './../../services/general.service';
import { Component, OnInit } from '@angular/core';
import { faTasks, faUsers, faHospitalAlt, faPowerOff, faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  /* Iconos */
  IOrdenServicio = faTasks;
  IEmpleados = faUsers;
  IDepartamentos = faHospitalAlt;
  ICerrarSesion = faPowerOff;
  IConfiguracion = faCog;

  constructor(public generalS: GeneralService) { }

  ngOnInit(): void {
  }

  cerrarSesion(): void{
    this.generalS.cerrarSesion();
  }
}

import { RestringidoComponent } from './pages/restringido/restringido.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { DepartamentosComponent } from './pages/departamentos/departamentos.component';
import { OrdenServicioComponent } from './pages/orden-servicio/orden-servicio.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { InicioSesionComponent } from './pages/inicio-sesion/inicio-sesion.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'inicio-sesion'
  },
  {
    path: 'inicio', component: InicioComponent
  },
  {
    path: 'inicio-sesion', component: InicioSesionComponent
  },
  {
    path: 'empleados', component: EmpleadosComponent
  },
  {
    path: 'orden-servicio', component: OrdenServicioComponent
  },
  {
    path: 'departamentos', component: DepartamentosComponent
  },
  {
    path: 'configuracion', component: ConfiguracionComponent
  },
  {
    path: 'restringido', component: RestringidoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

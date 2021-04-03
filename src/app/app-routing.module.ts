import { NuevaEspecialidadComponent } from './pages/departamentos/nueva-especialidad/nueva-especialidad.component';
import { EditarEmpleadoComponent } from './pages/empleados/editar-empleado/editar-empleado.component';
import { NuevoEmpleadoComponent } from './pages/empleados/nuevo-empleado/nuevo-empleado.component';
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
  },
  {
    path: 'empleados/nuevo-empleado', component: NuevoEmpleadoComponent
  },
  {
    path: 'empleados/editar-empleado/:id_empleado', component: EditarEmpleadoComponent
  },
  {
    path: 'departamentos/nueva-especialidad', component: NuevaEspecialidadComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* Modules */
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from './components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Componenst */
import { AppComponent } from './app.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { DepartamentosComponent } from './pages/departamentos/departamentos.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { InicioSesionComponent } from './pages/inicio-sesion/inicio-sesion.component';
import { OrdenServicioComponent } from './pages/orden-servicio/orden-servicio.component';
import { RestringidoComponent } from './pages/restringido/restringido.component';
import { NuevoEmpleadoComponent } from './pages/empleados/nuevo-empleado/nuevo-empleado.component';
import { EditarEmpleadoComponent } from './pages/empleados/editar-empleado/editar-empleado.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfiguracionComponent,
    DepartamentosComponent,
    EmpleadosComponent,
    InicioComponent,
    InicioSesionComponent,
    OrdenServicioComponent,
    RestringidoComponent,
    NuevoEmpleadoComponent,
    EditarEmpleadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

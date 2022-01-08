import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { ClienteEdicionComponent } from './pages/cliente/cliente-edicion/cliente-edicion/cliente-edicion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChequesComponent } from './pages/cheques/cheques.component';
import { ChequesEdicionComponent } from './pages/cheques/cheques-edicion/cheques-edicion.component';
import { CuentasComponent } from './pages/cuentas/cuentas.component';
import { CuentasEdicionComponent } from './pages/cuentas/cuentas-edicion/cuentas-edicion.component';
import { CuentaBancariaEdicionComponent } from './pages/cuentaBancaria/cuenta-bancaria-edicion/cuenta-bancaria-edicion.component';
import { CuentaBancariaComponent } from './pages/cuentaBancaria/cuenta-bancaria.component';
import { ChequeraComponent } from './pages/chequera/chequera.component';
import { ChequeraEdicionComponent } from './pages/chequera/chequera-edicion/chequera-edicion.component';
import { TiposCuentaComponent } from './pages/tipos-cuenta/tipos-cuenta.component';
import { TiposCuentaEdicionComponent } from './pages/tipos-cuenta/tipos-cuenta-edicion/tipos-cuenta-edicion.component';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    ClienteEdicionComponent,
    CuentaBancariaComponent,
    CuentaBancariaEdicionComponent,
    ChequesComponent,
    ChequesEdicionComponent,
    CuentasComponent,
    CuentasEdicionComponent,
    ChequeraComponent,
    ChequeraEdicionComponent,
    TiposCuentaComponent,
    TiposCuentaEdicionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChequeraEdicionComponent } from './pages/chequera/chequera-edicion/chequera-edicion.component';
import { ChequeraComponent } from './pages/chequera/chequera.component';
import { ChequesEdicionComponent } from './pages/cheques/cheques-edicion/cheques-edicion.component';
import { ChequesComponent } from './pages/cheques/cheques.component';
import { ClienteEdicionComponent } from './pages/cliente/cliente-edicion/cliente-edicion/cliente-edicion.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { CuentaBancariaEdicionComponent } from './pages/cuentaBancaria/cuenta-bancaria-edicion/cuenta-bancaria-edicion.component';
import { CuentaBancariaComponent } from './pages/cuentaBancaria/cuenta-bancaria.component';
import { TiposCuentaEdicionComponent } from './pages/tipos-cuenta/tipos-cuenta-edicion/tipos-cuenta-edicion.component';
import { TiposCuentaComponent } from './pages/tipos-cuenta/tipos-cuenta.component';

const routes: Routes = [
  { path: 'clientes', component: ClienteComponent, children: [
      { path: 'nuevo', component: ClienteEdicionComponent },
      { path: 'edicion/:id', component: ClienteEdicionComponent }
    ]
  },
  { path: 'cuentas', component: CuentaBancariaComponent, children: [
      { path: 'nuevo', component: CuentaBancariaEdicionComponent },
      { path: 'edicion/:id', component: CuentaBancariaEdicionComponent }
    ]
  },
  { path: 'cheques', component: ChequesComponent, children: [
      { path: 'nuevo', component: ChequesEdicionComponent },
      { path: 'edicion/:id', component: ChequesEdicionComponent }
    ]
  },
  { path: 'chequeras', component: ChequeraComponent, children: [
      { path: 'nuevo', component: ChequeraEdicionComponent },
      { path: 'edicion/:id', component: ChequeraEdicionComponent }
    ]
  },
  { path: 'tipos', component: TiposCuentaComponent, children: [
    { path: 'nuevo', component: TiposCuentaEdicionComponent },
    { path: 'edicion/:id', component: TiposCuentaEdicionComponent }
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

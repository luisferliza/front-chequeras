import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HOST } from '../_shared/var.constants';
import { Subject } from 'rxjs';
import { TipoCuenta } from '../_model/tipoCuenta';

@Injectable({
  providedIn: 'root'
})
export class TipoCuentaService {

  tipoCuentaCambio = new Subject<TipoCuenta[]>();
  mensajeCambio = new Subject<string>();

  url: string = HOST;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<TipoCuenta[]>(`${this.url}/tiposcuenta`);
  }

  listarPorId(idTipoCuenta: number) {
    return this.http.get<TipoCuenta>(`${this.url}/tiposcuenta/${idTipoCuenta}`);
  }

  registrar(tipoCuenta: TipoCuenta) {
    return this.http.post(`${this.url}/tiposcuenta`, tipoCuenta);
  }

  modificar(tipoCuenta: TipoCuenta) {
    return this.http.put(`${this.url}/tiposcuenta`, tipoCuenta);
  }

  eliminar(idTipoCuenta: number) {
    return this.http.delete(`${this.url}/tiposcuenta/${idTipoCuenta}`);
  }
}

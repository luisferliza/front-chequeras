import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HOST } from '../_shared/var.constants';
import { Subject } from 'rxjs';
import { CuentaBancaria } from '../_model/cuentaBancaria';

@Injectable({
  providedIn: 'root'
})
export class CuentaBancariaService {

  cuentaBancariaCambio = new Subject<CuentaBancaria[]>();
  mensajeCambio = new Subject<string>();

  url: string = HOST;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<CuentaBancaria[]>(`${this.url}/cuentas`);
  }

  listarPorId(idCuentaBancaria: number) {
    return this.http.get<CuentaBancaria>(`${this.url}/cuentas/${idCuentaBancaria}`);
  }

  registrar(cuenta: CuentaBancaria) {
    return this.http.post(`${this.url}/cuentas`, cuenta);
  }

  modificar(cuenta: CuentaBancaria) {
    return this.http.put(`${this.url}/cuentas`, cuenta);
  }

  eliminar(idCuentaBancaria: number) {
    return this.http.delete(`${this.url}/cuentas/${idCuentaBancaria}`);
  }
}

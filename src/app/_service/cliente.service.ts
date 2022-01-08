import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Cliente } from '../_model/cliente';
import { HOST } from '../_shared/var.constants';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  clienteCambio = new Subject<Cliente[]>();
  mensajeCambio = new Subject<string>();

  url: string = HOST;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Cliente[]>(`${this.url}/clientes`);
  }

  listarPorId(idCliente: number) {
    return this.http.get<Cliente>(`${this.url}/clientes/${idCliente}`);
  }

  registrar(cliente: Cliente) {
    return this.http.post(`${this.url}/clientes`, cliente);
  }

  modificar(cliente: Cliente) {
    return this.http.put(`${this.url}/clientes`, cliente);
  }

  eliminar(idCliente: number) {
    return this.http.delete(`${this.url}/clientes/${idCliente}`);
  }
}

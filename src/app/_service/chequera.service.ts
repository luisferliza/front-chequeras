import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HOST } from '../_shared/var.constants';
import { Subject } from 'rxjs';
import { Chequera } from '../_model/chequera';

@Injectable({
  providedIn: 'root'
})
export class ChequeraService {

  chequeraCambio = new Subject<Chequera[]>();
  mensajeCambio = new Subject<string>();

  url: string = HOST;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Chequera[]>(`${this.url}/chequeras`);
  }

  listarPorId(idChequera: number) {
    return this.http.get<Chequera>(`${this.url}/chequeras/${idChequera}`);
  }

  registrar(chequera: Chequera) {
    return this.http.post(`${this.url}/chequeras`, chequera);
  }

  modificar(chequera: Chequera) {
    return this.http.put(`${this.url}/chequeras`, chequera);
  }

  eliminar(idChequera: number) {
    return this.http.delete(`${this.url}/chequeras/${idChequera}`);
  }
}

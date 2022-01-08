import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HOST } from '../_shared/var.constants';
import { Subject } from 'rxjs';
import { Cheque } from '../_model/cheque';

@Injectable({
  providedIn: 'root'
})
export class ChequeService {

  chequeCambio = new Subject<Cheque[]>();
  mensajeCambio = new Subject<string>();

  url: string = HOST;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Cheque[]>(`${this.url}/cheques`);
  }

  listarPorId(idCheque: number) {
    return this.http.get<Cheque>(`${this.url}/cheques/${idCheque}`);
  }

  registrar(cheque: Cheque) {
    return this.http.post(`${this.url}/cheques`, cheque);
  }

  modificar(cheque: Cheque) {
    return this.http.put(`${this.url}/cheques`, cheque);
  }

  eliminar(idCheque: number) {
    return this.http.delete(`${this.url}/cheques/${idCheque}`);
  }
}

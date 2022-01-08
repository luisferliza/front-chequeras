import { Cliente } from "./cliente";
import { TipoCuenta } from "./tipoCuenta";

export class CuentaBancaria {
  idCuentaBancaria: number;
  noCuenta: string;
  tipoCuenta: TipoCuenta;
  cliente:Cliente
  saldo:number;
}

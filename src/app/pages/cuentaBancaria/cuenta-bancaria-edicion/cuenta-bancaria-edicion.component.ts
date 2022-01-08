import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Cliente } from 'src/app/_model/cliente';
import { CuentaBancaria } from 'src/app/_model/cuentaBancaria';
import { TipoCuenta } from 'src/app/_model/tipoCuenta';
import { ClienteService } from 'src/app/_service/cliente.service';
import { CuentaBancariaService } from 'src/app/_service/cuentaBancaria';
import { TipoCuentaService } from 'src/app/_service/tipoCuenta.service';

@Component({
  selector: 'app-cuenta-bancaria-edicion',
  templateUrl: './cuenta-bancaria-edicion.component.html',
  styleUrls: ['./cuenta-bancaria-edicion.component.css']
})
export class CuentaBancariaEdicionComponent implements OnInit {

  cuentaBancaria: CuentaBancaria;
  form: FormGroup;
  edicion: boolean;
  id: number;
  clientes: Cliente[];
  tiposCuenta: TipoCuenta[];

  constructor(private cuentaBancariaService: CuentaBancariaService,
              private route: ActivatedRoute,
              private router: Router,
              private tipoCuentaService: TipoCuentaService,
              private clienteService: ClienteService) { }

  ngOnInit() {
    this.actualizarClientes();
    this.actualizarTiposCuenta();
    this.cuentaBancaria = new CuentaBancaria();

    this.form = new FormGroup({
      'id': new FormControl(0),
      'noCuenta': new FormControl(''),
      'id_tipoCuenta': new FormControl(''),
      'id_Cliente': new FormControl(''),
      'saldo': new FormControl(0)
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
      this.initForm();
    });
  }

  actualizarClientes() {
    this.clienteService.listar().subscribe(data=>{
      this.clientes = data;
    })
  }

  actualizarTiposCuenta(){
    this.tipoCuentaService.listar().subscribe(data=>{
      this.tiposCuenta = data;
    })
  }

  initForm() {
    if (this.edicion) {
      //cargar la data del servicio hacia el form
      this.cuentaBancariaService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idCuentaBancaria),
          'noCuenta': new FormControl(data.noCuenta),
          'id_tipoCuenta': new FormControl(data.tipoCuenta.idTipoCuenta),
          'id_Cliente': new FormControl(data.cliente.idCliente),
          'saldo': new FormControl(data.saldo)
        });
      });
    }
  }

  operar() {

    this.cuentaBancaria.noCuenta = this.form.value['noCuenta'];
    this.cuentaBancaria.tipoCuenta = new TipoCuenta();
    this.cuentaBancaria.tipoCuenta.idTipoCuenta = this.form.value['id_tipoCuenta'];

    this.cuentaBancaria.cliente = new Cliente();
    this.cuentaBancaria.cliente.idCliente= this.form.value['id_Cliente'];
    this.cuentaBancaria.saldo = this.form.value['saldo'];

    if (this.edicion) {
      this.cuentaBancaria.idCuentaBancaria = this.form.value['id'];
      this.cuentaBancariaService.modificar(this.cuentaBancaria).subscribe(() => {
        this.cuentaBancariaService.listar().subscribe(data => {
          this.cuentaBancariaService.cuentaBancariaCambio.next(data);
          this.cuentaBancariaService.mensajeCambio.next('SE MODIFICÓ');
        });
      })
    } else {
      this.cuentaBancariaService.registrar(this.cuentaBancaria).subscribe(() => {
        this.cuentaBancariaService.listar().subscribe(data => {
          this.cuentaBancariaService.cuentaBancariaCambio.next(data);
          this.cuentaBancariaService.mensajeCambio.next('SE REGISTRÓ');
        });
      });
    }

    this.router.navigate(['cuentas']);
  }


}

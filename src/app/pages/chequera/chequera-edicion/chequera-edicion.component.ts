import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Cheque } from 'src/app/_model/cheque';
import { Chequera } from 'src/app/_model/chequera';
import { CuentaBancaria } from 'src/app/_model/cuentaBancaria';
import { ChequeraService } from 'src/app/_service/chequera.service';
import { CuentaBancariaService } from 'src/app/_service/cuentaBancaria';

@Component({
  selector: 'app-chequera-edicion',
  templateUrl: './chequera-edicion.component.html',
  styleUrls: ['./chequera-edicion.component.css']
})
export class ChequeraEdicionComponent implements OnInit {
  chequera: Chequera;
  form: FormGroup;
  edicion: boolean;
  id: number;
  cuentas: CuentaBancaria[];

  constructor(private chequeraService: ChequeraService,
              private route: ActivatedRoute,
              private router: Router,
              private cuentaBancariaService: CuentaBancariaService) { }

  ngOnInit() {

    this.actualizarChequeras();
    this.chequera = new Chequera();

    this.form = new FormGroup({
      'id': new FormControl(0),
      'noChequera': new FormControl(''),
      'cantidadCheques': new FormControl(10),
      'id_cuenta': new FormControl(),
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
      this.initForm();
    });
  }

  actualizarChequeras(){
    this.cuentaBancariaService.listar().subscribe(data=>{
      this.cuentas = data;
    })
  }

  initForm() {
    if (this.edicion) {
      //cargar la data del servicio hacia el form
      this.chequeraService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idChequera),
          'noChequera': new FormControl(data.noChequera),
          'cantidadCheques': new FormControl(data.cantidadCheques),
          'id_cuenta': new FormControl(data.cuenta.idCuentaBancaria),
        });
      });
    }
  }

  operar() {

    this.chequera.noChequera = this.form.value['noChequera'];
    this.chequera.cuenta = new CuentaBancaria();
    this.chequera.cuenta.idCuentaBancaria = this.form.value['id_cuenta'];
    this.chequera.cantidadCheques = this.form.value['cantidadCheques'];

    if (this.edicion) {
      this.chequera.idChequera = this.form.value['id'];
      this.chequeraService.modificar(this.chequera).subscribe(() => {
        this.chequeraService.listar().subscribe(data => {
          this.chequeraService.chequeraCambio.next(data);
          this.chequeraService.mensajeCambio.next('SE MODIFICÓ');
        });
      })
    } else {
      this.chequeraService.registrar(this.chequera).subscribe(() => {
        this.chequeraService.listar().subscribe(data => {
          this.chequeraService.chequeraCambio.next(data);
          this.chequeraService.mensajeCambio.next('SE REGISTRÓ');
        });
      });
    }

    this.router.navigate(['chequeras']);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Cheque } from 'src/app/_model/cheque';
import { Chequera } from 'src/app/_model/chequera';
import { ChequeService } from 'src/app/_service/cheque.service';
import { ChequeraService } from 'src/app/_service/chequera.service';

@Component({
  selector: 'app-cheques-edicion',
  templateUrl: './cheques-edicion.component.html',
  styleUrls: ['./cheques-edicion.component.css']
})
export class ChequesEdicionComponent implements OnInit {


  cheque: Cheque;
  form: FormGroup;
  edicion: boolean;
  id: number;
  chequeras: Chequera[];

  constructor(private cuentaBancariaService: ChequeService,
              private route: ActivatedRoute,
              private router: Router,
              private chequeraService: ChequeraService) { }

  ngOnInit() {

    this.actualizarChequeras();
    this.cheque = new Cheque();

    this.form = new FormGroup({
      'id': new FormControl(0),
      'noCheque': new FormControl(''),
      'id_chequera': new FormControl(''),
      'cobrado': new FormControl(false),
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
      this.initForm();
    });
  }

  actualizarChequeras(){
    this.chequeraService.listar().subscribe(data=>{
      this.chequeras = data;
    })
  }

  initForm() {
    if (this.edicion) {
      //cargar la data del servicio hacia el form
      this.cuentaBancariaService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idCheque),
          'noCheque': new FormControl(data.noCheque),
          'id_chequera': new FormControl(data.chequera.idChequera),
          'cobrado': new FormControl(data.cobrado),
        });
      });
    }
  }

  operar() {

    this.cheque.noCheque = this.form.value['noCheque'];
    this.cheque.chequera = new Chequera();
    this.cheque.chequera.idChequera = this.form.value['id_chequera'];
    this.cheque.cobrado = this.form.value['cobrado'];

    if (this.edicion) {
      this.cheque.idCheque = this.form.value['id'];
      this.cuentaBancariaService.modificar(this.cheque).subscribe(() => {
        this.cuentaBancariaService.listar().subscribe(data => {
          this.cuentaBancariaService.chequeCambio.next(data);
          this.cuentaBancariaService.mensajeCambio.next('SE MODIFICÓ');
        });
      })
    } else {
      this.cuentaBancariaService.registrar(this.cheque).subscribe(() => {
        this.cuentaBancariaService.listar().subscribe(data => {
          this.cuentaBancariaService.chequeCambio.next(data);
          this.cuentaBancariaService.mensajeCambio.next('SE REGISTRÓ');
        });
      });
    }

    this.router.navigate(['cheques']);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TipoCuenta } from 'src/app/_model/tipoCuenta';
import { TipoCuentaService } from 'src/app/_service/tipoCuenta.service';

@Component({
  selector: 'app-tipos-cuenta-edicion',
  templateUrl: './tipos-cuenta-edicion.component.html',
  styleUrls: ['./tipos-cuenta-edicion.component.css']
})
export class TiposCuentaEdicionComponent implements OnInit {

  tipoCuenta: TipoCuenta;
  form: FormGroup;
  edicion: boolean;
  id: number;

  constructor(private clienteService: TipoCuentaService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.tipoCuenta = new TipoCuenta();

    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombre': new FormControl('')
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      //cargar la data del servicio hacia el form
      this.clienteService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idTipoCuenta),
          'nombre': new FormControl(data.nombre)
        });
      });
    }
  }

  operar() {
    this.tipoCuenta.nombre = this.form.value['nombre'];

    if (this.edicion) {
      this.tipoCuenta.idTipoCuenta = this.form.value['id'];
      this.clienteService.modificar(this.tipoCuenta).subscribe(() => {
        this.clienteService.listar().subscribe(data => {
          this.clienteService.tipoCuentaCambio.next(data);
          this.clienteService.mensajeCambio.next('SE MODIFICÓ');
        });
      })
    } else {
      this.clienteService.registrar(this.tipoCuenta).subscribe(() => {
        this.clienteService.listar().subscribe(data => {
          this.clienteService.tipoCuentaCambio.next(data);
          this.clienteService.mensajeCambio.next('SE REGISTRÓ');
        });
      });
    }

    this.router.navigate(['tipos']);
  }

}

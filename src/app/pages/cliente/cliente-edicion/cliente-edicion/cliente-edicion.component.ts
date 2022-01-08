import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Cliente } from 'src/app/_model/cliente';
import { ClienteService } from 'src/app/_service/cliente.service';

@Component({
  selector: 'app-cliente-edicion',
  templateUrl: './cliente-edicion.component.html',
  styleUrls: ['./cliente-edicion.component.css']
})
export class ClienteEdicionComponent implements OnInit {


  cliente: Cliente;
  form: FormGroup;
  edicion: boolean;
  id: number;

  constructor(private clienteService: ClienteService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.cliente = new Cliente();

    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombre': new FormControl(''),
      'apellido': new FormControl(''),
      'dpi': new FormControl('')
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
          'id': new FormControl(data.idCliente),
          'nombre': new FormControl(data.nombre),
          'apellido': new FormControl(data.apellido),
          'dpi': new FormControl(data.dpi)
        });
      });
    }
  }

  operar() {
    this.cliente.idCliente = this.form.value['id'];
    this.cliente.nombre = this.form.value['nombre'];
    this.cliente.apellido = this.form.value['apellido'];
    this.cliente.dpi = this.form.value['dpi'];

    if (this.edicion) {
      this.clienteService.modificar(this.cliente).subscribe(() => {
        this.clienteService.listar().subscribe(data => {
          this.clienteService.clienteCambio.next(data);
          this.clienteService.mensajeCambio.next('SE MODIFICÓ');
        });
      })
    } else {
      this.clienteService.registrar(this.cliente).subscribe(() => {
        this.clienteService.listar().subscribe(data => {
          this.clienteService.clienteCambio.next(data);
          this.clienteService.mensajeCambio.next('SE REGISTRÓ');
        });
      });
    }

    this.router.navigate(['clientes']);
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/_model/cliente';
import { ClienteService } from 'src/app/_service/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  displayedColumns = ['idCliente', 'nombre', 'apellido', 'dpi', 'acciones'];
  dataSource: MatTableDataSource<Cliente>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private clienteService: ClienteService, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.listar();

    this.clienteService.clienteCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.clienteService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });
  }

  listar() {
    this.clienteService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(idCliente: number) {
    this.clienteService.eliminar(idCliente).subscribe(()=>{
      this.clienteService.listar().subscribe(data => {
        this.clienteService.clienteCambio.next(data);
        this.clienteService.mensajeCambio.next('SE ELIMINÓ');
      });
    });
  }

  applyFilter(filterValue: any) {
    if(filterValue != null){
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      this.dataSource.filter = filterValue;
    }
  }

}

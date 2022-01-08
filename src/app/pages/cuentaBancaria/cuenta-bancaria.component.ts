import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CuentaBancaria } from 'src/app/_model/cuentaBancaria';
import { CuentaBancariaService } from 'src/app/_service/cuentaBancaria';

@Component({
  selector: 'app-cuenta-bancaria',
  templateUrl: './cuenta-bancaria.component.html',
  styleUrls: ['./cuenta-bancaria.component.css']
})
export class CuentaBancariaComponent implements OnInit {


  displayedColumns = ['idCuentaBancaria', 'noCuenta', 'tipoCuenta_nombre', 'cliente_nombre', 'saldo', 'acciones'];
  dataSource: MatTableDataSource<CuentaBancaria>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private cuentaService: CuentaBancariaService, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.listar();

    this.cuentaService.cuentaBancariaCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.cuentaService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });
  }

  listar() {
    this.cuentaService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(idCliente: number) {
    this.cuentaService.eliminar(idCliente).subscribe(()=>{
      this.cuentaService.listar().subscribe(data => {
        this.cuentaService.cuentaBancariaCambio.next(data);
        this.cuentaService.mensajeCambio.next('SE ELIMINÓ');
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TipoCuenta } from 'src/app/_model/tipoCuenta';
import { TipoCuentaService } from 'src/app/_service/tipoCuenta.service';

@Component({
  selector: 'app-tipos-cuenta',
  templateUrl: './tipos-cuenta.component.html',
  styleUrls: ['./tipos-cuenta.component.css']
})
export class TiposCuentaComponent implements OnInit {

  displayedColumns = ['idTipoCuenta', 'nombre', 'acciones'];
  dataSource: MatTableDataSource<TipoCuenta>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private tipoCuentaService: TipoCuentaService, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.listar();

    this.tipoCuentaService.tipoCuentaCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.tipoCuentaService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });
  }

  listar() {
    this.tipoCuentaService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(idCliente: number) {
    this.tipoCuentaService.eliminar(idCliente).subscribe(()=>{
      this.tipoCuentaService.listar().subscribe(data => {
        this.tipoCuentaService.tipoCuentaCambio.next(data);
        this.tipoCuentaService.mensajeCambio.next('SE ELIMINÓ');
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

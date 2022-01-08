import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Chequera } from 'src/app/_model/chequera';
import { ChequeraService } from 'src/app/_service/chequera.service';

@Component({
  selector: 'app-chequera',
  templateUrl: './chequera.component.html',
  styleUrls: ['./chequera.component.css']
})
export class ChequeraComponent implements OnInit {



  displayedColumns = ['idChequera', 'noChequera', 'cantidadCheques', 'noCuenta', 'acciones'];
  dataSource: MatTableDataSource<Chequera>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private chequeraService: ChequeraService, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.listar();

    this.chequeraService.chequeraCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.chequeraService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });
  }

  listar() {
    this.chequeraService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(idCliente: number) {
    this.chequeraService.eliminar(idCliente).subscribe(()=>{
      this.chequeraService.listar().subscribe(data => {
        this.chequeraService.chequeraCambio.next(data);
        this.chequeraService.mensajeCambio.next('SE ELIMINÓ');
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

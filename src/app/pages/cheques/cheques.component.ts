import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Cheque } from 'src/app/_model/cheque';
import { ChequeService } from 'src/app/_service/cheque.service';
import { ChequeraService } from 'src/app/_service/chequera.service';

@Component({
  selector: 'app-cheques',
  templateUrl: './cheques.component.html',
  styleUrls: ['./cheques.component.css']
})
export class ChequesComponent implements OnInit {



  displayedColumns = ['idCheque', 'noCheque', 'noChequera', 'cobrado', 'acciones'];
  dataSource: MatTableDataSource<Cheque>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private chequeService: ChequeService, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.listar();

    this.chequeService.chequeCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.chequeService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });
  }

  listar() {
    this.chequeService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminar(idCliente: number) {
    this.chequeService.eliminar(idCliente).subscribe(()=>{
      this.chequeService.listar().subscribe(data => {
        this.chequeService.chequeCambio.next(data);
        this.chequeService.mensajeCambio.next('SE ELIMINÓ');
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

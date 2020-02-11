import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import Swal from 'sweetalert2';

import { MatDialog } from '@angular/material/dialog';

import { AuthenticationService } from '@/_services';
import { User } from '@/_models';
import { ModalComponent } from '../modal/modal.component';


@Component({
  selector: 'app-tablausuario',
  templateUrl: './tablausuario.component.html',
  styleUrls: ['./tablausuario.component.css']
})
export class TablausuarioComponent implements OnInit, AfterViewInit {
  public usuariosRegistrado = [];

  //campos que lleva el datatable de material
  displayedColumns: string[] = ['cedula', 'nombres', 'primerApellido',
    'segundoApellido', 'telefono', 'celular', 'email', 'direccion', 'editar', 'borrar'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private autenticationService: AuthenticationService, public dialog: MatDialog) {

  }

  ngOnInit() { this.obtenerUsuarios(); }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editarUsuario(usurioEditar: User) {
    console.log('usuario editar:', usurioEditar);
  }

  borrarUsuario(usuarioBorrar: User) {

    Swal.fire({
      title: 'Borrar Registro',
      text: '¿Esta seguro de borrar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',

    }).then(result => {
      if (result.value) {
        this.autenticationService
          .deleteUsuario(usuarioBorrar.id.toString())
          .subscribe(respuesta => {
            Swal.fire('Borrar Registro', 'Registro Borrado con éxito !', 'success');
          }, error => { console.log(error); });
      }
    });
  }

  onNuevoUsuario() {
    this.openDialog();
  }

  obtenerUsuarios() {
    this.autenticationService
      .obtenerUsuarios()
      .subscribe(respuestaObtener => {
        this.dataSource.data = respuestaObtener.usuarios;
      });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.obtenerUsuarios();
    });
  }

}

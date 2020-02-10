import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import Swal from 'sweetalert2';

import { MatDialog, throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';

import { AuthenticationService } from '@/_services';
import { RespuestaObtenerUsuario, User, RespuestaLogueo } from '@/_models';
import { ModalComponent } from '../modal/modal.component';


@Component({
  selector: 'app-tablausuario',
  templateUrl: './tablausuario.component.html',
  styleUrls: ['./tablausuario.component.css']
})
export class TablausuarioComponent implements OnInit {
  public usuariosRegistrado = [];

  //campos que lleva el datatable de material
  displayedColumns: string[] = ['cedula', 'nombres', 'primerApellido',
    'segundoApellido', 'telefono', 'celular', 'email', 'direccion', 'editar', 'borrar'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private autenticationService: AuthenticationService, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.obtenerUsuarios();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
            console.log('borrando:', respuesta);
            //this.obtenerUsuarios();
            Swal.fire('Borrar Registro', 'Registro Borrado con éxito !', 'success');
          }, error => { console.log(error); });
      }
    });
  }

  onNuevoUsuario() {
    console.log('nuevo usuario:');
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
      console.log('resultado', result);
    });
  }

}

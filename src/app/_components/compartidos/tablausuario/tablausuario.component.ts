import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from '@/_services';
import { RespuestaObtenerUsuario, User } from '@/_models';
import { RespuestaLogueo } from '../../../_models/respuestalogueo.model';


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
  constructor(private autenticationService: AuthenticationService) {

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

    this.autenticationService
      .deleteUsuario(usuarioBorrar.id.toString())
      .subscribe(respuesta => {
        console.log('borrando:', respuesta);
        this.obtenerUsuarios();
      });
  }

  onNuevoUsuario() {
    console.log('nuevo usuario:');
  }

  obtenerUsuarios() {
    this.autenticationService
      .obtenerUsuarios()
      .subscribe(respuestaObtener => {
        this.dataSource.data = respuestaObtener.usuarios;
      });
  }

}

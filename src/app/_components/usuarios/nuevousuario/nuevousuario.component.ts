import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '@/_models';
import { UsuariosService } from '@/_services';
import { MatDialog } from '@angular/material/dialog';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevousuario',
  templateUrl: './nuevousuario.component.html',
  styleUrls: ['./nuevousuario.component.css']
})
export class NuevousuarioComponent implements OnInit {

  private imagen: any;

  public nuevoFormUsuario = new FormGroup(
    {
      cedula: new FormControl('', Validators.required, Validators.length[10]),
      nombres: new FormControl('', Validators.required),
      primerApellido: new FormControl('', Validators.required),
      segundoApellido: new FormControl('', Validators.required),
      imageUsuario: new FormControl(''),
      celular: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

  constructor(private usuarioService: UsuariosService, private dialog: MatDialog
  ) { }



  ngOnInit() {
  }

  addNuevoUsuario(datosUsuario: Usuario) {
    if (this.nuevoFormUsuario.valid) {

      this.usuarioService.addUsuario(datosUsuario)
        .subscribe(
          result => {
            if (result) {
              Swal.fire({
                title: result.mensaje.titulo,
                text: result.mensaje.contenido,
                icon: 'success',
                confirmButtonText: 'Aceptar'
              }).then(resultSeleccion => {

                if (result.estadoTransaccion) {
                  this.onClose();
                }
              });
              return;
            }
          },
          error => {
            console.log('Error addUsuario:', error);
          });

    }
  }

  cargarFoto(imagenSeleccion: any): void {
    //subir una sola imagen
    this.imagen = imagenSeleccion.target.files[0];
    console.log('Imagen seleccionada:', this.imagen);
  }

  onClose() {
    this.nuevoFormUsuario.reset();
    this.dialog.closeAll();
  }

}

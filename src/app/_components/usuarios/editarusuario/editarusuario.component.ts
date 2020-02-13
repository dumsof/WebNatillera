import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '@/_models';
import { UsuariosService } from '@/_services';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styleUrls: ['./editarusuario.component.css']
})
export class EditarusuarioComponent implements OnInit {

  private imagen: any;

  @Input() usuario: Usuario;

  public editFormUsuario = new FormGroup(
    {
      id: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      cedula: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      nombres: new FormControl('', Validators.required),
      primerApellido: new FormControl('', Validators.required),
      segundoApellido: new FormControl('', Validators.required),
      imageUsuario: new FormControl(''),
      celular: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
      /*  password: new FormControl({
         value : '',
         disabled: true
       }, [ Validators.required ])  para deshabilitar el campo*/
    });

  constructor(private usuarioService: UsuariosService, private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.inicializarValoresFormularioEdit();
  }
  editUsuario(usuario: Usuario) {
    this.usuarioService.addUsuario(usuario)
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
          console.log('Error EditUsuario:', error);
        });
  }

  cargarFoto(imagenSeleccion: any): void {
    //subir una sola imagen
    this.imagen = imagenSeleccion.target.files[0];
    console.log('Imagen seleccionada:', this.imagen);
  }

  onClose() {
    this.editFormUsuario.reset();
    this.dialog.closeAll();
  }

  private inicializarValoresFormularioEdit(): void {
    this.editFormUsuario.patchValue({
      id: this.usuario.id,
      cedula: this.usuario.cedula,
      nombres: this.usuario.nombres,
      primerApellido: this.usuario.primerApellido,
      segundoApellido: this.usuario.segundoApellido,
      telefono: this.usuario.telefono,
      celular: this.usuario.celular,
      direccion: this.usuario.direccion,
      email: this.usuario.email,
      password: this.usuario.password,
    });
  }
}

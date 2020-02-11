import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { User } from '@/_models';
import { AuthenticationService } from '@/_services';


@Component({
  selector: 'app-nuevousuario',
  templateUrl: './nuevousuario.component.html',
  styleUrls: ['./nuevousuario.component.css']
})
export class NuevousuarioComponent implements OnInit {

  public nuevoFormUsuario = new FormGroup(
    {
      cedula: new FormControl('', Validators.required),
      nombres: new FormControl('', Validators.required),
      primerApellido: new FormControl('', Validators.required),
      segundoApelldo: new FormControl('', Validators.required),
    });

  constructor(private serviceAuten: AuthenticationService,
  ) { }



  ngOnInit() {
  }

  addNuevoUsuario(data: User) {
    if (this.nuevoFormUsuario.valid) {
      //agregue empleado en esta linea
      this.nuevoFormUsuario.reset();
      this.onClose();

    }
  }

  onClose(){
    this.nuevoFormUsuario.reset();
    /* this.nuevoFormUsuario.initializeFormGroup();
    this.nuevoFormUsuario.close(); */
  }

}

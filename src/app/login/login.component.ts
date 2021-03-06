import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService, AlertService } from '@/_services';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  form: FormGroup;                    // {1}
  private formSubmitAttempt: boolean; // {2}
  returnUrl: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,         // {3}
    private authService: AuthenticationService, // {4}
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({     // {5}
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  isFieldInvalid(field: string) { // {6}
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    this.formSubmitAttempt = true;

    // reset alerts on submit
    this.alertService.clear();

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.authService.login(this.form.value)
      .subscribe(
        respuestaLogueo => {
          if (!respuestaLogueo.estadoTransaccion) {
            Swal.fire({
              title: respuestaLogueo.mensaje.titulo,
              text: respuestaLogueo.mensaje.contenido,
              icon: 'warning',
              confirmButtonText: 'Aceptar'
            });
            return;
          }
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//se importa el archivo que tiene todos los modulos de material
import { MaterialModule } from './material.module';
//dum: componentes generados.
import { JwtInterceptor, ErrorInterceptor, LoaderInterceptor } from '@/_helpers';
import { RoutingModule } from './routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { LoginComponent } from './login/login.component';

//en el archivo index dentro de la carpeta componente se agrupa todos los componentes
import { AlertComponent, LoaderComponent, UsuarioComponent } from '@/_components';
import { ModalComponent, TablausuarioComponent } from '@/_components/compartidos';
import { NuevousuarioComponent } from './_components/nuevousuario/nuevousuario.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidenavListComponent,
    LoginComponent,
    AlertComponent,
    LoaderComponent,
    UsuarioComponent,
    TablausuarioComponent,
    ModalComponent,
    NuevousuarioComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    RoutingModule,
    HttpClientModule
  ],
  //poder utilizar el componente desde cualquier parte
  entryComponents: [ModalComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

# WebNatillera

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.22.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

##como generar componente indicar a que modulo se debe agregar
ng g component nameComponent --module=app.module.ts

ng g component _components/compartidos/modal --module=app.module.ts
ng g component _components/nuevousuario --module=app.module.ts
ng g component _components/usuarios/editarusuario --module=app.module.ts

#poder publicar la aplicacion en produccion
ng build --prod

#como instalar flex layout
npm i -s @angular/flex-layout

#version de flex layout para angular 8
npm i @angular/flex-layout@8.0.0-beta.27

#ruta instalar angular
https://www.youtube.com/watch?v=e74QOemhP6E

#INSTALACION ANGULAR
instalar la ultima versión de npm con el fin de optener los ultimos paquetes.
1. npm install npm@latest
forzar a quitar los paquete que estan en cache.
2. npm cache clean --force
quitar la auditoria para que no presente error
3. npm set audit false
quitar la version anterior de angular cli
4. npm uninstall -g angular-cli y npm uninstall -g @angular/cli
instalar la version de angular cli
5. npm install -g @angular/cli

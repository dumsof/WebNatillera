import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../_services/authentication.service';
import { RespuestaLogueo } from '../../_models/respuestalogueo.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: RespuestaLogueo;

  @Output() public sidenavToggle = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) { this.authenticationService.currentUser.subscribe(x => this.currentUser = x); }

  ngOnInit() {
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}

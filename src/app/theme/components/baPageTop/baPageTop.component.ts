import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from './../../../shared/auth.service';
import { Component } from '@angular/core';

import { GlobalState } from '../../../global.state';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss']
})
export class BaPageTop {

  isScrolled: boolean = false;
  isMenuCollapsed: boolean = false;

  isAuth: boolean;

  profileAvatar: string;

  constructor(
    private _state: GlobalState, 
    private authService: AuthService, 
    private router: Router, 
    private toastrService: ToastrService) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });

    this.isAuth = this.authService.isLoggedIn;
    
    this.authService.profileAvatar()
      .then(
        (data) => {
          this.profileAvatar = data;
        },
      );
  }

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  logout() {
    this.isAuth = false;
    this.authService.logout();
    // this.router.navigate(['login']);
    this.toastrService.success('Has cerrado sesión correctamente');
  }

}

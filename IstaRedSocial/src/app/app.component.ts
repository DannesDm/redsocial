import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as $ from 'jquery';
import { UserService } from './services/user.service';
import { GLOBAL } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
  public title = 'IstaRedSocial';
  public identity;
  public url: string;

  constructor(private _route: ActivatedRoute, private _router: Router, private _userService: UserService) {
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    console.log(this.identity);
  }

  //metodo que refresca la pagina

  ngDoCheck() {
    this.identity = this._userService.getIdentity();
  }

  logout() {
    //borrar lo del localStorage
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/']);

  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { GroupService } from '../../services/group.service';
import { Group } from '../../models/group';
import { GLOBAL } from '../../services/global';
import { User } from '../../models/user';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[UserService,GroupService]
})
export class HomeComponent implements OnInit {
 public title= 'Bienvenido ';
 public identity;
 public groups: Group[];
 public users: User[];
 public status: string;
 public id='5d8ae84e205c04318445d5f4';
 public url: string;
 public token;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _groupService: GroupService,

    private _userService: UserService
  ) { 
    this.identity = this._userService.getIdentity();
    this.identity = this._groupService.getIdentity();
    this.token = this._groupService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log('Componente home Cargado!!');
  }

  getListGroups(idgrupo) {
    this._groupService.getListGroups(idgrupo).subscribe(
      response => {
        

        console.log('uno');
          console.log(response);
          this.users = response.users;
          



        
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );

  }
}

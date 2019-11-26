import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../services/global';
import { Group } from '../../models/group';
import { GroupService } from '../../services/group.service';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-listausuarios',
  templateUrl: './listausuarios.component.html',
  styleUrls: ['./listausuarios.component.css'],
  providers: [GroupService]
})
export class ListausuariosComponent implements OnInit {

  public title = 'ListaUsuariosyGrupos';
  public identity;
  public url: string;
  public token;
  public itemsPerPage;
  public users: User[];
  public status: string;
  public Group;
  public id;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _groupService: GroupService
  ) { 

    this.identity = this._groupService.getIdentity();
    this.token = this._groupService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
  console.log('Componente Lista de Grupos Cargado');
this.getGroups(this.id);
  }

  getGroups(idgrupo) {
    this._groupService.getListGroups(idgrupo).subscribe(
      response => {
        

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

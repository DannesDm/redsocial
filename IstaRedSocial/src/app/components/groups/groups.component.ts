import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../services/global';
import { Group } from '../../models/group';
import { GroupService } from '../../services/group.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';
declare var $: any;
@Component({
  selector: 'groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
  providers: [GroupService]
})
export class GroupsComponent implements OnInit {

  public title = 'Grupos';
  public identity;
  public url: string;
  public token;
  public page;
  public pages;
  public next_page;
  public prev_page;
  public total;
  public itemsPerPage;
  public groups: Group[];
  public users: User[];
  public status: string;
  public idgrupo;
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
    
  
    console.log('componente grupo cargado');
    this.actualPage();
   // this.getListGroups(this.id);
  }

  
  actualPage() {
    this._route.params.subscribe(params => {
      let page = +params['page'];
      this.page = page;
      if (!params['page']) {
        page = 1;

      }

      if (!page) {
        page = 1;
      } else {
        this.next_page = page + 1;
        this.prev_page = page - 1;

        if (this.prev_page <= 0) {
          this.prev_page = 1;
        }
      }

      //devolver listado de usuarios
      // this.getPublicaciones(page);
      this.getGroups(page);

    });
  }

  //Devolver lista usuarios
  getGroups(page) {
    this._groupService.getGroups(page).subscribe(
      response => {
        if (!response.groups) {
          this.status = 'error';
        } else {

          console.log(response);
         
          this.total = response.total;
          this.groups = response.groups;
          this.pages = response.pages;
          if (page > this.pages) {
            this._router.navigate(['/grupos', 1]);
          }




        }
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



  getListGroups() {
 
       this._groupService.getListGroups(this.getid()).subscribe(
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



getid(){

  


this.id =  $(".uno").click(function () {
   var value = $(this).attr("id");

});


return this.id[0].id;
  //return this.id.id;    

 



}

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { Follow } from '../../models/follow';
import {FollowService} from '../../services/follow.service';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';


@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService,FollowService]
})
export class UsersComponent implements OnInit {
  public title = 'Usuarios';
  public identity;
  public url:string;
  public token;
  public page;
  public next_page;
  public prev_page;
  public status: string;
  public total;
public pages;
public users:User[];
public follows;
  constructor(

    private _route: ActivatedRoute, private _router: Router,
    private _userService: UserService, private _followService:FollowService
  ) {
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
  this.token = this._userService.getToken();

  }

  ngOnInit() {
    console.log('users componente cargado');
    this.actualPage();
  }

  actualPage() {
    this._route.params.subscribe(params => {
      let page = +params['page'];
      this.page = page;
      if(!params['page']){
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
      this.getUsers(page);

    });
  }


  getUsers(page) {
    this._userService.getUsers(page).subscribe(
      response => {
        if (!response.users) {
          this.status = 'error';
        } else {
          

          this.total = response.total;
          this.users = response.users;
          this.pages = response.pages;
          if(page > this.pages){
          this._router.navigate(['/gente',1]);
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
//Seguir a un usuario
  followUser(followed){
    var follow = new Follow('',this.identity._id,followed);
    
    this._followService.addFollow(this.token, follow ).subscribe(
    response =>{
    if(!response.follow){
    this.status = 'error';
    }else{
    this.status = 'success';
    //this.follows.push(followed);
    }
    },
    error =>{
      var errorMessage = <any>error;
            console.log(errorMessage);
    
            if (errorMessage != null) {
              this.status = 'error';
            }
    
    }
    
    );
    
    }

    //Dejar de Seguir a un usuario
    unfollowUser(followed){
      this._followService.deleteFollow(this.token, followed).subscribe(
      response =>{
        this.status= 'success o error';
      /*var search = this.follows.indexOf(followed);
      if(search != -1){
      this.follow.splice(search, 1);
      }*/
      },
      error =>{
            var errorMessage = <any>error;
                  console.log(errorMessage);
          
                  if (errorMessage != null) {
                    this.status = 'error';
                  }
          
          }
      
      );
      }





}

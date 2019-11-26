import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Message } from '../../../models/message';
import { MessageService } from '../../../services/message.service';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';


@Component({
  selector: 'received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.css'],
  providers: [UserService, MessageService]
})
export class ReceivedComponent implements OnInit {
public title = 'Mensajes recibidos';
public identity;
public token;
public url;
public status: string;
public messages: Message[];
public pages;
public total;
public page;
public next_page;
public prev_page;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _messageService: MessageService,
    private _userService: UserService
  ) { 
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;

  }

  ngOnInit() {
    console.log("received componente cargado...");
    this.actualPage();
  }

  
  //listado de mensajes

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
      this.getMessages(this.token, this.page);

    });
  }
  //obtener mensajes

  getMessages(token, page) {
    this._messageService.getMyMessages(token, page).subscribe(
      response => {
        if (!response.messages) {
          console.log('no hay usuarios');
        } else {
          this.messages = response.messages;
          this.total = response.total;
          this.page = response.pages;
          console.log(response);

        }
      },
      error => {
        console.log(<any>error);
      }
    );

  }


}

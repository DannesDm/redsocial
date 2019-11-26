import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Message } from '../../../models/message';
import { MessageService } from '../../../services/message.service';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';

@Component({
  selector: 'add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [MessageService, UserService]

})
export class AddComponent implements OnInit {
  public message: Message;
  public identity;
  public token;
  public url;
  public status: string;
  public users: User[];


  public title = 'Enviar mensaje';

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _messageService: MessageService,
    private _userService: UserService
  ) {


    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.message = new Message('', '', '', '', this.identity._id, '');
  }

  ngOnInit() {
    console.log('componente enviar mensaje cargado...');
    this.getMyUsers();
  }
  onSubmit(form) {
    console.log(this.message);
    this._messageService.addMessage(this.token, this.message).subscribe(
      response => {
        if (response.message) {
          this.status = 'success';
          form.reset();

        }

      }, error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

  getMyUsers() {
    this._userService.getMyUsers().subscribe(
      response => {
        this.users = response.users;
        console.log(response);
      }, error => {
        console.log(<any>error);
      }
    );
  }


}

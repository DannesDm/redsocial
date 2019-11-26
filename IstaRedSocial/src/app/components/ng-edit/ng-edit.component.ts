import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';
import {GLOBAL} from '../../services/global';

@Component({
  selector: 'user-edit',
  templateUrl: './ng-edit.component.html',
  styleUrls: ['./ng-edit.component.css'],
  providers: [UserService, UploadService]
})
export class NgEditComponent implements OnInit {

  public title = 'EditarDatos';
  public user: User;
  public identity;
  public token;
  public status;
  public url:string;


  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _uploadService: UploadService) {

    this.user = this._userService.getIdentity();
    this.identity = this.user;
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log(this.user);
    console.log('user-edit.component Editar cargado!!');
  }


  onSubmit() {
    console.log(this.user);
    this._userService.updateUser(this.user).subscribe(
      response => {
        if (!response.user) {
          this.status = 'error';
        } else {
          this.status = 'success';
          localStorage.setItem('identity', JSON.stringify(this.user));
          this.identity = this.user;

          //Subida de Imagen de USUARIO

          this._uploadService.makeFileRequest(this.url + 'upload-image-user/' + this.user._id, [], this.filesToUpload, this.token, 'image')
                              .then((result: any) => {
            this.user.userimagen = result.user.userimagen;

            console.log(this.user.userimagen);
            console.log(result.user.userimagen);
            
         localStorage.setItem('identity', JSON.stringify(this.user));

          });


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

  public filesToUpload: Array<File>
  fileChangeEvent(fileInput: any) {
    this.filesToUpload =  <Array<File>>fileInput.target.files;
  

  }

}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { Publication } from '../../models/publication';
import { PublicationService } from '../../services/publication.service';
import { User } from '../../models/user';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [UserService, PublicationService, UploadService]

})
export class SidebarComponent implements OnInit {
  public identity;
  public token;
  public stats;
  public url;
  public status;
  public publication: Publication;
  public user: User;

  constructor(
    private _userService: UserService, private _uploadService: UploadService, private _publicationService: PublicationService) {

    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    this.url = GLOBAL.url;
    this.user = this._userService.getIdentity();
    this.publication = new Publication("", "", "", "", this.identity._id);
  }

  ngOnInit() {
    console.log('componente sidebar cargado!!S');
  }
  onSubmit(form) {

    this._publicationService.addPublication(this.token, this.publication).subscribe(
      response => {
        if (response.publication) {
          //this.publication = response.publication;

        
          if(this.filesToUpload && this.filesToUpload.length){

            //subirimagen
                     this._uploadService.makeFileRequest(this.url + 'upload-image-pub/' + response.publication._id, [], this.filesToUpload, this.token, 'image')
                       .then((result: any) => {
                       this.publication.file = result.image;
                         form.reset();
                         this.status = 'success';
                        
           
                     
                         
           
                       });
           }else{
                         form.reset();
                         this.status = 'success';
           }



        } else {
          this.status = 'error';
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

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  


  }

}

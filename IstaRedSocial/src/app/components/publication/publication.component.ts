import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Publication } from '../../models/publication';
import { User } from '../../models/user';

import { PublicationService } from '../../services/publication.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'publications',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css'],
  providers: [PublicationService]
})
export class PublicationComponent implements OnInit {
  public title = 'Publicaciones';
  public identity;
  public url: string;
  public token;
  public page;
  public pages;
  public next_page;
  public prev_page;
  public user;
  public total;
  public itemsPerPage;
  public publications: Publication[];
  public status: string;
  public showImage;

  constructor(private _route: ActivatedRoute, private _router: Router,
    private _publicationService: PublicationService) {

    this.identity = this._publicationService.getIdentity();
    this.token = this._publicationService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log('componente publicaciones cargado!!');
    this.actualPage();
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
      this.getPublicaciones(page);

    });
  }



  getPublicaciones(page, adding = false) {
    this._publicationService.getPublicaciones(page).subscribe(
      response => {
        if (!response.publications) {
          this.status = 'error';
        } else {



          this.total = response.total;

          this.pages = response.pages;
          this.itemsPerPage = response.items_per_page;

          if (!adding) {
            this.publications = response.publications;
          } else {
            var arrayA = this.publications;
            var arrayB = response.publications;

            console.log(arrayA);
            console.log(arrayB);
            this.publications = arrayA.concat(arrayB);

            $("html,body").animate({ scrollTop: $('html').prop("scrollHeight") }, 500)

          }



          if (page > this.pages) {
            this._router.navigate(['/publicacion', 1]);
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

  public noMore = false;
  viewMore() {
    this.page += 1;
    if (this.page == this.pages) {
      this.noMore = true;
    }
    this.getPublicaciones(this.page, true);
  }

  showThisImage(id) {
    this.showImage = id;
  }

  hideThisImage(id) {
    this.showImage = 0;
  }

  deletePublication(id) {
    this._publicationService.deletePublication(this.token, id).subscribe(
      response => {
        this._router.navigate(['/publicacion', 1]);
      },
      error => {
        console.log(<any>error);
      }

    );

  }
}

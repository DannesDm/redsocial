import { Component, OnInit ,DoCheck} from '@angular/core';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public title = 'Mensajes Privados';
  constructor() { }

  ngOnInit() {
    console.log('componente Mensaje Cargado!');
  }

}

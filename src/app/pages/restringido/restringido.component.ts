import { Component, OnInit } from '@angular/core';
import { faAngry } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-restringido',
  templateUrl: './restringido.component.html',
  styleUrls: ['./restringido.component.css']
})
export class RestringidoComponent implements OnInit {

  IEnojado = faAngry;

  constructor() { }

  ngOnInit(): void {
  }

}

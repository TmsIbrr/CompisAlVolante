import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {

  liked: boolean = false;

  constructor() { }

  ngOnInit() {
  }


  toggleLike(){
    this.liked = !this.liked;
  }
}

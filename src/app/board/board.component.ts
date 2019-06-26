import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Output() onSquareClicked = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }


  squareClicked(coords: string) {
    console.log("board.component says, squareClicked: " + coords);
    this.onSquareClicked.emit(coords);
  }
}

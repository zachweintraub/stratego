import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Output() onSquareClicked = new EventEmitter()
  @Input() flatBoard;

  constructor() { }

  ngOnInit() {
    console.log(this.flatBoard);
  }
  
  
  squareClicked(coords: string) {
    
    if(coords.length < 2) {
      coords = "0" + coords;
    }
    
    console.log("board.component says, squareClicked: " + coords);
    console.log(this.flatBoard);
    this.onSquareClicked.emit(coords);   
  }
}

import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  // @Output() placeGraveyardPiece = new EventEmitter()
  @Output() pregamePieceClicked = new EventEmitter()
  @Output() pregameSquareClicked = new EventEmitter()
  @Output() onPieceClicked = new EventEmitter()
  @Output() onSquareClicked = new EventEmitter()
  @Output() onEnemyPieceClicked = new EventEmitter()
  @Input() localGame;
  @Input() localPlayer;
  @Input() flatBoard;

  constructor() {}

  ngOnInit() {
    console.log(this.flatBoard);
  }
  

  pieceClicked(coords: string) {
    if(coords.length < 2) {
      coords = "0" + coords;
    }

    let col: number = parseInt(coords[1]);
    let row: number = parseInt(coords[0]);

    if(!this.localGame.currentPlayer) {
      this.pregamePieceClicked.emit(coords);
    }
    else {

      //if its your turn
      if(this.localGame.currentPlayer == this.localPlayer.color) {

        if(this.localPlayer.color == this.localGame.board[row][col].color) {
          this.onPieceClicked.emit(coords)
        }
        else {
          this.onEnemyPieceClicked.emit(coords);
        }
      }      
    }
  }

  
  squareClicked(coords: string) {
    if(coords.length < 2) {
      coords = "0" + coords;
    }
    if(coords == "0") return; //WHY? but good

    let col: number = parseInt(coords[1]);
    let row: number = parseInt(coords[0]);

    if(!this.localGame.currentPlayer) {
        this.pregameSquareClicked.emit(coords);
      }
    else {
      
      // if(this.localGame.currentPlayer == this.localPlayer.color) {
        this.onSquareClicked.emit(coords);
      // }
    }

  }

  
}

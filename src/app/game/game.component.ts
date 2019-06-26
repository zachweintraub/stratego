import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GameService } from '../shared/game.service';
import { Player } from '../models/player';
import { Game } from '../models/game';
import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Piece } from '../models/piece';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [GameService]
})
export class GameComponent implements OnInit {
 
  @Input() localPlayer;
  @Input() localGameKey;
  key: string;
  opponentPlayer: Player;
  currentPlayer: Player;
  localGame: Game;
  selectedPiece: Piece = null;

// board: any[][];
// players: Player[];


  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private gameService: GameService) { }
  
  ngOnInit() {
    this.gameService.getGame(this.localGameKey).subscribe(data => {
      this.localGame = new Game(data.players, data.board, data.redGraveyard, data.blueGraveyard);
    });
  }

  selectGraveyardPiece(clickedId: string) {
    let color = clickedId[0];
    let position = clickedId.slice(1);

    if(color == "r" && this.localPlayer.color == "r") {
      this.selectedPiece = this.localGame.redGraveyard[position];
    }
    else if(color == "b" && this.localPlayer.color == "b") {
      this.selectedPiece = this.localGame.blueGraveyard[position];
    }
    console.log(this.selectedPiece);
  }

  placeGraveyardPiece(clickedPosition: string) {
    if(this.selectedPiece) {
      let col: number = parseInt(clickedPosition[1]);
      let row: number = parseInt(clickedPosition[0]);
      this.localGame.board[row][col] = this.selectedPiece;
      this.selectedPiece = null;
      console.log(this.localGame.board);
    }
  }

  placePiece(clickedSquare: string) { //, piece: Piece = this.selectedPiece
    let y: number = parseInt(clickedSquare[1]);
    let x: number = parseInt(clickedSquare[0]);

    if (!this.selectedPiece) { 
      // if(!isNaN(parseInt(this.localGame.board[x][y]))){ return };

      this.selectedPiece = this.localGame.board[x][y];
      console.log("game.component is selecting a piece: " + this.selectedPiece + " from square " + x.toString() + y.toString());
    
    }else {
      this.localGame.board[x][y] = this.selectedPiece;
      console.log("game.component made localGame.board[" + x + "][" + y + "] = " + this.selectedPiece)

      this.selectedPiece = null;
    }
  }

  submitData() {
    this.gameService.updateGame(this.localGame, this.localGameKey);
  }



  
  
  // combat(attacker: Piece, defender: Piece) {
  //   if (attacker.value === 3 && defender.value === 11) {
  //     defender.dies();

  //   }else if (attacker.value === 1 && defender.value === 10) {
  //     defender.dies();

  //   }else if (attacker.value === defender.value) {
  //     attacker.dies() && defender.dies();

  //   }else if (attacker.value > defender.value) {
  //     defender.dies();
      
  //   }else if (defender.value === 0) {
  //     attacker.winsGame();

  //   }else {
  //     attacker.dies();
  //   }
  // }

  // movePiece(piece: Piece, squareId: string) {
  //   this.board[piece.position.y][piece.position.x] = 0;
  //   piece.position.y = squareId[0];
  //   piece.position.x = squareId[1];
  //   this.board[piece.position.y][piece.position.x] = piece;
  // }

  // dies(squareId: number) {
  //   this.graveyard.push(this.board[squareId[0]][squareId[1]]);
  //   this.board[squareId[0]][squareId[1]] = 0;
  // }
  
}

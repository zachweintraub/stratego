import { Component, OnInit, Input, OnDestroy } from '@angular/core';
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
export class GameComponent implements OnInit, OnDestroy{
 
  @Input() localPlayer;
  @Input() localGameKey;
  localGame: Game;
  selectedPiece: {piece: Piece, coords: string};

  constructor(
    private gameService: GameService) { 
      this.selectedPiece = {piece: null, coords: ""}
    }
  
  ngOnInit() {
    this.gameService.getGame(this.localGameKey).subscribe(data => {
      this.localGame = new Game(data.players, data.board, data.redGraveyard, data.blueGraveyard, data.currentPlayer);
    });
  }
  
  ngOnDestroy() {
    this.gameService.destroyGame(this.localGameKey);
    console.log("i am destroyed");

  }

  readyPlayer(player: Player) {
    if(player.color == 'r') {
      this.localGame.players[0].ready = true;
    } else if(player.color == 'b') {
      this.localGame.players[1].ready = true;
    }
    this.submitData();
    
    if(this.localGame.players[0].ready && this.localGame.players[1].ready) {
      this.localGame.currentPlayer = this.randomizePlayer();
      console.log(this.localGame.currentPlayer);
      this.submitData();
    }
    
  }

  randomizePlayer(): string {
    return (Math.random() > 0.5) ? 'r': 'b';
  }

  selectGraveyardPiece(clickedId: string) {
    if(!this.localGame.currentPlayer) {
      let color = clickedId[0];
      let position = clickedId.slice(1);
  
      if(color == "r" && this.localPlayer.color == "r") {
        if(this.localGame.redGraveyard[position].quantity <=0) return;
        this.selectedPiece.piece = this.localGame.redGraveyard[position].piece;
        this.selectedPiece.coords = "";
      }
      else if(color == "b" && this.localPlayer.color == "b") {
        if(this.localGame.blueGraveyard[position].quantity <=0) return;
        this.selectedPiece.piece = this.localGame.blueGraveyard[position].piece;
        this.selectedPiece.coords = "";
      }
    }
  }

  placeGraveyardPiece(clickedPosition: string) {
    if(this.selectedPiece.piece) {
      let col: number = parseInt(clickedPosition[1]);
      let row: number = parseInt(clickedPosition[0]);

      if(this.localGame.board[row][col] == 0){
        this.localGame.board[row][col] = this.selectedPiece.piece;
        //console.log(this.selectedPiece.color);
  
        if(this.selectedPiece.piece.color == "r") {
          console.log(this.localGame.redGraveyard[this.selectedPiece.piece.value]);
          this.localGame.redGraveyard[this.selectedPiece.piece.value]["quantity"]--;
          if(this.localGame.redGraveyard[this.selectedPiece.piece.value]["quantity"] < 1) {
            this.selectedPiece.piece = null;
          }
        }
        else if(this.selectedPiece.piece.color == "b") {
          console.log(this.localGame.blueGraveyard[this.selectedPiece.piece.value]);
          this.localGame.blueGraveyard[this.selectedPiece.piece.value]["quantity"]--;
          if(this.localGame.blueGraveyard[this.selectedPiece.piece.value]["quantity"] < 1) {
            this.selectedPiece.piece = null;
          }
        }
        this.submitData();
      }
    }
  }

  sendToGraveyard(coords: string) {
    let row = parseInt(coords[0]);
    let col = parseInt(coords[1]);

    let piece = this.localGame.board[row][col];
    console.log(piece);

    if(piece.color == 'b' && this.localPlayer.color == 'b') {
      this.localGame.blueGraveyard[piece.value]["quantity"]++;
      this.localGame.board[row][col] = 0;
      this.selectedPiece.piece = piece;
      this.selectedPiece.coords = "";
    } else if(piece.color == 'r' && this.localPlayer.color == 'r') {
      this.localGame.redGraveyard[piece.value]["quantity"]++;
      this.localGame.board[row][col] = 0;
      this.selectedPiece.piece = piece;
      this.selectedPiece.coords = "";
    }
    
    this.submitData();
  }
  
  selectBoardPiece(coords: string) {
    
    let row = parseInt(coords[0]);
    let col = parseInt(coords[1]);
    

    this.selectedPiece.piece = this.localGame.board[row][col];
    this.selectedPiece.coords = coords;
    
    //CALL FIGHT
    if(this.localGame.board[row][col].color != this.localPlayer.color &&
      this.isLegalMove(this.selectedPiece.coords, coords)) {

        let attacker = this.selectedPiece.piece;
        let defender = this.localGame.board[row][col];

        let winner = this.combat(attacker, defender);

        if (winner == attacker) {
          if (defender.color == 'b') {
            this.localGame.blueGraveyard[defender.value]["quantity"]++;
          }else {
            this.localGame.redGraveyard[defender.value]["quantity"]++;
          }
        }

        if (winner == defender) {
          if (attacker.color == 'b') {
            this.localGame.blueGraveyard[attacker.value]["quantity"]++;
          }else {
            this.localGame.redGraveyard[attacker.value]["quantity"]++;
          }
        }
        
        if(winner == 0) {
          this.localGame.redGraveyard[attacker.value]["quantity"]++;
          this.localGame.blueGraveyard[attacker.value]["quantity"]++;
        }

        this.localGame.board[row][col] = winner;
        this.switchTurns();
        this.submitData();
      }


      
  }
  
  isLegalMove(startPos: string, endPos: string) {

    
    let startRow = parseInt(startPos[0]);
    let startCol = parseInt(startPos[1]);
    let endRow = parseInt(endPos[0]);
    let endCol = parseInt(endPos[1]);
    
    let piece = this.localGame.board[startRow][startCol];

    if(this.localGame.board[endRow][endCol].color == this.localPlayer.color ) {
      this.selectBoardPiece(endPos);
      return false;
    }
    if(startRow == endRow || startCol == endCol) {
      console.log("move is a staight line");

      //Moving horizontal
      if(startRow == endRow) {
        
        if(Math.abs(endCol - startCol) <= piece["movement"]) {
          console.log('move distance is valid for this piece');
          
          // Piece in the way?
          for(let i = Math.min(startCol, endCol)+1; i < Math.max(startCol, endCol); i++) {
            if(this.localGame.board[startRow][i] != 0 || this.localGame.board[startRow][i] == -1) {
              console.log("horizontal move, can't move past another piece");
              return false;
            }
          }
          console.log("valid move");
          return true;
        }
      }  
        //Moving vertical
      if(startCol == endCol) {
        
        if(Math.abs(endRow - startRow) <= piece["movement"])
        {
          console.log('move distance is valid for this piece');
          for(let i = Math.min(startRow, endRow)+1; i < Math.max(startRow, endRow); i++) {
            if(this.localGame.board[i][startCol] != 0 || this.localGame.board[i][startCol] == -1) {
              console.log("vertical move, can't move past another piece");
              return false;
            }
          }
            console.log("valid move");
            return true;
        }
      } else{ 
        console.log("not straight line");
        return false;
      }
    }
  }

  placePiece(endCoords: string) {

    if(this.localPlayer.color == this.localGame.currentPlayer && this.selectedPiece.piece.color == this.localPlayer.color){
      
      if(this.isLegalMove(this.selectedPiece.coords, endCoords)) {
        this.localGame.board[this.selectedPiece.coords[0]][this.selectedPiece.coords[1]] = 0;
        this.localGame.board[endCoords[0]][endCoords[1]] = this.selectedPiece.piece;
        this.selectedPiece.piece = null;
        this.selectedPiece.coords = "";
       

        this.switchTurns();

        this.submitData();
      }
    }

  }
  
  switchTurns() {
    if (this.localGame.currentPlayer == 'b' ){
      this.localGame.currentPlayer = 'r';
    } else {
      this.localGame.currentPlayer = 'b';
    }
  }

  submitData() {
    this.gameService.updateGame(this.localGame, this.localGameKey);
  }



  
  
  combat(attacker: Piece, defender: Piece) {
    if (attacker.value == 3 && defender.value == 11) {
      return attacker;

    }else if (attacker.value == 1 && defender.value == 10) {
      return attacker;

    }else if (attacker.value == defender.value) {
      return 0;

    }else if (attacker.value > defender.value) {
      return attacker;
      
    }else if (defender.value == 0) {
      alert(attacker.color + "wins");
      return attacker;

    }else {
      return defender;
    }
  }

  // dies(squareId: number) {
  //    
  //   }
  // }

}

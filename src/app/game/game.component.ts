import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GameService } from '../shared/game.service';
import { Player } from '../models/player';
import { Game } from '../models/game';
import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';


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
  board: any[][];
  opponentPlayer: Player;
  currentPlayer: Player;
  players: Player[];
  thisGame;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private gameService: GameService) { }
  

  ngOnInit() {
    this.thisGame = this.gameService.getGame(this.localGameKey);
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
      
  //   }else if (defender.value === 12) {
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

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GameService } from '../shared/game.service';
import { Game } from '../models/game';
import { Player } from '../models/player';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
  providers: [GameService]
})
export class LobbyComponent implements OnInit {

  @Output() setLocalVariablesEvent = new EventEmitter();

  constructor(
    private gameService: GameService,
    private router: Router) { }

  ngOnInit() {

  }

  createGame(username: string) {
    if(!username) return;

    let newPlayer = new Player(username, 'r');
    let newGame = new Game([newPlayer, null], 
      [
        [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0],
        [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0],
        [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0],
        [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0],
        [0 , 0 ,-1 ,-1 , 0 , 0 ,-1 ,-1 , 0 , 0],
        [0 , 0 ,-1 ,-1 , 0 , 0 ,-1 ,-1 , 0 , 0],
        [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0],
        [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0],
        [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0],
        [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0]
      ]
    );

    let dbGame = this.gameService.createGame(newGame);
    
    this.setLocalVariablesEvent.emit({"player": newPlayer, "key": dbGame.key});

    // TEMP 
    alert("Share this key with your friend: "+dbGame.key)
  }
  
  joinGame(username: string, gameKey: string) {
    if(!username || !gameKey) return;
    
    // this.setLocalUser.emit(username);
    let newPlayer = new Player(username, 'b');
    let thatGame: Game;
    this.gameService.getGame(gameKey).subscribe(data => {
      thatGame = new Game(data.players, data.board);
    });
    thatGame.players.push(newPlayer);
    this.gameService.updateGame(thatGame, gameKey);
    this.setLocalVariablesEvent.emit({"player": newPlayer, "key": gameKey});
    
  
  }

}
// -LiFYL4CDSEG8-6YsJxL
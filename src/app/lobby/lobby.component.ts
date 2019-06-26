import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GameService } from '../shared/game.service';
import { Game } from '../models/game';
import { Player } from '../models/player';
import { Piece } from '../models/piece';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
// import { reject } from 'q';
// import { resolve } from 'dns';

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
    let newGame = new Game([newPlayer, new Player(' ', 'b')], 
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
      ],
      [
        {piece: new Piece(0,"r",0), quantity: 1},
        {piece: new Piece(1,"r",1), quantity: 1},
        {piece: new Piece(2,"r",9), quantity: 8},
        {piece: new Piece(3,"r",1), quantity: 5},
        {piece: new Piece(4,"r",1), quantity: 4},
        {piece: new Piece(5,"r",1), quantity: 4},
        {piece: new Piece(6,"r",1), quantity: 4},
        {piece: new Piece(7,"r",1), quantity: 3},
        {piece: new Piece(8,"r",1), quantity: 2},
        {piece: new Piece(9,"r",1), quantity: 1},
        {piece: new Piece(10,"r",1), quantity: 1},
        {piece: new Piece(11,"r",0), quantity: 6}
      ],
      [
        [
          {piece: new Piece(0,"b",0), quantity: 1},
          {piece: new Piece(1,"b",1), quantity: 1},
          {piece: new Piece(2,"b",9), quantity: 8},
          {piece: new Piece(3,"b",1), quantity: 5},
          {piece: new Piece(4,"b",1), quantity: 4},
          {piece: new Piece(5,"b",1), quantity: 4},
          {piece: new Piece(6,"b",1), quantity: 4},
          {piece: new Piece(7,"b",1), quantity: 3},
          {piece: new Piece(8,"b",1), quantity: 2},
          {piece: new Piece(9,"b",1), quantity: 1},
          {piece: new Piece(10,"b",1), quantity: 1},
          {piece: new Piece(11,"b",0), quantity: 6}
        ]
      ]
    );

    let dbGame = this.gameService.createGame(newGame);
    
    this.setLocalVariablesEvent.emit({"player": newPlayer, "key": dbGame.key});

    // TEMP 
    alert("Share this key with your friend: " + dbGame.key)
  }
  
  joinGame(username: string, gameKey: string) {
    if(!username || !gameKey) return;
    
    // this.setLocalUser.emit(username);
    let newPlayer = new Player(username, 'b');
    let dbGame: Game;
    
    let dbPromise = new Promise((resolve, reject)=>{
      this.gameService.getGame(gameKey).subscribe(data=>{
        resolve(dbGame = new Game(data.players, data.board, data.redGraveyard, data.blueGraveyard));
        // reject(console.error("Something went wrong with getGame()"))
      })
    }).then(() => {
      dbGame.players[1] = newPlayer;
      this.gameService.updateGame(dbGame, gameKey);
      this.setLocalVariablesEvent.emit({"player": newPlayer, "key": gameKey});
    });

    
    
      
      
    
    
  
  }

}
// -LiFYL4CDSEG8-6YsJxL